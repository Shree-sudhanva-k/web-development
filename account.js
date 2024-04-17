const serverUrl = "http://localhost:8800";
const email = localStorage.getItem("email");
console.log(email);

window.addEventListener("load", fetchUserData(email));

function fetchUserData(email) {
  axios
    .get(`${serverUrl}/account?email=${email}`)
    .then((response) => {
      const items = response.data;
      console.log(items);
      document.querySelector("#p-name").innerHTML = items[0].username;
      document.getElementById("email").innerHTML = items[0].email;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });

  axios
    .get(`${serverUrl}/orders?email=${email}`)
    .then((response) => {
      const items = response.data;
      console.log(items);
      const pendingOrders = document.querySelector(".order-ls");
      const completedOrders = document.querySelector(".completedOrders");
      if (items.length === 0) {
        pendingOrders.innerHTML = "No Orders Yet";
        completedOrders.innerHTML = "No Orders yet";
      } else {
        items.forEach((item) => {
          const template = document.querySelector(".template");
          const cardClone = template.content.cloneNode(true);
          const orderId = cardClone.querySelector(".orderId");
          const orderDate = cardClone.querySelector(".orderDate");
          const totalAmount = cardClone.querySelector(".totalAmount");
          orderId.innerHTML = item.order_id;
          orderDate.innerHTML = item.order_date.substring(0,10);
          totalAmount.innerHTML = item.total_amount;

          if (item.status === "Pending") pendingOrders.appendChild(cardClone);
          else completedOrders.appendChild(cardClone);
        });
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

function signOut() {
  localStorage.setItem("name", "Login");
  localStorage.setItem("email", "");
  window.location.href = "head.html";
}

function deleteAccount() {
  axios
    .delete(`${serverUrl}/account/${email}`)
    .then((response) => {
      signOut();
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}
