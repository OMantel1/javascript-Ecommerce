/**
 *
 * Expects request to contain:
 * contact: {
 *   firstName: string,
 *   lastName: string,
 *   address: string,
 *   city: string,
 *   email: string
 * }
 * products: [string] <-- array of product _id
 *
 */

// attente de la lecture du dom
window.addEventListener('DOMContentLoaded', (event) => {
    // console.log('DOM fully loaded and parsed');

    //variables
    let basketContent = JSON.parse(localStorage.getItem("panier"));
    let list = "";
    let container = document.getElementById("basketList");
    let total = 0;
    let totalProductPrice = 0;
    let totalPrice = document.getElementById("totalPrice");
    let trashSelect = document.getElementsByClassName("fa-trash");

    //si panier vide affiche message "panier vide"
    if (basketContent === null) {
        list = displayEmptyBasket(list, container);
    } else {
        //sinon affiche dynamiquement contenu panier
        basketContent.forEach(element => {
            totalProductPrice = (element.price) * (element.quantity);
            list += `
            <div class="resume">
                <ul class="resumeList">
                    <li class="list-name"><a href="page-produit.html?id=${element.id}">${element.name}</a></li>
                    <li class="list-info">quantité: ${element.quantity}</li>
                    <li class="list-price"><span>${totalProductPrice / 100}</span>€</li>
                </ul>
                <i class="fas fa-trash" id="${element.id}"></i>
            </div>`;

            //Calcul et affichage du prix total
            total += totalProductPrice / 100;
        })
        container.innerHTML = list;
        totalPrice.innerHTML = total;
    }

    //suppression du panier entier
    function deleteBasket() {
        let monBouton = document.getElementById("effacer");
        monBouton.addEventListener("click", function () {
            localStorage.removeItem("panier");
            window.location.reload();
        })
    }
    deleteBasket();


    /****** suppression d'un seul produit ******/
    function removeProductFormBasket() {
        for (let i = 0; i < trashSelect.length; i++) {
            trashSelect[i].addEventListener("click", function (element) {
                let productId = element.target.getAttribute("id");;
                for (let j = 0; j < basketContent.length; j++) {
                    if (basketContent[j].id === productId) {
                        basketContent.splice(j, 1);
                        localStorage.removeItem("panier");
                        localStorage.setItem("panier", JSON.stringify(basketContent));
                        window.location.reload();
                        if (basketContent.length === 0) {
                            localStorage.removeItem("panier");
                            list = "";
                            list = displayEmptyBasket(list, container);
                        }

                    } else {
                        continue;
                    }
                };

            });
        }
    }
    removeProductFormBasket();



    // contact constructor
    class contactConstructor {
        constructor(firstName, lastName, address, city, email) {
            this.firstName = firstName,
                this.lastName = lastName,
                this.address = address,
                this.city = city,
                this.email = email;
        }
    }

    //formulaire
    let firstName = document.getElementById("firstName");
    let lastName = document.getElementById("lastName");
    let address = document.getElementById("address");
    let city = document.getElementById("city");
    let email = document.getElementById("email");
    let mailRegex = /.+@.+\..+/;
    let textRegex = /^[^0-9]+$/; //interdit les nombres


    /** Formulaire: Suppression du bouton submit si panier vide */
    let submitButton = document.getElementById("submit");

    function desactivateSubmitIfEmpty() {
        if (basketContent !== null) {
            submitButton.classList.remove("displayNone");
        }
    }
    desactivateSubmitIfEmpty();


    /**** vérification des inputs du formualaire ****/
    function checkForm() {

        //check text inputs
        function checkInputs(element, textRegex) {
            element.addEventListener("keyup", function () {
                let elementValid = element.previousElementSibling;
                if (textRegex.test(element.value) && element.value.length >= 3) {
                    validInputs(elementValid);
                } else {
                    invalidInputs(elementValid);
                }
            });
        }

        //check address
        function checkAdressInput(element) {
            element.addEventListener("keyup", function () {
                let elementValid = element.previousElementSibling;
                if (element.value.length >= 4) {
                    validInputs(elementValid);
                } else {
                    invalidInputs(elementValid);
                }
            });
        }
        //check email
        function checkEmailInputs() {
            email.addEventListener("keyup", function () {
                let emailvalidation = email.previousElementSibling;
                if (mailRegex.test(email.value)) {
                    validInputs(emailvalidation);
                    submitButton.disabled = false;

                } else {
                    invalidInputs(emailvalidation);
                    submitButton.disabled = true;
                }
            });
        }

        //Affiche icone rouge si input invalide
        function invalidInputs(e) {
            e.classList.remove("displayValidation");
            e.classList.add("displayNoValidation");
        }

        //Affiche incone verte si input valide
        function validInputs(e) {
            e.classList.add("displayValidation");
            e.classList.remove("displayNoValidation");
        }

        //check Inputs formulaire
        checkInputs(lastName, textRegex);
        checkInputs(firstName, textRegex);
        checkAdressInput(address);
        checkInputs(city, textRegex);
        checkEmailInputs();
    }
    checkForm();


    //Demande de validation de la commande
    function waitingData() {
        submitButton.addEventListener("click", function (e) {
            //creation données formulaire pour api
            e.preventDefault();


            //vérification contenu et longueur input
            if (lastName.value === "" || firstName.value === "" || city.value === "" || address.value === "" || email.value === "" ||
                lastName.value.length < 3 || firstName.value.length < 3 || city.value.length < 3 || address.value.length < 4 ||
                (!mailRegex.test(email.value)) || (!textRegex.test(firstName.value)) || (!textRegex.test(lastName.value)) || (!textRegex.test(city.value))) {
                console.log("Formulaire invalide");
            } else {
                //si vérification ok
                let contact = new contactConstructor(firstName.value, lastName.value, address.value, city.value, email.value);
                let articlelist = JSON.parse(localStorage.getItem("panier"));
                let products = [];

                //Ajoute un produit dans la liste par quantité
                articlelist.forEach(product => {
                    if (product.quantity >= 2) {
                        for (let i = 0; i < product.quantity; i++) {
                            products.push(product.id);
                        }
                    } else {
                        products.push(product.id);
                    }
                });

                //préparation requete api post
                const data = {
                    contact,
                    products
                };
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(data)
                };

                //requete post api
                fetch("https://oriteddies-api.herokuapp.com/api/teddies/order/", options)
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        } else {
                            throw error = response.status;
                        }
                    })

                    //si reponse ok, reponse stockée dans localStorage
                    .then(function (text) {
                        // console.log(text);
                        localStorage.setItem("command", JSON.stringify(text));

                    })

                    //redirection vers page de confirmation
                    .then(function () {
                        window.location = "page-confirmation.html";
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        });
    }
    waitingData();

});


function displayEmptyBasket(list, container) {
    list += `
        <div class="resume">
            <p> panier vide</p>
        </div>`;
    container.innerHTML = list;
    return list;
}