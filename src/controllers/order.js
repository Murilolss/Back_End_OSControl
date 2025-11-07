import prisma from "../prisma.js";

export const OrderController = {
  //C - CREATE, INSERT, POST, SET, STORE
  async store(req, res, next) {
    try {
      const { serviceId, clientId, equipment, defect, report, guarantee, status, dateDelivery, dateRecipt, dateCreate, products } = req.body;

      const error = {}

      let user = await prisma.user.findFirst({
        where: { id: Number(req.logado.id) }
      });

      if (!user) {
        error.user = { message: "error: Usuário informado não existe" }
      }

      let service = await prisma.service.findFirst({
        where: { id: Number(serviceId) },
      });

      if (!service) {
        error.service = { message: "error: Serviço informado não existe" };
      }

      let client = await prisma.client.findFirst({
        where: { id: Number(clientId) },
      });

      if (!client) {
        error.client = { message: "error: Cliente informado não existe" };
      }

      if (Object.keys(error).length > 0) {
        res.status(301).json(error);
        return;
      }

      const create = await prisma.order.create({
        data: {
          userId: Number(req.logado.id),
          serviceId: Number(serviceId),
          clientId: Number(clientId),
          equipment,
          defect,
          report,
          guarantee,
          status,
          dateCreate,
          dateDelivery,
          dateRecipt,

          shops: {
            create: products.map((p) => ({
              productId: Number(p.productId),
              amount: Number(p.amount),
              salePrice: p.salePrice
            }))
          }
        },
        include: {
          shops: {
            include: { product: true }
          },
          client: true,
          service: true
        }

      });
      // respondendo 201-criado encapsulando no formato json(order)
      res.status(201).json(create)
    }
    catch (error) {
      next(error);
    }
  },
  //R - READ, SELECT, GET, findMany
  async index(req, res, next) {
    try {
      let query = {}

      // if (req.query.saleMax && req.query.saleMin) {
      //     query.salePrice = { gte: Number(req.query.saleMin), lte: Number(req.query.saleMax)}
      // }
      // else if (req.query.saleMax) {
      //     query.salePrice = {gte: Number(req.query.saleMin)}
      // }
      // else if (req.query.saleMin) {
      //     query.salePrice = {lte: Number(req.query.saleMax)}
      // }
      if (req.query.productPrice) {
        query.productPrice = req.query.productPrice;
      }

      const orders = await prisma.order.findMany({
        where: query,
        include: {
          client: true,
          service: true,
          shops: {
            include: { product: true }
          }
        }
      });
      if (orders.length === 0) {
        return res.status(404).json({ message: "Nada encontrado" });
      } else 

      {
        const ordersWithTotal = orders.map(order => {

          // Total de serviços
          let totalService = 0;
          if (Array.isArray(order.service)) {
            totalService = order.service.reduce(
              (acc, s) => acc + (Number(s.price) || 0),
              0
            );
          } else if (order.service) {
            totalService = Number(order.service.price) || 0;
          }

          // Total de produtos
          const totalProducts = (order.shops || []).reduce((acc, shop) => {
            const productPrice = Number(shop.product.salePrice) || 0;
            const quantity = Number(shop.amount) || 1;
            return acc + productPrice * quantity;
          }, 0);

          // Soma total geral
          const total = totalService + totalProducts;

          return {
            ...order,
            totalService,
            totalProducts,
            total,
          };
        });

        res.status(200).json(ordersWithTotal);

      }
    } catch (error) {
      next(error);
    }
  },
  //R - READ, SELECT, GET, find
  async show(req, res, _next) {
    try {
      const id = Number(req.params.id);

      let order = await prisma.order.findFirstOrThrow({
        where: { id },
      });

      res.status(200).json(order);
    } catch (err) {
      res.status(404).json({ error: "Erro interno ao buscar orders" });
    }
  },

  async del(req, res, _next) {
    try {
      const id = Number(req.params.id);

      let order = await prisma.order.delete({
        where: { id }
      });

      res.status(200).json(order);
    } catch (err) {
      res.status(404).json({ error: "Erro interno ao buscar orders" });
    }
  },

  async update(req, res, _next) {
    try {
      let body = {};

      if (req.body.servicePrice) {
        body.servicePrice = Number(req.body.servicePrice);
      }
      if (req.body.productPrice) {
        body.productPrice = Number(req.body.productPrice);
      }

      const id = Number(req.params.id);

      const updateOrder = await prisma.order.update({
        where: { id },
        data: body,
      });

      res.status(200).json(updateOrder);
    } catch (err) {
      res.status(404).json({ error: "Erro interno ao buscar orders" });
    }
  },
};
