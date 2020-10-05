window.addEventListener('DOMContentLoaded', (event) => {

    let commandData = JSON.parse(localStorage.getItem("command"));
    let basket = JSON.parse(localStorage.getItem("panier"));
    let commandMessage = document.getElementById("validate");
    let price = totalPrice(basket);

    addMessage(commandData, price, commandMessage);
    resetLocalStorage();
});



function addMessage(commandData, price, commandMessage) {
    let message = "";
    message = `
            <h2>${commandData.contact.firstName}, merci d'être passé par Oridteddies!</h2>
            <p>Votre commande sera traitée dans les meilleurs délais.</p>
            <p>Réf. commande: ${commandData.orderId}</p>
            <p>Montant: ${price} Euros</p>`;
    commandMessage.innerHTML = message;
}

function totalPrice(arr) {
    let total = 0;
    arr.forEach(product => {
        total += product.quantity * product.price / 100;
    });
    return total;
}

function resetLocalStorage() {
    localStorage.removeItem("panier");
    localStorage.removeItem("IdClicked");
}


export {
    totalPrice,
    resetLocalStorage
};