import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  CreateTaskDto,
  FilteredTasksDto,
  UpdateTaskDto,
} from '../dtos/task.dto';
import { Task } from '../entities/task.entity';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private tasksModel: Model<Task>) {}

  getAll(params: FilteredTasksDto) {
    if (!params) return this.tasksModel.find();
    return this.tasksModel.find().skip(params.offset).limit(params.limit);
  }

  async getOne(id: string) {
    const task = await this.tasksModel.findById(id);
    if (!task) throw new NotFoundException(`Task ${id} not found`);
    return task;
  }

  create(task: CreateTaskDto) {
    return this.tasksModel.create({
      ...task,
      completed: task.completed || false,
    });
  }

  async update(id: string, changes: UpdateTaskDto) {
    const task = await this.tasksModel.findByIdAndUpdate(
      id,
      { $set: changes },
      { new: true },
    );
    if (!task) throw new NotFoundException(`Task ${id} not found`);
    return task;
  }

  async delete(id: string) {
    const task = await this.tasksModel.findByIdAndDelete(id);
    if (!task) throw new NotFoundException(`Task ${id} not found`);
    return task;
  }
}
