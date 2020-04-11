var loggedUsers = [];

document.getElementById('checkUser').addEventListener('click', function(e){

var userInfo = window.localStorage.getItem('registeredUser');

alert(userInfo);

});

/*function checkLogin(registeredUser){

  alert(registeredUser);

  /*var userInfo = JSON.parse(registeredUser);

  if(userInfo !== null){

    alert('Logged in as ' + userInfo.username + '.');

  } else {

    alert('Not registered user, please log in');

  }*/
