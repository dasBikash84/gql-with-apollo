import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({
  log: ["query"],
});

// resolvers
export const resolvers = {
  Query: {
    async users(_, args) {
      const { skip = 0, take = 10 } = args || {};
      return await prisma.users.findMany({
        take: +take,
        skip: +skip,
      });
    },
    async user(_, args) {
      return await prisma.users.findUnique({
        where: { user_id: +args["user_id"] },
      });
    },
    async address(_, args) {
      return await prisma.addresses.findMany({
        where: { user_id: +args["user_id"] },
      });
    },
    async categories(_, args) {
      const { skip = 0, take = 10 } = args || {};
      return await prisma.categories.findMany({
        take: +take,
        skip: +skip,
      });
    },
    async category(_, args) {
      return await prisma.categories.findUnique({
        where: { category_id: +args["category_id"] },
      });
    },
    async products(_, args) {
      const { skip = 0, take = 10 } = args || {};
      return await prisma.products.findMany({
        take: +take,
        skip: +skip,
      });
    },
    async product(_, args) {
      return await prisma.products.findUnique({
        where: { product_id: +args["product_id"] },
      });
    },
    async orders(_, args) {
      const { skip = 0, take = 10 } = args || {};
      return await prisma.orders.findMany({
        take: +take,
        skip: +skip,
      });
    },
    async order(_, args) {
      return await prisma.orders.findUnique({
        where: { order_id: +args["order_id"] },
      });
    },
  },
  User: {
    async addresses(parent) {
      return await prisma.addresses.findMany({
        where: { user_id: parent.user_id },
      });
    },
    async orders(parent) {
      return await prisma.orders.findMany({
        where: { user_id: parent.user_id },
      });
    },
    async product_reviews(parent) {
      return await prisma.product_reviews.findMany({
        where: { user_id: parent.user_id },
      });
    },
    async shopping_cart(parent) {
      return await prisma.shopping_cart.findFirst({
        where: { user_id: parent.user_id },
      });
    },
  },
  Address: {
    async user(parent) {
      return await prisma.users.findUnique({
        where: { user_id: parent.user_id },
      });
    },
  },
  Category: {
    async products(parent) {
      return await prisma.products.findMany({
        where: { category_id: +parent.category_id },
      });
    },
    // TODO: parent_category and subcategories impl later
    // async parent_category(parent) {
    //   return await prisma.categories.findUnique({
    //     where: { category_id: parent.parent_category_id },
    //   });
    // },
    // async subcategories(parent) {
    //   return await prisma.categories.findMany({
    //     where: { parent_category_id: parent.category_id },
    //   });
    // },
  },
  Product: {
    async category(parent) {
      return await prisma.categories.findUnique({
        where: { category_id: +parent.category_id },
      });
    },
    async product_reviews(parent) {
      return await prisma.product_reviews.findMany({
        where: { product_id: +parent.product_id },
      });
    },
    async order_items(parent) {
      return await prisma.order_items.findMany({
        where: { product_id: +parent.product_id },
      });
    },
    async shopping_cart_items(parent) {
      return await prisma.shopping_cart_items.findMany({
        where: { product_id: +parent.product_id },
      });
    },
  },
    Order: {
        async user(parent) {
        return await prisma.users.findUnique({
            where: { user_id: parent.user_id },
        });
        },
        async order_items(parent) {
        return await prisma.order_items.findMany({
            where: { order_id: +parent.order_id },
        });
        },
        async payments(parent) {
        return await prisma.payments.findMany({
            where: { order_id: +parent.order_id },
        });
        },
    },
};
