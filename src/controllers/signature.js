import  prisma from '../prisma'
export const SignatureController = {
    async store(req, res, next){
        try{
        
            const{ type, isActive, userId} = req.body;
            
            const u = await prisma.signature.create({   
                data: { type, isActive, userId}
            });
            
            res.status(201).json(u);
        }catch(error) {
            next(error);
        }
    }
}