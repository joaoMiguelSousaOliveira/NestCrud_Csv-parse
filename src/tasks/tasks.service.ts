import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { title } from 'node:process';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto) {
    const { title, description, completed_at } = createTaskDto;
    return await this.prisma.task.create({
      data: {
        title,
        description,
        ...(createTaskDto.completed_at && {
          completed_at: createTaskDto.completed_at,
        }),
      },
    });
  }

  findAll() {
    return this.prisma.task.findMany();
  }

  findOne(id: number) {
    const task = this.prisma.task.findUnique({
      where: { id },
    });

    if (!task) throw new NotFoundException(`Task não encontrada ${id}.`);
    return task;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
