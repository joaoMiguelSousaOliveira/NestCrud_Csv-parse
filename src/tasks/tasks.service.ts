import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';

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

  async findOneByID(id: number) {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!task)
      throw new NotFoundException(`Task não encontrada para o ID: ${id}.`);
    return task;
  }

  async findByTitle(title: string) {
    const tasks = await this.prisma.task.findMany({
      where: {
        title: {
          contains: title,
        },
      },
    });

    if (tasks.length === 0)
      throw new NotFoundException(
        `Não foram encontradas Tasks para o title: ${title}.`,
      );

    return tasks;
  }

  async findByDescription(description: string) {
    const tasks = await this.prisma.task.findMany({
      where: {
        description: {
          contains: description,
        },
      },
    });

    if (tasks.length === 0)
      throw new NotFoundException(
        `Não foram encontradas Tasks para a description: ${description}.`,
      );

    return tasks;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!task)
      throw new NotFoundException(`Task não encontrada para o ID: ${id}.`);

    return this.prisma.task.update({
      where: { id },
      data: {
        title: updateTaskDto.title,
        description: updateTaskDto.description,
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
