const serverUrl = "http://localhost:8800";
const email = localStorage.getItem('email')
console.log(email)


window.addEventListener("load",fetchUserData(email));


function fetchUserData(email){  
    axios
    .get(`${serverUrl}/account?email=${email}`)
    .then((response) => {
      const items = response.data;
      console.log(items)
      document.querySelector('#p-name').innerHTML = items[0].username;
      document.getElementById('email').innerHTML = items[0].email;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

function signOut(){
  localStorage.setItem('name','Login');
  localStorage.setItem('email','');
  window.location.href = 'head.html';
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