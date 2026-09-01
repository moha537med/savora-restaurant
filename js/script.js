import { homeGallery, customersReviews ,menuData ,specialOffer , updateOrdersCount ,orders ,addOrder } from "./data.js";

// =============== Selecting HTML ===================
const navbar = document.querySelector('.header .navbar');
const navMobile = document.querySelector('.header .nav-mobile');
const navbarLinks = document.querySelectorAll('.pages-links li a');


// observe each section and add class show when it is in the viewport
const sections = document.querySelectorAll("main section");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.05
});

sections.forEach(section => observer.observe(section));


let isNavMobile = false;
// click on burger menu and show nav-links in mobile screen
navMobile.addEventListener("click" , ()=> {
    isNavMobile = !isNavMobile;
    navMobile.classList.toggle("active");
    navbar.classList.toggle("active");
    console.log(isNavMobile)
})

navbarLinks.forEach(link => {
    link.addEventListener("click" , ()=> {
        navbarLinks.forEach(link => link.classList.remove("active"))
        link.classList.add("active")
        if(!isNavMobile){
            return;
        }
        isNavMobile =false;
        navbar.classList.remove("active");
        navMobile.classList.remove("active");
        console.log(isNavMobile)
    })
})


// countdown for special offer
const specialSection = document.querySelector(".special-offer");

if(specialSection){

    let lastItemIndex = -1;
    
    function randomNumber(){
        let randomIndex = Math.floor(Math.random() * menuData.length);
        
        while(randomIndex === lastItemIndex){
            randomIndex = Math.floor(Math.random() * menuData.length);
        }
        lastItemIndex = randomIndex;

        return randomIndex;
    }

    function specialOfferItem(item){

        let cardFound = orders.find(order => order.id === item.id);

        // make all items isSpecialOffer false except the current item
        menuData.map(item => item.isSpecialOffer = false)
        item.isSpecialOffer = true;

        specialSection.innerHTML = `
            <div class="text">
                <p class="badge">🔥 Limited Time Offer</p>
                <h2>Get 20% Off Your First Order</h2>
                <p><strong>${item.name}</strong> - ${item.description}</p>
                <div class="countdown">
                    <span id="days">00 Days :</span>   
                    <span id="hours">00 Hours :</span>   
                    <span id="minutes">00 Minutes :</span>
                    <span id="seconds">00 Seconds </span>
                </div>
                <p id="specialOfferMsg">Sorry The Limited Time Offer  is over😣 but, we make offers every 2 days 😊</p>
                <button class="secondary addOrder ${cardFound && "added"}">${cardFound ? "Added ✅" : "Order Now"}</button>
            </div>

            <div class="image">
                <span>New</span>
                <img src="${item.image}" alt="${item.name} image" loading="lazy">
            </div>    
        `

        // when user click on add order button
        specialSection.querySelector(".addOrder").addEventListener("click" , ()=> {
            addOrder(item);
            updateOrdersCount();
            specialSection.querySelector(".addOrder").textContent = "Added ✅";
            specialSection.querySelector(".addOrder").classList.add("added")
        })

        startOffer()
    }



    // target date
    let target = new Date(specialOffer.targetDate);
    let offerOver;

    function startOffer() {
        const daysElement = document.getElementById("days");
        const hoursElement = document.getElementById("hours");
        const minutesElement = document.getElementById("minutes");
        const secondsElement = document.getElementById("seconds");


        const specialOfferMsg = document.getElementById("specialOfferMsg");

        function updateCountdown() {
            const now = new Date();
            const difference = target.getTime() - now.getTime();

            if (difference <= 0) {
                clearInterval(countdown);
                if(specialOfferMsg){
                    specialOfferMsg.style.display = "block";
                }

                [daysElement, hoursElement, minutesElement, secondsElement].forEach(ele => ele.style.color = "#222222");
                startWaiting()
                return;
            }

            calculateCountDown(difference , daysElement , hoursElement , minutesElement , secondsElement);
        }

        // to update the countdown every second
        updateCountdown();

        let countdown = setInterval(updateCountdown, 1000);

    }

        
    function calculateCountDown(difference, daysElement, hoursElement, minutesElement, secondsElement){
        let remainingMilliSeconds = difference;

        let remainingDays = Math.floor(remainingMilliSeconds / (24 * 60 * 60 * 1000));
        remainingMilliSeconds = remainingMilliSeconds % (24 * 60 * 60 * 1000);

        let remainingHours = Math.floor(remainingMilliSeconds / (60 * 60 * 1000));
        remainingMilliSeconds = remainingMilliSeconds % (60 * 60 * 1000);

        let remainingMinutes = Math.floor(remainingMilliSeconds / (60 * 1000));
        remainingMilliSeconds = remainingMilliSeconds % (60 * 1000);

        let remainingSeconds = Math.floor(remainingMilliSeconds / 1000);

        if(remainingDays === 0){
            [daysElement , hoursElement , minutesElement , secondsElement].forEach(ele => ele.style.color = "#C1121F")
        }
        daysElement.textContent = `${remainingDays < 10 ? `0${remainingDays}`: remainingDays} Days :`;
        hoursElement.textContent = `${remainingHours < 10 ? `0${remainingHours}`: remainingHours} Hours :`;
        minutesElement.textContent = `${remainingMinutes < 10 ? `0${remainingMinutes}`: remainingMinutes} Minutes : `;
        secondsElement.textContent = `${remainingSeconds < 10 ? `0${remainingSeconds}`: remainingSeconds} Seconds`;
        
    }


    function startWaiting() {

        offerOver = new Date(target.getTime() + specialOffer.waitTime);

        let waitingInterval = setInterval(() => {
            const now = new Date();
            const difference = offerOver.getTime() - now.getTime();
            if(difference <= 0){
                clearInterval(waitingInterval);
                specialOffer.targetDate = new Date().getTime() +  2 * (24 * 60 * 60 * 1000); // Set the new target date to 2 days from now
                target = new Date(specialOffer.targetDate);
                const item = menuData[randomNumber()];
                specialOfferItem(item);
                return;
            }
            // console.log(`Waiting for next offer... ${Math.ceil(difference / 1000)} seconds remaining`);
        }, 1000);
    }

    specialOfferItem(menuData[9]) // Initialize with the first special offer item;
}


updateOrdersCount()
