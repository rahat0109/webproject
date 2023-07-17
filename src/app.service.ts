import { Injectable, NotFoundException } from '@nestjs/common';
import { MemberDTO } from './app.dto';
import { EventDTO } from './app.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './Entity/customer.entity';
import { Order } from './Entity/order.entity';
import * as bcrypt from 'bcrypt';
import { Customer as CustomerEntity } from './Entity/customer.entity';
import { MailerService } from '@nestjs-modules/mailer/dist';


@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Customer)
    private customersRepo: Repository<Customer>,
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    private mailerService: MailerService,
  ) {}

  getProfile(): string {
    return 'Member Profile';
  }

  addMember(data: MemberDTO): any {
    return data;
  }

  updateMember(data: MemberDTO): object {
    return data;
  }

  deleteMemberbyid(id): any {
    return id;
  }

  getAllEvent(): string {
    return 'This is Event Page';
  }

  registerevent(data: EventDTO): any {
    return data.id;
  }

  deleteeventbyid(id: number): any {
    return id;
  }

  async getById(id): Promise<Customer> {
    try {
      const customer = await this.customersRepo.findOneBy(id);
      if (!customer) {
        throw new NotFoundException('Customer not found');
      }

      const orders = await this.ordersRepository.find({ where: { customer } });
      customer.orders = orders;
      return customer;
    } catch (error) {
      console.log('err');
    }
  }

  async deleteOrder(customerId: number, orderId: number): Promise<void> {
    await this.customersRepo
      .createQueryBuilder()
      .relation(Customer, 'orders')
      .of(customerId)
      .remove(orderId);
  }

  async updateOrder(
    customerId,
    orderId: number,
    updatedOrderData: Partial<Order>,
  ): Promise<Order> {
    const customer = await this.customersRepo.findOneBy(customerId);
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    const order = customer.orders.find((order) => order.id === orderId);
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    Object.assign(order, updatedOrderData);

    return this.ordersRepository.save(order);
  }

  async addCustomer(customerData: Partial<Customer>): Promise<Customer> {
    const customer = this.customersRepo.create(customerData);
    return this.customersRepo.save(customer);
  }

  async signIn(data: MemberDTO) {
    const userdata = await this.customersRepo.findOneBy({ email: data.email });
    const match: boolean = await bcrypt.compare(
      data.password,
      userdata.password,
    );
    return match;
  }

  async signup(data: MemberDTO): Promise<CustomerEntity> {
    const salt = await bcrypt.genSalt();
    data.password = await bcrypt.hash(data.password, salt);
    return this.customersRepo.save(data);
  }

  async upload(MemberDTO) {
    const salt = await bcrypt.genSalt(10);
    const hassedpassed = await bcrypt.hash(MemberDTO.password, salt);
    MemberDTO.password = hassedpassed;
    return this.customersRepo.save(MemberDTO);
  }

  async sendEmail(mydata) {
    return await this.mailerService.sendMail({
      to: mydata.email,
      subject: mydata.subject,
      text: mydata.text,
    });
  }
}
