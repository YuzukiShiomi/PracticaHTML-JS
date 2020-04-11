var loggedusers = [];

document.getElementById('checkUser').addEventListener('click', checkLogin(window.localStorage.getItem('registeredUser')));

function checkLogin(registeredUser){

  alert(registeredUser);

  /*var userInfo = JSON.parse(registeredUser);

  if(userInfo !== null){

    alert('Logged in as ' + userInfo.username + '.');

  } else {

    alert('Not registered user, please log in');

  }*/

}