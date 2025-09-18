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

        try{

            let query = {}
    
            if (req.query.price){
                query = {price: req.query.price}
            }
    
            if (req.query.amount){
                query = {amount: req.query.amount}
            }
    
            if (req.query.product){
                query = {product: req.query.product}
            }
    
            
    
            const shops = await prisma.user.findMany({
                where: query
            });

            if(shops.length == 0){
                res.status(404).json("Não encontrado")
            }
            else{
                res.status(200).json(shops)
            }
    
          
    
        }
        catch(error){
            next(error);
        }
    },

     async show(req, res, _next) {
        try {

            const id = Number(req.params.id);

            let shop = await prisma.signature.findFirstOrThrow({ where: { id } })

            res.status(200).json(shop)
        }
        catch (err) {
            res.status(404).json({ error: "Não encontrado" })
        }

    },

    async del(req, res, _next) {
        try {

            const id = Number(req.params.id);

            let signature = await prisma.shop.delete({ where: { id } })

            res.status(200).json(signature)
        }
        catch (err) {
            res.status(404).json({ error: "Não encontrado" })
        }

    },

    async update(req, res, _next) {
        try {

            let body = {}
    
            if (req.query.amount){
                body.amount = req.body.amount
            }
    
            if (req.body.product){
                body.product = req.body.product
            }

            let id = Number(req.params.id);

            const shopUpdate = await prisma.shop.update({ 
                where:  {id} ,
                data: body })

            

            res.status(200).json(shopUpdate)
        }
        catch (err) {
            res.status(404).json({ error: "Não encontrado" })
        }

    }

}
