import  prisma from '../prisma'
export const SignatureController = {
    async store(req, res, next){
        try{
        
            const{ type, isActive, userId} = req.body;
            
            const signature = await prisma.signature.create({   
                data: { 
                    type, 
                    isActive, 
                    userId
                }
            });
            
            res.status(201).json(signature);
        }catch(error) {
            next(error);
        }
    }
}