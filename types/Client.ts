export interface ClientInt{
    id      : string,
    name    : string,
    email   : string,
    company : string
}

export interface User extends ClientInt{
    password    : string
}