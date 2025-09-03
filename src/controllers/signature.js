import  prisma from '../prisma'
export const UserController = {

        
        async store(req, res, next){
            
            const{ type, isActive, userId} = req.body;
            
            const u = await prisma.signature.create({   
                data: { type, isActive, userId}
            })
                
        }
    }