/* ===============================
DISPLAY FOOD MENU
=============================== */

const menu = document.getElementById("menu")

function displayFoods(list){

menu.innerHTML = ""

list.forEach(food=>{

menu.innerHTML += `

<div class="foodCard">

<img src="${food.img}" onclick="previewFood(${food.id})">

<h3>${food.name}</h3>

<p>₹${food.price}</p>

<p>⭐ ${food.rating}</p>

<button onclick="addToCart(${food.id})">Add To Cart</button>

</div>

`

})

}

displayFoods(foods)



/* ===============================
CATEGORY FILTER
=============================== */

function filterFood(category){

if(category === "all"){
displayFoods(foods)
return
}

let filtered = foods.filter(food => food.category === category)

displayFoods(filtered)

}



/* ===============================
SEARCH SYSTEM
=============================== */

document.getElementById("search").addEventListener("keyup",function(){

let value = this.value.toLowerCase()

let filtered = foods.filter(food =>
food.name.toLowerCase().includes(value)
)

displayFoods(filtered)

})



/* ===============================
CART SYSTEM (WITH QUANTITY)
=============================== */

let cart = []

function addToCart(id){

let item = foods.find(food => food.id === id)

let existing = cart.find(c => c.id === id)

if(existing){

existing.qty++

}else{

cart.push({...item, qty:1})

}

displayCart()

showToast(item.name + " added to cart")

}



/* ===============================
DISPLAY CART
=============================== */

function displayCart(){

const cartItems = document.getElementById("cartItems")

cartItems.innerHTML = ""

let subtotal = 0

cart.forEach((item,index)=>{

subtotal += item.price * item.qty

cartItems.innerHTML += `

<div class="cartItem">

<img src="${item.img}">

<div class="cartDetails">

<p>${item.name}</p>

<div class="qtyBox">

<button onclick="decreaseQty(${index})">-</button>

<span>${item.qty}</span>

<button onclick="increaseQty(${index})">+</button>

</div>

</div>

<p>₹${item.price * item.qty}</p>

</div>

`

})

let tax = Math.round(subtotal * 0.05)

let delivery = subtotal > 0 ? 40 : 0

let total = subtotal + tax + delivery

document.getElementById("subtotal").innerText = subtotal
document.getElementById("tax").innerText = tax
document.getElementById("delivery").innerText = delivery
document.getElementById("total").innerText = total

}



/* ===============================
QUANTITY CONTROLS
=============================== */

function increaseQty(index){

cart[index].qty++

displayCart()

}

function decreaseQty(index){

cart[index].qty--

if(cart[index].qty <= 0){

cart.splice(index,1)

}

displayCart()

}



/* ===============================
CART SIDEBAR
=============================== */

function toggleCart(){

document.getElementById("cartSidebar")
.classList.toggle("open")

}



/* ===============================
CHECKOUT SYSTEM
=============================== */

function checkout(){

if(cart.length === 0){

alert("Cart is empty!")

return

}

alert("✅ Order placed successfully!")

cart = []

displayCart()

}



/* ===============================
DARK MODE
=============================== */

function toggleDark(){

document.body.classList.toggle("dark")

}



/* ===============================
FOOD PREVIEW POPUP
=============================== */

let selectedFood = null

function previewFood(id){

let food = foods.find(f => f.id === id)

selectedFood = food

document.getElementById("popupImg").src = food.img
document.getElementById("popupName").innerText = food.name
document.getElementById("popupPrice").innerText = "₹" + food.price
document.getElementById("popupRating").innerText = "⭐ " + food.rating

document.getElementById("popup").style.display = "flex"

}

function closePopup(){

document.getElementById("popup").style.display = "none"

}

function addPopupCart(){

addToCart(selectedFood.id)

closePopup()

}



/* ===============================
SCROLL TO MENU
=============================== */

function scrollMenu(){

document.getElementById("menuSection")
.scrollIntoView({behavior:"smooth"})

}



/* ===============================
AI FOOD RECOMMENDATION
=============================== */

function recommendFoods(){

let recommended = foods
.filter(food => food.rating >= 4.5)
.sort(()=>0.5 - Math.random())
.slice(0,6)

displayRecommended(recommended)

}

function displayRecommended(list){

const box = document.getElementById("recommended")

box.innerHTML = ""

list.forEach(food=>{

box.innerHTML += `

<div class="foodCard">

<img src="${food.img}" onclick="previewFood(${food.id})">

<h3>${food.name}</h3>

<p>₹${food.price}</p>

<p>⭐ ${food.rating}</p>

<button onclick="addToCart(${food.id})">Add</button>

</div>

`

})

}

recommendFoods()



/* ===============================
TOAST POPUP (ITEM ADDED)
=============================== */

function showToast(message){

const toast = document.getElementById("toast")

toast.innerText = message

toast.classList.add("show")

setTimeout(()=>{
toast.classList.remove("show")
},2000)

}