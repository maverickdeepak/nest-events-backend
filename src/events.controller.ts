import { Controller, Get, Post, Patch, Delete } from '@nestjs/common';

@Controller('/events')
export class EventsController {
  @Get()
  findAllResource() {}

  @Get()
  findOneResource() {}

  @Post()
  createResource() {}

  @Patch()
  updateResource() {}

  @Delete()
  deleteResource() {}
}
