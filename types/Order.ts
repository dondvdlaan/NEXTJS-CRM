import { ProductInt } from "./Product"

export type OrderStatus = {
    value   : string,
    label   : string
}
export interface OrderInt{
    id          : string,
    products    : ProductInt[],
    total       : string,
    clientName  : string,
    status      : OrderStatus
}

export interface RawNewOrder{
    productID   : [{key: string, value: string}],
    total       : string,
    clientName  : string,
    status      : string
}


