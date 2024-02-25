const serverUrl = "http://localhost:8800";

function signup() {
  const username = document.getElementById("sname").value;
  const email = document.getElementById("semail").value;
  const password = document.getElementById("spassword").value;
  const role = document.querySelector('.role').value;
  console.log(role)

  axios
    .post(`${serverUrl}/signup`, {
      username,
      email,
      password,
      role,
    })
    .then((response) => {
      console.log(response);
      localStorage.setItem("name", username);
      localStorage.setItem("email", email);
      localStorage.setItem("role",role);
      window.location.href = "head.html";
    })
    .catch((error) => {
      document.querySelector(".error").innerHTML = error;
    });
}

function login() {  
  const email = document.getElementById("lemail").value;
  const password = document.getElementById("lpassword").value;
  console.log(email+password);

  axios
    .post(`${serverUrl}/login`, {      
      email,
      password,
    })
    .then((response) => {
      console.log(response.data);
      localStorage.setItem("name", response.data.user.name);
      localStorage.setItem("email", email);
      localStorage.setItem("role",response.data.user.role);
      window.location.href = "head.html";
    })
    .catch((error) => {
      document.querySelector(".error").innerHTML = error;
    });
}

function accNavigate() {
  const account = localStorage.getItem("name");
  if (account === "Login") {
    window.location.href = "login.html";
  } else {
    window.location.href = "account.html";
  }
}

// window.onload = function () {
//   const accountSpan = document.querySelector(".account");
//   accountSpan.innerHTML = localStorage.getItem("name");
// };
