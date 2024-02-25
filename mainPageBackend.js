function accNavigate(){
  const account = localStorage.getItem('name');
  if(account === 'Login'){
    window.location.href = 'login.html';
  }
  else{
    window.location.href = 'profile.html';
  }
}

window.onload = function() {
  const accountSpan = document.getElementById('account');
  accountSpan.innerHTML = localStorage.getItem('name') == null ? 'Login' : localStorage.getItem('name');
};

function handleSearch(){
    const searchText = document.getElementById('searchText').value;
    localStorage.setItem('searchText',searchText);
    window.location.href = 'search.html';
}

