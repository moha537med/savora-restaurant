import { orders  , updateOrdersCount , confirmOrder } from "./data.js";

const ordersContainer = document.querySelector(".orders");
const totalSection = document.querySelector(".total-section");

const confirmOrderBtn = document.getElementById("confirmOrder");

function showOrders() {

    ordersContainer.innerHTML = "";

    if (orders.length === 0) {
        ordersContainer.innerHTML = `
            <div class="empty-orders orders-state">
                <h2>Your Order List Is Empty</h2>
                <p>Looks like you haven't added anything yet.</p>
                <a href="menu.html" class="primary">Explore Our Menu</a>
            </div>
        `;
        totalSection.style.display = "none";

        return;
    }
    
    document.querySelector(".orders-heading").style.display='block';
    document.querySelector(".orders-heading").textContent=`Your Order List(${orders.length})`;
    
    orders.forEach(order => {

        ordersContainer.innerHTML += `
            <div class="card" data-id="${order.id}">

                <img src="${order.image ? order.image : "images/hreo-2.jpeg"}" alt="${order.name}" loading="lazy" >
                <h3>${order.name}</h3>

                <div class="info">
                    <p>Price : <strong>$${order.price.toFixed(2)}</strong></p>

                    <div class="editPrice">
                        <span class="decrease">-</span>
                        <span class="itemNum">
                            ${order.quantity}
                        </span>
                        <span class="increase">+</span>
                    </div>
                </div>

                <p class="itemTotal"> Total: <strong>$${(order.price * order.quantity).toFixed(2)}</strong></p>
                <button class="secondary removeOrder"> Remove </button>

            </div>
        `;
    });

    totalSection.style.display = "flex";
    updateTotalPrice();
}

showOrders();


ordersContainer.addEventListener("click" , (e)=> {

    console.log(e.target);
    const card = e.target.closest(".card");
    if(!card){
        return;
    }

    const cardId = Number(card.dataset.id);

    const order = orders.find(order => order.id === cardId);

    if(!order){
        return;
    }

    if(e.target.classList.contains("increase")){
        order.quantity++;
    }

    if(e.target.classList.contains("decrease")){
        if(order.quantity > 1){
            order.quantity--;
        }
    }

    
    if(e.target.classList.contains("removeOrder")){
        let index = orders.findIndex(order => order.id === cardId);
        orders.splice(index , 1)
        updateOrdersCount();
    }

    localStorage.setItem("orders" , JSON.stringify(orders));
    showOrders();
    updateTotalPrice()
})

function updateTotalPrice() {
    const totalPrice = totalSection.querySelector(".totalPrice");    
    totalPrice.textContent = `Total Price : $${JSON.parse(localStorage.getItem("orders")).
    reduce((acc , curr)  => acc + (curr.price * curr.quantity) , 0).toFixed(2)}`;    
}


confirmOrderBtn.addEventListener("click", () => {

    if (orders.length === 0) {
        alert("Your order is empty.");
        return;
    }

    const confirmedOrder = confirmOrder();

    if (!confirmedOrder) {
        return;
    }

    updateOrdersCount();

    ordersContainer.innerHTML = `
        <div class="order-success orders-state">

            <h2>Order Confirmed! 🎉</h2>

            <p>
                Your order has been successfully placed.
            </p>

            <p>
                Order ID:
                <strong>${confirmedOrder.id}</strong>
            </p>

            <p>
                Total:
                <strong>$${confirmedOrder.total.toFixed(2)}</strong>
            </p>

            <a href="menu.html" class="primary">
                Continue Browsing
            </a>

        </div>
    `;

    totalSection.style.display = "none";
    document.querySelector(".orders-heading").style.display='none';
});