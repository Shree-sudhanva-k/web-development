function accNavigate(){
  const account = localStorage.getItem('name');
  if(account === 'Login'){
    window.location.href = 'login.html';
  }
  else{
    window.location.href = 'account.html';
  }
}

window.onload = function() {
  const accountSpan = document.getElementById('account');
  accountSpan.innerHTML = localStorage.getItem('name');
};

function handleSearch(){
    const searchText = document.getElementById('searchText').value;
    localStorage.setItem('category',searchText);
    window.location.href = 'veggies.html';
}