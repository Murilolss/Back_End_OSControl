import prisma from '../prisma.js';

export const SignatureController = {
    async store(req, res, next){
        try{
        
            const{ type, isActive, userId} = req.body;
            
            const signature = await prisma.signature.create({   
                data: { 
                    type, 
                    isActive: Boolean(isActive),
                    userId: Number(userId)
                }
            });
            
            res.status(201).json(signature);
        }catch(error) {
            next(error);
        }
    },

    async index(req, res, next){

        let query = {}

        if (req.query.type){
            query = {name: req.query.type}
        }
        
        const signature = await prisma.user.findMany()

        res.status(200).json(signature)

    }
}