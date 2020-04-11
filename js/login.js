var loggedusers = [];
var users = [{
  id: 1,
  username: 'admin',
  password: 'admin',
  type: 'admin'
}, {
  id: 2,
  username: 'reader',
  password: 'reader',
  type: 'reader'
}, {
  id: 3,
  username: 'writer',
  password: 'writer',
  type: 'writer'
}];

function getUserByProperty(key, value, strict, multiple, case_insensitive) {

  var result = [];

  for (var index in users) {
    var user = users[index];

    if (typeof user[key] != 'undefined') {
      var compare = user[key];

      if (case_insensitive) {
        if (typeof compare == 'string')
          compare = compare.toLowerCase();

        if (typeof value == 'string')
          value = value.toLowerCase();
      }

      if (typeof value == 'undefined' || ((strict && compare === value) || (!strict && compare == value))) {
        if (multiple) {
          result.push(user);
        } else {
          return user;
        }
      }
    }
  }
  return multiple ? result : null;
}

function getUserById(id) {
  return getUserByProperty('id', id);
}

function getUserByUsername(username, case_insensitive) {
  return getUserByProperty('username', username, false, false, case_insensitive);
}

function getUsersByType(type, case_insensitive) {
  return getUserByProperty('type', type, false, true, case_insensitive);
}

function login(username, password) {
  if (typeof username == 'string' && typeof password == 'string' && username.length > 0 && password.length > 0) {
    var loggeduser;

    for (var index in users) {
      var user = users[index];

      if (username === user.username && password === user.password)
        loggeduser = user;
    }
    if (typeof loggeduser != 'undefined') {
      loggedusers[loggeduser.id] = true;

      updatelist();

      return loggeduser;
    }
  }

  return false;
}

function logout(userid) {
  if (loggedusers[userid]) {
    var temporary = [];

    for (var id in loggedusers)
      if (id != userid)
        temporary[id] = true;

    loggedusers = temporary;

    updatelist();

    return true;
  }

  return false;
}

function updatelist() {
  var list_element = document.getElementById('logged-in-list');

  if (list_element) {
    var list_container_element = document.getElementById('logged-in');
    var list_container_element_for_login = document.getElementById('login-form');

    if (list_container_element){
      list_container_element.style.visibility = loggedusers.length === 0 ? 'hidden' : 'visible';
      list_container_element_for_login.style.visibility = loggedusers.length === 0 ? 'visible' : 'hidden';
    }

    while (list_element.firstChild)
      list_element.removeChild(list_element.firstChild);

    for (var id in loggedusers) {
      var user = getUserById(id);

      if (user) {
        var p = document.createElement('P');
        p.innerText = user.username;
        var a = document.createElement('A');
        a.userid = id;
        a.href = '#';
        a.innerHTML = '(logout)';

        a.addEventListener('click', function(e) {
          e.preventDefault();

          logout(e.srcElement.userid);
        });

        p.appendChild(a);

        list_element.appendChild(p);
      }
    }

    return true;
  }

  return false;
}

document.getElementById('login-form').addEventListener('submit', function(e) {
  e.preventDefault();

  var username_element = e.srcElement.elements.username;
  var password_element = e.srcElement.elements.password;

  //localStorage.username = document.getElementById("username").value;
  //localStorage.password = document.getElementById("password").value;

  if (username_element && password_element) {
    username = username_element.value;
    password = password_element.value;

    var user = login(username, password);
    window.localStorage.setItem("registeredUser", JSON.stringify(user));

    if (user !== false) {
      username_element.value = '';

      password_element.value = '';

      alert('Logged in as ' + user.username + '.');
    } else {
      password_element.value = '';

      alert('Invalid username and/or password.');
    }
  }
});