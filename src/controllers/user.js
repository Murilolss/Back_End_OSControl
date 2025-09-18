import prisma from '../prisma.js';

export const UserController = {
    async store(req, res, next) {
        try {
            const { email, password, document, phone, birth, signature, isActive } = req.body;

            const user = await prisma.user.create({
                data: {
                    email,
                    password,
                    document,
                    phone,
                    birth,
                    signature,
                    isActive: Boolean(isActive)
                }
            });

            res.status(201).json(user);
        } catch (error) {
            next(error);
        }
    },

    async index(req, res, _next) {
        try {

            let query = {}

            if (req.query.email) {
                query.email = req.query.email
            }

            if (req.query.document) {
                query.document = req.query.document
            }

            if (req.query.signature) {
                query.signature = req.query.signature
            }

            if (req.query.isActive) {
                query.isActive = req.query.isActive === "true" || req.query.isActive === true
            }


            const users = await prisma.user.findMany({
                where: query
            });
            if (users.length == 0) {
                res.status(404).json("Nada encontrado")
            } else {
                res.status(200).json(users)
            }
        }
        catch (error) {
            res.status(500).json({ error: "Erro interno ao buscar Users" });
        }
    },

    async show(req, res, _next) {
        try {

            const id = Number(req.params.id);

            let user = await prisma.user.findFirstOrThrow({ where: { id } })

            res.status(200).json(user)
        }
        catch (err) {
            res.status(404).json({ error: "Não encontrado" })
        }

    },

    async del(req, res, _next) {
        try {

            const id = Number(req.params.id);

            let user = await prisma.user.delete({ where: { id } })

            res.status(200).json(user)
        }
        catch (err) {
            res.status(404).json({ error: "Não encontrado" })
        }

    },

    async update(req, res, _next) {
        
        try {
        
            const id = Number(req.params.id);
            const document = (req.query.document)

            const userUpdate = await prisma.user.update({ 
                where:  {id} ,
                data: {document}})

            res.status(200).json(userUpdate)
        }
        catch (err) {
            res.status(404).json({ error: "Não encontrado" })
        }

    },

}