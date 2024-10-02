import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  HttpCode,
  ValidationPipe,
} from '@nestjs/common';
import { CreateEventDto } from './create-event.dto';
import { UpdateEventDto } from './update-event.dto';
import { Event } from './event.entity';
import { Like, MoreThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('/events')
export class EventsController {
  constructor(
    @InjectRepository(Event)
    private readonly repository: Repository<Event>,
  ) {}

  @Get()
  async findAllResource() {
    return this.repository.find();
  }

  @Get('/practice')
  async pratice() {
    return await this.repository.find({
      where: [
        {
          id: MoreThan(3),
          when: MoreThan(new Date('2021-02-12T13:00:00')),
        },
        {
          description: Like('%meet%'),
        },
      ],
      take: 2,
    });
  }

  @Get(':id')
  async findOneResource(@Param('id') id) {
    const event = await this.repository.findOneBy({
      id: id,
    });
    return event;
  }

  @Post()
  async createResource(@Body() input: CreateEventDto) {
    return await this.repository.save({
      ...input,
      when: new Date(input.when),
    });
  }

  @Patch(':id')
  async updateResource(@Param('id') id: number, @Body() input: UpdateEventDto) {
    const event = await this.repository.findOneBy({
      id: id,
    });
    return await this.repository.save({
      ...event,
      ...input,
      when: input.when ? new Date(input.when) : event.when,
    });
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteResource(@Param('id') id) {
    const event = await this.repository.findOneBy({
      id: id,
    });
    await this.repository.remove(event);
  }
}
