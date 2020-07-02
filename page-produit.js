//récupération dans l'url de l'id
let url = window.location.search;
const urlParams = new URLSearchParams(url);
const id = urlParams.get('id');

//requete de l'api
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
        //Affiche dynamiquement les informations du produit séléctionné
        let page = "";
        page =
            `<div class="product__image-big">
                <img src="${object.imageUrl}" alt="">
            </div>
        
            <div class="product__infos-details">
                <div class="productName">${object.name}</div>
                <div class="productDescription">${object.description}</div>
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
                    Prix: ${(object.price / 100)} €
                </div>
            </div>`;
        document.querySelector(".product__single").innerHTML = page;


        /******** Affichage liste options produit *******/
        // console.log(object.colors);
        let optionItem = document.getElementById("options");
        let options = "";
        (object.colors).forEach(color => {
            options += `
            <option value="" selected>${color}</option>`
        });
        optionItem.innerHTML = options;
        return object;
    })
    .then(object => {

        /******** Boutons quantités écoute ******/
        let quantity = quantityButtonsListener();

        /*********** Article constructor *********/
        class article {
            constructor(id, name, price, quantity) {
                this.id = id,
                    this.name = name,
                    this.price = price,
                    this.quantity = quantity;
            }
        }
        let articlesList = [];
        let sendBasket = document.querySelector(".button");

        /********** Ajout article au panier ***********/
        sendBasket.addEventListener("click", function () {
            //creation nouvel article 
            let newArticle = new article(object._id, object.name, object.price, quantity.textContent);
            let oldQuantity = 0;
            let newQuantity;
            let replaceArticle;

            //si localstorage vide
            if (localStorage.getItem("panier") == undefined || localStorage.getItem("panier") === null || localStorage.getItem("panier") === []) {
                articlesList.push(newArticle);
                localStorage.setItem("panier", JSON.stringify(articlesList));

            //sinon
            } else {
                //recherche d'un produit avec le meme id dans local storage
                //si produit deja présent, je récupere sa quantité et le supprime du localStorage
                //sinon je continue
                articlesList = JSON.parse(localStorage.getItem("panier"));
                for (let i = 0; i < articlesList.length; i++) {
                    if (typeof articlesList[i].id === undefined || articlesList[i].id === null) {
                        continue;
                    } else if (articlesList[i].id === object._id) {
                        oldQuantity = articlesList[i].quantity;
                        console.log(oldQuantity);
                        articlesList.splice(i, 1);
                    } else {
                        continue;
                    }
                }
                //si ancienne quantité à 0, le nouvel article peut etre ajouté au panier
                if (oldQuantity === 0) {
                    articlesList.push(newArticle);
                    localStorage.setItem("panier", JSON.stringify(articlesList));
                //si quantité différente de 0, calcul de la nouvelle quantité et ajout au panier
                } else {
                    newQuantity = parseInt(oldQuantity) + parseInt(quantity.textContent);
                    console.log(parseInt(quantity.textContent))
                    console.log(oldQuantity);
                    console.log(newQuantity);
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
