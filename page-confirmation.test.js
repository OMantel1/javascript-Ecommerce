import {resetLocalStorage, totalPrice} from './page-confirmation';

test('Set local storage test files', () => {
    localStorage.setItem("panier", "test file");
    expect(localStorage.getItem("panier")).toMatch("test file");

})

test('Reset local storage test files', () => {
    localStorage.setItem("panier", "test file");
    resetLocalStorage()
    expect(localStorage.getItem("panier")).toBeNull();
})


test('Get total price', () => {
    const myBasket = [
        {
            id: "5beaa8bf1c9d440000a57d94",
            name: "Arnold",
            price: 3900,
            quantity: 2
        },
        {
            id: "5be9c8541c9d440000665243",
            name: "Norbert",
            price: 2900,
            quantity: 3
        }
    ];

    expect(totalPrice(myBasket)).toBe(165);

})