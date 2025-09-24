import prisma from '../prisma.js';

export const ClientController ={
     async store(req, res, next ){
        try{
        const { name, document, cep, phone, email, address, number, neighborhood, state, city, isActive, userId   } = req.body;

        let user = await prisma.user.findFirst({
            where: {id: Number(userId)}
        });

        if(!user){
            res.status(301).json({
                'error': "O Usuario não encontrado"
            });
            return
        }
    
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

    }catch(err){
        next(err);
    }   
    },
   async index(req, res, next){

    try{

    let query = {}

        if (req.query.name){
            query.name = {contains: req.query.name}
        }

        if (req.query.document){
            query.document = req.query.document
        }

        if (req.query.cep){
            query.cep = req.query.cep
        }

        if (req.query.phone){
            query.phone = req.query.phone
        }

        if (req.query.email){
            query.email =  req.query.email
        }

        if (req.query.address){
            query.address = req.query.address
        }

        if (req.query.number){
            query.number = req.query.number
        }

        if (req.query.neighborhood){
            query.neighborhood =  req.query.neighborhood
        }
        
        if (req.query.state){
            query.state = req.query.state
        } 

        if (req.query.city){
            query.city =  req.query.city
        } 

        if (req.query.isActive) {
            query.isActive = req.query.isActive === "true" || req.query.isActive === true
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
    catch(err){
        next(err);
    }
    
    },
   
    async show(req, res, next){
        try{
        const id = Number(req.params.id);

        let client = await prisma.client.findFirstOrThrow({where: {id}})
        
        res.status(200).json(client)
    }
    catch(err){
        res.status(404).json({error: "Não encontrado"})
    }

    },

    async del(req, res, _next){
        try {
            const id = Number(req.params.id);

            const client = await prisma.client.delete({
                where: { id }
            });

            res.status(200).json(client);
        } catch (err) {
            res.status(404).json({error: "Não encontrado"});
        }
    },

    async update(req, res, _next){
        try {

            let body = {}

            if (req.body.name) {
                body.name = req.body.name
            }

            if (req.body.document) {
                body.document = req.body.document
            }

            if (req.body.cep) {
                body.cep = req.body.cep
            }

            if (req.body.phone) {
                body.phone = req.body.phone
            }

            if (req.body.email) {
                body.email = req.body.email
            }

            if (req.body.address) {
                body.address = req.body.address
            }

            if (req.body.number) {
                body.number = req.body.number
            }

            if (req.body.neighborhood) {
                body.neighborhood = neighborhood
            }

            if (req.body.state) {
                body.state = state
            }

            if (req.body.city) {
                body.city = city
            }

            if (req.body.isActive) {
                body.isActive = Boolean(req.body.isActive)
            }
            
            
            const id = Number(req.params.id);

            const clientUpdate = await prisma.client.update({ 
                where:  {id} ,
                data: body })

            res.status(200).json(clientUpdate);
        } catch (err) {
            res.status(404).json({error: "Não encontrado"});
        }
    }
}