function generateTicket () {
  let page = window.location.href
  if (page.includes('ticket.html')) {
      let storage = JSON.parse(localStorage['storage'])
      console.log(storage)
      let salesPlaces = JSON.parse(localStorage['places'])
      let date = localStorage['date']
      let day = localStorage['day']
let places = "";
let price = 0;

salesPlaces.forEach(salePlace => {
  if (places) {
    places += ", ";
  };
  places += `${salePlace.row}/${salePlace.place}`;
  price += salePlace.type === "standart" ? Number(storage.hall_price_standart) : Number(storage.hall_price_vip);
});

document.querySelector(".ticket__title").innerHTML = storage.film_name;
document.querySelector(".ticket__chairs").innerHTML = places;
document.querySelector(".ticket__hall").innerHTML = storage.hall_name;
document.querySelector(".ticket__start").innerHTML = storage.seance_time;


let dates = new Date(Number(localStorage['date'] * 1000));
let dateStr = dates.toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric" });
let textQR =`
Фильм: ${storage.film_name}
Зал: ${storage.hall_name}
Ряд/Место ${places}
Дата: ${dateStr}
Начало сеанса: ${storage.seance_time}
Билет действителен строго на свой сеанс`;

let qrcode = QRCreator(textQR, { image: "SVG"	});
qrcode.download();
document.querySelector(".ticket__info-qr").append(qrcode.result);
}    
   
}
  
document.addEventListener("DOMContentLoaded", generateTicket);