import prisma from '../prisma';

export const ProductController ={

    async store(req, res, next ){
        try{
        const { name, category, description,  salesUnit, purchasePrice , salePrice, observations, isActive,userId  } = req.body;
    
        const product =  await prisma.user.create({
                data: { name, category, description,  salesUnit, purchasePrice, salePrice, observations, isActive,userId  }
                  
        });

        res.status(201).json(pruduct);
    }catch(error){
        next(error);
    }
}
}