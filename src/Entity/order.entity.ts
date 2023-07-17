import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Customer } from './customer.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: number;

  @ManyToOne(() => Customer, (customer) => customer.orders)
  customer: Customer;
}
