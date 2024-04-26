import { productsList } from "./crud"

export const sortNameAsc = () => {
    return [...productsList].sort((a, b) => a.name.localeCompare(b.name));
};

export const sortNameDesc = () => {
    return [...productsList].sort((a, b) => b.name.localeCompare(a.name));
};

export const sortPriceAsc = () => {
    return [...productsList].sort((a, b) => a.price - b.price);
};

export const sortPriceDesc = () => {
    return [...productsList].sort((a, b) => b.price - a.price);
};