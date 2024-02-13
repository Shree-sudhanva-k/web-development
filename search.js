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
        const productDesc = cardClone.querySelector(".desc");

        productName.innerHTML = item.name;
        productDesc.innerHTML = item.description;        

        cardContainer.appendChild(cardClone);
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}