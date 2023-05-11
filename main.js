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
    btnedit.id="btnedit"
    btnedit.disabled=true
    btnedit.innerText ="Edit"
    btnedit.addEventListener('click', editpokemon)

   

    const btnedel= document.createElement('button')
    btnedel.classList="btn  btn-primary btnmargin"
    btnedel.id="btndel"
    btnedel.disabled=true
    btnedel.innerText ="Delete"
    btnedel.addEventListener('click',deletepokemon)

    const divfind= document.getElementById('findPokemon')
    divfind.classList="text-center thumbnail"

    divsearch.append(findinput,btnfind,btnadd,btnedit,btnedel)

    divfind.appendChild(divsearch)
  }

  function editpokemon(){
    let pokemonObj= {
      id: document.querySelector('.chk').id,
      name: document.getElementById("txtname").value,
      height: document.getElementById("txtheight").value,
      weight:document.getElementById("txtweight").value,
      type: document.getElementById("txttype").value,
      image: document.getElementById("pokemonimg").src
    }
    const gridvalue = document.querySelector(`.c${pokemonObj.id}`)
    gridvalue.querySelector('.clsname').innerHTML=pokemonObj.name
    gridvalue.querySelector('.clstype').innerHTML=pokemonObj.type
    gridvalue.querySelector('.clsheight').innerHTML=pokemonObj.height
    gridvalue.querySelector('.clsweight').innerHTML=pokemonObj.weight

    updatepokemon(pokemonObj)

  }

  function updatepokemon(pokemonObj){
    debugger
    console.log(`http://localhost:3000/pokemons/${pokemonObj.id}`)

    fetch(`http://localhost:3000/pokemons/${pokemonObj.id}`, {
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: document.getElementById("txtname").value,
        height: document.getElementById("txtheight").value,
        weight:document.getElementById("txtweight").value,
        type: document.getElementById("txttype").value,
      })
    })
    .then(response => response.json())
    .then(response => console.log(JSON.stringify(response)))
    removesearch()
  }

  function findpokemon(pokemonname){
    debugger
    let txtinput, fetchValue
    if(typeof pokemonname==='number' && typeof pokemonname!=='' && typeof pokemonname!=="" ){
      txtinput=pokemonname
      fetchValue=`http://localhost:3000/pokemons/${txtinput}`
    }
    else if(document.getElementById('txtfind').value!==''){
      txtinput= document.getElementById('txtfind').value
      fetchValue=`https://pokeapi.co/api/v2/pokemon/${txtinput}`
    }
    debugger
    if(txtinput!=='' && txtinput!==undefined)  {
     console.log(`https://pokeapi.co/api/v2/pokemon/${txtinput}`)
     
    fetch(fetchValue)
    .then(res=> res.json())
    .then (pokemons=> {
        //console.log(pokemons.id+ '  ' +pokemons.name +'  ' + pokemons.height +'  '+ pokemons.weight+'  '+ pokemons.types[0].type.name+'  '+pokemons.sprites.front_default)
        debugger

            const chkdiv = document.createElement('div')
            chkdiv.style="max-width: fit-content; padding-top: 2%;"
            chkdiv.classList="col-sm-2"
            const chkbox= document.createElement('input')
            chkbox.type='checkbox'
            chkbox.id=`${pokemons.id}`
            chkbox.classList="chk"
            chkbox.addEventListener('change',setenable)
            chkbox.checked=true
            chkdiv.appendChild(chkbox)

        const img= document.createElement('img')
        const divfind= document.getElementById('findPokemon')
        //console.log(divfind)
        const divshowitem= document.createElement('div')
        divshowitem.classList="row col-container"
        divshowitem.id="showfindpokemon"
        let imagepath,typepath;
        debugger
        if(typeof txtinput === 'number') {
          imagepath=pokemons.image
          typepath=pokemons.type
        }
        else {
          imagepath=pokemons.sprites.front_default
          typepath=pokemons.types[0].type.name
        }

        divshowitem.innerHTML=`
            <div class="col-sm-3">
              <img id="pokemonimg" src=${imagepath}>
            </div>
            <div class="col-sm-2">
              <label >Pokemon Name</label>
              <input id="txtname" type="text" value=${pokemons.name} > </input>
            </div>
            <div class="col-sm-2">
              <label >Type</label>
              <input id="txttype" type="text" value=${typepath} > </input>
            </div>
            <div class="col-sm-2">
              <label >Height</label>
              <input id="txtheight" type="text" value=${pokemons.height} > </input>
            </div>
            <div class="col-sm-2">
              <label >Weight</label>
              <input id="txtweight" type="text" value=${pokemons.weight} > </input>
            </div>
            `
        divshowitem.appendChild(chkdiv)
        
        divfind.appendChild(divshowitem)
        })
        .catch(error => {
          throw(error);
        })
     }

  }

  function setenable (e){
    console.log(document.getElementById('txtname').value)
debugger
    const chkvalue= document.getElementById(`${e.target.id}`)
    console.log(chkvalue)
    if(chkvalue.checked===true){
      setenablebutton(2)
    }
    else {
      document.getElementById('showfindpokemon').remove()
      setenablebutton(1)
    }
  }

  function setenablebutton(Obj){
      if(Obj===1){
         document.getElementById('btnadd').disabled=false
         document.getElementById('btnedit').disabled=true 
         document.getElementById('btndel').disabled=true
      }
      else if(Obj===2){
        document.getElementById('btnadd').disabled=true
        document.getElementById('btnedit').disabled=false 
        document.getElementById('btndel').disabled=false
      }
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
    
     // console.log(pokemon)

      let container= document.getElementById('showDetail')
      //container.classList="flex-cont photo"
      //debugger

        const divtag= document.createElement('div')
        divtag.classList=`gallery ${pokemon.id}`
        //divtag.id=`${pokemon.id}`
        
        
        const divtagouter= document.createElement('div')
        divtagouter.classList=`responsive d${pokemon.id}`
        
        
        const imgtag= document.createElement('img')
        // imgtag.classList=`${pokemon.id}`
         imgtag.id=`${pokemon.id}`
         imgtag.addEventListener('click',backineditor)
        const dtag= document.createElement('div')

        const lblname= document.createElement('label')
        lblname.innerHTML=`${pokemon.name}`
        lblname.classList="txtvalue"
        const lbltype= document.createElement('label')
        lbltype.innerHTML=`${pokemon.type}`
        lbltype.classList="txtvalue"
        const lblheight= document.createElement('label')
        lblheight.innerHTML=`${pokemon.height}`
        lblheight.classList="txtvalue"
        const lblweight= document.createElement('label')
        lblweight.innerHTML=`${pokemon.weight}` 
        lblweight.classList="txtvalue"
        //dtag.classLis=`desc${pokemon.id}`
        dtag.classList=`c${pokemon.id}`
        dtag.innerHTML= `<b><lable class='clsname'>${lblname.innerText}</lable></b> <br> <lable>Type : </lable> <lable class='clstype'>${lbltype.innerText}</lable> &nbsp;&nbsp;
        <lable>height : </lable> <lable class='clsheight'>${lblheight.innerText}</lable> &nbsp;&nbsp;<lable>Weight: </lable> <lable class='clsweight'>${lblweight.innerText}</lable> `
        //dtag.append(lblname,lbltype,lblheight,lblweight) 
        imgtag.src= `${pokemon.image}`

        divtag.append(imgtag, dtag)
        divtagouter.appendChild(divtag)
        container.append(divtagouter)

        // const btnedit= document.getElementById('btnedit')
        // btnedit.addEventListener('click', (e) => {
        //   debugger
        //   console.log(e.target.id)
        //     pokemon.height=Number(pokemon.height)+10
        //     lblheight.textContent=pokemon.height
        // })
         
  }

  


  function backineditor (e){
    if(checkpokemon()==true){
      findpokemon(Number(e.target.id))
      setenablebutton(2)
    }
  }

  function checkpokemon(){
    let a= document.getElementById('showfindpokemon')
    return ( a !== null)? false: true; 
  }



  
  function renderpokemonupdate(pokemonObj){

  }

  

  function deletepokemon(){
    console.log("run Delete Button")
  }


