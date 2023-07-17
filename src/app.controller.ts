import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  UsePipes,
  ValidationPipe,
  Param,
  ParseIntPipe,
  Session,
  UseInterceptors,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  UploadedFile,
} from '@nestjs/common';
import { AppService } from './app.service';
import { EventDTO, MemberDTO } from './app.dto';
import { Customer } from './Entity/customer.entity';
import { Order } from './Entity/order.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';

@Controller('member')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('profile')
  getProfile(): string {
    return this.appService.getProfile();
  }

  @Post('/addmember')
  @UsePipes(new ValidationPipe())
  async addCustomer(
    @Body() customerData: Partial<Customer>,
  ): Promise<Customer> {
    return this.appService.addCustomer(customerData);
  }

  @Put('/update-profile')
  updateMember(@Body() data: MemberDTO): object {
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
  registerevent(@Body() data: EventDTO): string {
    return this.appService.registerevent(data);
  }

  @Delete('/deleteevent/:id')
  deleteeventbyid(@Param('id', ParseIntPipe) id: number): any {
    return this.appService.deleteeventbyid(id);
  }

  @Get('search/:id')
  async getById(@Param('id') id: number): Promise<Customer> {
    return this.appService.getById(id);
  }

  @Delete(':customerId/orders/:orderId')
  async deleteOrder(
    @Param('customerId') customerId: number,
    @Param('orderId') orderId: number,
  ): Promise<void> {
    await this.appService.deleteOrder(customerId, orderId);
  }

  @Post('/signin')
  signIn(@Body() data: MemberDTO, @Session() session) {
    if (this.appService.signIn(data)) {
      session.email = data.email;
      return true;
    } else {
      return false;
    }
    return this.appService.signIn(data);
  }

  @Post('/signup')
  @UseInterceptors(
    FileInterceptor('myfile', {
      storage: diskStorage({
        destination: './uploads',
        filename: function (req, file, cb) {
          cb(null, Date.now() + file.originalname);
        },
      }),
    }),
  )
  signup(
    @Body() nDto: MemberDTO,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 200000 }),
          new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    nDto.filenames = file.filename;
    return this.appService.upload(nDto);
  }

  @Post('/sendemail')
  sendEmail(@Body() mydata) {
    return this.appService.sendEmail(mydata);
  }

  // @Post('/signup')
  // @UseInterceptors(
  //   FileInterceptor('image', {
  //     fileFilter: (req, file, cb) => {
  //       if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
  //         cb(null, true);
  //       else {
  //         cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
  //       }
  //     },
  //     limits: { fileSize: 30000 },
  //     storage: diskStorage({
  //       destination: './uploads',
  //       filename: function (req, file, cb) {
  //         cb(null, Date.now() + file.originalname);
  //       },
  //     }),
  //   }),
  // )
  // @UsePipes(new ValidationPipe())
  // signup(
  //   @Body() mydata: MemberDTO,
  //   @UploadedFile() imageobj: Express.Multer.File,
  // ) {
  //   console.log(mydata);
  //   console.log(imageobj.filename);
  //   mydata.filenames = imageobj.filename;
  //   return this.appService.signup(mydata);
  // }

  // @Put(':customerId/orders/:orderId')
  // async updateOrder(
  //   @Param('customerId') customerId: number,
  //   @Param('orderId') orderId: number,
  //   @Body() updatedOrderData: Partial<Order>,
  // ): Promise<void> {
  //   await this.appService.updateOrder(customerId, orderId, updatedOrderData);
  // }
}
