import {
    Body,
    Controller,
    Get,
    Param,
    ParseUUIDPipe,
    Post,
    UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { createrOrderDto } from 'src/dto/createOrder.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    //* GET *//
    @UseGuards(AuthGuard)
    @Get(':id')
    getOrder(@Param('id', ParseUUIDPipe) id: string) {
        return this.ordersService.getOrder(id);
    }

    //* POST *//
    @UseGuards(AuthGuard)
    @Post()
    addOrder(@Body() order: createrOrderDto) {
        const { userId, products } = order;
        return this.ordersService.addOrder(userId, products);
    }
}
