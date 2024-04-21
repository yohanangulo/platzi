interface IProduct {
  id?: number
  name: string
  description: string
  price: number
  stock: number
  imageUrl: string
}

export class Product {
  constructor({ id, name, description, imageUrl, price, stock }: IProduct) {
    this.id = id
    this.name = name
    this.description = description
    this.price = price
    this.stock = stock
    this.imageUrl = imageUrl
  }
  id: number
  name: string
  description: string
  price: number
  stock: number
  imageUrl: string
}
