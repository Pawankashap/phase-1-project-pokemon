window.addEventListener("DOMContentLoaded", (event) => {
   event.preventDefault()
    showheader()
    showdetail()
  });

  function showdetail(){
    fetch("http://localhost:3000/pokemons")
    .then(res=> res.json())
    .then (pokemonsData=> pokemonsData.forEach(pokemon => renderpokemon(pokemon)))
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

    //findinput.value='charizard'
    
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
  
  function deletepokemon(){
    document.querySelector(`.d${carddetails().id}`).remove()
    delpokemonData(carddetails().id)
  }

  function carddetails(){
    let pokemonObj= {

      id: document.querySelector('.chk').id,
      name: document.getElementById("txtname").value,
      height: document.getElementById("txtheight").value,
      weight:document.getElementById("txtweight").value,
      type: document.getElementById("txttype").value,
      image: document.getElementById(document.querySelector('.chk').id).src
    }
    return pokemonObj
  }

  function editpokemon(){
    if(checkinputText()===true){
      const gridvalue = document.querySelector(`.c${carddetails().id}`)
      gridvalue.querySelector('.clsname').innerHTML=carddetails().name
      gridvalue.querySelector('.clstype').innerHTML=carddetails().type
      gridvalue.querySelector('.clsheight').innerHTML=carddetails().height
      gridvalue.querySelector('.clsweight').innerHTML=carddetails().weight
      updatepokemon(carddetails())
    }
  }

  function delpokemonData(pokemonId){
    fetch(`http://localhost:3000/pokemons/${pokemonId}`, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(pokemon => console.log(pokemon))
      removesearch()
  }

  function updatepokemon(pokemonObj){

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
    let txtinput, fetchValue
    // if(typeof pokemonname==='number' && typeof pokemonname!=='' && typeof pokemonname!=="" ){
    //   txtinput=pokemonname
    //   fetchValue=`http://localhost:3000/pokemons/${txtinput}`

    // }
    // else if(document.getElementById('txtfind').value!==''){
    //   txtinput= document.getElementById('txtfind').value
    //   fetchValue=`https://pokeapi.co/api/v2/pokemon/${txtinput.toLowerCase()}`
    // }
    
    txtinput= document.getElementById('txtfind').value.trim()
    if(txtinput==='')  {
      document.getElementById('txtfind').focus()
      window.alert('Please enter Pokemon name')
    }
    else if(txtinput!=='' && txtinput!==undefined)  {
      
      console.log(`https://pokeapi.co/api/v2/pokemon/${txtinput.toLowerCase()}`)
      fetchValue=`https://pokeapi.co/api/v2/pokemon/${txtinput.toLowerCase()}`
    fetch(fetchValue)
    .then(res=> res.json())
    .then (pokemons=> {
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
        const divshowitem= document.createElement('div')
        divshowitem.classList="row col-container"
        divshowitem.id="showfindpokemon"
        let imagepath,typepath;
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
              <img id=${pokemons.id} src=${imagepath}>
            </div>
            <div class="col-sm-2">
              <label >Pokemon Name</label>
              <input id="txtname" type="text" value=${pokemons.name.charAt(0).toUpperCase()+pokemons.name.slice(1)} > </input>
            </div>
            <div class="col-sm-2">
              <label >Type</label>
              <input id="txttype" type="text" value=${typepath.charAt(0).toUpperCase()+typepath.slice(1)} > </input>
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
     
     console.log('before set id function')
     setTimeout(()=>{
      if(typeof pokemonname==='object'){
        getid()
      }
     },125)
     console.log('after set id function')
     document.getElementById('txtfind').textContent=''
     
  }

  function setenable (e){
    const chkvalue= document.getElementById(`${e.target.id}`)
    if(chkvalue.checked===true){
      setenablebutton(2)
    }
    else {
      document.getElementById('txtfind').value=''
      document.getElementById('txtfind').focus()

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
  function getid(){
    fetch("http://localhost:3000/pokemons")
    .then(res=> res.json())
    .then (pokemons=> {
      console.log(Math.max(pokemons)+1)
      let maxid
      let ids=[]
        pokemons.forEach((pokemon)=>{
            ids.push(pokemon.id)
        })
        //debugger
        if(ids.length ===0){
          document.querySelector('.chk').id= 1
        }
        else {
        document.querySelector('.chk').id= Math.max(...ids)+1    
        }
    })
    setTimeout(() => {
      setenablebutton(1)  
    }, 50);
    
  }

  function checkinputText(){
    if(document.getElementById("txtname").value===''){
      document.getElementById("txtname").focus()
      window.alert('Please enter Pokemon name')
        return false
    }
    else if(document.getElementById("txtheight").value===''){
      document.getElementById("txtheight").focus()
      window.alert('Please enter Pokemon height')
      return false
    }
    else if (document.getElementById("txtweight").value==='') {
      document.getElementById("txtweight").focus()
      window.alert('Please enter Pokemon weight')
      return false
    }
    else if(document.getElementById("txttype").value===''){
      document.getElementById("txttype").focus()
      window.alert('Please enter Pokemon type')
      return false
    }
    else {
      return true
    }

  }


  function addpokemon(obj){
    if(checkinputText()===true){
      let pokemonObj= {
        id: document.querySelector('.chk').id,//document.getElementsByTagName('img')[1].id, //document.querySelector('.chk').id,
        name: document.getElementById("txtname").value,
        height: document.getElementById("txtheight").value,
        weight:document.getElementById("txtweight").value,
        type: document.getElementById("txttype").value,
        image: document.getElementById(document.getElementsByTagName('img')[1].id).src
      }
      
      renderpokemon(pokemonObj)
      insertpokemon(pokemonObj)
      document.getElementById('txtfind').value=' '
    }
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
    document.getElementById('txtfind').textContent=''
  }

  function renderpokemon (pokemon){
      pokID=pokemon.id
      let container= document.getElementById('showDetail')
      const divtag= document.createElement('div')
      divtag.classList=`gallery ${pokID}`
      const divtagouter= document.createElement('div')
      divtagouter.classList=`responsive d${pokID}`
      const imgtag= document.createElement('img')
      imgtag.id=`${pokID}`
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
      dtag.classList=`c${pokID}`
      dtag.innerHTML= `<b><lable class='clsname'>${lblname.innerText}</lable></b> <br> <lable>Type : </lable> <lable class='clstype'>${lbltype.innerText}</lable> &nbsp;&nbsp;
        <lable>Height : </lable> <lable class='clsheight'>${lblheight.innerText}</lable> &nbsp;&nbsp;<lable>Weight: </lable> <lable class='clsweight'>${lblweight.innerText}</lable> `
      imgtag.src= `${pokemon.image}`
      divtag.appendChild(imgtag)
      divtag.appendChild(dtag)
      divtagouter.appendChild(divtag)
      container.appendChild(divtagouter)
  }

  function backineditor (e){
    if(checkpokemon()==true){
      const child = document.getElementById(e.target.id).closest('div.gallery');
      let editpokelist= {
       id: e.target.id,
       name: child.querySelector(`.c${e.target.id}`).querySelector('.clsname').innerHTML,
       type: child.querySelector(`.c${e.target.id}`).querySelector('.clstype').innerHTML,
       height: child.querySelector(`.c${e.target.id}`).querySelector('.clsheight').innerHTML,
       weight: child.querySelector(`.c${e.target.id}`).querySelector('.clsweight').innerHTML,
       image: document.getElementById(`${e.target.id}`).src
    }
    console.log(editpokelist)
    renderbacktoeditor(editpokelist)
    setenablebutton(2)
    }
  }

  function renderbacktoeditor(pokelist){
    const chkdiv = document.createElement('div')
            chkdiv.style="max-width: fit-content; padding-top: 2%;"
            chkdiv.classList="col-sm-2"
            const chkbox= document.createElement('input')
            chkbox.type='checkbox'
            chkbox.id=`${pokelist.id}`
            chkbox.classList="chk"
            chkbox.addEventListener('change',setenable)
            chkbox.checked=true
            chkdiv.appendChild(chkbox)

        const img= document.createElement('img')
        const divfind= document.getElementById('findPokemon')
        const divshowitem= document.createElement('div')
        divshowitem.classList="row col-container"
        divshowitem.id="showfindpokemon"
        let imagepath,typepath;
        imagepath=pokelist.image
        typepath=pokelist.type
        divshowitem.innerHTML=`
            <div class="col-sm-3">
              <img id=${pokelist.id} src=${imagepath}>
            </div>
            <div class="col-sm-2">
              <label >Pokemon Name</label>
              <input id="txtname" type="text" value=${pokelist.name} > </input>
            </div>
            <div class="col-sm-2">
              <label >Type</label>
              <input id="txttype" type="text" value=${pokelist.type} > </input>
            </div>
            <div class="col-sm-2">
              <label >Height</label>
              <input id="txtheight" type="text" value=${pokelist.height} > </input>
            </div>
            <div class="col-sm-2">
              <label >Weight</label>
              <input id="txtweight" type="text" value=${pokelist.weight} > </input>
            </div>
            `
        divshowitem.appendChild(chkdiv)
        divfind.appendChild(divshowitem)
        setenablebutton(1)
        document.getElementById('txtfind').textContent=''
  }

  function checkpokemon(){
    let a= document.getElementById('showfindpokemon')
    return ( a !== null)? false: true; 
  }