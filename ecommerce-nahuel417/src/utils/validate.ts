import { Product } from 'src/products/products.entity';

export function validateUser(user: any): boolean {
    const validUser =
        user.email !== undefined &&
        user.password !== undefined &&
        user.address !== undefined &&
        user.name !== undefined &&
        user.phone !== undefined;

    return validUser;
}

export function validateProduct(product: Partial<Product>): boolean {
    const validproduct =
        product.imgUrl !== undefined &&
        product.stock !== undefined &&
        product.description !== undefined &&
        product.price !== undefined &&
        product.name !== undefined;

    console.log(validproduct);

    return validproduct;
}
