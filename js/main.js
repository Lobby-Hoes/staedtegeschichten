dayjs.extend(window.dayjs_plugin_duration);
dayjs.extend(window.dayjs_plugin_customParseFormat);

document.addEventListener("DOMContentLoaded", () => {
  let host = "http://data.hobbylos.online/";
  var map = L.map('map').setView([51.3, 10.5], 7);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
  }).addTo(map);

  fetch(host, {
    body: '{"query":"query GetAllStaedtegeschichten { staedtegeschichten { folge folgenname code startzeit endzeit titel ort typ geo geschichte}}"}',
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST"
  })
    .then(data => data.json())
    .then(data => {
      for (let i = 0; i < Object.keys(data.data.staedtegeschichten).length; i++) {
        let embed = "<iframe style=\"border-radius:12px\" src=\"https://open.spotify.com/embed/episode/" + data.data.staedtegeschichten[i].code + "?t=" + dayjs(data.data.staedtegeschichten[i].startzeit, "hh:mm:ss").diff(dayjs("00:00:00", "hh:mm:ss")) + "\" width=\"330\" height=\"152 \" frameBorder=\"0\" allowfullscreen=\"\" allow=\"autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture\"></iframe>";
        let marker = L.marker(data.data.staedtegeschichten[i].geo).addTo(map);
        marker.bindPopup("<h1>" + data.data.staedtegeschichten[i].titel + "</h1><p>" + data.data.staedtegeschichten[i].geschichte + "</p><div>" + embed + "</div>");
      }
    });

  let southWest = new L.LatLng(47.2, 6.1),
    northEast = new L.LatLng(54.7, 14.8),
    bounds = new L.LatLngBounds(southWest, northEast);
  map.fitBounds(bounds);
});
