const serverUrl = "http://localhost:8800";

window.addEventListener("load",displayOnSearch());


function displayOnSearch(){    
    const cardContainer = document.querySelector('.product-container');
    const template = document.querySelector('.template');
    const text = document.getElementById('searchText').value;
    cardContainer.innerHTML = '';
    if(text != ''){
        localStorage.setItem('searchText',text);
    }

    axios
    .get(`${serverUrl}/searchDisplay?text=${localStorage.getItem('searchText')}`)
    .then((response) => {
      const items = response.data;
      console.log(items);
      if(items.length == 0){
        document.querySelector('.showingResults').innerHTML = "NO Results Found"
      }
      items.forEach((item) => {
        console.log(template);
        const cardClone = template.content.cloneNode(true);
        const productName = cardClone.querySelector(".name");
        const productPrice = cardClone.querySelector(".price");
        const productImage = cardClone.querySelector(".productImage")

        productName.innerHTML = item.name;
        productPrice.innerHTML = item.price;       
        productImage.src = item.photo; 

        cardContainer.appendChild(cardClone);
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

function itemDetails(product){
  console.log(product)
    const name = product.querySelector('#pname').innerHTML;
    localStorage.setItem('itemName',name);
    window.location.href = 'item.html';
}

function handleSearch(){
  const searchText = document.getElementById('searchText').value;
  localStorage.setItem('searchText',searchText);
  window.location.href = 'search.html';
}

function increment(event,item){
  event.stopPropagation();
  const itemCard = item.parentNode.parentNode;
  itemCard.querySelector('.quantity').innerHTML = parseInt(itemCard.querySelector('.quantity').innerHTML)+1;
  
}

function decrement(event,item){
  event.stopPropagation();
  const itemCard = item.parentNode.parentNode;
  const quantity = itemCard.querySelector('.quantity').innerHTML;
  if(quantity > 1){
    itemCard.querySelector('.quantity').innerHTML = parseInt(quantity)-1;
  }
}

const addItem = (event,item) => {
  event.stopPropagation();
  const itemCard = item.parentNode.parentNode;
  console.log(itemCard)
  const email = localStorage.getItem('email');
  const productName = itemCard.querySelector('.name').innerHTML;
  const quantity = (itemCard.querySelector('.quantity').innerHTML);
  const price = (itemCard.querySelector('.price').innerHTML);
  const totalPrice = quantity*price;
  console.log(totalPrice);
  axios
    .post(`${serverUrl}/addItem`, {
      email,
      productName,
      quantity,
      price,
      totalPrice
    })
    .then((response) => {
      console.log(response);
      location.reload();
    })
    .catch((error) => {
      console.log(error)
    });
}