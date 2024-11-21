import {
  findManyWithPagination,
  findUnique,
  prismaClient as prisma
} from "./prisma/utlis/prisma_query_utils.js";

// resolvers
export const resolvers = {
  Query: {
    async users(_, args) {
      return await findManyWithPagination("users", args);
    },
    async user(_, args) {
      return await findUnique("users", "user_id", +args["user_id"]);
    },
    async addresses(_, args) {
      return await findManyWithPagination("addresses", args);
    },
    async address(_, args) {
      return await findUnique("addresses", "address_id", +args["address_id"]);
    },
    async categories(_, args) {
      return await findManyWithPagination("categories", args);
    },
    async category(_, args) {
      return await findUnique(
        "categories",
        "category_id",
        +args["category_id"]
      );
    },
    async products(_, args) {
      return await findManyWithPagination("products", args);
    },
    async product(_, args) {
      return await findUnique("products", "product_id", +args["product_id"]);
    },
    async orders(_, args) {
      return await findManyWithPagination("orders", args);
    },
    async order(_, args) {
      return await findUnique("orders", "order_id", +args["order_id"]);
    },
    async orderItems(_, args) {
      return await findManyWithPagination("order_items", args);
    },
    async orderItem(_, args) {
      return await findUnique(
        "order_items",
        "order_item_id",
        +args["order_item_id"]
      );
    },
    async payments(_, args) {
      return await findManyWithPagination("payments", args);
    },
    async paymentItem(_, args) {
      return await findUnique("payments", "payment_id", +args["payment_id"]);
    },
    async productReviews(_, args) {
      return await findManyWithPagination("product_reviews", args);
    },
    async productReviewItem(_, args) {
      return await findUnique(
        "product_reviews",
        "review_id",
        +args["review_id"]
      );
    },
    async shoppingCarts(_, args) {
      return await findManyWithPagination("shopping_cart", args);
    },
    async shoppingCart(_, args) {
      return await findUnique("shopping_cart", "cart_id", +args["cart_id"]);
    },
    async shoppingCartItems(_, args) {
      return await findManyWithPagination("shopping_cart_items", args);
    },
    async shoppingCartItem(_, args) {
      return await findUnique(
        "shopping_cart_items",
        "cart_item_id",
        +args["cart_item_id"]
      );
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
