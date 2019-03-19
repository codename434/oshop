export interface ProductKeyValue{
    key : string;
    value : Product;
}

export interface Product {
    title: string;
    price:number;
    category: string;
    imageUrl:string;
}