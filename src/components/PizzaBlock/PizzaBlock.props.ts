export interface PizzaBlockProps {
    id: string;
    imageUrl: string;
    title: string;
    types: number[];
    sizeToPriceMap: {
        size: number;
        price: number;
    }[];
}
