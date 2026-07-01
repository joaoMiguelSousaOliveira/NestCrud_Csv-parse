import { BadRequestException, Header, Injectable } from '@nestjs/common';
import { CreateImportDto } from './dto/create-import.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Readable } from 'stream';
import { parse } from 'fast-csv';

@Injectable()
export class ImportsService {
  constructor(private readonly prisma: PrismaService) {}
  async processCsv(file: Express.Multer.File) {
    const rows = await this.parseCsv(file.buffer);

    if (rows.length === 0) {
      throw new BadRequestException('O arquivo está vazio');
    }

    const result = await this.saveToDatabase(rows);
    return result;
  }

  private parseCsv(buffer: Buffer): Promise<CreateImportDto[]> {
    return new Promise((resolve, reject) => {
      const rows: CreateImportDto[] = [];

      Readable.from(buffer)
        .pipe(parse({ headers: true, trim: true }))
        .on('data', (row: CreateImportDto) => {
          rows.push(row);
        })
        .on('error', (error) => {
          reject(new BadRequestException(`Erro ao ler CSV: ${error.message}`));
        })
        .on('end', () => {
          resolve(rows);
        });
    });
  }

  private async saveToDatabase(rows: CreateImportDto[]) {
    try {
      const result = await this.prisma.task.createMany({
        data: rows.map((row) => ({
          completed:
            String(row.completed).toUpperCase() === 'TRUE' ? true : false,
          completed_at: row.completed_at ? new Date(row.completed_at) : null,
          description: row.description,
          title: row.title,
        })),
        skipDuplicates: true,
      });
      return result;
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Erro desconhecido';
      throw new BadRequestException(
        `Erro ao salvar no banco de dados: ${message}`,
      );
    }
  }
}
