import { menuData as popularMenu, homeGallery, customersReviews , specialOffer, orders ,addOrder , updateOrdersCount } from "./data.js";

//  Selecting HTML 
const aboutSection = document.querySelector('.about');

const filterMenu = document.querySelectorAll('.popular-menu .filter-menu span');
const menuDiv = document.querySelector('.popular-menu .menu');


const galleryImages = document.querySelector('.gallery .images');

const galleryModal = document.querySelector('.modal');

const reviewsCards = document.querySelector('.reviews .reviews-cards');
const nextReviews = document.getElementById('nextReviews');
const previousReviews = document.getElementById('previousReviews');    





// varaibles

let statisticsStarted = false;

//  Events Listener 
window.onscroll = ()=> {
    if (window.scrollY >= aboutSection.offsetTop - 200 && !statisticsStarted) {
        statisticsStarted = true;

        aboutSection.querySelectorAll(".statistics span").forEach(item => {
            statisticsAnimation(item, Number(item.dataset.target));
        });
    }
}

function statisticsAnimation(item , target) {
     item.textContent= "";
    let i = 0;
    let timer = setInterval(()=> {
        i++;        
        if(i > target){
            clearInterval(timer);
            return;
        }
        item.textContent= i;
    },60)
}



//  creat gallery cards , every card contains on (image and overlay) 
homeGallery.forEach((img , i) => {
    const containerDiv = document.createElement("div");

    const image = document.createElement("img");
    const overlayDiv = document.createElement("div");
    overlayDiv.className="overlay";

    const overlayTitle = document.createElement("h3");
    const overlayDesc = document.createElement("p");
    const viewBtn = document.createElement("button");

    viewBtn.textContent="View Details";
    viewBtn.setAttribute("data-modal" , `${i}`)

    overlayTitle.textContent = img.title;
    overlayDesc.textContent = img.desc;

    image.setAttribute("loading" , "lazy");
    image.src= img.src;
    image.alt = img.title;

    overlayDiv.append(overlayTitle , overlayDesc , viewBtn)
    containerDiv.append(image,overlayDiv)

    galleryImages.append(containerDiv);
})

// show modal when click on image gallery
document.querySelectorAll(".gallery .images .overlay button").forEach(btn => {
    btn.addEventListener("click" , ()=> {
        galleryModal.style.display="flex";
        galleryModal.innerHTML = "";
        let galleryIndex = Number(btn.dataset.modal);
        const {title , src ,caption , badge} = homeGallery[galleryIndex];

        galleryModal.innerHTML = `
            <div class="modal-content">
                <button id="closeModal">&times;</button>
                <img src="${src}" alt="${title}">
                <p class="badge">${badge}</p>
                <h2>${title}</h2>
                <p>${caption}</p>
                <a href="reservation.html" class="secondary bookTable">Book a Table</a>
            </div>
        `;
        galleryModal.querySelector("#closeModal").focus();
        // close modale when click on button that id closeModal
        document.getElementById("closeModal").addEventListener("click" ,()=> hideModal())
        console.log(homeGallery[galleryIndex]);
    })
})

function hideModal(){
    galleryModal.style.display="none";
}

document.addEventListener("keydown" , (e)=> {
    if(galleryModal.style.display === "none"){
        return;
    }
    if(e.key === "Escape" || e.key === "Esc"){
        hideModal()
    }
})





let index = 0;  
let reviewsPerPage;
if(window.innerWidth <= 769){
    reviewsPerPage = 2;
}else {
    reviewsPerPage = 3;
}
let lastIndex = reviewsPerPage; 

//  check disable for any button   
function checkDisabled(button , isDisabled){
    if(isDisabled){
        button.classList.add("disabled");
    }else {
        button.classList.remove("disabled");
    }
    button.disabled = isDisabled;
}

