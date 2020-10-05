//récupération dans l'url de l'id
let url = window.location.search;
const urlParams = new URLSearchParams(url);
const id = urlParams.get('id');

const fetchPromise =
    fetch("https://oriteddies-api.herokuapp.com/api/teddies/" + id);

fetchPromise
    .then(response => {
        console.log(response);
        if (response.ok) {
            return response.json();
        } else {
            throw error = response.status;
        }
    })
    .then(object => {
        displayProduct(object);
        displayProductColorsOptions(object);
        return object;
    })
    .then(object => {
        let quantity = quantityButtonsListener(); //Ecoute boutons quantité 
        let articlesList = [];
        let sendBasket = document.querySelector(".button");

        /********** Ajout article au panier ***********/
        sendBasket.addEventListener("click", function () {
            let newArticle = new article(object._id, object.name, object.price, quantity.textContent);
            let oldQuantity = 0;
            let newQuantity;
            let replaceArticle;
            let basketContent = localStorage.getItem("panier");

            if (!basketContent) {
                pushNewArticle(newArticle, articlesList);

            } else {
                articlesList = JSON.parse(basketContent);
                for (let i = 0; i < articlesList.length; i++) {
                    if (typeof articlesList[i].id === undefined || articlesList[i].id === null) {
                        continue;
                    } else if (articlesList[i].id === object._id) {
                        oldQuantity = articlesList[i].quantity;
                        articlesList.splice(i, 1);
                    } else {
                        continue;
                    }
                }
                //si ancienne quantité à 0, le nouvel article peut etre ajouté au panier
                if (oldQuantity === 0) {
                    pushNewArticle(newArticle, articlesList);
                    //si quantité différente de 0, calcul de la nouvelle quantité et ajout au panier
                } else {
                    newQuantity = parseInt(oldQuantity) + parseInt(quantity.textContent);
                    replaceArticle = new article(object._id, object.name, object.price, newQuantity);
                    articlesList.push(replaceArticle);
                    localStorage.removeItem("panier");
                    localStorage.setItem("panier", JSON.stringify(articlesList));
                }

            }
        })
    })
    .catch((error) => {
        console.error(error);
    });




function displayProduct(elt) {
    let page = "";
    page =
        `<div class="product__image-big">
            <img src="${elt.imageUrl}" alt="">
        </div>
    
        <div class="product__infos-details">
            <div class="productName">${elt.name}</div>
            <div class="productDescription">${elt.description}</div>
            <form class="productOptions optionsBox">
                <label for="option">Couleur</label>
                <select name="option" id="options">
                    // <option value="" selected>black</option>
                    // <option value="" selected>red</option>
                    // <option value="" selected>blue</option>
                    // <option value="" selected>green</option>
                </select>
            </form>
        
            <div class="optionsBox">
                <div class="productQuantity">
                    Quantité: <span id="quantity">1</span>
                </div>
                <div class="addSubButtons">
                    <button>-</button> <button>+</button>
                </div>
            </div>

            <div class="productPrice">
                Prix: ${(elt.price / 100)} €
            </div>
        </div>`;
    document.querySelector(".product__single").innerHTML = page;
}


function displayProductColorsOptions(elt) {
    let optionItem = document.getElementById("options");
    let options = "";
    (elt.colors).forEach(color => {
        options += `
        <option value="" selected>${color}</option>`
    });
    optionItem.innerHTML = options;
}


//incrémentation et décrémentation de la quantité
function quantityButtonsListener() {
    let result = 1;
    let productBoutons = document.querySelectorAll(".addSubButtons button");
    let quantity = document.getElementById("quantity");

    function AddTextContent(arr) {
        quantity.textContent = arr;
    }

    productBoutons[1].addEventListener("click", function () {
        result++;
        AddTextContent(result);
    });
    productBoutons[0].addEventListener("click", function () {
        if (result > 1) {
            result--;
            AddTextContent(result);
        }
    });
    return quantity;
}


/*********** Article constructor *********/
class article {
    constructor(id, name, price, quantity) {
        this.id = id,
            this.name = name,
            this.price = price,
            this.quantity = quantity;
    }
}


function pushNewArticle(arr, myListOfArticles) {
    myListOfArticles.push(arr);
    localStorage.setItem("panier", JSON.stringify(myListOfArticles));
}