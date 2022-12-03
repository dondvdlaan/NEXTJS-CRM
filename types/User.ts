export interface User{
    id          : string
    name        : string
    email       : string
    company     : string
    password    : string
}

export interface Seller extends User{
    role        : string
    clientIDs   : [
        {
            id: string
        }
    ]
}

export interface ClientInt extends User{
    role        : string
    sellerId    : string
}