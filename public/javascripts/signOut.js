let showLoginBtn = document.getElementById('signinBtn');
let showLogoutBtn = document.getElementById('signOut');

console.log(showLoginBtn);


// Switch showLoginBtn/showLogouBtn buttons
showLoginBtn.onclick = function () {
    showLogoutBtn.style.display = "none";
    showLoginBtn.style.display = "block";
}

showLogoutBtn.onclick = function () {
    showLoginBtn.style.display = "none";
    showLogoutBtn.style.display = "block";
}
