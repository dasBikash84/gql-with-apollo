export const typeDefs = `#graphql
type User {
  user_id: ID!
  first_name: String!
  last_name: String!
  email: String!
  phone_number: String
  created_at: String!
  updated_at: String!
  addresses: [Address]
  orders: [Order]
  product_reviews: [ProductReview]
  shopping_cart: ShoppingCart
}

type Address {
  address_id: ID!
  user_id: ID!
  address_line1: String!
  address_line2: String
  city: String!
  state: String
  postal_code: String!
  country: String!
  phone_number: String
  is_default: Boolean
  created_at: String!
  updated_at: String!
  user: User
}

type Category {
  category_id: ID!
  name: String!
  description: String
  parent_category_id: ID
  created_at: String!
  updated_at: String!
  parent_category: Category
  subcategories: [Category]
  products: [Product]
}

type Product {
  product_id: ID!
  name: String!
  description: String
  price: Float!
  stock_quantity: Int
  category_id: ID
  image_url: String
  created_at: String!
  updated_at: String!
  category: Category
  product_reviews: [ProductReview]
  order_items: [OrderItem]
  shopping_cart_items: [ShoppingCartItem]
}

type Order {
  order_id: ID!
  user_id: ID!
  total_price: Float!
  shipping_address: String
  order_status: String
  created_at: String!
  updated_at: String!
  user: User
  order_items: [OrderItem]
  payments: [Payment]
}

type OrderItem {
  order_item_id: ID!
  order_id: ID!
  product_id: ID!
  quantity: Int!
  unit_price: Float!
  total_price: Float!
  created_at: String!
  order: Order
  product: Product
}

type Payment {
  payment_id: ID!
  order_id: ID!
  payment_method: String
  payment_status: String
  payment_date: String!
  amount: Float!
  order: Order
}

type ProductReview {
  review_id: ID!
  user_id: ID!
  product_id: ID!
  rating: Int!
  review_text: String
  created_at: String!
  user: User
  product: Product
}

type ShoppingCart {
  cart_id: ID!
  user_id: ID!
  created_at: String!
  updated_at: String!
  user: User
  shopping_cart_items: [ShoppingCartItem]
}

type ShoppingCartItem {
  cart_item_id: ID!
  cart_id: ID!
  product_id: ID!
  quantity: Int!
  added_at: String!
  shopping_cart: ShoppingCart
  product: Product
}

type Query {
  users(skip:ID,take:ID): [User]
  user(user_id: ID!): User
  # addresses: [Address]
  # address(address_id: ID!): Address
  # categories: [Category]
  # category(category_id: ID!): Category
  # products: [Product]
  # product(product_id: ID!): Product
  # orders: [Order]
  # order(order_id: ID!): Order
  # orderItems: [OrderItem]
  # orderItem(order_item_id: ID!): OrderItem
  # payments: [Payment]
  # payment(payment_id: ID!): Payment
  # productReviews: [ProductReview]
  # productReview(review_id: ID!): ProductReview
  # shoppingCarts: [ShoppingCart]
  # shoppingCart(cart_id: ID!): ShoppingCart
  # shoppingCartItems: [ShoppingCartItem]
  # shoppingCartItem(cart_item_id: ID!): ShoppingCartItem
}
`