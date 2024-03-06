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
    const name = product.getElementById('pname').innerHTML;
    localStorage.setItem('itemName',name);
    window.location.href = 'item.html';
}

function handleSearch(){
  const searchText = document.getElementById('searchText').value;
  localStorage.setItem('searchText',searchText);
  window.location.href = 'search.html';
}