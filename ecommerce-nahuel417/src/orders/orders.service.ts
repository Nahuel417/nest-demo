import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
    constructor(private readonly ordersRepository: OrdersRepository) {}

    getOrder() {
        return this.ordersRepository.getOrder();
    }

    addOrder(order) {
        return this.ordersRepository.addOrder(order);
    }
}
