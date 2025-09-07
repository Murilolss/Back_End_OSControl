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
    }
}