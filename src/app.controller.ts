import { Controller, Get, Post, Put, Delete, Body, UsePipes, ValidationPipe, Param, ParseIntPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { EventDTO, MemberDTO } from "./app.dto";

@Controller('member')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('profile')
  getProfile(): string {
    return this.appService.getProfile();
  }

  @Post('/addmember')
  @UsePipes(new ValidationPipe())
  addMember(@Body() data: MemberDTO):string {
    return this.appService.addMember(data);
  }

  @Put('/update-profile')
  updateMember(@Body() data:MemberDTO): object{
    return this.appService.updateMember(data);
  }

  @Delete('/deletemember/:id')
  deleteMemberbyid(@Param('id', ParseIntPipe) id: number): any {
    return this.appService.deleteMemberbyid(id);
  }

  @Get('viewevent')
  getAllEvent(): string {
    return this.appService.getAllEvent();
  }

  @Post('/registerevent')
  @UsePipes(new ValidationPipe())
  registerevent (@Body() data: EventDTO):string {
    return this.appService.registerevent(data);
  }

  @Delete('/deleteevent/:id')
  deleteeventbyid(@Param('id', ParseIntPipe) id: number): any {
    return this.appService.deleteeventbyid(id);
  }
}
