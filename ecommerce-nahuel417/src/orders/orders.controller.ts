import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Get(':id')
    getOrder() {
        return this.ordersService.getOrder();
    }

    @Post()
    addOrder(@Body() order) {
        return this.ordersService.addOrder(order);
    }
}
