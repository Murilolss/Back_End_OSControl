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

        try{

            let query = {}
    
            if (req.query.name){
                query = {name: req.query.name}
            }
    
            if(req.query.category){
                query = {category: req.query.category}
            }
    
            if(req.query.purchasePrice){
                query = {purchasePrice: req.query.purchasePrice}
            }
    
            if(req.query.salePrice){
                query = {salePrice: req.query.salePrice}
            }
    
            if(req.query.isActive){
                query = {isActive: req.query.isActive}
            }
    
            const product = await prisma.product.findMany({
                where: query
        });

        if(product.length == 0){
            res.status(404).json("Não encontrado")
        }
        else{
            res.status(200).json(product)
        }

        }
        catch(error){
            next(error)
        }
        }

}