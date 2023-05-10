window.addEventListener("DOMContentLoaded", (event) => {

    const divsearch= document.createElement('div')
    divsearch.classList="row"

    const findinput= document.createElement('input')  
    findinput.type="text"
    findinput.id="txtfind"
    findinput.className="form-control"
    findinput.style.maxWidth="30%"
    findinput.style.display="initial"
    
    const btnfind= document.createElement('button')
    btnfind.classList="btn  btn-primary"
    btnfind.id="btnfind"
    btnfind.innerText= 'Find'
    btnfind.addEventListener('click',findpokemon)

    const btnadd= document.createElement('button')
    btnadd.classList="btn  btn-primary"
    btnadd.id="btnadd"
    btnadd.innerText ="Add"
    btnadd.addEventListener('click',addpokemon)

    const divfind= document.getElementById('findPokemon')
    divfind.classList="text-center thumbnail"

    divsearch.append(findinput,btnfind,btnadd)

    divfind.appendChild(divsearch)
    
    
  });
  function findpokemon(){
        
    fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
    .then(res=> res.json())
    .then (pokemons=> {
        console.log(pokemons.name +'  ' + pokemons.height +'  '+ pokemons.weight+'  '+ pokemons.types[0].type.name+'  '+pokemons.sprites.front_default)
        //debugger
        const img= document.createElement('img')
        const divfind= document.getElementById('findPokemon')
        const divshowitem= document.createElement('div')
        divshowitem.classList="row"
        
        const divimg= document.createElement('div')
        divimg.classList="col-sm-3"
        divimg.appendChild(img)
        
        const nameinput= document.createElement('input')  
        nameinput.type="text"
        nameinput.id="txtname"
        nameinput.classList="form-control "

        const divname= document.createElement('div')
        divname.classList="col-sm-3"
        divname.appendChild(nameinput)

        

        const typeinput= document.createElement('input')  
        typeinput.type="text"
        typeinput.id="txttype"
        typeinput.classList="form-control"

        const divtype= document.createElement('div')
        divtype.classList="col-sm-3"
        divtype.appendChild(typeinput)

        const heightinput= document.createElement('input')  
        heightinput.type="text"
        heightinput.id="txtheight"
        heightinput.classList="form-control"

        const divheight= document.createElement('div')
        divheight.classList="col-sm-1"
        divheight.appendChild(heightinput)

        const weightinput= document.createElement('input')  
        weightinput.type="text"
        weightinput.id="txtweight"
        weightinput.classList="form-control"

        const divweight= document.createElement('div')
        divweight.classList="col-sm-1"
        divweight.appendChild(weightinput)

        img.src=pokemons.sprites.front_default
        nameinput.value=pokemons.name
        typeinput.value=pokemons.types[0].type.name
        heightinput.value=pokemons.height
        weightinput.value=pokemons.weight

        divshowitem.append(divimg,divname,divtype,divheight,divweight)

     //divfind.append(img,nameinput,typeinput,heightinput,weightinput)
     divfind.appendChild(divshowitem)
    })

  }
  function addpokemon(){
    console.log("run botton Add pokemon")
  }

console.log("run Main.js file")

fetch("http://localhost:3000/pokemons")
.then(res=> res.json())
.then (pokemons=>{
    const container= document.querySelector("ul#pokemonList");
    pokemons.forEach(pokemon => {
        console.log(pokemon)
        console.log(pokemon.name)
        
        //name,description,type
        //create an ellement to hold the name,
        //create a list item li to hold the name and description
        //append ellements to list item
        //append list to item container
        //todo add image property to db.json ingredient
    });
})

