// contact.js
const form = document.getElementById("form"); 
const fullNameInput = document.getElementById("fullName"); 
const emailInput = document.getElementById("email"); 
const phoneInput = document.getElementById("phoneNumber");
const subjectInput = document.getElementById("subject");
const messageInput = document.getElementById("message");

const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach(question => { 

    question.addEventListener("click", () => { 

        const answer = question.parentElement.querySelector(".faq-answer"); 

        question.parentElement.classList.toggle("active"); 

        if (question.parentElement.classList.contains("active")) {
            answer.style.maxHeight = `${answer.scrollHeight}px`; 
        } 
        else { 
            answer.style.maxHeight = "0"; 
        } 
        
    }); 

});


const inputs = form.querySelectorAll("input, textarea");

inputs.forEach(input => {

    input.addEventListener("input", () => {

        const parent = input.parentElement;
        const message = parent.querySelector(".error-message");

        if (message) {
            message.remove();
        }

        input.style.border = "";

        if (input.value.trim() !== "") {
            parent.classList.add("active");
        }

    });


    input.addEventListener("focus", () => {
        input.parentElement.classList.add("active");
    });


    input.addEventListener("blur", () => {

        if (input.value.trim() === "") {
            input.parentElement.classList.remove("active");
        }

    });


    if (input.value.trim() !== "") {
        input.parentElement.classList.add("active");
    }

});



// message will show when occuring an error in form validation
function showMessage(msg, type, div) {

    if (type === "success") {
        const message = document.createElement("p");
        message.textContent = msg;
        message.classList.add(`${type}-message`);
        document.body.append(message);

        setTimeout(()=>{
            message.remove()
        },3000)
        return;
    }

    const parent = form.querySelector(`.${div}`);

    const oldMessage = parent.querySelector(".error-message");

    if (oldMessage) {
        oldMessage.remove();
    }
    const message = document.createElement("p");

    message.textContent = msg;
    message.classList.add(`${type}-message`);


    parent.style.marginBottom="7px"
    parent.append(message);
}


// validation for full name input
function validateName(name){
    let fullName = name.value.trim();
    if(!fullName) {
        showMessage("Enter your name , sir" , "error" , "name-div");
        return false;
    }

    let names = fullName.split(" ").filter(n => n !== "");

    if(names.length < 2){
        showMessage("Should enter at least first and second name" , "error" , "name-div");
        return false;
    }

    if(names.some(n => n.length < 3)){
        showMessage("Each name must contain at least 3 letters." , "error" , "name-div");
        return false;
    }

    const nameRegex = /^[A-Za-z\u0600-\u06FF ]+$/;

    // check username is only letters
    if (!nameRegex.test(names.join(" "))) {
        showMessage("Your name must contain letters only." , "error" ,"name-div")
        return false;
    }

    return true;
}









// validation for email input
function validateEmail(emailInput) {
    
    let email = emailInput.value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        showMessage("Please enter a valid email address","error","email-div");
        return false;
    }

    return true;
}



phoneInput.addEventListener("input" , ()=> {
    let phone = phoneInput.value.split("");

    phoneInput.value = phone.filter(n => n !== " ").filter(n => !isNaN(n)).join("");
})

// validation for phone number input
function validatePhone(phoneInput){
    let phone = phoneInput.value.trim();

    if(phone.length !== 11 ){
        showMessage("Your phone number must contain 11 numbers" , "error" , "phone-div");
        return false;
    }

    const phoneRegex = /^01(0|1|2|5)\d{8}$/;

    if (!phoneRegex.test(phone)) { 
        showMessage( "Please enter a valid Egyptian phone number.", "error", "phone-div" );
        return false; 
    }

    return true;
}



// validation for subject input
function validateSubject(subjectInput){
    let subject = subjectInput.value.trim();

    if(!subject){
        showMessage("please enter your subject" , "error" , "subject-div");
        return false;
    }

    return true;
}

// validation for message input
function validateMessage(messageInput){
    let msg = messageInput.value.trim();
    if(!msg){
        showMessage("please enter your message" , "error" , "message-div");
        return false;
    }
    
    if(msg.length < 10){
        showMessage("Your message must contain at least 10 characters." , "error" , "message-div");
        return false;
    }

    return true;
}

// form submitting
form.addEventListener("submit" , (e) => {
    e.preventDefault();

    // let isFormValid = true;

    // if all inputs are empty , show error messages for them
    // inputs.forEach(input => {
    //     const label = input.parentElement.querySelector("label");
    //     if(input.value.trim() === ""){
    //         isFormValid = false;
            
    //         showMessage(`Please Fill ${label.textContent}` , "error" , input.parentElement.className);
    //         input.style.border = "1px solid red";
    //     }
    // })
    

    // if (!isFormValid) {
    //     return;
    // }

    if(!validateName(fullNameInput)){
        console.log("error");
        return;
    }

    if (!validateEmail(emailInput)) {
        console.log("error");
        return;
    }
    if(!validatePhone(phoneInput)){
        console.log("error");
        return;
    }

    if(!validateSubject(subjectInput)){
        console.log("error");
        return;
    }

    if(!validateMessage(messageInput)){
        console.log("error");
        return;
    }

    showMessage("Your message has been sent successfully!, We'll get back to you as soon as possible.","success")

    inputs.forEach(input => {
        input.value="";
        input.parentElement.classList.remove("active");
    })

})




