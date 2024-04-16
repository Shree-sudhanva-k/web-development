const email = localStorage.getItem("email");
const serverUrl = "http://localhost:8800";
let items;
let totalPrice = 0;
let totalItem = 0;
window.addEventListener("load", cartItemsDisplay(email));

function cartItemsDisplay(email) {
  const cartPage = document.querySelector(".cartPage");
  const noItems = document.querySelector(".noItems");
  const cart = document.querySelector(".cart");
  const template = document.querySelector(".template");
  axios
    .get(`${serverUrl}/cartItemDisplay?email=${email}`)
    .then((response) => {
      items = response.data;
      console.log(items);
      if (items.length === 0) {
        cartPage.style.display = "none";
        noItems.style.display = "block";
      }
      items.forEach((item) => {
        console.log(template);
        const cardClone = template.content.cloneNode(true);
        const productName = cardClone.querySelector(".cname");
        const productPrice = cardClone.querySelector(".cprice");
        const productQuantity = cardClone.querySelector(".cquantity");
        const productTotal = cardClone.querySelector(".ctotal");

        productName.innerHTML = item.productName;
        productPrice.innerHTML = item.price;
        productQuantity.innerHTML = item.quantity;
        productTotal.innerHTML = item.totalPrice;

        totalPrice += item.totalPrice;
        totalItem+=1;

        cart.appendChild(cardClone);
      });
      document.querySelector("#total-itm").innerHTML=totalItem;
      document.querySelector(".totalPrice").innerHTML = totalPrice;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

function placeOrder() {
  const email = localStorage.getItem("email");
  axios
    .post(`${serverUrl}/placeOrder`, {
      email,
      totalPrice,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });

  axios
    .post(`${serverUrl}/orderItems`, {
      email,
      items,
      totalPrice,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });

  axios
    .post(`${serverUrl}/deleteCart`, {
      email,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
    location.reload();
}

function increment(item){  
  const itemCard = item.parentNode.parentNode;
  console.log(itemCard)
  const productName = itemCard.querySelector('.cname').innerHTML;
  const email = localStorage.getItem('email');
  axios
    .post(`${serverUrl}/incrementQuantity`, {
      email,
      productName,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
    location.reload();
}

function decrement(item){  
  const itemCard = item.parentNode.parentNode;
  const quantity = itemCard.querySelector('.cquantity').innerHTML;
  const productName = itemCard.querySelector('.cname').innerHTML;
  const email = localStorage.getItem('email');
  console.log(quantity)
  if(quantity == 1){
    axios
    .post(`${serverUrl}/deleteItem`, {
      email,
      productName,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
  }
  else{
    axios
    .post(`${serverUrl}/decrementQuantity`, {
      email,
      productName,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
  }
  location.reload();
}