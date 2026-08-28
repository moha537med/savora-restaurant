const form = document.querySelector('.reservation form');


// ====================== form validation and its message ====================== 
form.addEventListener("submit", (e)=> {
    e.preventDefault();
    const fullName = form.querySelector("#fullName");
    const email = form.querySelector("#emailAddress");
    const dateInput = form.querySelector("#date");
    const timeInput = form.querySelector("#time");
    const guests = form.querySelector("#guests");
    const spacialRequests = form.querySelector("#spacialRequests");

    if (!validateName(fullName.value.trim()) ) {
        return;
    }

    if (!email.value.trim()) {
        formMessage("Please Enter your email" , "error" , "emailAddress" ,"email-div")
        return;
    }
    clearMessage("emailAddress", "email-div");

    let today = new Date();
    let selectedDate = new Date(dateInput.value);

    if (!validateDate(dateInput.value, today, selectedDate)) {
        return;
    }

    if (!validateTime(timeInput.value, selectedDate)) {
        return;
    }

    if (!guests.value) {
        formMessage("Please select how many is number of guests ?", "error", "guests", "guests-div");
        return;
    }
    clearMessage("guests", "guests-div");

    if(spacialRequests.value.trim() && spacialRequests.value.trim().length > 500){
        formMessage("Please enter letters less than 500", "error", "spacialRequests", "requests-div");
        return;
    }else if (spacialRequests.value.trim() && spacialRequests.value.trim().length < 500){
        formMessage("done", "", "requests", "requests-div");
    }

    formMessage("reservation table has been done ✅", "correct");

    [fullName , email , dateInput , timeInput , guests , spacialRequests].forEach(item => item.value = "")
    
})

// check length of letters in spacial requests input
form.querySelector("#spacialRequests").addEventListener("input" , ()=> {
    form.querySelector("#spacialRequestsLength").textContent = `Letters : ${form.querySelector("#spacialRequests").value.trim().length}`;
})

// message appear to check every input validation
function formMessage(msg, type, element, div) {
    const message = document.createElement("p");

    message.textContent = msg;
    message.classList.add("message", type);

    // Success message
    if (type === "correct") {
        document.body.append(message);

        setTimeout(() => {
            message.remove();
        }, 3000);
        return;
    }


    const parent = form.querySelector(`.${div}`);
    const input = form.querySelector(`#${element}`);

    // Remove old message
    const oldMessage = parent.querySelector(".message");
    if (oldMessage) {
        oldMessage.remove();
    }

    input.classList.add(type);
    parent.append(message);
}

// clear message when every validation to input has been done
function clearMessage(element, div) {
    const parent = form.querySelector(`.${div}`);
    const input = form.querySelector(`#${element}`);

    const message = parent.querySelector(".message");
    if (message) {
        message.remove();
    }
    input.classList.remove("error");
}


// validation for name
function validateName(fullName){
    if(!fullName){
        formMessage("Enter your name" , "error" , "fullName" ,"name-div")
        return false;
    }
    
    fullName = fullName.split(" ").filter(n => n !== "");
    // check user enter first and second name at least
    if(fullName.length < 2) {
        formMessage("You must enter your first and second name" , "error" , "fullName" ,"name-div")
        return false;
    }

    let nameLength = fullName.every(name => name.length > 2);
    const nameRegex = /^[A-Za-z\u0600-\u06FF ]+$/;

    // check username is only letters
    if (!nameRegex.test(fullName.join(" "))) {
        formMessage("Not valid❌ , your name must be letters only" , "error" , "fullName" ,"name-div")
        return false
    }

    // check first name and last name length high than 2 letters
    if(!nameLength) {
        formMessage("Your first and second name must be 3 letters at least" , "error" , "fullName" ,"name-div")
        return false;
    }

    clearMessage("fullName" ,"name-div")
    
    return true;
}

// validation for date
function validateDate(dateInput, today, selectedDate) {
    if (!dateInput) {
        formMessage( "Please select your reservation date", "error", "date", "date-div");
        return false;
    }

    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);

    if (isNaN(selectedDate.getTime())) {
        formMessage( "Please enter a valid date","error", "date","date-div");
        return false;
    }

    if (selectedDate.getTime() < today.getTime()) {
        formMessage( "Please do not select a date in the past", "error", "date", "date-div");
        return false;
    }

    clearMessage("date" ,"date-div")
    return true;
}


// validation for time
function validateTime(timeInput, selectedDate) {
    
    if (!timeInput) {
        formMessage("Please select your reservation time", "error", "time", "time-div");
        return false;
    }

    const [hours, minutes] = timeInput.split(":").map(Number);
    const totalMinutes = hours * 60 + minutes;

    const openingTime = 11 * 60;
    let closingTime;

    if (selectedDate.getDay() >= 1 && selectedDate.getDay() <= 4) {
        closingTime = 23 * 60;
    } else {
        closingTime = 24 * 60;
    }

    if (totalMinutes < openingTime || totalMinutes >= closingTime) {
        formMessage( "Please choose a time between 11:00 AM and closing time", "error", "time", "time-div");
        return false;
    }

    clearMessage("time" ,"time-div")
    return true;
}
