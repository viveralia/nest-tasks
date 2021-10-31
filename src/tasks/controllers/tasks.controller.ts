import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { MongoIdPipe } from '../../common/mongo-id.pipe';
import {
  CreateTaskDto,
  FilteredTasksDto,
  UpdateTaskDto,
} from '../dtos/task.dto';
import { TasksService } from '../services/tasks.service';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAll(@Query() params: FilteredTasksDto) {
    return this.tasksService.getAll(params);
  }

  @Get(':id')
  getOne(@Param('id', MongoIdPipe) id: string) {
    return this.tasksService.getOne(id);
  }

  @Post()
  create(@Body() payload: CreateTaskDto) {
    return this.tasksService.create(payload);
  }

  @Put(':id')
  update(@Param('id', MongoIdPipe) id: string, @Body() payload: UpdateTaskDto) {
    return this.tasksService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', MongoIdPipe) id: string) {
    return this.tasksService.delete(id);
  }
}
