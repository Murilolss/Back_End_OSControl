import prisma from '../prisma';

    export const ClientController ={

     async store(req, res, next ){
        try{
        const { name, document, cep, phone, email, address, number, neighborhood, state, city, isActive, userId   } = req.body;
    
        const client =  await prisma.user.create({
            data: { name, document, cep, phone, email, address, number, neighborhood, state, city, isActive, userId }
        
     });

     res.status(201).json(client);

    }catch(error){
        next(error);
    }
            
   }
}