window.addEventListener("DOMContentLoaded", (event) => {
   event.preventDefault()
    showheader()
    showdetail()
    
    
  });

  function showdetail(){
    fetch("http://localhost:3000/pokemons")
    .then(res=> res.json())
    .then (pokemons=>{
        let container= document.getElementById('showDetail')
        container.classList="flex-cont"
        //debugger
        pokemons.forEach(pokemon => {
          const divtag= document.createElement('div')
          const imgtag= document.createElement('img')
          const ptag= document.createElement('p')
          ptag.textContent=`Name :${pokemon.name}  Type :  ${pokemon.type}  Height : ${pokemon.height}  Weight : ${pokemon.weight}`
          imgtag.src= `${pokemon.image}`

          divtag.append(imgtag, ptag)
          container.append(divtag)
          
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
  }

  function showheader(){
    const divsearch= document.createElement('div')
    divsearch.classList="row"

    const findinput= document.createElement('input')  
    findinput.type="text"
    findinput.id="txtfind"
    findinput.className="form-control"
    findinput.style.maxWidth="30%"
    findinput.style.display="initial"

    findinput.value='charizard'
    
    const btnfind= document.createElement('button')
    btnfind.classList="btn  btn-primary btnmargin"
    btnfind.id="btnfind"
    btnfind.innerText= 'Find'
    btnfind.addEventListener('click',findpokemon)

    const btnadd= document.createElement('button')
    btnadd.classList="btn  btn-primary btnmargin"
    btnadd.id="btnadd"
    btnadd.innerText ="Add"
    btnadd.addEventListener('click',addpokemon)

    const btnedit= document.createElement('button')
    btnedit.classList="btn  btn-primary btnmargin"
    btnedit.id="btnadd"
    btnedit.innerText ="Edit"
    btnedit.addEventListener('click',editpokemon)

    const btnedel= document.createElement('button')
    btnedel.classList="btn  btn-primary btnmargin"
    btnedel.id="btnadd"
    btnedel.innerText ="Delete"
    btnedel.addEventListener('click',deletepokemon)

    const divfind= document.getElementById('findPokemon')
    divfind.classList="text-center thumbnail"

    divsearch.append(findinput,btnfind,btnadd,btnedit,btnedel)

    divfind.appendChild(divsearch)
  }

  function findpokemon(){
    const txtinput= document.getElementById('txtfind').value
        
    fetch(`https://pokeapi.co/api/v2/pokemon/${txtinput}`)
    .then(res=> res.json())
    .then (pokemons=> {
        console.log(pokemons.name +'  ' + pokemons.height +'  '+ pokemons.weight+'  '+ pokemons.types[0].type.name+'  '+pokemons.sprites.front_default)
        //debugger
        const img= document.createElement('img')
        const divfind= document.getElementById('findPokemon')
        const divshowitem= document.createElement('div')
        divshowitem.classList="row col-container"

        divshowitem.innerHTML=`
            <div class="col-sm-3">
              <img id="pokemonimg" src=${pokemons.sprites.front_default}>
            </div>
            <div class="col-sm-2">
              <label >Pokemon Name</label>
              <input id="txtname" type="text" value=${pokemons.name} > </input>
            </div>
            <div class="col-sm-2">
              <label >Type</label>
              <input id="txttype" type="text" value=${pokemons.types[0].type.name} > </input>
            </div>
            <div class="col-sm-2">
              <label >Height</label>
              <input id="txtheight" type="text" value=${pokemons.height} > </input>
            </div>
            <div class="col-sm-2">
              <label >Weight</label>
              <input id="txtweight" type="text" value=${pokemons.weight} > </input>
        </div>`
        
        
      divfind.appendChild(divshowitem)
    })

  }
  function addpokemon(e){
    fetch('http://localhost:3000/pokemons', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        // "name": document.getElementById("txtname").value,
        // "height":document.getElementById("txttype").value,
        // "weight":document.getElementById("txtheight").value,
        // "type": document.getElementById("txtweight").value,
        // "image":document.getElementById("pokemonimg").src
        "name":e.target.name.value,
        "height":e.target.height.value,
        "weight":e.target.weight.value,
        "type":e.target.type.value,
        "image":e.target.img.src
      })
    })
    .then(response => response.json())
    .then(response => console.log(JSON.stringify(response)))
    showdetail()
  }

  function editpokemon(){
    console.log("run Edit button")
  }

  function deletepokemon(){
    console.log("run Delete Button")
  }


