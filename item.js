const serverUrl = "http://localhost:8800";

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
      const weight = document.querySelector('.weight');

      name.innerHTML = item.name;
      desc.innerHTML = item.description;
      price.innerHTML = item.price;
      category.innerHTML = item.category;
      weight.innerHTML = item.weight;

    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

window.addEventListener("load",itemDisplay());