import prisma from '../prisma.js';

export const ProductController ={
    async store(req, res, next ){
        try{
        const { name, category, description,  salesUnit, purchasePrice , salePrice, observations, isActive,userId  } = req.body;
    
        const product =  await prisma.product.create({
                data: { 
                    name, 
                    category, 
                    description, 
                    salesUnit, 
                    purchasePrice : Number(purchasePrice), 
                    salePrice : Number(salePrice), 
                    observations, 
                    isActive : Boolean(isActive),
                    userId : Number(userId)
                }
        });

        res.status(201).json(product);
        }catch(error){
            next(error);
        }
    },
    async index(req, res, next){
        const product = await prisma.product.findMany()

        res.status(200).json(product)
    }
}