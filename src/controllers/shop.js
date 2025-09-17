import prisma from '../prisma.js';

export const ShopController = {
    async store(req, res, next){
    try{ 

        const{ orderId, productId, amount, salePrice} = req.body;

        const shop = await prisma.shop.create({
            data:{ 
                orderId: Number(orderId),
                productId: Number(productId),
                amount: Number(amount),
                salePrice: Number(salePrice)
            }
        });

        res.status(201).json(shop);
        } catch(error) {
            next(error);
        }
    },

    async index(req, res, next){

        let query = {}

        if (req.query.amount){
            query = {name: req.query.amount}
        }

        const shops = await prisma.user.findMany()

        res.status(200).json(shops)

    }
}
