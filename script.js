let diakok = [];

// 👩‍🏫 OSZTÁLY → OSZTÁLYFŐNÖK (PONTOS!)
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
  .then(d => diakok = d);

// segédfüggvény (ékezet, kisbetű)
function n(s){
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");
}

function keres(){
  const input = n(document.getElementById("kereso").value.trim());
  const e = document.getElementById("eredmeny");
  e.innerHTML = "";
  if(!input) return;

  // osztály minta: 9a, 10c, 12b
  const osztalyMinta = input.match(/^\d{1,2}[a-z]$/);

  const talalatok = diakok.filter(d => {
    const nev = n(`${d["Vezetéknév"]} ${d["Utónév"]}`);
    const oszt = n(d["Osztály"]);
    return osztalyMinta ? oszt.includes(input) : nev.includes(input);
  });

  if(talalatok.length === 0){
    e.innerHTML = `<div class="status">Nincs találat</div>`;
    return;
  }

  e.innerHTML = `<div class="status">Találat: ${talalatok.length}</div>`;

  talalatok.forEach(t => {
    const teljesNev = `${t["Vezetéknév"]} ${t["Utónév"]}`;
    const tisztaOsztaly = t["Osztály"].replace("1/","");
    const fonok = osztalyFonokok[tisztaOsztaly] || "Nincs megadva";

    e.innerHTML += `
      <div class="item">
        <div class="name">${teljesNev}</div>
        <div class="sub">Osztály: ${tisztaOsztaly}</div>
        <div class="sub">Osztályfőnök: ${fonok}</div>
      </div>
    `;
  });
}
