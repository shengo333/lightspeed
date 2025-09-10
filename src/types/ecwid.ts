// we can change this later when we have all endpoints set 

export interface EcwidProduct {
  id: number
  name: string
  price: number
  description?: string
  thumbnailUrl?: string
  imageUrl?: string
}

export interface EcwidCategory {
  id: number
  name: string
  productCount: number
  parentId?: number
  orderBy: number
  url: string
  enabled: boolean
}
