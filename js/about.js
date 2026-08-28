import { chefs } from "./data.js";

const statisticsSection = document.querySelector(".about-statistics");
const chefsCards = document.querySelector(".chefs-cards");

let statisticsShowed= false;

// when scroll reached to statisticsSection , rhe statistics numbers will be animated
window.onscroll = () => {
    if(window.scrollY >= statisticsSection.offsetTop - 400 && !statisticsShowed){
        statisticsShowed= true;
        statisticsSection.querySelectorAll(".statistics p span").forEach(item => {
            statisticsAnimation(item , Number(item.dataset.target))
        })
    }
}

function statisticsAnimation(item , target) {
    let index = 0;
    let timer = setInterval(()=> {
        index++;
        if(index > target){
            clearInterval(timer);
            return
        }
        item.textContent = index;
    },100)
}


// create cards to chefs and add to cards div
function chefCard(chef){
    const card = document.createElement("div");
    card.className="card";

    const chefImage = document.createElement("img");
    chefImage.src = chef.src;
    chefImage.alt = `${ chef.specialty} image`;

    const chefName = document.createElement("h2");
    chefName.textContent  = chef.name;

    const chefSpecialty = document.createElement("p");
    chefSpecialty.className= "badge";
    chefSpecialty.textContent  = chef.specialty;

    const chefInfo = document.createElement("div");
    chefInfo.className= "chef-info";

    chefInfo.append(chefName , chefSpecialty)

    const chefText = document.createElement("p");
    chefText.textContent  = chef.desc;

    card.append(chefImage , chefInfo , chefText);

    return card;
}

chefs.forEach(chef => {
    chefsCards.append(chefCard(chef));
})