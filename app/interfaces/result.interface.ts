import { Product } from "../models/product.model";

export interface Result{
    products: Product[],
    total: number,
    skip: number,
    limit: number
}