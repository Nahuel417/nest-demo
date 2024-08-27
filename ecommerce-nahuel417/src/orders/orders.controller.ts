import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersDto } from 'src/dto/orders.dto';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    //* GET *//
    @Get(':id')
    getOrder(@Param('id') id: string) {
        return this.ordersService.getOrder(id);
    }

    //* POST *//
    @Post()
    addOrder(@Body() order: OrdersDto) {
        const { userId, products } = order;
        return this.ordersService.addOrder(userId, products);
    }
}
