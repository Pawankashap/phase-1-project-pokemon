console.log("run Main.js file")

fetch("http://localhost:3000/pokemons").then(res=> res.json()).then (json=> console.log(json))