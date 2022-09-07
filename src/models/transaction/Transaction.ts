export type CreateTransactionResponse = {
  data: CreateTransactionItem;
}
export type CreateTransactionItem = {
  client_secret: string;
  ephemeral_key: string;
  customer_id: string;
  publishable_key: string;
}
