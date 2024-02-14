const category = localStorage.getItem("category");
const serverUrl = "http://localhost:8800";

window.addEventListener("load", productDisplay(category));

function productDisplay(category) {
  const cardContainer = document.querySelector(".product-section");
  const template = document.querySelector(".product");
  const heading = document.querySelector('.heading');
  heading.innerHTML = category;

  axios
    .get(`${serverUrl}/productDisplay?category=${category}`)
    .then((response) => {
      const items = response.data;
      console.log(items);
      items.forEach((item) => {
        console.log(template);
        const cardClone = template.content.cloneNode(true);
        const productName = cardClone.querySelector(".name");
        const productDesc = cardClone.querySelector(".price");

        productName.innerHTML = item.name;
        productDesc.innerHTML = item.price;

        

        cardContainer.appendChild(cardClone);
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

function handleSearch(){
  const searchText = document.getElementById('searchText').value;
  localStorage.setItem('searchText',searchText);
  window.location.href = 'search.html';
}