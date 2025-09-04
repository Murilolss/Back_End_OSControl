import prisma from '../prisma';

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
                    purchasePrice, 
                    salePrice, 
                    observations, 
                    isActive,
                    userId
                }
        });

        res.status(201).json(product);
        }catch(error){
            next(error);
        }
    }
}