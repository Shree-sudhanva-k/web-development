const serverUrl = "http://localhost:5500";
const email = localStorage.getItem('email')
console.log(email)


window.addEventListener("load",fetchUserData(email));


function fetchUserData(email){  
    axios
    .get(`${serverUrl}/account/${email}`)
    .then((response) => {
      const items = response.data;
      console.log(items)
      document.querySelector('.account').innerHTML = items[0].email;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

function signOut(){
  localStorage.setItem('name','Login');
  localStorage.setItem('email','');
  window.location.href = 'index.html';
}

function deleteAccount(){
  axios
    .delete(`${serverUrl}/account/${email}`)
    .then((response) => {
      signOut();
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}