function showReviews(customersReviews , type ="") {

    if(type === "next"){
        if(customersReviews.length <= lastIndex){
            console.log("You rached to the end of reviews , you can not click next ");
            checkDisabled(nextReviews , true);
            return;
        }
        checkDisabled(previousReviews , false)
        index += reviewsPerPage;
        lastIndex += reviewsPerPage;
    }

    else if (type === "previous"){
        if(index <= 0){
            console.log("You are in the begin of reviews , you can not click previous ");
            checkDisabled(previousReviews , true)
            return;
        }

        checkDisabled(nextReviews , false);
        index -= reviewsPerPage;
        lastIndex -= reviewsPerPage;
    }
    
    if(type === "first" || index <= 0){
        if(window.innerWidth <= 769){
            reviewsPerPage = 2;
            lastIndex = reviewsPerPage;
        }else {
            reviewsPerPage = 3;
            lastIndex = reviewsPerPage;
        }
        checkDisabled(previousReviews , true)
        checkDisabled(nextReviews , false)
    }

    if(customersReviews.length <= lastIndex){
        checkDisabled(nextReviews , true);
    }

    reviewsCards.innerHTML = "";
    
    // show 3 cards in every page (click)
    const customersShowed = customersReviews.slice(index , lastIndex);

    if(customersShowed.length < 3){
        reviewsCards.style.justifyContent = "center";
    }
    
    customersShowed.forEach(customer => {
        const card = document.createElement("div");
        card.className="card";

        const image = document.createElement("img");
        image.setAttribute("loading" , "lazy");
        image.src= customer.img;
        image.alt = customer.name;

        const customerName = document.createElement("h3");
        customerName.textContent = customer.name;
        
        const customerRatings = document.createElement("div");
        customerRatings.className="ratings";
        
        const customerTitle = document.createElement("div");
        customerTitle.className="title";

        createStars(customerRatings, customer.rating , "fa-solid fa-star" , "gold")
        createStars(customerRatings, (5 - customer.rating) , "fa-regular fa-star" , "#222")

        
        const customerReview = document.createElement("p");
        customerReview.textContent = customer.text;

        customerTitle.append(customerName , customerRatings);

        card.append(image , customerTitle ,customerReview )

        if (customersShowed.length < reviewsPerPage) {
            reviewsCards.style.justifyContent = "center";
        } else {
            reviewsCards.style.justifyContent = "";
        }
        

        reviewsCards.append(card);
    })
    
}

// show number of cards to reviews section
showReviews(customersReviews, "first");

nextReviews.addEventListener("click" , ()=> {
    showReviews(customersReviews , "next");
});

previousReviews.addEventListener("click" , ()=> {
    showReviews(customersReviews , "previous");
});

//  create star icons to reviews section
function createStars(ratingElement , num , type , color){
    for(let i=0; i < num; i++){
        const star = document.createElement("i");
        star.className=`${type}`;
        star.style.color=`${color}`;
        ratingElement.appendChild(star);
    }
}

// when mobile screens , show two reviews
let isMobile = window.innerWidth <= 769;
window.addEventListener("resize", () => {

    const currentIsMobile = window.innerWidth <= 769;

    if(currentIsMobile !== isMobile){

        isMobile = currentIsMobile;

        if(isMobile){
            reviewsPerPage = 2;
        }else {
            reviewsPerPage = 3;
        }

        index = 0;
        lastIndex = reviewsPerPage;

        showReviews(customersReviews, "first");
    }

});

//  when click on any menu filter   
filterMenu.forEach(filter => {
    filter.addEventListener("click" , ()=> {
        filterMenu.forEach(filter => filter.classList.remove("active"))
        filter.classList.add("active")
        let type = filter.dataset.filter;
        showCards(type);
    })
})


//  create cards that depand on filter type  
function showCards(menu = "All") {
    menuDiv.innerHTML = "";

    let filterdMenu = popularMenu.slice(0 , 6);
    if(menu !== "All"){
        filterdMenu = popularMenu.slice(0 , 6).filter(card => card.category === menu) ;
    }

    filterdMenu.forEach(card => {
        menuDiv.append(createCard(card));

    })
    
}

showCards("All");

function createCard(cardObj){
    let cardFound = orders.find(order => order.id === cardObj.id);

    const card =  document.createElement("div");
    card.className="card";

    card.innerHTML=`
        <img src="${cardObj.image ? cardObj.image : "images/hreo-2.jpeg"}" alt="${cardObj.name}" loading="lazy" />
        <div class="card-title">
            <h3>${cardObj.name}</h3>
            <span>${cardObj.category}</span>
        </div>
        <p>${cardObj.description}</p>
        <p>Price : <strong>$${cardObj.price.toFixed(2)}</strong></p>
        <button class="secondary addOrder ${cardFound && "added"}">${cardFound ? "Added ✅" : "Add to Order"}</button>
    `

    card.querySelector(".addOrder").addEventListener("click" , ()=> {
        addOrder(cardObj)
        updateOrdersCount();
        card.querySelector(".addOrder").textContent = "Added ✅";
    })

    return card;
}

