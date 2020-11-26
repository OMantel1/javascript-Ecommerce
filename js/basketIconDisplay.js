window.addEventListener("DOMContentLoaded", () => {
  let articlesList = JSON.parse(localStorage.getItem("panier"));
  let count = 0;

  count = articlesQuantity(articlesList, count);
  displayQuantity(count);
});

function articlesQuantity(list, count) {
  if (list !== null) {
    list.forEach((article) => {
      count += parseInt(article.quantity);
    });
  }
  return count;
}

function displayQuantity(count) {
  let basket = document.getElementById("display");
  let displayNumber = "";
  displayNumber += `<span class="displayNumber">${count}</span>`;
  basket.innerHTML = displayNumber;
  return basket.innerHTML
}

export { articlesQuantity, displayQuantity };
