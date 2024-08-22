import { Injectable } from '@nestjs/common';

@Injectable()
export class OrdersRepository {
    private orders = [];

    async getOrder() {
        return this.orders;
    }

    async addOrder(order) {
        return `orden añadida ${order}`;
    }
}
