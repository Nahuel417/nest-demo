import {
    Body,
    Controller,
    Get,
    Param,
    ParseUUIDPipe,
    Post,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { createrOrderDto } from 'src/dto/createOrder.dto';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    //* GET *//
    @Get(':id')
    getOrder(@Param('id', ParseUUIDPipe) id: string) {
        return this.ordersService.getOrder(id);
    }

    //* POST *//
    @Post()
    addOrder(@Body() order: createrOrderDto) {
        const { userId, products } = order;
        return this.ordersService.addOrder(userId, products);
    }
}
