const user = {
  username: "root",
  password: "123456",
  isLogin: false,
};

const form = document.querySelector("form");
const username = document.getElementById("username");
const password = document.getElementById("password");
const rememberMe = document.getElementById("remember-me");
const welcomBox = document.querySelector(".welcome-wrapper");
const logoutBtn = document.getElementById("logout");

if (!localStorage.getItem("dbUser")) {
  localStorage.setItem("dbUser", JSON.stringify(user));
} else if (
  JSON.parse(localStorage.getItem("dbUser")).isLogin ||
  sessionStorage.getItem("dbUser")
) {
  welcomBox.style.display = "block";
  form.style.display = " none";
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let isValid = validation(username.value, password.value);

  console.log(rememberMe.checked);

  if (isValid && rememberMe.checked) {
    user.isLogin = true;
    localStorage.setItem("dbUser", JSON.stringify(user));
  } else if (isValid && !rememberMe.checked) {
    user.isLogin = true;
    sessionStorage.setItem("dbUser", JSON.stringify(user));
  } else {
    return;
  }

  form.reset();

  welcomBox.style.display = "block";
  form.style.display = " none";
});

logoutBtn.addEventListener("click", () => {
  user.isLogin = false;
  localStorage.setItem("dbUser", JSON.stringify(user));
  welcomBox.style.display = "none";
  form.style.display = " block";
});

function validation(username, password) {
  let user = JSON.parse(localStorage.getItem("dbUser"));
  if (username !== user.username || password !== user.password) {
    alert("istifadeci adi ve ya shifre yanlishdir");
    return false;
  }

  return true;
}
