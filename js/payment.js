const selectSeanse = JSON.parse(localStorage.selectSeanse);

let places = "";
let price = 0;

for (const {
		row, place, type
	}
	of selectSeanse.salesPlaces) {
	if (places !== "") {
		places += ", ";
	}
	places += `${row}/${place}`;
	price += type === "standart" ? Number(selectSeanse.priceStandart) : Number(selectSeanse.priceVip);
}

document.querySelector(".ticket__title").innerHTML = selectSeanse.filmName;  
document.querySelector(".ticket__chairs").innerHTML = places; 
document.querySelector(".ticket__hall").innerHTML = selectSeanse.hallName;  
document.querySelector(".ticket__start").innerHTML = selectSeanse.seanceTime;  
document.querySelector(".ticket__cost").innerHTML = price;  

const newHallConfig = selectSeanse.hallConfig.replace(/selected/g, "taken");

console.log(selectSeanse.seanceTimeStamp);
console.log(selectSeanse.hallId);
console.log(selectSeanse.seanceId);
console.log(newHallConfig);

document.querySelector(".acceptin-button").addEventListener("click", (event) => {
	event.preventDefault();
	fetch("https://jscp-diplom.netoserver.ru/", {
		method: "POST",
		headers: {
			'Content-Type' : 'application/x-www-form-urlencoded'
		},
		body: `event=sale_add&timestamp=${selectSeanse.seanceTimeStamp}&hallId=${selectSeanse.hallId}&seanceId=${selectSeanse.seanceId}&hallConfiguration=${newHallConfig}`,
	});
});