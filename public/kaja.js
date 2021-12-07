document.getElementById('kajalista').onclick = kajaListHTML;

async function kajaListHTML() {
    const response = await fetch("kaja");
    const kaja = await response.json();

    let kajaTable = '<table id="mykajaTable"><tr><th>Étel típusa</th><th>Étel fantáziaeve</th><th>Étel Ára (HUF):</th></tr>';
    for (const egyKaja of kaja) {
        if (egyKaja.valaszt == "Hamburger")
            kajaTable += `<tr><td><img src="hambi.jpg"></td><td>${egyKaja.neve}</td><td>${egyKaja.ar}</td></tr>`;
        else
            kajaTable += `<tr><td><img src="pizza.jpg"></td><td>${egyKaja.neve}</td><td>${egyKaja.ar}</td></tr>`;
    }
    kajaTable += '</table>';

    document.getElementById('kiir').innerHTML = kajaTable;
}

document.getElementById("ujKaja").onsubmit = async function (event) {
    event.preventDefault();

    const valaszt = event.target.elements.valaszt.value;
    const ar = event.target.elements.ar.value;
    const neve = event.target.elements.neve.value;

    const res = await fetch("/kaja", {
        method: 'POST',
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({
            valaszt,
            ar,
            neve

        }),
    });

    kajaListHTML();

};