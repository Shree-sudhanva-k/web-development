const serverUrl = "http://localhost:8800";

function signup() {
  const username = document.getElementById("sname").value;
  const email = document.getElementById("semail").value;
  const password = document.getElementById("spassword").value;

  axios
    .post(`${serverUrl}/signup`, {
      name: username,
      email,
      password,
    })
    .then((response) => {
      console.log(response);
      localStorage.setItem("name", username);
      localStorage.setItem("email", email);
      window.location.href = "head.html";
    })
    .catch((error) => {
      document.querySelector(".error").innerHTML = error;
    });
}