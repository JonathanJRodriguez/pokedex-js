const fetchPokemon = () => {
    const pokeName = document.getElementById("pokeName");
    let pokeInput = pokeName.value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeInput}`;
    fetch(url).then((res) => {
        if(res.status != "200"){
            console.log(res);
            pokeImage("./assets/img/notfound.png", "unknown", "unknown");
        }
        else{
            return res.json();
        } 
    }).then((data) => {
        let pokeImg = data.sprites.other.home.front_default;
        let pokeClr = data.types[0].type.name;
        let pokeRname = capitalize(data.species.name);
        let stats = data.stats;
        let moves = data.moves;
        pokeImage(pokeImg, pokeClr,pokeRname);
        pokeStats(stats);
        pokeType(pokeClr);
        pokeMoves(moves);
    })
}

//fetchPokemon();
const pokeImage =(url, type, name) => {
    const pokeImg = document.getElementById("pokeImg");
    pokeImg.src = url;
    //console.log("type"+type);
    document.getElementById("backImg").className = "pokeSvg type"+type;
    document.getElementById("backImg").innerHTML = `<p class="pokeRealName">${name}</p>`;
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

const pokeType = (type) => {
    let text = document.getElementById("pokeType");
    text.innerText = capitalize(type);
    text.className = "type"+type;
}

const pokeMoves = (movesArray) => {
    let moveNames = [];
    let i = 0;
    var listContainer = document.getElementById("dvMoves");
    movesArray.forEach(move => {
        moveNames[i] = capitalize(move.move.name);
        i++;
    })
    listContainer.innerHTML = "";
    listElement = document.createElement('ul');
    listContainer.appendChild(listElement);
    for (j = 0; j < moveNames.length; j++){
        listItem = document.createElement('li');
        // Add the item text
        listItem.innerHTML = moveNames[j];
        // Add listItem to the listElement
        listElement.appendChild(listItem);
    }
}
//pokeImage("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png");

const imprimir = () => {
    const pokeName = document.getElementById("pokeName");
    let pokeInput = pokeName.value;
    console.log("Hola " + pokeInput);
}

const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }