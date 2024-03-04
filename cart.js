const email = localStorage.getItem("email");
const serverUrl = "http://localhost:8800";
let items;
let totalPrice = 0;
window.addEventListener("load", cartItemsDisplay(email));

function cartItemsDisplay(email){
    const cart = document.querySelector('.cart');
    const template = document.querySelector('.template');
    axios
    .get(`${serverUrl}/cartItemDisplay?email=${email}`)
    .then((response) => {
      items = response.data;
      console.log(items);      
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

        cart.appendChild(cardClone);
      });
      document.querySelector('.totalPrice').innerHTML = totalPrice;     
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

function placeOrder(){
  const email = localStorage.getItem('email');
  axios
    .post(`${serverUrl}/placeOrder`, {
      email,
      items,      
      totalPrice
    })
    .then((response) => {
      console.log(response);
      
    })
    .catch((error) => {
      console.log(error)
    });
}