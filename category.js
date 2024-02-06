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
        const productName = cardClone.querySelector(".product-name");
        const productDesc = cardClone.querySelector(".product-desc");

        productName.innerHTML = item.name;
        productDesc.innerHTML = item.description;

        

        cardContainer.appendChild(cardClone);
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}