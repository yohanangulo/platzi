import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Order } from '../entities/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';
import { Customer } from '../entities/customer.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  findAll() {
    return this.orderRepository.find();
  }

  async findOne(id: number) {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['items', 'items.product'],
    });

    if (!order) {
      throw new NotFoundException('not found');
    }

    return order;
  }

  async create(data: CreateOrderDto) {
    const order = new Order();
    // const order = this.orderRepository.create(data);

    if (data.customerId) {
      const customer = await this.customerRepository.findOneBy({
        id: data.customerId,
      });
      order.customer = customer;
    }

    return this.orderRepository.save(order);
  }

  async update(id: number, changes: UpdateOrderDto) {
    const order = await this.orderRepository.findOneBy({ id });

    if (changes.customerId) {
      const customer = await this.customerRepository.findOneBy({
        id: changes.customerId,
      });

      order.customer = customer;
    }

    return this.orderRepository.save(order);
  }

  delete(id: number) {
    return this.orderRepository.delete(id);
  }
}
