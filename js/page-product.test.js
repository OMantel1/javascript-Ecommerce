import "regenerator-runtime/runtime";
import {
  apiCall,
  displayProduct,
  displayProductColorsOptions,
} from "./page-product.js";
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        colors: ["Tan", "Chocolate", "Black", "White"],
        _id: "5be9c8541c9d440000665243",
        name: "Norbert",
        price: 2900,
        imageUrl: "http://oriteddies-api.herokuapp.com/images/teddy_1.jpg",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      }),
  })
);

describe("When the api is called", () => {
  test("it should call api 1 time", async () => {
    let id = "5be9c8541c9d440000665243";
    const data = await apiCall(id);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test("it should return the right name", async () => {
    let id = "5be9c8541c9d440000665243";
    const data = await apiCall(id);
    expect(data.name).toEqual("Norbert");
  });

  test("it should return the right price", async () => {
    let id = "5be9c8541c9d440000665243";
    const data = await apiCall(id);
    expect(data.price).toEqual(2900);
  });
});

let product = {
  colors: ["Tan", "Chocolate", "Black", "White"],
  _id: "5be9c8541c9d440000665243",
  name: "Norbert",
  price: 2900,
  imageUrl: "http://oriteddies-api.herokuapp.com/images/teddy_1.jpg",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
};

beforeAll(() => {
  document.body.innerHTML = `<section>
    <div class="product__single">
    </div>            
  </section>`;
  displayProduct(product);
  displayProductColorsOptions(product);
});


describe("When productDisplay is called", () => {
  test("it should insert a Dom element with the class 'product__image-big'", () => {
    expect(document.querySelector(".product__image-big")).not.toBeNull();
  });
  test("it should insert a Dom element with the class 'product__infos-details'", () => {
    expect(document.querySelector(".product__infos-details")).not.toBeNull();
  });
  test("it should insert a Dom element with the class 'productName'", () => {
    expect(document.querySelector(".productName")).not.toBeNull();
  });
  test("it should insert a Dom element with the class 'productDescription'", () => {
    expect(document.querySelector(".productDescription")).not.toBeNull();
  });
  test("it should insert a Dom element with the class 'productPrice'", () => {
    expect(document.querySelector(".productPrice")).not.toBeNull();
  });
  test("it should insert a Dom element with the class 'productOptions'", () => {
    expect(document.querySelector(".productOptions")).not.toBeNull();
  });
  test("it should insert form elements", () => {
    expect(document.querySelector("form")).not.toBeNull();
    expect(document.querySelector("label")).not.toBeNull();
    expect(document.querySelector("select")).not.toBeNull();
    expect(document.querySelector(".optionsBox")).not.toBeNull();
  });
  test("it should insert options elements", () => {
    expect(document.querySelector(".productQuantity")).not.toBeNull();
    expect(document.querySelector(".addSubButtons")).not.toBeNull();
  });

  test("it should insert te right name (Norbert)", () => {
    expect(document.querySelector(".productName").textContent).toEqual(
      "Norbert"
    );
  });
  test("it should insert the right description", () => {
    expect(document.querySelector(".productDescription").textContent).toEqual(
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    );
  });
  test("it should insert the right price", () => {
    expect(document.querySelector(".productPrice")).not.toBeNull();
    expect(document.querySelector(".productPrice").textContent).toEqual(
      "Prix: 29 €"
    );
  });
});

describe("When displayProductColorsOptions is called", () => {
  test("it should insert the right options length", () => {
    expect(document.querySelectorAll("option").length).toBe(4);
  });
  test("it should insert the first option name", () => {
    expect(document.querySelectorAll("option")[0].textContent).toEqual("Tan");
  });
  test("it should insert the last option name", () => {
    expect(document.querySelectorAll("option")[3].textContent).toEqual("White");
  });
});


