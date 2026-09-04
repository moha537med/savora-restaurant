import { menuData , addOrder , orders , updateOrdersCount} from "./data.js";

const filtersDiv = document.querySelector(".filters");
const menuContainer = document.querySelector(".menu-container");

const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");

// create button element of every filtersArr item
const filtersArr = ["all" , "burgers" , "grill" , "pizza" , "pasta" , "salads" , "desserts" , "drinks"];

filtersArr.forEach(item => {
    const button = document.createElement("button");
    button.textContent= item;
    button.dataset.filter= item;
    if(item === "all"){
        button.className="active";
    }

    filtersDiv.appendChild(button);
})

// select all spans filters
const filters = document.querySelectorAll(".filters button");

// when click on one get data-filter , remove class from all and add to this span class active 
filters.forEach(filter => {
    filter.addEventListener("click" , ()=> {
        let filterType = filter.dataset.filter;
        filters.forEach(filter => filter.classList.remove("active"))
        filter.classList.add("active")
        createMenu(filterType);
    })
})



function createMenu(type = "all"){
    menuContainer.innerHTML = "";

    let menu = menuData;
    if(type !== "all"){
        menu = menuData.filter(card => card.category === type)
    }

    menu.forEach(card => {
        const cardDiv = document.createElement("div");
        cardDiv.className="card";

        cardDiv.innerHTML = `
            <img src="${card.image}" alt="${card.name}" loading="lazy">
            <h3>${card.name}</h3>
            <div class="info">
                <p>Price : <strong>${card.price}$</strong></p>
                <span>Rating : ${card.rating}</span>
            </div>
            <button class="openModal secondary">View Details</button>
        `
        cardDiv.querySelector(".openModal").addEventListener("click" , ()=> showModal(card))

        menuContainer.append(cardDiv);
    })

}

createMenu("all")





function showModal(card) {
    let cardFound = orders.find(order => order.id === card.id);

    modal.style.display="flex";
    modalContent.innerHTML="";

    modalContent.innerHTML = `
        <button id="closeModal">&times;</button>
        <img src="${card.image}" alt="${card.name}" loading="lazy">
        <div class="info">
            <h3>${card.name}</h3>
            <span>${card.category}</span>
        </div>
        <p>${card.description}</p>
        <div class="info">
            <p>Price : <strong>${card.price}$</strong></p>
            <span>Rating : ${card.rating}</span>
        </div>
        <button class="secondary addOrder ${cardFound && "added"}">${cardFound ? "Added ✅" : "Add to Order"}</button>
    `
    modalContent.querySelector(".addOrder").addEventListener("click",()=> {
        addOrder(card);
        updateOrdersCount();
        modalContent.querySelector(".addOrder").textContent = "Added ✅";
        modalContent.querySelector(".addOrder").classList.add("added")
    })


    modalContent.querySelector("#closeModal").focus();
    modalContent.querySelector("#closeModal").addEventListener("click",() => hideModal());
}

// function to hide modal
function hideModal(){
    modal.style.display="none";
}

// escape key
document.addEventListener("keydown" , (e)=> {
    if(modal.style.display === "none"){
        return;
    }
    if(e.key === "Escape" || e.key === "Esc"){
        hideModal()
    }
})

// when click modal 
modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        hideModal()
    }
});




