import { articlesQuantity, displayQuantity } from "./basketIconDisplay";
let count = 0;
const list = [
  {
    id: "5beaaa8f1c9d440000a57d95",
    name: "Lenny and Carl",
    price: 5900,
    quantity: "1",
  },
  {
    id: "5be9c8541c9d440000665243",
    name: "Norbert",
    price: 2900,
    quantity: "2",
  },
];

test("should count article quantity", () => {
  expect(list.length).toEqual(2);
  expect(articlesQuantity(list, count)).toEqual(3);
});

test("should display count in basket icon", () => {
  document.body.innerHTML = 
  `<section>
    <div id="display">
    <span class="displayNumber">${count}</span>
    </div>            
  </section>`;

  let count = 2;
  let result = document.getElementById("display");
  expect(displayQuantity(count)).toBe('<span class="displayNumber">2</span>');
});
