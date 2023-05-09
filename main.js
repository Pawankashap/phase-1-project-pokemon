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


fetch("https://pokeapi.co/api/v2/pokemon/garchomp")
.then(res=> res.json())
.then (pokemons=> {
    console.log(pokemons)
    console.log(pokemons.name)
})