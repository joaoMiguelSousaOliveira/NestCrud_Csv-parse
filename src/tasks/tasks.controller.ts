import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { title } from 'node:process';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get('search')
  findBySearch(
    @Query('title') title?: string,
    @Query('description') description?: string,
  ) {
    if (title) {
      return this.tasksService.findByTitle(title);
    }
    if (description) {
      return this.tasksService.findByDescription(description);
    }

    return this.tasksService.findAll();
  }

  @Get(':id')
  findOneByID(@Param('id') id: string) {
    return this.tasksService.findOneByID(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}
