import prisma from '../prisma.js';

export const ShopController = {
    async store(req, res, next){
    try{ 

        const{ orderId, productId, amount, salePrice} = req.body;

        const shop = await prisma.shop.create({
            data:{ 
                orderId, 
                productId, 
                amount, 
                salePrice
            }
        });

        res.status(201).json(shop);
        } catch(error) {
            next(error);
        }
    }
}
