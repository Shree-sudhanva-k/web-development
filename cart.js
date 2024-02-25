const email = localStorage.getItem("email");
const serverUrl = "http://localhost:8800";

window.addEventListener("load", cartItemsDisplay(email));

function cartItemsDisplay(email){
    const cart = document.querySelector('.cart');
    axios
    .get(`${serverUrl}/cartItemDisplay?email=${email}`)
    .then((response) => {
      const items = response.data;
      console.log(items);
      cart.innerHTML = items;      
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}