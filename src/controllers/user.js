import prisma from '../prisma.js';

export const UserController = {
    async store(req, res, next) {
        try {
            const { name,
                lasName,
                email,
                password,
                companyName,
                corporateReason,
                document,
                stateRegistration,
                cep,
                address,
                number,
                neighborhood,
                state,
                city,
                phone,
                site,
                birth,
                isActive } = req.body;

            function validaemail() {
                const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return regex.test(email);
            }

            function validaCpfCnpj(documento) {

                const doc = String(documento).replace(/[^\d]/g, '');

                if (doc.length === 11) {
                    if (/^0{11}$/.test(doc)) return false;

                    let soma = 0;

                    for (let i = 1; i <= 9; i++) {
                        soma += parseInt(doc.substring(i - 1, i)) * (11 - i);
                    }
                    let resto = (soma * 10) % 11;
                    if (resto === 10 || resto === 11) resto = 0;
                    if (resto !== parseInt(doc.substring(9, 10))) return false;


                    soma = 0;
                    for (let i = 1; i <= 10; i++) {
                        soma += parseInt(doc.substring(i - 1, i)) * (12 - i);
                    }
                    resto = (soma * 10) % 11;
                    if (resto === 10 || resto === 11) resto = 0;
                    return resto === parseInt(doc.substring(10, 11));
                }


                if (doc.length === 14) {
                    const b = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
                    if (/^0{14}$/.test(doc)) return false;


                    let n = 0;
                    for (let i = 0; i < 12; i++) {
                        n += doc[i] * b[i + 1];
                    }
                    if (doc[12] != ((n % 11) < 2 ? 0 : 11 - (n % 11))) return false;


                    n = 0;
                    for (let i = 0; i <= 12; i++) {
                        n += doc[i] * b[i];
                    }
                    return doc[13] == ((n % 11) < 2 ? 0 : 11 - (n % 11));
                }


                return false;
            }

            




            if (!validaCpfCnpj(document)) {
                return (res.status(300).json('CNPJ Ou CPF inválido'))
            }

            if (!validaemail(email)) {
                return (res.status(300).json('Email Inválido'))
            }

            if (!validaTelefone(phone)) {
                return (res.status(300).json('Telefone Inválido'))
            }

            const user = await prisma.user.create({
                data: {
                    name,
                    lasName,
                    email,
                    password,
                    companyName,
                    corporateReason,
                    document,
                    stateRegistration,
                    cep,
                    address,
                    number,
                    neighborhood,
                    state,
                    city,
                    phone,
                    site,
                    birth,
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

            let body = {}

            if (req.body.email) {
                body.email = req.body.email
            }

            if (req.body.document) {
                body.document = req.body.document
            }

            if (req.body.phone) {
                body.phone = req.body.phone
            }

            if (req.body.signature) {
                body.signature = req.body.signature
            }

            if (req.body.isActive) {
                body.isActive = Boolean(req.body.isActive)
            }

            const id = Number(req.params.id);

            const userUpdate = await prisma.user.update({
                where: { id },
                data: body
            })

            res.status(200).json(userUpdate)
        }
        catch (err) {
            res.status(404).json({ error: "Não encontrado" })
        }

    },

}