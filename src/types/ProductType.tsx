export interface ProductType {
    id: string;
    name: string;
    img: string;
    category: {value:string ,label :string};
    description: string;
    price: number;
    quantity: number;
  }