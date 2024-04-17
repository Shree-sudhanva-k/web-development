const serverUrl = "http://localhost:8800";

document.querySelector('title').innerHTML = localStorage.getItem('itemName');

const itemDisplay = () =>{
    const itemName = localStorage.getItem('itemName');
    axios
    .get(`${serverUrl}/productDetailsDisplay?itemName=${itemName}`)
    .then((response) => {
      const item = response.data[0];
      console.log(item);
      const name = document.querySelector('.name');
      const desc = document.querySelector('.desc');      
      const price = document.querySelector('.price');
      const category = document.querySelector('.category');      
      const productImage = document.querySelector('.productImage');
      const email = document.querySelector('.by');

      name.innerHTML = item.name;
      desc.innerHTML = item.description;
      price.innerHTML = item.price;
      category.innerHTML = item.category;     
      productImage.src = item.photo;
      email.innerHTML = item.email;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

window.addEventListener("load",itemDisplay());

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