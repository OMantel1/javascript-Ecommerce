const fetchPromise =
    fetch("https://oriteddies-api.herokuapp.com/api/teddies");

fetchPromise
    .then(response => {
        console.log(response)
        if (response.ok) {
            return response.json();
        } else {
            throw error = response.status;
        }
    })
    .then(objects => {
        //Affiche dynamiquement la liste des produits
        console.log(objects);
        let elements = "";
        let itemsElements = document.querySelector(".items");

        objects.forEach(products => {
            elements +=
                `<section class="product__list">
                    <a href="page-product.html?id=${products._id}">
                    <div class="product__image-small">
                        <img src="${products.imageUrl}" alt="">
                    </div>
                    <div class="product__infos"> 
                        <div class="productName"  id="${products._id}">${products.name}</div>
                        <div class="productPrice">Prix: ${(products.price / 100)} €</div>
                    </div>
                    </a>
                </section>`;
        });
        loaderHide()
        itemsElements.innerHTML = elements;
    })
    .catch((error) => {
        console.error(error);
        loaderHide()
        itemsElements.innerHTML = error;
    });

function loaderHide() {
    let loader = document.querySelector(".loader");
    loader.classList.add("hidden");
}
