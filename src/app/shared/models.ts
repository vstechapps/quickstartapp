export interface User{
    id:string;
    email:string;
    password?:string;
    role:string;
}

export interface Consultant extends User{
    firstName:string;
    lastName:string;
    contact:string;
    address:Address;
}

export interface Company extends User{
    name:string;
    industry:string;
    contact:string;
    address:Address;
}

export interface Address{
    address:string;
    city:string;
    state:string;
    country:string;
    pincode:string;
}

export enum Role{
    USER="USER",
    ADMIN="ADMIN",
    COMPANY="COMPANY",
    CONSULTANT="CONSULTANT"
}


export interface Validation{
    ctrl:string,
    chcks:Condition[]
}

export interface Condition{
    chck:string,
    msg:string
    
}

export interface DocumentType{
    code:string;
    name:string
}

export const DocumentTypes:DocumentType[] = [
    {name: "Transfer Princing", code:"TP"},
    {name: "International Taxation", code:"IT"}
  ]
