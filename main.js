const search = document.getElementById('search') ;
const btnSend = document.getElementById('btn-send');
let name = document.querySelector('.name'); 
let img = document.querySelector('.img');
let where = document.querySelector('.location');
let abilities = document.querySelector('.abilities');
let height = document.querySelector('.height');
let type = document.querySelector('.type');
let hp = document.querySelector('.hp');
let attack = document.querySelector('.attack');
let defense = document.querySelector('.defense');
let container = document.querySelector('.container')
let specialAttack = document.querySelector('.special-attack');
let infoContain = document.querySelector('.pokemon-info');
let containerError = document.querySelector('.error');
let mensajeError = document.querySelector('.mensaje-error')
let statsContainer = document.querySelector('.stats-container');
let imgErr = document.querySelector('.errorNo')
let resultLocation;
let requestLocation;

const getPokemonInfo = async ()=>{
	try{
	let user_search = search.value.toLowerCase();
	let request = await fetch(`https://pokeapi.co/api/v2/pokemon/${user_search}`);
	let result = await request.json();
	let resulttype = result.types[0].type.name;
	try{
	 requestLocation = await fetch(`${result.location_area_encounters}`);
	 resultLocation = await requestLocation.json();
	 resultLocation = resultLocation[0].location_area.name;
    }catch(error){
    	requestLocation = null;
    	resultLocation = null;
    	console.log(error)
    }

	if (resulttype == 'fire'){
		infoContain.style.backgroundColor = "#FF0000";
	}
	else if (resulttype == 'water'){
		infoContain.style.backgroundColor = "#48e";
	}
	else if (resulttype == 'grass'){
		infoContain.style.backgroundColor = "#3EC200";
	} else if (resulttype == 'rock'){
		infoContain.style.backgroundColor = "#C89500";
	} else if (resulttype == 'bug'){
		infoContain.style.backgroundColor = "#195B23";
	}
	else if (resulttype == 'electric'){
		infoContain.style.backgroundColor = "#D0C102";
	}
	else if (resulttype == 'dragon'){
		infoContain.style.backgroundColor = "#FF9B02";
	}
	else if (resulttype == 'psychic'){
		infoContain.style.backgroundColor = "#FF02E8"
	}
	else{
		infoContain.style.backgroundColor = "#DCBB5F";
	}

	if (resultLocation == undefined || resultLocation == null ){
		spanish = `No disponible`;
	}else{
	switch (resultLocation){
		case `trophy-garden-area`:
		    spanish = `Zona ajardinada`;
		    break;
		case `pallet-town-area`:
		    spanish = `En los alrededores de Ciudad Paleta`;
		    break;
		case `kanto-route-2-south-towards-viridian-city`:
		    spanish = `Kanto ruta 2 sur hacia la ciudad de viridian`;
		    break;
		case `viridian-forest-area`:
		    spanish = `En los alrededores de bosque viridiano`;
		    break;
		case `power-plant-area`:
		    spanish = `Area de la planta de energía`;
		    break;
	    case `hoenn-safari-zone-sw`:
	        spanish = `Hoenn en la zona del safari`;
	        break;
	    default:
	        spanish = resultLocation;
	        break;
		    return spanish;
	}
    }

    imgErr.style.display = "none";
    containerError.style.display = "none";
	statsContainer.style.display = "block";
	container.style.display = "block";
	infoContain.style.display = "block";
	specialAttack.innerHTML = `Ataque especial: <br>${result.stats[3].base_stat}`
	defense.innerHTML = `Defensa: <br>${result.stats[2].base_stat}`
	attack.innerHTML = `Ataque: <br>${result.stats[1].base_stat}`
	hp.innerHTML = `Hp:<br>${result.stats[0].base_stat}`
	if (result.types.length == 2){
		type.innerHTML = `${resulttype}, ${result.types[1].type.name}`
	}
	else{
	type.innerHTML = `${resulttype}`
    }
	height.innerHTML = `${result.height*10/100} M`;
	name.innerHTML = `${result.name.toUpperCase()} N. º${result.id}`;
	img.src = result.sprites.front_default;
	where.innerHTML = `${spanish}`
	abilities.innerHTML = ``;
	for (let i = 0; i<result.abilities.length; i++){
		powers = result.abilities[i].ability.name;
		if (i == result.abilities.length-1){
			abilities.innerHTML += ` ${powers} `
		}else{
			abilities.innerHTML += ` ${powers}, `
		}
	}
	console.log(result);
    } catch(e){
    	console.log(e);
    	console.log("Pokemon no encontrado...");
    	container.style.display = "none";
    	mensajeError.innerHTML = `LO SIENTO NO HEMOS PODIDO ENCONTRAR ESTE POKEMON O NO EXISTE...<br> verifique que el nombre este escrito
    	correctamente`;
    	containerError.style.display = "flex";
	    statsContainer.style.display = "none";
	    imgErr.style.display = "block";
    }
}

btnSend.addEventListener("click", (e)=>{
	e.preventDefault();
	getPokemonInfo();
})