const serverUrl = "http://localhost:8800";
let photo = '';

function productInput() {
  const name = document.getElementById("pname").value;
  const category = document.getElementById("pcatg").value;
  const price = document.getElementById("pprice").value;  
  const stock_quantity = document.getElementById("p-stock-quant").value;
  const description = document.getElementById("description").value;
  const email = localStorage.getItem('email');
  axios
    .post(`${serverUrl}/productInput`, {
      name,
      category,
      price,      
      stock_quantity,
      description,
      photo,
      email
    })
    .then((response) => {
      console.log(response);      
      // window.location.href = "head.html";
    })
    .catch((error) => {
      document.querySelector(".error").innerHTML = error;
    });
}

const handleFileInputChange = async (event) => {
  let inputfile = document.getElementById("pic1");
  let fileLabel = document.getElementById("file");

  fileLabel.style.background =
    "url(" + URL.createObjectURL(inputfile.files[0]) + ")";
  fileLabel.style.backgroundSize = "contain";
  fileLabel.style.color = "#f5f5f500";
  fileLabel.style.backgroundRepeat = "no-repeat";
  console.log(event);

  const file = event.target.files[0];

  const data = await uploadImageToCloudinary(file);

  console.log(data.url);

  photo = data.url;
};

const uploadImageToCloudinary = async (file) => {
  const uploadData = new FormData();

  uploadData.append("file", file);
  uploadData.append("upload_preset", "doctorAppointment");
  uploadData.append("cloud_name", "dw1bfqu2k");

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/dw1bfqu2k/image/upload`,
    {
      method: "post",
      body: uploadData,
    }
  );
  console.log(res);
  return res.json();
};
