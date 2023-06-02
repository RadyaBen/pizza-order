export interface Routes {
    homePage: string;
    pizzaPage: (pizzaId?: null | string) => string;
    cartPage: string;
}
