// 🔐 belépés ellenőrzés
const user = localStorage.getItem("user");
if (!user) location.href = "login.html";
document.getElementById("username").innerText = user;

// 👩‍🏫 OSZTÁLY → OSZTÁLYFŐNÖK (ITT KEZELED)
const osztalyFonokok = {
  "9.A": "",
  "9.B": "László Krisztina",
  "9.C": "",
  "9.K": "",

  "10.A": "",
  "10.B": "",
  "10.C": "",

  "11.A": "",
  "12.A": "",
  "13.A": ""
};

// 📊 adatok betöltése
fetch("adatok.json")
  .then(r => r.json())
  .then(diakok => {

    // diákok csoportosítása osztály szerint
    const csoport = {};

    diakok.forEach(d => {
      const osztaly = d["Osztály"];
      if (!csoport[osztaly]) csoport[osztaly] = [];
      csoport[osztaly].push(`${d["Vezetéknév"]} ${d["Utónév"]}`);
    });

    // 🔢 osztályok rendezése: 9 → 10 → 11 → 12 → 13, betű szerint
    const sorrend = Object.keys(csoport).sort((a, b) => {
      const evA = parseInt(a.match(/\d+/)[0]);
      const evB = parseInt(b.match(/\d+/)[0]);
      if (evA !== evB) return evA - evB;
      return a.localeCompare(b, "hu");
    });

    // 🧱 kirajzolás
    let html = "";

    sorrend.forEach(o => {
      const tisztaOsztaly = o.replace("1/", ""); // ha van 1/ előtag
      const fonok = osztalyFonokok[tisztaOsztaly] || "Nincs megadva";

      html += `
        <div class="class-block glass">
          <h2>${tisztaOsztaly}</h2>
          <div class="sub">Osztályfőnök: ${fonok}</div>
          <table>
      `;

      // diákok ABC sorrendben
      csoport[o].sort((a,b)=>a.localeCompare(b,"hu")).forEach(nev => {
        html += `<tr><td>${nev}</td></tr>`;
      });

      html += `
          </table>
        </div>
      `;
    });

    document.getElementById("tabla").innerHTML = html;
  });
