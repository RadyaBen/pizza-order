export interface PizzaItem {
    id: string;
    imageUrl: string;
    title: string;
    description: string;
    types: number[];
    sizeToPriceMap: {
        size: number;
        price: number;
    }[];
    category: number;
    rating: number;
}
