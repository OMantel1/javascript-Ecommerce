window.addEventListener('DOMContentLoaded', () => {
    //déclaration variables
    let list = JSON.parse(localStorage.getItem("panier"));
    let display = document.getElementById("display");
    let count= 0;

    //compte quantité produits
    if(list !== null){
        list.forEach(article => {
            count += parseInt(article.quantity);
            displayNumber = "";
            displayNumber.textContent += count;
        })
    }
    
    //affiche quantité dans icon panier
    displayNumber = "";
    displayNumber += ` <span class="displayNumber">${count}</span>`;
    display.innerHTML = displayNumber;
})