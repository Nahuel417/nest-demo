import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { Order } from './orders.entity';

@Injectable()
export class OrdersService {
    constructor(private readonly ordersRepository: OrdersRepository) {}

    async getOrder(id: string): Promise<Order | string> {
        const order = this.ordersRepository.getOrder(id);

        if (!order) {
            return 'No se encontro la orden';
        }

        return order;
    }

    async addOrder(userId: string, products: any): Promise<Order[] | string> {
        return this.ordersRepository.addOrder(userId, products);
    }
}
