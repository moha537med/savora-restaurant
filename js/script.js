import { homeGallery, customersReviews , specialOffer , updateOrdersCount , orders } from "./data.js";

// =============== Selecting HTML ===================
const navbar = document.querySelector('.header .navbar');
const navMobile = document.querySelector('.header .nav-mobile');
const navbarLinks = document.querySelectorAll('.pages-links li a');

// varaibles
let isNavMobile = false;


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



// CountDown counter
const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");

const specialOfferMsg = document.getElementById("specialOfferMsg");


// now date and target date
let target = new Date(specialOffer.targetDate);

if (daysElement && hoursElement && minutesElement && secondsElement) {
    
    function calculateCountDown(difference){
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
    
    function updateCountdown() {
        const today = new Date();
        const difference = target.getTime() - today.getTime();
    
        if (difference <= 0) {
            clearInterval(countdown);
            if(specialOfferMsg){
                specialOfferMsg.style.display = "block";
            }
    
            [daysElement, hoursElement, minutesElement, secondsElement]
                .forEach(ele => ele.style.color = "#222222");
    
            return;
        }
    
        calculateCountDown(difference);
    }
    
    let countdown = setInterval(updateCountdown, 1000);
    
    updateCountdown();

}


updateOrdersCount()
