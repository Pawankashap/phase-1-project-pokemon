window.addEventListener("DOMContentLoaded", (event) => {
   event.preventDefault()
    showheader()
    showdetail()
  });

  function showdetail(){
    //debugger
    fetch("http://localhost:3000/pokemons")
    .then(res=> res.json())
    .then (pokemonsData=> pokemonsData.forEach(pokemon => renderpokemon(pokemon)))
      
  }

  function showheader(){

    console.log('run this show button')
    //debugger
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
    console.log('run find button')
    const txtinput= document.getElementById('txtfind').value
        
    fetch(`https://pokeapi.co/api/v2/pokemon/${txtinput}`)
    .then(res=> res.json())
    .then (pokemons=> {
        console.log(pokemons.name +'  ' + pokemons.height +'  '+ pokemons.weight+'  '+ pokemons.types[0].type.name+'  '+pokemons.sprites.front_default)
        //debugger
        const img= document.createElement('img')
        const divfind= document.getElementById('findPokemon')
        console.log(divfind)
        const divshowitem= document.createElement('div')
        divshowitem.classList="row col-container"
        divshowitem.id="showfindpokemon"

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
    let pokemonObj= {
      name: document.getElementById("txtname").value,
      height: document.getElementById("txtheight").value,
      weight:document.getElementById("txtweight").value,
      type: document.getElementById("txttype").value,
      image: document.getElementById("pokemonimg").src
    }

    renderpokemon(pokemonObj)
    insertpokemon(pokemonObj)
    //debugger
    
    
  }
  function insertpokemon(pokemonObj){
    fetch('http://localhost:3000/pokemons', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pokemonObj)
    })
    .then(response => response.json())
    .then(response => console.log(JSON.stringify(response)))
    removesearch()
    
    
  }

  function removesearch() {
    const element = document.getElementById("showfindpokemon");
    element.remove();
  }


  function renderpokemon (pokemon){
    
      console.log(pokemon)

      let container= document.getElementById('showDetail')
      //container.classList="flex-cont photo"
      //debugger

        const divtag= document.createElement('div')
        divtag.classList="gallery"
        const divtagouter= document.createElement('div')
        divtagouter.classList="responsive"
        
        const imgtag= document.createElement('img')
        const ptag= document.createElement('p')
        ptag.classLis="desc"
        ptag.textContent=`Name :${pokemon.name}  Type :  ${pokemon.type}  Height : ${pokemon.height}  Weight : ${pokemon.weight}`
        imgtag.src= `${pokemon.image}`

        divtag.append(imgtag, ptag)
        divtagouter.appendChild(divtag)
        container.append(divtagouter)
        
  }

  function editpokemon(){
    console.log("run Edit button")
  }

  function deletepokemon(){
    console.log("run Delete Button")
  }


