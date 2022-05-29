dayjs.extend(window.dayjs_plugin_duration);
dayjs.extend(window.dayjs_plugin_customParseFormat);

document.addEventListener("DOMContentLoaded", () => {
  var map = L.map('map').setView([51.3, 10.5], 7);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
  }).addTo(map);


  fetch("./data.json")
    .then(data => data.json())
    .then(data => {
      for (let i = 0; i < Object.keys(data.data).length; i++) {
        let embed = "<iframe style=\"border-radius:12px\" src=\"https://open.spotify.com/embed/episode/" + data.data[i].code + "?t=" + dayjs(data.data[i].startzeit, "hh:mm:ss").diff(dayjs("00:00:00", "hh:mm:ss")) + "\" width=\"330\" height=\"152 \" frameBorder=\"0\" allowfullscreen=\"\" allow=\"autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture\"></iframe>";
        if (typeof data.data[i].geschichten !== 'undefined') {
          for (let j = 0; j < Object.keys(data.data[i].geschichten).length; j++) {
            let geschichte = data.data[i].geschichten[j];
            if (typeof geschichte !== 'undefined') {
              let marker = L.marker(geschichte.geo).addTo(map);
              marker.bindPopup("<h1>" + geschichte.titel + "</h1><p>" + geschichte.geschichte + "</p><div>" + embed + "</div>");
            }
          }
        }
      }
    });
});




