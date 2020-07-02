window.addEventListener('DOMContentLoaded', (event) => {

    //variables
    let commandData = JSON.parse(localStorage.getItem("command"));
    let basket = JSON.parse(localStorage.getItem("panier"));
    let commandMessage = document.getElementById("validate");

    //calcul du prix total de la commande
    function totalPrice(basket) {
        let total = 0;
        basket.forEach(product => {
            total += product.quantity * product.price / 100;
        });
        return total;
    }
    let price = totalPrice(basket);

    //Ajout du message de bonne reception de la commande
    function addMessage() {

        let message = "";
        message = `
            <h2>${commandData.contact.firstName}, merci d'être passé par Oridteddies!</h2>
            <p>Votre commande sera traitée dans les meilleurs délais.</p>
            <p>Réf. commande: ${commandData.orderId}</p>
            <p>Montant: ${price} Euros</p>`;
        commandMessage.innerHTML = message;
        console.log(commandData);

    }
    addMessage();

    //remise à zero du local storage
    function resetLocalStorage() {
        localStorage.removeItem("panier");
        localStorage.removeItem("IdClicked");
    }
    resetLocalStorage();
});