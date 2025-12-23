const users = {
  "Benedek": { pass: "201004", name: "Benedek" },
  "Admin04": { pass: "admin", name: "Admin" }
};

function login(){
  const u = document.getElementById("user").value.trim();
  const p = document.getElementById("pass").value;
  const h = document.getElementById("hiba");

  if(users[u] && users[u].pass === p){
    localStorage.setItem("user", users[u].name);
    window.location.href = "dashboard.html";
  } else {
    h.innerText = "Hibás felhasználónév vagy jelszó";
  }
}
