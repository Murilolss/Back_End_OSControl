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

    try{

    let query = {}

        if (req.query.name){
            query = {name: req.query.name}
        }

        if (req.query.document){
            query = {document: req.query.document}
        }

        if (req.query.cep){
            query = {cep: req.query.cep}
        }

        if (req.query.phone){
            query = {phone: req.query.phone}
        }

        if (req.query.email){
            query = {email: req.query.email}
        }

        if (req.query.address){
            query = {address: req.query.address
        }

        if (req.query.number){
            query = {number: req.query.number}
        }

        if (req.query.neighborhood){
            query = {neighborhood: req.query.neighborhood}
        }
        
        if (req.query.state){
            query = {state: req.query.state}
        } 

        if (req.query.city){
            query = {city: req.query.city}
        } 

        if (req.query.isActive){
            query = {isActive: req.query.isActive}
        } 


    const clients = await prisma.client.findMany({
        where: query 
    });

    if(clients.length == 0){
        res.status(404).json("Não encontrado")
    }
    else{   
        res.status(200).json(clients)
    }
    
}
    }
    catch(error){
        next(error);
    }
   
    }
}