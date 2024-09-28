import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';

@Controller('/events')
export class EventsController {
  @Get()
  findAllResource() {
    return [
      {
        id: 1,
        name: 'First Event',
      },
      {
        id: 2,
        name: 'Second Event',
      },
      {
        id: 3,
        name: 'Third Event',
      },
    ];
  }

  @Get(':id')
  findOneResource(@Param('id') id: [string, number]) {
    return {
      id: id,
      name: 'Second Event',
    };
  }

  @Post()
  createResource(@Body() input) {
    return input;
  }

  @Patch(':id')
  updateResource(@Param('id') id: [string, number], @Body() input) {
    return {
      id,
      input: input,
    };
  }

  @Delete(':id')
  deleteResource(@Param('id') id: [string, number]) {
    return id;
  }
}
