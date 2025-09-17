import prisma from '../prisma.js';

export const UserController = {
    async store(req, res, next){
        try{
            const {email, password, document, phone, birth, signature, isActive} = req.body;
    
            const user = await prisma.user.create({
            data: {
                email,
                password,
                document,
                phone,
                birth,
                signature,
                isActive : Boolean(isActive)
            }
        });

        res.status(201).json(user);
        }catch(error){
            next(error);
        }
    },

    async index(req, res, _next){

        let query = {}

        if (req.query.email){
            query = {name: req.query.email}
        }
        

        const users = await prisma.user.findMany({
            where: query
    })

        res.status(200).json(users)

    },

    async show(req, res, _next){
        try{
    
            const id = Number(req.params.id);
            
            let user = await prisma.user.findFirstOrThrow({where: {id}})
            
            res.status(200).json(user)
        }
        catch(err){
            res.status(404).json({error: "Não encontrado"})
        }

    },

    async del(req, res, _next){
        try{
    
            const id = Number(req.params.id);
            
            let user = await prisma.user.delete({where: {id}})
            
            res.status(200).json(user)
        }
        catch(err){
            res.status(404).json({error: "Não encontrado"})
        }

    }

}