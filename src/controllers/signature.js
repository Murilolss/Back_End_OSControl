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

        try{
            
            let query = {}
    
            if (req.query.type){
                query = {name: req.query.type}
            }
    
            if (req.query.isActive){
                query = {isActive: req.query.isActive}
            }
            
            const signature = await prisma.user.findMany({
                where: query
            });

            if(signature.length == 0){
                res.status(404).json("Não encontrado")
            }
            else{
                res.status(200).json(signature)
            }
    
           
    
        }
        catch(error){
            next(error);
        }
        }

}