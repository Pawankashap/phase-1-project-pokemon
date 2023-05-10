window.addEventListener("DOMContentLoaded", (event) => {
    const findinput= document.createElement('input')  
    findinput.type="text"
    findinput.id="txtfind"
    
    const btnfind= document.createElement('button')
    btnfind.id="btnfind"
    btnfind.innerText= 'Find'
    btnfind.addEventListener('click',findpokemon)

    const btnadd= document.createElement('button')
    btnadd.id="btnadd"
    btnadd.innerText ="Add"
    btnadd.addEventListener('click',addpokemon)

    const divfind= document.getElementById('findPokemon')
    divfind.appendChild(findinput)
    divfind.appendChild(btnfind)
    divfind.appendChild(btnadd)
    
  });
  function findpokemon(){
    console.log("run botton find pokemon")
    
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


fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
.then(res=> res.json())
.then (pokemons=> {
    console.log(pokemons)
   // debugger
    console.log(pokemons.name)
    console.log(pokemons.types[0].type.name)
})