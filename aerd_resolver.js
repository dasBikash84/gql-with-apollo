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
    async addresses(_, args) {
      const { skip = 0, take = 10 } = args || {};
      return await prisma.addresses.findMany({
        take: +take,
        skip: +skip,
      });
    },
    async address(_, args) {
      return await prisma.addresses.findMany({
        where: { address_id: +args["address_id"] },
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
    async orderItems(_, args) {
      const { skip = 0, take = 10 } = args || {};
      return await prisma.order_items.findMany({
        take: +take,
        skip: +skip,
      });
    },
    async orderItem(_, args) {
      return await prisma.order_items.findUnique({
        where: { order_item_id: +args["order_item_id"] },
      });
    },
    async payments(_, args) {
      const { skip = 0, take = 10 } = args || {};
      return await prisma.payments.findMany({
        take: +take,
        skip: +skip,
      });
    },
    async paymentItem(_, args) {
      return await prisma.payments.findUnique({
        where: { payment_id: +args["payment_id"] },
      });
    },
    async productReviews(_, args) {
      const { skip = 0, take = 10 } = args || {};
      return await prisma.product_reviews.findMany({
        take: +take,
        skip: +skip,
      });
    },
    async productReviewItem(_, args) {
      return await prisma.product_reviews.findUnique({
        where: { review_id: +args["review_id"] },
      });
    },
    async shoppingCarts(_, args) {
      const { skip = 0, take = 10 } = args || {};
      return await prisma.shopping_cart.findMany({
        take: +take,
        skip: +skip,
      });
    },
    async shoppingCart(_, args) {
      return await prisma.shopping_cart.findUnique({
        where: { cart_id: +args["cart_id"] },
      });
    },
    async shoppingCartItems(_, args) {
      const { skip = 0, take = 10 } = args || {};
      return await prisma.shopping_cart_items.findMany({
        take: +take,
        skip: +skip,
      });
    },
    async shoppingCartItem(_, args) {
      return await prisma.shopping_cart_items.findUnique({
        where: { cart_item_id: +args["cart_item_id"] },
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
  OrderItem: {
    async order(parent) {
      return await prisma.orders.findUnique({
        where: { order_id: +parent.order_id },
      });
    },
    async product(parent) {
      return await prisma.products.findUnique({
        where: { product_id: +parent.product_id },
      });
    },
  },
  Payment: {
    async order(parent) {
      return await prisma["orders"].findUnique({
        where: { order_id: +parent["order_id"] },
      });
    },
  },
  ProductReview: {
    async user(parent) {
      return await prisma.users.findUnique({
        where: { user_id: +parent.user_id },
      });
    },
    async product(parent) {
      return await prisma.products.findUnique({
        where: { product_id: +parent.product_id },
      });
    },
  },
  ShoppingCart: {
    async user(parent) {
      return await prisma.users.findUnique({
        where: { user_id: +parent.user_id },
      });
    },
    async shopping_cart_items(parent) {
      return await prisma.shopping_cart_items.findMany({
        where: { cart_id: +parent.cart_id },
      });
    },
  },
  ShoppingCartItem: {
    async shopping_cart(parent) {
      return await prisma.shopping_cart.findUnique({
        where: { cart_id: +parent.cart_id },
      });
    },
    async product(parent) {
      return await prisma.products.findUnique({
        where: { product_id: +parent.product_id },
      });
    },
  },
};
