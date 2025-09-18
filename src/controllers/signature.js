import prisma from '../prisma.js';

export const SignatureController = {
    async store(req, res, next) {
        try {

            const { type, isActive, userId } = req.body;

            const signature = await prisma.signature.create({
                data: {
                    type,
                    isActive: Boolean(isActive),
                    userId: Number(userId)
                }
            });

            res.status(201).json(signature);
        } catch (error) {
            next(error);
        }
    },

    async index(req, res, next) {

        try {

            let query = {}

            if (req.query.type) {
                query.type = req.query.type
            }

            if (req.query.isActive) {
                query.isActive = req.query.isActive === "true" || req.query.isActive === true
            }

            const signature = await prisma.user.findMany({
                where: query
            });

            if (signature.length == 0) {
                res.status(404).json("Não encontrado")
            }
            else {
                res.status(200).json(signature)
            }


        }
        catch (error) {
            next(error);
        }
    },

    async show(req, res, _next) {
        try {

            const id = Number(req.params.id);

            let signature = await prisma.signature.findFirstOrThrow({ where: { id } })

            res.status(200).json(signature)
        }
        catch (err) {
            res.status(404).json({ error: "Não encontrado" })
        }

    },

    async del(req, res, _next) {
        try {

            const id = Number(req.params.id);

            let signature = await prisma.signature.delete({ where: { id } })

            res.status(200).json(signature)
        }
        catch (err) {
            res.status(404).json({ error: "Não encontrado" })
        }

    },

    async update(req, res, _next) {
        try {

            let body = {}

            if (req.query.type) {
                body.type = req.query.type
            }

            if (req.body.isActive) {
                body.isActive = req.body.isActive
            }

            const id = Number(req.params.id);

            let signatureUpdate = await prisma.signature.update({
                where: {id},
                data: body });

            res.status(200).json(signatureUpdate)
        }
        catch (err) {
            res.status(404).json({ error: "Não encontrado" })
        }

    },

    

}

