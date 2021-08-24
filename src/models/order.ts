import client from "../database";

export type Order = {
    id ?: Number;
    product_id: Number;
    quantity: Number;
    user_id: Number;
    status: string;
}

