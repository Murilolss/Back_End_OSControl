import prisma from '../prisma.js';

export const ClientController ={
     async store(req, res, next ){
        try{
        const { name, document, cep, phone, email, address, number, neighborhood, state, city, isActive, userId   } = req.body;
    
        const client = await prisma.client.create({
            data: { 
                name, 
                document,
                cep, 
                phone, 
                email, 
                address, 
                number : Number(number),
                neighborhood, 
                state, 
                city, 
                isActive: Boolean(isActive), 
                userId : Number(userId)
            }
        
     });

     res.status(201).json(client);

    }catch(error){
        next(error);
    }   
   },
   async index(req, res, next){
    const client = await prisma.client.findMany()

    res.status(200).json(client)
}
   
}