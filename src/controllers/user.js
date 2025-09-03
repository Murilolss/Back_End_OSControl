import prisma from '../prisma';

export const UserController = {
    async store(req, res, next){
        try{
            const {email, password, document, phone, birth, signature, is_active} = req.body;
    
            const user = await prisma.user.creat({
            data: {
                email,
                password,
                document,
                phone,
                birth,
                signature,
                is_active
            }
        });

        res.status(201).json(user);
        }catch(error){
            next(error);
        }
    }
}