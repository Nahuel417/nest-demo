import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './orders.entity';
import { Product } from 'src/products/products.entity';
import { User } from 'src/users/users.entity';
import { OrderDetail } from 'src/orderDetails/orderDetails.entity';

@Injectable()
export class OrdersRepository {
    constructor(
        @InjectRepository(Order) private ordersRepository: Repository<Order>,
        @InjectRepository(User) private usersRepository: Repository<User>,
        @InjectRepository(Product)
        private productsRepository: Repository<Product>,
        @InjectRepository(OrderDetail)
        private orderDetailsRepository: Repository<OrderDetail>,
    ) {}

    async getOrder(id: string): Promise<Order | null> {
        const order = await this.ordersRepository.findOne({
            where: { id },
            relations: ['orderDetails', 'orderDetails.products'],
        });

        if (!order) {
            return null;
        }

        return order;
    }

    async addOrder(userId: string, products: any): Promise<Order[]> {
        let total = 0;
        const user = await this.usersRepository.findOneBy({ id: userId });

        if (!user) {
            throw new NotFoundException('No se encontro el usuario');
        }

        const order = new Order();
        order.date = new Date();
        order.user_id = user;

        const newOrder = await this.ordersRepository.save(order);

        const productsArray = await Promise.all(
            products.map(async (producto) => {
                const product = await this.productsRepository.findOneBy({
                    id: producto.id,
                });

                if (!product) {
                    throw new NotFoundException('Producto no encontrado');
                }

                total += +product.price;

                await this.productsRepository.update(
                    { id: product.id },
                    { stock: product.stock - 1 },
                );

                return product;
            }),
        );

        const orderDetail = new OrderDetail();
        orderDetail.price = +total.toFixed(2);
        orderDetail.products = productsArray;
        orderDetail.order_id = newOrder;

        const savedOrderDetail =
            await this.orderDetailsRepository.save(orderDetail);

        newOrder.orderDetails = savedOrderDetail;
        await this.ordersRepository.save(newOrder);

        return await this.ordersRepository.find({
            where: { id: newOrder.id },
            relations: ['orderDetails'],
        });
    }
}
