const fetchPokemon = () => {
    const pokeName = document.getElementById("pokeName");
    let pokeInput = pokeName.value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeInput}`;
    fetch(url).then((res) => {
        if(res.status != "200"){
            console.log(res);
            pokeImage("./assets/img/notfound.png", "unknown");
        }
        else{
            return res.json();
        } 
    }).then((data) => {
        let pokeImg = data.sprites.other.home.front_default;
        let pokeClr = data.types[0].type.name;
        pokeImage(pokeImg, pokeClr);
        let stats = data.stats;
        pokeStats(stats);
    })
}

//fetchPokemon();
const pokeImage =(url, type) => {
    const pokeImg = document.getElementById("pokeImg");
    pokeImg.src = url;
    //console.log("type"+type);
    document.getElementById("backImg").className = "pokeSvg type"+type;
}

const pokeStats =(statsArray) => {
    let names = ['HP','ATK','DEF','SP-ATK','SP-DEF','SPEED'];
    let values = [];
    let h = 0;
    var table = document.createElement("TABLE");
    statsArray.forEach(stat => {
        values[h] = stat.base_stat;
        h++;
    });
    //Get the count of columns.
    var columnCount = names.length;
    //Add the header row.
    var row = table.insertRow(-1);
    for (var i = 0; i < columnCount; i++) {
        var headerCell = document.createElement("TH");
        headerCell.innerHTML = names[i];
        row.appendChild(headerCell);
    }

    //Add the data rows.
        row = table.insertRow(-1);
        for (var j = 0; j < columnCount; j++) {
            var cell = row.insertCell(-1);
            cell.innerHTML = values[j];
        }

    var dvTable = document.getElementById("dvTable");
    dvTable.innerHTML = "";
    dvTable.appendChild(table);

}

//pokeImage("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png");

const imprimir = () => {
    const pokeName = document.getElementById("pokeName");
    let pokeInput = pokeName.value;
    console.log("Hola " + pokeInput);
}