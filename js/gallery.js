import { galleryData } from "./data.js";

const filtersDiv = document.querySelector(".filters");
const galleryContainer = document.querySelector(".gallery-container");

const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");

// create button element of every filtersArr item
const filtersArr = ["all" , "food" , "restaurant" , "chefs" , "events"];
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
        createGallery(filterType);
    })
})


function createGallery(type = "all"){
    galleryContainer.innerHTML = "";

    let gallery = galleryData;

    if (type !== "all") {
        gallery = galleryData.filter(card => card.category === type );
    }

    gallery.forEach(card => {
        const cardDiv = document.createElement("div");
        cardDiv.className="card";

        cardDiv.innerHTML = `
            <img src="${card.image}" alt="${card.title}" loading="lazy">
            <div class="overlay">
                <h3>${card.title}</h3>
                <p>${card.caption}</p>
                <button class="openModal">View Details</button>
            </div>
        `
        cardDiv.querySelector(".openModal").addEventListener("click" , ()=> showModal(card))

        galleryContainer.append(cardDiv);
    })

}

createGallery("all")



function showModal(card) {
    modal.style.display="flex";
    modalContent.innerHTML="";

    modalContent.innerHTML = `
        <button id="closeModal">&times;</button>
        <img src="${card.image}" alt="${card.title}">
        <div class="info">
            <h3>${card.title}</h3>
            <span>${card.category}</span>
        </div>
        <p>${card.caption}</p>
        <a href="reservation.html" class="secondary bookTable">Book a Table</a>
    `
    modalContent.querySelector("#closeModal").focus();
    modalContent.querySelector("#closeModal").addEventListener("click",() => hideModal());
}

// function ti hide modal
function hideModal(){
    modal.style.display="none";
}

// escape key
document.addEventListener("keydown" , (e)=> {
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