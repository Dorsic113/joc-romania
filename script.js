// ── Profil jucător ─────────────────────────────────────────────────────────

let currentPlayer = localStorage.getItem('_currentPlayer') || '';

function lsGet(cheie) {
    return localStorage.getItem(currentPlayer ? 'p_' + currentPlayer + '_' + cheie : cheie);
}
function lsSet(cheie, valoare) {
    localStorage.setItem(currentPlayer ? 'p_' + currentPlayer + '_' + cheie : cheie, valoare);
    if (typeof fbScorSalvat === 'function') fbScorSalvat(cheie, valoare);
}
function lsRemove(cheie) {
    localStorage.removeItem(currentPlayer ? 'p_' + currentPlayer + '_' + cheie : cheie);
}

function getJucatori() {
    try { return JSON.parse(localStorage.getItem('_jucatori') || '[]'); } catch(e) { return []; }
}
function salveazaJucatori(lista) {
    localStorage.setItem('_jucatori', JSON.stringify(lista));
}
function adaugaJucator(nume) {
    const lista = getJucatori();
    if (!lista.includes(nume)) { lista.push(nume); salveazaJucatori(lista); }
}
function selecteazaJucator(nume) {
    currentPlayer = nume;
    localStorage.setItem('_currentPlayer', nume);
    document.getElementById('screen-profil').classList.add('ascuns');
    document.getElementById('landing').classList.remove('ascuns');
    const el = document.getElementById('jucator-activ-label');
    if (el) el.textContent = '👤 ' + nume;
    actualizeazaLandingHS();
    actualizeazaAchBadge();
    actualizeazaStatisticiCards();
}
function schimbaJucator() {
    // Ascunde tot ce e vizibil
    ['landing','submeniu-trivia','submeniu-orase','submeniu-mm','submeniu-duel','ecran',
     'final-invatare','final-joc','final-mm-invatare','final-mm-joc','scoreboard'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('ascuns');
    });
    document.getElementById('screen-profil').classList.remove('ascuns');
    randeazaProfiluri();
}

function randeazaProfiluri() {
    const lista = getJucatori();
    const cont  = document.getElementById('profil-lista');
    const CULORI = ['#e74c3c','#3498db','#2ecc71','#f39c12','#9b59b6','#1abc9c','#e67e22','#e91e63'];
    cont.innerHTML = lista.map((n, i) => {
        const activ = n === currentPlayer ? ' profil-activ' : '';
        const litera = n.charAt(0).toUpperCase();
        const culoare = CULORI[i % CULORI.length];
        return `<div class="profil-card${activ}" onclick="selecteazaJucator('${n.replace(/'/g,"\\'")}')">
            <div class="profil-avatar" style="background:${culoare}">${litera}</div>
            <div class="profil-nume">${n}</div>
        </div>`;
    }).join('');
}

function adaugaJucatorNou() {
    const input = document.getElementById('input-jucator-nou');
    const nume  = input.value.trim();
    if (!nume) return;
    adaugaJucator(nume);
    input.value = '';
    randeazaProfiluri();
    selecteazaJucator(nume);
}

// ── Hartă ──────────────────────────────────────────────────────────────────

const map = L.map('map').setView([45.94, 24.96], 7);
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
    maxZoom: 19
}).addTo(map);

// ── Date România ───────────────────────────────────────────────────────────

const data = { "type": "FeatureCollection", "features": [
    { "type":"Feature","properties":{"name":"București"},             "geometry":{"type":"Point","coordinates":[26.10, 44.43]}},
    { "type":"Feature","properties":{"name":"Cluj-Napoca"},          "geometry":{"type":"Point","coordinates":[23.60, 46.77]}},
    { "type":"Feature","properties":{"name":"Iași"},                 "geometry":{"type":"Point","coordinates":[27.60, 47.16]}},
    { "type":"Feature","properties":{"name":"Timișoara"},            "geometry":{"type":"Point","coordinates":[21.23, 45.75]}},
    { "type":"Feature","properties":{"name":"Constanța"},            "geometry":{"type":"Point","coordinates":[28.65, 44.18]}},
    { "type":"Feature","properties":{"name":"Brașov"},               "geometry":{"type":"Point","coordinates":[25.60, 45.65]}},
    { "type":"Feature","properties":{"name":"Craiova"},              "geometry":{"type":"Point","coordinates":[23.80, 44.33]}},
    { "type":"Feature","properties":{"name":"Galați"},               "geometry":{"type":"Point","coordinates":[28.05, 45.43]}},
    { "type":"Feature","properties":{"name":"Ploiești"},             "geometry":{"type":"Point","coordinates":[26.05, 44.93]}},
    { "type":"Feature","properties":{"name":"Oradea"},               "geometry":{"type":"Point","coordinates":[21.95, 47.07]}},
    { "type":"Feature","properties":{"name":"Sibiu"},                "geometry":{"type":"Point","coordinates":[24.15, 45.80]}},
    { "type":"Feature","properties":{"name":"Arad"},                 "geometry":{"type":"Point","coordinates":[21.31, 46.18]}},
    { "type":"Feature","properties":{"name":"Bacău"},                "geometry":{"type":"Point","coordinates":[26.91, 46.57]}},
    { "type":"Feature","properties":{"name":"Baia Mare"},            "geometry":{"type":"Point","coordinates":[23.57, 47.66]}},
    { "type":"Feature","properties":{"name":"Suceava"},              "geometry":{"type":"Point","coordinates":[26.25, 47.65]}},
    { "type":"Feature","properties":{"name":"Deva"},                 "geometry":{"type":"Point","coordinates":[22.90, 45.88]}},
    { "type":"Feature","properties":{"name":"Alba Iulia"},           "geometry":{"type":"Point","coordinates":[23.57, 46.07]}},
    { "type":"Feature","properties":{"name":"Târgu Mureș"},          "geometry":{"type":"Point","coordinates":[24.55, 46.55]}},
    { "type":"Feature","properties":{"name":"Buzău"},                "geometry":{"type":"Point","coordinates":[26.82, 45.15]}},
    { "type":"Feature","properties":{"name":"Brăila"},               "geometry":{"type":"Point","coordinates":[27.97, 45.27]}},
    { "type":"Feature","properties":{"name":"Râmnicu Vâlcea"},       "geometry":{"type":"Point","coordinates":[24.37, 45.10]}},
    { "type":"Feature","properties":{"name":"Drobeta-Turnu Severin"},"geometry":{"type":"Point","coordinates":[22.66, 44.63]}},
    { "type":"Feature","properties":{"name":"Focșani"},              "geometry":{"type":"Point","coordinates":[27.18, 45.70]}},
    { "type":"Feature","properties":{"name":"Târgu Jiu"},            "geometry":{"type":"Point","coordinates":[23.27, 45.04]}},
    { "type":"Feature","properties":{"name":"Slatina"},              "geometry":{"type":"Point","coordinates":[24.37, 44.43]}},
    { "type":"Feature","properties":{"name":"Giurgiu"},              "geometry":{"type":"Point","coordinates":[25.97, 43.90]}},
    { "type":"Feature","properties":{"name":"Tulcea"},               "geometry":{"type":"Point","coordinates":[28.80, 45.18]}},
    { "type":"Feature","properties":{"name":"Alexandria"},           "geometry":{"type":"Point","coordinates":[25.33, 43.97]}},
    { "type":"Feature","properties":{"name":"Piatra Neamț"},         "geometry":{"type":"Point","coordinates":[26.37, 46.93]}},
    { "type":"Feature","properties":{"name":"Bistrița"},             "geometry":{"type":"Point","coordinates":[24.49, 47.13]}},
    { "type":"Feature","properties":{"name":"Zalău"},                "geometry":{"type":"Point","coordinates":[23.06, 47.19]}},
    { "type":"Feature","properties":{"name":"Slobozia"},             "geometry":{"type":"Point","coordinates":[27.37, 44.56]}},
    { "type":"Feature","properties":{"name":"Reșița"},               "geometry":{"type":"Point","coordinates":[21.89, 45.30]}},
    { "type":"Feature","properties":{"name":"Sfântu Gheorghe"},      "geometry":{"type":"Point","coordinates":[25.79, 45.87]}},
    { "type":"Feature","properties":{"name":"Miercurea Ciuc"},       "geometry":{"type":"Point","coordinates":[25.80, 46.36]}},
    { "type":"Feature","properties":{"name":"Vaslui"},               "geometry":{"type":"Point","coordinates":[27.73, 46.64]}},
    { "type":"Feature","properties":{"name":"Satu Mare"},            "geometry":{"type":"Point","coordinates":[22.88, 47.79]}},
    { "type":"Feature","properties":{"name":"Turda"},                "geometry":{"type":"Point","coordinates":[23.78, 46.57]}},
    { "type":"Feature","properties":{"name":"Dej"},                  "geometry":{"type":"Point","coordinates":[23.87, 47.13]}},
    { "type":"Feature","properties":{"name":"Gherla"},               "geometry":{"type":"Point","coordinates":[23.90, 47.03]}},
    { "type":"Feature","properties":{"name":"Câmpia Turzii"},        "geometry":{"type":"Point","coordinates":[23.88, 46.55]}},
    { "type":"Feature","properties":{"name":"Mediaș"},               "geometry":{"type":"Point","coordinates":[24.35, 46.16]}},
    { "type":"Feature","properties":{"name":"Sighișoara"},           "geometry":{"type":"Point","coordinates":[24.79, 46.22]}},
    { "type":"Feature","properties":{"name":"Reghin"},               "geometry":{"type":"Point","coordinates":[24.70, 46.78]}},
    { "type":"Feature","properties":{"name":"Odorheiu Secuiesc"},    "geometry":{"type":"Point","coordinates":[25.30, 46.31]}},
    { "type":"Feature","properties":{"name":"Gheorgheni"},           "geometry":{"type":"Point","coordinates":[25.59, 46.72]}},
    { "type":"Feature","properties":{"name":"Toplița"},              "geometry":{"type":"Point","coordinates":[25.35, 46.92]}},
    { "type":"Feature","properties":{"name":"Sovata"},               "geometry":{"type":"Point","coordinates":[25.07, 46.60]}},
    { "type":"Feature","properties":{"name":"Cristuru Secuiesc"},    "geometry":{"type":"Point","coordinates":[25.03, 46.29]}},
    { "type":"Feature","properties":{"name":"Aiud"},                 "geometry":{"type":"Point","coordinates":[23.72, 46.31]}},
    { "type":"Feature","properties":{"name":"Blaj"},                 "geometry":{"type":"Point","coordinates":[23.92, 46.17]}},
    { "type":"Feature","properties":{"name":"Sebeș"},                "geometry":{"type":"Point","coordinates":[23.57, 45.96]}},
    { "type":"Feature","properties":{"name":"Ocna Mureș"},           "geometry":{"type":"Point","coordinates":[23.86, 46.39]}},
    { "type":"Feature","properties":{"name":"Dumbrăveni"},           "geometry":{"type":"Point","coordinates":[24.57, 46.23]}},
    { "type":"Feature","properties":{"name":"Agnita"},               "geometry":{"type":"Point","coordinates":[24.63, 45.98]}},
    { "type":"Feature","properties":{"name":"Avrig"},                "geometry":{"type":"Point","coordinates":[24.38, 45.71]}},
    { "type":"Feature","properties":{"name":"Hunedoara"},            "geometry":{"type":"Point","coordinates":[22.91, 45.77]}},
    { "type":"Feature","properties":{"name":"Orăștie"},              "geometry":{"type":"Point","coordinates":[23.20, 45.83]}},
    { "type":"Feature","properties":{"name":"Petroșani"},            "geometry":{"type":"Point","coordinates":[23.37, 45.42]}},
    { "type":"Feature","properties":{"name":"Lupeni"},               "geometry":{"type":"Point","coordinates":[23.23, 45.35]}},
    { "type":"Feature","properties":{"name":"Hațeg"},                "geometry":{"type":"Point","coordinates":[22.95, 45.60]}},
    { "type":"Feature","properties":{"name":"Brad"},                 "geometry":{"type":"Point","coordinates":[22.44, 46.13]}},
    { "type":"Feature","properties":{"name":"Câmpeni"},              "geometry":{"type":"Point","coordinates":[22.93, 46.37]}},
    { "type":"Feature","properties":{"name":"Abrud"},                "geometry":{"type":"Point","coordinates":[23.07, 46.27]}},
    { "type":"Feature","properties":{"name":"Lugoj"},                "geometry":{"type":"Point","coordinates":[21.90, 45.69]}},
    { "type":"Feature","properties":{"name":"Caransebeș"},           "geometry":{"type":"Point","coordinates":[22.22, 45.42]}},
    { "type":"Feature","properties":{"name":"Năsăud"},               "geometry":{"type":"Point","coordinates":[24.40, 47.29]}}
]};

const TOTAL = data.features.length;

const ORASE_USOARE = new Set([
    'București','Cluj-Napoca','Iași','Timișoara','Constanța',
    'Brașov','Craiova','Galați','Ploiești','Oradea',
    'Sibiu','Arad','Bacău','Baia Mare','Suceava',
    'Târgu Mureș','Alba Iulia','Buzău','Brăila','Râmnicu Vâlcea',
]);

// ── Date județe (modul Orașe) ──────────────────────────────────────────────

const JUDETE = {

    // ── Nord-Vest ──────────────────────────────────────────────────────────
    'satu-mare': {
        titlu: 'Satu Mare', regiune: 'Nord-Vest',
        view: [47.70, 22.90], zoom: 10,
        features: [
            {type:'Feature',properties:{name:'Satu Mare'},    geometry:{type:'Point',coordinates:[22.885,47.792]}},
            {type:'Feature',properties:{name:'Carei'},         geometry:{type:'Point',coordinates:[22.469,47.682]}},
            {type:'Feature',properties:{name:'Negrești-Oaș'}, geometry:{type:'Point',coordinates:[23.427,47.868]}},
            {type:'Feature',properties:{name:'Tășnad'},        geometry:{type:'Point',coordinates:[22.576,47.463]}},
            {type:'Feature',properties:{name:'Ardud'},         geometry:{type:'Point',coordinates:[22.877,47.633]}},
            {type:'Feature',properties:{name:'Livada'},        geometry:{type:'Point',coordinates:[22.897,47.858]}},
        ]
    },
    'bihor': {
        titlu: 'Bihor', regiune: 'Nord-Vest',
        view: [47.00, 22.20], zoom: 9,
        features: [
            {type:'Feature',properties:{name:'Oradea'},         geometry:{type:'Point',coordinates:[21.946,47.065]}},
            {type:'Feature',properties:{name:'Salonta'},        geometry:{type:'Point',coordinates:[21.650,46.802]}},
            {type:'Feature',properties:{name:'Beiuș'},          geometry:{type:'Point',coordinates:[22.350,46.671]}},
            {type:'Feature',properties:{name:'Marghita'},       geometry:{type:'Point',coordinates:[22.329,47.353]}},
            {type:'Feature',properties:{name:'Aleșd'},          geometry:{type:'Point',coordinates:[22.403,47.047]}},
            {type:'Feature',properties:{name:'Nucet'},          geometry:{type:'Point',coordinates:[22.573,46.472]}},
            {type:'Feature',properties:{name:'Ștei'},           geometry:{type:'Point',coordinates:[22.467,46.532]}},
            {type:'Feature',properties:{name:'Valea lui Mihai'},geometry:{type:'Point',coordinates:[22.128,47.522]}},
            {type:'Feature',properties:{name:'Vașcău'},         geometry:{type:'Point',coordinates:[22.470,46.461]}},
            {type:'Feature',properties:{name:'Săcueni'},        geometry:{type:'Point',coordinates:[22.085,47.367]}},
        ]
    },
    'salaj': {
        titlu: 'Sălaj', regiune: 'Nord-Vest',
        view: [47.25, 23.00], zoom: 10,
        features: [
            {type:'Feature',properties:{name:'Zalău'},             geometry:{type:'Point',coordinates:[23.058,47.197]}},
            {type:'Feature',properties:{name:'Jibou'},             geometry:{type:'Point',coordinates:[23.254,47.259]}},
            {type:'Feature',properties:{name:'Șimleu Silvaniei'},  geometry:{type:'Point',coordinates:[22.804,47.229]}},
            {type:'Feature',properties:{name:'Cehu Silvaniei'},    geometry:{type:'Point',coordinates:[23.166,47.406]}},
        ]
    },
    'maramures': {
        titlu: 'Maramureș', regiune: 'Nord-Vest',
        view: [47.75, 23.85], zoom: 9,
        features: [
            {type:'Feature',properties:{name:'Baia Mare'},          geometry:{type:'Point',coordinates:[23.568,47.659]}},
            {type:'Feature',properties:{name:'Sighetu Marmației'},  geometry:{type:'Point',coordinates:[23.890,47.931]}},
            {type:'Feature',properties:{name:'Baia Sprie'},        geometry:{type:'Point',coordinates:[23.699,47.666]}},
            {type:'Feature',properties:{name:'Borșa'},             geometry:{type:'Point',coordinates:[24.663,47.656]}},
            {type:'Feature',properties:{name:'Cavnic'},            geometry:{type:'Point',coordinates:[23.864,47.666]}},
            {type:'Feature',properties:{name:'Dragomirești'},      geometry:{type:'Point',coordinates:[24.292,47.667]}},
            {type:'Feature',properties:{name:'Săliștea de Sus'},   geometry:{type:'Point',coordinates:[24.352,47.659]}},
            {type:'Feature',properties:{name:'Seini'},             geometry:{type:'Point',coordinates:[23.285,47.748]}},
            {type:'Feature',properties:{name:'Tăuții-Măgherăuș'}, geometry:{type:'Point',coordinates:[23.468,47.666]}},
            {type:'Feature',properties:{name:'Târgu Lăpuș'},      geometry:{type:'Point',coordinates:[23.868,47.452]}},
            {type:'Feature',properties:{name:'Ulmeni'},            geometry:{type:'Point',coordinates:[23.302,47.527]}},
            {type:'Feature',properties:{name:'Vișeu de Sus'},      geometry:{type:'Point',coordinates:[24.417,47.711]}},
            {type:'Feature',properties:{name:'Șomcuta Mare'},      geometry:{type:'Point',coordinates:[23.467,47.517]}},
        ]
    },
    'bistrita': {
        titlu: 'Bistrița-Năsăud', regiune: 'Nord-Vest',
        view: [47.20, 24.40], zoom: 9,
        features: [
            {type:'Feature',properties:{name:'Bistrița'},       geometry:{type:'Point',coordinates:[24.490,47.130]}},
            {type:'Feature',properties:{name:'Năsăud'},         geometry:{type:'Point',coordinates:[24.402,47.289]}},
            {type:'Feature',properties:{name:'Beclean'},        geometry:{type:'Point',coordinates:[24.180,47.186]}},
            {type:'Feature',properties:{name:'Sângeorz-Băi'},  geometry:{type:'Point',coordinates:[24.674,47.374]}},
        ]
    },
    'cluj': {
        titlu: 'Cluj', regiune: 'Nord-Vest',
        view: [46.80, 23.50], zoom: 9,
        features: [
            {type:'Feature',properties:{name:'Cluj-Napoca'},   geometry:{type:'Point',coordinates:[23.600,46.770]}},
            {type:'Feature',properties:{name:'Turda'},          geometry:{type:'Point',coordinates:[23.786,46.567]}},
            {type:'Feature',properties:{name:'Dej'},            geometry:{type:'Point',coordinates:[23.873,47.135]}},
            {type:'Feature',properties:{name:'Câmpia Turzii'}, geometry:{type:'Point',coordinates:[23.877,46.549]}},
            {type:'Feature',properties:{name:'Gherla'},         geometry:{type:'Point',coordinates:[23.902,47.028]}},
            {type:'Feature',properties:{name:'Huedin'},         geometry:{type:'Point',coordinates:[22.929,46.877]}},
        ]
    },

    // ── Centru ─────────────────────────────────────────────────────────────
    'mures': {
        titlu: 'Mureș', regiune: 'Centru',
        view: [46.55, 24.50], zoom: 9,
        features: [
            {type:'Feature',properties:{name:'Târgu Mureș'},   geometry:{type:'Point',coordinates:[24.553,46.545]}},
            {type:'Feature',properties:{name:'Reghin'},         geometry:{type:'Point',coordinates:[24.707,46.777]}},
            {type:'Feature',properties:{name:'Sighișoara'},     geometry:{type:'Point',coordinates:[24.793,46.219]}},
            {type:'Feature',properties:{name:'Târnăveni'},      geometry:{type:'Point',coordinates:[24.289,46.330]}},
            {type:'Feature',properties:{name:'Luduș'},               geometry:{type:'Point',coordinates:[24.096,46.472]}},
            {type:'Feature',properties:{name:'Iernut'},              geometry:{type:'Point',coordinates:[24.236,46.449]}},
            {type:'Feature',properties:{name:'Sovata'},              geometry:{type:'Point',coordinates:[25.071,46.598]}},
            {type:'Feature',properties:{name:'Ungheni'},             geometry:{type:'Point',coordinates:[24.457,46.483]}},
            {type:'Feature',properties:{name:'Sărmașu'},             geometry:{type:'Point',coordinates:[24.131,46.754]}},
            {type:'Feature',properties:{name:'Miercurea Nirajului'}, geometry:{type:'Point',coordinates:[24.800,46.534]}},
            {type:'Feature',properties:{name:'Sângeorgiu de Pădure'},geometry:{type:'Point',coordinates:[24.842,46.431]}},
        ]
    },
    'harghita': {
        titlu: 'Harghita', regiune: 'Centru',
        view: [46.55, 25.40], zoom: 9,
        features: [
            {type:'Feature',properties:{name:'Miercurea Ciuc'},      geometry:{type:'Point',coordinates:[25.803,46.358]}},
            {type:'Feature',properties:{name:'Odorheiu Secuiesc'},   geometry:{type:'Point',coordinates:[25.298,46.304]}},
            {type:'Feature',properties:{name:'Gheorgheni'},           geometry:{type:'Point',coordinates:[25.590,46.718]}},
            {type:'Feature',properties:{name:'Toplița'},              geometry:{type:'Point',coordinates:[25.350,46.920]}},
            {type:'Feature',properties:{name:'Cristuru Secuiesc'},   geometry:{type:'Point',coordinates:[25.030,46.290]}},
            {type:'Feature',properties:{name:'Bălan'},       geometry:{type:'Point',coordinates:[25.806,46.637]}},
            {type:'Feature',properties:{name:'Vlăhița'},    geometry:{type:'Point',coordinates:[25.528,46.353]}},
            {type:'Feature',properties:{name:'Borsec'},      geometry:{type:'Point',coordinates:[25.560,46.959]}},
            {type:'Feature',properties:{name:'Băile Tușnad'},geometry:{type:'Point',coordinates:[25.895,46.147]}},
        ]
    },
    'covasna': {
        titlu: 'Covasna', regiune: 'Centru',
        view: [45.90, 25.90], zoom: 9,
        features: [
            {type:'Feature',properties:{name:'Sfântu Gheorghe'},      geometry:{type:'Point',coordinates:[25.789,45.867]}},
            {type:'Feature',properties:{name:'Târgu Secuiesc'},       geometry:{type:'Point',coordinates:[26.141,45.988]}},
            {type:'Feature',properties:{name:'Covasna'},              geometry:{type:'Point',coordinates:[26.181,45.850]}},
            {type:'Feature',properties:{name:'Baraolt'},              geometry:{type:'Point',coordinates:[25.602,46.068]}},
            {type:'Feature',properties:{name:'Întorsura Buzăului'},   geometry:{type:'Point',coordinates:[26.028,45.678]}},
        ]
    },
    'sibiu': {
        titlu: 'Sibiu', regiune: 'Centru',
        view: [45.90, 24.20], zoom: 9,
        features: [
            {type:'Feature',properties:{name:'Sibiu'},            geometry:{type:'Point',coordinates:[24.150,45.797]}},
            {type:'Feature',properties:{name:'Mediaș'},           geometry:{type:'Point',coordinates:[24.352,46.162]}},
            {type:'Feature',properties:{name:'Cisnădie'},         geometry:{type:'Point',coordinates:[24.154,45.714]}},
            {type:'Feature',properties:{name:'Copșa Mică'},       geometry:{type:'Point',coordinates:[24.240,46.127]}},
            {type:'Feature',properties:{name:'Agnita'},           geometry:{type:'Point',coordinates:[24.630,45.980]}},
            {type:'Feature',properties:{name:'Avrig'},            geometry:{type:'Point',coordinates:[24.382,45.712]}},
            {type:'Feature',properties:{name:'Dumbrăveni'},       geometry:{type:'Point',coordinates:[24.574,46.232]}},
            {type:'Feature',properties:{name:'Ocna Sibiului'},    geometry:{type:'Point',coordinates:[24.047,45.862]}},
            {type:'Feature',properties:{name:'Tălmaciu'},         geometry:{type:'Point',coordinates:[24.269,45.630]}},
            {type:'Feature',properties:{name:'Miercurea Sibiului'},geometry:{type:'Point',coordinates:[23.888,45.888]}},
            {type:'Feature',properties:{name:'Săliște'},          geometry:{type:'Point',coordinates:[23.893,45.791]}},
        ]
    },
    'brasov': {
        titlu: 'Brașov', regiune: 'Centru',
        view: [45.70, 25.30], zoom: 9,
        features: [
            {type:'Feature',properties:{name:'Brașov'},    geometry:{type:'Point',coordinates:[25.600,45.650]}},
            {type:'Feature',properties:{name:'Făgăraș'},   geometry:{type:'Point',coordinates:[24.974,45.843]}},
            {type:'Feature',properties:{name:'Săcele'},    geometry:{type:'Point',coordinates:[25.696,45.617]}},
            {type:'Feature',properties:{name:'Codlea'},    geometry:{type:'Point',coordinates:[25.448,45.700]}},
            {type:'Feature',properties:{name:'Zărnești'}, geometry:{type:'Point',coordinates:[25.343,45.564]}},
            {type:'Feature',properties:{name:'Râșnov'},   geometry:{type:'Point',coordinates:[25.462,45.587]}},
            {type:'Feature',properties:{name:'Ghimbav'},   geometry:{type:'Point',coordinates:[25.486,45.665]}},
            {type:'Feature',properties:{name:'Predeal'},   geometry:{type:'Point',coordinates:[25.576,45.508]}},
            {type:'Feature',properties:{name:'Rupea'},     geometry:{type:'Point',coordinates:[25.216,46.028]}},
            {type:'Feature',properties:{name:'Victoria'},  geometry:{type:'Point',coordinates:[24.688,45.732]}},
        ]
    },
    'alba': {
        titlu: 'Alba', regiune: 'Centru',
        view: [46.10, 23.40], zoom: 9,
        features: [
            {type:'Feature',properties:{name:'Alba Iulia'}, geometry:{type:'Point',coordinates:[23.572,46.069]}},
            {type:'Feature',properties:{name:'Aiud'},        geometry:{type:'Point',coordinates:[23.721,46.314]}},
            {type:'Feature',properties:{name:'Blaj'},        geometry:{type:'Point',coordinates:[23.915,46.175]}},
            {type:'Feature',properties:{name:'Sebeș'},       geometry:{type:'Point',coordinates:[23.568,45.958]}},
            {type:'Feature',properties:{name:'Cugir'},       geometry:{type:'Point',coordinates:[23.369,45.838]}},
            {type:'Feature',properties:{name:'Abrud'},       geometry:{type:'Point',coordinates:[23.069,46.273]}},
            {type:'Feature',properties:{name:'Câmpeni'},     geometry:{type:'Point',coordinates:[22.927,46.373]}},
            {type:'Feature',properties:{name:'Ocna Mureș'},    geometry:{type:'Point',coordinates:[23.860,46.386]}},
            {type:'Feature',properties:{name:'Zlatna'},        geometry:{type:'Point',coordinates:[23.230,46.118]}},
            {type:'Feature',properties:{name:'Teiuș'},         geometry:{type:'Point',coordinates:[23.682,46.201]}},
            {type:'Feature',properties:{name:'Baia de Arieș'}, geometry:{type:'Point',coordinates:[23.281,46.380]}},
        ]
    },
    'hunedoara': {
        titlu: 'Hunedoara', regiune: 'Vest',
        view: [45.75, 23.00], zoom: 9,
        features: [
            {type:'Feature',properties:{name:'Deva'},       geometry:{type:'Point',coordinates:[22.900,45.883]}},
            {type:'Feature',properties:{name:'Hunedoara'},  geometry:{type:'Point',coordinates:[22.915,45.771]}},
            {type:'Feature',properties:{name:'Petroșani'},  geometry:{type:'Point',coordinates:[23.368,45.419]}},
            {type:'Feature',properties:{name:'Orăștie'},    geometry:{type:'Point',coordinates:[23.200,45.830]}},
            {type:'Feature',properties:{name:'Brad'},       geometry:{type:'Point',coordinates:[22.440,46.131]}},
            {type:'Feature',properties:{name:'Lupeni'},     geometry:{type:'Point',coordinates:[23.228,45.351]}},
            {type:'Feature',properties:{name:'Petrila'},    geometry:{type:'Point',coordinates:[23.414,45.449]}},
            {type:'Feature',properties:{name:'Uricani'},    geometry:{type:'Point',coordinates:[23.142,45.330]}},
            {type:'Feature',properties:{name:'Vulcan'},     geometry:{type:'Point',coordinates:[23.278,45.382]}},
            {type:'Feature',properties:{name:'Aninoasa'},   geometry:{type:'Point',coordinates:[23.353,45.424]}},
            {type:'Feature',properties:{name:'Simeria'},    geometry:{type:'Point',coordinates:[23.012,45.854]}},
            {type:'Feature',properties:{name:'Hațeg'},      geometry:{type:'Point',coordinates:[22.947,45.600]}},
            {type:'Feature',properties:{name:'Călan'},      geometry:{type:'Point',coordinates:[22.993,45.737]}},
            {type:'Feature',properties:{name:'Geoagiu'},    geometry:{type:'Point',coordinates:[23.201,45.928]}},
        ]
    },
    'timis': {
        titlu: 'Timiș', regiune: 'Vest',
        view: [45.65, 21.50], zoom: 9,
        features: [
            {type:'Feature',properties:{name:'Timișoara'},       geometry:{type:'Point',coordinates:[21.226,45.749]}},
            {type:'Feature',properties:{name:'Lugoj'},           geometry:{type:'Point',coordinates:[21.900,45.690]}},
            {type:'Feature',properties:{name:'Sânnicolau Mare'}, geometry:{type:'Point',coordinates:[20.629,46.082]}},
            {type:'Feature',properties:{name:'Jimbolia'},        geometry:{type:'Point',coordinates:[20.718,45.789]}},
            {type:'Feature',properties:{name:'Buziaș'},          geometry:{type:'Point',coordinates:[21.605,45.656]}},
            {type:'Feature',properties:{name:'Deta'},            geometry:{type:'Point',coordinates:[21.230,45.393]}},
            {type:'Feature',properties:{name:'Făget'},           geometry:{type:'Point',coordinates:[22.184,45.852]}},
            {type:'Feature',properties:{name:'Gătaia'},          geometry:{type:'Point',coordinates:[21.425,45.430]}},
            {type:'Feature',properties:{name:'Ciacova'},         geometry:{type:'Point',coordinates:[21.130,45.512]}},
            {type:'Feature',properties:{name:'Recaș'},           geometry:{type:'Point',coordinates:[21.519,45.770]}},
        ]
    },
    'arad': {
        titlu: 'Arad', regiune: 'Vest',
        view: [46.20, 21.60], zoom: 9,
        features: [
            {type:'Feature',properties:{name:'Arad'},           geometry:{type:'Point',coordinates:[21.312,46.186]}},
            {type:'Feature',properties:{name:'Ineu'},           geometry:{type:'Point',coordinates:[21.848,46.424]}},
            {type:'Feature',properties:{name:'Lipova'},         geometry:{type:'Point',coordinates:[21.697,46.089]}},
            {type:'Feature',properties:{name:'Nădlac'},         geometry:{type:'Point',coordinates:[20.748,46.165]}},
            {type:'Feature',properties:{name:'Pâncota'},        geometry:{type:'Point',coordinates:[21.696,46.341]}},
            {type:'Feature',properties:{name:'Pecica'},         geometry:{type:'Point',coordinates:[21.070,46.168]}},
            {type:'Feature',properties:{name:'Sebiș'},          geometry:{type:'Point',coordinates:[22.112,46.378]}},
            {type:'Feature',properties:{name:'Chișineu-Criș'}, geometry:{type:'Point',coordinates:[21.520,46.519]}},
            {type:'Feature',properties:{name:'Curtici'},        geometry:{type:'Point',coordinates:[21.332,46.345]}},
            {type:'Feature',properties:{name:'Sântana'},        geometry:{type:'Point',coordinates:[21.485,46.362]}},
        ]
    },
    'caras': {
        titlu: 'Caraș-Severin', regiune: 'Vest',
        view: [45.10, 22.00], zoom: 9,
        features: [
            {type:'Feature',properties:{name:'Reșița'},          geometry:{type:'Point',coordinates:[21.889,45.301]}},
            {type:'Feature',properties:{name:'Caransebeș'},      geometry:{type:'Point',coordinates:[22.218,45.418]}},
            {type:'Feature',properties:{name:'Moldova Nouă'},    geometry:{type:'Point',coordinates:[21.666,44.735]}},
            {type:'Feature',properties:{name:'Oravița'},         geometry:{type:'Point',coordinates:[21.697,45.034]}},
            {type:'Feature',properties:{name:'Băile Herculane'}, geometry:{type:'Point',coordinates:[22.410,44.882]}},
            {type:'Feature',properties:{name:'Anina'},       geometry:{type:'Point',coordinates:[21.852,45.091]}},
            {type:'Feature',properties:{name:'Bocșa'},       geometry:{type:'Point',coordinates:[21.714,45.376]}},
            {type:'Feature',properties:{name:'Oțelu Roșu'}, geometry:{type:'Point',coordinates:[22.370,45.532]}},
        ]
    },

    // ── Nord-Est ───────────────────────────────────────────────────────────
    'suceava': {
        titlu: 'Suceava', regiune: 'Nord-Est',
        view: [47.55, 25.80], zoom: 9,
        features: [
            {type:'Feature',properties:{name:'Suceava'},               geometry:{type:'Point',coordinates:[26.251,47.651]}},
            {type:'Feature',properties:{name:'Fălticeni'},             geometry:{type:'Point',coordinates:[26.301,47.461]}},
            {type:'Feature',properties:{name:'Rădăuți'},               geometry:{type:'Point',coordinates:[25.919,47.849]}},
            {type:'Feature',properties:{name:'Câmpulung Moldovenesc'}, geometry:{type:'Point',coordinates:[25.549,47.528]}},
            {type:'Feature',properties:{name:'Vatra Dornei'},          geometry:{type:'Point',coordinates:[25.363,47.352]}},
            {type:'Feature',properties:{name:'Gura Humorului'},        geometry:{type:'Point',coordinates:[25.886,47.556]}},
            {type:'Feature',properties:{name:'Siret'},                 geometry:{type:'Point',coordinates:[26.073,47.956]}},
            {type:'Feature',properties:{name:'Broșteni'},              geometry:{type:'Point',coordinates:[25.702,47.195]}},
            {type:'Feature',properties:{name:'Liteni'},                geometry:{type:'Point',coordinates:[26.424,47.508]}},
            {type:'Feature',properties:{name:'Dolhasca'},              geometry:{type:'Point',coordinates:[26.605,47.427]}},
            {type:'Feature',properties:{name:'Cajvana'},      geometry:{type:'Point',coordinates:[25.974,47.698]}},
            {type:'Feature',properties:{name:'Salcea'},       geometry:{type:'Point',coordinates:[26.348,47.697]}},
            {type:'Feature',properties:{name:'Milișăuți'},    geometry:{type:'Point',coordinates:[25.980,47.895]}},
            {type:'Feature',properties:{name:'Frasin'},       geometry:{type:'Point',coordinates:[25.842,47.537]}},
            {type:'Feature',properties:{name:'Solca'},        geometry:{type:'Point',coordinates:[25.844,47.703]}},
            {type:'Feature',properties:{name:'Vicovu de Sus'},geometry:{type:'Point',coordinates:[25.671,47.924]}},
        ]
    },
    'botosani': {
        titlu: 'Botoșani', regiune: 'Nord-Est',
        view: [47.85, 26.70], zoom: 9,
        features: [
            {type:'Feature',properties:{name:'Botoșani'},   geometry:{type:'Point',coordinates:[26.667,47.748]}},
            {type:'Feature',properties:{name:'Dorohoi'},    geometry:{type:'Point',coordinates:[26.397,47.956]}},
            {type:'Feature',properties:{name:'Darabani'},   geometry:{type:'Point',coordinates:[26.587,48.182]}},
            {type:'Feature',properties:{name:'Săveni'},     geometry:{type:'Point',coordinates:[26.862,47.957]}},
            {type:'Feature',properties:{name:'Ștefănești'}, geometry:{type:'Point',coordinates:[27.202,47.798]}},
            {type:'Feature',properties:{name:'Flămânzi'},   geometry:{type:'Point',coordinates:[26.952,47.555]}},
            {type:'Feature',properties:{name:'Bucecea'},    geometry:{type:'Point',coordinates:[26.520,47.773]}},
        ]
    },
    'iasi': {
        titlu: 'Iași', regiune: 'Nord-Est',
        view: [47.10, 27.20], zoom: 9,
        features: [
            {type:'Feature',properties:{name:'Iași'},          geometry:{type:'Point',coordinates:[27.601,47.160]}},
            {type:'Feature',properties:{name:'Pașcani'},       geometry:{type:'Point',coordinates:[26.727,47.252]}},
            {type:'Feature',properties:{name:'Târgu Frumos'}, geometry:{type:'Point',coordinates:[27.003,47.208]}},
            {type:'Feature',properties:{name:'Hârlău'},        geometry:{type:'Point',coordinates:[26.892,47.427]}},
            {type:'Feature',properties:{name:'Podu Iloaiei'}, geometry:{type:'Point',coordinates:[27.265,47.213]}},
        ]
    },
    'neamt': {
        titlu: 'Neamț', regiune: 'Nord-Est',
        view: [46.90, 26.40], zoom: 9,
        features: [
            {type:'Feature',properties:{name:'Piatra Neamț'}, geometry:{type:'Point',coordinates:[26.371,46.930]}},
            {type:'Feature',properties:{name:'Roman'},         geometry:{type:'Point',coordinates:[26.920,46.922]}},
            {type:'Feature',properties:{name:'Târgu Neamț'},  geometry:{type:'Point',coordinates:[26.366,47.199]}},
            {type:'Feature',properties:{name:'Bicaz'},         geometry:{type:'Point',coordinates:[26.080,46.800]}},
            {type:'Feature',properties:{name:'Roznov'},        geometry:{type:'Point',coordinates:[26.544,46.837]}},
        ]
    },
    'bacau': {
        titlu: 'Bacău', regiune: 'Nord-Est',
        view: [46.50, 26.60], zoom: 9,
        features: [
            {type:'Feature',properties:{name:'Bacău'},          geometry:{type:'Point',coordinates:[26.914,46.567]}},
            {type:'Feature',properties:{name:'Onești'},         geometry:{type:'Point',coordinates:[26.779,46.246]}},
            {type:'Feature',properties:{name:'Comănești'},      geometry:{type:'Point',coordinates:[26.440,46.427]}},
            {type:'Feature',properties:{name:'Moinești'},       geometry:{type:'Point',coordinates:[26.469,46.466]}},
            {type:'Feature',properties:{name:'Buhuși'},         geometry:{type:'Point',coordinates:[26.701,46.717]}},
            {type:'Feature',properties:{name:'Dărmănești'},     geometry:{type:'Point',coordinates:[26.380,46.372]}},
            {type:'Feature',properties:{name:'Slănic Moldova'}, geometry:{type:'Point',coordinates:[26.408,46.213]}},
            {type:'Feature',properties:{name:'Târgu Ocna'},     geometry:{type:'Point',coordinates:[26.607,46.277]}},
        ]
    },
    'vaslui': {
        titlu: 'Vaslui', regiune: 'Nord-Est',
        view: [46.50, 27.70], zoom: 9,
        features: [
            {type:'Feature',properties:{name:'Vaslui'},   geometry:{type:'Point',coordinates:[27.731,46.641]}},
            {type:'Feature',properties:{name:'Bârlad'},   geometry:{type:'Point',coordinates:[27.671,46.232]}},
            {type:'Feature',properties:{name:'Huși'},     geometry:{type:'Point',coordinates:[28.059,46.678]}},
            {type:'Feature',properties:{name:'Negrești'}, geometry:{type:'Point',coordinates:[27.448,46.837]}},
            {type:'Feature',properties:{name:'Murgeni'},  geometry:{type:'Point',coordinates:[28.014,46.198]}},
        ]
    },

    // ── Sud-Est ────────────────────────────────────────────────────────────
    'vrancea': {
        titlu: 'Vrancea', regiune: 'Sud-Est',
        view: [45.80, 27.00], zoom: 9,
        features: [
            {type:'Feature',properties:{name:'Focșani'},   geometry:{type:'Point',coordinates:[27.185,45.699]}},
            {type:'Feature',properties:{name:'Adjud'},     geometry:{type:'Point',coordinates:[27.182,46.100]}},
            {type:'Feature',properties:{name:'Mărășești'}, geometry:{type:'Point',coordinates:[27.228,45.884]}},
            {type:'Feature',properties:{name:'Panciu'},    geometry:{type:'Point',coordinates:[27.099,45.909]}},
            {type:'Feature',properties:{name:'Odobești'},  geometry:{type:'Point',coordinates:[27.063,45.747]}},
        ]
    },
    'galati': {
        titlu: 'Galați', regiune: 'Sud-Est',
        view: [45.60, 27.80], zoom: 9,
        features: [
            {type:'Feature',properties:{name:'Galați'},     geometry:{type:'Point',coordinates:[28.047,45.436]}},
            {type:'Feature',properties:{name:'Tecuci'},     geometry:{type:'Point',coordinates:[27.419,45.857]}},
            {type:'Feature',properties:{name:'Târgu Bujor'},geometry:{type:'Point',coordinates:[27.898,45.878]}},
            {type:'Feature',properties:{name:'Berești'},    geometry:{type:'Point',coordinates:[27.916,46.095]}},
        ]
    },
    'braila': {
        titlu: 'Brăila', regiune: 'Sud-Est',
        view: [45.20, 27.70], zoom: 9,
        features: [
            {type:'Feature',properties:{name:'Brăila'},   geometry:{type:'Point',coordinates:[27.969,45.274]}},
            {type:'Feature',properties:{name:'Ianca'},    geometry:{type:'Point',coordinates:[27.485,45.097]}},
            {type:'Feature',properties:{name:'Făurei'},   geometry:{type:'Point',coordinates:[27.251,45.064]}},
            {type:'Feature',properties:{name:'Însurăței'},geometry:{type:'Point',coordinates:[27.605,44.913]}},
        ]
    },
    'buzau': {
        titlu: 'Buzău', regiune: 'Sud-Est',
        view: [45.20, 26.70], zoom: 9,
        features: [
            {type:'Feature',properties:{name:'Buzău'},         geometry:{type:'Point',coordinates:[26.820,45.150]}},
            {type:'Feature',properties:{name:'Râmnicu Sărat'}, geometry:{type:'Point',coordinates:[26.979,45.384]}},
            {type:'Feature',properties:{name:'Pogoanele'},     geometry:{type:'Point',coordinates:[26.995,45.043]}},
            {type:'Feature',properties:{name:'Nehoiu'},        geometry:{type:'Point',coordinates:[26.295,45.421]}},
            {type:'Feature',properties:{name:'Pătârlagele'},   geometry:{type:'Point',coordinates:[26.356,45.325]}},
        ]
    },
    'constanta': {
        titlu: 'Constanța', regiune: 'Sud-Est',
        view: [44.10, 28.40], zoom: 9,
        features: [
            {type:'Feature',properties:{name:'Constanța'},   geometry:{type:'Point',coordinates:[28.650,44.180]}},
            {type:'Feature',properties:{name:'Mangalia'},    geometry:{type:'Point',coordinates:[28.582,43.814]}},
            {type:'Feature',properties:{name:'Medgidia'},    geometry:{type:'Point',coordinates:[28.263,44.254]}},
            {type:'Feature',properties:{name:'Cernavodă'},   geometry:{type:'Point',coordinates:[28.034,44.332]}},
            {type:'Feature',properties:{name:'Năvodari'},    geometry:{type:'Point',coordinates:[28.601,44.322]}},
            {type:'Feature',properties:{name:'Eforie'},      geometry:{type:'Point',coordinates:[28.635,43.988]}},
            {type:'Feature',properties:{name:'Ovidiu'},      geometry:{type:'Point',coordinates:[28.568,44.274]}},
            {type:'Feature',properties:{name:'Hârșova'},     geometry:{type:'Point',coordinates:[27.942,44.688]}},
            {type:'Feature',properties:{name:'Murfatlar'},   geometry:{type:'Point',coordinates:[28.410,44.174]}},
            {type:'Feature',properties:{name:'Negru Vodă'},  geometry:{type:'Point',coordinates:[28.206,43.817]}},
            {type:'Feature',properties:{name:'Techirghiol'}, geometry:{type:'Point',coordinates:[28.600,43.975]}},
        ]
    },
    'tulcea': {
        titlu: 'Tulcea', regiune: 'Sud-Est',
        view: [45.00, 28.70], zoom: 9,
        features: [
            {type:'Feature',properties:{name:'Tulcea'},  geometry:{type:'Point',coordinates:[28.800,45.180]}},
            {type:'Feature',properties:{name:'Babadag'}, geometry:{type:'Point',coordinates:[28.724,44.893]}},
            {type:'Feature',properties:{name:'Isaccea'}, geometry:{type:'Point',coordinates:[28.459,45.270]}},
            {type:'Feature',properties:{name:'Măcin'},   geometry:{type:'Point',coordinates:[28.140,45.252]}},
            {type:'Feature',properties:{name:'Sulina'},  geometry:{type:'Point',coordinates:[29.664,45.154]}},
        ]
    },

    // ── Sud-Muntenia ───────────────────────────────────────────────────────
    'arges': {
        titlu: 'Argeș', regiune: 'Sud-Muntenia',
        view: [45.00, 24.80], zoom: 9,
        features: [
            {type:'Feature',properties:{name:'Pitești'},          geometry:{type:'Point',coordinates:[24.870,44.856]}},
            {type:'Feature',properties:{name:'Câmpulung'},        geometry:{type:'Point',coordinates:[25.042,45.264]}},
            {type:'Feature',properties:{name:'Curtea de Argeș'}, geometry:{type:'Point',coordinates:[24.675,45.144]}},
            {type:'Feature',properties:{name:'Mioveni'},          geometry:{type:'Point',coordinates:[24.951,44.952]}},
            {type:'Feature',properties:{name:'Costești'},         geometry:{type:'Point',coordinates:[24.882,44.671]}},
            {type:'Feature',properties:{name:'Topoloveni'},       geometry:{type:'Point',coordinates:[25.081,44.822]}},
            {type:'Feature',properties:{name:'Ștefănești'},       geometry:{type:'Point',coordinates:[24.961,44.875]}},
        ]
    },
    'dambovita': {
        titlu: 'Dâmbovița', regiune: 'Sud-Muntenia',
        view: [44.90, 25.40], zoom: 9,
        features: [
            {type:'Feature',properties:{name:'Târgoviște'}, geometry:{type:'Point',coordinates:[25.458,44.929]}},
            {type:'Feature',properties:{name:'Moreni'},     geometry:{type:'Point',coordinates:[25.650,44.984]}},
            {type:'Feature',properties:{name:'Pucioasa'},   geometry:{type:'Point',coordinates:[25.423,45.067]}},
            {type:'Feature',properties:{name:'Fieni'},      geometry:{type:'Point',coordinates:[25.432,45.128]}},
            {type:'Feature',properties:{name:'Titu'},       geometry:{type:'Point',coordinates:[25.575,44.650]}},
            {type:'Feature',properties:{name:'Răcari'},     geometry:{type:'Point',coordinates:[25.727,44.627]}},
            {type:'Feature',properties:{name:'Găești'},     geometry:{type:'Point',coordinates:[25.319,44.722]}},
        ]
    },
    'prahova': {
        titlu: 'Prahova', regiune: 'Sud-Muntenia',
        view: [45.10, 25.90], zoom: 9,
        features: [
            {type:'Feature',properties:{name:'Ploiești'},         geometry:{type:'Point',coordinates:[26.045,44.936]}},
            {type:'Feature',properties:{name:'Câmpina'},          geometry:{type:'Point',coordinates:[25.739,45.127]}},
            {type:'Feature',properties:{name:'Sinaia'},           geometry:{type:'Point',coordinates:[25.553,45.350]}},
            {type:'Feature',properties:{name:'Bușteni'},          geometry:{type:'Point',coordinates:[25.536,45.410]}},
            {type:'Feature',properties:{name:'Azuga'},            geometry:{type:'Point',coordinates:[25.560,45.443]}},
            {type:'Feature',properties:{name:'Comarnic'},         geometry:{type:'Point',coordinates:[25.642,45.252]}},
            {type:'Feature',properties:{name:'Urlați'},           geometry:{type:'Point',coordinates:[26.244,44.986]}},
            {type:'Feature',properties:{name:'Mizil'},            geometry:{type:'Point',coordinates:[26.447,45.012]}},
            {type:'Feature',properties:{name:'Băicoi'},           geometry:{type:'Point',coordinates:[25.875,45.028]}},
            {type:'Feature',properties:{name:'Boldești-Scăeni'}, geometry:{type:'Point',coordinates:[26.044,45.058]}},
            {type:'Feature',properties:{name:'Vălenii de Munte'},geometry:{type:'Point',coordinates:[26.042,45.183]}},
            {type:'Feature',properties:{name:'Breaza'},           geometry:{type:'Point',coordinates:[25.664,45.180]}},
            {type:'Feature',properties:{name:'Slănic'},           geometry:{type:'Point',coordinates:[25.929,45.239]}},
            {type:'Feature',properties:{name:'Plopeni'},          geometry:{type:'Point',coordinates:[26.009,44.988]}},
        ]
    },
    'ialomita': {
        titlu: 'Ialomița', regiune: 'Sud-Muntenia',
        view: [44.55, 27.00], zoom: 9,
        features: [
            {type:'Feature',properties:{name:'Slobozia'},       geometry:{type:'Point',coordinates:[27.368,44.561]}},
            {type:'Feature',properties:{name:'Fetești'},        geometry:{type:'Point',coordinates:[27.840,44.368]}},
            {type:'Feature',properties:{name:'Urziceni'},       geometry:{type:'Point',coordinates:[26.642,44.722]}},
            {type:'Feature',properties:{name:'Amara'},          geometry:{type:'Point',coordinates:[27.341,44.603]}},
            {type:'Feature',properties:{name:'Fierbinți-Târg'},geometry:{type:'Point',coordinates:[26.809,44.734]}},
            {type:'Feature',properties:{name:'Țăndărei'},      geometry:{type:'Point',coordinates:[27.659,44.633]}},
            {type:'Feature',properties:{name:'Căzănești'},     geometry:{type:'Point',coordinates:[27.011,44.622]}},
        ]
    },
    'calarasi': {
        titlu: 'Călărași', regiune: 'Sud-Muntenia',
        view: [44.20, 26.90], zoom: 9,
        features: [
            {type:'Feature',properties:{name:'Călărași'},    geometry:{type:'Point',coordinates:[27.335,44.205]}},
            {type:'Feature',properties:{name:'Oltenița'},    geometry:{type:'Point',coordinates:[26.630,44.083]}},
            {type:'Feature',properties:{name:'Budești'},     geometry:{type:'Point',coordinates:[26.523,44.251]}},
            {type:'Feature',properties:{name:'Fundulea'},    geometry:{type:'Point',coordinates:[26.517,44.455]}},
            {type:'Feature',properties:{name:'Lehliu Gară'},geometry:{type:'Point',coordinates:[27.049,44.444]}},
        ]
    },
    'giurgiu': {
        titlu: 'Giurgiu', regiune: 'Sud-Muntenia',
        view: [44.20, 25.90], zoom: 9,
        features: [
            {type:'Feature',properties:{name:'Giurgiu'},        geometry:{type:'Point',coordinates:[25.970,43.903]}},
            {type:'Feature',properties:{name:'Bolintin-Vale'},  geometry:{type:'Point',coordinates:[25.751,44.453]}},
            {type:'Feature',properties:{name:'Mihăilești'},     geometry:{type:'Point',coordinates:[25.814,44.340]}},
        ]
    },
    'teleorman': {
        titlu: 'Teleorman', regiune: 'Sud-Muntenia',
        view: [44.00, 25.00], zoom: 9,
        features: [
            {type:'Feature',properties:{name:'Alexandria'},        geometry:{type:'Point',coordinates:[25.330,43.972]}},
            {type:'Feature',properties:{name:'Roșiori de Vede'},  geometry:{type:'Point',coordinates:[24.992,44.107]}},
            {type:'Feature',properties:{name:'Turnu Măgurele'},   geometry:{type:'Point',coordinates:[24.870,43.745]}},
            {type:'Feature',properties:{name:'Zimnicea'},         geometry:{type:'Point',coordinates:[25.366,43.651]}},
            {type:'Feature',properties:{name:'Videle'},           geometry:{type:'Point',coordinates:[25.524,44.285]}},
        ]
    },

    // ── Sud-Vest Oltenia ───────────────────────────────────────────────────
    'gorj': {
        titlu: 'Gorj', regiune: 'Oltenia',
        view: [45.00, 23.30], zoom: 9,
        features: [
            {type:'Feature',properties:{name:'Târgu Jiu'},        geometry:{type:'Point',coordinates:[23.271,45.042]}},
            {type:'Feature',properties:{name:'Motru'},            geometry:{type:'Point',coordinates:[22.960,44.808]}},
            {type:'Feature',properties:{name:'Rovinari'},         geometry:{type:'Point',coordinates:[23.167,44.912]}},
            {type:'Feature',properties:{name:'Târgu Cărbunești'},geometry:{type:'Point',coordinates:[23.514,44.954]}},
            {type:'Feature',properties:{name:'Novaci'},           geometry:{type:'Point',coordinates:[23.682,45.165]}},
            {type:'Feature',properties:{name:'Bumbești-Jiu'}, geometry:{type:'Point',coordinates:[23.372,45.199]}},
            {type:'Feature',properties:{name:'Turceni'},      geometry:{type:'Point',coordinates:[23.413,44.679]}},
            {type:'Feature',properties:{name:'Tismana'},      geometry:{type:'Point',coordinates:[22.947,45.049]}},
            {type:'Feature',properties:{name:'Țicleni'},      geometry:{type:'Point',coordinates:[23.394,44.884]}},
        ]
    },
    'valcea': {
        titlu: 'Vâlcea', regiune: 'Oltenia',
        view: [45.10, 24.10], zoom: 9,
        features: [
            {type:'Feature',properties:{name:'Râmnicu Vâlcea'}, geometry:{type:'Point',coordinates:[24.370,45.102]}},
            {type:'Feature',properties:{name:'Drăgășani'},      geometry:{type:'Point',coordinates:[24.262,44.661]}},
            {type:'Feature',properties:{name:'Bălcești'},       geometry:{type:'Point',coordinates:[24.008,44.619]}},
            {type:'Feature',properties:{name:'Băbeni'},         geometry:{type:'Point',coordinates:[24.116,45.066]}},
            {type:'Feature',properties:{name:'Berbești'},       geometry:{type:'Point',coordinates:[23.940,45.147]}},
            {type:'Feature',properties:{name:'Călimănești'},   geometry:{type:'Point',coordinates:[24.337,45.242]}},
            {type:'Feature',properties:{name:'Horezu'},        geometry:{type:'Point',coordinates:[23.859,45.158]}},
            {type:'Feature',properties:{name:'Ocnele Mari'},   geometry:{type:'Point',coordinates:[24.282,45.067]}},
            {type:'Feature',properties:{name:'Brezoi'},        geometry:{type:'Point',coordinates:[24.253,45.350]}},
            {type:'Feature',properties:{name:'Băile Olănești'},geometry:{type:'Point',coordinates:[24.242,45.195]}},
            {type:'Feature',properties:{name:'Băile Govora'},  geometry:{type:'Point',coordinates:[24.175,45.066]}},
        ]
    },
    'dolj': {
        titlu: 'Dolj', regiune: 'Oltenia',
        view: [44.20, 23.50], zoom: 9,
        features: [
            {type:'Feature',properties:{name:'Craiova'},  geometry:{type:'Point',coordinates:[23.799,44.332]}},
            {type:'Feature',properties:{name:'Băilești'}, geometry:{type:'Point',coordinates:[23.348,44.029]}},
            {type:'Feature',properties:{name:'Calafat'},  geometry:{type:'Point',coordinates:[22.936,43.995]}},
            {type:'Feature',properties:{name:'Dăbuleni'}, geometry:{type:'Point',coordinates:[24.091,43.798]}},
            {type:'Feature',properties:{name:'Filiaș'},   geometry:{type:'Point',coordinates:[23.519,44.543]}},
            {type:'Feature',properties:{name:'Segarcea'}, geometry:{type:'Point',coordinates:[23.741,44.097]}},
            {type:'Feature',properties:{name:'Bechet'},   geometry:{type:'Point',coordinates:[23.942,43.776]}},
        ]
    },
    'olt': {
        titlu: 'Olt', regiune: 'Oltenia',
        view: [44.30, 24.40], zoom: 9,
        features: [
            {type:'Feature',properties:{name:'Slatina'},          geometry:{type:'Point',coordinates:[24.370,44.430]}},
            {type:'Feature',properties:{name:'Caracal'},          geometry:{type:'Point',coordinates:[24.351,44.117]}},
            {type:'Feature',properties:{name:'Balș'},             geometry:{type:'Point',coordinates:[24.099,44.358]}},
            {type:'Feature',properties:{name:'Corabia'},          geometry:{type:'Point',coordinates:[24.510,43.774]}},
            {type:'Feature',properties:{name:'Drăgănești-Olt'}, geometry:{type:'Point',coordinates:[24.419,44.176]}},
            {type:'Feature',properties:{name:'Scornicești'},    geometry:{type:'Point',coordinates:[24.560,44.564]}},
            {type:'Feature',properties:{name:'Piatra-Olt'},     geometry:{type:'Point',coordinates:[24.280,44.360]}},
            {type:'Feature',properties:{name:'Potcoava'},       geometry:{type:'Point',coordinates:[24.631,44.475]}},
        ]
    },
    'mehedinti': {
        titlu: 'Mehedinți', regiune: 'Oltenia',
        view: [44.60, 22.80], zoom: 9,
        features: [
            {type:'Feature',properties:{name:'Drobeta-Turnu Severin'},geometry:{type:'Point',coordinates:[22.657,44.634]}},
            {type:'Feature',properties:{name:'Orșova'},               geometry:{type:'Point',coordinates:[22.388,44.724]}},
            {type:'Feature',properties:{name:'Strehaia'},             geometry:{type:'Point',coordinates:[23.196,44.617]}},
            {type:'Feature',properties:{name:'Vânju Mare'},           geometry:{type:'Point',coordinates:[22.875,44.423]}},
            {type:'Feature',properties:{name:'Baia de Aramă'},        geometry:{type:'Point',coordinates:[22.707,44.882]}},
        ]
    },

    // ── București-Ilfov ────────────────────────────────────────────────────
    'bucuresti': {
        titlu: 'București', regiune: 'București-Ilfov',
        view: [44.43, 26.10], zoom: 11,
        features: [
            {type:'Feature',properties:{name:'Sector 1'},  geometry:{type:'Point',coordinates:[26.060,44.465]}},
            {type:'Feature',properties:{name:'Sector 2'},  geometry:{type:'Point',coordinates:[26.120,44.450]}},
            {type:'Feature',properties:{name:'Sector 3'},  geometry:{type:'Point',coordinates:[26.130,44.420]}},
            {type:'Feature',properties:{name:'Sector 4'},  geometry:{type:'Point',coordinates:[26.100,44.400]}},
            {type:'Feature',properties:{name:'Sector 5'},  geometry:{type:'Point',coordinates:[26.060,44.415]}},
            {type:'Feature',properties:{name:'Sector 6'},  geometry:{type:'Point',coordinates:[26.040,44.445]}},
        ]
    },
    'ilfov': {
        titlu: 'Ilfov', regiune: 'București-Ilfov',
        view: [44.45, 26.10], zoom: 10,
        features: [
            {type:'Feature',properties:{name:'Buftea'},            geometry:{type:'Point',coordinates:[25.940,44.576]}},
            {type:'Feature',properties:{name:'Voluntari'},         geometry:{type:'Point',coordinates:[26.183,44.494]}},
            {type:'Feature',properties:{name:'Pantelimon'},        geometry:{type:'Point',coordinates:[26.196,44.423]}},
            {type:'Feature',properties:{name:'Popești-Leordeni'}, geometry:{type:'Point',coordinates:[26.161,44.362]}},
            {type:'Feature',properties:{name:'Măgurele'},          geometry:{type:'Point',coordinates:[25.985,44.350]}},
            {type:'Feature',properties:{name:'Bragadiru'},         geometry:{type:'Point',coordinates:[25.985,44.376]}},
            {type:'Feature',properties:{name:'Otopeni'},           geometry:{type:'Point',coordinates:[26.085,44.543]}},
            {type:'Feature',properties:{name:'Chitila'},           geometry:{type:'Point',coordinates:[25.988,44.508]}},
        ]
    },
};

// ── Stare globală ──────────────────────────────────────────────────────────

let modCurent = null;
let layerMap  = {};

// Joc România
let scor = 0, greseli = 0, ramase = [], orasCurent = null;
let totalCurent = TOTAL;
// Învățare România
let indexInvatare = 0, oraseLista = [];

// Orașe pe Județe
let oraseLayer    = null;
let oraseLayerMap = {};
let oraseJudet    = null;   // cheia din JUDETE
let oraseScor = 0, oraseGreseli = 0, oraseHinturi = 0, oraseRamase = [], orseCurent = null, oraseTotal = 0;
let sesiuneJudete = 0;
let sesiunePerfectStreak = 0;
let sesiuneGreuPerfect = new Set();
let sesiuneScrisPerfect = 0;    // județe 100% în Mod Scris în sesiunea curentă
let sesiuneScrisMMJucata = false;
let dificultate       = 'usor';
let greseliCurentOras = 0;
const TIMP_LIMITA_GREU = 90;

// Maramureș
let mmGeojsonCache = null;
let mmLayer        = null;
let mmLayerMap     = {};
let mmModSub       = null;     // 'invatare' | 'joc'
let mmModGranite   = false;    // true = poligoane OSM, false = cercuri fallback
// Joc MM
let mmScor = 0, mmGreseli = 0, mmRamase = [], mmCurent = null, mmTotal = 0;
// Învățare MM
let mmIndexInv = 0, mmLista = [];

// ── Stiluri România (cercuri) ──────────────────────────────────────────────

const stilAscuns  = { radius: 5,  color: "rgba(91,163,217,0.3)", weight: 1, fillColor: "#5ba3d9", fillOpacity: 0.12 };
const stilVazut   = { radius: 11, color: "#5a2d82", weight: 2,   fillColor: "#b07fd4", fillOpacity: 0.82 };
const stilCurent  = { radius: 15, color: "#3d1a60", weight: 3,   fillColor: "#d4a0f5", fillOpacity: 1 };
const stilNeutru  = { radius: 14, color: "#2c5f8a", weight: 2,   fillColor: "#5ba3d9", fillOpacity: 0.85 };
const stilCorect  = { radius: 18, color: "#1a7a44", weight: 2,   fillColor: "#27ae60", fillOpacity: 1 };
const stilGresit  = { radius: 18, color: "#a93226", weight: 2,   fillColor: "#e74c3c", fillOpacity: 1 };
const stilGhicit  = { radius: 11, color: "#1a7a44", weight: 1,   fillColor: "#27ae60", fillOpacity: 0.48 };
const stilHint    = { radius: 22, color: "#b8860b", weight: 3,   fillColor: "#f0c040", fillOpacity: 1 };

// ── Stiluri Maramureș (poligoane) ─────────────────────────────────────────

const mmStilNeutru  = { color: "#2c5f8a", weight: 1.5, fillColor: "#5ba3d9", fillOpacity: 0.35 };
const mmStilAscuns  = { color: "#444", weight: 1, fillColor: "#555", fillOpacity: 0.12 };
const mmStilVazut   = { color: "#5a2d82", weight: 1.5, fillColor: "#b07fd4", fillOpacity: 0.55 };
const mmStilCurent  = { color: "#3d1a60", weight: 2.5, fillColor: "#d4a0f5", fillOpacity: 0.75 };
const mmStilCorect  = { color: "#1a7a44", weight: 2,   fillColor: "#27ae60", fillOpacity: 0.85 };
const mmStilGresit  = { color: "#a93226", weight: 2,   fillColor: "#e74c3c", fillOpacity: 0.85 };
const mmStilGhicit  = { color: "#1a7a44", weight: 1,   fillColor: "#27ae60", fillOpacity: 0.35 };

// ── Layer România ──────────────────────────────────────────────────────────

L.geoJSON(data, {
    pointToLayer: (feature, latlng) => L.circleMarker(latlng, { ...stilAscuns }),
    onEachFeature: (feature, layer) => {
        layerMap[feature.properties.name] = layer;
        layer.on('click', () => handleClickRO(feature, layer));
        layer.on('mouseover', () => {
            if (modCurent === 'invatare') layer.bindTooltip(feature.properties.name, { permanent: false, sticky: true, className: 'tooltip-oras' }).openTooltip();
        });
        layer.on('mouseout', () => {
            if (modCurent === 'invatare') layer.closeTooltip();
        });
    }
}).addTo(map);

// ── Navigare principală ────────────────────────────────────────────────────

function porneste(mod) {
    ascundeToate();

    if (mod === 'geografie') {
        document.getElementById('submeniu-geografie').classList.remove('ascuns');
        animaEcran('submeniu-geografie');
        afiseazaHSGeografie();
        return;
    }
    if (mod === 'usor') {
        ascundeToate();
        document.getElementById('ecran').classList.remove('ascuns');
        map.setView([45.94, 24.96], 7);
        setTimeout(() => map.invalidateSize(), 60);
        if (mmLayer) { mmLayer.remove(); mmLayer = null; mmLayerMap = {}; }
        Object.values(layerMap).forEach(l => {
            if (!map.hasLayer(l)) l.addTo(map);
            l.setStyle({ ...stilAscuns });
        });
        modCurent = 'usor';
        initJocUsor();
        return;
    }
    if (mod === 'orase') {
        deschideHartaSelectie();
        return;
    }
    if (mod === 'trivia') {
        document.getElementById('submeniu-trivia').classList.remove('ascuns');
        animaEcran('submeniu-trivia');
        document.getElementById('trivia-intro').classList.remove('ascuns');
        document.getElementById('trivia-joc').classList.add('ascuns');
        document.getElementById('trivia-final').classList.add('ascuns');
        afiseazaHSTrivia();
        return;
    }
    if (mod === 'ministri') {
        document.getElementById('submeniu-ministri').classList.remove('ascuns');
        animaEcran('submeniu-ministri');
        document.getElementById('ministri-intro').classList.remove('ascuns');
        document.getElementById('ministri-joc').classList.add('ascuns');
        document.getElementById('ministri-final').classList.add('ascuns');
        afiseazaHSMinistri();
        modCurent = 'ministri';
        return;
    }
    if (mod === 'duel') {
        document.getElementById('submeniu-duel').classList.remove('ascuns');
        animaEcran('submeniu-duel');
        duelResetSetup();
        return;
    }
    if (mod === 'maramures') {
        document.getElementById('submeniu-mm').classList.remove('ascuns');
        return;
    }

    document.getElementById('ecran').classList.remove('ascuns');
    map.setView([45.94, 24.96], 7);
    setTimeout(() => map.invalidateSize(), 60);

    // Curăță layerul MM dacă era activ
    if (mmLayer) { mmLayer.remove(); mmLayer = null; mmLayerMap = {}; }
    // Asigurăm că markerii România sunt pe hartă
    Object.values(layerMap).forEach(l => {
        if (!map.hasLayer(l)) l.addTo(map);
        l.setStyle({ ...stilAscuns });
    });

    modCurent = mod;
    if (mod === 'invatare') initInvatare();
    else if (mod === 'joc') initJoc();
}

// ── Mod Orașe pe Județe ────────────────────────────────────────────────────

function setDificultate(dif) {
    dificultate = dif;
    document.getElementById('btn-usor').classList.toggle('activ', dif === 'usor');
    document.getElementById('btn-greu').classList.toggle('activ', dif === 'greu');
    document.getElementById('btn-fara-greseli').classList.toggle('activ', dif === 'fara-greseli');
    verificaAchievements({ tip: 'dif', dif });
}

function actualizeazaStatisticiCards() {
    document.querySelectorAll('.card-judet').forEach(btn => {
        const m = (btn.getAttribute('onclick') || '').match(/pornesteOrase\('([^']+)'\)/);
        if (!m) return;
        const judet = m[1];
        let el = btn.querySelector('.cj-best');
        if (!el) { el = document.createElement('div'); el.className = 'cj-best'; btn.appendChild(el); }
        const hU = citestHS('hs_orase_usor_' + judet);
        const hG = citestHS('hs_orase_greu_' + judet);
        const hF = citestHS('hs_orase_fara_' + judet);
        const linii = [];
        if (hU) linii.push('😊 ' + afiseazaHSText(hU, true).replace('🏆 ', ''));
        if (hG) linii.push('💀 ' + afiseazaHSText(hG, true).replace('🏆 ', ''));
        if (hF) linii.push('☠️ ' + afiseazaHSText(hF, true).replace('🏆 ', ''));
        el.innerHTML = linii.map(l => `<div>${l}</div>`).join('');
    });
}

function pornesteOrase(judet) {
    if (modScrisActiv) { pornesteOraseScris(judet); return; }
    ascundeToate();
    document.getElementById('ecran').classList.remove('ascuns');
    document.getElementById('ui-joc').classList.remove('ascuns');

    // Curăță layere anterioare
    if (oraseLayer) { oraseLayer.remove(); oraseLayer = null; oraseLayerMap = {}; }
    if (mmLayer)    { mmLayer.remove();    mmLayer = null;    mmLayerMap = {}; }
    Object.values(layerMap).forEach(l => { try { map.removeLayer(l); } catch(e) {} });

    oraseJudet = judet;
    modCurent  = 'orase';

    const cfg = JUDETE[judet];

    oraseScor = 0; oraseGreseli = 0; oraseHinturi = 0; greseliCurentOras = 0;
    oraseRamase = [...cfg.features];
    oraseTotal  = cfg.features.length;
    orseCurent  = null;

    // Creăm layer-ul cu markeri pentru județul ales
    oraseLayer = L.geoJSON({ type:'FeatureCollection', features: cfg.features }, {
        pointToLayer: (f, latlng) => L.circleMarker(latlng, { ...stilNeutru }),
        onEachFeature: (feature, layer) => {
            oraseLayerMap[feature.properties.name] = layer;
            layer.on('click', () => handleClickOrase(feature, layer));
        }
    }).addTo(map);

    setTimeout(() => {
        map.invalidateSize();
        map.setView(cfg.view, cfg.zoom);
    }, 60);

    resetStreakUI();
    document.getElementById('btn-hint-oras').classList.toggle('ascuns', dificultate === 'greu' || dificultate === 'fara-greseli');
    actualizeazaUIorase();
    alegeOrasJudet();
    startTimer(cheieOrase(judet));
}

function cheieOrase(judet) {
    const dif = dificultate === 'greu' ? 'greu' : dificultate === 'fara-greseli' ? 'fara' : 'usor';
    return 'orase_' + dif + '_' + judet;
}

function handleClickOrase(feature, layer) {
    if (modCurent !== 'orase' || !orseCurent) return;
    const name = feature.properties.name;

    if (name === orseCurent) {
        bipCorect();
        actualizeazaStreak(true, 'streak-badge');
        layer.setStyle(stilCorect);
        if (layer.setRadius) { layer.setRadius(18); setTimeout(() => layer.setRadius(8), 220); }
        oraseScor++;
        oraseRamase = oraseRamase.filter(f => f.properties.name !== orseCurent);
        setFeedback('cerinta-box', '✅ Corect! ' + orseCurent, 'correct');
        actualizeazaUIorase();
        setTimeout(() => { layer.setStyle(stilGhicit); setFeedback('cerinta-box','',''); alegeOrasJudet(); }, 700);
    } else {
        bipGresit();
        actualizeazaStreak(false, 'streak-badge');
        oraseGreseli++;
        greseliCurentOras++;
        layer.setStyle(stilGresit);
        setFeedback('cerinta-box', '❌ Nu e ' + name + '!', 'wrong');
        actualizeazaUIorase();

        if (dificultate === 'fara-greseli') {
            setTimeout(() => sfarsitOrase(true), 900);
            return;
        }

        if (dificultate === 'usor' && greseliCurentOras >= 3) {
            const hintLayer = oraseLayerMap[orseCurent];
            if (hintLayer) hintLayer.setStyle(stilHint);
            setFeedback('cerinta-box', '💡 Era: ' + orseCurent, 'hint');
            setTimeout(() => {
                if (oraseRamase.some(f => f.properties.name === name)) layer.setStyle(stilNeutru);
                if (hintLayer) hintLayer.setStyle(stilGhicit);
                oraseRamase = oraseRamase.filter(f => f.properties.name !== orseCurent);
                actualizeazaUIorase();
                alegeOrasJudet();
            }, 1500);
        } else {
            setTimeout(() => {
                if (oraseRamase.some(f => f.properties.name === name)) layer.setStyle(stilNeutru);
                setFeedback('cerinta-box', 'Găsește: ' + orseCurent, '');
            }, 900);
        }
    }
}

function alegeOrasJudet() {
    if (oraseRamase.length === 0) { sfarsitOrase(); return; }
    greseliCurentOras = 0;
    orseCurent = oraseRamase[Math.floor(Math.random() * oraseRamase.length)].properties.name;
    setFeedback('cerinta-box', 'Găsește: ' + orseCurent, '');
}

function actualizeazaUIorase() {
    document.getElementById('scor-corect').textContent = oraseScor;
    document.getElementById('scor-gresit').textContent = oraseGreseli;
    document.getElementById('ramase-nr').textContent   = oraseRamase.length;
    document.getElementById('progres-bar').style.width = ((oraseTotal - oraseRamase.length) / oraseTotal * 100) + '%';
}

function sfarsitOrase(gameOver) {
    const totalClickuri = oraseScor + oraseGreseli + oraseHinturi;
    const pct = (gameOver || totalClickuri === 0) ? (gameOver ? 0 : 100) : Math.round(oraseScor / totalClickuri * 100);
    orseCurent = null;
    resetStreakUI();

    if (gameOver) {
        clearInterval(timerInterval); timerInterval = null;
        document.getElementById('final-joc-emoji').textContent    = '💀';
        document.getElementById('final-joc-titlu').textContent    = 'Game Over!';
        document.getElementById('final-joc-subtitlu').textContent = 'Ai greșit — mai încearcă!';
        document.getElementById('final-scor').textContent         = oraseScor + ' / ' + oraseTotal + ' găsite';
        document.getElementById('final-detalii').textContent      = 'Orașul era: ' + (Object.keys(oraseLayerMap).find(n => n === orseCurent) || orseCurent || '?');
        document.getElementById('final-judete-stat').classList.add('ascuns');
        document.getElementById('btn-judet-urmator').classList.add('ascuns');
        document.getElementById('btn-replay-final').textContent   = '🔄 Încearcă din nou';
    } else {
        stopTimer(pct);
        document.getElementById('final-joc-emoji').textContent    = pct === 100 ? '🏆' : '🎉';
        document.getElementById('final-joc-titlu').textContent    = 'Felicitări!';
        document.getElementById('final-joc-subtitlu').textContent = 'Ai terminat ' + JUDETE[oraseJudet].titlu + '!';
        document.getElementById('final-scor').textContent         = oraseScor + ' / ' + oraseTotal;
        document.getElementById('final-detalii').textContent      = pct + '% corect • ' + oraseGreseli + ' greșeli' + (oraseHinturi > 0 ? ' • ' + oraseHinturi + ' hint-uri' : '');
        document.getElementById('btn-replay-final').textContent   = '🔄 Joacă din nou';

        // Statistici județe perfecte
        const judeteKeys = Object.keys(JUDETE);
        const perfecte   = judeteKeys.filter(j => {
            return ['usor','greu','fara'].some(d => { const h = citestHS('hs_orase_' + d + '_' + j); return h && h.pct === 100; });
        }).length;
        const statEl     = document.getElementById('final-judete-stat');
        statEl.textContent = '⭐ ' + perfecte + ' / ' + judeteKeys.length + ' județe cu 100%';
        statEl.classList.remove('ascuns');

        // Buton județ următor
        const idx    = judeteKeys.indexOf(oraseJudet);
        const urmKey = judeteKeys[(idx + 1) % judeteKeys.length];
        const btnUrm = document.getElementById('btn-judet-urmator');
        btnUrm.textContent = '→ ' + JUDETE[urmKey].titlu;
        btnUrm.onclick     = () => judetUrmator(urmKey);
        btnUrm.classList.remove('ascuns');

        verificaAchievements({ tip: 'orase', pct, timp: timerSecunde, greseli: oraseGreseli, hinturi: oraseHinturi, dif: dificultate, judet: oraseJudet });
        if (pct >= 80) pornesteCelebration();
    }

    document.getElementById('final-joc').classList.add('vizibil');
}

function folosestHint() {
    if (!orseCurent || dificultate === 'greu' || dificultate === 'fara-greseli') return;
    oraseHinturi++;
    // Penalizare timp +5 secunde
    timerSecunde += 5;
    // Zoom pe zona orașului
    const layer = oraseLayerMap[orseCurent];
    if (layer) {
        const latlng = layer.getLatLng ? layer.getLatLng() : layer.getBounds().getCenter();
        const cfg    = JUDETE[oraseJudet];
        map.setView(latlng, Math.min((cfg.zoom || 9) + 2, 13), { animate: true, duration: 0.5 });
        layer.setStyle(stilHint);
        setTimeout(() => layer.setStyle(stilNeutru), 2000);
    }
    setFeedback('cerinta-box', '💡 Caută prin zonă! (−5s din scor)', 'hint');
    setTimeout(() => setFeedback('cerinta-box', 'Găsește: ' + orseCurent, ''), 2000);
}

function judetUrmator(cheie) {
    document.getElementById('final-joc').classList.remove('vizibil');
    document.getElementById('btn-judet-urmator').classList.add('ascuns');
    document.getElementById('final-judete-stat').classList.add('ascuns');
    pornesteOrase(cheie || Object.keys(JUDETE)[0]);
}

function pornesteMM(sub) {
    ascundeToate();
    document.getElementById('loading-screen').classList.remove('ascuns');
    mmModSub = sub;

    incarcaDateMM().then(geojson => {
        document.getElementById('loading-screen').classList.add('ascuns');
        document.getElementById('ecran').classList.remove('ascuns');

        // Ascunde markerii României de pe hartă
        Object.values(layerMap).forEach(l => { try { map.removeLayer(l); } catch(e){} });

        modCurent = 'maramures';

        // Așteptăm ca divul să fie vizibil înainte să invalidăm harta
        setTimeout(() => {
            map.invalidateSize();
            map.setView([47.75, 23.85], 9);
            if (sub === 'invatare') initMMInvatare(geojson);
            else if (sub === 'scris') { mmData = geojson; pornesteMMScris(); }
            else initMMJoc(geojson);
        }, 80);

    }).catch((err) => {
        console.error('Eroare Overpass:', err);
        document.getElementById('loading-screen').classList.add('ascuns');
        document.getElementById('submeniu-mm').classList.remove('ascuns');
        alert('Nu s-au putut încărca datele (' + (err.message || 'eroare rețea') + ').\nVerifică conexiunea la internet și încearcă din nou.');
    });
}

function curataMarcatori() {
    if (oraseLayer) { oraseLayer.remove(); oraseLayer = null; }
    Object.values(oraseLayerMap).forEach(m => { try { map.removeLayer(m); } catch(e) {} });
    oraseLayerMap = {};
    Object.values(layerMap).forEach(l => { try { map.removeLayer(l); } catch(e) {} });
}

function inapoi() {
    ascundeSb();
    const eraMaramures  = modCurent === 'maramures' || modCurent === 'mm-scris';
    const eraOrase      = modCurent === 'orase' || modCurent === 'orase-scris';
    const eraGeografie  = modCurent === 'invatare' || modCurent === 'joc' || modCurent === 'usor' || eraOrase;
    const eraMinistri   = modCurent === 'ministri';
    ascundeToate();

    if (eraMaramures) {
        document.getElementById('submeniu-mm').classList.remove('ascuns');
        if (mmLayer) { mmLayer.remove(); mmLayer = null; mmLayerMap = {}; }
    } else if (eraGeografie) {
        curataMarcatori();
        document.getElementById('submeniu-geografie').classList.remove('ascuns');
        animaEcran('submeniu-geografie');
        afiseazaHSGeografie();
    } else if (eraMinistri) {
        document.getElementById('landing').classList.remove('ascuns');
        animaEcran('landing');
        actualizeazaLandingHS();
    } else {
        curataMarcatori();
        document.getElementById('landing').classList.remove('ascuns');
        animaEcran('landing');
        actualizeazaLandingHS();
    }

    modCurent = null;
}

function inapoiDinGeografie() {
    ascundeToate();
    document.getElementById('landing').classList.remove('ascuns');
    animaEcran('landing');
    actualizeazaLandingHS();
}

function afiseazaHSGeografie() {
    const hsJoc  = citestHS('hs_joc');
    const elJoc  = document.getElementById('geo-hs-joc');
    if (elJoc)  elJoc.textContent  = hsJoc  ? '🏆 ' + formatTime(hsJoc.timp)  : '';

    const hsUsor = citestHS('hs_joc_usor');
    const elUsor = document.getElementById('geo-hs-usor');
    if (elUsor) elUsor.textContent = hsUsor ? '🏆 ' + formatTime(hsUsor.timp) : '';

    const elOrase = document.getElementById('geo-hs-orase');
    if (elOrase) {
        const completate = Object.keys(JUDETE).filter(j => citestHSOrase(j)).length;
        const total = Object.keys(JUDETE).length;
        elOrase.textContent = completate > 0 ? '🏆 ' + completate + '/' + total + ' județe' : '';
    }
}

function ascundeToate() {
    ['landing','submeniu-geografie','submeniu-orase','submeniu-mm','submeniu-trivia','submeniu-ministri','submeniu-duel','loading-screen','ecran',
     'final-invatare','final-joc','final-mm-invatare','final-mm-joc','screen-harta-selectie']
        .forEach(id => { const el = document.getElementById(id); if (el) { el.classList.add('ascuns'); el.classList.remove('screen-anim'); } });

    ['ui-invatare','ui-joc','ui-mm-invatare','ui-mm-joc','ui-scris','ui-mm-scris']
        .forEach(id => { const el = document.getElementById(id); if (el) el.classList.add('ascuns'); });

    ['final-invatare','final-joc','final-mm-invatare','final-mm-joc']
        .forEach(id => document.getElementById(id).classList.remove('vizibil'));
}

function animaEcran(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.remove('screen-anim');
    void el.offsetWidth;
    el.classList.add('screen-anim');
}

// ── Date Maramureș ─────────────────────────────────────────────────────────

// Date embedded (fallback fără internet)

const MM_COMUNE = new Set([
    'Baia Mare','Sighetu Marmației','Baia Sprie','Borșa','Câmpulung la Tisa',
    'Cavnic','Seini','Tăuții-Măgherăuș','Târgu Lăpuș','Ulmeni','Vișeu de Sus',
    'Ardusat','Ariniș','Asuaju de Sus','Băiuț','Băița de Sub Codru','Băsești',
    'Bârsana','Bistra','Bocicoiu Mare','Bogdan Vodă','Botiza','Budești',
    'Călinești','Cernești','Cicârlău','Coaș','Copalnic-Mănăștur','Coltău',
    'Cupșeni','Desești','Dragomirești','Dumbrăvița','Fărcașa','Gârdani',
    'Giulești','Groși','Groșii Țibleșului','Ieud','Lăpuș','Leordina',
    'Mireșu Mare','Moisei','Ocna Șugatag','Oncești','Petrova',
    'Poienile de Sub Munte','Poienile Izei','Recea','Remetea Chioarului',
    'Remeți','Repedea','Rona de Jos','Rona de Sus','Rozavlea','Ruscova',
    'Sarasău','Săcălășeni','Săcel','Săliștea de Sus','Sălsig','Satulung',
    'Strâmtura','Șieu','Șișești','Șomcuta Mare','Vadu Izei','Vișeu de Jos','Săpânța',
    'Bicaz','Oarța de Jos','Valea Chioarului','Boiu Mare','Vima Mică','Coroieni','Suciu de Sus'
]);

// Date de rezervă cu granițe reale (Polygon)
const MM_FALLBACK = {"type":"FeatureCollection","features":[{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[23.846920158715765,47.372460142594896],[23.840047007564785,47.372491969172394],[23.82807446110009,47.36771719764207],[23.82078751957808,47.36989130713776],[23.817820725118775,47.36813480144087],[23.8092233485351,47.3752837806967],[23.80996558962766,47.385941251780345],[23.811745472190307,47.388972930730425],[23.80184189675465,47.40092785144732],[23.806295228603965,47.406520129791716],[23.806257703351854,47.41896034208295],[23.81265496070872,47.42450366584555],[23.81252566245969,47.42732774206698],[23.799728693799025,47.43049881745193],[23.79618675263837,47.42795238631534],[23.789732536210764,47.431861512146206],[23.779643267744273,47.4301248816556],[23.77442645639027,47.432849399270964],[23.768051453569182,47.43197731038492],[23.76680385972219,47.41324161610516],[23.75200137516075,47.403639571253464],[23.744566020173185,47.40012339282946],[23.739943241671014,47.39525213705943],[23.739181500374887,47.38334543095208],[23.735827932922124,47.382014414634064],[23.737175621355647,47.367090552744266],[23.736119164697254,47.3628561634419],[23.72650229547543,47.356220624345575],[23.72095620776852,47.35892784282381],[23.712449028441657,47.35213045571038],[23.701187753622065,47.34863259082742],[23.701139704807723,47.34115513006982],[23.70663646633316,47.33819467572464],[23.70918572888095,47.33266966123829],[23.717271303401,47.33237103027198],[23.727457402223987,47.3210400321166],[23.73678534249083,47.32303002786053],[23.745416130721487,47.320672874841776],[23.75059154288685,47.32627181746348],[23.760073675421847,47.32587855322536],[23.762307654802573,47.330726531568736],[23.759918277865946,47.33541629202569],[23.785014606856173,47.336008706378074],[23.797540379958058,47.33983730677737],[23.816555521789073,47.343784536770876],[23.824937496093266,47.344744195969035],[23.829883202123266,47.338399941847676],[23.84138931643929,47.340022092850866],[23.83257157900883,47.34804362370083],[23.837268722065833,47.349592051392875],[23.840019849886538,47.35787511595745],[23.843720824596218,47.3630153351459],[23.846920158715765,47.372460142594896]]]},"properties":{"id":1939,"natCode":107868,"name":"Coroieni","natLevName":"Comuna","countyId":24,"countyCode":243,"county":"Maramureș","countyMn":"MM","regionId":6,"regionCode":868,"region":"Nord-Vest","version":"2025-03-26"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[23.622808025980298,47.433916007415476],[23.608578246860233,47.43475643538425],[23.602323682866025,47.43738426994467],[23.59075226129461,47.430312353540536],[23.584888402446776,47.43115688654938],[23.582155923385205,47.4349599466368],[23.5684102993064,47.433140343262096],[23.55092475624033,47.43556219534181],[23.537238555280485,47.42917788366423],[23.521690364019467,47.43125955470652],[23.51318694404049,47.42555261236788],[23.509146456050825,47.41994386247273],[23.502102399218668,47.40573311875149],[23.5157102003032,47.39618566993019],[23.53055269325367,47.393646827966215],[23.537647159380523,47.39388066425294],[23.546154752118237,47.3877100338794],[23.551336978353568,47.37548976202788],[23.557311273209493,47.36663160777785],[23.558043587086658,47.363716844359175],[23.56799096151333,47.36333739734741],[23.571117194615667,47.3612134380514],[23.578509812736616,47.36460118044067],[23.585285107124776,47.37252882963372],[23.59424176899832,47.374626464727996],[23.60254273543025,47.37305534619647],[23.611131007107094,47.37720968850809],[23.613453687772985,47.382054592418015],[23.61121822721565,47.3873943714468],[23.61708316821207,47.39191278247932],[23.622081845828955,47.390679645390726],[23.63147124479195,47.39603599084901],[23.63720192708199,47.39201487225548],[23.646730924257476,47.391629010271714],[23.645097137516274,47.39777708939517],[23.651343002013913,47.400729944440975],[23.656330035537476,47.40948846309376],[23.646556742436445,47.41857367239236],[23.64507907925372,47.427634493953846],[23.638096117189505,47.431705715486224],[23.63281697156965,47.43722315397135],[23.622808025980298,47.433916007415476]]]},"properties":{"id":1942,"natCode":107430,"name":"Boiu Mare","natLevName":"Comuna","countyId":24,"countyCode":243,"county":"Maramureș","countyMn":"MM","regionId":6,"regionCode":868,"region":"Nord-Vest","version":"2025-03-26"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[23.521690364019467,47.43125955470652],[23.510864348927115,47.4309057086093],[23.50435467938877,47.43393101714526],[23.512085292437977,47.43654082713868],[23.511210451400245,47.44020423064094],[23.49615654657455,47.44407650662445],[23.49330321078894,47.44741082180084],[23.48459036570738,47.44983123066992],[23.47389854400353,47.44773545389671],[23.469040665657456,47.44047826771215],[23.464966324110158,47.440589420193284],[23.465354128493015,47.446728241805715],[23.45742335465154,47.44325481716112],[23.44518608234868,47.44060938858453],[23.440958653319356,47.437113856715214],[23.434626734051967,47.44024380307335],[23.433903209414897,47.44320458003982],[23.433201011123725,47.43413659447257],[23.424676104036823,47.428541764559355],[23.417260578590895,47.42908914160794],[23.40304644247555,47.43442637373289],[23.402104691891033,47.43793823415585],[23.39262585268964,47.4385929692681],[23.39308358243584,47.435073091823014],[23.383858538200183,47.43503307941105],[23.374438358364774,47.437218531607336],[23.37283842429637,47.427776130868345],[23.36692310549471,47.42587357284662],[23.363396109103345,47.42180509628945],[23.355500177497554,47.419224646414804],[23.35493001747951,47.41570589129066],[23.359243172888203,47.41275947028705],[23.362093216113923,47.40554914133509],[23.36211090975619,47.40012611455334],[23.375158979652998,47.39163962722437],[23.377689366386765,47.38811812610277],[23.39100199661123,47.38820221083559],[23.39722208172941,47.39180081208179],[23.401946064314846,47.388067717194],[23.40754718324214,47.390605623260626],[23.413850691187935,47.385466354820835],[23.42009842290916,47.3882106046144],[23.437604027024786,47.380954564944396],[23.453862525923665,47.378885079814175],[23.47969763006019,47.37771097579277],[23.48491890340707,47.37592554681967],[23.492774187764336,47.36602284189376],[23.50418605004166,47.363013681579716],[23.50863840811307,47.36258697054011],[23.51746047059161,47.36850144775163],[23.52757749000126,47.369488973964216],[23.533878224595426,47.36711093187103],[23.538713282422332,47.36961340952024],[23.557311273209493,47.36663160777785],[23.551336978353568,47.37548976202788],[23.546154752118237,47.3877100338794],[23.537647159380523,47.39388066425294],[23.53055269325367,47.393646827966215],[23.5157102003032,47.39618566993019],[23.502102399218668,47.40573311875149],[23.509146456050825,47.41994386247273],[23.51318694404049,47.42555261236788],[23.521690364019467,47.43125955470652]]]},"properties":{"id":1948,"natCode":109354,"name":"Valea Chioarului","natLevName":"Comuna","countyId":24,"countyCode":243,"county":"Maramureș","countyMn":"MM","regionId":6,"regionCode":868,"region":"Nord-Vest","version":"2025-03-26"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[23.70077438376254,47.440715880182346],[23.689442163567843,47.441182439725154],[23.690496417379702,47.44861557449918],[23.687248000219153,47.45814015061024],[23.670247309617697,47.461986231755546],[23.65995062848506,47.45964907934108],[23.660763347600895,47.45537757343785],[23.65313102979134,47.45385792314935],[23.648635496034807,47.45078583756225],[23.640172185214393,47.453677087652366],[23.630035908016314,47.45217321370302],[23.62355859377565,47.44373011547277],[23.622808025980298,47.433916007415476],[23.63281697156965,47.43722315397135],[23.638096117189505,47.431705715486224],[23.64507907925372,47.427634493953846],[23.646556742436445,47.41857367239236],[23.656330035537476,47.40948846309376],[23.651343002013913,47.400729944440975],[23.645097137516274,47.39777708939517],[23.646730924257476,47.391629010271714],[23.661087833498712,47.37948867134402],[23.667900401602775,47.37983877230569],[23.665221226496037,47.37467712302146],[23.66799527192119,47.365194507961235],[23.673071688450786,47.363720505631726],[23.6745308966568,47.35946937128466],[23.680649658031655,47.35506634008275],[23.688609508111046,47.35183131666972],[23.69619860452723,47.35446678472692],[23.70299871299479,47.352586416183485],[23.712449028441657,47.35213045571038],[23.72095620776852,47.35892784282381],[23.72650229547543,47.356220624345575],[23.736119164697254,47.3628561634419],[23.737175621355647,47.367090552744266],[23.735827932922124,47.382014414634064],[23.739181500374887,47.38334543095208],[23.739943241671014,47.39525213705943],[23.744566020173185,47.40012339282946],[23.75200137516075,47.403639571253464],[23.76680385972219,47.41324161610516],[23.768051453569182,47.43197731038492],[23.760750206265918,47.43268882980614],[23.758070640632308,47.43534113940226],[23.744965088055952,47.43643711551104],[23.738273199788754,47.444091622087164],[23.728568213288955,47.44240860537652],[23.72031068731821,47.4359193834356],[23.7147218573648,47.43967537934973],[23.707444194313698,47.436472281442086],[23.70077438376254,47.440715880182346]]]},"properties":{"id":1953,"natCode":109425,"name":"Vima Mică","natLevName":"Comuna","countyId":24,"countyCode":243,"county":"Maramureș","countyMn":"MM","regionId":6,"regionCode":868,"region":"Nord-Vest","version":"2025-03-26"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[24.11845426475148,47.47967719348847],[24.10942460467751,47.479869892046665],[24.091499686482884,47.4775740886695],[24.08789589563729,47.4762105252819],[24.08430555753766,47.469258703247874],[24.07668388804106,47.46894399368129],[24.0763202600007,47.45971445622871],[24.058655410649983,47.46259740115217],[24.057789422824136,47.46574554603945],[24.05070787156396,47.46923168458183],[24.044146784299997,47.47013582475891],[24.04234336614419,47.47545076701809],[24.0332965450358,47.47457068358763],[24.033197619337137,47.46933000244163],[24.02304491190457,47.46388883275463],[24.014549205632523,47.46465299613518],[24.013602302588147,47.45998878155993],[24.00485927608696,47.462067880022786],[23.987767437609467,47.45515049162925],[23.98367833130302,47.45273132777126],[23.96486059660214,47.45219117250363],[23.949488960070667,47.45613039889835],[23.943940640620898,47.4518085065518],[23.937135047162364,47.45120712944853],[23.939758193514738,47.43787007595577],[23.938736984405498,47.43411840706092],[23.943204255074697,47.42571820842291],[23.941512523709676,47.41678048049903],[23.943776602936467,47.403255380408496],[23.94746740697229,47.40230118224095],[23.948274037671247,47.39546350506083],[23.95703715173714,47.39230518009741],[23.969567731020586,47.391667342753095],[23.981455808954514,47.38946982513493],[23.986157468035774,47.38390488366916],[24.002140668793626,47.37686068811095],[23.999996936861574,47.3659742014307],[24.008825572652615,47.3650068915032],[24.016177764055676,47.36176416323571],[24.022721144781823,47.361963181208104],[24.031364778276803,47.361547907503954],[24.037811774957383,47.37407154559617],[24.04383981145268,47.37368386250271],[24.04897222595785,47.3772190530775],[24.059475654342105,47.377656253927526],[24.06410726980875,47.385625757848715],[24.070469692648384,47.39022831330678],[24.07200804290104,47.396761669593765],[24.07631470291048,47.402762914946095],[24.072031754497,47.40730175082323],[24.076221866258308,47.41202691651136],[24.08333281212108,47.41101067560571],[24.085708153735645,47.41752335048397],[24.093344530382215,47.41752575610012],[24.09406671451723,47.42244856975566],[24.10263260769905,47.42144982786639],[24.109498251096912,47.42680872689656],[24.110354491989025,47.43346101740263],[24.119227225268084,47.43766081075726],[24.121125929336426,47.44288870229794],[24.118025587199753,47.447273871913225],[24.123768842603766,47.45770148374464],[24.120035441275853,47.461809427493264],[24.128822787217757,47.46566950993805],[24.12869235793003,47.46957761869066],[24.123851654527208,47.47328670623399],[24.126471441831587,47.4789885465874],[24.11845426475148,47.47967719348847]]]},"properties":{"id":1954,"natCode":109041,"name":"Suciu de Sus","natLevName":"Comuna","countyId":24,"countyCode":243,"county":"Maramureș","countyMn":"MM","regionId":6,"regionCode":868,"region":"Nord-Vest","version":"2025-03-26"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[23.17507699376298,47.4538815992688],[23.167666772341427,47.45067922868353],[23.154382770447647,47.46083782504852],[23.133762699215264,47.46830939063009],[23.124443196651807,47.47875790339941],[23.11644275555752,47.481648630328365],[23.111060466562222,47.47966601580918],[23.10200741085864,47.47940745988738],[23.094456296559773,47.476781288375015],[23.091803635696284,47.47987757428237],[23.08476341403104,47.48165909355648],[23.065929130122615,47.482255375180586],[23.06087812749775,47.48348016032535],[23.045683366208312,47.484147003677485],[23.04344558810714,47.48043042080998],[23.04737569890126,47.474487876677365],[23.04694299896678,47.46935200266055],[23.05198567009229,47.46392054353295],[23.05008417218998,47.45996650441366],[23.05399804371223,47.455864904449356],[23.047248006883567,47.45098114901445],[23.058799368246184,47.442319503311744],[23.05304782906399,47.43764460196899],[23.058113108469307,47.43672324625623],[23.061037377228086,47.44075633555327],[23.079162363103418,47.444911668561005],[23.087453032705238,47.44341974684231],[23.097267867986396,47.43909713270767],[23.106108367035993,47.44237272007502],[23.108775789632933,47.44395119081095],[23.124042449158082,47.444784593143176],[23.14029710138947,47.44407106295179],[23.156642590467005,47.441496527679305],[23.17507699376298,47.4538815992688]]]},"properties":{"id":1959,"natCode":108366,"name":"Oarța de Jos","natLevName":"Comuna","countyId":24,"countyCode":243,"county":"Maramureș","countyMn":"MM","regionId":6,"regionCode":868,"region":"Nord-Vest","version":"2025-03-26"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[23.04419784495087,47.48719316700374],[23.03147550553701,47.485700012076265],[23.016162494972846,47.48796914144488],[23.013310592924757,47.492308664521744],[23.007217452355484,47.49300352897075],[22.99953099920609,47.49066993039544],[22.994122650494212,47.493540796405135],[22.986977081982133,47.48344277727601],[22.974979010965832,47.48700695173495],[22.963248514270955,47.48646484923252],[22.96148124190921,47.47847548703559],[22.965421161839064,47.474657478148025],[22.970975554334856,47.47645326512703],[22.975316734526547,47.46918618393002],[22.981176405889553,47.46539169473764],[22.9834111291971,47.46063002445144],[22.965329785349372,47.455639166511595],[22.96705183736118,47.44719057323397],[22.964215773137223,47.439446166884174],[22.981020936515296,47.43458878819981],[22.993109324602923,47.43363921226392],[22.99780244938243,47.43079508235541],[23.009933726272518,47.43388079681797],[23.016892117459314,47.43296141337648],[23.023589099105823,47.42947655050838],[23.027451733323975,47.41925389646186],[23.030993447282874,47.41576939934097],[23.03996357139333,47.42152352364092],[23.04372447856473,47.43275650396754],[23.05304782906399,47.43764460196899],[23.058799368246184,47.442319503311744],[23.047248006883567,47.45098114901445],[23.05399804371223,47.455864904449356],[23.05008417218998,47.45996650441366],[23.05198567009229,47.46392054353295],[23.04694299896678,47.46935200266055],[23.04737569890126,47.474487876677365],[23.04344558810714,47.48043042080998],[23.045683366208312,47.484147003677485],[23.04419784495087,47.48719316700374]]]},"properties":{"id":1966,"natCode":107234,"name":"Bicaz","natLevName":"Comuna","countyId":24,"countyCode":243,"county":"Maramureș","countyMn":"MM","regionId":6,"regionCode":868,"region":"Nord-Vest","version":"2025-03-26"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[23.308090612042072,47.5015073363998],[23.29577068960579,47.50235160923395],[23.285340919553335,47.50001564795359],[23.281137169410485,47.504684713886],[23.270024477285077,47.50369108433974],[23.274097989742383,47.515025020961524],[23.266965110364435,47.51274053780097],[23.252689263722495,47.504738388754056],[23.255670462004424,47.496893148772784],[23.24051564181445,47.49374217976584],[23.235130150395946,47.4878560566719],[23.230105068887735,47.487019723970974],[23.217548487363043,47.478016594797424],[23.202348606425165,47.47059545004782],[23.1907294286416,47.46344638371311],[23.195524023046783,47.458762041466784],[23.190756777934894,47.45592428535124],[23.19245843242837,47.45279630103779],[23.205664815631142,47.447875712805995],[23.205473153292534,47.44198018498451],[23.211565788788594,47.437223885821],[23.220588876236498,47.43314923011408],[23.22184025109537,47.4389938361958],[23.225104795858762,47.43986903230598],[23.23710092655015,47.43489210192912],[23.244824999927754,47.43572485484214],[23.254306815007997,47.433239459841296],[23.259223202089576,47.427903301183306],[23.263054706992754,47.428818488760555],[23.269381941716066,47.42515566195138],[23.27749369664046,47.424545981296745],[23.28708626132635,47.426814685623974],[23.287951415222768,47.42276696742887],[23.296386057358017,47.422211951145705],[23.31129411008916,47.423893622441376],[23.316483219686518,47.4195159360513],[23.32306076561832,47.41467097399882],[23.336238517420348,47.4119054572357],[23.34131681929717,47.414899422540856],[23.349996846978087,47.41288014097548],[23.35493001747951,47.41570589129066],[23.355500177497554,47.419224646414804],[23.363396109103345,47.42180509628945],[23.36692310549471,47.42587357284662],[23.36316115014289,47.4328272571368],[23.3631382745071,47.438371988911456],[23.357734224940707,47.44006006229411],[23.355078440591395,47.44657154273689],[23.34574603866765,47.44899338278336],[23.33021859069363,47.45966595700508],[23.324539020108286,47.46085338662208],[23.324094831850054,47.46539614571184],[23.330543821096416,47.471706240132306],[23.324855565668347,47.479454794742864],[23.326494601924562,47.48464782102242],[23.3245011467951,47.48869545649069],[23.309970935213926,47.49521183886861],[23.308090612042072,47.5015073363998]]]},"properties":{"id":1969,"natCode":109265,"name":"Ulmeni","natLevName":"Oras","countyId":24,"countyCode":243,"county":"Maramureș","countyMn":"MM","regionId":6,"regionCode":868,"region":"Nord-Vest","version":"2025-03-26"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[23.163834733915273,47.5020312694887],[23.1505091105694,47.50059433046509],[23.142865724798508,47.50427047619741],[23.126980194277817,47.506352696868305],[23.118140624079537,47.51115852374182],[23.120412466131853,47.51549690526974],[23.113856313944503,47.520909218929056],[23.103750015610597,47.52367621851023],[23.096546772680924,47.530832621071895],[23.08811732691042,47.532987878141704],[23.07609201461149,47.539540572737934],[23.070580707297374,47.541058508032705],[23.05700215820111,47.54191567036651],[23.052956468037387,47.54424448646824],[23.04941453568502,47.539324294673165],[23.05185973230667,47.52971976709502],[23.049458741574266,47.52134856082401],[23.045221039080435,47.518322162692314],[23.04209535580627,47.50755273588244],[23.045706195990793,47.49630727786389],[23.04419784495087,47.48719316700374],[23.045683366208312,47.484147003677485],[23.06087812749775,47.48348016032535],[23.065929130122615,47.482255375180586],[23.08476341403104,47.48165909355648],[23.091803635696284,47.47987757428237],[23.094456296559773,47.476781288375015],[23.10200741085864,47.47940745988738],[23.111060466562222,47.47966601580918],[23.11644275555752,47.481648630328365],[23.124443196651807,47.47875790339941],[23.133762699215264,47.46830939063009],[23.154382770447647,47.46083782504852],[23.167666772341427,47.45067922868353],[23.17507699376298,47.4538815992688],[23.183578978475296,47.45905698351937],[23.18496892074276,47.45485742394734],[23.19245843242837,47.45279630103779],[23.190756777934894,47.45592428535124],[23.195524023046783,47.458762041466784],[23.1907294286416,47.46344638371311],[23.202348606425165,47.47059545004782],[23.19528199153192,47.47715627902843],[23.184142720177153,47.482826323123],[23.178767028109828,47.48767115853987],[23.168294210710926,47.49227848995977],[23.15999835408801,47.4976432372114],[23.163834733915273,47.5020312694887]]]},"properties":{"id":1981,"natCode":107190,"name":"Băsești","natLevName":"Comuna","countyId":24,"countyCode":243,"county":"Maramureș","countyMn":"MM","regionId":6,"regionCode":868,"region":"Nord-Vest","version":"2025-03-26"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[23.608669690833263,47.54833890918531],[23.58153442559559,47.55346840845252],[23.5800621265598,47.55538812502084],[23.563032186932645,47.551794808511104],[23.557060835449192,47.54695177990091],[23.565237948983135,47.54331330933953],[23.563226444164794,47.540114684457016],[23.568414284527087,47.536120812860254],[23.56422711508083,47.53168661956532],[23.557147532197558,47.534092717016016],[23.557572398662902,47.52858099591227],[23.56483678719792,47.52614859483188],[23.566468369360727,47.51692746619551],[23.582271201398473,47.5056737591506],[23.58651025374787,47.50629534395141],[23.593658391240027,47.503084780568145],[23.587238568807123,47.49750408191708],[23.58292691669158,47.496937509276016],[23.574220740144767,47.49162961686175],[23.581288802030347,47.48835256679498],[23.58549630515775,47.48371567338302],[23.59092684286288,47.483274885551566],[23.59749319914261,47.487647259293766],[23.604421139813088,47.487092172120114],[23.616939388463635,47.47881268643407],[23.622380886969488,47.47806049848622],[23.627894147492842,47.48191236965612],[23.62182992608378,47.49005178797946],[23.624134385402634,47.49492010161186],[23.618115856625174,47.50106172932108],[23.620644559937674,47.50638907985593],[23.61482380338435,47.51086448854575],[23.622655267236375,47.51703206345041],[23.625615069685974,47.523576963548656],[23.62164449510742,47.530293501924255],[23.61235730356635,47.53413142165119],[23.611483156965125,47.54660877849626],[23.608669690833263,47.54833890918531]]]},"properties":{"id":1982,"natCode":179837,"name":"Coaș","natLevName":"Comuna","countyId":24,"countyCode":243,"county":"Maramureș","countyMn":"MM","regionId":6,"regionCode":868,"region":"Nord-Vest","version":"2025-03-26"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[23.966933457620573,47.48534438832228],[23.957258476503256,47.482427481289186],[23.94722841374201,47.4771262656722],[23.93587561224362,47.48836085800067],[23.93817987792546,47.49384445563118],[23.93348330759484,47.50079684710773],[23.933047607010348,47.51059848546084],[23.92463192894753,47.51634100529687],[23.922651047069984,47.51954781272448],[23.914188513860495,47.5240680945605],[23.90906311459259,47.52255111888565],[23.896906035614844,47.52266121748242],[23.894498532543846,47.525318774082706],[23.88224443157511,47.52843925097695],[23.877499400064323,47.53348112834018],[23.875251877937718,47.543686515615455],[23.85043627623963,47.55927015546135],[23.84659094043896,47.55468266067595],[23.836434091657804,47.54943504232734],[23.82429312707466,47.548043116916745],[23.80548261412485,47.54020007700242],[23.794780310621846,47.52939898495267],[23.795947695804028,47.52193397606992],[23.799257739826235,47.52018668219206],[23.803218202930317,47.508907298294915],[23.807447597470475,47.50251169914023],[23.80256319430229,47.49914731444141],[23.78338514720786,47.492436771039486],[23.777788976742816,47.487506072501034],[23.77095814277374,47.478551419369445],[23.769440836219665,47.469570491694284],[23.759275361786106,47.47202057269339],[23.74565763885051,47.47032702492173],[23.746173593248564,47.46157676892259],[23.73970395554055,47.46203412893643],[23.723690883333454,47.46210752702631],[23.717537098051636,47.44887333329477],[23.706968072291005,47.44621589989095],[23.70077438376254,47.440715880182346],[23.707444194313698,47.436472281442086],[23.7147218573648,47.43967537934973],[23.72031068731821,47.4359193834356],[23.728568213288955,47.44240860537652],[23.738273199788754,47.444091622087164],[23.744965088055952,47.43643711551104],[23.758070640632308,47.43534113940226],[23.760750206265918,47.43268882980614],[23.768051453569182,47.43197731038492],[23.77442645639027,47.432849399270964],[23.779643267744273,47.4301248816556],[23.789732536210764,47.431861512146206],[23.79618675263837,47.42795238631534],[23.799728693799025,47.43049881745193],[23.81252566245969,47.42732774206698],[23.81265496070872,47.42450366584555],[23.806257703351854,47.41896034208295],[23.806295228603965,47.406520129791716],[23.80184189675465,47.40092785144732],[23.811745472190307,47.388972930730425],[23.80996558962766,47.385941251780345],[23.8092233485351,47.3752837806967],[23.817820725118775,47.36813480144087],[23.82078751957808,47.36989130713776],[23.82807446110009,47.36771719764207],[23.840047007564785,47.372491969172394],[23.846920158715765,47.372460142594896],[23.852448781404146,47.368216015988104],[23.871839865819478,47.37170446639199],[23.8872933983207,47.3656465130469],[23.8885444101784,47.36205856448565],[23.897724923482382,47.354541248919205],[23.907341999283425,47.35443469850043],[23.917244445908025,47.35676795019168],[23.92265229640511,47.352127809027415],[23.933277099974454,47.357130947125],[23.943145762556725,47.3602704056803],[23.956022769128065,47.3595602256379],[23.969374996346385,47.365624672154],[23.983234418398155,47.36509013444393],[23.989565345631718,47.36224322778726],[23.999996936861574,47.3659742014307],[24.002140668793626,47.37686068811095],[23.986157468035774,47.38390488366916],[23.981455808954514,47.38946982513493],[23.969567731020586,47.391667342753095],[23.95703715173714,47.39230518009741],[23.948274037671247,47.39546350506083],[23.94746740697229,47.40230118224095],[23.943776602936467,47.403255380408496],[23.941512523709676,47.41678048049903],[23.943204255074697,47.42571820842291],[23.938736984405498,47.43411840706092],[23.939758193514738,47.43787007595577],[23.937135047162364,47.45120712944853],[23.943940640620898,47.4518085065518],[23.949488960070667,47.45613039889835],[23.96486059660214,47.45219117250363],[23.98367833130302,47.45273132777126],[23.987767437609467,47.45515049162925],[23.976518700957072,47.462622186187055],[23.969011801462507,47.4779070870356],[23.966933457620573,47.48534438832228]]]},"properties":{"id":1984,"natCode":106817,"name":"Târgu Lăpuș","natLevName":"Oras","countyId":24,"countyCode":243,"county":"Maramureș","countyMn":"MM","regionId":6,"regionCode":868,"region":"Nord-Vest","version":"2025-03-26"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[23.473414243262287,47.55360481159923],[23.465957829751186,47.55522014826962],[23.46281304378138,47.553045519980145],[23.447855838404255,47.550741368131],[23.43871471792105,47.548037344929035],[23.44041708878775,47.54266653616337],[23.428533347894625,47.539304700292924],[23.431588709339124,47.53582742747974],[23.42669041842845,47.52534775049772],[23.415757270115652,47.5178128642237],[23.41277058053136,47.50848468893152],[23.406706850959523,47.50672390173189],[23.39758001297167,47.51079171613664],[23.3984536820045,47.49508636436094],[23.40002968638701,47.491535081607424],[23.399505227194414,47.482882738305726],[23.410786774132887,47.47946182329335],[23.424406465190255,47.4735464393817],[23.43166038289722,47.46572676816912],[23.43034010356203,47.45992258124565],[23.43145992508312,47.44828057833254],[23.433903209414897,47.44320458003982],[23.434626734051967,47.44024380307335],[23.440958653319356,47.437113856715214],[23.44518608234868,47.44060938858453],[23.45742335465154,47.44325481716112],[23.465354128493015,47.446728241805715],[23.464966324110158,47.440589420193284],[23.469040665657456,47.44047826771215],[23.47389854400353,47.44773545389671],[23.48459036570738,47.44983123066992],[23.49330321078894,47.44741082180084],[23.49615654657455,47.44407650662445],[23.511210451400245,47.44020423064094],[23.512085292437977,47.43654082713868],[23.50435467938877,47.43393101714526],[23.510864348927115,47.4309057086093],[23.521690364019467,47.43125955470652],[23.537238555280485,47.42917788366423],[23.55092475624033,47.43556219534181],[23.5684102993064,47.433140343262096],[23.582155923385205,47.4349599466368],[23.584888402446776,47.43115688654938],[23.59075226129461,47.430312353540536],[23.602323682866025,47.43738426994467],[23.608578246860233,47.43475643538425],[23.622808025980298,47.433916007415476],[23.62355859377565,47.44373011547277],[23.630035908016314,47.45217321370302],[23.627095543508588,47.459038797700394],[23.622694992879275,47.461527945631275],[23.623861107065757,47.47058555188017],[23.634623511038438,47.47729873846907],[23.627894147492842,47.48191236965612],[23.622380886969488,47.47806049848622],[23.616939388463635,47.47881268643407],[23.604421139813088,47.487092172120114],[23.59749319914261,47.487647259293766],[23.59092684286288,47.483274885551566],[23.589635220096433,47.47742704893074],[23.572285875993014,47.470617726333884],[23.563453885710768,47.469905851920934],[23.553943661892916,47.47591873625777],[23.53771261199108,47.48274498339997],[23.535834598766133,47.4895514298862],[23.52902311555054,47.49005407779946],[23.521569939210625,47.49433840909764],[23.52057316257554,47.49814007104871],[23.513724145723668,47.50048623149166],[23.502665310148608,47.49890422793308],[23.49216564402277,47.50531480275789],[23.482431731401796,47.513184257453815],[23.480785099827376,47.52133053566978],[23.47727495031246,47.52349578234971],[23.48792636607665,47.53383318789689],[23.495360783178096,47.53304343732219],[23.49517026266543,47.540954845441],[23.48862215718703,47.54285792472588],[23.481364423510833,47.54229211209575],[23.47835570317571,47.54555688747962],[23.477760301174186,47.55157782527681],[23.473414243262287,47.55360481159923]]]},"properties":{"id":1985,"natCode":109176,"name":"Șomcuta Mare","natLevName":"Oras","countyId":24,"countyCode":243,"county":"Maramureș","countyMn":"MM","regionId":6,"regionCode":868,"region":"Nord-Vest","version":"2025-03-26"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[23.315669554842756,47.540425311285475],[23.286060413873532,47.53704453108225],[23.2747773291554,47.54546544988475],[23.269246547024363,47.5468360121368],[23.26682765790642,47.55726017384744],[23.26009201797955,47.56362920893295],[23.25815636855331,47.55087214000673],[23.248438010360616,47.54978087019749],[23.254331585223042,47.54027827191368],[23.25429545590331,47.52903996150358],[23.256080555855174,47.527522554488854],[23.260830664406832,47.52546602107377],[23.260560641413036,47.51971021412599],[23.26781148936703,47.518549565189375],[23.266965110364435,47.51274053780097],[23.274097989742383,47.515025020961524],[23.270024477285077,47.50369108433974],[23.281137169410485,47.504684713886],[23.285340919553335,47.50001564795359],[23.29577068960579,47.50235160923395],[23.308090612042072,47.5015073363998],[23.316201935117338,47.507385240295235],[23.314647736044275,47.510935862266884],[23.322434334842047,47.51446194380311],[23.322736953366096,47.520010590473994],[23.314193841586448,47.52147605216444],[23.317978966686006,47.52739724103823],[23.328274381383487,47.51985199762243],[23.331626823434128,47.52555327774182],[23.321781625051347,47.531416281553454],[23.32134916108302,47.5402759216855],[23.315669554842756,47.540425311285475]]]},"properties":{"id":1990,"natCode":108918,"name":"Sălsig","natLevName":"Comuna","countyId":24,"countyCode":243,"county":"Maramureș","countyMn":"MM","regionId":6,"regionCode":868,"region":"Nord-Vest","version":"2025-03-26"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[23.34535980859804,47.565467890942145],[23.34610470077811,47.567154212686646],[23.341737093106147,47.56443163429784],[23.33123676391565,47.56556183972206],[23.326408900488453,47.56064587282072],[23.332510814602447,47.557586869396694],[23.334646861003545,47.55215419049224],[23.330908399243942,47.5480824031849],[23.31933371940287,47.54720070035944],[23.315669554842756,47.540425311285475],[23.32134916108302,47.5402759216855],[23.321781625051347,47.531416281553454],[23.331626823434128,47.52555327774182],[23.328274381383487,47.51985199762243],[23.317978966686006,47.52739724103823],[23.314193841586448,47.52147605216444],[23.322736953366096,47.520010590473994],[23.322434334842047,47.51446194380311],[23.314647736044275,47.510935862266884],[23.316201935117338,47.507385240295235],[23.308090612042072,47.5015073363998],[23.309970935213926,47.49521183886861],[23.3245011467951,47.48869545649069],[23.326494601924562,47.48464782102242],[23.324855565668347,47.479454794742864],[23.330543821096416,47.471706240132306],[23.324094831850054,47.46539614571184],[23.324539020108286,47.46085338662208],[23.33021859069363,47.45966595700508],[23.34574603866765,47.44899338278336],[23.355078440591395,47.44657154273689],[23.357734224940707,47.44006006229411],[23.3631382745071,47.438371988911456],[23.36316115014289,47.4328272571368],[23.36692310549471,47.42587357284662],[23.37283842429637,47.427776130868345],[23.374438358364774,47.437218531607336],[23.383858538200183,47.43503307941105],[23.39308358243584,47.435073091823014],[23.39262585268964,47.4385929692681],[23.402104691891033,47.43793823415585],[23.40304644247555,47.43442637373289],[23.417260578590895,47.42908914160794],[23.424676104036823,47.428541764559355],[23.433201011123725,47.43413659447257],[23.433903209414897,47.44320458003982],[23.43145992508312,47.44828057833254],[23.43034010356203,47.45992258124565],[23.43166038289722,47.46572676816912],[23.424406465190255,47.4735464393817],[23.410786774132887,47.47946182329335],[23.399505227194414,47.482882738305726],[23.40002968638701,47.491535081607424],[23.3984536820045,47.49508636436094],[23.39758001297167,47.51079171613664],[23.387390227829083,47.513525441462555],[23.384686063694055,47.51796998773723],[23.372409212628124,47.5185914311869],[23.367111439122443,47.515617951854786],[23.360931175603376,47.51980388399937],[23.365901910160574,47.52575026460077],[23.35856829803806,47.52796076985059],[23.359475879918023,47.53280387890708],[23.356299030056206,47.53791758927389],[23.348443316361216,47.5394772589097],[23.350683430520473,47.54341011069468],[23.360938808832337,47.54842061429316],[23.35341099449318,47.56020789006048],[23.345668130177994,47.55758395409379],[23.34535980859804,47.565467890942145]]]},"properties":{"id":1991,"natCode":108268,"name":"Mireșu Mare","natLevName":"Comuna","countyId":24,"countyCode":243,"county":"Maramureș","countyMn":"MM","regionId":6,"regionCode":868,"region":"Nord-Vest","version":"2025-03-26"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[23.496769077419962,47.57323817783531],[23.48283677445471,47.57237383788079],[23.473808504149634,47.56655541229897],[23.47870371253624,47.56356362658653],[23.473414243262287,47.55360481159923],[23.477760301174186,47.55157782527681],[23.47835570317571,47.54555688747962],[23.481364423510833,47.54229211209575],[23.48862215718703,47.54285792472588],[23.49517026266543,47.540954845441],[23.495360783178096,47.53304343732219],[23.48792636607665,47.53383318789689],[23.47727495031246,47.52349578234971],[23.480785099827376,47.52133053566978],[23.482431731401796,47.513184257453815],[23.49216564402277,47.50531480275789],[23.502665310148608,47.49890422793308],[23.513724145723668,47.50048623149166],[23.52057316257554,47.49814007104871],[23.521569939210625,47.49433840909764],[23.52902311555054,47.49005407779946],[23.535834598766133,47.4895514298862],[23.53771261199108,47.48274498339997],[23.553943661892916,47.47591873625777],[23.563453885710768,47.469905851920934],[23.572285875993014,47.470617726333884],[23.589635220096433,47.47742704893074],[23.59092684286288,47.483274885551566],[23.58549630515775,47.48371567338302],[23.581288802030347,47.48835256679498],[23.574220740144767,47.49162961686175],[23.58292691669158,47.496937509276016],[23.587238568807123,47.49750408191708],[23.593658391240027,47.503084780568145],[23.58651025374787,47.50629534395141],[23.582271201398473,47.5056737591506],[23.566468369360727,47.51692746619551],[23.56483678719792,47.52614859483188],[23.557572398662902,47.52858099591227],[23.557147532197558,47.534092717016016],[23.56422711508083,47.53168661956532],[23.568414284527087,47.536120812860254],[23.563226444164794,47.540114684457016],[23.565237948983135,47.54331330933953],[23.557060835449192,47.54695177990091],[23.543266356149495,47.5512351807485],[23.537475757354823,47.549246197025326],[23.525462478690855,47.54957563467779],[23.51713573041278,47.56188958037542],[23.524566486450084,47.570729062357316],[23.515648195735395,47.56747541930476],[23.50040749720093,47.56999604742274],[23.496769077419962,47.57323817783531]]]},"properties":{"id":1993,"natCode":108491,"name":"Remetea Chioarului","natLevName":"Comuna","countyId":24,"countyCode":243,"county":"Maramureș","countyMn":"MM","regionId":6,"regionCode":868,"region":"Nord-Vest","version":"2025-03-26"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[23.281397774694994,47.576882782827354],[23.266305900550684,47.58071287901229],[23.260719513614607,47.58086738706161],[23.257208871761005,47.57178345774071],[23.26009201797955,47.56362920893295],[23.26682765790642,47.55726017384744],[23.269246547024363,47.5468360121368],[23.2747773291554,47.54546544988475],[23.286060413873532,47.53704453108225],[23.315669554842756,47.540425311285475],[23.31933371940287,47.54720070035944],[23.330908399243942,47.5480824031849],[23.334646861003545,47.55215419049224],[23.332510814602447,47.557586869396694],[23.326408900488453,47.56064587282072],[23.33123676391565,47.56556183972206],[23.341737093106147,47.56443163429784],[23.34610470077811,47.567154212686646],[23.325182501010556,47.56974355563514],[23.31898018527801,47.5684828415524],[23.30274841222337,47.568400870550015],[23.289922482974507,47.570954242616104],[23.281397774694994,47.576882782827354]]]},"properties":{"id":1999,"natCode":179855,"name":"Gârdani","natLevName":"Comuna","countyId":24,"countyCode":243,"county":"Maramureș","countyMn":"MM","regionId":6,"regionCode":868,"region":"Nord-Vest","version":"2025-03-26"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[23.228547119239963,47.520382013744324],[23.221010204974434,47.52350375366418],[23.210869667423292,47.5324106641484],[23.201391651283135,47.530376838849456],[23.187635649562704,47.53838789510912],[23.182889480926,47.54328536574392],[23.174521574013298,47.54226449547707],[23.164650313803822,47.54999638515225],[23.15399199894858,47.54920525253954],[23.15335565930907,47.555141613709964],[23.150240171194735,47.55827870281216],[23.142215156979017,47.56012398734024],[23.133506168263953,47.553177076950604],[23.118265734282538,47.560263280869364],[23.10354590186526,47.56148060309118],[23.092125734193583,47.56630881010633],[23.088804426992343,47.57435130455376],[23.079310949146027,47.57939061130238],[23.065323905766157,47.57130842298416],[23.060350494858515,47.565531210895294],[23.059375852180455,47.56029378580454],[23.052688342414115,47.55400211853539],[23.052956468037387,47.54424448646824],[23.05700215820111,47.54191567036651],[23.070580707297374,47.541058508032705],[23.07609201461149,47.539540572737934],[23.08811732691042,47.532987878141704],[23.096546772680924,47.530832621071895],[23.103750015610597,47.52367621851023],[23.113856313944503,47.520909218929056],[23.120412466131853,47.51549690526974],[23.118140624079537,47.51115852374182],[23.126980194277817,47.506352696868305],[23.142865724798508,47.50427047619741],[23.1505091105694,47.50059433046509],[23.163834733915273,47.5020312694887],[23.159568270525426,47.50981633141545],[23.15611591153546,47.51072499721887],[23.161499267031417,47.51985494488241],[23.17866446590782,47.51722432830266],[23.186161565047044,47.5139364554598],[23.19474349001288,47.512991228243926],[23.20714189489578,47.513688377900735],[23.21502312618086,47.51193005698645],[23.227905627327484,47.5168642154281],[23.228547119239963,47.520382013744324]]]},"properties":{"id":2000,"natCode":107118,"name":"Băița de Sub Codru","natLevName":"Comuna","countyId":24,"countyCode":243,"county":"Maramureș","countyMn":"MM","regionId":6,"regionCode":868,"region":"Nord-Vest","version":"2025-03-26"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[23.77634700696613,47.57659484492142],[23.761171070711637,47.58034277963038],[23.755694721994452,47.5853369704358],[23.752493260130297,47.58306030905732],[23.738075096597576,47.57854152187007],[23.714461171795172,47.58900881296964],[23.703555373073865,47.59162601027813],[23.697137466121116,47.590880868266716],[23.690652080802035,47.58415265653856],[23.689856331488034,47.579372480306674],[23.68224340220125,47.572189443182694],[23.682163861224538,47.56733291170758],[23.67020397835511,47.56143906689198],[23.65992391532485,47.55949950013289],[23.65772721860038,47.55632077614919],[23.646342291487745,47.554220553126626],[23.64155817878069,47.55582916119556],[23.631474645911673,47.55577989828077],[23.62574953951434,47.557901829228435],[23.621221317066972,47.55932610412147],[23.620092461968753,47.55240638680038],[23.608669690833263,47.54833890918531],[23.611483156965125,47.54660877849626],[23.61235730356635,47.53413142165119],[23.62164449510742,47.530293501924255],[23.625615069685974,47.523576963548656],[23.622655267236375,47.51703206345041],[23.61482380338435,47.51086448854575],[23.620644559937674,47.50638907985593],[23.618115856625174,47.50106172932108],[23.624134385402634,47.49492010161186],[23.62182992608378,47.49005178797946],[23.627894147492842,47.48191236965612],[23.634623511038438,47.47729873846907],[23.623861107065757,47.47058555188017],[23.622694992879275,47.461527945631275],[23.627095543508588,47.459038797700394],[23.630035908016314,47.45217321370302],[23.640172185214393,47.453677087652366],[23.648635496034807,47.45078583756225],[23.65313102979134,47.45385792314935],[23.660763347600895,47.45537757343785],[23.65995062848506,47.45964907934108],[23.670247309617697,47.461986231755546],[23.687248000219153,47.45814015061024],[23.690496417379702,47.44861557449918],[23.689442163567843,47.441182439725154],[23.70077438376254,47.440715880182346],[23.706968072291005,47.44621589989095],[23.717537098051636,47.44887333329477],[23.723690883333454,47.46210752702631],[23.73970395554055,47.46203412893643],[23.73655556364527,47.47670651767966],[23.727329463969134,47.473595269389286],[23.723580300989113,47.4782814183713],[23.713042736998247,47.48245216649746],[23.719610841217627,47.49064195781588],[23.723522294408586,47.5036704591066],[23.719385057805567,47.5085571019111],[23.7251083085883,47.51558797090123],[23.72611081873011,47.52090536744869],[23.738031967547766,47.52938189108632],[23.743006739638833,47.534527724082274],[23.74645905859472,47.544650391490165],[23.75831106875589,47.55143834949229],[23.75882461790404,47.55510775212505],[23.76932522660957,47.55886287939098],[23.774318913456938,47.56229447445052],[23.774737944043675,47.566560867098836],[23.779682225054692,47.57092515079572],[23.77634700696613,47.57659484492142]]]},"properties":{"id":2002,"natCode":107733,"name":"Copalnic-Mănăștur","natLevName":"Comuna","countyId":24,"countyCode":243,"county":"Maramureș","countyMn":"MM","regionId":6,"regionCode":868,"region":"Nord-Vest","version":"2025-03-26"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[24.152586305706947,47.60186879993444],[24.13595184678054,47.60174125573745],[24.114790502077064,47.59457815865186],[24.112237331515686,47.58791838966769],[24.10087922710706,47.57859692862159],[24.101062040021976,47.56972996766532],[24.09343389816586,47.56358451760002],[24.08215024188463,47.558484047038704],[24.07418333432962,47.550622038734645],[24.069870557107848,47.55008003210608],[24.066544169191907,47.54067201810219],[24.067686287529323,47.528572129171906],[24.06090888326668,47.52201236078883],[24.05559329411649,47.51373522385108],[24.051148184574526,47.511051311085176],[24.049455483928163,47.506340188719506],[24.052383040658132,47.50408245531206],[24.045572968355682,47.494883622619064],[24.048347632374654,47.489724992253585],[24.04426768559335,47.488566995954514],[24.04426275591175,47.47997996685777],[24.04234336614419,47.47545076701809],[24.044146784299997,47.47013582475891],[24.05070787156396,47.46923168458183],[24.057789422824136,47.46574554603945],[24.058655410649983,47.46259740115217],[24.0763202600007,47.45971445622871],[24.07668388804106,47.46894399368129],[24.08430555753766,47.469258703247874],[24.08789589563729,47.4762105252819],[24.091499686482884,47.4775740886695],[24.10942460467751,47.479869892046665],[24.11845426475148,47.47967719348847],[24.121379982687998,47.48452575977994],[24.12357065211111,47.49314538268628],[24.128247764052993,47.49390310649718],[24.13427325456917,47.488892091379704],[24.14140196736326,47.48754978326667],[24.146574550279315,47.494211802500054],[24.153006602479014,47.494435329356165],[24.153612340470108,47.50286176390045],[24.1629152233276,47.50481628538604],[24.182021468539748,47.50719038513292],[24.188907915576934,47.50338266160035],[24.19754792196938,47.50632500486943],[24.201666452065616,47.50440599268338],[24.20452665995738,47.49809955714484],[24.2163084807978,47.503557467328385],[24.237164764012125,47.49894026642595],[24.24349709002147,47.50194087410538],[24.245838653580947,47.51193380280891],[24.25414642084972,47.51975091287907],[24.258542726335012,47.520408226334894],[24.25652480390957,47.526286802780646],[24.249830512760663,47.527801959020614],[24.24624831958813,47.534304132004664],[24.238035127248573,47.536411269770035],[24.22428886809764,47.54279692308912],[24.223084998556423,47.54650691137889],[24.21737807860931,47.54814071514602],[24.200445747789555,47.547251666139175],[24.19103881167581,47.554885898358016],[24.18688396824015,47.561166158792375],[24.190696527543604,47.56591789661161],[24.18787581045992,47.57238479492648],[24.174908388237554,47.57957829316159],[24.16960094397776,47.578733394318874],[24.16540881528261,47.58339384013025],[24.165866593244065,47.587902579534955],[24.154915892897638,47.59325971392094],[24.152586305706947,47.60186879993444]]]},"properties":{"id":2007,"natCode":179622,"name":"Groșii Țibleșului","natLevName":"Comuna","countyId":24,"countyCode":243,"county":"Maramureș","countyMn":"MM","regionId":6,"regionCode":868,"region":"Nord-Vest","version":"2025-03-26"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[23.55987254311743,47.60359164206928],[23.55310570639043,47.59899915449268],[23.553148805806085,47.596513996342516],[23.54050986781679,47.59598374118947],[23.53909912538427,47.588051446721416],[23.530508357814607,47.58446773521659],[23.52546295326516,47.57616970619073],[23.524566486450084,47.570729062357316],[23.51713573041278,47.56188958037542],[23.525462478690855,47.54957563467779],[23.537475757354823,47.549246197025326],[23.543266356149495,47.5512351807485],[23.557060835449192,47.54695177990091],[23.563032186932645,47.551794808511104],[23.5800621265598,47.55538812502084],[23.58153442559559,47.55346840845252],[23.608669690833263,47.54833890918531],[23.620092461968753,47.55240638680038],[23.621221317066972,47.55932610412147],[23.62574953951434,47.557901829228435],[23.630069103073065,47.5635414005494],[23.626309836168865,47.567000072743284],[23.61958861858498,47.56918363591654],[23.61023577122322,47.56964025407774],[23.603515722611142,47.57356680396733],[23.589473955506566,47.5783150829512],[23.582892476709315,47.577832769732325],[23.580755666979957,47.58195251621625],[23.585365290925658,47.585455705884705],[23.578304733018797,47.58757974418586],[23.571009549439825,47.58408101140798],[23.568301222656395,47.59105079078662],[23.569969335215216,47.59648658209766],[23.56702598103916,47.6012350922386],[23.55987254311743,47.60359164206928]]]},"properties":{"id":2010,"natCode":108794,"name":"Săcălășeni","natLevName":"Comuna","countyId":24,"countyCode":243,"county":"Maramureș","countyMn":"MM","regionId":6,"regionCode":868,"region":"Nord-Vest","version":"2025-03-26"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[23.968548829192667,47.57467886357622],[23.9532921275392,47.585139157385036],[23.95215946236306,47.59547433350035],[23.947774769564294,47.59869073305039],[23.940434585765626,47.59937700862314],[23.931059813324563,47.60669758468371],[23.922758341745947,47.607405737980784],[23.910950641408093,47.60555642090136],[23.90108112931677,47.613492032003904],[23.893469201081427,47.60709196052724],[23.8845317200499,47.60247550798663],[23.884685473348178,47.595513099384426],[23.874228091888142,47.59063239891832],[23.86541144565581,47.57892895180774],[23.85684244718911,47.57619395093456],[23.850369617437632,47.570702933171944],[23.852288296248595,47.56529195156549],[23.85043627623963,47.55927015546135],[23.875251877937718,47.543686515615455],[23.877499400064323,47.53348112834018],[23.88224443157511,47.52843925097695],[23.894498532543846,47.525318774082706],[23.896906035614844,47.52266121748242],[23.90906311459259,47.52255111888565],[23.914188513860495,47.5240680945605],[23.922651047069984,47.51954781272448],[23.92463192894753,47.51634100529687],[23.933047607010348,47.51059848546084],[23.93348330759484,47.50079684710773],[23.93817987792546,47.49384445563118],[23.93587561224362,47.48836085800067],[23.94722841374201,47.4771262656722],[23.957258476503256,47.482427481289186],[23.966933457620573,47.48534438832228],[23.964953056834137,47.48758916230773],[23.97474164477385,47.494418209115956],[23.98285983976796,47.49425206291201],[23.98254060720846,47.49952915501824],[23.992510121625216,47.50519929375486],[23.99384186046428,47.509520414259825],[24.00383804617534,47.50882922148828],[24.00259880846816,47.51680010742948],[23.993542236856204,47.5155299702394],[23.98906121118569,47.51119685069122],[23.983890920370456,47.51013913460977],[23.98032304763552,47.52056322794137],[23.98308882112559,47.526924565669],[23.97927035278789,47.53362497888831],[23.981006819523174,47.53671501606972],[23.96787829385789,47.54267642088492],[23.963698859222227,47.54903220631038],[23.96827351970474,47.55270754572479],[23.96425115897574,47.55542378216659],[23.960931053353686,47.562818827753496],[23.962818970245806,47.57113057291241],[23.968548829192667,47.57467886357622]]]},"properties":{"id":2013,"natCode":107920,"name":"Cupșeni","natLevName":"Comuna","countyId":24,"countyCode":243,"county":"Maramureș","countyMn":"MM","regionId":6,"regionCode":868,"region":"Nord-Vest","version":"2025-03-26"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[24.114790502077064,47.59457815865186],[24.111562412747766,47.59581874147342],[24.109164388772086,47.60574989481946],[24.11230555346602,47.607929764974664],[24.11431041242188,47.615727060336056],[24.104341686043288,47.615468869912306],[24.09381888360108,47.61056473528624],[24.08908250853649,47.61252482400754],[24.076126279291294,47.61002177176494],[24.06193765138664,47.61151517908621],[24.057295759433455,47.607389011731485],[24.05634655607491,47.602360992224625],[24.051325882666372,47.59648832873804],[24.047187596601223,47.58546754319464],[24.04869206748887,47.578177223615505],[24.04396810327548,47.57782856947057],[24.03873054304563,47.56949060456784],[24.03317692751391,47.5678138780512],[24.026538352331954,47.56073746064109],[24.018768899895363,47.560982261636866],[24.008527395025407,47.56327908531047],[24.003110311929458,47.56263464987482],[23.995831842269503,47.568584339847625],[23.98313730810102,47.568145688269155],[23.974006030609527,47.57119666917017],[23.968548829192667,47.57467886357622],[23.962818970245806,47.57113057291241],[23.960931053353686,47.562818827753496],[23.96425115897574,47.55542378216659],[23.96827351970474,47.55270754572479],[23.963698859222227,47.54903220631038],[23.96787829385789,47.54267642088492],[23.981006819523174,47.53671501606972],[23.97927035278789,47.53362497888831],[23.98308882112559,47.526924565669],[23.98032304763552,47.52056322794137],[23.983890920370456,47.51013913460977],[23.98906121118569,47.51119685069122],[23.993542236856204,47.5155299702394],[24.00259880846816,47.51680010742948],[24.00383804617534,47.50882922148828],[23.99384186046428,47.509520414259825],[23.992510121625216,47.50519929375486],[23.98254060720846,47.49952915501824],[23.98285983976796,47.49425206291201],[23.97474164477385,47.494418209115956],[23.964953056834137,47.48758916230773],[23.966933457620573,47.48534438832228],[23.969011801462507,47.4779070870356],[23.976518700957072,47.462622186187055],[23.987767437609467,47.45515049162925],[24.00485927608696,47.462067880022786],[24.013602302588147,47.45998878155993],[24.014549205632523,47.46465299613518],[24.02304491190457,47.46388883275463],[24.033197619337137,47.46933000244163],[24.0332965450358,47.47457068358763],[24.04234336614419,47.47545076701809],[24.04426275591175,47.47997996685777],[24.04426768559335,47.488566995954514],[24.048347632374654,47.489724992253585],[24.045572968355682,47.494883622619064],[24.052383040658132,47.50408245531206],[24.049455483928163,47.506340188719506],[24.051148184574526,47.511051311085176],[24.05559329411649,47.51373522385108],[24.06090888326668,47.52201236078883],[24.067686287529323,47.528572129171906],[24.066544169191907,47.54067201810219],[24.069870557107848,47.55008003210608],[24.07418333432962,47.550622038734645],[24.08215024188463,47.558484047038704],[24.09343389816586,47.56358451760002],[24.101062040021976,47.56972996766532],[24.10087922710706,47.57859692862159],[24.112237331515686,47.58791838966769],[24.114790502077064,47.59457815865186]]]},"properties":{"id":2014,"natCode":108222,"name":"Lăpuș","natLevName":"Comuna","countyId":24,"countyCode":243,"county":"Maramureș","countyMn":"MM","regionId":6,"regionCode":868,"region":"Nord-Vest","version":"2025-03-26"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[23.49875663526759,47.58541257496485],[23.483058155967942,47.59265105907415],[23.47405036677636,47.595116618267326],[23.466128829877942,47.59384333468462],[23.453534165065875,47.59952102979112],[23.44891703980233,47.60427896276108],[23.440190756437215,47.60453173048244],[23.42668472637016,47.609506173747455],[23.422635617707755,47.61555567840126],[23.42015073460208,47.609100235301],[23.415341288759105,47.609993363959354],[23.41321287662224,47.60406937169834],[23.401740213987612,47.596918519991995],[23.39804562280632,47.59657550647162],[23.392097866227157,47.59627061646532],[23.38480751981869,47.58832664479784],[23.390749299653258,47.586342447368146],[23.39160835497808,47.581655601713386],[23.373654180977187,47.57650578848151],[23.37061694634684,47.57292242549756],[23.361338338189903,47.574184194197024],[23.361084452789278,47.56980154631659],[23.365653675084474,47.56540730326373],[23.361576784369806,47.563187615166335],[23.355117971774998,47.564424068478985],[23.350521729296858,47.56904770011648],[23.357866147869384,47.5744277317069],[23.345062328482545,47.57479337109593],[23.349495785806347,47.567182001309824],[23.34535980859804,47.565467890942145],[23.345668130177994,47.55758395409379],[23.35341099449318,47.56020789006048],[23.360938808832337,47.54842061429316],[23.350683430520473,47.54341011069468],[23.348443316361216,47.5394772589097],[23.356299030056206,47.53791758927389],[23.359475879918023,47.53280387890708],[23.35856829803806,47.52796076985059],[23.365901910160574,47.52575026460077],[23.360931175603376,47.51980388399937],[23.367111439122443,47.515617951854786],[23.372409212628124,47.5185914311869],[23.384686063694055,47.51796998773723],[23.387390227829083,47.513525441462555],[23.39758001297167,47.51079171613664],[23.406706850959523,47.50672390173189],[23.41277058053136,47.50848468893152],[23.415757270115652,47.5178128642237],[23.42669041842845,47.52534775049772],[23.431588709339124,47.53582742747974],[23.428533347894625,47.539304700292924],[23.44041708878775,47.54266653616337],[23.43871471792105,47.548037344929035],[23.447855838404255,47.550741368131],[23.46281304378138,47.553045519980145],[23.465957829751186,47.55522014826962],[23.473414243262287,47.55360481159923],[23.47870371253624,47.56356362658653],[23.473808504149634,47.56655541229897],[23.48283677445471,47.57237383788079],[23.496769077419962,47.57323817783531],[23.50253506973941,47.57487570747315],[23.503738131926507,47.578518549845164],[23.497546429717723,47.58297575247165],[23.49875663526759,47.58541257496485]]]},"properties":{"id":2015,"natCode":108712,"name":"Satulung","natLevName":"Comuna","countyId":24,"countyCode":243,"county":"Maramureș","countyMn":"MM","regionId":6,"regionCode":868,"region":"Nord-Vest","version":"2025-03-26"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[23.545292374649716,47.6088200687997],[23.54007411195697,47.612924409656024],[23.531324058751924,47.61442393804163],[23.52691676187375,47.611421521668966],[23.520930673346086,47.611277661252274],[23.520354233177727,47.61800705688],[23.50860309666917,47.61872802947389],[23.504329431349724,47.612093561493275],[23.507615330669672,47.606419986917885],[23.50596580186611,47.59911691027392],[23.500024264923955,47.592935721019415],[23.49875663526759,47.58541257496485],[23.497546429717723,47.58297575247165],[23.503738131926507,47.578518549845164],[23.50253506973941,47.57487570747315],[23.496769077419962,47.57323817783531],[23.50040749720093,47.56999604742274],[23.515648195735395,47.56747541930476],[23.524566486450084,47.570729062357316],[23.52546295326516,47.57616970619073],[23.530508357814607,47.58446773521659],[23.53909912538427,47.588051446721416],[23.54050986781679,47.59598374118947],[23.553148805806085,47.596513996342516],[23.55310570639043,47.59899915449268],[23.55987254311743,47.60359164206928],[23.552656271118583,47.60428764029137],[23.55173427004169,47.6093566578864],[23.545292374649716,47.6088200687997]]]},"properties":{"id":2016,"natCode":179846,"name":"Coltău","natLevName":"Comuna","countyId":24,"countyCode":243,"county":"Maramureș","countyMn":"MM","regionId":6,"regionCode":868,"region":"Nord-Vest","version":"2025-03-26"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[23.14258623644335,47.62427351558527],[23.121971043494064,47.614489619434806],[23.11801936503445,47.607734903792874],[23.11176457163722,47.60110715060876],[23.106665325741645,47.5986560882346],[23.100626307983614,47.591819523350736],[23.08931837318348,47.5853288589227],[23.087687510666843,47.58180166373692],[23.079310949146027,47.57939061130238],[23.088804426992343,47.57435130455376],[23.092125734193583,47.56630881010633],[23.10354590186526,47.56148060309118],[23.118265734282538,47.560263280869364],[23.133506168263953,47.553177076950604],[23.142215156979017,47.56012398734024],[23.150240171194735,47.55827870281216],[23.15335565930907,47.555141613709964],[23.15399199894858,47.54920525253954],[23.164650313803822,47.54999638515225],[23.174521574013298,47.54226449547707],[23.182889480926,47.54328536574392],[23.187635649562704,47.53838789510912],[23.201391651283135,47.530376838849456],[23.210869667423292,47.5324106641484],[23.221010204974434,47.52350375366418],[23.228547119239963,47.520382013744324],[23.233847659627276,47.52465348991337],[23.240283362325798,47.525836985108384],[23.248720273489827,47.52340914188371],[23.256080555855174,47.527522554488854],[23.25429545590331,47.52903996150358],[23.254331585223042,47.54027827191368],[23.248438010360616,47.54978087019749],[23.238877051970043,47.552181348853644],[23.234031142630243,47.55037580053188],[23.229514169869503,47.55415727543626],[23.211226001358284,47.56549397065038],[23.21166058810149,47.57059148864673],[23.20259467637604,47.575350988810406],[23.18693523020709,47.58108432575405],[23.189766043436524,47.58669950268506],[23.177989729768456,47.59134113871606],[23.16695045440514,47.59358991700423],[23.16073315709806,47.599420696801516],[23.146042352950058,47.61824301001532],[23.14258623644335,47.62427351558527]]]},"properties":{"id":2021,"natCode":107083,"name":"Asuaju de Sus","natLevName":"Comuna","countyId":24,"countyCode":243,"county":"Maramureș","countyMn":"MM","regionId":6,"regionCode":868,"region":"Nord-Vest","version":"2025-03-26"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[23.61712354987371,47.630641359361015],[23.59491408179484,47.62931622160136],[23.593006499413747,47.63484018929773],[23.58468478523981,47.63796246801151],[23.563397244791204,47.63061838572322],[23.561409807930374,47.62689334237188],[23.544189697249838,47.62274306483931],[23.542636228227202,47.613734878772036],[23.545292374649716,47.6088200687997],[23.55173427004169,47.6093566578864],[23.552656271118583,47.60428764029137],[23.55987254311743,47.60359164206928],[23.56702598103916,47.6012350922386],[23.569969335215216,47.59648658209766],[23.568301222656395,47.59105079078662],[23.571009549439825,47.58408101140798],[23.578304733018797,47.58757974418586],[23.57947128549095,47.590321486320605],[23.591642277537073,47.591898423674984],[23.59947088868021,47.596796519894035],[23.614029895516122,47.600360289365355],[23.620316765823524,47.60353633958916],[23.630050192750314,47.60541228103401],[23.627462572561743,47.60841992005288],[23.62848048383916,47.618511466649935],[23.63119038330165,47.62317617397181],[23.627549550101406,47.62759957893719],[23.61712354987371,47.630641359361015]]]},"properties":{"id":2023,"natCode":106363,"name":"Groși","natLevName":"Comuna","countyId":24,"countyCode":243,"county":"Maramureș","countyMn":"MM","regionId":6,"regionCode":868,"region":"Nord-Vest","version":"2025-03-26"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[23.678516960409663,47.64661461355962],[23.667389870902817,47.64396882995686],[23.66518599721921,47.63984091965311],[23.659851472394458,47.63928536558789],[23.656582670949934,47.63312143782104],[23.651536315371636,47.62990013204358],[23.643072292749885,47.62865810271583],[23.63119038330165,47.62317617397181],[23.62848048383916,47.618511466649935],[23.627462572561743,47.60841992005288],[23.630050192750314,47.60541228103401],[23.620316765823524,47.60353633958916],[23.614029895516122,47.600360289365355],[23.59947088868021,47.596796519894035],[23.591642277537073,47.591898423674984],[23.57947128549095,47.590321486320605],[23.578304733018797,47.58757974418586],[23.585365290925658,47.585455705884705],[23.580755666979957,47.58195251621625],[23.582892476709315,47.577832769732325],[23.589473955506566,47.5783150829512],[23.603515722611142,47.57356680396733],[23.61023577122322,47.56964025407774],[23.61958861858498,47.56918363591654],[23.626309836168865,47.567000072743284],[23.630069103073065,47.5635414005494],[23.62574953951434,47.557901829228435],[23.631474645911673,47.55577989828077],[23.64155817878069,47.55582916119556],[23.646342291487745,47.554220553126626],[23.65772721860038,47.55632077614919],[23.65992391532485,47.55949950013289],[23.67020397835511,47.56143906689198],[23.682163861224538,47.56733291170758],[23.68224340220125,47.572189443182694],[23.689856331488034,47.579372480306674],[23.690652080802035,47.58415265653856],[23.697137466121116,47.590880868266716],[23.693230708533747,47.5972354397793],[23.713488607372454,47.59604741563511],[23.716475688524685,47.60051448035226],[23.70817366367939,47.608894116196765],[23.713378062630742,47.61551491865804],[23.71006754502349,47.620026127128746],[23.703117262014665,47.61511274013277],[23.696734677594414,47.61750677451957],[23.690222425927466,47.61536836557462],[23.688162426228338,47.61873374364712],[23.686006377109113,47.62985869844628],[23.686950131541916,47.63576141602585],[23.68398520358637,47.64090254931827],[23.678549399246023,47.64171228809604],[23.678516960409663,47.64661461355962]]]},"properties":{"id":2026,"natCode":108035,"name":"Dumbrăvița","natLevName":"Comuna","countyId":24,"countyCode":243,"county":"Maramureș","countyMn":"MM","regionId":6,"regionCode":868,"region":"Nord-Vest","version":"2025-03-26"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[23.39804562280632,47.59657550647162],[23.393664779093257,47.59809611603091],[23.39329663562887,47.60232271917934],[23.381455863883428,47.60795482877064],[23.385912009188164,47.61362485865258],[23.384484147520954,47.616014910995624],[23.373251118971382,47.616041431525254],[23.36709421774908,47.618357640487254],[23.352071270250132,47.61578828739738],[23.346379066019416,47.617006045056954],[23.341863152571186,47.62342324678945],[23.346747700298074,47.63145315401563],[23.343000681296186,47.640974311330936],[23.33994862957676,47.64383368128955],[23.327796197201245,47.63955292968216],[23.31472454756368,47.638006562886915],[23.30805655445299,47.6344170790135],[23.303537700025117,47.62719326413011],[23.287497940956573,47.630103903912804],[23.284814202235847,47.62494813588667],[23.2845519008765,47.61414349845407],[23.27962715307165,47.61274873631441],[23.279530634877368,47.60967395489632],[23.287399274026647,47.60402619589354],[23.289105453505943,47.597238017999054],[23.288978623395625,47.5887180854385],[23.28642082380739,47.58095527223255],[23.281397774694994,47.576882782827354],[23.289922482974507,47.570954242616104],[23.30274841222337,47.568400870550015],[23.31898018527801,47.5684828415524],[23.325182501010556,47.56974355563514],[23.34610470077811,47.567154212686646],[23.34535980859804,47.565467890942145],[23.349495785806347,47.567182001309824],[23.345062328482545,47.57479337109593],[23.357866147869384,47.5744277317069],[23.350521729296858,47.56904770011648],[23.355117971774998,47.564424068478985],[23.361576784369806,47.563187615166335],[23.365653675084474,47.56540730326373],[23.361084452789278,47.56980154631659],[23.361338338189903,47.574184194197024],[23.37061694634684,47.57292242549756],[23.373654180977187,47.57650578848151],[23.39160835497808,47.581655601713386],[23.390749299653258,47.586342447368146],[23.38480751981869,47.58832664479784],[23.392097866227157,47.59627061646532],[23.39804562280632,47.59657550647162]]]},"properties":{"id":2027,"natCode":108106,"name":"Fărcașa","natLevName":"Comuna","countyId":24,"countyCode":243,"county":"Maramureș","countyMn":"MM","regionId":6,"regionCode":868,"region":"Nord-Vest","version":"2025-03-26"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[23.90108112931677,47.613492032003904],[23.908559923715973,47.618441587564405],[23.910670349449457,47.624404519207864],[23.905580840737176,47.62808808661836],[23.904835554335484,47.64323729272104],[23.897197145817213,47.65315030888054],[23.89191954606584,47.64892159095196],[23.883339128430464,47.64817447076027],[23.87674221853679,47.6497037572398],[23.86096624045583,47.64842317471181],[23.86354057595176,47.64328333346371],[23.8588917792452,47.642087996383864],[23.86219817513258,47.63193036624256],[23.85745188578734,47.62351318668212],[23.850682558643243,47.61936768299077],[23.846388722117393,47.61080084649422],[23.835350035118473,47.60818680241375],[23.84029610113749,47.6027374857536],[23.83183103747017,47.60067820221514],[23.825193877927106,47.59692144286542],[23.805729552508684,47.589587438375204],[23.795031046358613,47.589390480765026],[23.79714914669063,47.5831502011996],[23.795602431082827,47.580051657348776],[23.783554722639824,47.5798032762476],[23.77634700696613,47.57659484492142],[23.779682225054692,47.57092515079572],[23.774737944043675,47.566560867098836],[23.774318913456938,47.56229447445052],[23.76932522660957,47.55886287939098],[23.75882461790404,47.55510775212505],[23.75831106875589,47.55143834949229],[23.74645905859472,47.544650391490165],[23.743006739638833,47.534527724082274],[23.738031967547766,47.52938189108632],[23.72611081873011,47.52090536744869],[23.7251083085883,47.51558797090123],[23.719385057805567,47.5085571019111],[23.723522294408586,47.5036704591066],[23.719610841217627,47.49064195781588],[23.713042736998247,47.48245216649746],[23.723580300989113,47.4782814183713],[23.727329463969134,47.473595269389286],[23.73655556364527,47.47670651767966],[23.73970395554055,47.46203412893643],[23.746173593248564,47.46157676892259],[23.74565763885051,47.47032702492173],[23.759275361786106,47.47202057269339],[23.769440836219665,47.469570491694284],[23.77095814277374,47.478551419369445],[23.777788976742816,47.487506072501034],[23.78338514720786,47.492436771039486],[23.80256319430229,47.49914731444141],[23.807447597470475,47.50251169914023],[23.803218202930317,47.508907298294915],[23.799257739826235,47.52018668219206],[23.795947695804028,47.52193397606992],[23.794780310621846,47.52939898495267],[23.80548261412485,47.54020007700242],[23.82429312707466,47.548043116916745],[23.836434091657804,47.54943504232734],[23.84659094043896,47.55468266067595],[23.85043627623963,47.55927015546135],[23.852288296248595,47.56529195156549],[23.850369617437632,47.570702933171944],[23.85684244718911,47.57619395093456],[23.86541144565581,47.57892895180774],[23.874228091888142,47.59063239891832],[23.884685473348178,47.595513099384426],[23.8845317200499,47.60247550798663],[23.893469201081427,47.60709196052724],[23.90108112931677,47.613492032003904]]]},"properties":{"id":2028,"natCode":107582,"name":"Cernești","natLevName":"Comuna","countyId":24,"countyCode":243,"county":"Maramureș","countyMn":"MM","regionId":6,"regionCode":868,"region":"Nord-Vest","version":"2025-03-26"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[24.11431041242188,47.615727060336056],[24.10443691434956,47.62162889152393],[24.10245140877366,47.62755436132683],[24.087714539028234,47.62809530095944],[24.08250478640664,47.63240634532192],[24.071832206171067,47.63588492030135],[24.0595974597849,47.64728782116656],[24.056461075789034,47.65373672342226],[24.0503109508302,47.65999099839148],[24.03905370337448,47.660905661516125],[24.034452690986914,47.6594151093601],[24.02675982677398,47.66890063759097],[24.027865578411014,47.674950384040685],[24.017907786212202,47.67316790799345],[24.01399489193565,47.670869006526615],[23.985752933486282,47.66552803470907],[23.982635055377333,47.65883971641736],[23.9739555288971,47.6584026092733],[23.958544841888276,47.66458456377697],[23.94374544623503,47.66579286951812],[23.93078892968959,47.66475268317585],[23.91476125510086,47.66005115521931],[23.908257519915765,47.660208563045806],[23.897197145817213,47.65315030888054],[23.904835554335484,47.64323729272104],[23.905580840737176,47.62808808661836],[23.910670349449457,47.624404519207864],[23.908559923715973,47.618441587564405],[23.90108112931677,47.613492032003904],[23.910950641408093,47.60555642090136],[23.922758341745947,47.607405737980784],[23.931059813324563,47.60669758468371],[23.940434585765626,47.59937700862314],[23.947774769564294,47.59869073305039],[23.95215946236306,47.59547433350035],[23.9532921275392,47.585139157385036],[23.968548829192667,47.57467886357622],[23.974006030609527,47.57119666917017],[23.98313730810102,47.568145688269155],[23.995831842269503,47.568584339847625],[24.003110311929458,47.56263464987482],[24.008527395025407,47.56327908531047],[24.018768899895363,47.560982261636866],[24.026538352331954,47.56073746064109],[24.03317692751391,47.5678138780512],[24.03873054304563,47.56949060456784],[24.04396810327548,47.57782856947057],[24.04869206748887,47.578177223615505],[24.047187596601223,47.58546754319464],[24.051325882666372,47.59648832873804],[24.05634655607491,47.602360992224625],[24.057295759433455,47.607389011731485],[24.06193765138664,47.61151517908621],[24.076126279291294,47.61002177176494],[24.08908250853649,47.61252482400754],[24.09381888360108,47.61056473528624],[24.104341686043288,47.615468869912306],[24.11431041242188,47.615727060336056]]]},"properties":{"id":2036,"natCode":107154,"name":"Băiuț","natLevName":"Comuna","countyId":24,"countyCode":243,"county":"Maramureș","countyMn":"MM","regionId":6,"regionCode":868,"region":"Nord-Vest","version":"2025-03-26"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[24.468885666836716,47.664437067179996],[24.45558728570174,47.65925037466798],[24.449051144074847,47.663621046778324],[24.448439314830086,47.66701200562104],[24.4349245797509,47.663305147014114],[24.42540939114004,47.6679088529733],[24.424398652438615,47.67729441332432],[24.413286348143735,47.67745693402917],[24.41238504356825,47.67124301225023],[24.418913713834595,47.667700004959705],[24.408845962159184,47.66109049563278],[24.407063937309683,47.653723404245184],[24.402773765943998,47.64766677350493],[24.397461665663137,47.64473190955009],[24.398643592367026,47.63352184541198],[24.39044194134367,47.62810036686635],[24.389787389495076,47.61945150771142],[24.37915929668294,47.61623997462746],[24.386531040847593,47.60836861811495],[24.39138043584617,47.60446418668035],[24.40729416022734,47.60158833102562],[24.41463706297634,47.59652538771311],[24.422890950375646,47.59708468232839],[24.438217015928114,47.59064552312771],[24.44855582514639,47.591626710669125],[24.45641578626542,47.59535255209817],[24.460491224084926,47.59214803947013],[24.47474185749879,47.58740478743938],[24.491542399153868,47.58632238586736],[24.504647637083846,47.581304467596844],[24.511180510455713,47.58301832769792],[24.519496802585884,47.58040457947681],[24.52072316925765,47.57795467209899],[24.539491839898208,47.57609095412988],[24.55277254993975,47.573532090670454],[24.55813051104542,47.56790865896156],[24.563099786012074,47.57508518328157],[24.56189415034822,47.57909019374971],[24.56479873539967,47.586688079449104],[24.569467913881077,47.59008768541361],[24.583550123368198,47.595895900091556],[24.585033433620612,47.59980731629496],[24.566563345564752,47.603153053702506],[24.548629796922867,47.60391954799267],[24.54231424501487,47.6094264403537],[24.54205931053695,47.613651405365204],[24.535163253660773,47.619723062573],[24.53254065767557,47.62436293445858],[24.52750285281083,47.62553745038367],[24.52346761070884,47.63523694391098],[24.50392255048708,47.64020228065188],[24.482027530491546,47.63969394455376],[24.477726813497537,47.643128216749595],[24.474292903100963,47.64957496229669],[24.4674106054263,47.657363068217435],[24.468885666836716,47.664437067179996]]]},"properties":{"id":2037,"natCode":108874,"name":"Săcel","natLevName":"Comuna","countyId":24,"countyCode":243,"county":"Maramureș","countyMn":"MM","regionId":6,"regionCode":868,"region":"Nord-Vest","version":"2025-03-26"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[24.325569058903532,47.677906598005784],[24.313908418161663,47.679892633120154],[24.307140443512832,47.68591277716186],[24.29573309061368,47.68822925245076],[24.285192050388225,47.68656066561464],[24.276916406507684,47.67892966903449],[24.274033220489258,47.67208588829889],[24.27015326456916,47.6681959890692],[24.260755214867935,47.66768195203921],[24.26160041414174,47.65158295458932],[24.259105419215366,47.647265105767985],[24.248245100421208,47.63905456818355],[24.247283481270202,47.62493510147727],[24.2450004785814,47.620055021238116],[24.237676923312492,47.61935909341321],[24.23534303743026,47.61378157795097],[24.23826012277,47.606577838504435],[24.22519921301003,47.59651424262696],[24.22378982565214,47.59400281481134],[24.213292662572123,47.59164072790759],[24.208534154721022,47.58342404447784],[24.20055701995735,47.580214436789944],[24.18787581045992,47.57238479492648],[24.190696527543604,47.56591789661161],[24.18688396824015,47.561166158792375],[24.19103881167581,47.554885898358016],[24.200445747789555,47.547251666139175],[24.21737807860931,47.54814071514602],[24.223084998556423,47.54650691137889],[24.22428886809764,47.54279692308912],[24.238035127248573,47.536411269770035],[24.24624831958813,47.534304132004664],[24.249830512760663,47.527801959020614],[24.25652480390957,47.526286802780646],[24.258542726335012,47.520408226334894],[24.266350387634077,47.5170812973519],[24.26978236916205,47.523669276104236],[24.2760668640556,47.52689573264454],[24.278521210107552,47.53191746595948],[24.277825811237033,47.54098215626614],[24.28100597638178,47.54539179264965],[24.2876259445285,47.54629234038366],[24.293429813002362,47.555685602796224],[24.301951092591267,47.5582262681709],[24.30416747535481,47.56695695619252],[24.30078290652844,47.573047576649024],[24.30321081854425,47.579115549624014],[24.307354968724255,47.578409051448325],[24.313830179185764,47.58754114348049],[24.325377892329982,47.589712584967394],[24.314652788348766,47.59580765772331],[24.31146661938481,47.599182639615044],[24.318169202178467,47.60502397297234],[24.32287725603648,47.61289863977536],[24.31655345489079,47.62437826691887],[24.322275477889725,47.63073588809265],[24.318752551439136,47.63962811192046],[24.314807765111404,47.64106268111412],[24.31312568919265,47.647267299871466],[24.31719811090725,47.651511677320514],[24.32061967082854,47.6614758191231],[24.32840356617568,47.66593082795301],[24.328232341379135,47.674431592958385],[24.325569058903532,47.677906598005784]]]},"properties":{"id":2040,"natCode":108017,"name":"Dragomirești","natLevName":"Oras","countyId":24,"countyCode":243,"county":"Maramureș","countyMn":"MM","regionId":6,"regionCode":868,"region":"Nord-Vest","version":"2025-03-26"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[24.611518935694185,47.68029646242721],[24.598913689792642,47.68231552789571],[24.58612343751479,47.680284610883106],[24.576107834145912,47.68263425396275],[24.567344332541865,47.688705549834125],[24.556355732924533,47.68690815468078],[24.543832094585024,47.68315394811611],[24.536054217246864,47.68565751486188],[24.531095334402355,47.69079509497624],[24.51694736057818,47.692362889443984],[24.506335479314657,47.68989710868388],[24.49303954492024,47.68877802065451],[24.47536521108286,47.67542140274481],[24.468885666836716,47.664437067179996],[24.4674106054263,47.657363068217435],[24.474292903100963,47.64957496229669],[24.477726813497537,47.643128216749595],[24.482027530491546,47.63969394455376],[24.50392255048708,47.64020228065188],[24.52346761070884,47.63523694391098],[24.52750285281083,47.62553745038367],[24.53254065767557,47.62436293445858],[24.535163253660773,47.619723062573],[24.54205931053695,47.613651405365204],[24.54231424501487,47.6094264403537],[24.548629796922867,47.60391954799267],[24.566563345564752,47.603153053702506],[24.585033433620612,47.59980731629496],[24.583550123368198,47.595895900091556],[24.569467913881077,47.59008768541361],[24.56479873539967,47.586688079449104],[24.56189415034822,47.57909019374971],[24.563099786012074,47.57508518328157],[24.55813051104542,47.56790865896156],[24.56105118825394,47.563504492732136],[24.57169304665618,47.56229960265615],[24.575776737689054,47.56727644320473],[24.581506438221865,47.57045611906833],[24.58952446988854,47.570914154921866],[24.59550771985332,47.56930373771824],[24.60748037381156,47.569266571748095],[24.623355017119398,47.57464642711585],[24.63189463063505,47.575819938751586],[24.637508635854573,47.57215159138424],[24.643867697273233,47.57118929810287],[24.652145250777217,47.567521903846384],[24.653970578376768,47.56225023192785],[24.652058571435287,47.55820094300638],[24.659594130399064,47.553989277737564],[24.664342004278836,47.55746326834969],[24.668886031231892,47.55709138387897],[24.6912397025416,47.55854881355406],[24.713950672392276,47.571513031276616],[24.705735128336098,47.57472712065569],[24.697283514246653,47.59443407273766],[24.69071970182432,47.59808775941686],[24.694456324231922,47.60740916108038],[24.688574806121384,47.606622662249436],[24.67704328294087,47.60252604967135],[24.66948321593688,47.60242399158321],[24.65144966242652,47.597631363873425],[24.647173396050057,47.59427728753364],[24.641222639223404,47.59394539613763],[24.63246464330079,47.60022245841983],[24.62523563263255,47.60098383595921],[24.61856366704021,47.605108714546404],[24.613950604135216,47.62047589255898],[24.613232663582725,47.62977070128532],[24.61417895631846,47.63953622806001],[24.61171307105268,47.642679544384215],[24.61346400461182,47.66685092463896],[24.61006827381089,47.675863530249146],[24.611518935694185,47.68029646242721]]]},"properties":{"id":2042,"natCode":108348,"name":"Moisei","natLevName":"Comuna","countyId":24,"countyCode":243,"county":"Maramureș","countyMn":"MM","regionId":6,"regionCode":868,"region":"Nord-Vest","version":"2025-03-26"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[24.04258027718932,47.6935354201669],[24.038051981451435,47.69312664832372],[24.033885793227896,47.69199583931927],[24.029206611539834,47.682211583566826],[24.027865578411014,47.674950384040685],[24.02675982677398,47.66890063759097],[24.034452690986914,47.6594151093601],[24.03905370337448,47.660905661516125],[24.0503109508302,47.65999099839148],[24.056461075789034,47.65373672342226],[24.0595974597849,47.64728782116656],[24.071832206171067,47.63588492030135],[24.08250478640664,47.63240634532192],[24.087714539028234,47.62809530095944],[24.10245140877366,47.62755436132683],[24.10443691434956,47.62162889152393],[24.11431041242188,47.615727060336056],[24.11230555346602,47.607929764974664],[24.109164388772086,47.60574989481946],[24.111562412747766,47.59581874147342],[24.114790502077064,47.59457815865186],[24.13595184678054,47.60174125573745],[24.152586305706947,47.60186879993444],[24.149964072165655,47.60743066434786],[24.144264484131305,47.61356508555799],[24.145734622345636,47.62012363339194],[24.15828845549829,47.6258744990414],[24.156514641473724,47.630236214049],[24.160163340057206,47.636795317391545],[24.16434736980283,47.63908214742322],[24.16764603920026,47.64718984093297],[24.178093819784575,47.65283050535597],[24.18183821681008,47.6567307806542],[24.1806119870492,47.66766426382608],[24.17889431862654,47.67046263596911],[24.18285850455932,47.68015601917314],[24.178432408963403,47.68472289494494],[24.17492617768758,47.68652112523471],[24.17499568478005,47.69165793527638],[24.17148520197235,47.694160188180355],[24.15541159502011,47.69194810008182],[24.151978412155866,47.69254641843028],[24.14089130752729,47.68601531760999],[24.135713753749798,47.686308548918454],[24.127408282481404,47.691466085413154],[24.118744486885255,47.69182657512146],[24.100865537949094,47.69036934475884],[24.09227567247511,47.686724856058404],[24.087555753010353,47.68300445701823],[24.078688375012426,47.68288666578716],[24.069204569009635,47.68582563340227],[24.055996971838784,47.69245406474166],[24.04932729348048,47.69187325978124],[24.04258027718932,47.6935354201669]]]},"properties":{"id":2045,"natCode":107485,"name":"Botiza","natLevName":"Comuna","countyId":24,"countyCode":243,"county":"Maramureș","countyMn":"MM","regionId":6,"regionCode":868,"region":"Nord-Vest","version":"2025-03-26"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[24.389667090356678,47.69316232301347],[24.37665906043182,47.695825226359034],[24.356731565676135,47.6892484489288],[24.354046291968558,47.68560359458754],[24.345462944900163,47.67943445851094],[24.33905367024605,47.68147457397275],[24.325569058903532,47.677906598005784],[24.328232341379135,47.674431592958385],[24.32840356617568,47.66593082795301],[24.32061967082854,47.6614758191231],[24.31719811090725,47.651511677320514],[24.31312568919265,47.647267299871466],[24.314807765111404,47.64106268111412],[24.318752551439136,47.63962811192046],[24.322275477889725,47.63073588809265],[24.31655345489079,47.62437826691887],[24.32287725603648,47.61289863977536],[24.318169202178467,47.60502397297234],[24.31146661938481,47.599182639615044],[24.314652788348766,47.59580765772331],[24.325377892329982,47.589712584967394],[24.313830179185764,47.58754114348049],[24.307354968724255,47.578409051448325],[24.31518166642839,47.57363246104239],[24.322459975220365,47.572253861702066],[24.326009007731415,47.566847699865896],[24.337129579885676,47.56747837324925],[24.342709477475676,47.56537495317178],[24.349229850577156,47.57113193153967],[24.3562655492279,47.572486630831385],[24.36322637103815,47.577479091895526],[24.363230556194168,47.58131936660634],[24.369137024950142,47.58962080311638],[24.374476607662814,47.592153516264034],[24.37613303638684,47.595889357525834],[24.383400763517262,47.602780007075154],[24.386531040847593,47.60836861811495],[24.37915929668294,47.61623997462746],[24.389787389495076,47.61945150771142],[24.39044194134367,47.62810036686635],[24.398643592367026,47.63352184541198],[24.397461665663137,47.64473190955009],[24.402773765943998,47.64766677350493],[24.407063937309683,47.653723404245184],[24.408845962159184,47.66109049563278],[24.418913713834595,47.667700004959705],[24.41238504356825,47.67124301225023],[24.413286348143735,47.67745693402917],[24.40553849474682,47.67336621516486],[24.391699498981765,47.674734961420626],[24.389272386174397,47.67919751959391],[24.389667090356678,47.69316232301347]]]},"properties":{"id":2046,"natCode":108892,"name":"Săliștea de Sus","natLevName":"Oras","countyId":24,"countyCode":243,"county":"Maramureș","countyMn":"MM","regionId":6,"regionCode":868,"region":"Nord-Vest","version":"2025-03-26"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[23.908257519915765,47.660208563045806],[23.90547214421641,47.66612678473241],[23.90052681315692,47.66862237005708],[23.89932730421042,47.67527329914491],[23.887478834444792,47.68112951446775],[23.880807527797675,47.68112210525969],[23.872286684444454,47.68348963794177],[23.86324432569704,47.689177488383955],[23.863406917521257,47.693292508503504],[23.860272366668532,47.69193207471287],[23.854143960553905,47.68439154912693],[23.84725261037806,47.682484645631234],[23.846337377841497,47.67789759547615],[23.842136968504697,47.67433091507177],[23.844445346863854,47.668160613997124],[23.840600390749206,47.663715746767956],[23.829299591625876,47.65849007692441],[23.825778152885,47.65863523793124],[23.82212027319391,47.65322585667724],[23.81309362213534,47.6519936297566],[23.811639233905368,47.638859904703374],[23.816542326689458,47.635391002097634],[23.830034380579473,47.63753876914738],[23.840003130372487,47.637555477025735],[23.847809718769295,47.63601501565186],[23.856383232393558,47.6300030964038],[23.86219817513258,47.63193036624256],[23.8588917792452,47.642087996383864],[23.86354057595176,47.64328333346371],[23.86096624045583,47.64842317471181],[23.87674221853679,47.6497037572398],[23.883339128430464,47.64817447076027],[23.89191954606584,47.64892159095196],[23.897197145817213,47.65315030888054],[23.908257519915765,47.660208563045806]]]},"properties":{"id":2048,"natCode":106782,"name":"Cavnic","natLevName":"Oras","countyId":24,"countyCode":243,"county":"Maramureș","countyMn":"MM","regionId":6,"regionCode":868,"region":"Nord-Vest","version":"2025-03-26"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[23.84949519434994,47.69609236012621],[23.845103251752146,47.697860692333734],[23.835127861201485,47.69458354492857],[23.829983800247685,47.691125367281835],[23.81846532105246,47.69197228773578],[23.80419473865554,47.67020211143774],[23.794190926810632,47.66701615406052],[23.787400410791548,47.66194682332889],[23.766171458366987,47.65754302994416],[23.753595787483547,47.65165455605845],[23.740897593438383,47.64116163102402],[23.734621647602133,47.638168783415765],[23.725564710567077,47.63648477683628],[23.719388680755458,47.64585192231683],[23.699512515656593,47.6488970507199],[23.68544290935826,47.64855434452501],[23.678516960409663,47.64661461355962],[23.678549399246023,47.64171228809604],[23.68398520358637,47.64090254931827],[23.686950131541916,47.63576141602585],[23.686006377109113,47.62985869844628],[23.688162426228338,47.61873374364712],[23.690222425927466,47.61536836557462],[23.696734677594414,47.61750677451957],[23.703117262014665,47.61511274013277],[23.71006754502349,47.620026127128746],[23.713378062630742,47.61551491865804],[23.70817366367939,47.608894116196765],[23.716475688524685,47.60051448035226],[23.713488607372454,47.59604741563511],[23.693230708533747,47.5972354397793],[23.697137466121116,47.590880868266716],[23.703555373073865,47.59162601027813],[23.714461171795172,47.58900881296964],[23.738075096597576,47.57854152187007],[23.752493260130297,47.58306030905732],[23.755694721994452,47.5853369704358],[23.761171070711637,47.58034277963038],[23.77634700696613,47.57659484492142],[23.783554722639824,47.5798032762476],[23.795602431082827,47.580051657348776],[23.79714914669063,47.5831502011996],[23.795031046358613,47.589390480765026],[23.805729552508684,47.589587438375204],[23.825193877927106,47.59692144286542],[23.83183103747017,47.60067820221514],[23.84029610113749,47.6027374857536],[23.835350035118473,47.60818680241375],[23.846388722117393,47.61080084649422],[23.850682558643243,47.61936768299077],[23.85745188578734,47.62351318668212],[23.86219817513258,47.63193036624256],[23.856383232393558,47.6300030964038],[23.847809718769295,47.63601501565186],[23.840003130372487,47.637555477025735],[23.830034380579473,47.63753876914738],[23.816542326689458,47.635391002097634],[23.811639233905368,47.638859904703374],[23.81309362213534,47.6519936297566],[23.82212027319391,47.65322585667724],[23.825778152885,47.65863523793124],[23.829299591625876,47.65849007692441],[23.840600390749206,47.663715746767956],[23.844445346863854,47.668160613997124],[23.842136968504697,47.67433091507177],[23.846337377841497,47.67789759547615],[23.84725261037806,47.682484645631234],[23.854143960553905,47.68439154912693],[23.860272366668532,47.69193207471287],[23.863406917521257,47.693292508503504],[23.861537304295652,47.69581970490026],[23.851315108946824,47.694151411645336],[23.84949519434994,47.69609236012621]]]},"properties":{"id":2049,"natCode":109096,"name":"Șișești","natLevName":"Comuna","countyId":24,"countyCode":243,"county":"Maramureș","countyMn":"MM","regionId":6,"regionCode":868,"region":"Nord-Vest","version":"2025-03-26"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[24.260755214867935,47.66768195203921],[24.26202050104441,47.67337223038912],[24.254259609734927,47.67578518376044],[24.254996276110955,47.68143865190511],[24.250227803704348,47.68538122315818],[24.245201812071738,47.69701904973349],[24.23226808769419,47.70349164718956],[24.22314020793474,47.70283306143056],[24.213873579325732,47.70049463600815],[24.210543393364233,47.6900201870441],[24.20166103098144,47.69035522459729],[24.18920110400324,47.68753673470731],[24.18787146519179,47.68505483504563],[24.178432408963403,47.68472289494494],[24.18285850455932,47.68015601917314],[24.17889431862654,47.67046263596911],[24.1806119870492,47.66766426382608],[24.18183821681008,47.6567307806542],[24.178093819784575,47.65283050535597],[24.16764603920026,47.64718984093297],[24.16434736980283,47.63908214742322],[24.160163340057206,47.636795317391545],[24.156514641473724,47.630236214049],[24.15828845549829,47.6258744990414],[24.145734622345636,47.62012363339194],[24.144264484131305,47.61356508555799],[24.149964072165655,47.60743066434786],[24.152586305706947,47.60186879993444],[24.154915892897638,47.59325971392094],[24.165866593244065,47.587902579534955],[24.16540881528261,47.58339384013025],[24.16960094397776,47.578733394318874],[24.174908388237554,47.57957829316159],[24.18787581045992,47.57238479492648],[24.20055701995735,47.580214436789944],[24.208534154721022,47.58342404447784],[24.213292662572123,47.59164072790759],[24.22378982565214,47.59400281481134],[24.22519921301003,47.59651424262696],[24.23826012277,47.606577838504435],[24.23534303743026,47.61378157795097],[24.237676923312492,47.61935909341321],[24.2450004785814,47.620055021238116],[24.247283481270202,47.62493510147727],[24.248245100421208,47.63905456818355],[24.259105419215366,47.647265105767985],[24.26160041414174,47.65158295458932],[24.260755214867935,47.66768195203921]]]},"properties":{"id":2050,"natCode":108204,"name":"Ieud","natLevName":"Comuna","countyId":24,"countyCode":243,"county":"Maramureș","countyMn":"MM","regionId":6,"regionCode":868,"region":"Nord-Vest","version":"2025-03-26"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[24.11879000128218,47.71711242352007],[24.114383009794714,47.71734091888],[24.10297109300768,47.710755444420926],[24.097253086932728,47.712798116754556],[24.089442670250346,47.70676225520442],[24.079968674936477,47.707631218253816],[24.07211751226409,47.70254586193598],[24.057882492202584,47.69551964001329],[24.04258027718932,47.6935354201669],[24.04932729348048,47.69187325978124],[24.055996971838784,47.69245406474166],[24.069204569009635,47.68582563340227],[24.078688375012426,47.68288666578716],[24.087555753010353,47.68300445701823],[24.09227567247511,47.686724856058404],[24.100865537949094,47.69036934475884],[24.118744486885255,47.69182657512146],[24.127408282481404,47.691466085413154],[24.135713753749798,47.686308548918454],[24.14089130752729,47.68601531760999],[24.151978412155866,47.69254641843028],[24.150744823765702,47.69896843395954],[24.152410705952313,47.702619738801374],[24.143155667924937,47.7074193246945],[24.14047510026246,47.710014666163296],[24.131672043620334,47.70712062168389],[24.124456107360558,47.71435087190703],[24.11879000128218,47.71711242352007]]]},"properties":{"id":2054,"natCode":179604,"name":"Poienile Izei","natLevName":"Comuna","countyId":24,"countyCode":243,"county":"Maramureș","countyMn":"MM","regionId":6,"regionCode":868,"region":"Nord-Vest","version":"2025-03-26"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[24.88315048789658,47.72437107522827],[24.887538384030613,47.71833924982621],[24.881056530276584,47.712508550867994],[24.870773846651634,47.70748537158868],[24.861468142345004,47.70981577172006],[24.85561819025952,47.71431975917076],[24.83646461406389,47.7162389741881],[24.830043892930917,47.71939437408049],[24.822054178617396,47.7162229550916],[24.81665163594946,47.711278698801394],[24.808997447226815,47.710730368902944],[24.79488966210757,47.71266140103385],[24.786566295340013,47.71078390561892],[24.772181539980306,47.71718865032911],[24.75737634397337,47.71918790266909],[24.75034600603756,47.727033986244344],[24.7401165325906,47.72969290721921],[24.727450042851917,47.72912272114134],[24.720822079766403,47.730752462212784],[24.71303793726672,47.72220366304388],[24.699179545734644,47.72444090370541],[24.69457572344706,47.72406346735226],[24.671479366476063,47.72724123240002],[24.653822557112385,47.72404485548879],[24.642626795357035,47.72319851287801],[24.6359734494832,47.72071505974186],[24.629455894835086,47.72105011308858],[24.616773820519846,47.717445199475655],[24.61131281810167,47.71335348871907],[24.604801072986255,47.71184842948687],[24.606506231785012,47.70428471501183],[24.6205534984731,47.68702228752875],[24.611518935694185,47.68029646242721],[24.61006827381089,47.675863530249146],[24.61346400461182,47.66685092463896],[24.61171307105268,47.642679544384215],[24.61417895631846,47.63953622806001],[24.613232663582725,47.62977070128532],[24.613950604135216,47.62047589255898],[24.61856366704021,47.605108714546404],[24.62523563263255,47.60098383595921],[24.63246464330079,47.60022245841983],[24.641222639223404,47.59394539613763],[24.647173396050057,47.59427728753364],[24.65144966242652,47.597631363873425],[24.66948321593688,47.60242399158321],[24.67704328294087,47.60252604967135],[24.688574806121384,47.606622662249436],[24.694456324231922,47.60740916108038],[24.69071970182432,47.59808775941686],[24.697283514246653,47.59443407273766],[24.705735128336098,47.57472712065569],[24.713950672392276,47.571513031276616],[24.726149048684007,47.575935455762405],[24.732788494142696,47.571817929483174],[24.739312949434648,47.57296992849619],[24.750458947291254,47.571298657941995],[24.76642464290587,47.573470254680515],[24.77115373652005,47.5720484091882],[24.78787261162706,47.57637754165041],[24.794168699919556,47.57466157245434],[24.79761707248,47.569821651157305],[24.807252620107192,47.56666979283571],[24.815282862616822,47.5744661519612],[24.819938994845025,47.58962206584754],[24.822748297007273,47.59450873266673],[24.829426086109265,47.59684555982168],[24.847216878298415,47.596401707726095],[24.855873370505805,47.592444135874004],[24.864451469122276,47.59448178422425],[24.872004004110426,47.59396346004212],[24.881284311210447,47.59817496448415],[24.897097498008616,47.60286934074301],[24.90354301225303,47.60273849274506],[24.914208286198132,47.59921054120013],[24.9240752898954,47.59774924954252],[24.944011374420626,47.597287912811844],[24.95435134630785,47.595612261870976],[24.96084864639217,47.596867847032655],[24.958848516647784,47.60339183274313],[24.958569709773005,47.61519311541906],[24.964210015982225,47.61621454078682],[24.97423941303111,47.613678732323066],[24.984295433317204,47.620375887066686],[24.99053567271484,47.620208371448214],[24.993203727615427,47.62516748037649],[24.998403363747517,47.626113100027375],[25.009752504513198,47.63294672276072],[25.024232447895695,47.63387888963914],[25.0326690208384,47.63787879307465],[25.053074152624585,47.64141398174683],[25.056377607461958,47.64786538793045],[25.05549466684045,47.654449085060634],[25.050525003367397,47.65911823237688],[25.04409655530599,47.65932330728168],[25.038362599376658,47.66412164259243],[25.022162861807104,47.666395328607436],[25.017212603114668,47.67444466447605],[25.007598035058056,47.67668187390187],[25.000727341856788,47.68296668766592],[24.996129162679367,47.68398919286094],[24.98203254616921,47.69479054931627],[24.97469504031116,47.699182016239654],[24.959555767663296,47.70563807379442],[24.952056029350548,47.705796668035354],[24.953728785468964,47.71181912072571],[24.947924824352143,47.71719002243181],[24.947111725710393,47.729141477238144],[24.901200548555206,47.724739404841614],[24.88315048789658,47.72437107522827]]]},"properties":{"id":2059,"natCode":106746,"name":"Borșa","natLevName":"Oras","countyId":24,"countyCode":243,"county":"Maramureș","countyMn":"MM","regionId":6,"regionCode":868,"region":"Nord-Vest","version":"2025-03-26"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[24.232986862072302,47.706675795397615],[24.229839110577704,47.71728808182953],[24.230179990498815,47.72444962365977],[24.226932706064204,47.72877739484174],[24.21093183162432,47.73245272562252],[24.197814206358764,47.73212933614136],[24.1715853275598,47.71554462212505],[24.155307080852943,47.714486828027205],[24.15360938450968,47.71164478388581],[24.143155667924937,47.7074193246945],[24.152410705952313,47.702619738801374],[24.150744823765702,47.69896843395954],[24.151978412155866,47.69254641843028],[24.15541159502011,47.69194810008182],[24.17148520197235,47.694160188180355],[24.17499568478005,47.69165793527638],[24.17492617768758,47.68652112523471],[24.178432408963403,47.68472289494494],[24.18787146519179,47.68505483504563],[24.18920110400324,47.68753673470731],[24.20166103098144,47.69035522459729],[24.210543393364233,47.6900201870441],[24.213873579325732,47.70049463600815],[24.22314020793474,47.70283306143056],[24.23226808769419,47.70349164718956],[24.232986862072302,47.706675795397615]]]},"properties":{"id":2060,"natCode":179613,"name":"Șieu","natLevName":"Comuna","countyId":24,"countyCode":243,"county":"Maramureș","countyMn":"MM","regionId":6,"regionCode":868,"region":"Nord-Vest","version":"2025-03-26"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[24.356731565676135,47.6892484489288],[24.35548783477241,47.69189011133971],[24.34588508580641,47.696798953326365],[24.344349858269588,47.70162963794719],[24.34664571041825,47.708000175525704],[24.32709043415211,47.709618056492644],[24.326399697755758,47.71706098206084],[24.32205298754165,47.72293332172551],[24.311968684891912,47.724302407378154],[24.296333356422224,47.723307953996816],[24.290194454697282,47.726410643572834],[24.286721047067157,47.733162559301064],[24.27969239560471,47.735070338543636],[24.2798975325777,47.7265385004025],[24.277775576261657,47.724852345710744],[24.266046895729165,47.72296648841585],[24.26131537454428,47.71441065398738],[24.254434440497906,47.70841328194303],[24.24368143001675,47.708068091489295],[24.23763682483529,47.710022626014236],[24.232986862072302,47.706675795397615],[24.23226808769419,47.70349164718956],[24.245201812071738,47.69701904973349],[24.250227803704348,47.68538122315818],[24.254996276110955,47.68143865190511],[24.254259609734927,47.67578518376044],[24.26202050104441,47.67337223038912],[24.260755214867935,47.66768195203921],[24.27015326456916,47.6681959890692],[24.274033220489258,47.67208588829889],[24.276916406507684,47.67892966903449],[24.285192050388225,47.68656066561464],[24.29573309061368,47.68822925245076],[24.307140443512832,47.68591277716186],[24.313908418161663,47.679892633120154],[24.325569058903532,47.677906598005784],[24.33905367024605,47.68147457397275],[24.345462944900163,47.67943445851094],[24.354046291968558,47.68560359458754],[24.356731565676135,47.6892484489288]]]},"properties":{"id":2061,"natCode":107403,"name":"Bogdan Vodă","natLevName":"Comuna","countyId":24,"countyCode":243,"county":"Maramureș","countyMn":"MM","regionId":6,"regionCode":868,"region":"Nord-Vest","version":"2025-03-26"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[23.70509431221375,47.73120539382128],[23.698305090037273,47.73071808757681],[23.68981396964999,47.73452006588632],[23.684372726611223,47.73288066722622],[23.684037032674183,47.72835687791058],[23.679951354008104,47.72598116993759],[23.67900425589125,47.720512739116],[23.682200481779553,47.715752162815846],[23.673518342157134,47.71209678229049],[23.66313211017838,47.7024035639193],[23.657628428680113,47.701071451713055],[23.6632073020225,47.69553924976733],[23.65569884722175,47.68648583219975],[23.650060479673737,47.68521679420532],[23.648402347021825,47.67963712594253],[23.634624814729744,47.67236849252877],[23.626631971210564,47.67011259432631],[23.62038426197882,47.66368978305621],[23.615010520749383,47.66162422531422],[23.620859276776493,47.64772069464615],[23.612324396993223,47.6445590811598],[23.61712354987371,47.630641359361015],[23.627549550101406,47.62759957893719],[23.63119038330165,47.62317617397181],[23.643072292749885,47.62865810271583],[23.651536315371636,47.62990013204358],[23.656582670949934,47.63312143782104],[23.659851472394458,47.63928536558789],[23.66518599721921,47.63984091965311],[23.667389870902817,47.64396882995686],[23.678516960409663,47.64661461355962],[23.68544290935826,47.64855434452501],[23.699512515656593,47.6488970507199],[23.719388680755458,47.64585192231683],[23.725564710567077,47.63648477683628],[23.734621647602133,47.638168783415765],[23.740897593438383,47.64116163102402],[23.753595787483547,47.65165455605845],[23.766171458366987,47.65754302994416],[23.787400410791548,47.66194682332889],[23.794190926810632,47.66701615406052],[23.80419473865554,47.67020211143774],[23.81846532105246,47.69197228773578],[23.804749999788296,47.69892007592797],[23.798496108281697,47.70027968267222],[23.788211572463588,47.69801618916312],[23.785322682960103,47.701216496708],[23.77037433027232,47.70220563176262],[23.76250720745235,47.69821175498236],[23.753986107461145,47.69986025700554],[23.750420084900167,47.70361943053434],[23.742768793402604,47.70330951098305],[23.73473507480782,47.706754149451776],[23.73338501997738,47.71698455317159],[23.718919140340944,47.72833611069661],[23.710445653944003,47.72647555387972],[23.70509431221375,47.73120539382128]]]},"properties":{"id":2066,"natCode":106684,"name":"Baia Sprie","natLevName":"Oras","countyId":24,"countyCode":243,"county":"Maramureș","countyMn":"MM","regionId":6,"regionCode":868,"region":"Nord-Vest","version":"2025-03-26"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[24.212844355717948,47.767404515136896],[24.20488508875451,47.76369529041539],[24.19315332660762,47.76808041184398],[24.17900921472234,47.76442131220418],[24.176398568238124,47.76063814391739],[24.168066130347494,47.7546481613057],[24.16729830922249,47.74989048835795],[24.17179720380584,47.741516818282314],[24.164332057191814,47.73309087799901],[24.158182229077198,47.7305786521738],[24.14688067254965,47.728451928273046],[24.141146357617814,47.72939856742624],[24.123249126930524,47.721578851510664],[24.11879000128218,47.71711242352007],[24.124456107360558,47.71435087190703],[24.131672043620334,47.70712062168389],[24.14047510026246,47.710014666163296],[24.143155667924937,47.7074193246945],[24.15360938450968,47.71164478388581],[24.155307080852943,47.714486828027205],[24.1715853275598,47.71554462212505],[24.197814206358764,47.73212933614136],[24.21093183162432,47.73245272562252],[24.226932706064204,47.72877739484174],[24.230179990498815,47.72444962365977],[24.229839110577704,47.71728808182953],[24.232986862072302,47.706675795397615],[24.23763682483529,47.710022626014236],[24.24368143001675,47.708068091489295],[24.254434440497906,47.70841328194303],[24.26131537454428,47.71441065398738],[24.266046895729165,47.72296648841585],[24.277775576261657,47.724852345710744],[24.2798975325777,47.7265385004025],[24.27969239560471,47.735070338543636],[24.276521207195284,47.73805907674065],[24.27908051388324,47.74458518907501],[24.254128741412572,47.75633132773552],[24.24998479677446,47.761135794196456],[24.24297626012119,47.75944586373169],[24.232798077529996,47.76715548482477],[24.221962908964617,47.761594891962524],[24.212844355717948,47.767404515136896]]]},"properties":{"id":2072,"natCode":108669,"name":"Rozavlea","natLevName":"Comuna","countyId":24,"countyCode":243,"county":"Maramureș","countyMn":"MM","regionId":6,"regionCode":868,"region":"Nord-Vest","version":"2025-03-26"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[24.38143212497625,47.79241679152543],[24.36947391609456,47.79149395475227],[24.339713053398672,47.77946125764921],[24.331331290790985,47.77392863214557],[24.327977899634035,47.76896775542535],[24.326273096963018,47.76235908534851],[24.3137741098744,47.7554435376297],[24.30208777402052,47.75378160120289],[24.29985421887841,47.74915227481499],[24.290925307724713,47.74872727071408],[24.27908051388324,47.74458518907501],[24.276521207195284,47.73805907674065],[24.27969239560471,47.735070338543636],[24.286721047067157,47.733162559301064],[24.290194454697282,47.726410643572834],[24.296333356422224,47.723307953996816],[24.311968684891912,47.724302407378154],[24.32205298754165,47.72293332172551],[24.326399697755758,47.71706098206084],[24.32709043415211,47.709618056492644],[24.34664571041825,47.708000175525704],[24.344349858269588,47.70162963794719],[24.34588508580641,47.696798953326365],[24.35548783477241,47.69189011133971],[24.356731565676135,47.6892484489288],[24.37665906043182,47.695825226359034],[24.389667090356678,47.69316232301347],[24.391744127369883,47.700847694216264],[24.3854534402769,47.706531681640435],[24.383237639712572,47.71132155626084],[24.38972383870605,47.73147406201162],[24.397488861289858,47.74000354160093],[24.387923113445613,47.748939745992594],[24.39113603250885,47.750714211725985],[24.380581482445294,47.75528244635297],[24.375570883897833,47.76195897942464],[24.385513607517105,47.77190266550699],[24.399784490611946,47.78003189311582],[24.40071903186072,47.78440112528207],[24.396943795732053,47.79021066452857],[24.390462875508923,47.7886291253099],[24.38143212497625,47.79241679152543]]]},"properties":{"id":2078,"natCode":109504,"name":"Vișeu de Jos","natLevName":"Comuna","countyId":24,"countyCode":243,"county":"Maramureș","countyMn":"MM","regionId":6,"regionCode":868,"region":"Nord-Vest","version":"2025-03-26"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[24.249752947836818,47.80547533104913],[24.243844046973035,47.8020418486193],[24.23451633612422,47.803903342726834],[24.22752172067054,47.794486160664675],[24.218335511950166,47.792814621884744],[24.210430844522868,47.78849189068028],[24.213691118794763,47.78020431124453],[24.212844355717948,47.767404515136896],[24.221962908964617,47.761594891962524],[24.232798077529996,47.76715548482477],[24.24297626012119,47.75944586373169],[24.24998479677446,47.761135794196456],[24.254128741412572,47.75633132773552],[24.27908051388324,47.74458518907501],[24.290925307724713,47.74872727071408],[24.29985421887841,47.74915227481499],[24.30208777402052,47.75378160120289],[24.3137741098744,47.7554435376297],[24.326273096963018,47.76235908534851],[24.327977899634035,47.76896775542535],[24.314179197649853,47.773637955830026],[24.30750628048506,47.780637640984835],[24.30113973800201,47.782896595334606],[24.28353211008025,47.78188576755686],[24.26854381415723,47.78338955425983],[24.26275994377872,47.788410415373185],[24.256246275148253,47.78911391806874],[24.248769917348625,47.794553831760794],[24.249752947836818,47.80547533104913]]]},"properties":{"id":2085,"natCode":108240,"name":"Leordina","natLevName":"Comuna","countyId":24,"countyCode":243,"county":"Maramureș","countyMn":"MM","regionId":6,"regionCode":868,"region":"Nord-Vest","version":"2025-03-26"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[23.84949519434994,47.69609236012621],[23.855857563565234,47.707194859318534],[23.858388816100437,47.71760142461322],[23.855279643321023,47.718771134625946],[23.852611503131396,47.72553589324027],[23.844118299897765,47.73116483585777],[23.848213774216745,47.739928307104876],[23.848257550991555,47.744593858294216],[23.85578834269389,47.747076223465136],[23.858661323939156,47.75148533207875],[23.86425806402824,47.75483908433508],[23.87034516417246,47.763751120376945],[23.875606853183328,47.77503260483722],[23.88060716864665,47.77553740208074],[23.88869809495598,47.7723730535913],[23.898464906675525,47.77593451100751],[23.905271241463932,47.782496524752744],[23.89409307428469,47.791733697139506],[23.86770436994209,47.801242515633064],[23.862041538563563,47.80426277941685],[23.86314816058654,47.80951303922718],[23.845768654039208,47.813045230259156],[23.836789423465255,47.810752799781724],[23.826037273544664,47.81404386730746],[23.81151438940597,47.807088468629765],[23.802568324079243,47.79998298065189],[23.798322232398185,47.794670187682414],[23.784831016205512,47.79422743063256],[23.77679509095926,47.798114657634926],[23.77258655904477,47.80333881632193],[23.767632455938852,47.81396715267559],[23.762539727853056,47.81177533851292],[23.75764125250819,47.798391333355255],[23.746753731574547,47.79273710441089],[23.735743701330875,47.798000131090944],[23.714975784630205,47.79920791772396],[23.703570392075452,47.804545635988724],[23.705221657877214,47.80905015727507],[23.69029079250663,47.80757142328474],[23.685354333671675,47.81057504602168],[23.678360235563378,47.80776765090714],[23.678808209360515,47.80136881563971],[23.685263357251216,47.7978891736433],[23.690655634974046,47.78989750844298],[23.688434017875807,47.78121414734134],[23.692782181492433,47.773791975611715],[23.693060373578263,47.768690622459],[23.697731681722132,47.76665397937259],[23.695315207968555,47.757626895360225],[23.698534711979633,47.75003044312346],[23.705783150837902,47.744010962923824],[23.70104366011354,47.73491966453118],[23.70509431221375,47.73120539382128],[23.710445653944003,47.72647555387972],[23.718919140340944,47.72833611069661],[23.73338501997738,47.71698455317159],[23.73473507480782,47.706754149451776],[23.742768793402604,47.70330951098305],[23.750420084900167,47.70361943053434],[23.753986107461145,47.69986025700554],[23.76250720745235,47.69821175498236],[23.77037433027232,47.70220563176262],[23.785322682960103,47.701216496708],[23.788211572463588,47.69801618916312],[23.798496108281697,47.70027968267222],[23.804749999788296,47.69892007592797],[23.81846532105246,47.69197228773578],[23.829983800247685,47.691125367281835],[23.835127861201485,47.69458354492857],[23.845103251752146,47.697860692333734],[23.84949519434994,47.69609236012621]]]},"properties":{"id":2090,"natCode":107975,"name":"Desești","natLevName":"Comuna","countyId":24,"countyCode":243,"county":"Maramureș","countyMn":"MM","regionId":6,"regionCode":868,"region":"Nord-Vest","version":"2025-03-26"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[24.14548054308734,47.817468960969904],[24.13552750539947,47.81777346784158],[24.12748055865227,47.81446012267637],[24.121851993353026,47.81454897474226],[24.115308584075546,47.808977051584826],[24.10478782804455,47.80644775810385],[24.094404427923017,47.79652257535257],[24.092966114866567,47.79048064986969],[24.096460323870932,47.786207248976126],[24.096026080916463,47.776343779909496],[24.078056861858535,47.77554639034033],[24.07128207964039,47.77254442411554],[24.070493073868043,47.76556665028368],[24.067746534569416,47.76257715154311],[24.063633493463996,47.74906006452082],[24.057921827464842,47.74798616233053],[24.059877859173923,47.74112335664847],[24.056514238091417,47.73227227176966],[24.05153809029358,47.73034603958584],[24.049991038318264,47.72457645348909],[24.037914065763655,47.71838195113125],[24.035453490855563,47.70992471720572],[24.021597053666415,47.707390298550415],[24.027254235748593,47.706551755314656],[24.027504381986564,47.698520337523924],[24.03238729546684,47.69435839254121],[24.038051981451435,47.69312664832372],[24.04258027718932,47.6935354201669],[24.057882492202584,47.69551964001329],[24.07211751226409,47.70254586193598],[24.079968674936477,47.707631218253816],[24.089442670250346,47.70676225520442],[24.097253086932728,47.712798116754556],[24.10297109300768,47.710755444420926],[24.114383009794714,47.71734091888],[24.11879000128218,47.71711242352007],[24.123249126930524,47.721578851510664],[24.141146357617814,47.72939856742624],[24.14688067254965,47.728451928273046],[24.158182229077198,47.7305786521738],[24.164332057191814,47.73309087799901],[24.17179720380584,47.741516818282314],[24.16729830922249,47.74989048835795],[24.168066130347494,47.7546481613057],[24.176398568238124,47.76063814391739],[24.17900921472234,47.76442131220418],[24.19315332660762,47.76808041184398],[24.20488508875451,47.76369529041539],[24.212844355717948,47.767404515136896],[24.213691118794763,47.78020431124453],[24.210430844522868,47.78849189068028],[24.19621417183198,47.78926115636475],[24.181437327284222,47.79437839711648],[24.179025890760734,47.800602085987755],[24.175088151509996,47.80319221168473],[24.17109902220198,47.81232084576283],[24.163600617061523,47.81558878384445],[24.14548054308734,47.817468960969904]]]},"properties":{"id":2091,"natCode":109005,"name":"Strâmtura","natLevName":"Comuna","countyId":24,"countyCode":243,"county":"Maramureș","countyMn":"MM","regionId":6,"regionCode":868,"region":"Nord-Vest","version":"2025-03-26"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[23.994485093641078,47.8182597632044],[23.98712346585032,47.81685249076598],[23.98012164595348,47.819403921300996],[23.972940733438243,47.82510055110228],[23.95916142852983,47.82320216303298],[23.95143380454811,47.81571373853316],[23.953269817190296,47.808140925975536],[23.94735955357212,47.79782655804984],[23.94943740088085,47.79029321846491],[23.95389534834343,47.78678507673905],[23.948507455552587,47.78224509575382],[23.954246924140836,47.77514501347739],[23.97394584906898,47.76478575026974],[23.979296687365412,47.75814890616817],[23.981502271311815,47.74996711917415],[23.995339039697804,47.7250792044701],[24.00380049007941,47.71798944153868],[24.003651326007315,47.71507092132113],[24.021597053666415,47.707390298550415],[24.035453490855563,47.70992471720572],[24.037914065763655,47.71838195113125],[24.049991038318264,47.72457645348909],[24.05153809029358,47.73034603958584],[24.056514238091417,47.73227227176966],[24.059877859173923,47.74112335664847],[24.057921827464842,47.74798616233053],[24.063633493463996,47.74906006452082],[24.067746534569416,47.76257715154311],[24.070493073868043,47.76556665028368],[24.06198267633347,47.76742147320503],[24.051341677902407,47.771780006886075],[24.054189568377858,47.77859430436122],[24.052157337620223,47.783218750565084],[24.035071235155797,47.78075513381073],[24.0270437600887,47.7833930009384],[24.028907776620276,47.7964016378483],[24.031031335516456,47.799863211265745],[24.018167275512933,47.80629503507804],[24.015572600837967,47.81323271261208],[24.003835227796294,47.81231415527618],[24.002354119144368,47.81532698673832],[23.994485093641078,47.8182597632044]]]},"properties":{"id":2094,"natCode":107546,"name":"Călinești","natLevName":"Comuna","countyId":24,"countyCode":243,"county":"Maramureș","countyMn":"MM","regionId":6,"regionCode":868,"region":"Nord-Vest","version":"2025-03-26"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[23.94735955357212,47.79782655804984],[23.9473428400795,47.801546860847125],[23.942521205891172,47.804570270584286],[23.937048903383086,47.80436279399497],[23.937323162340327,47.798476474328886],[23.933533455697276,47.79245384103674],[23.92718617191864,47.78895962637939],[23.91597030720123,47.79510029943229],[23.91336771093606,47.799830411275934],[23.92271747828073,47.80690432987068],[23.920046244064707,47.80984745801248],[23.897491366591808,47.81315193380483],[23.889311948542847,47.81262212061762],[23.880683184769342,47.815822043291504],[23.879931908098794,47.81878691117116],[23.86945706898847,47.818917036222686],[23.848830701638423,47.82549691142016],[23.83924364351046,47.827361708929246],[23.837037980328308,47.82440608645876],[23.827860724156533,47.822238953889475],[23.822476901786946,47.82431923045988],[23.79934123931866,47.829764222022206],[23.792681206169608,47.829021897407316],[23.785787791821452,47.83228944684141],[23.76351462412757,47.83164387892497],[23.757515692668917,47.83234484259492],[23.7374314788929,47.83159305195352],[23.72518005463728,47.82871999300168],[23.71011839167133,47.820754230908086],[23.711641356884858,47.813164679740666],[23.705221657877214,47.80905015727507],[23.703570392075452,47.804545635988724],[23.714975784630205,47.79920791772396],[23.735743701330875,47.798000131090944],[23.746753731574547,47.79273710441089],[23.75764125250819,47.798391333355255],[23.762539727853056,47.81177533851292],[23.767632455938852,47.81396715267559],[23.77258655904477,47.80333881632193],[23.77679509095926,47.798114657634926],[23.784831016205512,47.79422743063256],[23.798322232398185,47.794670187682414],[23.802568324079243,47.79998298065189],[23.81151438940597,47.807088468629765],[23.826037273544664,47.81404386730746],[23.836789423465255,47.810752799781724],[23.845768654039208,47.813045230259156],[23.86314816058654,47.80951303922718],[23.862041538563563,47.80426277941685],[23.86770436994209,47.801242515633064],[23.89409307428469,47.791733697139506],[23.905271241463932,47.782496524752744],[23.898464906675525,47.77593451100751],[23.88869809495598,47.7723730535913],[23.88060716864665,47.77553740208074],[23.875606853183328,47.77503260483722],[23.87034516417246,47.763751120376945],[23.86425806402824,47.75483908433508],[23.858661323939156,47.75148533207875],[23.85578834269389,47.747076223465136],[23.848257550991555,47.744593858294216],[23.848213774216745,47.739928307104876],[23.844118299897765,47.73116483585777],[23.852611503131396,47.72553589324027],[23.855279643321023,47.718771134625946],[23.858388816100437,47.71760142461322],[23.855857563565234,47.707194859318534],[23.84949519434994,47.69609236012621],[23.851315108946824,47.694151411645336],[23.861537304295652,47.69581970490026],[23.863406917521257,47.693292508503504],[23.873178245088244,47.692823878430254],[23.877656623009244,47.69543740755738],[23.8913306674105,47.69710455200047],[23.897448588171148,47.69405513610297],[23.90331591254374,47.696289472207944],[23.91246555619611,47.71544851181194],[23.91161165528214,47.72419480559588],[23.91774232724786,47.72835908645267],[23.925832965540796,47.73779619939639],[23.919161071606002,47.74714922901102],[23.921281005493757,47.752920370352285],[23.918203785812967,47.761419015263186],[23.926202360790604,47.76231524722536],[23.931291542595137,47.76094629310634],[23.94455007523658,47.77214431354486],[23.948461336151805,47.77151112249563],[23.954246924140836,47.77514501347739],[23.948507455552587,47.78224509575382],[23.95389534834343,47.78678507673905],[23.94943740088085,47.79029321846491],[23.94735955357212,47.79782655804984]]]},"properties":{"id":2097,"natCode":108400,"name":"Ocna Șugatag","natLevName":"Comuna","countyId":24,"countyCode":243,"county":"Maramureș","countyMn":"MM","regionId":6,"regionCode":868,"region":"Nord-Vest","version":"2025-03-26"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[24.384077701847353,47.80130957210784],[24.373736935566047,47.809033035890195],[24.375841095370017,47.81224001172809],[24.37023539698511,47.817636920752776],[24.353301397218324,47.81465439132704],[24.33749979435823,47.81453202920379],[24.328371912011473,47.827640723130955],[24.31866478109143,47.83111828151418],[24.313162626919127,47.837437901760374],[24.30035260587177,47.832867413522536],[24.299483486614964,47.82964995634488],[24.28612024518586,47.82090006646456],[24.277688122492872,47.81996104487998],[24.270518594810586,47.816714505926896],[24.268094638786216,47.811945855239614],[24.2537284942657,47.80734824197851],[24.250092228059675,47.8073862121243],[24.249752947836818,47.80547533104913],[24.248769917348625,47.794553831760794],[24.256246275148253,47.78911391806874],[24.26275994377872,47.788410415373185],[24.26854381415723,47.78338955425983],[24.28353211008025,47.78188576755686],[24.30113973800201,47.782896595334606],[24.30750628048506,47.780637640984835],[24.314179197649853,47.773637955830026],[24.327977899634035,47.76896775542535],[24.331331290790985,47.77392863214557],[24.339713053398672,47.77946125764921],[24.36947391609456,47.79149395475227],[24.38143212497625,47.79241679152543],[24.38533087074605,47.79591504500513],[24.384077701847353,47.80130957210784]]]},"properties":{"id":2098,"natCode":108696,"name":"Ruscova","natLevName":"Comuna","countyId":24,"countyCode":243,"county":"Maramureș","countyMn":"MM","regionId":6,"regionCode":868,"region":"Nord-Vest","version":"2025-03-26"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[24.13974247263285,47.8478963948326],[24.13261293677886,47.84579900173575],[24.12519470648448,47.85101760530335],[24.110384511091112,47.851411187066006],[24.104057771951197,47.84857541243966],[24.092450502789497,47.849292409851174],[24.091966556269817,47.854718096977514],[24.07479762562706,47.85884509657049],[24.06822121181484,47.858278286223545],[24.055559743038568,47.86012457654422],[24.048467435346577,47.854708117398935],[24.03897040888573,47.857956347795955],[24.03048001500761,47.85749049425587],[24.0266036812057,47.8498851792469],[24.021027299852186,47.849643747050685],[24.015771191601743,47.85270935560493],[24.00851108561815,47.84955377653142],[24.000392863839885,47.84401453424917],[23.996833463934276,47.83571482402623],[23.996361783735182,47.82462563627782],[23.994485093641078,47.8182597632044],[24.002354119144368,47.81532698673832],[24.003835227796294,47.81231415527618],[24.015572600837967,47.81323271261208],[24.018167275512933,47.80629503507804],[24.031031335516456,47.799863211265745],[24.028907776620276,47.7964016378483],[24.0270437600887,47.7833930009384],[24.035071235155797,47.78075513381073],[24.052157337620223,47.783218750565084],[24.054189568377858,47.77859430436122],[24.051341677902407,47.771780006886075],[24.06198267633347,47.76742147320503],[24.070493073868043,47.76556665028368],[24.07128207964039,47.77254442411554],[24.078056861858535,47.77554639034033],[24.096026080916463,47.776343779909496],[24.096460323870932,47.786207248976126],[24.092966114866567,47.79048064986969],[24.094404427923017,47.79652257535257],[24.10478782804455,47.80644775810385],[24.115308584075546,47.808977051584826],[24.121851993353026,47.81454897474226],[24.12748055865227,47.81446012267637],[24.13552750539947,47.81777346784158],[24.14548054308734,47.817468960969904],[24.151491951958484,47.82912781925758],[24.149407402199618,47.84502930131162],[24.13974247263285,47.8478963948326]]]},"properties":{"id":2105,"natCode":107314,"name":"Bârsana","natLevName":"Comuna","countyId":24,"countyCode":243,"county":"Maramureș","countyMn":"MM","regionId":6,"regionCode":868,"region":"Nord-Vest","version":"2025-03-26"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[24.88315048789658,47.72437107522827],[24.886438035498493,47.73392026605005],[24.881400527013646,47.738955133825826],[24.87819868106104,47.75265946159736],[24.855284547688683,47.76578339952054],[24.85485908312055,47.77070775435964],[24.851383682505933,47.77467918922574],[24.836524583898168,47.77951981552706],[24.837680923965742,47.78639043542757],[24.836594744161236,47.79359813590089],[24.833480032812954,47.797623017085336],[24.821535047544575,47.80621404442018],[24.823166819419253,47.812727227630276],[24.827750397414288,47.82047630592558],[24.79752815804571,47.82468706025081],[24.784123304924133,47.82343738039369],[24.778871509645917,47.83125756619737],[24.778118809524386,47.837402332677165],[24.76528517362912,47.83933700625134],[24.758384541461027,47.83709404911618],[24.752970679564616,47.829738597739066],[24.740782056340425,47.83689349449199],[24.739285817517207,47.841137296887275],[24.73440616490534,47.8438557969866],[24.719791183445246,47.83932752563169],[24.705795400898154,47.84012430480739],[24.70291945710834,47.852468976235386],[24.68520519014284,47.85505496413379],[24.681793774160457,47.86026933736185],[24.67230449915679,47.86311714618652],[24.670900945257806,47.865294468682364],[24.65863060515089,47.85981081160355],[24.64718017656112,47.85309083945735],[24.642805579173857,47.85414376096592],[24.635758424172266,47.84724500834194],[24.62813124496828,47.84511522179318],[24.610764920845288,47.831183371665894],[24.601761804881363,47.82930660534111],[24.59595898097376,47.82636533712203],[24.59116163246458,47.8190078011866],[24.590681947672422,47.8097140947565],[24.592240697512302,47.80487036768309],[24.58346650412725,47.794671013606816],[24.57211558154988,47.79561782656525],[24.561167198012853,47.79383187025518],[24.559592944521825,47.788655212863674],[24.536633029490126,47.7759333334117],[24.52760565185717,47.76971384090317],[24.52099038496834,47.771984334426946],[24.504836052443586,47.77217928296082],[24.49698013899544,47.77384203725496],[24.485530552728648,47.769692323454095],[24.477470672645357,47.769152489696985],[24.468800808445838,47.7662349258551],[24.461951188770207,47.77555445807309],[24.454007649452723,47.779706898812286],[24.44351553889508,47.78146136832827],[24.437191019501366,47.78537594872235],[24.4349912748749,47.793639644406525],[24.427159056607053,47.793345954145664],[24.42115525542793,47.790961221425896],[24.411121679222084,47.79389685597981],[24.396943795732053,47.79021066452857],[24.40071903186072,47.78440112528207],[24.399784490611946,47.78003189311582],[24.385513607517105,47.77190266550699],[24.375570883897833,47.76195897942464],[24.380581482445294,47.75528244635297],[24.39113603250885,47.750714211725985],[24.387923113445613,47.748939745992594],[24.397488861289858,47.74000354160093],[24.38972383870605,47.73147406201162],[24.383237639712572,47.71132155626084],[24.3854534402769,47.706531681640435],[24.391744127369883,47.700847694216264],[24.389667090356678,47.69316232301347],[24.389272386174397,47.67919751959391],[24.391699498981765,47.674734961420626],[24.40553849474682,47.67336621516486],[24.413286348143735,47.67745693402917],[24.424398652438615,47.67729441332432],[24.42540939114004,47.6679088529733],[24.4349245797509,47.663305147014114],[24.448439314830086,47.66701200562104],[24.449051144074847,47.663621046778324],[24.45558728570174,47.65925037466798],[24.468885666836716,47.664437067179996],[24.47536521108286,47.67542140274481],[24.49303954492024,47.68877802065451],[24.506335479314657,47.68989710868388],[24.51694736057818,47.692362889443984],[24.531095334402355,47.69079509497624],[24.536054217246864,47.68565751486188],[24.543832094585024,47.68315394811611],[24.556355732924533,47.68690815468078],[24.567344332541865,47.688705549834125],[24.576107834145912,47.68263425396275],[24.58612343751479,47.680284610883106],[24.598913689792642,47.68231552789571],[24.611518935694185,47.68029646242721],[24.6205534984731,47.68702228752875],[24.606506231785012,47.70428471501183],[24.604801072986255,47.71184842948687],[24.61131281810167,47.71335348871907],[24.616773820519846,47.717445199475655],[24.629455894835086,47.72105011308858],[24.6359734494832,47.72071505974186],[24.642626795357035,47.72319851287801],[24.653822557112385,47.72404485548879],[24.671479366476063,47.72724123240002],[24.69457572344706,47.72406346735226],[24.699179545734644,47.72444090370541],[24.71303793726672,47.72220366304388],[24.720822079766403,47.730752462212784],[24.727450042851917,47.72912272114134],[24.7401165325906,47.72969290721921],[24.75034600603756,47.727033986244344],[24.75737634397337,47.71918790266909],[24.772181539980306,47.71718865032911],[24.786566295340013,47.71078390561892],[24.79488966210757,47.71266140103385],[24.808997447226815,47.710730368902944],[24.81665163594946,47.711278698801394],[24.822054178617396,47.7162229550916],[24.830043892930917,47.71939437408049],[24.83646461406389,47.7162389741881],[24.85561819025952,47.71431975917076],[24.861468142345004,47.70981577172006],[24.870773846651634,47.70748537158868],[24.881056530276584,47.712508550867994],[24.887538384030613,47.71833924982621],[24.88315048789658,47.72437107522827]]]},"properties":{"id":2107,"natCode":106979,"name":"Vișeu de Sus","natLevName":"Oras","countyId":24,"countyCode":243,"county":"Maramureș","countyMn":"MM","regionId":6,"regionCode":868,"region":"Nord-Vest","version":"2025-03-26"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[23.94520519181028,47.86584433598904],[23.935873283236248,47.8709069006758],[23.929795887076867,47.86822081358663],[23.92564826309032,47.870281875980716],[23.915845667052682,47.86710659384501],[23.91163390359588,47.8683751072918],[23.902757420090754,47.86642474403902],[23.891667126718346,47.862117779978156],[23.878811544436072,47.861265088997285],[23.873630850233226,47.86378733152767],[23.858265432341295,47.863959412699536],[23.855467052691964,47.86183804835499],[23.836949348230217,47.860358943172635],[23.83301880488083,47.85390377332751],[23.828835521675074,47.855245529501865],[23.820669703620965,47.849970979710065],[23.807468941092296,47.85629361835257],[23.79958394380764,47.85545753120051],[23.790217187837666,47.85242426756025],[23.77083552454435,47.84396596652087],[23.761106109152784,47.84236232772822],[23.755230656484784,47.847401903009604],[23.740321206600893,47.849314756857694],[23.732269134671835,47.84688476516799],[23.72174334619788,47.84525280177685],[23.71463222929788,47.84735280422348],[23.70727218304213,47.84617109948095],[23.70476384196276,47.84297763269592],[23.68740230284526,47.83785256727744],[23.684059111869317,47.834689425593105],[23.69608180872075,47.830673924363325],[23.697147545222567,47.82460459877164],[23.71011839167133,47.820754230908086],[23.72518005463728,47.82871999300168],[23.7374314788929,47.83159305195352],[23.757515692668917,47.83234484259492],[23.76351462412757,47.83164387892497],[23.785787791821452,47.83228944684141],[23.792681206169608,47.829021897407316],[23.79934123931866,47.829764222022206],[23.822476901786946,47.82431923045988],[23.827860724156533,47.822238953889475],[23.837037980328308,47.82440608645876],[23.83924364351046,47.827361708929246],[23.848830701638423,47.82549691142016],[23.86945706898847,47.818917036222686],[23.879931908098794,47.81878691117116],[23.880683184769342,47.815822043291504],[23.889311948542847,47.81262212061762],[23.897491366591808,47.81315193380483],[23.920046244064707,47.80984745801248],[23.92271747828073,47.80690432987068],[23.91336771093606,47.799830411275934],[23.91597030720123,47.79510029943229],[23.92718617191864,47.78895962637939],[23.933533455697276,47.79245384103674],[23.937323162340327,47.798476474328886],[23.937048903383086,47.80436279399497],[23.942521205891172,47.804570270584286],[23.9473428400795,47.801546860847125],[23.94735955357212,47.79782655804984],[23.953269817190296,47.808140925975536],[23.95143380454811,47.81571373853316],[23.95916142852983,47.82320216303298],[23.972940733438243,47.82510055110228],[23.97031508903497,47.830337341321396],[23.95841963281319,47.839792330911486],[23.94520519181028,47.86584433598904]]]},"properties":{"id":2111,"natCode":108151,"name":"Giulești","natLevName":"Comuna","countyId":24,"countyCode":243,"county":"Maramureș","countyMn":"MM","regionId":6,"regionCode":868,"region":"Nord-Vest","version":"2025-03-26"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[24.250092228059675,47.8073862121243],[24.243621310656376,47.81802926979349],[24.234124521513206,47.82642717187881],[24.218526399776916,47.83034133105539],[24.216671907733446,47.833918451164756],[24.20669531462917,47.83794166614316],[24.20492736464955,47.84995637297103],[24.201405121043546,47.85539949657913],[24.202153932613292,47.85866218436527],[24.188485141580127,47.86225299352698],[24.18420949672787,47.85849768691688],[24.173288203072403,47.85589593678342],[24.172889602009203,47.85850582967113],[24.18101196946712,47.86034458134027],[24.18165500539854,47.8633805834358],[24.168756284977576,47.87006491324043],[24.15519230411711,47.8745096269171],[24.149551392329435,47.866242279236026],[24.14466189782604,47.86705154330378],[24.140366772718128,47.863715660452016],[24.14141754214884,47.85752724165017],[24.13974247263285,47.8478963948326],[24.149407402199618,47.84502930131162],[24.151491951958484,47.82912781925758],[24.14548054308734,47.817468960969904],[24.163600617061523,47.81558878384445],[24.17109902220198,47.81232084576283],[24.175088151509996,47.80319221168473],[24.179025890760734,47.800602085987755],[24.181437327284222,47.79437839711648],[24.19621417183198,47.78926115636475],[24.210430844522868,47.78849189068028],[24.218335511950166,47.792814621884744],[24.22752172067054,47.794486160664675],[24.23451633612422,47.803903342726834],[24.243844046973035,47.8020418486193],[24.249752947836818,47.80547533104913],[24.250092228059675,47.8073862121243]]]},"properties":{"id":2112,"natCode":108455,"name":"Petrova","natLevName":"Comuna","countyId":24,"countyCode":243,"county":"Maramureș","countyMn":"MM","regionId":6,"regionCode":868,"region":"Nord-Vest","version":"2025-03-26"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[24.03048001500761,47.85749049425587],[24.027388737571965,47.859244867481834],[24.027349063355544,47.8668293901342],[24.016396551088345,47.878546952228824],[24.00952041473026,47.86744813613193],[24.000372941652326,47.862226973654515],[23.9912638506219,47.86545235344378],[23.973533193081963,47.86956985339301],[23.966826327486302,47.87379712907886],[23.950001860706546,47.865440028707276],[23.94520519181028,47.86584433598904],[23.95841963281319,47.839792330911486],[23.97031508903497,47.830337341321396],[23.972940733438243,47.82510055110228],[23.98012164595348,47.819403921300996],[23.98712346585032,47.81685249076598],[23.994485093641078,47.8182597632044],[23.996361783735182,47.82462563627782],[23.996833463934276,47.83571482402623],[24.000392863839885,47.84401453424917],[24.00851108561815,47.84955377653142],[24.015771191601743,47.85270935560493],[24.021027299852186,47.849643747050685],[24.0266036812057,47.8498851792469],[24.03048001500761,47.85749049425587]]]},"properties":{"id":2113,"natCode":179864,"name":"Oncești","natLevName":"Comuna","countyId":24,"countyCode":243,"county":"Maramureș","countyMn":"MM","regionId":6,"regionCode":868,"region":"Nord-Vest","version":"2025-03-26"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[23.973000619739288,47.89230590219577],[23.970134687368795,47.88905591486081],[23.96181954217367,47.88699090963615],[23.953380309669914,47.892057176871],[23.951351052225668,47.89582919118105],[23.94555037618624,47.89516617888953],[23.940532372428965,47.89139025003223],[23.93082192733291,47.89143060847352],[23.922179147979268,47.88880752163378],[23.92166517462761,47.883921214829606],[23.914041579649105,47.87928304456289],[23.91163390359588,47.8683751072918],[23.915845667052682,47.86710659384501],[23.92564826309032,47.870281875980716],[23.929795887076867,47.86822081358663],[23.935873283236248,47.8709069006758],[23.94520519181028,47.86584433598904],[23.950001860706546,47.865440028707276],[23.966826327486302,47.87379712907886],[23.973533193081963,47.86956985339301],[23.9912638506219,47.86545235344378],[24.000372941652326,47.862226973654515],[24.00952041473026,47.86744813613193],[24.016396551088345,47.878546952228824],[24.000672300043103,47.882672390939106],[23.981846413911313,47.890589591555155],[23.973000619739288,47.89230590219577]]]},"properties":{"id":2117,"natCode":106648,"name":"Vadu Izei","natLevName":"Comuna","countyId":24,"countyCode":243,"county":"Maramureș","countyMn":"MM","regionId":6,"regionCode":868,"region":"Nord-Vest","version":"2025-03-26"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[24.34463051153131,47.91475205269174],[24.334739333124325,47.91779694099712],[24.324898583230095,47.92590010226373],[24.31594276903659,47.923194875114035],[24.30931101144019,47.918323401836155],[24.30383899246316,47.917076709377206],[24.29777457370549,47.91147352436076],[24.292361479825423,47.911161178701455],[24.279621864308062,47.9060082672582],[24.265486290067937,47.90752326973631],[24.255530879954136,47.906721997276016],[24.24041724639575,47.89932803961715],[24.228271421448053,47.89648356368552],[24.21854282356714,47.89757327487814],[24.217426776904965,47.90276131270286],[24.208837912941515,47.90889859412977],[24.20136938114733,47.91146808121396],[24.1966798971732,47.91606772460264],[24.181510813489595,47.91496696108889],[24.165084864252012,47.92027001306015],[24.160178762952878,47.914884126209],[24.14972395805354,47.916784809488384],[24.145055082169797,47.91294728843353],[24.138539546086434,47.91201334341202],[24.131937621369985,47.91550072211263],[24.118080384453055,47.91497576779183],[24.116662790400447,47.905908075550734],[24.118535001348434,47.89957795904261],[24.114384982884754,47.892362977625254],[24.121273078432093,47.88272288594946],[24.120172783535956,47.87561887716417],[24.12746475046148,47.87251663825258],[24.133685276836143,47.87191299795397],[24.14466189782604,47.86705154330378],[24.149551392329435,47.866242279236026],[24.15519230411711,47.8745096269171],[24.168756284977576,47.87006491324043],[24.18165500539854,47.8633805834358],[24.18101196946712,47.86034458134027],[24.172889602009203,47.85850582967113],[24.173288203072403,47.85589593678342],[24.18420949672787,47.85849768691688],[24.188485141580127,47.86225299352698],[24.202153932613292,47.85866218436527],[24.201405121043546,47.85539949657913],[24.20492736464955,47.84995637297103],[24.20669531462917,47.83794166614316],[24.216671907733446,47.833918451164756],[24.218526399776916,47.83034133105539],[24.234124521513206,47.82642717187881],[24.243621310656376,47.81802926979349],[24.250092228059675,47.8073862121243],[24.2537284942657,47.80734824197851],[24.268094638786216,47.811945855239614],[24.270518594810586,47.816714505926896],[24.277688122492872,47.81996104487998],[24.28612024518586,47.82090006646456],[24.299483486614964,47.82964995634488],[24.30035260587177,47.832867413522536],[24.313162626919127,47.837437901760374],[24.316439216824687,47.84284705815226],[24.31216060183137,47.844671783086454],[24.31601893823179,47.851788161130585],[24.316077246132007,47.856868221529865],[24.324742546703938,47.857313226218956],[24.329359376673395,47.85473613489676],[24.333488390263422,47.86004843270968],[24.34798924529575,47.86670846051678],[24.34976041632714,47.87433350638171],[24.356555101901936,47.87930080880774],[24.357635272145185,47.88581361758756],[24.353463296740518,47.892027812877295],[24.34778028891761,47.89557465267571],[24.34477349782868,47.90009689459314],[24.34830011584614,47.90963956731171],[24.34463051153131,47.91475205269174]]]},"properties":{"id":2127,"natCode":107270,"name":"Bistra","natLevName":"Comuna","countyId":24,"countyCode":243,"county":"Maramureș","countyMn":"MM","regionId":6,"regionCode":868,"region":"Nord-Vest","version":"2025-03-26"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[24.0994052775445,47.93044419494291],[24.092429059894,47.930379027671776],[24.08138667759042,47.9276716753732],[24.065966646013386,47.92535507579972],[24.06172541142781,47.92137577177789],[24.03308313301557,47.91879615750218],[24.02990398480008,47.91552524829881],[24.017156298998657,47.91203725762568],[24.0003897153848,47.89737758372326],[23.98717872959896,47.896615087440296],[23.982084551620915,47.894585233609305],[23.981846413911313,47.890589591555155],[24.000672300043103,47.882672390939106],[24.016396551088345,47.878546952228824],[24.027349063355544,47.8668293901342],[24.027388737571965,47.859244867481834],[24.03048001500761,47.85749049425587],[24.03897040888573,47.857956347795955],[24.048467435346577,47.854708117398935],[24.055559743038568,47.86012457654422],[24.06822121181484,47.858278286223545],[24.07479762562706,47.85884509657049],[24.091966556269817,47.854718096977514],[24.092450502789497,47.849292409851174],[24.104057771951197,47.84857541243966],[24.110384511091112,47.851411187066006],[24.12519470648448,47.85101760530335],[24.13261293677886,47.84579900173575],[24.13974247263285,47.8478963948326],[24.14141754214884,47.85752724165017],[24.140366772718128,47.863715660452016],[24.14466189782604,47.86705154330378],[24.133685276836143,47.87191299795397],[24.12746475046148,47.87251663825258],[24.120172783535956,47.87561887716417],[24.121273078432093,47.88272288594946],[24.114384982884754,47.892362977625254],[24.118535001348434,47.89957795904261],[24.116662790400447,47.905908075550734],[24.118080384453055,47.91497576779183],[24.109803002403467,47.91599052850448],[24.0994052775445,47.93044419494291]]]},"properties":{"id":2130,"natCode":108632,"name":"Rona de Sus","natLevName":"Comuna","countyId":24,"countyCode":243,"county":"Maramureș","countyMn":"MM","regionId":6,"regionCode":868,"region":"Nord-Vest","version":"2025-03-26"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[24.08138667759042,47.9276716753732],[24.06550052723101,47.927976376324416],[24.050181001471298,47.932247498318524],[24.041064292157373,47.93330173059658],[24.029636462953427,47.939282508672186],[24.02334665624609,47.94403740759255],[24.005324844539974,47.94013190529376],[23.989738091026197,47.938649914131894],[23.982807756032066,47.93376534756684],[23.97457702820629,47.93427287193119],[23.96770450908592,47.93421223071448],[23.966200338384873,47.93066456054396],[23.972571974031265,47.923322650834194],[23.968051094057632,47.91888967777604],[23.966231631552407,47.910532459909504],[23.969830167607498,47.906727807584815],[23.969123325125654,47.90079065471323],[23.973000619739288,47.89230590219577],[23.981846413911313,47.890589591555155],[23.982084551620915,47.894585233609305],[23.98717872959896,47.896615087440296],[24.0003897153848,47.89737758372326],[24.017156298998657,47.91203725762568],[24.02990398480008,47.91552524829881],[24.03308313301557,47.91879615750218],[24.06172541142781,47.92137577177789],[24.065966646013386,47.92535507579972],[24.08138667759042,47.9276716753732]]]},"properties":{"id":2135,"natCode":108614,"name":"Rona de Jos","natLevName":"Comuna","countyId":24,"countyCode":243,"county":"Maramureș","countyMn":"MM","regionId":6,"regionCode":868,"region":"Nord-Vest","version":"2025-03-26"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[24.670900945257806,47.865294468682364],[24.665789348662884,47.876506778233974],[24.66818975628878,47.88122173180971],[24.66728267199716,47.88570787074072],[24.6737823780222,47.89637989965825],[24.660969917447208,47.90886299997283],[24.652592694034198,47.91066176580943],[24.65158004677277,47.919118584020005],[24.63504051643691,47.92457468787267],[24.636538839252193,47.92979261295008],[24.62983494821698,47.93442193988899],[24.632344523516274,47.9397868163019],[24.628386452772798,47.94794837019272],[24.623380021717455,47.9517721189888],[24.610827340147353,47.95184718546233],[24.601695546229518,47.94533715208113],[24.592692666768674,47.95663618469368],[24.584102930589452,47.96073597361361],[24.583302020820312,47.96487040655179],[24.57539842385141,47.96739141801024],[24.56286803169931,47.968595647538606],[24.54959939036998,47.95993583989642],[24.536940944769892,47.96193234317768],[24.526999835006507,47.96154296686089],[24.513483647810673,47.953682640679716],[24.502014188555346,47.95228629520879],[24.49444695529303,47.955455028184026],[24.487730978054188,47.955870534440656],[24.485140952078666,47.95023062862281],[24.473727154637103,47.94140187292915],[24.46513880243783,47.92686956198057],[24.453056348633464,47.921299705696654],[24.452008628545777,47.916410329573296],[24.456950163388175,47.9094056104004],[24.46368386737225,47.9057131560222],[24.4573836639312,47.902744965150404],[24.456442834033005,47.8924100714602],[24.453223578359893,47.883362390970035],[24.445703275421934,47.87744071001937],[24.446887637228457,47.87166850369728],[24.439260378939554,47.866476912855276],[24.431731198309112,47.8633010473071],[24.424277845952993,47.85539062996325],[24.423766431685422,47.8475571454385],[24.419855580387992,47.84488987502792],[24.417119199568425,47.8325270989673],[24.41150459477073,47.83215654589767],[24.41033115665034,47.826712980607226],[24.399593720815023,47.820456523371234],[24.387497938407826,47.81613835075968],[24.380162251966034,47.81046964521733],[24.384077701847353,47.80130957210784],[24.38533087074605,47.79591504500513],[24.38143212497625,47.79241679152543],[24.390462875508923,47.7886291253099],[24.396943795732053,47.79021066452857],[24.411121679222084,47.79389685597981],[24.42115525542793,47.790961221425896],[24.427159056607053,47.793345954145664],[24.4349912748749,47.793639644406525],[24.437191019501366,47.78537594872235],[24.44351553889508,47.78146136832827],[24.454007649452723,47.779706898812286],[24.461951188770207,47.77555445807309],[24.468800808445838,47.7662349258551],[24.477470672645357,47.769152489696985],[24.485530552728648,47.769692323454095],[24.49698013899544,47.77384203725496],[24.504836052443586,47.77217928296082],[24.52099038496834,47.771984334426946],[24.52760565185717,47.76971384090317],[24.536633029490126,47.7759333334117],[24.559592944521825,47.788655212863674],[24.561167198012853,47.79383187025518],[24.57211558154988,47.79561782656525],[24.58346650412725,47.794671013606816],[24.592240697512302,47.80487036768309],[24.590681947672422,47.8097140947565],[24.59116163246458,47.8190078011866],[24.59595898097376,47.82636533712203],[24.601761804881363,47.82930660534111],[24.610764920845288,47.831183371665894],[24.62813124496828,47.84511522179318],[24.635758424172266,47.84724500834194],[24.642805579173857,47.85414376096592],[24.64718017656112,47.85309083945735],[24.65863060515089,47.85981081160355],[24.670900945257806,47.865294468682364]]]},"properties":{"id":2138,"natCode":108473,"name":"Poienile de Sub Munte","natLevName":"Comuna","countyId":24,"countyCode":243,"county":"Maramureș","countyMn":"MM","regionId":6,"regionCode":868,"region":"Nord-Vest","version":"2025-03-26"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[24.487730978054188,47.955870534440656],[24.47174908645609,47.96305951152207],[24.4639660671978,47.96169567794012],[24.446851126361118,47.964179597704565],[24.435877233693354,47.97051233371468],[24.42893713012178,47.96772245503347],[24.417205268706937,47.95966107310575],[24.409686864910913,47.96007827347723],[24.392191301051735,47.952802287592824],[24.39214365993189,47.948419253893114],[24.38033818847966,47.93387954467113],[24.3815965724789,47.926587680629176],[24.36859092949283,47.92326220283623],[24.350145435713717,47.91553884230984],[24.34463051153131,47.91475205269174],[24.34830011584614,47.90963956731171],[24.34477349782868,47.90009689459314],[24.34778028891761,47.89557465267571],[24.353463296740518,47.892027812877295],[24.357635272145185,47.88581361758756],[24.356555101901936,47.87930080880774],[24.34976041632714,47.87433350638171],[24.34798924529575,47.86670846051678],[24.333488390263422,47.86004843270968],[24.329359376673395,47.85473613489676],[24.324742546703938,47.857313226218956],[24.316077246132007,47.856868221529865],[24.31601893823179,47.851788161130585],[24.31216060183137,47.844671783086454],[24.316439216824687,47.84284705815226],[24.313162626919127,47.837437901760374],[24.31866478109143,47.83111828151418],[24.328371912011473,47.827640723130955],[24.33749979435823,47.81453202920379],[24.353301397218324,47.81465439132704],[24.37023539698511,47.817636920752776],[24.375841095370017,47.81224001172809],[24.373736935566047,47.809033035890195],[24.384077701847353,47.80130957210784],[24.380162251966034,47.81046964521733],[24.387497938407826,47.81613835075968],[24.399593720815023,47.820456523371234],[24.41033115665034,47.826712980607226],[24.41150459477073,47.83215654589767],[24.417119199568425,47.8325270989673],[24.419855580387992,47.84488987502792],[24.423766431685422,47.8475571454385],[24.424277845952993,47.85539062996325],[24.431731198309112,47.8633010473071],[24.439260378939554,47.866476912855276],[24.446887637228457,47.87166850369728],[24.445703275421934,47.87744071001937],[24.453223578359893,47.883362390970035],[24.456442834033005,47.8924100714602],[24.4573836639312,47.902744965150404],[24.46368386737225,47.9057131560222],[24.456950163388175,47.9094056104004],[24.452008628545777,47.916410329573296],[24.453056348633464,47.921299705696654],[24.46513880243783,47.92686956198057],[24.473727154637103,47.94140187292915],[24.485140952078666,47.95023062862281],[24.487730978054188,47.955870534440656]]]},"properties":{"id":2139,"natCode":108598,"name":"Repedea","natLevName":"Comuna","countyId":24,"countyCode":243,"county":"Maramureș","countyMn":"MM","regionId":6,"regionCode":868,"region":"Nord-Vest","version":"2025-03-26"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[24.0994052775445,47.93044419494291],[24.09859890899929,47.936514068116196],[24.08263181172774,47.94338745461456],[24.071088151427602,47.9470208991388],[24.062194148705057,47.953404571456566],[24.049714040424984,47.95340445691901],[24.031849966810977,47.949277727744544],[24.0254631754759,47.95701514236023],[24.009054578147644,47.96726070405303],[24.00400640704328,47.96646080330466],[23.996755925139176,47.96198699987683],[23.99080946738154,47.963236908502104],[23.98032570108795,47.95971796224104],[23.977700672012965,47.9673576070665],[23.973558883033107,47.967869669270584],[23.965994136988076,47.962595776005685],[23.95726488750333,47.96501444727947],[23.948583340622175,47.96152780544737],[23.945050576591488,47.95235234069509],[23.94357424901762,47.94543916074203],[23.938142024675653,47.942519483265244],[23.93967442960917,47.93965690461635],[23.94772787669432,47.94009564251744],[23.958607019039373,47.93440659455926],[23.96553809991465,47.937615737915806],[23.97457702820629,47.93427287193119],[23.982807756032066,47.93376534756684],[23.989738091026197,47.938649914131894],[24.005324844539974,47.94013190529376],[24.02334665624609,47.94403740759255],[24.029636462953427,47.939282508672186],[24.041064292157373,47.93330173059658],[24.050181001471298,47.932247498318524],[24.06550052723101,47.927976376324416],[24.08138667759042,47.9276716753732],[24.092429059894,47.930379027671776],[24.0994052775445,47.93044419494291]]]},"properties":{"id":2140,"natCode":107350,"name":"Bocicoiu Mare","natLevName":"Comuna","countyId":24,"countyCode":243,"county":"Maramureș","countyMn":"MM","regionId":6,"regionCode":868,"region":"Nord-Vest","version":"2025-03-26"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[23.744785724218474,47.92282008215302],[23.744101130835904,47.9241579007037],[23.726345115140397,47.93263126312832],[23.725582452073944,47.93930124859407],[23.731763089759525,47.941773539801176],[23.727996276114858,47.95058358164414],[23.722367805220724,47.951966184306876],[23.720706704472768,47.956089410488744],[23.726122493168443,47.96104218423411],[23.724117360079582,47.96352796898571],[23.723951747755816,47.97525292152124],[23.72592109851365,47.97548569368088],[23.72676797786426,47.98650127448304],[23.720640833299722,47.99495747752912],[23.719612903147667,47.98992684302354],[23.71401953739309,47.98930663025192],[23.707632393804666,47.994293104786365],[23.685169064956334,47.98703159994144],[23.672933127191367,47.98634281419937],[23.664667327380737,47.983732455614195],[23.6613345550986,47.986291056789064],[23.65765469907877,47.9725826141865],[23.65274093987583,47.96720254367639],[23.64599604696632,47.96609250122565],[23.642075872122543,47.962815972959426],[23.644953150659777,47.9565288907721],[23.636619383414388,47.9543390133927],[23.635904288196325,47.95052162525857],[23.61915715253029,47.951844016084046],[23.606403916920733,47.948645775967954],[23.60222085950359,47.94877263973444],[23.59698397062667,47.94305168746358],[23.581387460562116,47.94487994341938],[23.572935513563564,47.94745388851066],[23.56251601743068,47.943785273528576],[23.565054204629924,47.942881027990666],[23.56858662698263,47.93419943014499],[23.57219508061229,47.93155952568603],[23.57210415438035,47.92668002367466],[23.5799383514557,47.92432648412913],[23.582509734125964,47.92002092332956],[23.580829591945246,47.91566874639788],[23.586479868183286,47.90789247734235],[23.586695487420872,47.90226716111302],[23.59037810253883,47.89874801805257],[23.60853770084765,47.89771107244073],[23.614795937061984,47.893423097148045],[23.614954996634182,47.88913540108725],[23.62210176282292,47.8884158439721],[23.628131343979085,47.88497792046579],[23.633068582034003,47.87697410056567],[23.63633203143552,47.87477759139839],[23.639810021668893,47.86416247099038],[23.632525081430884,47.85740721106515],[23.637762247547965,47.85825664526297],[23.64954721663927,47.84710746482576],[23.659525438370945,47.84409870730523],[23.671690614856423,47.84277499296031],[23.6770550224481,47.84511010248415],[23.68546822963729,47.84242826209524],[23.68740230284526,47.83785256727744],[23.70476384196276,47.84297763269592],[23.70727218304213,47.84617109948095],[23.71463222929788,47.84735280422348],[23.72174334619788,47.84525280177685],[23.732269134671835,47.84688476516799],[23.7285009624992,47.85295324048971],[23.728597761600568,47.85887735525959],[23.733844502617472,47.8686676201768],[23.727433187557345,47.87565680879145],[23.73446977253695,47.87915197808195],[23.74068804906906,47.88431971622329],[23.750525856363396,47.8859153999167],[23.751418616656775,47.890845729326195],[23.756018968891635,47.894075004067794],[23.756721577614456,47.89842698717107],[23.751667018835644,47.90239225573911],[23.75121377172881,47.90998224562084],[23.74886971273629,47.91178689968408],[23.746491232528673,47.913026857566],[23.744785724218474,47.92282008215302]]]},"properties":{"id":2151,"natCode":108945,"name":"Săpânța","natLevName":"Comuna","countyId":24,"countyCode":243,"county":"Maramureș","countyMn":"MM","regionId":6,"regionCode":868,"region":"Nord-Vest","version":"2025-03-26"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[23.817118151105593,47.98198280811464],[23.800241143295302,47.986637152637],[23.791696661263884,47.98600682870395],[23.771812382106216,47.994945320913374],[23.762282156374642,47.99290429959442],[23.753935355835946,47.996203498886864],[23.743109577374963,47.995957606107304],[23.72870577419898,47.993486912501965],[23.720640833299722,47.99495747752912],[23.72676797786426,47.98650127448304],[23.72592109851365,47.97548569368088],[23.723951747755816,47.97525292152124],[23.724117360079582,47.96352796898571],[23.726122493168443,47.96104218423411],[23.720706704472768,47.956089410488744],[23.722367805220724,47.951966184306876],[23.727996276114858,47.95058358164414],[23.731763089759525,47.941773539801176],[23.725582452073944,47.93930124859407],[23.726345115140397,47.93263126312832],[23.744101130835904,47.9241579007037],[23.744785724218474,47.92282008215302],[23.75238330688793,47.93186820331025],[23.75894688265283,47.93543894884183],[23.761802413441167,47.9400624834091],[23.77592978314862,47.94670343640851],[23.78515337174622,47.94919486933295],[23.789039882276498,47.95467014362868],[23.796673228770803,47.95896574181832],[23.8021267336667,47.96399703177652],[23.802643455920766,47.9726437141346],[23.808114156263656,47.97968880723744],[23.817118151105593,47.98198280811464]]]},"properties":{"id":2153,"natCode":107715,"name":"Câmpulung la Tisa","natLevName":"Comuna","countyId":24,"countyCode":243,"county":"Maramureș","countyMn":"MM","regionId":6,"regionCode":868,"region":"Nord-Vest","version":"2025-03-26"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[23.6613345550986,47.986291056789064],[23.64523645692879,47.99220851083316],[23.642194293947536,47.99973529344642],[23.63473327221535,48.00296310490164],[23.623645823236334,48.00262599542811],[23.610322669731147,48.00805975989862],[23.604305458579226,48.006319764281756],[23.593485062230627,48.00834244130125],[23.585157116321913,48.00367511259912],[23.577783402452138,48.005366989387056],[23.566336105252205,48.00307160157971],[23.55182413476757,48.00847125705181],[23.54070604544046,48.00988609335255],[23.536152721072295,48.01544496764088],[23.5290640099392,48.01982491710524],[23.525894565210205,48.01270706262364],[23.525694518042158,48.00478858971885],[23.52150502994706,47.999733839091604],[23.52128029719464,47.99468957481299],[23.51710033001,47.99263679126595],[23.512318183777,47.985568816238356],[23.505251653407978,47.98060234010739],[23.501054487414862,47.96869528900408],[23.493607478758307,47.96782944930958],[23.50225422567493,47.96001620433726],[23.518513435850465,47.952785563242294],[23.531058696142434,47.951484153849854],[23.54280659130499,47.94132372712206],[23.550536047135182,47.93975226443322],[23.56251601743068,47.943785273528576],[23.572935513563564,47.94745388851066],[23.581387460562116,47.94487994341938],[23.59698397062667,47.94305168746358],[23.60222085950359,47.94877263973444],[23.606403916920733,47.948645775967954],[23.61915715253029,47.951844016084046],[23.635904288196325,47.95052162525857],[23.636619383414388,47.9543390133927],[23.644953150659777,47.9565288907721],[23.642075872122543,47.962815972959426],[23.64599604696632,47.96609250122565],[23.65274093987583,47.96720254367639],[23.65765469907877,47.9725826141865],[23.6613345550986,47.986291056789064]]]},"properties":{"id":2158,"natCode":108552,"name":"Remeți","natLevName":"Comuna","countyId":24,"countyCode":243,"county":"Maramureș","countyMn":"MM","regionId":6,"regionCode":868,"region":"Nord-Vest","version":"2025-03-26"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[23.28071420110877,47.797019612446064],[23.27555682697529,47.79593421888655],[23.261836509109912,47.797338600634504],[23.26016058943119,47.789337327336405],[23.24884989783214,47.78722696572762],[23.22482725164014,47.766409394541874],[23.23418937328689,47.765745663827374],[23.231184332999586,47.759103932851524],[23.23588148528731,47.75503697409145],[23.230100910735416,47.739166262593116],[23.237072262825208,47.73360256737361],[23.241820738506593,47.73079415481303],[23.242438177253124,47.72358953967226],[23.24855242036663,47.72325654880708],[23.254791182630218,47.72726850129374],[23.263335687696582,47.72650261902926],[23.27212911025254,47.72199148720929],[23.283921500653552,47.726178853810076],[23.291791450041888,47.7276262035137],[23.29603267848739,47.724209503890556],[23.294581118362185,47.718611001059095],[23.29929296581396,47.71742143309045],[23.303416790942308,47.71307670145901],[23.316631489284205,47.71247527351644],[23.320353477042065,47.71060573378864],[23.333436567489485,47.72265074603719],[23.33905590681512,47.72221579050136],[23.341878097102132,47.72611520467564],[23.340018222446368,47.72954053638785],[23.345310210640477,47.732620925622435],[23.33121823645926,47.74289979718002],[23.330130046651345,47.747341843302614],[23.33860188284826,47.753771328619365],[23.341254029601615,47.759677150577964],[23.34865823224534,47.759887067815015],[23.35538142848952,47.76792820633335],[23.353836835557917,47.77409716202826],[23.347395071689597,47.777749864937455],[23.34041867046338,47.77593333496811],[23.33052219315165,47.77726035409235],[23.321958142230976,47.77505796061451],[23.311203629295935,47.77491563147785],[23.307614613090106,47.77904258069974],[23.308682630597016,47.78604807802511],[23.30152736153469,47.78983052272314],[23.29223441190533,47.79082021490704],[23.28071420110877,47.797019612446064]]]},"properties":{"id":2446,"natCode":108963,"name":"Seini","natLevName":"Oras","countyId":24,"countyCode":243,"county":"Maramureș","countyMn":"MM","regionId":6,"regionCode":868,"region":"Nord-Vest","version":"2025-03-26"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[23.39102966068369,47.77949717013255],[23.37551700893265,47.77961816684647],[23.36602786502194,47.77852070709462],[23.361513975554836,47.77528404037767],[23.353836835557917,47.77409716202826],[23.35538142848952,47.76792820633335],[23.34865823224534,47.759887067815015],[23.341254029601615,47.759677150577964],[23.33860188284826,47.753771328619365],[23.330130046651345,47.747341843302614],[23.33121823645926,47.74289979718002],[23.345310210640477,47.732620925622435],[23.340018222446368,47.72954053638785],[23.341878097102132,47.72611520467564],[23.33905590681512,47.72221579050136],[23.333436567489485,47.72265074603719],[23.320353477042065,47.71060573378864],[23.328994714999105,47.7088894520791],[23.337194044919897,47.71464300864339],[23.343063233890483,47.71214126358711],[23.342874362520607,47.70690917002642],[23.351790765192852,47.70567781625583],[23.36274771740011,47.69985277484016],[23.36195638958682,47.691527761856946],[23.36603812849584,47.685353039791345],[23.373352622683804,47.68881234441139],[23.380107979884677,47.689949087325274],[23.38534982026123,47.68820266542191],[23.387128090242914,47.68395221354807],[23.37813115077319,47.67951791919953],[23.389889944543054,47.67576102924815],[23.396134367545173,47.67501256619136],[23.41161995820858,47.67063088994677],[23.427969602544756,47.67273775127022],[23.43657786104523,47.67871200266508],[23.44142812320309,47.6886380781987],[23.437542332178438,47.69140823231489],[23.440235052450724,47.705734986774395],[23.437397133165913,47.71068793165995],[23.441348455864535,47.71481325477335],[23.441497210333818,47.72109815275211],[23.43834833220328,47.7235674100395],[23.431714927311027,47.737609996979884],[23.430964379189643,47.74385207472037],[23.43439604299332,47.74800780375311],[23.445550016171275,47.75532545814225],[23.450441469278456,47.76196854240372],[23.44559071903358,47.76664886087713],[23.430614694313714,47.77027482265221],[23.424685070144147,47.766541002037506],[23.414813590645377,47.76820472555265],[23.41328703998759,47.772521081662646],[23.407830863882882,47.775927124316446],[23.392526384896666,47.77589360140231],[23.39102966068369,47.77949717013255]]]},"properties":{"id":2448,"natCode":107662,"name":"Cicârlău","natLevName":"Comuna","countyId":24,"countyCode":243,"county":"Maramureș","countyMn":"MM","regionId":6,"regionCode":868,"region":"Nord-Vest","version":"2025-03-26"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[23.256080555855174,47.527522554488854],[23.248720273489827,47.52340914188371],[23.240283362325798,47.525836985108384],[23.233847659627276,47.52465348991337],[23.228547119239963,47.520382013744324],[23.227905627327484,47.5168642154281],[23.21502312618086,47.51193005698645],[23.20714189489578,47.513688377900735],[23.19474349001288,47.512991228243926],[23.186161565047044,47.5139364554598],[23.17866446590782,47.51722432830266],[23.161499267031417,47.51985494488241],[23.15611591153546,47.51072499721887],[23.159568270525426,47.50981633141545],[23.163834733915273,47.5020312694887],[23.15999835408801,47.4976432372114],[23.168294210710926,47.49227848995977],[23.178767028109828,47.48767115853987],[23.184142720177153,47.482826323123],[23.19528199153192,47.47715627902843],[23.202348606425165,47.47059545004782],[23.217548487363043,47.478016594797424],[23.230105068887735,47.487019723970974],[23.235130150395946,47.4878560566719],[23.24051564181445,47.49374217976584],[23.255670462004424,47.496893148772784],[23.252689263722495,47.504738388754056],[23.266965110364435,47.51274053780097],[23.26781148936703,47.518549565189375],[23.260560641413036,47.51971021412599],[23.260830664406832,47.52546602107377],[23.256080555855174,47.527522554488854]]]},"properties":{"id":2902,"natCode":107047,"name":"Ariniș","natLevName":"Comuna","countyId":24,"countyCode":243,"county":"Maramureș","countyMn":"MM","regionId":6,"regionCode":868,"region":"Nord-Vest","version":"2025-03-26"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[24.021597053666415,47.707390298550415],[24.003651326007315,47.71507092132113],[24.00380049007941,47.71798944153868],[23.995339039697804,47.7250792044701],[23.981502271311815,47.74996711917415],[23.979296687365412,47.75814890616817],[23.97394584906898,47.76478575026974],[23.954246924140836,47.77514501347739],[23.948461336151805,47.77151112249563],[23.94455007523658,47.77214431354486],[23.931291542595137,47.76094629310634],[23.926202360790604,47.76231524722536],[23.918203785812967,47.761419015263186],[23.921281005493757,47.752920370352285],[23.919161071606002,47.74714922901102],[23.925832965540796,47.73779619939639],[23.91774232724786,47.72835908645267],[23.91161165528214,47.72419480559588],[23.91246555619611,47.71544851181194],[23.90331591254374,47.696289472207944],[23.897448588171148,47.69405513610297],[23.8913306674105,47.69710455200047],[23.877656623009244,47.69543740755738],[23.873178245088244,47.692823878430254],[23.863406917521257,47.693292508503504],[23.86324432569704,47.689177488383955],[23.872286684444454,47.68348963794177],[23.880807527797675,47.68112210525969],[23.887478834444792,47.68112951446775],[23.89932730421042,47.67527329914491],[23.90052681315692,47.66862237005708],[23.90547214421641,47.66612678473241],[23.908257519915765,47.660208563045806],[23.91476125510086,47.66005115521931],[23.93078892968959,47.66475268317585],[23.94374544623503,47.66579286951812],[23.958544841888276,47.66458456377697],[23.9739555288971,47.6584026092733],[23.982635055377333,47.65883971641736],[23.985752933486282,47.66552803470907],[24.01399489193565,47.670869006526615],[24.017907786212202,47.67316790799345],[24.027865578411014,47.674950384040685],[24.029206611539834,47.682211583566826],[24.033885793227896,47.69199583931927],[24.038051981451435,47.69312664832372],[24.03238729546684,47.69435839254121],[24.027504381986564,47.698520337523924],[24.027254235748593,47.706551755314656],[24.021597053666415,47.707390298550415]]]},"properties":{"id":2903,"natCode":107519,"name":"Budești","natLevName":"Comuna","countyId":24,"countyCode":243,"county":"Maramureș","countyMn":"MM","regionId":6,"regionCode":868,"region":"Nord-Vest","version":"2025-03-26"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[23.97457702820629,47.93427287193119],[23.96553809991465,47.937615737915806],[23.958607019039373,47.93440659455926],[23.94772787669432,47.94009564251744],[23.93967442960917,47.93965690461635],[23.938142024675653,47.942519483265244],[23.94357424901762,47.94543916074203],[23.945050576591488,47.95235234069509],[23.941975211144882,47.94846577612572],[23.930175220352403,47.94877750343202],[23.921159427238383,47.94525881435469],[23.913415770485784,47.94712328634655],[23.897710289120226,47.94474794139397],[23.89446660687526,47.94290245727993],[23.884389584161028,47.94424532485753],[23.867395703185277,47.93214607019339],[23.86412657618175,47.93175712290002],[23.85099292142205,47.93690912847215],[23.842394350813482,47.94384086177161],[23.843413134623216,47.94859448108105],[23.8358506511462,47.94459671079142],[23.836130007737207,47.94222790771546],[23.825366086203186,47.935457962923586],[23.82010585325903,47.93551827262456],[23.805455958170153,47.93903212252675],[23.80240484436841,47.94124690704848],[23.78074510210334,47.92765983659678],[23.77049404222844,47.92662269982318],[23.76401806498491,47.924316132804435],[23.75906597232849,47.918210437205104],[23.752582820449057,47.91682863778226],[23.74886971273629,47.91178689968408],[23.75121377172881,47.90998224562084],[23.751667018835644,47.90239225573911],[23.756721577614456,47.89842698717107],[23.756018968891635,47.894075004067794],[23.751418616656775,47.890845729326195],[23.750525856363396,47.8859153999167],[23.74068804906906,47.88431971622329],[23.73446977253695,47.87915197808195],[23.727433187557345,47.87565680879145],[23.733844502617472,47.8686676201768],[23.728597761600568,47.85887735525959],[23.7285009624992,47.85295324048971],[23.732269134671835,47.84688476516799],[23.740321206600893,47.849314756857694],[23.755230656484784,47.847401903009604],[23.761106109152784,47.84236232772822],[23.77083552454435,47.84396596652087],[23.790217187837666,47.85242426756025],[23.79958394380764,47.85545753120051],[23.807468941092296,47.85629361835257],[23.820669703620965,47.849970979710065],[23.828835521675074,47.855245529501865],[23.83301880488083,47.85390377332751],[23.836949348230217,47.860358943172635],[23.855467052691964,47.86183804835499],[23.858265432341295,47.863959412699536],[23.873630850233226,47.86378733152767],[23.878811544436072,47.861265088997285],[23.891667126718346,47.862117779978156],[23.902757420090754,47.86642474403902],[23.91163390359588,47.8683751072918],[23.914041579649105,47.87928304456289],[23.92166517462761,47.883921214829606],[23.922179147979268,47.88880752163378],[23.93082192733291,47.89143060847352],[23.940532372428965,47.89139025003223],[23.94555037618624,47.89516617888953],[23.951351052225668,47.89582919118105],[23.953380309669914,47.892057176871],[23.96181954217367,47.88699090963615],[23.970134687368795,47.88905591486081],[23.973000619739288,47.89230590219577],[23.969123325125654,47.90079065471323],[23.969830167607498,47.906727807584815],[23.966231631552407,47.910532459909504],[23.968051094057632,47.91888967777604],[23.972571974031265,47.923322650834194],[23.966200338384873,47.93066456054396],[23.96770450908592,47.93421223071448],[23.97457702820629,47.93427287193119]]]},"properties":{"id":2904,"natCode":106559,"name":"Sighetu Marmației","natLevName":"Municipiu, altul decat resedinta de judet","countyId":24,"countyCode":243,"county":"Maramureș","countyMn":"MM","regionId":6,"regionCode":868,"region":"Nord-Vest","version":"2025-03-26"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[23.843413134623216,47.94859448108105],[23.832600870461498,47.960696855696455],[23.834290272863186,47.96701572409083],[23.818894120632848,47.97453354399565],[23.821549493589448,47.97899774857459],[23.817118151105593,47.98198280811464],[23.808114156263656,47.97968880723744],[23.802643455920766,47.9726437141346],[23.8021267336667,47.96399703177652],[23.796673228770803,47.95896574181832],[23.789039882276498,47.95467014362868],[23.78515337174622,47.94919486933295],[23.77592978314862,47.94670343640851],[23.761802413441167,47.9400624834091],[23.75894688265283,47.93543894884183],[23.75238330688793,47.93186820331025],[23.744785724218474,47.92282008215302],[23.746491232528673,47.913026857566],[23.74886971273629,47.91178689968408],[23.752582820449057,47.91682863778226],[23.75906597232849,47.918210437205104],[23.76401806498491,47.924316132804435],[23.77049404222844,47.92662269982318],[23.78074510210334,47.92765983659678],[23.80240484436841,47.94124690704848],[23.805455958170153,47.93903212252675],[23.82010585325903,47.93551827262456],[23.825366086203186,47.935457962923586],[23.836130007737207,47.94222790771546],[23.8358506511462,47.94459671079142],[23.843413134623216,47.94859448108105]]]},"properties":{"id":2905,"natCode":106620,"name":"Sarasău","natLevName":"Comuna","countyId":24,"countyCode":243,"county":"Maramureș","countyMn":"MM","regionId":6,"regionCode":868,"region":"Nord-Vest","version":"2025-03-26"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[23.482471155544037,47.65653568128664],[23.503044143232867,47.666918596502036],[23.503539338367784,47.67345761271667],[23.49811865892817,47.67931902345475],[23.50104003197952,47.68458361961836],[23.50282780980071,47.69308856509346],[23.51174016767759,47.69548933510078],[23.516373928364455,47.69996073712497],[23.509076443555067,47.7026065601472],[23.524028021241048,47.716574129131196],[23.52904996440758,47.716473064827476],[23.535122859780788,47.723754488392814],[23.540084171683915,47.725768868808544],[23.55018218357464,47.72261292793343],[23.558293081932707,47.72355777905797],[23.557465726422333,47.73782808147661],[23.554949806897216,47.74066708386874],[23.560877924651425,47.7455684090853],[23.563738527597177,47.750534743451006],[23.563194120702587,47.75555927996856],[23.570848955631963,47.758429732378126],[23.569370016020404,47.762383860867416],[23.562552516806345,47.7662129139292],[23.564950675656366,47.76897407178444],[23.56290333050799,47.78247395929359],[23.5716961471265,47.78946457345005],[23.568588548086865,47.79641219660746],[23.560530741609625,47.80420439086187],[23.54691619673975,47.80390314546983],[23.53646487592246,47.80156329540584],[23.532131000577895,47.79527721009843],[23.518364117095157,47.795929259523625],[23.5091229029507,47.78839500539154],[23.500896628118777,47.78862936570961],[23.49361532593547,47.78369007343432],[23.487626246336585,47.78402681200892],[23.47204174690514,47.77869677112938],[23.471113825562274,47.77435180234088],[23.465098558186902,47.77042177631658],[23.46402926108251,47.76684266812474],[23.450441469278456,47.76196854240372],[23.445550016171275,47.75532545814225],[23.43439604299332,47.74800780375311],[23.430964379189643,47.74385207472037],[23.431714927311027,47.737609996979884],[23.43834833220328,47.7235674100395],[23.441497210333818,47.72109815275211],[23.441348455864535,47.71481325477335],[23.437397133165913,47.71068793165995],[23.440235052450724,47.705734986774395],[23.437542332178438,47.69140823231489],[23.44142812320309,47.6886380781987],[23.43657786104523,47.67871200266508],[23.427969602544756,47.67273775127022],[23.41161995820858,47.67063088994677],[23.396134367545173,47.67501256619136],[23.389889944543054,47.67576102924815],[23.37813115077319,47.67951791919953],[23.371661801421787,47.67428687029451],[23.373524177265928,47.67172124897643],[23.380456332051374,47.67268108174424],[23.389467546984164,47.666896115992046],[23.396954856244957,47.66629348018373],[23.399025022497494,47.65681224274901],[23.393921659365652,47.65251814821131],[23.401691991151456,47.649949028090276],[23.399424731074056,47.64648031463106],[23.412814128899882,47.647392957450535],[23.41855882389753,47.647017940033486],[23.417332915517814,47.64207545545969],[23.427256368830204,47.63862479923404],[23.43454916900583,47.63913768651002],[23.44091013298625,47.63361593006627],[23.4468409952027,47.636291989936595],[23.451594613643316,47.63308558162901],[23.450507458161734,47.62818279206671],[23.458666203091767,47.62360199735749],[23.466088342577706,47.63001097729192],[23.466773864705775,47.639268120495906],[23.461860541123773,47.6424347069744],[23.46979416161023,47.64989371449588],[23.470239861545824,47.6539954282312],[23.482471155544037,47.65653568128664]]]},"properties":{"id":3001,"natCode":106461,"name":"Tăuții-Măgherăuș","natLevName":"Oras","countyId":24,"countyCode":243,"county":"Maramureș","countyMn":"MM","regionId":6,"regionCode":868,"region":"Nord-Vest","version":"2025-03-26"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[23.68740230284526,47.83785256727744],[23.68546822963729,47.84242826209524],[23.6770550224481,47.84511010248415],[23.671690614856423,47.84277499296031],[23.659525438370945,47.84409870730523],[23.64954721663927,47.84710746482576],[23.637762247547965,47.85825664526297],[23.632525081430884,47.85740721106515],[23.626988830216153,47.85292979343673],[23.621093818881224,47.85156500713228],[23.612942342464105,47.846072358809266],[23.608327920421026,47.85071039729157],[23.601746733785728,47.8517765396737],[23.594095695832802,47.84914060322945],[23.58736713319403,47.843160742982576],[23.583155071211632,47.836291857762205],[23.574387191225522,47.83649824119863],[23.572641138872964,47.83231737817255],[23.574707774200558,47.82410727254087],[23.56231294285457,47.816160373033284],[23.560530741609625,47.80420439086187],[23.568588548086865,47.79641219660746],[23.5716961471265,47.78946457345005],[23.56290333050799,47.78247395929359],[23.564950675656366,47.76897407178444],[23.562552516806345,47.7662129139292],[23.569370016020404,47.762383860867416],[23.570848955631963,47.758429732378126],[23.563194120702587,47.75555927996856],[23.563738527597177,47.750534743451006],[23.560877924651425,47.7455684090853],[23.554949806897216,47.74066708386874],[23.557465726422333,47.73782808147661],[23.558293081932707,47.72355777905797],[23.55018218357464,47.72261292793343],[23.540084171683915,47.725768868808544],[23.535122859780788,47.723754488392814],[23.52904996440758,47.716473064827476],[23.524028021241048,47.716574129131196],[23.509076443555067,47.7026065601472],[23.516373928364455,47.69996073712497],[23.51174016767759,47.69548933510078],[23.50282780980071,47.69308856509346],[23.50104003197952,47.68458361961836],[23.49811865892817,47.67931902345475],[23.503539338367784,47.67345761271667],[23.503044143232867,47.666918596502036],[23.482471155544037,47.65653568128664],[23.490414008964233,47.65527156888024],[23.504399322244232,47.65590844752419],[23.510462955994633,47.65430685828014],[23.516800963416348,47.64988370138813],[23.522319174744386,47.64195187218193],[23.524727309163698,47.63270496675018],[23.53857886062904,47.63038569536795],[23.542998572957867,47.63316675202547],[23.544189697249838,47.62274306483931],[23.561409807930374,47.62689334237188],[23.563397244791204,47.63061838572322],[23.58468478523981,47.63796246801151],[23.593006499413747,47.63484018929773],[23.59491408179484,47.62931622160136],[23.61712354987371,47.630641359361015],[23.612324396993223,47.6445590811598],[23.620859276776493,47.64772069464615],[23.615010520749383,47.66162422531422],[23.62038426197882,47.66368978305621],[23.626631971210564,47.67011259432631],[23.634624814729744,47.67236849252877],[23.648402347021825,47.67963712594253],[23.650060479673737,47.68521679420532],[23.65569884722175,47.68648583219975],[23.6632073020225,47.69553924976733],[23.657628428680113,47.701071451713055],[23.66313211017838,47.7024035639193],[23.673518342157134,47.71209678229049],[23.682200481779553,47.715752162815846],[23.67900425589125,47.720512739116],[23.679951354008104,47.72598116993759],[23.684037032674183,47.72835687791058],[23.684372726611223,47.73288066722622],[23.68981396964999,47.73452006588632],[23.698305090037273,47.73071808757681],[23.70509431221375,47.73120539382128],[23.70104366011354,47.73491966453118],[23.705783150837902,47.744010962923824],[23.698534711979633,47.75003044312346],[23.695315207968555,47.757626895360225],[23.697731681722132,47.76665397937259],[23.693060373578263,47.768690622459],[23.692782181492433,47.773791975611715],[23.688434017875807,47.78121414734134],[23.690655634974046,47.78989750844298],[23.685263357251216,47.7978891736433],[23.678808209360515,47.80136881563971],[23.678360235563378,47.80776765090714],[23.685354333671675,47.81057504602168],[23.69029079250663,47.80757142328474],[23.705221657877214,47.80905015727507],[23.711641356884858,47.813164679740666],[23.71011839167133,47.820754230908086],[23.697147545222567,47.82460459877164],[23.69608180872075,47.830673924363325],[23.684059111869317,47.834689425593105],[23.68740230284526,47.83785256727744]]]},"properties":{"id":3002,"natCode":106318,"name":"Baia Mare","natLevName":"Municipiu resedinta de judet","countyId":24,"countyCode":243,"county":"Maramureș","countyMn":"MM","regionId":6,"regionCode":868,"region":"Nord-Vest","version":"2025-03-26"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[23.544189697249838,47.62274306483931],[23.542998572957867,47.63316675202547],[23.53857886062904,47.63038569536795],[23.524727309163698,47.63270496675018],[23.522319174744386,47.64195187218193],[23.516800963416348,47.64988370138813],[23.510462955994633,47.65430685828014],[23.504399322244232,47.65590844752419],[23.490414008964233,47.65527156888024],[23.482471155544037,47.65653568128664],[23.470239861545824,47.6539954282312],[23.46979416161023,47.64989371449588],[23.461860541123773,47.6424347069744],[23.466773864705775,47.639268120495906],[23.466088342577706,47.63001097729192],[23.458666203091767,47.62360199735749],[23.450507458161734,47.62818279206671],[23.451594613643316,47.63308558162901],[23.4468409952027,47.636291989936595],[23.44091013298625,47.63361593006627],[23.43454916900583,47.63913768651002],[23.427256368830204,47.63862479923404],[23.417332915517814,47.64207545545969],[23.41855882389753,47.647017940033486],[23.412814128899882,47.647392957450535],[23.40398533721926,47.63663600844891],[23.40138717977208,47.635772045666045],[23.407002470409797,47.625160295998256],[23.421208994408627,47.61825924180971],[23.422635617707755,47.61555567840126],[23.42668472637016,47.609506173747455],[23.440190756437215,47.60453173048244],[23.44891703980233,47.60427896276108],[23.453534165065875,47.59952102979112],[23.466128829877942,47.59384333468462],[23.47405036677636,47.595116618267326],[23.483058155967942,47.59265105907415],[23.49875663526759,47.58541257496485],[23.500024264923955,47.592935721019415],[23.50596580186611,47.59911691027392],[23.507615330669672,47.606419986917885],[23.504329431349724,47.612093561493275],[23.50860309666917,47.61872802947389],[23.520354233177727,47.61800705688],[23.520930673346086,47.611277661252274],[23.52691676187375,47.611421521668966],[23.531324058751924,47.61442393804163],[23.54007411195697,47.612924409656024],[23.545292374649716,47.6088200687997],[23.542636228227202,47.613734878772036],[23.544189697249838,47.62274306483931]]]},"properties":{"id":3003,"natCode":106407,"name":"Recea","natLevName":"Comuna","countyId":24,"countyCode":243,"county":"Maramureș","countyMn":"MM","regionId":6,"regionCode":868,"region":"Nord-Vest","version":"2025-03-26"}},{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[23.373524177265928,47.67172124897643],[23.363344013061838,47.66540887232616],[23.358204869070168,47.67404877387564],[23.353189504480973,47.67211639374204],[23.356002145176678,47.667730837625086],[23.352248722903692,47.66408639786247],[23.34404412140411,47.661161924392914],[23.334338112485522,47.65240975464834],[23.335187388884332,47.647388855102896],[23.33994862957676,47.64383368128955],[23.343000681296186,47.640974311330936],[23.346747700298074,47.63145315401563],[23.341863152571186,47.62342324678945],[23.346379066019416,47.617006045056954],[23.352071270250132,47.61578828739738],[23.36709421774908,47.618357640487254],[23.373251118971382,47.616041431525254],[23.384484147520954,47.616014910995624],[23.385912009188164,47.61362485865258],[23.381455863883428,47.60795482877064],[23.39329663562887,47.60232271917934],[23.393664779093257,47.59809611603091],[23.39804562280632,47.59657550647162],[23.401740213987612,47.596918519991995],[23.41321287662224,47.60406937169834],[23.415341288759105,47.609993363959354],[23.42015073460208,47.609100235301],[23.422635617707755,47.61555567840126],[23.421208994408627,47.61825924180971],[23.407002470409797,47.625160295998256],[23.40138717977208,47.635772045666045],[23.40398533721926,47.63663600844891],[23.412814128899882,47.647392957450535],[23.399424731074056,47.64648031463106],[23.401691991151456,47.649949028090276],[23.393921659365652,47.65251814821131],[23.399025022497494,47.65681224274901],[23.396954856244957,47.66629348018373],[23.389467546984164,47.666896115992046],[23.380456332051374,47.67268108174424],[23.373524177265928,47.67172124897643]]]},"properties":{"id":3060,"natCode":107001,"name":"Ardusat","natLevName":"Comuna","countyId":24,"countyCode":243,"county":"Maramureș","countyMn":"MM","regionId":6,"regionCode":868,"region":"Nord-Vest","version":"2025-03-26"}}]};

// Fetch date din GeoJSON extern

async function incarcaDateMM() {
    if (mmGeojsonCache) return mmGeojsonCache;
    mmGeojsonCache = MM_FALLBACK;
    return mmGeojsonCache;
}

function normalizareNumeComuna(name) {
    return name
        .replace(/^Municipiul\s+/i, '')
        .replace(/^Orașul\s+/i, '')
        .replace(/^Comuna\s+/i, '')
        .trim();
}

function construiestePoligon(relation) {
    // Colectăm toate way-urile outer
    const outerWays = (relation.members || [])
        .filter(m => m.type === 'way' && m.role === 'outer' && m.geometry && m.geometry.length > 1);

    if (outerWays.length === 0) return null;

    // Înlănțuim segmentele într-un inel continuu
    const segments = outerWays.map(w =>
        w.geometry.map(pt => [pt.lon, pt.lat])
    );

    const inel = inlantuiesteSegmente(segments);
    if (inel.length < 4) return null;

    // Închidem poligonul
    if (inel[0][0] !== inel[inel.length - 1][0] || inel[0][1] !== inel[inel.length - 1][1]) {
        inel.push(inel[0]);
    }

    // Dacă există inner ways (găuri), le adăugăm ca inele secundare
    const innerWays = (relation.members || [])
        .filter(m => m.type === 'way' && m.role === 'inner' && m.geometry && m.geometry.length > 1);

    const coords = [inel];
    if (innerWays.length > 0) {
        const innerSegments = innerWays.map(w => w.geometry.map(pt => [pt.lon, pt.lat]));
        const innerInel = inlantuiesteSegmente(innerSegments);
        if (innerInel.length >= 4) {
            if (innerInel[0][0] !== innerInel[innerInel.length - 1][0]) innerInel.push(innerInel[0]);
            coords.push(innerInel);
        }
    }

    return { type: coords.length > 1 ? 'Polygon' : 'Polygon', coordinates: coords };
}

function inlantuiesteSegmente(segments) {
    if (segments.length === 0) return [];
    if (segments.length === 1) return [...segments[0]];

    const result = [...segments[0]];
    const used = new Set([0]);

    for (let i = 1; i < segments.length; i++) {
        let best = -1, bestRev = false, bestDist = Infinity;
        const tail = result[result.length - 1];

        for (let j = 0; j < segments.length; j++) {
            if (used.has(j)) continue;
            const seg = segments[j];
            const d1 = dist2(tail, seg[0]);
            const d2 = dist2(tail, seg[seg.length - 1]);
            if (d1 < bestDist) { bestDist = d1; best = j; bestRev = false; }
            if (d2 < bestDist) { bestDist = d2; best = j; bestRev = true; }
        }

        if (best === -1) break;
        used.add(best);
        const seg = bestRev ? [...segments[best]].reverse() : segments[best];
        result.push(...seg.slice(1));
    }

    return result;
}

function dist2(a, b) {
    return (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2;
}

function centroidPoligon(feature) {
    const coords = feature.geometry.coordinates[0];
    let x = 0, y = 0;
    for (const [lon, lat] of coords) { x += lon; y += lat; }
    return [x / coords.length, y / coords.length]; // [lon, lat]
}

// ── Mod Învățare România ───────────────────────────────────────────────────

function initInvatare() {
    document.getElementById('ui-invatare').classList.remove('ascuns');
    document.getElementById('inv-total').textContent = TOTAL;
    oraseLista = [...data.features].sort(() => Math.random() - 0.5);
    indexInvatare = 0;
    Object.values(layerMap).forEach(l => l.setStyle({ ...stilAscuns }));
    arataCityNume();
}

function arataCityNume() {
    const f = oraseLista[indexInvatare];
    document.getElementById('inv-nr').textContent = indexInvatare + 1;
    document.getElementById('inv-progres-bar').style.width = (indexInvatare / TOTAL * 100) + '%';
    const el = document.getElementById('invatare-nume');
    el.style.opacity = '1';
    el.textContent = f.properties.name;
    el.classList.remove('animate-in');
    void el.offsetWidth;
    el.classList.add('animate-in');
    layerMap[f.properties.name].setStyle({ ...stilCurent });
}

function continuaInvatare() {
    const f = oraseLista[indexInvatare];
    document.getElementById('btn-continua').disabled = true;
    animaNumeSpre(f, 'invatare-nume', 'map', () => {
        layerMap[f.properties.name].setStyle({ ...stilVazut });
        indexInvatare++;
        document.getElementById('btn-continua').disabled = false;
        if (indexInvatare >= oraseLista.length) {
            document.getElementById('inv-progres-bar').style.width = '100%';
            setTimeout(() => {
                document.getElementById('final-invatare').classList.add('vizibil');
                pornesteCelebration();
                verificaAchievements({ tip: 'invatare_ro' });
            }, 400);
        } else {
            arataCityNume();
        }
    });
}

// ── Mod Joc România ────────────────────────────────────────────────────────

function initJoc() {
    document.getElementById('ui-joc').classList.remove('ascuns');
    scor = 0; greseli = 0;
    ramase = [...data.features];
    totalCurent = TOTAL;
    orasCurent = null;
    resetStreakUI();
    Object.values(layerMap).forEach(l => l.setStyle({ ...stilNeutru }));
    actualizeazaUI();
    alegeOras();
    startTimer('joc');
}

function initJocUsor() {
    document.getElementById('ui-joc').classList.remove('ascuns');
    scor = 0; greseli = 0;
    ramase = data.features.filter(f => ORASE_USOARE.has(f.properties.name));
    totalCurent = ramase.length;
    orasCurent = null;
    resetStreakUI();
    Object.entries(layerMap).forEach(([name, l]) => {
        l.setStyle(ORASE_USOARE.has(name) ? { ...stilNeutru } : { ...stilAscuns });
    });
    actualizeazaUI();
    alegeOras();
    startTimer('joc_usor');
}

function handleClickRO(feature, layer) {
    if ((modCurent !== 'joc' && modCurent !== 'usor') || !orasCurent) return;
    const name = feature.properties.name;

    if (name === orasCurent) {
        bipCorect();
        actualizeazaStreak(true, 'streak-badge');
        layer.setStyle(stilCorect);
        if (layer.setRadius) { layer.setRadius(18); setTimeout(() => layer.setRadius(8), 220); }
        scor++;
        ramase = ramase.filter(o => o.properties.name !== orasCurent);
        setFeedback('cerinta-box', '✅ Corect! ' + orasCurent, 'correct');
        actualizeazaUI();
        setTimeout(() => { layer.setStyle(stilGhicit); setFeedback('cerinta-box', '', ''); alegeOras(); }, 700);
    } else {
        bipGresit();
        actualizeazaStreak(false, 'streak-badge');
        greseli++;
        layer.setStyle(stilGresit);
        setFeedback('cerinta-box', '❌ Nu e ' + name + '!', 'wrong');
        actualizeazaUI();
        setTimeout(() => {
            if (ramase.some(o => o.properties.name === name)) layer.setStyle(stilNeutru);
            setFeedback('cerinta-box', 'Găsește: ' + orasCurent, '');
        }, 900);
    }
}

function skipOras() {
    if (modCurent === 'orase') {
        if (!orseCurent) return;
        const c = oraseRamase.find(f => f.properties.name === orseCurent);
        oraseRamase = oraseRamase.filter(f => f.properties.name !== orseCurent);
        oraseRamase.push(c);
        setFeedback('cerinta-box', '', '');
        alegeOrasJudet();
    } else {
        if (!orasCurent) return;
        const c = ramase.find(o => o.properties.name === orasCurent);
        ramase = ramase.filter(o => o.properties.name !== orasCurent);
        ramase.push(c);
        setFeedback('cerinta-box', '', '');
        alegeOras();
    }
}

function actualizeazaUI() {
    document.getElementById('scor-corect').textContent = scor;
    document.getElementById('scor-gresit').textContent = greseli;
    document.getElementById('ramase-nr').textContent   = ramase.length;
    document.getElementById('progres-bar').style.width = ((totalCurent - ramase.length) / totalCurent * 100) + '%';
}

function alegeOras() {
    if (ramase.length === 0) { sfarsitJoc(); return; }
    orasCurent = ramase[Math.floor(Math.random() * ramase.length)].properties.name;
    setFeedback('cerinta-box', 'Găsește: ' + orasCurent, '');
}

function sfarsitJoc() {
    stopTimer();
    orasCurent = null;
    resetStreakUI();
    const pct = Math.round(scor / totalCurent * 100);
    document.getElementById('final-scor').textContent    = scor + ' / ' + totalCurent;
    document.getElementById('final-detalii').textContent = pct + '% corect • ' + greseli + ' greșeli';
    document.getElementById('final-judete-stat').classList.add('ascuns');
    document.getElementById('btn-judet-urmator').classList.add('ascuns');
    document.getElementById('final-joc').classList.add('vizibil');
    pornesteCelebration();
}

function replay() {
    document.getElementById('final-joc').classList.remove('vizibil');
    if (modCurent === 'orase') {
        verificaAchievements({ tip: 'replay_county', judet: oraseJudet });
        Object.values(oraseLayerMap).forEach(l => l.setStyle({ ...stilNeutru }));
        oraseScor = 0; oraseGreseli = 0; oraseHinturi = 0;
        oraseRamase = [...JUDETE[oraseJudet].features];
        orseCurent  = null;
        document.getElementById('final-joc-emoji').textContent    = '🏆';
        document.getElementById('final-joc-titlu').textContent    = 'Felicitări!';
        document.getElementById('final-joc-subtitlu').textContent = 'Ai terminat jocul!';
        actualizeazaUIorase();
        startTimer(cheieOrase(oraseJudet));
        alegeOrasJudet();
    } else if (modCurent === 'usor') {
        initJocUsor();
    } else {
        initJoc();
    }
}

// ── Mod Învățare Maramureș ─────────────────────────────────────────────────

function initMMInvatare(geojson) {
    document.getElementById('ui-mm-invatare').classList.remove('ascuns');

    mmLista = [...geojson.features].sort(() => Math.random() - 0.5);
    mmIndexInv = 0;
    mmTotal = mmLista.length;

    document.getElementById('mm-inv-total').textContent = mmTotal;

    costruiesteLayerMM(geojson, mmStilAscuns);
    // după costruire, mmModGranite e setat — resetăm stilul corect
    Object.values(mmLayerMap).forEach(l => l.setStyle(mmSStil('ascuns')));
    arataComunaNume();
}

function arataComunaNume() {
    const f = mmLista[mmIndexInv];
    document.getElementById('mm-inv-nr').textContent = mmIndexInv + 1;
    document.getElementById('mm-inv-progres-bar').style.width = (mmIndexInv / mmTotal * 100) + '%';

    const el = document.getElementById('mm-invatare-nume');
    el.style.opacity = '1';
    el.textContent = f.properties.name;
    el.classList.remove('animate-in');
    void el.offsetWidth;
    el.classList.add('animate-in');

    mmLayerMap[f.properties.name].setStyle(mmSStil('curent'));
}

function continuaMMInvatare() {
    const f = mmLista[mmIndexInv];
    document.getElementById('mm-btn-continua').disabled = true;

    animaNumeSpre(f, 'mm-invatare-nume', 'map', () => {
        mmLayerMap[f.properties.name].setStyle(mmSStil('vazut'));
        mmIndexInv++;
        document.getElementById('mm-btn-continua').disabled = false;

        if (mmIndexInv >= mmLista.length) {
            document.getElementById('mm-inv-progres-bar').style.width = '100%';
            setTimeout(() => {
                document.getElementById('final-mm-invatare').classList.add('vizibil');
                pornesteCelebration();
                verificaAchievements({ tip: 'invatare_mm' });
            }, 400);
        } else {
            arataComunaNume();
        }
    });
}

// ── Mod Joc Maramureș ──────────────────────────────────────────────────────

function initMMJoc(geojson) {
    document.getElementById('ui-mm-joc').classList.remove('ascuns');

    mmScor = 0; mmGreseli = 0;
    mmTotal = geojson.features.length;
    mmRamase = [...geojson.features];
    mmCurent = null;
    resetStreakUI();

    costruiesteLayerMM(geojson, mmStilNeutru);
    Object.values(mmLayerMap).forEach(l => l.setStyle(mmSStil('neutru')));
    actualizeazaUIMM();
    alegeComuna();
    startTimer('mm_joc');
}

function costruiesteLayerMM(geojson, stilInitial) {
    if (mmLayer) { mmLayer.remove(); mmLayerMap = {}; }

    const estePoint = geojson.features.length > 0 &&
                      geojson.features[0].geometry.type === 'Point';

    mmLayer = L.geoJSON(geojson, {
        // Poligoane: style direct; Puncte: pointToLayer cu circleMarker
        style: estePoint ? undefined : () => ({ ...stilInitial }),
        pointToLayer: estePoint
            ? (f, latlng) => L.circleMarker(latlng, { ...stilNeutru })
            : undefined,
        onEachFeature: (feature, layer) => {
            mmLayerMap[feature.properties.name] = layer;
            layer.on('click', () => handleClickMM(feature, layer));
            layer.on('mouseover', () => {
                if (mmModSub === 'invatare') layer.bindTooltip(feature.properties.name, { permanent: false, sticky: true, className: 'tooltip-oras' }).openTooltip();
            });
            layer.on('mouseout', () => {
                if (mmModSub === 'invatare') layer.closeTooltip();
            });
        }
    }).addTo(map);

    // Marcăm dacă suntem în modul cu granițe sau cu cercuri
    mmModGranite = !estePoint;
}

function mmSStil(tip) {
    // Returnează stilul potrivit în funcție de tip (granițe sau cercuri)
    const s = {
        neutru:  mmModGranite ? mmStilNeutru  : { ...stilNeutru,  fillColor:'#5ba3d9' },
        ascuns:  mmModGranite ? mmStilAscuns  : { ...stilAscuns },
        vazut:   mmModGranite ? mmStilVazut   : { ...stilVazut },
        curent:  mmModGranite ? mmStilCurent  : { ...stilCurent },
        corect:  mmModGranite ? mmStilCorect  : { ...stilCorect },
        gresit:  mmModGranite ? mmStilGresit  : { ...stilGresit },
        ghicit:  mmModGranite ? mmStilGhicit  : { ...stilGhicit },
    };
    return s[tip];
}

function handleClickMM(feature, layer) {
    if (modCurent !== 'maramures') return;
    if (mmModSub === 'joc' && !mmCurent) return;
    if (mmModSub !== 'joc') return;

    const name = feature.properties.name;

    if (name === mmCurent) {
        bipCorect();
        actualizeazaStreak(true, 'mm-streak-badge');
        layer.setStyle(mmSStil('corect'));
        if (layer.setRadius) { layer.setRadius(18); setTimeout(() => layer.setRadius(8), 220); }
        mmScor++;
        mmRamase = mmRamase.filter(f => f.properties.name !== mmCurent);
        setFeedback('mm-cerinta-box', '✅ Corect! ' + mmCurent, 'correct');
        actualizeazaUIMM();
        setTimeout(() => { layer.setStyle(mmSStil('ghicit')); setFeedback('mm-cerinta-box', '', ''); alegeComuna(); }, 700);
    } else {
        bipGresit();
        actualizeazaStreak(false, 'mm-streak-badge');
        mmGreseli++;
        layer.setStyle(mmSStil('gresit'));
        setFeedback('mm-cerinta-box', '❌ Nu e ' + name + '!', 'wrong');
        actualizeazaUIMM();
        setTimeout(() => {
            if (mmRamase.some(f => f.properties.name === name)) layer.setStyle(mmSStil('neutru'));
            setFeedback('mm-cerinta-box', 'Găsește: ' + mmCurent, '');
        }, 900);
    }
}

function skipMM() {
    if (!mmCurent) return;
    const c = mmRamase.find(f => f.properties.name === mmCurent);
    mmRamase = mmRamase.filter(f => f.properties.name !== mmCurent);
    mmRamase.push(c);
    setFeedback('mm-cerinta-box', '', '');
    alegeComuna();
}

function actualizeazaUIMM() {
    document.getElementById('mm-scor-corect').textContent = mmScor;
    document.getElementById('mm-scor-gresit').textContent = mmGreseli;
    document.getElementById('mm-ramase-nr').textContent   = mmRamase.length;
    document.getElementById('mm-progres-bar').style.width = ((mmTotal - mmRamase.length) / mmTotal * 100) + '%';
}

function alegeComuna() {
    if (mmRamase.length === 0) { sfarsitMMJoc(); return; }
    mmCurent = mmRamase[Math.floor(Math.random() * mmRamase.length)].properties.name;
    setFeedback('mm-cerinta-box', 'Găsește: ' + mmCurent, '');
}

function sfarsitMMJoc() {
    stopTimer();
    mmCurent = null;
    const pct = Math.round(mmScor / mmTotal * 100);
    document.getElementById('mm-final-scor').textContent    = mmScor + ' / ' + mmTotal;
    document.getElementById('mm-final-detalii').textContent = pct + '% corect • ' + mmGreseli + ' greșeli';
    document.getElementById('final-mm-joc').classList.add('vizibil');
    pornesteCelebration();
    verificaAchievements({ tip: 'joc_mm' });
}

function replayMM() {
    document.getElementById('final-mm-joc').classList.remove('vizibil');
    if (mmGeojsonCache) initMMJoc(mmGeojsonCache);
}

// ── Utilitar: animație nume zburător ──────────────────────────────────────

function animaNumeSpre(feature, numeElId, mapElId, callback) {
    const numeEl   = document.getElementById(numeElId);
    const numeRect = numeEl.getBoundingClientRect();
    const startX   = numeRect.left + numeRect.width  / 2;
    const startY   = numeRect.top  + numeRect.height / 2;

    // Calculăm centrul destinației pe hartă
    let latlng;
    if (feature.geometry.type === 'Point') {
        const [lon, lat] = feature.geometry.coordinates;
        latlng = L.latLng(lat, lon);
    } else {
        const [lon, lat] = centroidPoligon(feature);
        latlng = L.latLng(lat, lon);
    }

    const mapEl   = document.getElementById(mapElId);
    const mapRect = mapEl.getBoundingClientRect();
    const pt      = map.latLngToContainerPoint(latlng);
    const endX    = mapRect.left + pt.x;
    const endY    = mapRect.top  + pt.y;

    const fly = document.createElement('div');
    fly.className   = 'fly-label';
    fly.textContent = feature.properties.name;
    fly.style.left  = startX + 'px';
    fly.style.top   = startY + 'px';
    document.body.appendChild(fly);

    numeEl.style.opacity = '0';

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            fly.style.transition =
                'left 0.9s cubic-bezier(0.4,0,0.2,1),' +
                'top 0.9s cubic-bezier(0.4,0,0.2,1),' +
                'font-size 0.9s, padding 0.9s,' +
                'opacity 0.25s ease 0.7s';
            fly.style.left     = endX + 'px';
            fly.style.top      = endY + 'px';
            fly.style.fontSize = '0.62rem';
            fly.style.padding  = '2px 7px';
            fly.style.opacity  = '0';
        });
    });

    setTimeout(() => {
        fly.remove();
        numeEl.style.opacity = '';
        callback();
    }, 1050);
}

// ── Utilitar: feedback cerință ─────────────────────────────────────────────

function setFeedback(elId, text, cls) {
    const el = document.getElementById(elId);
    let prefix;
    if (elId.startsWith('mm'))    prefix = 'Găsește: ' + mmCurent;
    else if (modCurent === 'orase') prefix = 'Găsește: ' + orseCurent;
    else                           prefix = 'Găsește: ' + orasCurent;
    el.textContent = text || prefix;
    el.className   = cls || '';
}

// ── Sunet (Web Audio API) ──────────────────────────────────────────────────

let audioCtx = null;
function getAudioCtx() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    return audioCtx;
}

function bipCorect() {
    try {
        const ctx = getAudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        osc.type = 'sine'; osc.frequency.setValueAtTime(880, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1100, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.18, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
        osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.18);
    } catch(e) {}
}

function bipGresit() {
    try {
        const ctx = getAudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        osc.type = 'sawtooth'; osc.frequency.setValueAtTime(220, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
        osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.18);
    } catch(e) {}
}

// ── Streak ─────────────────────────────────────────────────────────────────

let streak = 0;

function actualizeazaStreak(corect, badgeId) {
    if (corect) {
        streak++;
    } else {
        streak = 0;
    }
    const el = document.getElementById(badgeId);
    if (!el) return;
    if (streak >= 2) {
        el.textContent = '🔥 ' + streak + ' la rând!';
        el.classList.remove('ascuns');
        el.style.animation = 'none';
        void el.offsetWidth;
        el.style.animation = '';
        if (streak === 5 || streak === 10) verificaAchievements({ tip: 'streak', val: streak });
    } else {
        el.classList.add('ascuns');
    }
}

function resetStreakUI() {
    streak = 0;
    ['streak-badge', 'mm-streak-badge'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('ascuns');
    });
}

// ── Timer & High Score ─────────────────────────────────────────────────────

function citestHSOrase(judet) {
    return citestHS('hs_orase_usor_' + judet) ||
           citestHS('hs_orase_greu_' + judet) ||
           citestHS('hs_orase_fara_' + judet);
}

function citestHS(cheie) {
    const raw = lsGet(cheie);
    if (!raw) return null;
    try {
        const obj = JSON.parse(raw);
        if (obj && typeof obj === 'object' && 'timp' in obj) return obj;
        const t = parseInt(raw);
        return isNaN(t) ? null : { timp: t, pct: 100 };
    } catch(e) {
        const t = parseInt(raw);
        return isNaN(t) ? null : { timp: t, pct: 100 };
    }
}

function afiseazaHSText(hs, arataPct) {
    if (!hs) return '🏆 --:--';
    if (arataPct && hs.pct !== undefined)
        return '🏆 ' + hs.pct + '% · ' + formatTime(hs.timp);
    return '🏆 ' + formatTime(hs.timp);
}

function actualizeazaLandingHS() {
    const hsJoc = citestHS('hs_joc');
    const elJoc = document.getElementById('hs-joc');
    if (elJoc) elJoc.textContent = hsJoc ? '🏆 ' + formatTime(hsJoc.timp) : '';

    const hsMM = citestHS('hs_mm_joc');
    const elMM = document.getElementById('hs-mm');
    if (elMM) elMM.textContent = hsMM ? '🏆 ' + formatTime(hsMM.timp) : '';

    const elTrivia = document.getElementById('hs-trivia-landing');
    if (elTrivia) elTrivia.textContent = hsScorText(lsGet('hs_trivia'));

    const elMinistri = document.getElementById('hs-ministri-landing');
    if (elMinistri) elMinistri.textContent = hsScorText(lsGet('hs_ministri'));

    // Orașe pe Județe: afișăm câte județe au HS
    const elOrase = document.getElementById('hs-orase');
    if (elOrase) {
        const completate = Object.keys(JUDETE).filter(j => citestHSOrase(j)).length;
        const total = Object.keys(JUDETE).length;
        elOrase.textContent = completate > 0 ? '🏆 ' + completate + '/' + total + ' județe completate' : '';
    }
}

let timerInterval = null;
let timerSecunde  = 0;
let timerCheie    = null;

const ETICHETE_MOD = {
    'joc':              'România',
    'joc_usor':         'Mod Ușor',
    'orase_satu-mare':  'Satu Mare',
    'orase_salaj':      'Sălaj',
    'orase_maramures':  'Maramureș',
    'mm_joc':           'MM Comune',
};

function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return m + ':' + (s < 10 ? '0' : '') + s;
}

function startTimer(cheie) {
    clearInterval(timerInterval);
    timerSecunde = 0;
    timerCheie   = cheie;

    // Afișează % scris doar în modul scris
    const elPct = document.getElementById('sb-pct-scris');
    if (elPct) {
        const eScris = cheie.startsWith('scris_');
        elPct.classList.toggle('ascuns', !eScris);
        if (eScris) elPct.textContent = '0%';
    }

    const sb = document.getElementById('scoreboard');
    sb.classList.remove('ascuns');

    let eticheta = ETICHETE_MOD[cheie];
    if (!eticheta && cheie.startsWith('orase_')) {
        const parts   = cheie.split('_');
        const judetKey = parts.slice(2).join('_');
        const dif      = parts[1];
        const difLabel = dif === 'greu' ? ' 💀' : dif === 'fara' ? ' ☠️' : '';
        eticheta = ((JUDETE[judetKey] || {}).titlu || judetKey) + difLabel;
    }
    document.getElementById('sb-mod').textContent = eticheta || cheie;
    const eGreu = dificultate === 'greu' && cheie.startsWith('orase_');
    const sbTime = document.getElementById('sb-time');
    sbTime.textContent = eGreu ? '⏱ ' + formatTime(TIMP_LIMITA_GREU) : '⏱ 0:00';
    sbTime.classList.toggle('countdown', eGreu);
    sbTime.classList.remove('urgent');

    const best = citestHS('hs_' + cheie);
    const isOraseMode = cheie.startsWith('orase_');
    document.getElementById('sb-best').textContent = afiseazaHSText(best, isOraseMode);
    document.getElementById('sb-best').classList.remove('record-nou');

    timerInterval = setInterval(() => {
        timerSecunde++;
        if (dificultate === 'greu' && timerCheie && timerCheie.startsWith('orase_')) {
            const ramas = TIMP_LIMITA_GREU - timerSecunde;
            sbTime.textContent = '⏱ ' + formatTime(Math.max(0, ramas));
            if (ramas <= 10) sbTime.classList.add('urgent');
            if (ramas <= 0) { clearInterval(timerInterval); sfarsitOrase(); }
        } else {
            sbTime.textContent = '⏱ ' + formatTime(timerSecunde);
        }
    }, 1000);
}

function stopTimer(pct) {
    clearInterval(timerInterval);
    timerInterval = null;
    if (!timerCheie) return;

    const pctVal     = (pct !== undefined) ? pct : 100;
    const best       = citestHS('hs_' + timerCheie);
    const isOraseMode = timerCheie.startsWith('orase_');
    const esteRecord = !best ||
                       pctVal > (best.pct || 0) ||
                       (pctVal === (best.pct || 0) && timerSecunde < best.timp);

    if (esteRecord) {
        lsSet('hs_' + timerCheie, JSON.stringify({ timp: timerSecunde, pct: pctVal }));
        const el = document.getElementById('sb-best');
        el.textContent = afiseazaHSText({ timp: timerSecunde, pct: pctVal }, isOraseMode);
        el.classList.remove('record-nou');
        void el.offsetWidth;
        el.classList.add('record-nou');
    }

    document.getElementById('sb-time').classList.remove('countdown', 'urgent');
    actualizeazaStatisticiCards();
    actualizeazaLandingHS();
}

function ascundeSb() {
    clearInterval(timerInterval);
    timerInterval = null;
    timerCheie    = null;
    document.getElementById('scoreboard').classList.add('ascuns');
}

// ── Confetti ───────────────────────────────────────────────────────────────

const confettiCanvas  = document.getElementById('confetti-canvas');
const confettiCtx     = confettiCanvas.getContext('2d');
let   confettiPieces  = [];
let   confettiRafId   = null;

const CULORI_CONFETTI = [
    '#f0c040','#27ae60','#e74c3c','#3498db',
    '#9b59b6','#e67e22','#1abc9c','#e91e63'
];

function pornesteCelebration() {
    // Redimensionăm canvas-ul la fereastra curentă
    confettiCanvas.width  = window.innerWidth;
    confettiCanvas.height = window.innerHeight;

    // Generăm 180 de bucăți de confetti cu valori inițiale aleatoare
    confettiPieces = Array.from({ length: 180 }, () => ({
        x:     Math.random() * confettiCanvas.width,
        y:     Math.random() * confettiCanvas.height * -1,  // pornesc de deasupra
        w:     6  + Math.random() * 9,
        h:     10 + Math.random() * 8,
        color: CULORI_CONFETTI[Math.floor(Math.random() * CULORI_CONFETTI.length)],
        rot:   Math.random() * Math.PI * 2,
        vx:    (Math.random() - 0.5) * 2.5,
        vy:    2.5 + Math.random() * 3.5,
        vr:    (Math.random() - 0.5) * 0.18,
        forma: Math.random() < 0.4 ? 'cerc' : 'drept',  // cerc sau dreptunghi
        alpha: 1,
    }));

    if (confettiRafId) cancelAnimationFrame(confettiRafId);
    animaConfetti();
}

function animaConfetti() {
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

    let active = 0;

    for (const p of confettiPieces) {
        p.x   += p.vx;
        p.y   += p.vy;
        p.rot += p.vr;
        p.vy  += 0.06;   // gravitație ușoară

        // Fade-out când ajung jos
        if (p.y > confettiCanvas.height * 0.75) {
            p.alpha -= 0.018;
        }

        if (p.alpha <= 0) continue;
        active++;

        confettiCtx.save();
        confettiCtx.globalAlpha = Math.max(0, p.alpha);
        confettiCtx.translate(p.x, p.y);
        confettiCtx.rotate(p.rot);
        confettiCtx.fillStyle = p.color;

        if (p.forma === 'cerc') {
            confettiCtx.beginPath();
            confettiCtx.arc(0, 0, p.w / 2, 0, Math.PI * 2);
            confettiCtx.fill();
        } else {
            confettiCtx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        }

        confettiCtx.restore();
    }

    if (active > 0) {
        confettiRafId = requestAnimationFrame(animaConfetti);
    } else {
        confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        confettiRafId = null;
    }
}

// ── Trivia Personalități ───────────────────────────────────────────────────

const triviaImgCache = {};   // wiki → URL imagine

// ── TRIVIA_PERSOANE (date personalități) ────────────────────────────────────
const TRIVIA_PERSOANE = [
    {
        nume: 'Mihai Eminescu',
        info: 'poet • 1850–1889',
        judet: 'Botoșani',
        nascut: 'Ipotești, Botoșani',
        wiki: 'Mihai_Eminescu'
    },
    {
        nume: 'George Enescu',
        info: 'compozitor • 1881–1955',
        judet: 'Botoșani',
        nascut: 'Liveni, Botoșani',
        wiki: 'George_Enescu'
    },
    {
        nume: 'Constantin Brâncuși',
        info: 'sculptor • 1876–1957',
        judet: 'Gorj',
        nascut: 'Hobița, Gorj',
        wiki: 'Constantin_Br%C3%A2ncu%C8%99i'
    },
    {
        nume: 'Ion Luca Caragiale',
        info: 'dramaturg • 1852–1912',
        judet: 'Dâmbovița',
        nascut: 'Haimanale, Dâmbovița',
        wiki: 'Ion_Luca_Caragiale'
    },
    {
        nume: 'Ștefan cel Mare',
        info: 'domnitor Moldova • 1433–1504',
        judet: 'Bacău',
        nascut: 'Borzești, Bacău',
        wiki: 'Stephen_the_Great'
    },
    {
        nume: 'Avram Iancu',
        info: 'revoluționar • 1824–1872',
        judet: 'Alba',
        nascut: 'Vidra de Sus, Alba',
        wiki: 'Avram_Iancu'
    },
    {
        nume: 'Alexandru Ioan Cuza',
        info: 'domnitor • 1820–1873',
        judet: 'Vaslui',
        nascut: 'Bârlad, Vaslui',
        wiki: 'Alexandru_Ioan_Cuza'
    },
    {
        nume: 'Aurel Vlaicu',
        info: 'aviator, inginer • 1882–1913',
        judet: 'Hunedoara',
        nascut: 'Binținți, Hunedoara',
        wiki: 'Aurel_Vlaicu'
    },
    {
        nume: 'Nadia Comăneci',
        info: 'gimnastă • n. 1961',
        judet: 'Bacău',
        nascut: 'Onești, Bacău',
        wiki: 'Nadia_Com%C4%83neci'
    },
    {
        nume: 'Emil Cioran',
        info: 'filosof • 1911–1995',
        judet: 'Sibiu',
        nascut: 'Rășinari, Sibiu',
        wiki: 'Emil_Cioran'
    },
    {
        nume: 'Lucian Blaga',
        info: 'poet, filosof • 1895–1961',
        judet: 'Alba',
        nascut: 'Lancrăm, Alba',
        wiki: 'Lucian_Blaga'
    },
    {
        nume: 'Nicolae Iorga',
        info: 'istoric • 1871–1940',
        judet: 'Botoșani',
        nascut: 'Botoșani',
        wiki: 'Nicolae_Iorga'
    },
    {
        nume: 'Dimitrie Cantemir',
        info: 'domnitor, savant • 1673–1723',
        judet: 'Vaslui',
        nascut: 'Silișteni, Vaslui',
        wiki: 'Dimitrie_Cantemir'
    },
    {
        nume: 'Mircea Eliade',
        info: 'scriitor, filosof • 1907–1986',
        judet: 'București',
        nascut: 'București',
        wiki: 'Mircea_Eliade'
    },
    {
        nume: 'Eugen Ionescu',
        info: 'dramaturg • 1909–1994',
        judet: 'Olt',
        nascut: 'Slatina, Olt',
        wiki: 'Eug%C3%A8ne_Ionesco'
    },
    {
        nume: 'Mihail Kogălniceanu',
        info: 'om politic, istoric • 1817–1891',
        judet: 'Iași',
        nascut: 'Iași',
        wiki: 'Mihail_Kog%C4%83lniceanu'
    },
    {
        nume: 'Nicolae Bălcescu',
        info: 'revoluționar, istoric • 1819–1852',
        judet: 'București',
        nascut: 'București',
        wiki: 'Nicolae_B%C4%83lcescu'
    },
    {
        nume: 'Traian Vuia',
        info: 'aviator, inventator • 1872–1950',
        judet: 'Timiș',
        nascut: 'Surducu Mic, Timiș',
        wiki: 'Traian_Vuia'
    },
    {
        nume: 'Ana Aslan',
        info: 'medic gerontolog • 1897–1988',
        judet: 'Brăila',
        nascut: 'Brăila',
        wiki: 'Ana_Aslan'
    },
    {
        nume: 'Gheorghe Hagi',
        info: 'fotbalist • n. 1965',
        judet: 'Constanța',
        nascut: 'Săcele, Constanța',
        wiki: 'Gheorghe_Hagi'
    },
    {
        nume: 'Vasile Alecsandri',
        info: 'poet, dramaturg • 1821–1890',
        judet: 'Bacău',
        nascut: 'Bacău',
        wiki: 'Vasile_Alecsandri'
    },
    {
        nume: 'Ion Creangă',
        info: 'scriitor • 1837–1889',
        judet: 'Neamț',
        nascut: 'Humulești, Neamț',
        wiki: 'Ion_Creang%C4%83'
    },
    {
        nume: 'Mihai Viteazul',
        info: 'domnitor • 1558–1601',
        judet: 'Mehedinți',
        nascut: 'Flămânzi, Mehedinți',
        wiki: 'Michael_the_Brave'
    },
    {
        nume: 'Vlad Țepeș',
        info: 'domnitor Țara Românească • 1428–1477',
        judet: 'Mureș',
        nascut: 'Sighișoara, Mureș',
        wiki: 'Vlad_the_Impaler'
    },
    {
        nume: 'Nicolae Grigorescu',
        info: 'pictor • 1838–1907',
        judet: 'Ilfov',
        nascut: 'Pitaru, Ilfov',
        wiki: 'Nicolae_Grigorescu'
    },
    {
        nume: 'Vasile Pârvan',
        info: 'arheolog, istoric • 1882–1927',
        judet: 'Bacău',
        nascut: 'Huruiești, Bacău',
        wiki: 'Vasile_P%C3%A2rvan'
    },
    {
        nume: 'Henri Coandă',
        info: 'inginer, inventator • 1886–1972',
        judet: 'București',
        nascut: 'București',
        wiki: 'Henri_Coand%C4%83'
    },
    {
        nume: 'Titu Maiorescu',
        info: 'critic literar, om politic • 1840–1917',
        judet: 'Dolj',
        nascut: 'Craiova, Dolj',
        wiki: 'Titu_Maiorescu'
    },
    {
        nume: 'Ciprian Porumbescu',
        info: 'compozitor • 1853–1883',
        judet: 'Suceava',
        nascut: 'Șipotele Sucevei, Suceava',
        wiki: 'Ciprian_Porumbescu'
    },
    {
        nume: 'Ion Mincu',
        info: 'arhitect • 1852–1912',
        judet: 'Ialomița',
        nascut: 'Slobozia, Ialomița',
        wiki: 'Ion_Mincu'
    },
    {
        nume: 'George Coșbuc',
        info: 'poet • 1866–1918',
        judet: 'Bistrița-Năsăud',
        nascut: 'Hordou, Bistrița-Năsăud',
        wiki: 'George_Co%C8%99buc'
    },
    {
        nume: 'Ioan Slavici',
        info: 'scriitor • 1848–1925',
        judet: 'Arad',
        nascut: 'Șiria, Arad',
        wiki: 'Ioan_Slavici'
    },
    {
        nume: 'Octavian Goga',
        info: 'poet, om politic • 1881–1938',
        judet: 'Sibiu',
        nascut: 'Rășinari, Sibiu',
        wiki: 'Octavian_Goga'
    },
    {
        nume: 'Tudor Arghezi',
        info: 'poet, prozator • 1880–1967',
        judet: 'București',
        nascut: 'București',
        wiki: 'Tudor_Arghezi'
    },
    {
        nume: 'Liviu Rebreanu',
        info: 'romancier • 1885–1944',
        judet: 'Bistrița-Năsăud',
        nascut: 'Târlișua, Bistrița-Năsăud',
        wiki: 'Liviu_Rebreanu'
    },
    {
        nume: 'Nichita Stănescu',
        info: 'poet • 1933–1983',
        judet: 'Prahova',
        nascut: 'Ploiești, Prahova',
        wiki: 'Nichita_St%C4%83nescu'
    },
    {
        nume: 'Marin Preda',
        info: 'romancier • 1922–1980',
        judet: 'Teleorman',
        nascut: 'Siliștea-Gumești, Teleorman',
        wiki: 'Marin_Preda'
    },
    {
        nume: 'Camil Petrescu',
        info: 'scriitor, dramaturg • 1894–1957',
        judet: 'București',
        nascut: 'București',
        wiki: 'Camil_Petrescu'
    },
    {
        nume: 'Grigore Antipa',
        info: 'biolog, fondatorul Muzeului de Istorie Naturală • 1867–1944',
        judet: 'Iași',
        nascut: 'Iași',
        wiki: 'Grigore_Antipa',
        wikiRo: 'Grigore_Antipa'
    },
    {
        nume: 'Victor Babeș',
        info: 'bacteriolog, patolog • 1854–1926',
        judet: 'Cluj',
        nascut: 'Viena (familie din Cluj)',
        wiki: 'Victor_Babe%C8%99'
    },
    {
        nume: 'Gheorghe Lazăr',
        info: 'pedagog, iluminist • 1779–1823',
        judet: 'Sibiu',
        nascut: 'Avrig, Sibiu',
        wiki: 'Gheorghe_Laz%C4%83r'
    },
    {
        nume: 'Simion Bărnuțiu',
        info: 'filosof, jurist, revoluționar • 1808–1864',
        judet: 'Sălaj',
        nascut: 'Bocșa, Sălaj',
        wiki: 'Simion_B%C4%83rnu%C8%9Biu'
    },
    {
        nume: 'Spiru Haret',
        info: 'matematician, ministru • 1851–1912',
        judet: 'Iași',
        nascut: 'Iași',
        wiki: 'Spiru_Haret'
    },
    {
        nume: 'Ecaterina Teodoroiu',
        info: 'eroină Primul Război Mondial • 1894–1917',
        judet: 'Gorj',
        nascut: 'Vădeni, Gorj',
        wiki: 'Ecaterina_Teodoroiu'
    },
    {
        nume: 'Alexandru Vlahuță',
        info: 'poet, prozator • 1858–1919',
        judet: 'Vaslui',
        nascut: 'Pleșești, Vaslui',
        wiki: 'Alexandru_Vl%C4%83hu%C8%9B%C4%83'
    },
    {
        nume: 'Barbu Știrbei',
        info: 'domn Țara Românească • 1799–1869',
        judet: 'Dolj',
        nascut: 'Craiova, Dolj',
        wiki: 'Barbu_%C8%98tirbei'
    },
    {
        nume: 'Gheorghe Dima',
        info: 'compozitor, dirijor • 1847–1925',
        judet: 'Brașov',
        nascut: 'Brașov',
        wiki: 'Gheorghe_Dima_(composer)'
    },
    {
        nume: 'Ion Pillat',
        info: 'poet • 1891–1945',
        judet: 'București',
        nascut: 'București',
        wiki: 'Ion_Pillat'
    },
    {
        nume: 'Mihail Sadoveanu',
        info: 'romancier • 1880–1961',
        judet: 'Neamț',
        nascut: 'Pașcani, Iași',
        wiki: 'Mihail_Sadoveanu'
    },
    {
        nume: 'Iorgu Iordan',
        info: 'lingvist, romanist • 1888–1986',
        judet: 'Galați',
        nascut: 'Tecuci, Galați',
        wiki: 'Iorgu_Iordan'
    },
    {
        nume: 'Ilie Năstase',
        info: 'tenisman • n. 1946',
        judet: 'București',
        nascut: 'București',
        wiki: 'Ilie_N%C4%83stase'
    },
    {
        nume: 'Ion Țiriac',
        info: 'tenisman, om de afaceri • n. 1939',
        judet: 'Brașov',
        nascut: 'Brașov',
        wiki: 'Ion_%C8%9Airiac'
    },
    {
        nume: 'Ivan Patzaichin',
        info: 'canoist, 4× campion olimpic • 1949–2021',
        judet: 'Tulcea',
        nascut: 'Mila 23, Tulcea',
        wiki: 'Ivan_Patzaichin'
    },
    {
        nume: 'Simona Halep',
        info: 'tenismenă, nr. 1 mondial • n. 1991',
        judet: 'Constanța',
        nascut: 'Constanța',
        wiki: 'Simona_Halep'
    },
    {
        nume: 'George Bacovia',
        info: 'poet simbolist • 1881–1957',
        judet: 'Bacău',
        nascut: 'Bacău',
        wiki: 'George_Bacovia'
    },
    {
        nume: 'Ion Barbu',
        info: 'poet, matematician • 1895–1961',
        judet: 'Argeș',
        nascut: 'Câmpulung Muscel, Argeș',
        wiki: 'Ion_Barbu_(mathematician)'
    },
    {
        nume: 'Maria Tănase',
        info: 'cântăreață, „Privighetoarea României" • 1913–1963',
        judet: 'București',
        nascut: 'București',
        wiki: 'Maria_T%C4%83nase'
    },
    {
        nume: 'Dinu Lipatti',
        info: 'pianist, compozitor • 1917–1950',
        judet: 'București',
        nascut: 'București',
        wiki: 'Dinu_Lipatti'
    },
    {
        nume: 'Angela Gheorghiu',
        info: 'soprană • n. 1965',
        judet: 'Vrancea',
        nascut: 'Adjud, Vrancea',
        wiki: 'Angela_Gheorghiu'
    },
    {
        nume: 'Emil Racoviță',
        info: 'biolog, explorator polar • 1868–1947',
        judet: 'Iași',
        nascut: 'Iași',
        wiki: 'Emil_Racovi%C8%9B%C4%83'
    },
    {
        nume: 'Grigore Moisil',
        info: 'matematician, logician • 1906–1973',
        judet: 'Tulcea',
        nascut: 'Tulcea',
        wiki: 'Grigore_Moisil'
    },
    {
        nume: 'Iancu de Hunedoara',
        info: 'voievod, regent Ungaria • 1406–1456',
        judet: 'Hunedoara',
        nascut: 'Hunedoara',
        wiki: 'John_Hunyadi'
    },
    {
        nume: 'Corneliu Coposu',
        info: 'om politic, disident • 1914–1995',
        judet: 'Sălaj',
        nascut: 'Bobota, Sălaj',
        wiki: 'Corneliu_Coposu'
    },
    {
        nume: 'George Emil Palade',
        info: 'biolog celular, Premiul Nobel 1974 • 1912–2008',
        judet: 'Iași',
        nascut: 'Iași',
        wiki: 'George_Emil_Palade'
    },
    {
        nume: 'Ștefan Odobleja',
        info: 'inventator, precursor al ciberneticii • 1902–1978',
        judet: 'Mehedinți',
        nascut: 'Izvorul Aneștilor, Mehedinți',
        wiki: '%C8%98tefan_Odobleja'
    },
    {
        nume: 'Radu Lupu',
        info: 'pianist • 1945–2022',
        judet: 'Galați',
        nascut: 'Galați',
        wiki: 'Radu_Lupu'
    },
    {
        nume: 'Gabriela Szabo',
        info: 'atletă, campioană olimpică • n. 1975',
        judet: 'Bistrița-Năsăud',
        nascut: 'Bistrița',
        wiki: 'Gabriela_Szabo'
    },
    {
        nume: 'Gheorghe Marinescu',
        info: 'neurolog, pionier al filmului medical • 1863–1938',
        judet: 'București',
        nascut: 'București',
        wiki: 'Gheorghe_Marinescu'
    },
    {
        nume: 'Ion Heliade Rădulescu',
        info: 'scriitor, pașoptist • 1802–1872',
        judet: 'Dâmbovița',
        nascut: 'Târgoviște, Dâmbovița',
        wiki: 'Ion_Heliade_R%C4%83dulescu'
    },
    {
        nume: 'Vasile Lucaciu',
        info: 'preot, luptător pentru drepturi naționale • 1852–1922',
        judet: 'Satu Mare',
        nascut: 'Apa, Satu Mare',
        wiki: 'Vasile_Lucaciu'
    },
    {
        nume: 'George Pop de Băsești',
        info: 'om politic, militant național • 1835–1919',
        judet: 'Maramureș',
        nascut: 'Băsești, Maramureș',
        wiki: 'George_Pop_de_B%C4%83se%C8%99ti'
    },
    {
        nume: 'Iosif Vulcan',
        info: 'scriitor, jurnalist • 1841–1907',
        judet: 'Bihor',
        nascut: 'Holod, Bihor',
        wiki: 'Iosif_Vulcan'
    },
    {
        nume: 'Alexandru Marghiloman',
        info: 'om politic, prim-ministru • 1854–1925',
        judet: 'Buzău',
        nascut: 'Buzău',
        wiki: 'Alexandru_Marghiloman'
    },
    {
        nume: 'Traian Doda',
        info: 'colonel, erou național • 1822–1895',
        judet: 'Caraș-Severin',
        nascut: 'Măidan, Caraș-Severin',
        wiki: 'Traian_Doda'
    },
    {
        nume: 'Lazar Edeleanu',
        info: 'chimist, inventator al rafinării petrolului • 1861–1941',
        judet: 'București',
        nascut: 'București',
        wiki: 'Lazar_Edeleanu'
    },
    {
        nume: 'Emil Isac',
        info: 'poet, dramaturg • 1886–1954',
        judet: 'Cluj',
        nascut: 'Dej, Cluj',
        wiki: 'Emil_Isac'
    },
    {
        nume: 'Barbu Delavrancea',
        info: 'scriitor, avocat, orator • 1858–1918',
        judet: 'București',
        nascut: 'București',
        wiki: 'Barbu_%C8%98tef%C4%83nescu_Delavrancea'
    },
    {
        nume: 'Gábor Áron',
        info: 'erou revoluționar, ofițer de artilerie • 1814–1849',
        judet: 'Covasna',
        nascut: 'Turia, Covasna',
        wiki: 'G%C3%A1bor_%C3%81ron'
    },
    {
        nume: 'Anastase Dragomir',
        info: 'inventator al scaunului ejectabil • 1896–1966',
        judet: 'Argeș',
        nascut: 'Rucăr, Argeș',
        wiki: 'Anastase_Dragomir'
    },
    {
        nume: 'Mihail Jora',
        info: 'compozitor, dirijor • 1891–1971',
        judet: 'Neamț',
        nascut: 'Roman, Neamț',
        wiki: 'Mihail_Jora'
    },
    {
        nume: 'Mircea cel Bătrân',
        info: 'domnitor al Țării Românești • c. 1355–1418',
        judet: 'Argeș',
        nascut: 'Câmpulung, Argeș',
        wiki: 'Mircea_the_Elder',
        wikiRo: 'Mircea_cel_B%C4%83tr%C3%A2n'
    },
    {
        nume: 'Burebista',
        info: 'rege al dacilor, întemeietor al statului dac • sec. I î.Hr.',
        judet: 'Hunedoara',
        nascut: 'Dacia',
        wiki: 'Burebista',
        wikiRo: 'Burebista'
    },
    {
        nume: 'Decebal',
        info: 'ultimul rege al dacilor • ?–106 d.Hr.',
        judet: 'Hunedoara',
        nascut: 'Dacia',
        wiki: 'Decebalus',
        wikiRo: 'Decebal'
    },
    {
        nume: 'Horia',
        info: 'conducător al Răscoalei de la 1784 • c. 1730–1785',
        judet: 'Alba',
        nascut: 'Albac, Alba',
        wiki: 'Horea',
        wikiRo: 'Horea'
    },
    {
        nume: 'Alexandru cel Bun',
        info: 'domnitor al Moldovei • c. 1375–1432',
        judet: 'Iași',
        nascut: 'Moldova',
        wiki: 'Alexander_the_Good',
        wikiRo: 'Alexandru_cel_Bun'
    },
    {
        nume: 'Nicolae Titulescu',
        info: 'diplomat, om politic, președinte al Ligii Națiunilor • 1882–1941',
        judet: 'Olt',
        nascut: 'Craiova, Dolj',
        wiki: 'Nicolae_Titulescu',
        wikiRo: 'Nicolae_Titulescu'
    },
    {
        nume: 'George Călinescu',
        info: 'critic literar, scriitor • 1899–1965',
        judet: 'Iași',
        nascut: 'București',
        wiki: 'George_C%C4%83linescu',
        wikiRo: 'George_C%C4%83linescu'
    },
    {
        nume: 'Bogdan Petriceicu Hașdeu',
        info: 'scriitor, filolog, om de cultură • 1838–1907',
        judet: 'Iași',
        nascut: 'Cristinești, Ucraina',
        wiki: 'Bogdan_Petriceicu_Ha%C8%99deu',
        wikiRo: 'Bogdan_Petriceicu_Ha%C8%99deu'
    },
    {
        nume: 'Ștefan Luchian',
        info: 'pictor, cel mai mare pictor român modern • 1868–1916',
        judet: 'Botoșani',
        nascut: 'Ștefănești, Botoșani',
        wiki: '%C8%98tefan_Luchian',
        wikiRo: '%C8%98tefan_Luchian'
    },
    {
        nume: 'Theodor Aman',
        info: 'pictor, întemeietorul picturii moderne române • 1831–1891',
        judet: 'Dolj',
        nascut: 'Câmpulung, Argeș',
        wiki: 'Theodor_Aman',
        wikiRo: 'Theodor_Aman'
    },
    {
        nume: 'Ion Andreescu',
        info: 'pictor impresionist • 1850–1882',
        judet: 'Buzău',
        nascut: 'Buzău',
        wiki: 'Ion_Andreescu_(painter)',
        wikiRo: 'Ion_Andreescu'
    },
    {
        nume: 'Alexandru Macedonski',
        info: 'poet simbolist • 1854–1920',
        judet: 'Dolj',
        nascut: 'Craiova, Dolj',
        wiki: 'Alexandru_Macedonski',
        wikiRo: 'Alexandru_Macedonski'
    },
    {
        nume: 'Petre Ispirescu',
        info: 'culegător de basme populare • 1830–1887',
        judet: 'București',
        nascut: 'București',
        wiki: 'Petre_Ispirescu',
        wikiRo: 'Petre_Ispirescu'
    },
    {
        nume: 'Alexandru Papiu-Ilarian',
        info: 'jurist, istoric, pașoptist • 1827–1877',
        judet: 'Mureș',
        nascut: 'Bezded, Sălaj',
        wiki: 'Alexandru_Papiu_Ilarian',
        wikiRo: 'Alexandru_Papiu-Ilarian'
    },
    {
        nume: 'Constantin Brâncoveanu',
        info: 'domnitor al Țării Românești, martir • 1654–1714',
        judet: 'Ilfov',
        nascut: 'Brâncoveni, Olt',
        wiki: 'Constantin_Br%C3%A2ncoveanu',
        wikiRo: 'Constantin_Br%C3%A2ncoveanu'
    },
    {
        nume: 'Gheorghe Doja',
        info: 'conducătorul răscoalei țărănești din 1514 • c. 1470–1514',
        judet: 'Harghita',
        nascut: 'Doja, Harghita',
        wiki: 'Gy%C3%B6rgy_D%C3%B3zsa',
        wikiRo: 'Gheorghe_Doja'
    },
    {
        nume: 'Ion Agârbiceanu',
        info: 'scriitor, preot greco-catolic • 1882–1963',
        judet: 'Alba',
        nascut: 'Cenade, Alba',
        wiki: 'Ion_Ag%C3%A2rbiceanu',
        wikiRo: 'Ion_Ag%C3%A2rbiceanu'
    },
    {
        nume: 'Virgil Madgearu',
        info: 'economist, om politic • 1887–1940',
        judet: 'Galați',
        nascut: 'Galați',
        wiki: 'Virgil_Madgearu',
        wikiRo: 'Virgil_Madgearu'
    },
    {
        nume: 'Constantin Daicoviciu',
        info: 'arheolog, istoric al Daciei • 1898–1973',
        judet: 'Caraș-Severin',
        nascut: 'Caransebeș, Caraș-Severin',
        wiki: 'Constantin_Daicoviciu',
        wikiRo: 'Constantin_Daicoviciu'
    },
    {
        nume: 'Octav Băncilă',
        info: 'pictor realist, autorul tabloului „1907" • 1872–1944',
        judet: 'Iași',
        nascut: 'Iași',
        wiki: 'Octav_B%C4%83ncil%C4%83',
        wikiRo: 'Octav_B%C4%83ncil%C4%83'
    },
    {
        nume: 'Elie Wiesel',
        info: 'Scriitor, supraviețuitor al Holocaustului și laureat al Premiului Nobel pentru Pace (1986)',
        judet: 'Maramureș',
        nascut: 'Sighetu Marmației',
        wiki: 'Elie_Wiesel',
        wikiRo: 'Elie_Wiesel',
        foto: 'Elie_Wiesel.jpg'
    },
    {
        nume: 'Bogdan I al Moldovei',
        info: 'Voievod maramureșean, întemeietorul Principatului Moldovei independent față de Ungaria (1363)',
        judet: 'Maramureș',
        nascut: 'Cuhea (azi Bogdan Vodă)',
        wiki: 'Bogdan_I_of_Moldavia',
        wikiRo: 'Bogdan_I_al_Moldovei',
        foto: 'Bogdan_I_of_Moldova_mural.jpg'
    },
    {
        nume: 'Dragoș',
        info: 'Voievod din Maramureș, descălecătorul Moldovei și primul stăpânitor al acestei țări (1352)',
        judet: 'Maramureș',
        nascut: 'Maramureș',
        wiki: 'Drago%C8%99%2C_Voivode_of_Moldavia',
        wikiRo: 'Drago%C8%99_I',
        foto: 'Constantin_Lecca_-_Dragos_Voda_la_vanatoarea_zimbrului.jpg'
    },
    {
        nume: 'Augustin Buzura',
        info: 'Romancier și academician, autorul romanelor „Absenții", „Orgolii" și „Fețele tăcerii"',
        judet: 'Maramureș',
        nascut: 'Berința',
        wiki: 'Augustin_Buzura',
        wikiRo: 'Augustin_Buzura',
        foto: 'Augustin_Buzura.jpg'
    },
    {
        nume: 'Alexandru Ivasiuc',
        info: 'Scriitor și romancier, autor al trilogiei „Vestibul" – „Păsările" – „Apa"; decedat în cutremurul din 1977',
        judet: 'Maramureș',
        nascut: 'Sighetu Marmației',
        wiki: 'Alexandru_Ivasiuc',
        wikiRo: 'Alexandru_Ivasiuc',
        foto: 'Alexandru_Ivasiuc1.jpg'
    },
    {
        nume: 'Gheza Vida',
        info: 'Sculptor și gravor, autorul Monumentului Eroilor de la Moisei și al unor lucrări de for public',
        judet: 'Maramureș',
        nascut: 'Baia Mare',
        wiki: 'Gheza_Vida',
        wikiRo: 'Gheza_Vida',
        foto: 'Gheza_Vida_in_1936.png'
    },
    {
        nume: 'Nicolae Breban',
        info: 'Romancier și eseist, unul dintre cei mai importanți prozatori postbelici, autor al romanului „Animale bolnave"',
        judet: 'Maramureș',
        nascut: 'Baia Mare',
        wiki: 'Nicolae_Breban',
        wikiRo: 'Nicolae_Breban',
        foto: 'Nicolae_Breban.jpg'
    },
    {
        nume: 'Mihai Pop',
        info: 'Folclorist și etnolog, laureat al Premiului Herder (1967), specialist în folclorul sud-est european',
        judet: 'Maramureș',
        nascut: 'Glod, Strâmtura',
        wiki: 'Mihai_Pop',
        wikiRo: 'Mihai_Pop_(etnolog)'
    },
    {
        nume: 'Alexandru Filipașcu',
        info: 'Istoric, autor al „Istoriei Maramureșului" (1940), martir al regimului comunist',
        judet: 'Maramureș',
        nascut: 'Petrova',
        wiki: 'Alexandru_Filipa%C8%99cu',
        wikiRo: 'Alexandru_Filipa%C8%99cu',
        foto: 'Alexandru_Filipașcu_de_Dolha_și_de_Petrova.jpg'
    },
];

// ── Trivia: stare joc & helpers ─────────────────────────────────────────────
let triviaIntrebari  = [];
let triviaIndex      = 0;
let triviaScor       = 0;
let triviaAsteapta   = false;
let triviaMod        = 'judet'; // 'judet' | 'nume'

const TRIVIA_NR_INTREBARI = 10;
const TOATE_JUDETELE = [
    'Alba','Arad','Argeș','Bacău','Bihor','Bistrița-Năsăud','Botoșani','Brăila',
    'Brașov','București','Buzău','Călărași','Caraș-Severin','Cluj','Constanța',
    'Covasna','Dâmbovița','Dolj','Galați','Giurgiu','Gorj','Harghita','Hunedoara',
    'Ialomița','Iași','Ilfov','Maramureș','Mehedinți','Mureș','Neamț','Olt',
    'Prahova','Sălaj','Satu Mare','Sibiu','Suceava','Teleorman','Timiș','Tulcea',
    'Vaslui','Vâlcea','Vrancea'
];

function hsScorText(raw, total) {
    if (!raw) return '';
    try {
        const d = JSON.parse(raw);
        if (!d || d.scor == null || d.timp == null) return '';
        return '🏆 ' + d.scor + '/' + (total || 10) + ' · ' + formatTime(d.timp);
    } catch(e) { return ''; }
}

function afiseazaHSTrivia() {
    const el = document.getElementById('trivia-hs-display');
    if (el) el.textContent = hsScorText(lsGet('hs_trivia'));

    const elN = document.getElementById('trivia-hs-nume-display');
    if (elN) {
        const raw = lsGet('hs_tgn');
        if (!raw) { elN.textContent = ''; }
        else {
            try {
                const d = JSON.parse(raw);
                elN.textContent = (d && d.scor != null && d.total)
                    ? '🏆 ' + d.scor + '/' + d.total + ' ghicite'
                    : '';
            } catch(e) { elN.textContent = ''; }
        }
    }
}

function startTriviaLista() {
    document.getElementById('trivia-intro').classList.add('ascuns');
    const cont = document.getElementById('trivia-lista-content');
    cont.innerHTML = '<h2 style="margin:0 0 16px">Toate personalitățile</h2>';
    [...TRIVIA_PERSOANE]
        .filter((p, i, a) => a.findIndex(x => x.nume === p.nume) === i)
        .sort((a, b) => a.nume.localeCompare(b.nume, 'ro'))
        .forEach(p => {
            const div = document.createElement('div');
            div.className = 'ml-rand';
            const wrap = document.createElement('div');
            wrap.className = 'ml-img-wrap';
            const ph = document.createElement('span');
            ph.className = 'ml-placeholder';
            ph.textContent = '🧑';
            wrap.appendChild(ph);
            const img = document.createElement('img');
            img.className = 'ml-img';
            img.referrerPolicy = 'no-referrer';
            img.onload  = () => { ph.style.display = 'none'; };
            img.onerror = () => { img.style.display = 'none'; };
            wrap.appendChild(img);
            const info = document.createElement('div');
            info.className = 'ml-info';
            info.innerHTML = '<div class="ml-nume">' + p.nume + '</div>' +
                             '<div class="ml-sub">'  + p.info  + '</div>' +
                             '<div class="ml-sub" style="opacity:.7">' + p.nascut + '</div>';
            div.appendChild(wrap);
            div.appendChild(info);
            cont.appendChild(div);
            // încarcă poza
            incarcaFoto(p, img, () => { img.style.display = 'none'; });
        });
    document.getElementById('trivia-lista').classList.remove('ascuns');
}

function inapoiDinTriviaLista() {
    document.getElementById('trivia-lista').classList.add('ascuns');
    document.getElementById('trivia-intro').classList.remove('ascuns');
}

// ── TRIVIA_IMG_MAP (poze hardcodate Wikimedia) ──────────────────────────────
// Filenames pentru Wikimedia Commons — încărcate via Special:FilePath (mai stabil decât URL-uri hardcodate)
function fpUrl(filename) {
    return 'https://commons.wikimedia.org/wiki/Special:FilePath/' + encodeURIComponent(filename) + '?width=320';
}
const TRIVIA_IMG_MAP = {
    'Mihai Eminescu':           fpUrl('Eminescu.jpg'),
    'George Enescu':            fpUrl('George_Enescu.jpg'),
    'Constantin Brâncuși':      fpUrl('Brancusi_portrait.jpg'),
    'Ion Luca Caragiale':       fpUrl('Ion_Luca_Caragiale.jpg'),
    'Ștefan cel Mare':          fpUrl('Stefan_cel_Mare.jpg'),
    'Avram Iancu':              fpUrl('Avram_Iancu.jpg'),
    'Alexandru Ioan Cuza':      fpUrl('Alexandru_Ioan_Cuza.jpg'),
    'Aurel Vlaicu':             fpUrl('Aurel_Vlaicu.jpg'),
    'Nadia Comăneci':           fpUrl('Nadia_Comaneci_1975.jpg'),
    'Emil Cioran':              fpUrl('Cioran2.jpg'),
    'Lucian Blaga':             fpUrl('Lucian_Blaga.jpg'),
    'Nicolae Iorga':            fpUrl('Nicolae_Iorga.jpg'),
    'Dimitrie Cantemir':        fpUrl('Dimitrie_Cantemir_-_Pictura_lui_Dimitrie_Cantemir_(detaliu).jpg'),
    'Mircea Eliade':            fpUrl('Eliade.jpg'),
    'Eugen Ionescu':            fpUrl('Ionesco.jpg'),
    'Mihail Kogălniceanu':      fpUrl('Mihail_Kogalniceanu.jpg'),
    'Nicolae Bălcescu':         fpUrl('Nicolae_Balcescu.jpg'),
    'Traian Vuia':              fpUrl('Traian_Vuia.jpg'),
    'Ana Aslan':                fpUrl('Ana_Aslan.jpg'),
    'Gheorghe Hagi':            fpUrl('Gheorghe_Hagi_2013.jpg'),
    'Vasile Alecsandri':        fpUrl('Vasile_Alecsandri.jpg'),
    'Ion Creangă':              fpUrl('Ion_Creanga.jpg'),
    'Mihai Viteazul':           fpUrl('Mihai_Viteazul.jpg'),
    'Vlad Țepeș':               fpUrl('Vlad_Tepes_002.jpg'),
    'Nicolae Grigorescu':       fpUrl('Nicolae_Grigorescu.jpg'),
    'Henri Coandă':             fpUrl('Henri_Coanda.jpg'),
    'Titu Maiorescu':           fpUrl('Titu_Maiorescu.jpg'),
    'Ciprian Porumbescu':       fpUrl('Ciprian_Porumbescu.jpg'),
    'George Coșbuc':            fpUrl('George_Cosbuc.jpg'),
    'Ioan Slavici':             fpUrl('Ioan_Slavici.jpg'),
    'Tudor Arghezi':            fpUrl('Tudor_Arghezi.jpg'),
    'Liviu Rebreanu':           fpUrl('Liviu_Rebreanu.jpg'),
    'Nichita Stănescu':         fpUrl('Nichita_Stanescu.jpg'),
    'Marin Preda':              fpUrl('Marin_Preda.jpg'),
    'Camil Petrescu':           fpUrl('Camil_Petrescu.jpg'),
    'Victor Babeș':             fpUrl('Victor_Babes.jpg'),
    'Spiru Haret':              fpUrl('Spiru_Haret.jpg'),
    'Ecaterina Teodoroiu':      fpUrl('Ecaterina_Teodoroiu.jpg'),
    'Ilie Năstase':             fpUrl('Ilie_Nastase_1972.jpg'),
    'Ivan Patzaichin':          fpUrl('Ivan_Patzaichin.jpg'),
    'Simona Halep':             fpUrl('Simona_Halep_(2016_US_Open).jpg'),
    'Maria Tănase':             fpUrl('Maria_Tanase.jpg'),
    'Dinu Lipatti':             fpUrl('Dinu_Lipatti.jpg'),
    'Angela Gheorghiu':         fpUrl('Angela_Gheorghiu_Headshot.jpg'),
    'Emil Racoviță':            fpUrl('Emil_Racovita.jpg'),
    'Grigore Moisil':           fpUrl('GrigoreMoisil.jpg'),
    'Iancu de Hunedoara':       fpUrl('Iancu_de_Hunedoara.jpg'),
    'George Emil Palade':       fpUrl('George_Emil_Palade.jpg'),
    'Gabriela Szabo':           fpUrl('Gabriela_Szabo.jpg'),
    'Ion Heliade Rădulescu':    fpUrl('Ion_Heliade_Radulescu.jpg'),
    'Barbu Delavrancea':        fpUrl('Barbu_Delavrancea.jpg'),
    'George Călinescu':         fpUrl('George_Calinescu.jpg'),
    'Bogdan Petriceicu Hașdeu': fpUrl('Bogdan_Petriceicu_Hasdeu.jpg'),
    'Ștefan Luchian':           fpUrl('Stefan_Luchian.jpg'),
    'Nicolae Titulescu':        fpUrl('Nicolae_Titulescu.jpg'),
    'Alexandru Macedonski':     fpUrl('Alexandru_Macedonski.jpg'),
    'Grigore Antipa':           fpUrl('Grigore_Antipa.jpg'),
    'Constantin Brâncoveanu':   fpUrl('Constantin_Brancoveanu.jpg'),
    'Octav Băncilă':            fpUrl('Octav_Bancila.jpg'),
    'Radu Lupu':                fpUrl('Radu_Lupu_Clive_Barda.jpg'),
    'Corneliu Coposu':          fpUrl('Corneliu_Coposu.jpg'),
    'Mircea cel Bătrân':        fpUrl('Mircea_cel_Batran.jpg'),
    'George Pop de Băsești':    fpUrl('GheorghePopDeBasesti.jpg'),
    'Gheorghe Dima':            fpUrl('Gheorghe_Dima.jpg'),
    // Fișier pe ro.wikipedia (nu pe Commons) — URL direct
    'Gheorghe Marinescu':       'https://upload.wikimedia.org/wikipedia/ro/thumb/4/44/Gheorghe_Marinescu.jpg/400px-Gheorghe_Marinescu.jpg',
    // Personalități fără intrare în TRIVIA_IMG_MAP — adăugate cu filenames verificate
    'Ion Mincu':                fpUrl('Ion_Mincu.jpg'),
    'Octavian Goga':            fpUrl('Octavian_Goga.jpg'),
    'Vasile Pârvan':            fpUrl('Vasile_Parvan.jpg'),
    'Simion Bărnuțiu':          fpUrl('Simion_Barnutiu.jpg'),
    'Mihail Sadoveanu':         fpUrl('Mihail_Sadoveanu.jpg'),
    'Ion Pillat':               fpUrl('Ion_Pillat.jpg'),
    'George Bacovia':           fpUrl('George_Bacovia.jpg'),
    'Ion Barbu':                fpUrl('Ion_Barbu.jpg'),
    'Theodor Aman':             fpUrl('Theodor_Aman.jpg'),
    'Ion Andreescu':            fpUrl('Ion_Andreescu.jpg'),
    'Petre Ispirescu':          fpUrl('Petre_Ispirescu.jpg'),
    'Alexandru Papiu-Ilarian':  fpUrl('Alexandru_Papiu_Ilarian.jpg'),
    'Vasile Lucaciu':           fpUrl('Vasile_Lucaciu.jpg'),
    'Iosif Vulcan':             fpUrl('Iosif_Vulcan.jpg'),
    'Alexandru Marghiloman':    fpUrl('Alexandru_Marghiloman.jpg'),
    'Traian Doda':              fpUrl('Trajan_Doda.png'),
    'Lazar Edeleanu':           fpUrl('Lazăr_Edeleanu.png'),
    'Horia':                    fpUrl('Vasile_Ursu_Nicola.jpg'),
    'Anastase Dragomir':        fpUrl('Anastase_Dragomir.jpg'),
    'Mihail Jora':              fpUrl('Mihail_Jora.jpg'),
    'Burebista':                fpUrl('Burebista.jpg'),
    'Decebal':                  fpUrl('Decebalus.jpg'),
    'Gábor Áron':               fpUrl('Gábor_Áron.jpg'),
    'Alexandru cel Bun':        fpUrl('Alexandru_cel_Bun.jpg'),
    'Gheorghe Doja':            fpUrl('Dosa_Gyorgy.jpg'),
    'Ion Agârbiceanu':          fpUrl('Ion_Agarbiceanu.jpg'),
    'Virgil Madgearu':          fpUrl('Virgil_Madgearu.jpg'),
    'Constantin Daicoviciu':    fpUrl('Constantin_Daicoviciu.jpg'),
    'Barbu Știrbei':            fpUrl('Barbu_Stirbey.jpg'),
    'Alexandru Vlahuță':        fpUrl('Alexandru_Vlahuta.jpg'),
    'Iorgu Iordan':             fpUrl('Iorgu_Iordan.jpg'),
    'Ion Țiriac':               fpUrl('Ion_Tiriac.jpg'),
    'Emil Isac':                fpUrl('Emil_Isac.jpg'),
    'Ștefan Odobleja':          fpUrl('Stefan_Odobleja.jpg'),
};

// ── Trivia: logică joc (startTrivia, afișare, răspunsuri, listă, ghicește) ──

// Stare Personalități pe Județe
let tpjJudet      = null;
let tpjPersonaje  = [];
let tpjRamase     = [];
let tpjCurent     = null;
let tpjScor       = 0;
let tpjGreseli    = 0;

// Încarcă poza unei personalități: foto (Commons) → TRIVIA_IMG_MAP → wikiThumb EN → wikiThumb RO → onFallback
function incarcaFoto(p, img, onFallback) {
    const setImg  = src => { img.src = src; };
    const tryRo   = () => p.wikiRo ? wikiThumb('ro', p.wikiRo, setImg, onFallback) : onFallback();
    const tryWiki = () => wikiThumb('en', p.wiki, setImg, tryRo);
    const tryMap  = () => {
        if (TRIVIA_IMG_MAP[p.nume]) {
            img.onerror = () => { img.onerror = null; tryWiki(); };
            img.src = TRIVIA_IMG_MAP[p.nume];
        } else { tryWiki(); }
    };
    if (p.foto) {
        img.onerror = () => { img.onerror = null; tryMap(); };
        img.src = 'https://commons.wikimedia.org/wiki/Special:FilePath/' + encodeURIComponent(p.foto) + '?width=320';
    } else { tryMap(); }
}

function tpjIncarcaImg(p, img) {
    incarcaFoto(p, img, () => { img.style.display = 'none'; });
}

function startTpjSelector() {
    document.getElementById('trivia-intro').classList.add('ascuns');

    // Grupează personalitățile pe județ
    const peJudet = {};
    TRIVIA_PERSOANE.forEach(p => {
        if (!peJudet[p.judet]) peJudet[p.judet] = [];
        peJudet[p.judet].push(p);
    });

    const wrap = document.getElementById('tpj-judete-wrap');
    wrap.innerHTML = '';

    const inner = document.createElement('div');
    inner.className = 'judete-carduri';

    // Sortează județele alfabetic
    Object.keys(peJudet).sort((a, b) => a.localeCompare(b, 'ro')).forEach(judet => {
        const pers = peJudet[judet];
        const btn  = document.createElement('button');
        btn.className = 'card-judet';
        btn.innerHTML = `<div class="cj-titlu">${judet}</div>
                         <div class="cj-nr">${pers.length} personalit${pers.length === 1 ? 'ate' : 'ăți'}</div>
                         <div class="cj-best"></div>`;
        btn.onclick = () => startTpjJoc(judet, pers);

        // HS
        const raw = lsGet('hs_tpj_' + judet);
        if (raw) {
            try {
                const d = JSON.parse(raw);
                const el = btn.querySelector('.cj-best');
                if (el && d.scor != null) el.textContent = '🏆 ' + d.scor + '/' + d.total + ' · ' + d.greseli + ' greșeli';
            } catch(e) {}
        }

        inner.appendChild(btn);
    });

    wrap.appendChild(inner);

    document.getElementById('tpj-selector').classList.remove('ascuns');
}

function startTpjJoc(judet, pers) {
    tpjJudet     = judet;
    tpjPersonaje = [...pers];
    tpjRamase    = [...pers].sort(() => Math.random() - 0.5);
    tpjScor      = 0;
    tpjGreseli   = 0;
    tpjCurent    = null;

    // Construiește grid cu toate pozele (fără nume)
    const grid = document.getElementById('tpj-foto-grid');
    grid.innerHTML = '';

    tpjPersonaje.forEach(p => {
        const card = document.createElement('div');
        card.className = 'tpj-card';
        card.dataset.nume = p.nume;

        const imgWrap = document.createElement('div');
        imgWrap.className = 'tgn-img-wrap';

        const ph = document.createElement('div');
        ph.className = 'tgn-placeholder';
        ph.textContent = '🧑';
        imgWrap.appendChild(ph);

        const img = document.createElement('img');
        img.className = 'tgn-img';
        img.referrerPolicy = 'no-referrer';
        img.onload = () => { ph.style.display = 'none'; };
        img.onerror = () => { img.style.display = 'none'; };
        imgWrap.appendChild(img);

        card.appendChild(imgWrap);
        card.onclick = () => tpjClickCard(card, p);
        grid.appendChild(card);

        tpjIncarcaImg(p, img);
    });

    document.getElementById('tpj-selector').classList.add('ascuns');
    document.getElementById('tpj-final').classList.add('ascuns');
    document.getElementById('tpj-joc').classList.remove('ascuns');

    tpjActualizeazaScor();
    tpjAlegeUrmatorul();
}

function tpjAlegeUrmatorul() {
    if (tpjRamase.length === 0) { tpjSfarsit(); return; }
    tpjCurent = tpjRamase[0];
    document.getElementById('tpj-nume-cautat').textContent = tpjCurent.nume;
    document.getElementById('tpj-ramase-nr').textContent   = tpjRamase.length;
}

function tpjClickCard(card, p) {
    if (card.classList.contains('tpj-corect') || !tpjCurent) return;

    if (p.nume === tpjCurent.nume) {
        // Corect
        card.classList.add('tpj-corect');
        const label = document.createElement('div');
        label.className = 'tgn-label-corect';
        label.textContent = p.nume;
        card.appendChild(label);
        tpjScor++;
        tpjRamase.shift();
        tpjActualizeazaScor();
        setTimeout(() => tpjAlegeUrmatorul(), 350);
    } else {
        // Greșit
        tpjGreseli++;
        tpjActualizeazaScor();
        card.classList.add('tpj-gresit');
        setTimeout(() => card.classList.remove('tpj-gresit'), 400);
    }
}

function tpjActualizeazaScor() {
    document.getElementById('tpj-corect-nr').textContent = tpjScor;
    document.getElementById('tpj-gresit-nr').textContent = tpjGreseli;
    document.getElementById('tpj-ramase-nr').textContent = tpjRamase.length;
}

function tpjSfarsit() {
    const total  = tpjPersonaje.length;
    const pct    = Math.round(tpjScor / total * 100);
    const emoji  = pct === 100 ? '🏆' : pct >= 70 ? '🎉' : '💪';
    const titlu  = pct === 100 ? 'Perfect!' : pct >= 70 ? 'Bine făcut!' : 'Mai exersează!';

    document.getElementById('tpj-final-emoji').textContent = emoji;
    document.getElementById('tpj-final-titlu').textContent = titlu;
    document.getElementById('tpj-final-scor').textContent  = tpjScor + '/' + total + ' · ' + tpjGreseli + ' greșeli';

    // Salvează HS
    const raw   = lsGet('hs_tpj_' + tpjJudet);
    const vechi = raw ? JSON.parse(raw) : null;
    const eRecord = !vechi || tpjScor > vechi.scor || (tpjScor === vechi.scor && tpjGreseli < vechi.greseli);
    if (eRecord) lsSet('hs_tpj_' + tpjJudet, JSON.stringify({ scor: tpjScor, total, greseli: tpjGreseli }));
    document.getElementById('tpj-final-hs').textContent = eRecord ? '🥇 Record nou!' : '';

    document.getElementById('tpj-joc').classList.add('ascuns');
    document.getElementById('tpj-final').classList.remove('ascuns');
}

function tpjDinNou() {
    document.getElementById('tpj-final').classList.add('ascuns');
    startTpjJoc(tpjJudet, tpjPersonaje);
}

function inapoiDinTpjJoc() {
    document.getElementById('tpj-joc').classList.add('ascuns');
    document.getElementById('tpj-final').classList.add('ascuns');
    startTpjSelector();
}

function inapoiDinTpjSelector() {
    document.getElementById('tpj-selector').classList.add('ascuns');
    document.getElementById('trivia-intro').classList.remove('ascuns');
}

let tgnRezolvate = 0;

function startTriviaGhicesteNume() {
    document.getElementById('trivia-intro').classList.add('ascuns');
    tgnRezolvate = 0;

    const persoane = [...TRIVIA_PERSOANE]
        .filter((p, i, a) => a.findIndex(x => x.nume === p.nume) === i)
        .sort((a, b) => a.nume.localeCompare(b.nume, 'ro'));

    document.getElementById('tgn-total').textContent    = persoane.length;
    document.getElementById('tgn-rezolvate').textContent = 0;

    const grid = document.getElementById('tgn-grid');
    grid.innerHTML = '';

    persoane.forEach(p => {
        const card = document.createElement('div');
        card.className = 'tgn-card';
        card.dataset.nume = p.nume;

        const imgWrap = document.createElement('div');
        imgWrap.className = 'tgn-img-wrap';

        const ph = document.createElement('div');
        ph.className = 'tgn-placeholder';
        ph.textContent = '🧑';
        imgWrap.appendChild(ph);

        const img = document.createElement('img');
        img.className = 'tgn-img';
        img.referrerPolicy = 'no-referrer';
        img.onload  = () => { ph.style.display = 'none'; };
        img.onerror = () => { img.style.display = 'none'; };
        imgWrap.appendChild(img);

        // buton Renunță
        const renBtn = document.createElement('button');
        renBtn.className = 'tgn-ren-btn';
        renBtn.textContent = '👁';
        renBtn.title = 'Renunță — arată numele';
        renBtn.onclick = () => tgnRenunta(card, p);
        imgWrap.appendChild(renBtn);

        card.appendChild(imgWrap);
        grid.appendChild(card);

        // încarcă poza
        const setImg   = src => { img.src = src; };
        incarcaFoto(p, img, () => { img.style.display = 'none'; });
    });

    document.getElementById('trivia-ghiceste-nume').classList.remove('ascuns');
}

function tgnRenunta(card, p) {
    if (card.classList.contains('tgn-corect') || card.classList.contains('tgn-renuntat')) return;
    card.classList.add('tgn-renuntat');
    const label = document.createElement('div');
    label.className = 'tgn-label-renuntat';
    label.textContent = p.nume;
    card.appendChild(label);
    card.querySelector('.tgn-ren-btn').style.display = 'none';
}

function tgnOnInput(val) {
    const q = normalizeazaNume(val);
    if (!q) return;

    const cards = document.querySelectorAll('.tgn-card:not(.tgn-corect):not(.tgn-renuntat)');
    let matched = null;
    cards.forEach(c => {
        const numeNorm = normalizeazaNume(c.dataset.nume);
        const numeFam  = normalizeazaNume(c.dataset.nume.split(' ').slice(-1)[0]);
        if (numeNorm === q || numeFam === q) matched = c;
    });

    if (matched) {
        matched.classList.add('tgn-corect');
        const label = document.createElement('div');
        label.className = 'tgn-label-corect';
        label.textContent = matched.dataset.nume;
        matched.appendChild(label);
        tgnRezolvate++;
        document.getElementById('tgn-rezolvate').textContent = tgnRezolvate;
        const searchEl = document.getElementById('tgn-search');
        searchEl.value = '';
        const scroll = document.getElementById('tgn-scroll');
        const cardTop = matched.offsetTop - scroll.offsetTop;
        scroll.scrollTo({ top: cardTop - scroll.clientHeight / 2 + matched.clientHeight / 2, behavior: 'smooth' });
        setTimeout(() => searchEl.focus(), 350);
    }
}


function tgnTermina() {
    const total = parseInt(document.getElementById('tgn-total').textContent) || 0;
    const raw   = lsGet('hs_tgn');
    const vechi = raw ? JSON.parse(raw) : null;
    if (!vechi || tgnRezolvate > vechi.scor) {
        lsSet('hs_tgn', JSON.stringify({ scor: tgnRezolvate, total }));
    }
    inapoiDinGhicesteNume();
}

function inapoiDinGhicesteNume() {
    document.getElementById('trivia-ghiceste-nume').classList.add('ascuns');
    document.getElementById('trivia-intro').classList.remove('ascuns');
}

function inapoiDinTriviaJoc() {
    stopTimer();
    document.getElementById('trivia-joc').classList.add('ascuns');
    document.getElementById('trivia-final').classList.add('ascuns');
    document.getElementById('trivia-intro').classList.remove('ascuns');
    afiseazaHSTrivia();
}

function restartTrivia() {
    startTrivia(triviaMod);
}

function startTrivia(mod) {
    triviaMod      = mod || 'judet';
    triviaIndex    = 0;
    triviaScor     = 0;
    triviaAsteapta = false;

    const amestecat = [...TRIVIA_PERSOANE]
        .filter((p, i, a) => a.findIndex(x => x.nume === p.nume) === i)
        .sort(() => Math.random() - 0.5);
    triviaIntrebari = amestecat.slice(0, TRIVIA_NR_INTREBARI);

    document.getElementById('trivia-intro').classList.add('ascuns');
    document.getElementById('trivia-final').classList.add('ascuns');
    document.getElementById('trivia-joc').classList.remove('ascuns');

    startTimer('trivia');
    afiseazaIntrebareTrivia();
}

function afiseazaIntrebareTrivia() {
    const p = triviaIntrebari[triviaIndex];

    document.getElementById('trivia-progres-bar').style.width =
        (triviaIndex / TRIVIA_NR_INTREBARI * 100) + '%';
    document.getElementById('trivia-nr').textContent =
        'Întrebarea ' + (triviaIndex + 1) + ' / ' + TRIVIA_NR_INTREBARI;

    // În modul "nume" ascundem numele și info, în "judet" le arătăm
    const modNume = triviaMod === 'nume';
    document.getElementById('trivia-nume').textContent = modNume ? '' : p.nume;
    document.getElementById('trivia-info').textContent = modNume ? '' : p.info;
    document.getElementById('trivia-intrebare').textContent = modNume
        ? 'Cine este această personalitate?'
        : 'În ce județ s-a născut?';
    document.getElementById('trivia-feedback').textContent = '';

    // Portret
    const img         = document.getElementById('trivia-img');
    const placeholder = document.getElementById('trivia-img-placeholder');
    img.classList.remove('img-fallback');
    img.style.display = '';
    placeholder.classList.remove('vizibil');
    img.src = '';

    const aratFallback = () => {
        img.src = '';
        img.style.display = 'none';
        placeholder.classList.add('vizibil');
    };
    const incarcaImaginea = (url320, urlOriginal) => {
        img.style.display = '';
        placeholder.classList.remove('vizibil');
        img.onerror = () => {
            if (urlOriginal && img.src !== urlOriginal) {
                img.onerror = () => aratFallback();
                img.src = urlOriginal;
            } else { aratFallback(); }
        };
        img.src = url320;
    };

    if (p.foto) {
        const url = 'https://commons.wikimedia.org/wiki/Special:FilePath/' + encodeURIComponent(p.foto) + '?width=320';
        incarcaImaginea(url, null);
    } else if (triviaImgCache[p.wiki]) {
        incarcaImaginea(triviaImgCache[p.wiki], triviaImgCache[p.wiki + '_orig']);
    } else {
        const proceed = orig => {
            const url320 = /\/\d+px-/.test(orig) ? orig.replace(/\/\d+px-/, '/320px-') : orig;
            triviaImgCache[p.wiki]           = url320;
            triviaImgCache[p.wiki + '_orig'] = orig;
            incarcaImaginea(url320, orig);
        };
        const tryRo = () => p.wikiRo
            ? wikiThumb('ro', p.wikiRo, proceed, aratFallback)
            : aratFallback();
        wikiThumb('en', p.wiki, proceed, tryRo);
    }

    // Modul "judet" — butoane multiple choice
    const contOptiuni  = document.getElementById('trivia-optiuni');
    const contScris    = document.getElementById('trivia-scris-wrap');
    const inputScris   = document.getElementById('trivia-scris-input');

    if (modNume) {
        contOptiuni.innerHTML = '';
        contOptiuni.classList.add('ascuns');
        contScris.classList.remove('ascuns');
        inputScris.value = '';
        setTimeout(() => inputScris.focus(), 80);
    } else {
        contScris.classList.add('ascuns');
        contOptiuni.classList.remove('ascuns');
        contOptiuni.innerHTML = '';
        const gresitePool = TOATE_JUDETELE.filter(j => j !== p.judet);
        const gresite = gresitePool.sort(() => Math.random() - 0.5).slice(0, 3);
        const optiuni  = [p.judet, ...gresite].sort(() => Math.random() - 0.5);
        optiuni.forEach(judet => {
            const btn = document.createElement('button');
            btn.className   = 'btn-optiune';
            btn.textContent = judet;
            btn.onclick     = () => raspunsTriva(btn, judet, p);
            contOptiuni.appendChild(btn);
        });
    }
}

function raspunsTriva(btn, judetAles, persoana) {
    if (triviaAsteapta) return;
    triviaAsteapta = true;

    const corect = judetAles === persoana.judet;
    if (corect) triviaScor++;

    document.querySelectorAll('.btn-optiune').forEach(b => {
        b.disabled = true;
        if (b.textContent === persoana.judet) b.classList.add('corect');
        else if (b === btn && !corect)        b.classList.add('gresit');
    });

    const fb = document.getElementById('trivia-feedback');
    fb.textContent = corect
        ? '✅ Corect! S-a născut în ' + persoana.nascut
        : '❌ Răspuns greșit — ' + persoana.nume + ' s-a născut în ' + persoana.nascut;

    setTimeout(() => {
        triviaIndex++;
        triviaAsteapta = false;
        if (triviaIndex >= TRIVIA_NR_INTREBARI) sfarsitTrivia();
        else afiseazaIntrebareTrivia();
    }, 1600);
}

function normalizeazaNume(s) {
    return s.trim().toLowerCase()
        .normalize('NFD').replace(/[̀-ͯ]/g, '')
        .replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, ' ');
}

function verificaNume() {
    if (triviaAsteapta) return;
    const persoana = triviaIntrebari[triviaIndex];
    const input    = document.getElementById('trivia-scris-input');
    const raspuns  = normalizeazaNume(input.value);
    if (!raspuns) return;

    triviaAsteapta = true;

    // Acceptăm: numele complet sau doar numele de familie (ultimul cuvânt)
    const numeNorm     = normalizeazaNume(persoana.nume);
    const numeFamilie  = normalizeazaNume(persoana.nume.split(' ').slice(-1)[0]);
    const corect       = raspuns === numeNorm || raspuns === numeFamilie;

    if (corect) triviaScor++;

    const fb = document.getElementById('trivia-feedback');
    input.disabled = true;
    document.querySelector('.btn-verifica-trivia').disabled = true;

    if (corect) {
        fb.innerHTML = '✅ Corect! <strong>' + persoana.nume + '</strong> · ' + persoana.info;
        input.style.borderColor = '#2ecc71';
    } else {
        fb.innerHTML = '❌ Răspuns greșit — era <strong>' + persoana.nume + '</strong> · ' + persoana.info;
        input.style.borderColor = '#e74c3c';
    }

    setTimeout(() => {
        triviaIndex++;
        triviaAsteapta = false;
        input.disabled = false;
        input.style.borderColor = '';
        document.querySelector('.btn-verifica-trivia').disabled = false;
        if (triviaIndex >= TRIVIA_NR_INTREBARI) sfarsitTrivia();
        else afiseazaIntrebareTrivia();
    }, 2000);
}

function sfarsitTrivia() {
    stopTimer();
    document.getElementById('trivia-joc').classList.add('ascuns');
    const finalEl = document.getElementById('trivia-final');
    finalEl.classList.remove('ascuns');
    finalEl.classList.remove('final-anim-in');
    void finalEl.offsetWidth;
    finalEl.classList.add('final-anim-in');

    const scorEl = document.getElementById('trivia-final-scor');
    scorEl.classList.remove('scor-anim-in');
    void scorEl.offsetWidth;
    scorEl.classList.add('scor-anim-in');

    document.getElementById('trivia-progres-bar').style.width = '100%';

    const pct = triviaScor / TRIVIA_NR_INTREBARI;
    const emoji = pct === 1 ? '🏆' : pct >= 0.7 ? '🎉' : pct >= 0.4 ? '👍' : '💪';
    document.getElementById('trivia-final-emoji').textContent = emoji;
    animaContorScor('trivia-final-scor', triviaScor, TRIVIA_NR_INTREBARI);
    document.getElementById('trivia-final-timp').textContent  =
        '⏱ Timp: ' + formatTime(timerSecunde);

    // High score: prioritate scor mai mare, la egalitate timp mai mic
    const hsKey  = triviaMod === 'nume' ? 'hs_trivia_nume' : 'hs_trivia';
    const raw    = lsGet(hsKey);
    const vechi  = raw ? JSON.parse(raw) : null;
    const record = !vechi || triviaScor > vechi.scor ||
                   (triviaScor === vechi.scor && timerSecunde < vechi.timp);
    if (record) {
        lsSet(hsKey, JSON.stringify({ scor: triviaScor, timp: timerSecunde }));
        document.getElementById('trivia-final-record').textContent = '🌟 Record personal nou!';
    } else {
        document.getElementById('trivia-final-record').textContent =
            '🏆 Record: ' + vechi.scor + '/10 în ' + formatTime(vechi.timp);
    }

    if (pct >= 0.7) pornesteCelebration();
    verificaAchievements({ tip: 'trivia', scor: triviaScor, timp: timerSecunde });
    actualizeazaLandingHS();
}

// ── Trivia Miniştri ────────────────────────────────────────────────────────

// wiki = titlu articol English Wikipedia; wikiRo = fallback Romanian Wikipedia
const MINISTRI_RO = [
    // ── Principatele Unite (1862–1881) ────────────────────────────────────
    { nume: 'Barbu Catargiu',              rol: 'Prim-ministru',          ani: '1862',       wiki: 'Barbu_Catargiu',                   wikiRo: 'Barbu_Catargiu' },
    { nume: 'Apostol Arsache',             rol: 'Prim-ministru interimar', ani: '1862',       wiki: 'Apostol_Arsache',                  wikiRo: 'Apostol_Arsache' },
    { nume: 'Nicolae Kretzulescu',         rol: 'Prim-ministru',          ani: '1862–1865', wiki: 'Nicolae_Kretzulescu',               wikiRo: 'Nicolae_Kretzulescu' },
    { nume: 'Mihail Kogălniceanu',         rol: 'Prim-ministru', ani: '1863–1865', wiki: 'Mihail_Kog%C4%83lniceanu',          wikiRo: 'Mihail_Kog%C4%83lniceanu' },
    { nume: 'Constantin Bosianu',          rol: 'Prim-ministru', ani: '1865–1866', wiki: 'Constantin_Bosianu',                wikiRo: 'Constantin_Bosianu' },
    { nume: 'Ion Ghica',                   rol: 'Prim-ministru', ani: '1866–1871', wiki: 'Ion_Ghica',                         wikiRo: 'Ion_Ghica' },
    { nume: 'Lascăr Catargiu',             rol: 'Prim-ministru', ani: '1866–1895', wiki: 'Lasc%C4%83r_Catargiu',             wikiRo: 'Lasc%C4%83r_Catargiu' },
    { nume: 'Constantin Al. Kretzulescu', rol: 'Prim-ministru', ani: '1867',       wiki: 'Constantin_A._Kretzulescu',        wikiRo: 'Constantin_A._Kretzulescu' },
    { nume: 'Ștefan Golescu',              rol: 'Prim-ministru', ani: '1867–1868', wiki: '%C8%98tefan_Golescu',               wikiRo: '%C8%98tefan_Golescu' },
    { nume: 'Nicolae Golescu',             rol: 'Prim-ministru', ani: '1868',       wiki: 'Nicolae_Golescu',                  wikiRo: 'Nicolae_Golescu' },
    { nume: 'Dimitrie Ghica',              rol: 'Prim-ministru', ani: '1868–1870', wiki: 'Dimitrie_Ghica',                   wikiRo: 'Dimitrie_Ghica' },
    { nume: 'Alexandru G. Golescu',        rol: 'Prim-ministru', ani: '1870',       wiki: 'Alexandru_G._Golescu',             wikiRo: 'Alexandru_G._Golescu' },
    { nume: 'Manolache Costache Epureanu', rol: 'Prim-ministru', ani: '1870–1876', wiki: 'Manolache_Costache_Epureanu',      wikiRo: 'Manolache_Costache_Epureanu' },
    { nume: 'Ioan Emanoil Florescu',       rol: 'Prim-ministru', ani: '1876–1891', wiki: 'Ioan_Emanoil_Florescu',            wikiRo: 'Ioan_Emanoil_Florescu' },
    { nume: 'Ion C. Brătianu',             rol: 'Prim-ministru', ani: '1876–1888', wiki: 'Ion_C._Br%C4%83tianu',             wikiRo: 'Ion_C._Br%C4%83tianu' },
    // ── Regatul României (1881–1918) ──────────────────────────────────────
    { nume: 'Dumitru Brătianu',            rol: 'Prim-ministru', ani: '1881',       wiki: 'Dumitru_Br%C4%83tianu',           wikiRo: 'Dumitru_Br%C4%83tianu' },
    { nume: 'Theodor Rosetti',             rol: 'Prim-ministru', ani: '1888–1889', wiki: 'Theodor_Rosetti',                 wikiRo: 'Theodor_Rosetti' },
    { nume: 'Gheorghe Manu',               rol: 'Prim-ministru', ani: '1889–1891', wiki: 'Gheorghe_Manu',                    wikiRo: 'Gheorghe_Manu' },
    { nume: 'Dimitrie Sturdza',            rol: 'Prim-ministru', ani: '1895–1909', wiki: 'Dimitrie_Sturdza',                  wikiRo: 'Dimitrie_Sturdza' },
    { nume: 'Petre S. Aurelian',           rol: 'Prim-ministru', ani: '1896–1897', wiki: 'Petre_S._Aurelian',               wikiRo: 'Petre_S._Aurelian' },
    { nume: 'Gheorghe Grigore Cantacuzino',rol: 'Prim-ministru', ani: '1899–1907', wiki: 'Gheorghe_Grigore_Cantacuzino',    wikiRo: 'Gheorghe_Grigore_Cantacuzino' },
    { nume: 'Petre P. Carp',               rol: 'Prim-ministru', ani: '1900–1912', wiki: 'Petre_P._Carp',                   wikiRo: 'Petre_P._Carp' },
    { nume: 'Ion I.C. Brătianu',           rol: 'Prim-ministru', ani: '1909–1927', wiki: 'Ion_I._C._Br%C4%83tianu',         wikiRo: 'Ion_I._C._Br%C4%83tianu' },
    { nume: 'Titu Maiorescu',              rol: 'Prim-ministru', ani: '1912–1914', wiki: 'Titu_Maiorescu',                   wikiRo: 'Titu_Maiorescu' },
    { nume: 'Alexandru Averescu',          rol: 'Prim-ministru', ani: '1918–1927', wiki: 'Alexandru_Averescu',               wikiRo: 'Alexandru_Averescu' },
    { nume: 'Alexandru Marghiloman',       rol: 'Prim-ministru', ani: '1918',       wiki: 'Alexandru_Marghiloman',           wikiRo: 'Alexandru_Marghiloman' },
    { nume: 'Constantin Coandă',           rol: 'Prim-ministru', ani: '1918',       wiki: 'Constantin_Coand%C4%83',          wikiRo: 'Constantin_Coand%C4%83' },
    // ── Interbelic (1919–1940) ────────────────────────────────────────────
    { nume: 'Arthur Văitoianu',            rol: 'Prim-ministru', ani: '1919',       wiki: 'Arthur_V%C4%83itoianu',           wikiRo: 'Arthur_V%C4%83itoianu' },
    { nume: 'Alexandru Vaida-Voevod',      rol: 'Prim-ministru', ani: '1919–1933', wiki: 'Alexandru_Vaida-Voevod' },
    { nume: 'Take Ionescu',                rol: 'Prim-ministru', ani: '1921–1922', wiki: 'Take_Ionescu',                      wikiRo: 'Take_Ionescu' },
    { nume: 'Barbu Știrbey',               rol: 'Prim-ministru', ani: '1927',       wiki: 'Barbu_%C8%98tirbey',              wikiRo: 'Barbu_%C8%98tirbey' },
    { nume: 'Vintilă Brătianu',            rol: 'Prim-ministru', ani: '1927–1928', wiki: 'Vintil%C4%83_Br%C4%83tianu',      wikiRo: 'Vintil%C4%83_Br%C4%83tianu' },
    { nume: 'Iuliu Maniu',                 rol: 'Prim-ministru', ani: '1928–1933', wiki: 'Iuliu_Maniu',                      wikiRo: 'Iuliu_Maniu' },
    { nume: 'Gheorghe Mironescu',          rol: 'Prim-ministru', ani: '1930–1931', wiki: 'Gheorghe_Mironescu',               wikiRo: 'Gheorghe_Mironescu' },
    { nume: 'Nicolae Iorga',               rol: 'Prim-ministru', ani: '1931–1932', wiki: 'Nicolae_Iorga',                    wikiRo: 'Nicolae_Iorga' },
    { nume: 'Ion G. Duca',                 rol: 'Prim-ministru', ani: '1933',       wiki: 'Ion_G._Duca',                     wikiRo: 'Ion_G._Duca' },
    { nume: 'Gheorghe Tătărescu',          rol: 'Prim-ministru', ani: '1934–1940', wiki: 'Gheorghe_T%C4%83t%C4%83rescu',    wikiRo: 'Gheorghe_T%C4%83t%C4%83rescu' },
    { nume: 'Octavian Goga',               rol: 'Prim-ministru', ani: '1937–1938', wiki: 'Octavian_Goga',                   wikiRo: 'Octavian_Goga' },
    { nume: 'Miron Cristea',               rol: 'Prim-ministru', ani: '1938–1939', wiki: 'Miron_Cristea',                   wikiRo: 'Miron_Cristea' },
    { nume: 'Armand Călinescu',            rol: 'Prim-ministru', ani: '1939',       wiki: 'Armand_C%C4%83linescu',           wikiRo: 'Armand_C%C4%83linescu' },
    { nume: 'Gheorghe Argeșanu',           rol: 'Prim-ministru', ani: '1939',       wiki: 'Gheorghe_Arge%C8%99anu',          wikiRo: 'Gheorghe_Arge%C8%99anu' },
    { nume: 'Constantin Argetoianu',       rol: 'Prim-ministru', ani: '1939',       wiki: 'Constantin_Argetoianu',           wikiRo: 'Constantin_Argetoianu' },
    { nume: 'Ion Gigurtu',                 rol: 'Prim-ministru', ani: '1940',       wiki: 'Ion_Gigurtu',                     wikiRo: 'Ion_Gigurtu' },
    { nume: 'Ion Antonescu',               rol: 'Prim-ministru', ani: '1940–1944', wiki: 'Ion_Antonescu',                   wikiRo: 'Ion_Antonescu' },
    // ── Tranziție și comunism (1944–1989) ────────────────────────────────
    { nume: 'Constantin Sănătescu',        rol: 'Prim-ministru', ani: '1944',       wiki: 'Constantin_S%C4%83n%C4%83tescu',  wikiRo: 'Constantin_S%C4%83n%C4%83tescu' },
    { nume: 'Nicolae Rădescu',             rol: 'Prim-ministru', ani: '1944–1945', wiki: 'Nicolae_R%C4%83descu',             wikiRo: 'Nicolae_R%C4%83descu' },
    { nume: 'Petru Groza',                 rol: 'Prim-ministru', ani: '1945–1952', wiki: 'Petru_Groza',                      wikiRo: 'Petru_Groza' },
    { nume: 'Gheorghe Gheorghiu-Dej',      rol: 'Prim-ministru', ani: '1952–1955', wiki: 'Gheorghe_Gheorghiu-Dej',            wikiRo: 'Gheorghe_Gheorghiu-Dej' },
    { nume: 'Chivu Stoica',                rol: 'Prim-ministru', ani: '1955–1961', wiki: 'Chivu_Stoica',                     wikiRo: 'Chivu_Stoica' },
    { nume: 'Ion Gheorghe Maurer',         rol: 'Prim-ministru', ani: '1961–1974', wiki: 'Ion_Gheorghe_Maurer',               wikiRo: 'Ion_Gheorghe_Maurer' },
    { nume: 'Manea Mănescu',               rol: 'Prim-ministru', ani: '1974–1979', wiki: 'Manea_M%C4%83nescu',              wikiRo: 'Manea_M%C4%83nescu' },
    { nume: 'Ilie Verdeț',                 rol: 'Prim-ministru', ani: '1979–1982', wiki: 'Ilie_Verde%C8%9B',                 wikiRo: 'Ilie_Verde%C8%9B' },
    { nume: 'Constantin Dăscălescu',       rol: 'Prim-ministru', ani: '1982–1989', wiki: 'Constantin_D%C4%83sc%C4%83lescu', wikiRo: 'Constantin_D%C4%83sc%C4%83lescu' },
    // ── Post-comunism (1989–prezent) ──────────────────────────────────────
    { nume: 'Petre Roman',                 rol: 'Prim-ministru', ani: '1989–1991', wiki: 'Petre_Roman',                       wikiRo: 'Petre_Roman' },
    { nume: 'Theodor Stolojan',            rol: 'Prim-ministru', ani: '1991–1992', wiki: 'Theodor_Stolojan',                   wikiRo: 'Theodor_Stolojan' },
    { nume: 'Nicolae Văcăroiu',            rol: 'Prim-ministru', ani: '1992–1996', wiki: 'Nicolae_V%C4%83c%C4%83roiu',         wikiRo: 'Nicolae_V%C4%83c%C4%83roiu' },
    { nume: 'Victor Ciorbea',              rol: 'Prim-ministru',          ani: '1996–1998', wiki: 'Victor_Ciorbea',                      wikiRo: 'Victor_Ciorbea' },
    { nume: 'Gavril Dejeu',                rol: 'Prim-ministru interimar', ani: '1998',       wiki: 'Gavril_Dejeu',                     wikiRo: 'Gavril_Dejeu' },
    { nume: 'Radu Vasile',                 rol: 'Prim-ministru',          ani: '1998–1999', wiki: 'Radu_Vasile',                        wikiRo: 'Radu_Vasile' },
    { nume: 'Alexandru Athanasiu',         rol: 'Prim-ministru interimar', ani: '1999',       wiki: 'Alexandru_Athanasiu',              wikiRo: 'Alexandru_Athanasiu' },
    { nume: 'Mugur Isărescu',              rol: 'Prim-ministru',          ani: '1999–2000', wiki: 'Mugur_Is%C4%83rescu',                wikiRo: 'Mugur_Is%C4%83rescu' },
    { nume: 'Adrian Năstase',              rol: 'Prim-ministru',          ani: '2000–2004', wiki: 'Adrian_N%C4%83stase',                wikiRo: 'Adrian_N%C4%83stase' },
    { nume: 'Eugen Bejinariu',             rol: 'Prim-ministru interimar', ani: '2004',       wiki: 'Eugen_Bejinariu',                  wikiRo: 'Eugen_Bejinariu' },
    { nume: 'Călin Popescu-Tăriceanu',     rol: 'Prim-ministru',          ani: '2004–2008', wiki: 'C%C4%83lin_Popescu-T%C4%83riceanu',  wikiRo: 'C%C4%83lin_Popescu-T%C4%83riceanu' },
    { nume: 'Emil Boc',                    rol: 'Prim-ministru',          ani: '2008–2012', wiki: 'Emil_Boc',                           wikiRo: 'Emil_Boc' },
    { nume: 'Cătălin Predoiu',             rol: 'Prim-ministru interimar', ani: '2012 / 2023 / 2025', wiki: 'C%C4%83t%C4%83lin_Predoiu', wikiRo: 'C%C4%83t%C4%83lin_Predoiu' },
    { nume: 'Mihai-Răzvan Ungureanu',      rol: 'Prim-ministru',          ani: '2012',       wiki: 'Mihai-R%C4%83zvan_Ungureanu',       wikiRo: 'Mihai-R%C4%83zvan_Ungureanu' },
    { nume: 'Victor Ponta',                rol: 'Prim-ministru',          ani: '2012–2015', wiki: 'Victor_Ponta',                       wikiRo: 'Victor_Ponta' },
    { nume: 'Gabriel Oprea',               rol: 'Prim-ministru interimar', ani: '2015',       wiki: 'Gabriel_Oprea',                    wikiRo: 'Gabriel_Oprea' },
    { nume: 'Sorin Cîmpeanu',              rol: 'Prim-ministru interimar', ani: '2015',       wiki: 'Sorin_C%C3%AEmpeanu',              wikiRo: 'Sorin_C%C3%AEmpeanu' },
    { nume: 'Dacian Cioloș',               rol: 'Prim-ministru',          ani: '2015–2017', wiki: 'Dacian_Cioloș',                      wikiRo: 'Dacian_Cioloș' },
    { nume: 'Sorin Grindeanu',             rol: 'Prim-ministru',          ani: '2017',       wiki: 'Sorin_Grindeanu',                   wikiRo: 'Sorin_Grindeanu' },
    { nume: 'Mihai Tudose',                rol: 'Prim-ministru',          ani: '2017–2018', wiki: 'Mihai_Tudose',                       wikiRo: 'Mihai_Tudose' },
    { nume: 'Mihai Fifor',                 rol: 'Prim-ministru interimar', ani: '2018',       wiki: 'Mihai_Fifor',                      wikiRo: 'Mihai_Fifor' },
    { nume: 'Viorica Dăncilă',             rol: 'Prim-ministru',          ani: '2018–2019', wiki: 'Viorica_D%C4%83ncil%C4%83',          wikiRo: 'Viorica_D%C4%83ncil%C4%83' },
    { nume: 'Ludovic Orban',               rol: 'Prim-ministru',          ani: '2019–2020', wiki: 'Ludovic_Orban',                      wikiRo: 'Ludovic_Orban' },
    { nume: 'Florin Cîțu',                 rol: 'Prim-ministru',          ani: '2020–2021', wiki: 'Florin_C%C3%AE%C8%9Bu',              wikiRo: 'Florin_C%C3%AE%C8%9Bu' },
    { nume: 'Nicolae Ciucă',               rol: 'Prim-ministru',          ani: '2021–2023', wiki: 'Nicolae_Ciuc%C4%83',                 wikiRo: 'Nicolae_Ciuc%C4%83' },
    { nume: 'Marcel Ciolacu',              rol: 'Prim-ministru',          ani: '2023–2025', wiki: 'Marcel_Ciolacu',                     wikiRo: 'Marcel_Ciolacu' },
    { nume: 'Ilie Bolojan',                rol: 'Prim-ministru',          ani: '2025–',      wiki: 'Ilie_Bolojan',                     wikiRo: 'Ilie_Bolojan' },
];

// Auto-numerotare: prim-miniştrii primesc nr. oficial (1–N), miniştrii notabili nu
let _nrPM = 0;
MINISTRI_RO.forEach(m => { if (m.rol === 'Prim-ministru') m.nr = ++_nrPM; });
const TOTAL_PM = _nrPM; // 72 în prezent

// Direct Wikimedia Commons URLs — no API call needed, works from file://
const MINISTRI_IMG_MAP = {
    'Barbu Catargiu':              'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Barbu_Catargiu2.jpg/330px-Barbu_Catargiu2.jpg',
    'Apostol Arsache':             'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Apostol_Arsache1.jpg/330px-Apostol_Arsache1.jpg',
    'Nicolae Kretzulescu':         'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/D._William_-_Nicolas_Kretzulesco_-_Ancien_President_du_Conseil_des_Ministres.jpg/330px-D._William_-_Nicolas_Kretzulesco_-_Ancien_President_du_Conseil_des_Ministres.jpg',
    'Mihail Kogălniceanu':         'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Mihail_Kogalniceanu_utexas.jpg/330px-Mihail_Kogalniceanu_utexas.jpg',
    'Constantin Bosianu':          'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Constantin_Bosianu.jpg/330px-Constantin_Bosianu.jpg',
    'Ion Ghica':                   'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Ion_Ghica.jpg/330px-Ion_Ghica.jpg',
    'Lascăr Catargiu':             'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Lascarcatargiu.jpg/330px-Lascarcatargiu.jpg',
    'Constantin Al. Kretzulescu':  'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Constantin_Al._Cre%C5%A3ulescu.jpg/330px-Constantin_Al._Cre%C5%A3ulescu.jpg',
    'Ștefan Golescu':              'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Stefan_Golescu_-_foto.jpg/330px-Stefan_Golescu_-_foto.jpg',
    'Nicolae Golescu':             'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Nicolae_Constantin_Golescu.jpg/330px-Nicolae_Constantin_Golescu.jpg',
    'Dimitrie Ghica':              'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Dimitrie_Ghica_%281%29.jpg/330px-Dimitrie_Ghica_%281%29.jpg',
    'Alexandru G. Golescu':        'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Alexandru_G._Golescu1.jpg/330px-Alexandru_G._Golescu1.jpg',
    'Manolache Costache Epureanu': 'https://upload.wikimedia.org/wikipedia/commons/6/67/Manolache_Costache_Epureanu.jpg',
    'Ioan Emanoil Florescu':       'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Emanoil_Ion_Florescu_01.jpg/330px-Emanoil_Ion_Florescu_01.jpg',
    'Ion C. Brătianu':             'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/07-ap240-foto1.jpg/330px-07-ap240-foto1.jpg',
    'Dumitru Brătianu':            'https://upload.wikimedia.org/wikipedia/commons/a/af/Dimitrie_Br%C4%83tianu.png',
    'Theodor Rosetti':             'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Teodor_Rosetti.jpg/330px-Teodor_Rosetti.jpg',
    'Gheorghe Manu':               'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Gheorghe_Manu.jpg/330px-Gheorghe_Manu.jpg',
    'Dimitrie Sturdza':            'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Sturdza.jpg/330px-Sturdza.jpg',
    'Petre S. Aurelian':           'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Petre_S._Aurelian.jpg/330px-Petre_S._Aurelian.jpg',
    'Gheorghe Grigore Cantacuzino':'https://upload.wikimedia.org/wikipedia/commons/7/71/Cantacuzino.jpg',
    'Petre P. Carp':               'https://upload.wikimedia.org/wikipedia/commons/1/16/Carp_%28The_Road_to_Romanian_Independence%29.JPG',
    'Ion I.C. Brătianu':           'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/IonelBratianu3b40761r.jpg/330px-IonelBratianu3b40761r.jpg',
    'Titu Maiorescu':              'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/A._Quinet_-_Titus_Ma%C3%AForesco%2C_Ministre_des_Cultes_et_de_l%27Instruction_publique%2C_1882.jpg/330px-A._Quinet_-_Titus_Ma%C3%AForesco%2C_Ministre_des_Cultes_et_de_l%27Instruction_publique%2C_1882.jpg',
    'Alexandru Averescu':          'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Le_g%C3%A9n%C3%A9ral_Averescu%2C_commandant_du_1er_corps_d%27arm%C3%A9e_roumain_%28cleanup%29.jpg/330px-Le_g%C3%A9n%C3%A9ral_Averescu%2C_commandant_du_1er_corps_d%27arm%C3%A9e_roumain_%28cleanup%29.jpg',
    'Alexandru Marghiloman':       'https://upload.wikimedia.org/wikipedia/commons/6/6e/Alexandru_Marghiloman_2021_stamp_of_Romania.jpg',
    'Constantin Coandă':           'https://upload.wikimedia.org/wikipedia/commons/4/44/Constantin_Coanda.jpg',
    'Alexandru Vaida-Voevod':      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/AlVaidaVoievod.jpg/330px-AlVaidaVoievod.jpg',
    'Take Ionescu':                'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Take_Ionescu_1913.jpg/330px-Take_Ionescu_1913.jpg',
    'Barbu Știrbey':               'https://upload.wikimedia.org/wikipedia/commons/7/7d/Barbu_Stirbey.jpg',
    'Vintilă Brătianu':            'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/VintilaBratianuPrimarulCapitalei-1907-1910.jpg/330px-VintilaBratianuPrimarulCapitalei-1907-1910.jpg',
    'Iuliu Maniu':                 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Bundesarchiv_Bild_183-2000-0518-507%2C_Julius_Maniu.jpg/330px-Bundesarchiv_Bild_183-2000-0518-507%2C_Julius_Maniu.jpg',
    'Gheorghe Mironescu':          'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Gheorghe_Mironescu.jpg/330px-Gheorghe_Mironescu.jpg',
    'Nicolae Iorga':               'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Nicolae_Iorga_portret.png/330px-Nicolae_Iorga_portret.png',
    'Ion G. Duca':                 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Ion_Gheorghe_Duca_-_Foto02.jpg/330px-Ion_Gheorghe_Duca_-_Foto02.jpg',
    'Gheorghe Tătărescu':          'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Gheorghe_Tatarescu.JPG/330px-Gheorghe_Tatarescu.JPG',
    'Octavian Goga':               'https://upload.wikimedia.org/wikipedia/commons/e/ed/Octavian_Goga.jpg',
    'Armand Călinescu':            'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Armand_Calinescu.jpg/330px-Armand_Calinescu.jpg',
    'Gheorghe Argeșanu':           'https://upload.wikimedia.org/wikipedia/commons/8/8e/Argeseanu_Gheorghe2.jpg',
    'Constantin Argetoianu':       'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Constantin_Argetoianu_1933.jpg/330px-Constantin_Argetoianu_1933.jpg',
    'Ion Gigurtu':                 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Ion_Gigurtu.jpg',
    'Ion Antonescu':               'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ion_Antonescu_1941.jpg/330px-Ion_Antonescu_1941.jpg',
    'Constantin Sănătescu':        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/ConstantinSanatescu.jpg/330px-ConstantinSanatescu.jpg',
    'Nicolae Rădescu':             'https://upload.wikimedia.org/wikipedia/commons/8/81/Nicolae_Radescu.jpg',
    'Petru Groza':                 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Petru_Groza_Anefo.jpg/330px-Petru_Groza_Anefo.jpg',
    'Gheorghe Gheorghiu-Dej':      'https://upload.wikimedia.org/wikipedia/commons/4/4d/Gheorghe_Gheorghiu-Dej1.jpg',
    'Chivu Stoica':                'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Chivu_Stoica_1957.jpg/330px-Chivu_Stoica_1957.jpg',
    'Ion Gheorghe Maurer':         'https://upload.wikimedia.org/wikipedia/commons/5/59/Ion_Gheorghe_Maurer1.jpg',
    'Manea Mănescu':               'https://upload.wikimedia.org/wikipedia/commons/3/30/Manea_Manescu.jpg',
    'Ilie Verdeț':                 'https://upload.wikimedia.org/wikipedia/commons/8/86/Ilie_Verdet.jpg',
    'Constantin Dăscălescu':       'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Constantin_D%C4%83sc%C4%83lescu_1983b.jpg/330px-Constantin_D%C4%83sc%C4%83lescu_1983b.jpg',
    'Petre Roman':                 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Petre_Roman_EP_%283x4_cropped%29.jpg/330px-Petre_Roman_EP_%283x4_cropped%29.jpg',
    'Theodor Stolojan':            'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Member_of_the_European_Parliament_for_Romania_Theodor_Dumitru_Stolojan.jpg/330px-Member_of_the_European_Parliament_for_Romania_Theodor_Dumitru_Stolojan.jpg',
    'Nicolae Văcăroiu':            'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Nicolae_V%C4%83c%C4%83roiu_%28cropped%29.jpg/330px-Nicolae_V%C4%83c%C4%83roiu_%28cropped%29.jpg',
    'Victor Ciorbea':              'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Victor_Ciorbea_%281%29.JPG/330px-Victor_Ciorbea_%281%29.JPG',
    'Gavril Dejeu':                'https://upload.wikimedia.org/wikipedia/commons/8/81/Gavril_Dejeu.PNG',
    'Radu Vasile':                 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Radu_Vasile%282%29.tif/lossless-page1-330px-Radu_Vasile%282%29.tif.png',
    'Mugur Isărescu':              'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Mugur_Is%C4%83rescu_17_February_2025_%28cropped%29.jpg/330px-Mugur_Is%C4%83rescu_17_February_2025_%28cropped%29.jpg',
    'Adrian Năstase':              'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Adrian_N%C4%83stase3.jpg/330px-Adrian_N%C4%83stase3.jpg',
    'Eugen Bejinariu':             'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/5._Reuniunea_BPN_al_PSD_-_17.03.2014_%2813216493103%29_%28cropped%29.jpg/330px-5._Reuniunea_BPN_al_PSD_-_17.03.2014_%2813216493103%29_%28cropped%29.jpg',
    'Călin Popescu-Tăriceanu':     'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/C%C4%83lin_Popescu-T%C4%83riceanu.jpg/330px-C%C4%83lin_Popescu-T%C4%83riceanu.jpg',
    'Emil Boc':                    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/EPP_Congress_Bucharest_-_Day_1_IMG_8897_%2853570362732%29%28cropped%29.jpg/330px-EPP_Congress_Bucharest_-_Day_1_IMG_8897_%2853570362732%29%28cropped%29.jpg',
    'Cătălin Predoiu':             'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/2026_C%C4%83t%C4%83lin_Predoiu_%28cropped%29.jpg/330px-2026_C%C4%83t%C4%83lin_Predoiu_%28cropped%29.jpg',
    'Mihai-Răzvan Ungureanu':      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Mihai_R%C4%83zvan_Ungureanu_%28nov_2013%29_%28cropped%29.JPG/330px-Mihai_R%C4%83zvan_Ungureanu_%28nov_2013%29_%28cropped%29.JPG',
    'Victor Ponta':                'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Victor_Ponta_April_2025_%28cropped%29.jpg/330px-Victor_Ponta_April_2025_%28cropped%29.jpg',
    'Gabriel Oprea':               'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gabriel_Oprea_2011-10-20.jpg/330px-Gabriel_Oprea_2011-10-20.jpg',
    'Sorin Cîmpeanu':              'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/SorinC%C3%AEmpeanu2015_%28cropped%29.jpg/330px-SorinC%C3%AEmpeanu2015_%28cropped%29.jpg',
    'Dacian Cioloș':               'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Dacian_Julien_Ciolo%C8%99.jpg/330px-Dacian_Julien_Ciolo%C8%99.jpg',
    'Sorin Grindeanu':             'https://upload.wikimedia.org/wikipedia/commons/3/3b/Sorin_Grindeanu_2025.png',
    'Mihai Tudose':                'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Mihai_Tudose_MEP_%282024%29.jpg/330px-Mihai_Tudose_MEP_%282024%29.jpg',
    'Mihai Fifor':                 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Mihai_Fifor_2017_%28cropped%29.jpg/330px-Mihai_Fifor_2017_%28cropped%29.jpg',
    'Viorica Dăncilă':             'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Viorica_D%C4%83ncil%C4%83_June_2019.jpg/330px-Viorica_D%C4%83ncil%C4%83_June_2019.jpg',
    'Ludovic Orban':               'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Ludovic-Orban_%28cropped%29.jpg/330px-Ludovic-Orban_%28cropped%29.jpg',
    'Florin Cîțu':                 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Romanian_Prime_Minister_Vasile-Florin_C%C3%AE%C8%9Bu_%2811-05-2021%29_%28cropped%29.jpg/330px-Romanian_Prime_Minister_Vasile-Florin_C%C3%AE%C8%9Bu_%2811-05-2021%29_%28cropped%29.jpg',
    'Nicolae Ciucă':               'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Nicolae-Ciuc%C4%83_%28cropped%29.jpg/330px-Nicolae-Ciuc%C4%83_%28cropped%29.jpg',
    'Marcel Ciolacu':              'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Marcel_Ciolacu_%2823_May_2023%29_%28cropped%29.jpg/330px-Marcel_Ciolacu_%2823_May_2023%29_%28cropped%29.jpg',
    'Ilie Bolojan':                'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Ilie_Bolojan_%2816_April_2026%29_%28cropped%29.jpg/330px-Ilie_Bolojan_%2816_April_2026%29_%28cropped%29.jpg',
    'Monica Macovei':              'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Member_of_the_European_Parliament_Monica_Luisa_Macovei.jpg/330px-Member_of_the_European_Parliament_Monica_Luisa_Macovei.jpg',
    'Mircea Geoană':               'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Mircea_Geoan%C4%83_-_Feb_2024.jpg/330px-Mircea_Geoan%C4%83_-_Feb_2024.jpg',
    'Arthur Văitoianu':            'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/1916_-_Generalul_Arthur_Vaitoianu_-_Comandantul_Diviziei_10_Infanterie.png/330px-1916_-_Generalul_Arthur_Vaitoianu_-_Comandantul_Diviziei_10_Infanterie.png',
    'Miron Cristea':               'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Patriarhul_Romaniei_-_Miron_Cristea.jpg/330px-Patriarhul_Romaniei_-_Miron_Cristea.jpg',
};
const ministriImgCache = {};
let ministriIntrebari  = [];
let ministriIndex      = 0;
let ministriScor       = 0;
let ministriAsteapta   = false;
let ministriMod        = '10'; // '10' | 'toti' | 'scris' | 'succesor' | 'lista'

// PMs numerotați oficial, în ordine, pentru modul Succesorul
const POOL_PM_NUMEROTATI = MINISTRI_RO.filter(m => m.nr);

function wikiUrl(titlu) {
    return titlu.replace(/[^\x00-\x7F%]/g, c => encodeURIComponent(c));
}

// JSONP thumbnail fetch — bypasses CORS entirely, works from file://
function wikiThumb(lang, titlu, onSrc, onFail) {
    const cb = '_wt' + Date.now() + Math.random().toString(36).slice(2, 7);
    const script = document.createElement('script');
    const timer = setTimeout(() => { cleanup(); onFail(); }, 8000);
    function cleanup() { clearTimeout(timer); delete window[cb]; script.remove(); }
    window[cb] = function(d) {
        cleanup();
        const pages = d.query && d.query.pages;
        const pg    = pages && Object.values(pages)[0];
        const src   = pg && !pg.missing && pg.thumbnail && pg.thumbnail.source;
        if (src) onSrc(src); else onFail();
    };
    script.onerror = function() { cleanup(); onFail(); };
    script.src = 'https://' + lang + '.wikipedia.org/w/api.php?action=query&titles='
        + wikiUrl(titlu) + '&prop=pageimages&pithumbsize=320&format=json&callback=' + cb;
    document.head.appendChild(script);
}

// ── HS per mod ────────────────────────────────────────────────────────────────

function afiseazaHSMinistri() {
    ['10', 'toti', 'toti-ordine', 'scris', 'succesor'].forEach(mod => {
        const el = document.getElementById('hs-ministri-' + mod + '-card');
        if (!el) return;
        const raw = lsGet('hs_ministri_' + mod);
        if (!raw) { el.textContent = ''; return; }
        try {
            const d = JSON.parse(raw);
            if (d == null || d.scor == null || d.timp == null) { el.textContent = ''; return; }
            const total = (mod === 'toti' || mod === 'toti-ordine') ? (d.total || '?') : 10;
            el.textContent = '🏆 ' + d.scor + '/' + total + ' · ' + formatTime(d.timp);
        } catch(e) { el.textContent = ''; }
    });
}

// ── Start / navigare ─────────────────────────────────────────────────────────

function startMinistri(mod) {
    ministriMod      = mod || '10';
    ministriIndex    = 0;
    ministriScor     = 0;
    ministriAsteapta = false;

    document.getElementById('ministri-intro').classList.add('ascuns');
    document.getElementById('ministri-final').classList.add('ascuns');

    if (ministriMod === 'lista') {
        const listaEl = document.getElementById('ministri-lista');
        listaEl.classList.remove('ascuns');
        animaEcran('ministri-lista');
        afiseazaListaMinistri();
        return;
    }

    // Construiește pool-ul de întrebări
    if (ministriMod === '10') {
        ministriIntrebari = [...MINISTRI_RO].sort(() => Math.random() - 0.5).slice(0, 10);
    } else if (ministriMod === 'toti') {
        ministriIntrebari = [...MINISTRI_RO].sort(() => Math.random() - 0.5);
    } else if (ministriMod === 'toti-ordine') {
        ministriIntrebari = [...MINISTRI_RO]; // ordinea cronologică din array
    } else if (ministriMod === 'scris') {
        ministriIntrebari = [...MINISTRI_RO].sort(() => Math.random() - 0.5).slice(0, 10);
    } else if (ministriMod === 'succesor') {
        const cuSuccesor = POOL_PM_NUMEROTATI.slice(0, POOL_PM_NUMEROTATI.length - 1);
        ministriIntrebari = [...cuSuccesor].sort(() => Math.random() - 0.5).slice(0, 10);
    }

    // Show/hide input scris vs butoane
    const scrisWrap = document.getElementById('ministri-scris-wrap');
    const optiuniEl = document.getElementById('ministri-optiuni');
    if (ministriMod === 'scris') {
        scrisWrap.classList.remove('ascuns');
        optiuniEl.classList.add('ascuns');
    } else {
        scrisWrap.classList.add('ascuns');
        optiuniEl.classList.remove('ascuns');
    }

    const jocEl = document.getElementById('ministri-joc');
    jocEl.classList.remove('ascuns');
    animaEcran('ministri-joc');
    startTimer('ministri_' + ministriMod);
    afiseazaIntrebareMinistri();
}

function restartMinistri() { startMinistri(ministriMod); }

function inapoiDinMinistri() {
    if (ministriMod !== 'lista') {
        if (!confirm('Ieși din joc? Progresul curent se va pierde.')) return;
        stopTimer();
        ministriAsteapta = false;
        document.getElementById('ministri-joc').classList.add('ascuns');
        document.getElementById('ministri-final').classList.add('ascuns');
    } else {
        document.getElementById('ministri-lista').classList.add('ascuns');
    }
    document.getElementById('ministri-intro').classList.remove('ascuns');
    animaEcran('ministri-intro');
    afiseazaHSMinistri();
}

// ── Listă completă ────────────────────────────────────────────────────────────

function afiseazaListaMinistri() {
    const cont = document.getElementById('ministri-lista-content');
    cont.innerHTML = '';
    MINISTRI_RO.forEach(pm => {
        const div = document.createElement('div');
        div.className = pm.nr ? 'ml-rand' : 'ml-rand ml-interimar';

        const nrSpan = document.createElement('span');
        nrSpan.className = 'ml-nr';
        nrSpan.textContent = pm.nr ? pm.nr + '.' : 'int.';

        const wrap = document.createElement('div');
        wrap.className = 'ml-img-wrap';

        const ph = document.createElement('span');
        ph.className = 'ml-placeholder';
        ph.textContent = '🧑';

        wrap.appendChild(ph);

        const imgUrl = MINISTRI_IMG_MAP[pm.nume];
        if (imgUrl) {
            const img = document.createElement('img');
            img.className = 'ml-img';
            img.referrerPolicy = 'no-referrer';
            img.src = imgUrl;
            img.onload  = () => { ph.style.display = 'none'; };
            img.onerror = () => { img.style.display = 'none'; };
            wrap.appendChild(img);
        }

        const info = document.createElement('div');
        info.className = 'ml-info';
        info.innerHTML = '<div class="ml-nume">' + pm.nume + '</div>' +
                         '<div class="ml-sub">'  + pm.rol  + ' · ' + pm.ani + '</div>';

        div.appendChild(nrSpan);
        div.appendChild(wrap);
        div.appendChild(info);
        cont.appendChild(div);
    });
}

// ── Afișare întrebare ─────────────────────────────────────────────────────────

function rolText(p) {
    return (p.nr ? 'Nr. ' + p.nr + ' din ' + TOTAL_PM + ' · ' : '') + p.rol + ' · ' + p.ani;
}

function incarcaFotoMinistri(p) {
    const img         = document.getElementById('ministri-img');
    const placeholder = document.getElementById('ministri-img-placeholder');
    img.style.display = '';
    placeholder.classList.remove('vizibil');
    img.src = '';

    const aratFallback = () => { img.src = ''; img.style.display = 'none'; placeholder.classList.add('vizibil'); };
    const incarcaUrl = url => { img.onerror = () => aratFallback(); img.src = url; };

    // Hardcoded URL — instant, no network call
    if (MINISTRI_IMG_MAP[p.nume]) { incarcaUrl(MINISTRI_IMG_MAP[p.nume]); return; }

    // Fallback: JSONP
    const key = p.wiki;
    if (ministriImgCache[key]) { incarcaUrl(ministriImgCache[key]); return; }
    const proceseaza = orig => { ministriImgCache[key] = orig; incarcaUrl(orig); };
    const fallRo = p.wikiRo
        ? () => wikiThumb('ro', p.wikiRo, proceseaza, aratFallback)
        : aratFallback;
    wikiThumb('en', p.wiki, proceseaza, fallRo);
}

function getSuccesorPM(pm) {
    const idx = POOL_PM_NUMEROTATI.indexOf(pm);
    return POOL_PM_NUMEROTATI[idx + 1] || null;
}

function animaIntrebare(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.classList.remove('question-anim');
    void el.offsetWidth;
    el.classList.add('question-anim');
}

function afiseazaIntrebareMinistri() {
    const p     = ministriIntrebari[ministriIndex];
    const total = ministriIntrebari.length;

    animaIntrebare('trivia-portret-wrap');
    animaIntrebare('ministri-optiuni');
    animaIntrebare('ministri-scris-wrap');

    document.getElementById('ministri-progres-bar').style.width = (ministriIndex / total * 100) + '%';
    document.getElementById('ministri-nr').textContent = 'Întrebarea ' + (ministriIndex + 1) + ' / ' + total;
    document.getElementById('ministri-feedback').textContent = '';

    // ── Modul Succesorul: fără foto, arată numele PM și întreabă cine urmează ──
    if (ministriMod === 'succesor') {
        document.getElementById('ministri-img').style.display = 'none';
        document.getElementById('ministri-img-placeholder').classList.remove('vizibil');
        document.getElementById('ministri-rol').textContent = rolText(p);
        document.getElementById('ministri-intrebare').textContent = 'Cine i-a urmat lui ' + p.nume + '?';

        const corect = getSuccesorPM(p);
        const gresite = POOL_PM_NUMEROTATI
            .filter(m => m !== p && m !== corect)
            .sort(() => Math.random() - 0.5).slice(0, 3);
        const optiuni = [corect, ...gresite].sort(() => Math.random() - 0.5);

        const cont = document.getElementById('ministri-optiuni');
        cont.innerHTML = '';
        optiuni.forEach(opt => {
            const btn = document.createElement('button');
            btn.className   = 'btn-optiune';
            btn.textContent = opt.nume;
            btn.onclick     = () => raspunsMinistri(btn, opt.nume, corect);
            cont.appendChild(btn);
        });
        return;
    }

    // ── Moduri cu fotografie ──────────────────────────────────────────────────
    document.getElementById('ministri-img').referrerPolicy = 'no-referrer';
    document.getElementById('ministri-rol').textContent    = rolText(p);
    incarcaFotoMinistri(p);

    if (ministriMod === 'scris') {
        document.getElementById('ministri-intrebare').textContent = 'Scrie numele de familie:';
        const input = document.getElementById('ministri-scris-input');
        input.value = '';
        setTimeout(() => input.focus(), 100);
        return;
    }

    // Moduri '10' și 'toti': 4 butoane
    document.getElementById('ministri-intrebare').textContent = 'Cine este?';
    const gresitePool = MINISTRI_RO.filter(m => m.nume !== p.nume);
    const gresite = gresitePool.sort(() => Math.random() - 0.5).slice(0, 3);
    const optiuni  = [p, ...gresite].sort(() => Math.random() - 0.5);

    const cont = document.getElementById('ministri-optiuni');
    cont.innerHTML = '';
    optiuni.forEach(opt => {
        const btn = document.createElement('button');
        btn.className   = 'btn-optiune';
        btn.textContent = opt.nume;
        btn.onclick     = () => raspunsMinistri(btn, opt.nume, p);
        cont.appendChild(btn);
    });
}

// ── Răspuns butoane ───────────────────────────────────────────────────────────

function raspunsMinistri(btn, numeAles, persoana) {
    if (ministriAsteapta) return;
    ministriAsteapta = true;

    const corect = numeAles === persoana.nume;
    if (corect) ministriScor++;

    document.querySelectorAll('#ministri-optiuni .btn-optiune').forEach(b => {
        b.disabled = true;
        if (b.textContent === persoana.nume) b.classList.add('corect');
        else if (b === btn && !corect)       b.classList.add('gresit');
    });

    document.getElementById('ministri-feedback').textContent = corect ? '✅ Corect!' : '❌ Era ' + persoana.nume;

    setTimeout(() => {
        ministriIndex++;
        ministriAsteapta = false;
        if (ministriIndex >= ministriIntrebari.length) sfarsitMinistri();
        else afiseazaIntrebareMinistri();
    }, 1600);
}

// ── Răspuns scris ─────────────────────────────────────────────────────────────

function normalizeazaScrisM(s) {
    return s.toLowerCase()
        .replace(/ș|ş/g, 's').replace(/ț|ţ/g, 't')
        .replace(/ă/g, 'a').replace(/â/g, 'a').replace(/î/g, 'i')
        .normalize('NFD').replace(/[̀-ͯ]/g, '')
        .replace(/[^a-z0-9\-]/g, '').trim();
}

function verificaScrisMinistri() {
    if (ministriAsteapta) return;
    const input = document.getElementById('ministri-scris-input');
    const raspuns = input.value.trim();
    if (!raspuns) return;

    const p = ministriIntrebari[ministriIndex];
    // Acceptă ultimul cuvânt (numele de familie) sau orice parte după prenume
    const cuvinte = p.nume.split(' ');
    const ultimul  = cuvinte[cuvinte.length - 1];
    const dupa1    = cuvinte.slice(1).join(' '); // tot ce urmează după prenume

    const rN = normalizeazaScrisM(raspuns);
    const corect = rN === normalizeazaScrisM(ultimul) || rN === normalizeazaScrisM(dupa1);

    ministriAsteapta = true;
    if (corect) ministriScor++;

    const fb = document.getElementById('ministri-feedback');
    fb.textContent = corect ? '✅ Corect!' : '❌ Era ' + ultimul;

    setTimeout(() => {
        ministriIndex++;
        ministriAsteapta = false;
        if (ministriIndex >= ministriIntrebari.length) sfarsitMinistri();
        else afiseazaIntrebareMinistri();
    }, 1600);
}

// ── Sfârșit joc ───────────────────────────────────────────────────────────────

function animaContorScor(elId, scor, total) {
    const el = document.getElementById(elId);
    if (!el) return;
    let curent = 0;
    el.textContent = '0 / ' + total + ' corecte';
    const pas = Math.max(1, Math.ceil(scor / 20));
    const interval = setInterval(() => {
        curent = Math.min(curent + pas, scor);
        el.textContent = curent + ' / ' + total + ' corecte';
        if (curent >= scor) clearInterval(interval);
    }, 40);
}

function sfarsitMinistri() {
    stopTimer();
    document.getElementById('ministri-joc').classList.add('ascuns');
    const mFinalEl = document.getElementById('ministri-final');
    mFinalEl.classList.remove('ascuns');
    mFinalEl.classList.remove('final-anim-in');
    void mFinalEl.offsetWidth;
    mFinalEl.classList.add('final-anim-in');
    const mScorEl = document.getElementById('ministri-final-scor');
    mScorEl.classList.remove('scor-anim-in');
    void mScorEl.offsetWidth;
    mScorEl.classList.add('scor-anim-in');
    document.getElementById('ministri-progres-bar').style.width = '100%';

    const total = ministriIntrebari.length;
    const pct   = ministriScor / total;
    const emoji = pct === 1 ? '🏆' : pct >= 0.7 ? '🎉' : pct >= 0.4 ? '👍' : '💪';
    document.getElementById('ministri-final-emoji').textContent = emoji;
    animaContorScor('ministri-final-scor', ministriScor, total);
    document.getElementById('ministri-final-timp').textContent  = '⏱ Timp: ' + formatTime(timerSecunde);

    const key    = 'hs_ministri_' + ministriMod;
    const raw    = lsGet(key);
    const vechi  = raw ? JSON.parse(raw) : null;
    const record = !vechi || ministriScor > vechi.scor ||
                   (ministriScor === vechi.scor && timerSecunde < vechi.timp);
    if (record) {
        lsSet(key, JSON.stringify({ scor: ministriScor, timp: timerSecunde, total }));
        document.getElementById('ministri-final-record').textContent = '🌟 Record personal nou!';
    } else {
        document.getElementById('ministri-final-record').textContent =
            '🏆 Record: ' + vechi.scor + '/' + (vechi.total || total) + ' în ' + formatTime(vechi.timp);
    }
    // Actualizează și hs_ministri pentru landing (folosim modul '10' ca referință)
    if (ministriMod === '10') {
        lsSet('hs_ministri', JSON.stringify({ scor: ministriScor, timp: timerSecunde }));
    }

    if (pct >= 0.7) pornesteCelebration();
    afiseazaHSMinistri();
    actualizeazaLandingHS();
}

// ══════════════════════════════════════════════════════════════════════════════
// ── Modul Duel Online ────────────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════

const FIREBASE_CONFIG = {
    apiKey:            'AIzaSyDkXIXhMuxfR6BlihZyUEmCOafkiJiOqVo',
    authDomain:        'joc-romania.firebaseapp.com',
    databaseURL:       'https://joc-romania-default-rtdb.europe-west1.firebasedatabase.app',
    projectId:         'joc-romania',
    storageBucket:     'joc-romania.firebasestorage.app',
    messagingSenderId: '337352230211',
    appId:             '1:337352230211:web:44b325225f335359aa1bf6'
};

let _fbApp = null;
let _fbDb  = null;

function fbDb() {
    if (!_fbDb) {
        _fbApp = firebase.initializeApp(FIREBASE_CONFIG);
        _fbDb  = firebase.database(_fbApp);
    }
    return _fbDb;
}

// ── Lista plată de orașe (construită lazy din JUDETE) ─────────────────────────
let _duelOrase = null;
function getDuelOrase() {
    if (_duelOrase) return _duelOrase;
    _duelOrase = [];
    Object.entries(JUDETE).forEach(([, cfg]) => {
        cfg.features.forEach(f => {
            _duelOrase.push({ oras: f.properties.name, judet: cfg.titlu });
        });
    });
    return _duelOrase;
}

// ── Stare duel ────────────────────────────────────────────────────────────────
let duelTip      = 'ministri'; // 'ministri' | 'trivia' | 'geografie' | 'mixt'
let duelSlot     = null;       // 'p1' | 'p2'
let duelCod      = null;
let duelIntrebari = [];        // array de { _tip, _obj } după decodare
let duelIndex    = 0;
let duelScor     = 0;
let duelAsteapta = false;
let duelRoomListener = null;

// ── Helpers UI ────────────────────────────────────────────────────────────────

function duelResetSetup() {
    ['duel-setup','duel-asteptare','duel-countdown','duel-joc','duel-final']
        .forEach(id => document.getElementById(id).classList.add('ascuns'));
    document.getElementById('duel-setup').classList.remove('ascuns');
    document.getElementById('duel-eroare').textContent = '';
    document.getElementById('duel-cod-input').value = '';
}

function inapoiDinDuel() {
    duelCurataListener();
    if (duelCod) {
        fbDb().ref('rooms/' + duelCod).remove().catch(() => {});
        duelCod = null;
    }
    ascundeToate();
    document.getElementById('landing').classList.remove('ascuns');
    animaEcran('landing');
}

function duelParaseste() {
    duelCurataListener();
    if (duelCod) {
        fbDb().ref('rooms/' + duelCod).remove().catch(() => {});
        duelCod = null;
    }
    duelResetSetup();
}

function duelCurataListener() {
    if (duelRoomListener && duelCod) {
        fbDb().ref('rooms/' + duelCod).off('value', duelRoomListener);
        duelRoomListener = null;
    }
}

// ── Selectare tip ─────────────────────────────────────────────────────────────

function selecteazaTipDuel(tip, btn) {
    duelTip = tip;
    document.querySelectorAll('.duel-tip-btn').forEach(b => b.classList.remove('activ'));
    btn.classList.add('activ');
}

// ── Generare întrebări (indici prefixați: 'm5', 't12', 'g8') ─────────────────

function duelGenIntrebari() {
    const orase = getDuelOrase();
    if (duelTip === 'ministri') {
        return shuffle([...MINISTRI_RO.keys()]).slice(0, 10).map(i => 'm' + i);
    }
    if (duelTip === 'trivia') {
        return shuffle([...TRIVIA_PERSOANE.keys()]).slice(0, 10).map(i => 't' + i);
    }
    if (duelTip === 'geografie') {
        return shuffle([...orase.keys()]).slice(0, 10).map(i => 'g' + i);
    }
    // mixt: 4 ministri + 3 personalitati + 3 geografie
    const ms = shuffle([...MINISTRI_RO.keys()]).slice(0, 4).map(i => 'm' + i);
    const ts = shuffle([...TRIVIA_PERSOANE.keys()]).slice(0, 3).map(i => 't' + i);
    const gs = shuffle([...orase.keys()]).slice(0, 3).map(i => 'g' + i);
    return shuffle([...ms, ...ts, ...gs]);
}

function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function duelDecodeIntrebari(indices) {
    const orase = getDuelOrase();
    return indices.map(s => {
        s = String(s);
        const n = parseInt(s.slice(1));
        if (s[0] === 'm') return { _tip: 'ministri',  _obj: MINISTRI_RO[n] };
        if (s[0] === 't') return { _tip: 'trivia',    _obj: TRIVIA_PERSOANE[n] };
        if (s[0] === 'g') return { _tip: 'geografie', _obj: orase[n] };
        return null;
    }).filter(Boolean);
}

// ── Creează cameră ────────────────────────────────────────────────────────────

async function duelCreeazaCamera() {
    document.getElementById('duel-eroare').textContent = '';
    const cod = Math.floor(1000 + Math.random() * 9000).toString();
    duelCod  = cod;
    duelSlot = 'p1';

    const intrebari = duelGenIntrebari();
    try {
        await fbDb().ref('rooms/' + cod).set({
            status:    'waiting',
            tip:       duelTip,
            intrebari: intrebari,
            p1: { name: currentPlayer || 'Jucător 1', scor: 0, index: 0, done: false },
            p2: null,
            creat: Date.now()
        });

        // auto-cleanup după 10 minute
        setTimeout(() => fbDb().ref('rooms/' + cod).remove().catch(() => {}), 600000);

        document.getElementById('duel-setup').classList.add('ascuns');
        document.getElementById('duel-asteptare').classList.remove('ascuns');
        document.getElementById('duel-cod-afisat').textContent = cod;

        duelRoomListener = fbDb().ref('rooms/' + cod).on('value', snap => {
            const d = snap.val();
            if (!d) return;
            if (d.status === 'playing' && d.p2) {
                duelCurataListener();
                duelIntrebari = duelDecodeIntrebari(d.intrebari);
                duelPornesteCuCountdown(d);
            }
        });
    } catch(e) {
        document.getElementById('duel-eroare').textContent = 'Eroare la creare cameră. Verifică conexiunea.';
    }
}

// ── Intră în cameră ───────────────────────────────────────────────────────────

async function duelIntraInCamera() {
    document.getElementById('duel-eroare').textContent = '';
    const cod = document.getElementById('duel-cod-input').value.trim();
    if (cod.length !== 4) {
        document.getElementById('duel-eroare').textContent = 'Introdu un cod valid de 4 cifre.';
        return;
    }

    try {
        const snap = await fbDb().ref('rooms/' + cod).once('value');
        const d = snap.val();
        if (!d) {
            document.getElementById('duel-eroare').textContent = 'Camera nu există. Verifică codul.';
            return;
        }
        if (d.status !== 'waiting' || d.p2) {
            document.getElementById('duel-eroare').textContent = 'Camera este plină sau jocul a început.';
            return;
        }

        duelCod  = cod;
        duelSlot = 'p2';
        duelTip  = d.tip;

        await fbDb().ref('rooms/' + cod + '/p2').set({
            name: currentPlayer || 'Jucător 2', scor: 0, index: 0, done: false
        });
        await fbDb().ref('rooms/' + cod + '/status').set('playing');

        const snap2 = await fbDb().ref('rooms/' + cod).once('value');
        const d2 = snap2.val();
        duelIntrebari = duelDecodeIntrebari(d2.intrebari);
        duelPornesteCuCountdown(d2);
    } catch(e) {
        document.getElementById('duel-eroare').textContent = 'Eroare de conexiune. Încearcă din nou.';
    }
}

// ── Countdown 3-2-1 ───────────────────────────────────────────────────────────

function duelPornesteCuCountdown(roomData) {
    document.getElementById('duel-setup').classList.add('ascuns');
    document.getElementById('duel-asteptare').classList.add('ascuns');
    document.getElementById('duel-countdown').classList.remove('ascuns');

    const el = document.getElementById('duel-countdown-nr');
    let n = 3;
    el.textContent = n;
    const iv = setInterval(() => {
        n--;
        if (n > 0) {
            el.textContent = n;
        } else {
            clearInterval(iv);
            el.textContent = '🚀';
            setTimeout(() => {
                document.getElementById('duel-countdown').classList.add('ascuns');
                duelStartJoc(roomData);
            }, 600);
        }
    }, 900);
}

// ── Start joc ─────────────────────────────────────────────────────────────────

function duelStartJoc(roomData) {
    duelIndex    = 0;
    duelScor     = 0;
    duelAsteapta = false;

    document.getElementById('duel-joc').classList.remove('ascuns');

    document.getElementById('duel-name1').textContent = roomData.p1.name;
    document.getElementById('duel-name2').textContent = roomData.p2 ? roomData.p2.name : '?';

    const myEl = duelSlot === 'p1'
        ? document.getElementById('duel-ps1')
        : document.getElementById('duel-ps2');
    myEl.classList.add('duel-mine');

    duelRoomListener = fbDb().ref('rooms/' + duelCod).on('value', snap => {
        const d = snap.val();
        if (!d) return;
        if (d.p1) {
            document.getElementById('duel-scor1').textContent = d.p1.scor;
            document.getElementById('duel-q1').textContent    = d.p1.index + '/10';
        }
        if (d.p2) {
            document.getElementById('duel-scor2').textContent = d.p2.scor;
            document.getElementById('duel-q2').textContent    = d.p2.index + '/10';
        }
        if (d.p1 && d.p1.done && d.p2 && d.p2.done) {
            duelCurataListener();
            duelAfiseazaFinal(d);
        }
    });

    duelAfiseazaIntrebare();
}

// ── Afișare întrebare ─────────────────────────────────────────────────────────

function duelAfiseazaIntrebare() {
    if (duelIndex >= duelIntrebari.length) {
        fbDb().ref('rooms/' + duelCod + '/' + duelSlot).update({ done: true, scor: duelScor });
        document.getElementById('duel-feedback').textContent  = '⏳ Așteptând adversarul...';
        document.getElementById('duel-optiuni').innerHTML     = '';
        document.getElementById('duel-intrebare').textContent = '';
        return;
    }

    const { _tip, _obj } = duelIntrebari[duelIndex];
    const total = duelIntrebari.length;

    document.getElementById('duel-progres-bar').style.width = (duelIndex / total * 100) + '%';
    document.getElementById('duel-nr').textContent = 'Întrebarea ' + (duelIndex + 1) + ' / ' + total;
    document.getElementById('duel-feedback').textContent = '';
    duelAsteapta = false;

    if (_tip === 'ministri') {
        duelIncarcaFoto(_obj);
        document.getElementById('duel-portret-wrap').style.display = '';
        document.getElementById('duel-portret-nume').textContent = '?';
        document.getElementById('duel-portret-sub').textContent  = '';
        document.getElementById('duel-intrebare').textContent    = 'Cine este această persoană?';

        const optiuni = shuffle([_obj, ...shuffle(MINISTRI_RO.filter(x => x !== _obj)).slice(0, 3)]);
        const cont = document.getElementById('duel-optiuni');
        cont.innerHTML = '';
        optiuni.forEach(opt => {
            const btn = document.createElement('button');
            btn.className   = 'btn-optiune';
            btn.textContent = opt.nume;
            btn.onclick = () => duelRaspunde(btn, opt === _obj, _obj, _tip);
            cont.appendChild(btn);
        });

    } else if (_tip === 'trivia') {
        duelIncarcaFoto(_obj);
        document.getElementById('duel-portret-wrap').style.display = '';
        document.getElementById('duel-portret-nume').textContent = _obj.nume;
        document.getElementById('duel-portret-sub').textContent  = _obj.info;
        document.getElementById('duel-intrebare').textContent    = 'În ce județ s-a născut?';

        const gresite = shuffle(TOATE_JUDETELE.filter(j => j !== _obj.judet)).slice(0, 3);
        const optiuni = shuffle([_obj.judet, ...gresite]);
        const cont = document.getElementById('duel-optiuni');
        cont.innerHTML = '';
        optiuni.forEach(judet => {
            const btn = document.createElement('button');
            btn.className   = 'btn-optiune';
            btn.textContent = judet;
            btn.onclick = () => duelRaspunde(btn, judet === _obj.judet, _obj, _tip);
            cont.appendChild(btn);
        });

    } else { // geografie
        document.getElementById('duel-portret-wrap').style.display = 'none';
        document.getElementById('duel-intrebare').textContent = 'În ce județ se află ' + _obj.oras + '?';

        const gresite = shuffle(TOATE_JUDETELE.filter(j => j !== _obj.judet)).slice(0, 3);
        const optiuni = shuffle([_obj.judet, ...gresite]);
        const cont = document.getElementById('duel-optiuni');
        cont.innerHTML = '';
        optiuni.forEach(judet => {
            const btn = document.createElement('button');
            btn.className   = 'btn-optiune';
            btn.textContent = judet;
            btn.onclick = () => duelRaspunde(btn, judet === _obj.judet, _obj, _tip);
            cont.appendChild(btn);
        });
    }
}

// ── Răspuns ───────────────────────────────────────────────────────────────────

function duelRaspunde(btn, corect, _obj, _tip) {
    if (duelAsteapta) return;
    duelAsteapta = true;

    document.querySelectorAll('#duel-optiuni .btn-optiune').forEach(b => b.disabled = true);

    const raspunsCorect = _tip === 'ministri' ? _obj.nume : _obj.judet;

    if (corect) {
        duelScor++;
        btn.classList.add('corect');
        document.getElementById('duel-feedback').textContent = '✅ Corect!';
    } else {
        btn.classList.add('gresit');
        document.querySelectorAll('#duel-optiuni .btn-optiune').forEach(b => {
            if (b.textContent === raspunsCorect) b.classList.add('corect');
        });
        document.getElementById('duel-feedback').textContent = '❌ ' + raspunsCorect;
    }

    duelIndex++;
    fbDb().ref('rooms/' + duelCod + '/' + duelSlot).update({ scor: duelScor, index: duelIndex });

    if (_tip === 'ministri') {
        document.getElementById('duel-portret-nume').textContent = _obj.nume;
        document.getElementById('duel-portret-sub').textContent  =
            (_obj.nr ? 'Nr.' + _obj.nr + ' · ' : '') + _obj.rol + ' · ' + _obj.ani;
    }

    setTimeout(() => duelAfiseazaIntrebare(), 1400);
}

// ── Foto ──────────────────────────────────────────────────────────────────────

function duelIncarcaFoto(p) {
    const img = document.getElementById('duel-img');
    const ph  = document.getElementById('duel-img-ph');
    img.style.display = 'none';
    ph.style.display  = 'flex';
    img.src = '';

    const aratFallback = () => { img.style.display = 'none'; ph.style.display = 'flex'; };
    const incarca = orig => {
        const url = /\/\d+px-/.test(orig) ? orig.replace(/\/\d+px-/, '/320px-') : orig;
        img.onload  = () => { img.style.display = 'block'; ph.style.display = 'none'; };
        img.onerror = () => {
            if (orig !== url) { img.onerror = () => aratFallback(); img.src = orig; }
            else aratFallback();
        };
        img.src = url;
    };

    const roFn = p.wikiRo
        ? () => wikiThumb('ro', p.wikiRo, incarca, aratFallback)
        : aratFallback;
    wikiThumb('en', p.wiki, incarca, roFn);
}

// ── Final ─────────────────────────────────────────────────────────────────────

function duelAfiseazaFinal(d) {
    if (!document.getElementById('duel-final').classList.contains('ascuns')) return;

    document.getElementById('duel-joc').classList.add('ascuns');
    const finalEl = document.getElementById('duel-final');
    finalEl.classList.remove('ascuns');
    finalEl.classList.remove('final-anim-in');
    void finalEl.offsetWidth;
    finalEl.classList.add('final-anim-in');

    const s1 = d.p1.scor, s2 = d.p2.scor;
    const n1 = d.p1.name, n2 = d.p2.name;
    const eJucatorP1 = duelSlot === 'p1';

    let titlu, emoji;
    if (s1 > s2) {
        emoji = eJucatorP1 ? '🏆' : '😔';
        titlu = eJucatorP1 ? 'Ai câștigat!' : n1 + ' a câștigat';
    } else if (s2 > s1) {
        emoji = !eJucatorP1 ? '🏆' : '😔';
        titlu = !eJucatorP1 ? 'Ai câștigat!' : n2 + ' a câștigat';
    } else {
        emoji = '🤝';
        titlu = 'Egalitate!';
    }

    document.getElementById('duel-final-emoji').textContent = emoji;
    document.getElementById('duel-final-titlu').textContent = titlu;
    document.getElementById('duel-final-scoruri').innerHTML =
        '<div class="duel-final-row' + (eJucatorP1 ? ' mine' : '') + '"><span>' + n1 + '</span><strong>' + s1 + '/10</strong></div>' +
        '<div class="duel-final-row' + (!eJucatorP1 ? ' mine' : '') + '"><span>' + n2 + '</span><strong>' + s2 + '/10</strong></div>';

    setTimeout(() => fbDb().ref('rooms/' + duelCod).remove().catch(() => {}), 5000);
}

function duelDinNou() {
    duelCurataListener();
    duelCod = null;
    duelResetSetup();
}

// ── End duel module ───────────────────────────────────────────────────────────

// ── Achievements ───────────────────────────────────────────────────────────

const ACHIEVEMENTS = [
    // ── Originale ──────────────────────────────────────────────────────
    { id: 'prima_victorie',  emoji: '🥇', titlu: 'Prima victorie',       desc: 'Termini orice județ' },
    { id: 'perfectiune',     emoji: '💯', titlu: 'Perfecțiune',          desc: 'Termini un județ cu 100% acuratețe' },
    { id: 'ochitor',         emoji: '🎯', titlu: 'Ochitor de elită',     desc: 'Termini un județ fără nicio greșeală și fără hint' },
    { id: 'pe_foc',          emoji: '🔥', titlu: 'Pe foc',               desc: 'Streak de 5 răspunsuri corecte' },
    { id: 'fulger',          emoji: '⚡', titlu: 'Fulger',               desc: 'Termini un județ în sub 60 de secunde' },
    { id: 'explorer',        emoji: '🗺️', titlu: 'Explorer',             desc: 'Termini 10 județe diferite' },
    { id: 'maestru',         emoji: '👑', titlu: 'Maestru',              desc: 'Termini toate județele (orice dificultate)' },
    { id: 'trivia_pro',      emoji: '🧠', titlu: 'Trivia Pro',           desc: 'Scor perfect la Trivia (10/10)' },
    { id: 'nervi_otel',      emoji: '☠️', titlu: 'Nervi de oțel',       desc: 'Termini un județ în modul Fără greșeli' },
    // ── Explorare & progres ────────────────────────────────────────
    { id: 'absolvent',       emoji: '🎓', titlu: 'Absolvent',            desc: 'Termini Modul Învățare România' },
    { id: 'student_harnic',  emoji: '📚', titlu: 'Student harnic',       desc: 'Termini Modul Învățare Maramureș' },
    { id: 'maramuresean',    emoji: '🏔️', titlu: 'Maramureșean',        desc: 'Câștigă Modul Joc Maramureș' },
    { id: 'racheta',         emoji: '🚀', titlu: 'Rachetă',              desc: 'Termini un județ în sub 30 de secunde' },
    { id: 'metodic',         emoji: '🐢', titlu: 'Metodic',              desc: 'Termini un județ în peste 3 minute' },
    { id: 'perfectionist',   emoji: '🌟', titlu: 'Perfecționist',        desc: '100% la 5 județe diferite' },
    { id: 'marele_maestru',  emoji: '🏅', titlu: 'Marele maestru',       desc: '100% la toate județele' },
    { id: 'nocturn',         emoji: '🌙', titlu: 'Nocturn',              desc: 'Joci după ora 22:00' },
    { id: 'cantec_de_cocos', emoji: '☀️', titlu: 'Cântec de cocoș',     desc: 'Joci înainte de ora 7:00' },
    { id: 'inflamat',        emoji: '🌡️', titlu: 'Inflamat',             desc: 'Streak de 10 corecte consecutive' },
    { id: 'explorator_reg',  emoji: '🧭', titlu: 'Explorator regional',  desc: 'Cel puțin un județ din fiecare regiune' },
    { id: 'aventurier',      emoji: '🎭', titlu: 'Aventurier',           desc: 'Joci toate cele 3 niveluri de dificultate' },
    { id: 'perseverent',     emoji: '🔄', titlu: 'Perseverent',          desc: 'Replay la același județ de 3 ori' },
    { id: 'dependent',       emoji: '🎮', titlu: 'Dependent',            desc: 'Joci 10 partide total' },
    { id: 'trivia_fanatic',  emoji: '🏆', titlu: 'Trivia fanatic',       desc: 'Câștigă Trivia de 3 ori (scor ≥ 7/10)' },
    { id: 'inginer',         emoji: '💡', titlu: 'Inginer',              desc: '3+ hint-uri într-o singură partidă' },
    { id: 'globetrotter',    emoji: '🌍', titlu: 'Globetrotter',         desc: 'Termini 20 de județe diferite' },
    { id: 'samurai',         emoji: '⚔️', titlu: 'Samurai',             desc: 'Ochitor pe 3 județe diferite' },
    { id: 'hibernare',       emoji: '❄️', titlu: 'Hibernare',            desc: 'Joci în decembrie, ianuarie sau februarie' },
    { id: 'trivia_blitz',    emoji: '🎪', titlu: 'Trivia Blitz',         desc: '10/10 la Trivia în sub 90 de secunde' },
    // ── 💀 Greu ────────────────────────────────────────────────────
    { id: 'greu_perfect',    emoji: '💀', titlu: 'Perfect pe Greu',      desc: 'Termini un județ pe Greu fără nicio greșeală' },
    { id: 'timp_ramas',      emoji: '⏳', titlu: 'Maestru al timpului',  desc: 'Termini un județ pe Greu în sub 45 de secunde' },
    { id: 'fulger_otel',     emoji: '🌪️', titlu: 'Fulger de oțel',      desc: 'Termini un județ pe Greu în sub 30 secunde' },
    { id: 'campion_fier',    emoji: '🔩', titlu: 'Campion de fier',      desc: 'Termini toate județele pe Greu' },
    { id: 'greu_x5',         emoji: '💀', titlu: '5× Perfect pe Greu',   desc: '100% pe Greu la 5 județe diferite' },
    // ── ☠️ Fără greșeli ────────────────────────────────────────────
    { id: 'intangibil',      emoji: '👻', titlu: 'Intangibil',           desc: 'Câștigă Fără greșeli la 5 județe' },
    { id: 'zeul_hartilor',   emoji: '🕊️', titlu: 'Zeul hărților',       desc: 'Câștigă Fără greșeli la toate județele' },
    { id: 'suceava_nm',      emoji: '😱', titlu: 'Suceava Nightmare',    desc: 'Câștigă Fără greșeli la Suceava (16 orașe)' },
    // ── Cross-difficulty ───────────────────────────────────────────
    { id: 'triple_crown',    emoji: '🎖️', titlu: 'Triple Crown',         desc: 'Termini același județ pe toate 3 dificultățile' },
    { id: 'grand_master',    emoji: '🏛️', titlu: 'Grand Master',         desc: '5 județe terminate pe toate 3 dificultățile' },
    { id: 'cuceritorul',     emoji: '🗡️', titlu: 'Cuceritorul',          desc: 'Toate județele pe toate 3 dificultățile' },
    // ── Streak extreme ─────────────────────────────────────────────
    { id: 'vulcan',          emoji: '🌋', titlu: 'Vulcan',               desc: 'Streak de 15 corecte consecutive' },
    { id: 'eruptie',         emoji: '💥', titlu: 'Erupție',              desc: 'Streak de 25 corecte consecutive' },
    // ── Speed extreme ──────────────────────────────────────────────
    { id: 'sub20',           emoji: '🏎️', titlu: 'Sub 20 secunde',       desc: 'Termini un județ în sub 20 secunde' },
    // ── Ochitor extreme ────────────────────────────────────────────
    { id: 'ochitor_suprem',  emoji: '🎖️', titlu: 'Ochitor suprem',       desc: 'Ochitor pe 10 județe diferite' },
    { id: 'ochitor_legend',  emoji: '🏹', titlu: 'Ochitor legendar',     desc: 'Ochitor pe 20 județe diferite' },
    // ── Calendar ──────────────────────────────────────────────────
    { id: 'revelion',        emoji: '🎉', titlu: 'Revelion',             desc: 'Joci pe 31 decembrie sau 1 ianuarie' },
    { id: 'ziua_nationala',  emoji: '🇷🇴', titlu: 'Ziua națională',      desc: 'Joci pe 1 decembrie' },
    { id: 'bufnita',         emoji: '🦉', titlu: 'Bufniță',              desc: 'Joci după miezul nopții (00:00–01:00)' },
    // ── Maratonist ────────────────────────────────────────────────
    { id: 'maraton',         emoji: '🏃', titlu: 'Maraton',              desc: '30 de partide jucate' },
    { id: 'hardcore',        emoji: '💪', titlu: 'Hardcore',             desc: '50 de partide jucate' },
    // ── Trivia extreme ─────────────────────────────────────────────
    { id: 'enciclopedie',    emoji: '📖', titlu: 'Enciclopedie',         desc: 'Joci 10 sesiuni de Trivia' },
    { id: 'geniu_trivia',    emoji: '🧬', titlu: 'Geniu',                desc: '10/10 la Trivia de 3 ori' },
    // ── All-rounder & meta ─────────────────────────────────────────
    { id: 'all_rounder',     emoji: '🌐', titlu: 'All-Rounder',          desc: 'Câștigă România, Maramureș, un județ și Trivia' },
    { id: 'colectar15',      emoji: '💎', titlu: 'Colecționar',          desc: 'Deblochezi 15 realizări' },
    { id: 'colectar30',      emoji: '💠', titlu: 'Colecționar serios',   desc: 'Deblochezi 30 de realizări' },
    { id: 'legenda_vie',     emoji: '🌠', titlu: 'Legendă vie',          desc: 'Deblochezi toate realizările' },
    // ── Elite extreme ──────────────────────────────────────────────
    { id: 'greu_maestru',   emoji: '🔱', titlu: 'Maestru Greu',          desc: '100% la TOATE județele pe Greu' },
    { id: 'sub20_greu',     emoji: '🌩️', titlu: 'Fulger pe Greu',        desc: 'Termini un județ pe Greu în sub 20 secunde' },
    { id: 'fara_fulger',    emoji: '💨', titlu: 'Vânt de moarte',         desc: 'Câștigă Fără greșeli în sub 30 secunde' },
    { id: 'fara_x10',       emoji: '💀', titlu: '10× Fără greșeli',       desc: 'Câștigă Fără greșeli la 10 județe' },
    { id: 'greu_fara_combo',emoji: '👁️', titlu: 'Dublă perfecțiune',      desc: 'Câștigă același județ 100% pe Greu și pe Fără greșeli' },
    { id: 'centurion',      emoji: '🪖', titlu: 'Centurion',              desc: '100 de partide jucate' },
    { id: 'trivia_obsesie', emoji: '🔮', titlu: 'Obsesie Trivia',         desc: '25 de sesiuni de Trivia jucate' },
    { id: 'geniu_absolut',  emoji: '🌌', titlu: 'Geniu absolut',          desc: '10/10 la Trivia de 5 ori' },
    // ── Ochitor pe Greu ────────────────────────────────────────────
    { id: 'greu_ochitor',   emoji: '🗡️', titlu: 'Greu fără urmă',         desc: 'Termini un județ pe Greu fără greșeli și fără hint' },
    { id: 'greu_ochitor_5', emoji: '⚔️', titlu: 'Gladiator',              desc: 'Greu fără greșeli și fără hint la 5 județe' },
    // ── Usor 100% complet ──────────────────────────────────────────
    { id: 'all_perfect_usor', emoji: '🌈', titlu: 'Carte de geografie',   desc: '100% la TOATE județele pe Ușor' },
    // ── Fără hint ──────────────────────────────────────────────────
    { id: 'no_hint_10',     emoji: '🙈', titlu: 'Nu am nevoie de ajutor', desc: 'Termini 10 județe fără să folosești niciun hint' },
    // ── Trivia ultra-rapid ─────────────────────────────────────────
    { id: 'trivia_fulger',  emoji: '⏩', titlu: 'Trivia Fulger',          desc: '10/10 la Trivia în sub 60 de secunde' },
    // ── Calendar: zile diferite ────────────────────────────────────
    { id: 'zile_5',         emoji: '📅', titlu: 'Obicei sănătos',         desc: 'Joci în 5 zile calendaristice diferite' },
    { id: 'zile_15',        emoji: '🗓️', titlu: 'Rutinier',               desc: 'Joci în 15 zile calendaristice diferite' },
    // ── Sesiune intensă ────────────────────────────────────────────
    { id: 'sesiune_5',      emoji: '🎯', titlu: 'Sesiune intensă',         desc: 'Termini 5 județe într-o singură sesiune' },
    { id: 'sesiune_10',     emoji: '🏆', titlu: 'Maraton de o zi',         desc: 'Termini 10 județe într-o singură sesiune' },
    // ── Collector upgrade ──────────────────────────────────────────
    { id: 'colectar45',     emoji: '💜', titlu: 'Colecționar avansat',     desc: 'Deblochezi 45 de realizări' },
    // ── Imposibil ─────────────────────────────────────────────────────
    { id: 'sub10',           emoji: '🌪️', titlu: 'Teleportare',            desc: 'Termini un județ în sub 10 secunde' },
    { id: 'fara_sub15',      emoji: '👁️‍🗨️', titlu: 'Reflexe de robot',    desc: 'Câștigă Fără greșeli în sub 15 secunde' },
    { id: 'suceava_greu',    emoji: '😈', titlu: 'Suceava Master',          desc: '100% pe Greu la Suceava (16 orașe, fără greșeli)' },
    { id: 'ochitor_total',   emoji: '🔭', titlu: 'Ochi de vultur',          desc: 'Ochitor (0 greșeli, 0 hint-uri) pe TOATE județele' },
    { id: 'greu_ochitor_tot',emoji: '💎', titlu: 'Diamant',                 desc: 'Ochitor pe TOATE județele pe Greu — aproape imposibil' },
    { id: 'streak_50',       emoji: '☄️', titlu: 'Cometă',                  desc: 'Streak de 50 răspunsuri corecte consecutive' },
    { id: 'partide_200',     emoji: '🏛️', titlu: 'Veteran',                 desc: '200 de partide jucate' },
    { id: 'trivia_10x',      emoji: '🔬', titlu: 'Omul de știință',         desc: '10/10 la Trivia de 10 ori' },
    { id: 'sesiune_perfect3',emoji: '🏅', titlu: 'Hat-trick',               desc: '3 județe consecutive cu 0 greșeli în aceeași sesiune' },
    { id: 'fara_greu_ses',   emoji: '⚗️', titlu: 'Alchimist',               desc: 'Câștigă același județ pe Greu 100% și Fără greșeli în aceeași sesiune' },
    // ── Mod Scris — județe ─────────────────────────────────────────
    { id: 'scris_prima',     emoji: '🖊️', titlu: 'Primul cuvânt',           desc: 'Joci prima sesiune Mod Scris' },
    { id: 'scris_jumatate',  emoji: '📊', titlu: 'Pe jumătate',             desc: 'Găsești 50%+ din orașele unui județ în Mod Scris' },
    { id: 'scris_expert',    emoji: '🧠', titlu: 'Expert',                  desc: 'Găsești 90%+ din orașele unui județ în Mod Scris' },
    { id: 'scris_perfect',   emoji: '✏️', titlu: 'Caligraf',                desc: 'Găsești 100% — toate orașele unui județ în Mod Scris' },
    { id: 'scris_fara',      emoji: '🏅', titlu: 'Fără ajutor',             desc: 'Termini 100% în Mod Scris fără să apeși Renunță' },
    { id: 'scris_rapid',     emoji: '⚡', titlu: 'Scriere rapidă',          desc: 'Găsești toate orașele unui județ în sub 60 secunde' },
    { id: 'scris_sub30',     emoji: '🚀', titlu: 'Viteză de tastare',       desc: 'Găsești toate orașele unui județ în sub 30 secunde' },
    { id: 'scris_3x',        emoji: '🎯', titlu: 'Triplu scris',            desc: 'Faci 100% în Mod Scris de 3 ori' },
    { id: 'scris_10x',       emoji: '💫', titlu: 'Scrib',                   desc: 'Faci 100% în Mod Scris de 10 ori' },
    { id: 'scris_5judete',   emoji: '📝', titlu: 'Pradă de vânătoare',      desc: 'Joci Mod Scris în 5 județe diferite' },
    { id: 'scris_15judete',  emoji: '📖', titlu: 'Geograf',                 desc: 'Joci Mod Scris în 15 județe diferite' },
    { id: 'scris_toate',     emoji: '🗺️', titlu: 'Atlasul viu',             desc: 'Joci Mod Scris în toate județele (orice %)' },
    { id: 'scris_toate_100', emoji: '👑', titlu: 'Dicționar geografic',     desc: '100% în Mod Scris la TOATE județele' },
    { id: 'scris_suceava',   emoji: '😤', titlu: 'Suceava din memorie',     desc: 'Găsești toate cele 16 orașe din Suceava în Mod Scris' },
    { id: 'scris_hunedoara', emoji: '⛏️', titlu: 'Hunedoara din memorie',   desc: 'Găsești toate cele 14 orașe din Hunedoara în Mod Scris' },
    { id: 'scris_10ses',     emoji: '🖋️', titlu: 'Caiet de exerciții',      desc: '10 sesiuni Mod Scris județe' },
    { id: 'scris_30ses',     emoji: '📚', titlu: 'Bibliofolie',             desc: '30 sesiuni Mod Scris județe' },
    // ── Mod Scris — Maramureș ──────────────────────────────────────
    { id: 'mm_scris_prima',  emoji: '🏔️', titlu: 'Maramureș din creier',   desc: 'Prima sesiune Mod Scris Maramureș' },
    { id: 'mm_scris_50',     emoji: '🧩', titlu: 'Jumătate de Maramureș',   desc: 'Găsești 50%+ din comune în Mod Scris MM' },
    { id: 'mm_scris_80',     emoji: '🌿', titlu: 'Cunoscător de Maramureș', desc: 'Găsești 80%+ din comune în Mod Scris MM' },
    { id: 'mm_scris_perfect',emoji: '💎', titlu: 'Maramureșean adevărat',   desc: '100% — toate comunele Maramureșului din memorie' },
    { id: 'mm_scris_rapid',  emoji: '🌪️', titlu: 'Furtuna Maramureșului',  desc: 'Toate comunele MM în sub 5 minute' },
    { id: 'mm_scris_3x',     emoji: '🔮', titlu: 'Obsedat de Maramureș',   desc: '80%+ în Mod Scris MM de 3 ori' },
    // ── Cross scris ────────────────────────────────────────────────
    { id: 'scris_mm_combo',  emoji: '🌐', titlu: 'Dublu campion scris',     desc: '100% Mod Scris MM + 100% Mod Scris într-un județ' },
    { id: 'scris_legenda',   emoji: '⚜️', titlu: 'Legendă geografică',      desc: '100% Mod Scris în toate județele + 100% Mod Scris MM' },

    // ── Noi: timp extreme ──────────────────────────────────────────────
    { id: 'sub5_usor',       emoji: '⚡', titlu: 'Curent electric',          desc: 'Termini un județ pe Ușor în sub 5 secunde' },
    { id: 'sub15_greu',      emoji: '👻', titlu: 'Fantomă',                  desc: 'Termini un județ pe Greu în sub 15 secunde' },
    { id: 'fara_sub10',      emoji: '🤖', titlu: 'Robot',                    desc: 'Câștigă Fără greșeli în sub 10 secunde' },

    // ── Noi: volum ─────────────────────────────────────────────────────
    { id: 'partide_500',     emoji: '🏺', titlu: 'Erou național',            desc: '500 de partide jucate' },
    { id: 'zile_30',         emoji: '📆', titlu: 'Luna de foc',              desc: 'Joci în 30 de zile calendaristice diferite' },
    { id: 'no_hint_30',      emoji: '🙅', titlu: 'Mândrie absolută',         desc: 'Termini 30 de județe fără niciun hint' },
    { id: 'replay_5',        emoji: '🔄', titlu: 'Obsesie locală',           desc: 'Replay la același județ de 5 ori' },
    { id: 'trivia_50',       emoji: '🎓', titlu: 'Profesor',                 desc: '50 de sesiuni de Trivia jucate' },
    { id: 'trivia_100',      emoji: '🏫', titlu: 'Doctor honoris',           desc: '100 de sesiuni de Trivia jucate' },
    { id: 'sesiune_15',      emoji: '🔥', titlu: 'Forță brută',              desc: 'Termini 15 județe într-o singură sesiune' },
    { id: 'colectar60',      emoji: '🏆', titlu: 'Colecționar extrem',       desc: 'Deblochezi 60 de realizări' },

    // ── Noi: dificultate ───────────────────────────────────────────────
    { id: 'greu_perfect10',  emoji: '💀', titlu: 'Zece cranii',              desc: '100% pe Greu la 10 județe diferite' },
    { id: 'greu_ochitor_10', emoji: '⚔️', titlu: 'Gladiator suprem',        desc: 'Ochitor (0 greșeli, 0 hint-uri) pe 10 județe pe Greu' },

    // ── Noi: Mod Scris volum ───────────────────────────────────────────
    { id: 'scris_50ses',     emoji: '📜', titlu: 'Scriitor veteran',         desc: '50 de sesiuni Mod Scris județe' },
    { id: 'scris_rapid3',    emoji: '⌨️', titlu: 'Mâini de pianist',        desc: '100% Mod Scris sub 2 minute de 3 ori' },
    { id: 'scris_sub30_3x',  emoji: '🚀', titlu: 'Viteză sonoră',           desc: '100% Mod Scris sub 30 de secunde de 3 ori' },
    { id: 'scris_sesiune3',  emoji: '📝', titlu: 'Sesiune de examen',        desc: '100% la 3 județe în Mod Scris în aceeași sesiune' },
    { id: 'scris_sesiune5',  emoji: '📚', titlu: 'Sesiune supremă',          desc: '100% la 5 județe în Mod Scris în aceeași sesiune' },

    // ── Noi: Mod Scris MM ──────────────────────────────────────────────
    { id: 'mm_scris_10',     emoji: '🏔️', titlu: 'Maramureș în sânge',     desc: '10 sesiuni Mod Scris Maramureș' },
    { id: 'mm_scris_perfect3',emoji: '💎', titlu: 'Trio maramureșean',       desc: '100% Mod Scris MM de 3 ori' },

    // ── Noi: cross-mode ────────────────────────────────────────────────
    { id: 'all_modes_county',emoji: '🌟', titlu: 'Județ cucerit total',      desc: '100% pe Ușor, Greu, Fără greșeli și Scris în același județ' },
    { id: 'greu_fara_scris', emoji: '☠️', titlu: 'Trinitate imposibilă',    desc: '100% pe Greu, Fără greșeli și Scris în același județ' },
    { id: 'toate_reg_scris', emoji: '🧭', titlu: 'Explorator scris',         desc: 'Joci Mod Scris în cel puțin un județ din fiecare regiune' },
    { id: 'weekend_geo',     emoji: '🛋️', titlu: 'Weekend geograf',          desc: 'Joci sâmbătă sau duminică' },
];

// ── Stat tracking ──────────────────────────────────────────────────────────

function citestStat(cheie) {
    return parseInt(lsGet('stat_' + cheie) || '0');
}
function incrementStat(cheie) {
    const v = citestStat(cheie) + 1;
    lsSet('stat_' + cheie, v);
    return v;
}
function marcheazaZiJucata() {
    const azi = new Date().toISOString().slice(0, 10);
    const zile = new Set(JSON.parse(lsGet('stat_zile_jucate') || '[]'));
    zile.add(azi);
    lsSet('stat_zile_jucate', JSON.stringify([...zile]));
    return zile.size;
}

function marcheazaDif(dif) {
    const set = new Set(JSON.parse(lsGet('stat_dif_folosite') || '[]'));
    set.add(dif);
    lsSet('stat_dif_folosite', JSON.stringify([...set]));
    return set;
}

// ── Toast sistem (stacked, bottom-right) ──────────────────────────────────

function arataTost(ach, delay) {
    setTimeout(() => {
        const container = document.getElementById('ach-toast-container');
        const item = document.createElement('div');
        item.className = 'ach-toast-item';
        item.innerHTML = `<div class="ach-toast-emoji">${ach.emoji}</div>
            <div><div class="ach-toast-titlu">🏅 Realizare deblocată!</div>
            <div class="ach-toast-desc">${ach.titlu}</div></div>`;
        container.appendChild(item);
        actualizeazaAchBadge();
        setTimeout(() => {
            item.classList.add('toast-out');
            setTimeout(() => item.remove(), 380);
        }, 3800);
    }, delay || 0);
}

// ── Achievements: verificare ───────────────────────────────────────────────

function citestAchievements() {
    try { return JSON.parse(lsGet('achievements') || '[]'); } catch(e) { return []; }
}

function salveazaAchievement(id) {
    const lista = citestAchievements();
    if (lista.includes(id)) return false;
    lista.push(id);
    lsSet('achievements', JSON.stringify(lista));
    return true;
}

function verificaAchievements(ctx) {
    let delay = 600;
    const deblocheaza = (id) => {
        if (salveazaAchievement(id)) {
            const ach = ACHIEVEMENTS.find(a => a.id === id);
            if (ach) { arataTost(ach, delay); delay += 800; }
        }
    };

    const now  = new Date();
    const ora  = now.getHours();
    const luna = now.getMonth();
    const zi   = now.getDate();

    const eRevelion    = (luna === 11 && zi === 31) || (luna === 0 && zi === 1);
    const eZiNationala = luna === 11 && zi === 1;
    const eBufnita     = ora === 0;

    if (ctx.tip === 'orase') {
        deblocheaza('prima_victorie');
        if (ctx.pct === 100)                   deblocheaza('perfectiune');
        if (ctx.greseli === 0) {
            sesiunePerfectStreak++;
            if (sesiunePerfectStreak >= 3)     deblocheaza('sesiune_perfect3');
        } else {
            sesiunePerfectStreak = 0;
        }

        if (ctx.greseli === 0 && ctx.hinturi === 0) {
            deblocheaza('ochitor');
            const ochCount = incrementStat('ochitor_count');
            if (ochCount >= 3)                 deblocheaza('samurai');
            if (ochCount >= 10)                deblocheaza('ochitor_suprem');
            if (ochCount >= 20)                deblocheaza('ochitor_legend');
            const judeteKeys2 = Object.keys(JUDETE);
            if (ochCount >= judeteKeys2.length) deblocheaza('ochitor_total');
            if (ctx.dif === 'greu') {
                deblocheaza('greu_ochitor');
                const greOchNr = incrementStat('greu_ochitor_count');
                if (greOchNr >= 5)             deblocheaza('greu_ochitor_5');
                if (greOchNr >= 10)            deblocheaza('greu_ochitor_10');
                if (greOchNr >= Object.keys(JUDETE).length) deblocheaza('greu_ochitor_tot');
            }
        }
        if (ctx.hinturi === 0) {
            const noHintNr = incrementStat('no_hint_count');
            if (noHintNr >= 10)                deblocheaza('no_hint_10');
            if (noHintNr >= 30)                deblocheaza('no_hint_30');
        }
        if (ctx.dif === 'usor' && ctx.timp < 5)  deblocheaza('sub5_usor');
        if (ctx.timp < 10)                     deblocheaza('sub10');
        if (ctx.timp < 20)                     deblocheaza('sub20');
        if (ctx.timp < 30)                     deblocheaza('racheta');
        if (ctx.timp < 60)                     deblocheaza('fulger');
        if (ctx.timp >= 180)                   deblocheaza('metodic');
        if (ctx.hinturi >= 3)                  deblocheaza('inginer');

        if (ctx.dif === 'fara-greseli') {
            deblocheaza('nervi_otel');
            if (ctx.judet === 'suceava')       deblocheaza('suceava_nm');
            if (ctx.timp < 15)                 deblocheaza('fara_sub15');
            if (ctx.timp < 30)                 deblocheaza('fara_fulger');
            const faraNr = Object.keys(JUDETE).filter(j => citestHS('hs_orase_fara_' + j)).length;
            if (faraNr >= 5)                   deblocheaza('intangibil');
            if (faraNr >= 10)                  deblocheaza('fara_x10');
            if (faraNr >= Object.keys(JUDETE).length) deblocheaza('zeul_hartilor');
            const hGreu = citestHS('hs_orase_greu_' + ctx.judet);
            if (hGreu && hGreu.pct === 100)    deblocheaza('greu_fara_combo');
            if (sesiuneGreuPerfect.has(ctx.judet)) deblocheaza('fara_greu_ses');
        }
        if (ctx.dif === 'fara-greseli') {
            if (ctx.timp < 10)                 deblocheaza('fara_sub10');
        }
        if (ctx.dif === 'greu') {
            if (ctx.pct === 100) {
                deblocheaza('greu_perfect');
                sesiuneGreuPerfect.add(ctx.judet);
                if (ctx.judet === 'suceava')   deblocheaza('suceava_greu');
            }
            if (ctx.timp < 15)                 deblocheaza('sub15_greu');
            if (ctx.timp < 20)                 deblocheaza('sub20_greu');
            if (ctx.timp < 30)                 deblocheaza('fulger_otel');
            if (ctx.timp < 45)                 deblocheaza('timp_ramas');
            const greuKeys = Object.keys(JUDETE);
            const greuNr = greuKeys.filter(j => citestHS('hs_orase_greu_' + j)).length;
            if (greuNr >= greuKeys.length)     deblocheaza('campion_fier');
            const greu100 = greuKeys.filter(j => {
                const h = citestHS('hs_orase_greu_' + j); return h && h.pct === 100;
            }).length;
            if (greu100 >= 5)                  deblocheaza('greu_x5');
            if (greu100 >= 10)                 deblocheaza('greu_perfect10');
            if (greu100 >= greuKeys.length)    deblocheaza('greu_maestru');
        }

        if (ora >= 22)                         deblocheaza('nocturn');
        if (ora < 7)                           deblocheaza('cantec_de_cocos');
        if ([11, 0, 1].includes(luna))         deblocheaza('hibernare');
        if (eRevelion)                         deblocheaza('revelion');
        if (eZiNationala)                      deblocheaza('ziua_nationala');
        if (eBufnita)                          deblocheaza('bufnita');

        const judeteKeys = Object.keys(JUDETE);
        const completate = judeteKeys.filter(j => citestHSOrase(j)).length;
        if (completate >= 10)                  deblocheaza('explorer');
        if (completate >= 20)                  deblocheaza('globetrotter');
        if (completate >= judeteKeys.length)   deblocheaza('maestru');

        const perfecte100 = judeteKeys.filter(j =>
            ['usor','greu','fara'].some(d => { const h = citestHS('hs_orase_' + d + '_' + j); return h && h.pct === 100; })
        ).length;
        if (perfecte100 >= 5)                  deblocheaza('perfectionist');
        if (perfecte100 >= judeteKeys.length)  deblocheaza('marele_maestru');

        const usor100 = judeteKeys.filter(j => {
            const h = citestHS('hs_orase_usor_' + j); return h && h.pct === 100;
        }).length;
        if (usor100 >= judeteKeys.length)      deblocheaza('all_perfect_usor');

        const regiuni = [...new Set(Object.values(JUDETE).map(j => j.regiune))];
        const toateRegiunile = regiuni.every(r =>
            Object.entries(JUDETE).some(([k, v]) => v.regiune === r && citestHSOrase(k))
        );
        if (toateRegiunile)                    deblocheaza('explorator_reg');

        const tripleNr = judeteKeys.filter(j =>
            citestHS('hs_orase_usor_' + j) && citestHS('hs_orase_greu_' + j) && citestHS('hs_orase_fara_' + j)
        ).length;
        if (tripleNr >= 1)                     deblocheaza('triple_crown');
        if (tripleNr >= 5)                     deblocheaza('grand_master');
        if (tripleNr >= judeteKeys.length)     deblocheaza('cuceritorul');

        sesiuneJudete++;
        if (sesiuneJudete >= 5)                deblocheaza('sesiune_5');
        if (sesiuneJudete >= 10)               deblocheaza('sesiune_10');
        if (sesiuneJudete >= 15)               deblocheaza('sesiune_15');

        const nrZile = marcheazaZiJucata();
        if (nrZile >= 5)                       deblocheaza('zile_5');
        if (nrZile >= 15)                      deblocheaza('zile_15');
        if (nrZile >= 30)                      deblocheaza('zile_30');

        const jocuriTotal = incrementStat('jocuri');
        if (jocuriTotal >= 10)                 deblocheaza('dependent');
        if (jocuriTotal >= 30)                 deblocheaza('maraton');
        if (jocuriTotal >= 50)                 deblocheaza('hardcore');
        if (jocuriTotal >= 100)                deblocheaza('centurion');
        if (jocuriTotal >= 200)                deblocheaza('partide_200');
        if (jocuriTotal >= 500)                deblocheaza('partide_500');

        if (now.getDay() === 0 || now.getDay() === 6) deblocheaza('weekend_geo');
    }

    if (ctx.tip === 'trivia') {
        if (ctx.scor === 10) {
            deblocheaza('trivia_pro');
            const perfNr = incrementStat('trivia_perfect');
            if (perfNr >= 3)                   deblocheaza('geniu_trivia');
            if (perfNr >= 5)                   deblocheaza('geniu_absolut');
            if (perfNr >= 10)                  deblocheaza('trivia_10x');
        }
        if (ctx.scor === 10 && ctx.timp < 90)  deblocheaza('trivia_blitz');
        if (ctx.scor === 10 && ctx.timp < 60)  deblocheaza('trivia_fulger');
        if (ctx.scor >= 7) {
            const wins = incrementStat('trivia_castigate');
            if (wins >= 3)                     deblocheaza('trivia_fanatic');
        }
        const trivNr = incrementStat('trivia_total');
        if (trivNr >= 10)                      deblocheaza('enciclopedie');
        if (trivNr >= 25)                      deblocheaza('trivia_obsesie');
        if (trivNr >= 50)                      deblocheaza('trivia_50');
        if (trivNr >= 100)                     deblocheaza('trivia_100');
        if (ora >= 22)                         deblocheaza('nocturn');
        if (ora < 7)                           deblocheaza('cantec_de_cocos');
        if ([11, 0, 1].includes(luna))         deblocheaza('hibernare');
        if (eRevelion)                         deblocheaza('revelion');
        if (eZiNationala)                      deblocheaza('ziua_nationala');
        if (eBufnita)                          deblocheaza('bufnita');
    }

    if (ctx.tip === 'streak') {
        if (ctx.val >= 5)                      deblocheaza('pe_foc');
        if (ctx.val >= 10)                     deblocheaza('inflamat');
        if (ctx.val >= 15)                     deblocheaza('vulcan');
        if (ctx.val >= 25)                     deblocheaza('eruptie');
        if (ctx.val >= 50)                     deblocheaza('streak_50');
    }
    if (ctx.tip === 'invatare_ro')             deblocheaza('absolvent');
    if (ctx.tip === 'invatare_mm')             deblocheaza('student_harnic');
    if (ctx.tip === 'joc_mm')                  deblocheaza('maramuresean');
    if (ctx.tip === 'replay_county') {
        const r = incrementStat('replay_' + ctx.judet);
        if (r >= 3)                            deblocheaza('perseverent');
        if (r >= 5)                            deblocheaza('replay_5');
    }
    if (ctx.tip === 'dif') {
        const difs = marcheazaDif(ctx.dif);
        if (difs.size >= 3)                    deblocheaza('aventurier');
    }

    if (ctx.tip === 'scris') {
        deblocheaza('scris_prima');
        if (ctx.pct >= 50)  deblocheaza('scris_jumatate');
        if (ctx.pct >= 90)  deblocheaza('scris_expert');
        if (ctx.pct === 100) {
            deblocheaza('scris_perfect');
            if (ctx.judet === 'suceava')  deblocheaza('scris_suceava');
            if (ctx.judet === 'hunedoara') deblocheaza('scris_hunedoara');
        }
        if (!ctx.renuntat && ctx.pct === 100)  deblocheaza('scris_fara');
        if (ctx.pct === 100 && ctx.timp < 120) deblocheaza('scris_rapid');
        if (ctx.pct === 100 && ctx.timp < 30)  deblocheaza('scris_sub30');

        const scrisPerfNr = parseInt(lsGet('stat_scris_perfect') || '0');
        if (scrisPerfNr >= 3)  deblocheaza('scris_3x');
        if (scrisPerfNr >= 10) deblocheaza('scris_10x');

        const judeteScrise = JSON.parse(lsGet('stat_scris_judete') || '[]');
        if (judeteScrise.length >= 5)  deblocheaza('scris_5judete');
        if (judeteScrise.length >= 15) deblocheaza('scris_15judete');
        if (judeteScrise.length >= Object.keys(JUDETE).length) deblocheaza('scris_toate');

        const judPerfecte = JSON.parse(lsGet('stat_scris_judete_perfecte') || '[]');
        if (judPerfecte.length >= Object.keys(JUDETE).length) deblocheaza('scris_toate_100');

        if (ctx.sesNr >= 10) deblocheaza('scris_10ses');
        if (ctx.sesNr >= 30) deblocheaza('scris_30ses');
        if (ctx.sesNr >= 50) deblocheaza('scris_50ses');

        // Rapid 3x și sub30 3x
        if (ctx.pct === 100 && ctx.timp < 120) {
            const rapidNr = incrementStat('scris_rapid_count');
            if (rapidNr >= 3) deblocheaza('scris_rapid3');
        }
        if (ctx.pct === 100 && ctx.timp < 30) {
            const sub30Nr = incrementStat('scris_sub30_count');
            if (sub30Nr >= 3) deblocheaza('scris_sub30_3x');
        }

        // Sesiune scris perfect (100% consecutiv în sesiune)
        if (ctx.pct === 100) {
            sesiuneScrisPerfect++;
            if (sesiuneScrisPerfect >= 3) deblocheaza('scris_sesiune3');
            if (sesiuneScrisPerfect >= 5) deblocheaza('scris_sesiune5');
        }

        // Cross-mode: all_modes_county și greu_fara_scris
        if (ctx.pct === 100) {
            const ju = ctx.judet;
            const hsU = citestHS('hs_orase_usor_' + ju);
            const hsG = citestHS('hs_orase_greu_' + ju);
            const hsF = citestHS('hs_orase_fara_' + ju);
            if (hsG && hsG.pct === 100 && hsF)         deblocheaza('greu_fara_scris');
            if (hsU && hsG && hsG.pct === 100 && hsF)  deblocheaza('all_modes_county');
        }

        // Explorator scris — câte o regiune acoperită
        const regScris = JSON.parse(lsGet('stat_scris_judete') || '[]');
        const regiuniScrise = [...new Set(regScris.map(j => JUDETE[j] && JUDETE[j].regiune).filter(Boolean))];
        const toateReg = [...new Set(Object.values(JUDETE).map(j => j.regiune))];
        if (regiuniScrise.length >= toateReg.length) deblocheaza('toate_reg_scris');

        // combo: 100% scris județ + 100% scris mm
        const hsMM = citestHS('hs_scris_mm');
        if (ctx.pct === 100 && hsMM && hsMM.pct === 100) deblocheaza('scris_mm_combo');

        // legenda: 100% în toate județele + 100% mm
        if (judPerfecte.length >= Object.keys(JUDETE).length && hsMM && hsMM.pct === 100)
            deblocheaza('scris_legenda');
    }

    if (ctx.tip === 'mm_scris') {
        deblocheaza('mm_scris_prima');
        if (ctx.pct >= 50)  deblocheaza('mm_scris_50');
        if (ctx.pct >= 80)  deblocheaza('mm_scris_80');
        if (ctx.pct === 100) {
            deblocheaza('mm_scris_perfect');
            const mmPerfNr = incrementStat('mm_scris_perfect_count');
            if (mmPerfNr >= 3) deblocheaza('mm_scris_perfect3');
        }
        if (ctx.pct === 100 && ctx.timp < 180) deblocheaza('mm_scris_rapid');

        if (ctx.mmSesNr >= 10) deblocheaza('mm_scris_10');

        const mmBunNr = parseInt(lsGet('stat_mm_scris_bun') || '0');
        if (mmBunNr >= 3) deblocheaza('mm_scris_3x');

        if (now.getDay() === 0 || now.getDay() === 6) deblocheaza('weekend_geo');

        // combo și legendă (check din perspectiva MM)
        const judPerfecte2 = JSON.parse(lsGet('stat_scris_judete_perfecte') || '[]');
        if (ctx.pct === 100 && judPerfecte2.length > 0) deblocheaza('scris_mm_combo');
        if (ctx.pct === 100 && judPerfecte2.length >= Object.keys(JUDETE).length)
            deblocheaza('scris_legenda');

        // scris_mm_combo necesită și HS județ 100% — verificat din ambele direcții
        // (dacă se ajunge aici din mm_scris, verificăm că există cel puțin un județ cu 100%)

    }

    // All-rounder: a câștigat din toate 4 categorii
    const hasRo = !!lsGet('hs_joc');
    const hasMM = !!lsGet('hs_mm');
    const hasJ  = Object.keys(JUDETE).some(j => citestHSOrase(j));
    const hasT  = !!lsGet('hs_trivia');
    if (hasRo && hasMM && hasJ && hasT)        deblocheaza('all_rounder');

    // Meta: colecționar (check after all others)
    const nrAch = citestAchievements().length;
    if (nrAch >= 15)                           deblocheaza('colectar15');
    if (nrAch >= 30)                           deblocheaza('colectar30');
    if (nrAch >= 45)                           deblocheaza('colectar45');
    if (nrAch >= 60)                           deblocheaza('colectar60');
    if (nrAch >= ACHIEVEMENTS.length - 1)      deblocheaza('legenda_vie');
}

function actualizeazaAchBadge() {
    const n  = citestAchievements().length;
    const el = document.getElementById('ach-count-badge');
    if (el) el.textContent = n + '/' + ACHIEVEMENTS.length;
}

function deschideAchModal() {
    const castigate = citestAchievements();
    const lista = document.getElementById('ach-lista');
    lista.innerHTML = ACHIEVEMENTS.map(a => `
        <div class="ach-item ${castigate.includes(a.id) ? 'castigat' : ''}">
            <div class="ach-emoji">${a.emoji}</div>
            <div class="ach-info">
                <div class="ach-titlu">${a.titlu}</div>
                <div class="ach-desc">${a.desc}</div>
            </div>
        </div>`).join('');
    document.getElementById('ach-modal').classList.remove('ascuns');
}

function inchideAchModal() {
    document.getElementById('ach-modal').classList.add('ascuns');
}

// ── Mod Scris ──────────────────────────────────────────────────────────────

let modScrisActiv = false;

function toggleModScris(on) {
    modScrisActiv = on;
}

function normalizeazaNume(s) {
    return s.toLowerCase()
        .replace(/ș|ş/g, 's').replace(/ț|ţ/g, 't')
        .replace(/ă/g, 'a').replace(/â/g, 'a').replace(/î/g, 'i')
        .normalize('NFD').replace(/[̀-ͯ]/g, '')
        .replace(/[^a-z0-9 \-]/g, '')
        .replace(/\s+/g, ' ').trim();
}

function numeSePotrivesteScris(input, target) {
    const i = normalizeazaNume(input);
    const t = normalizeazaNume(target);
    if (i === t) return true;
    // acceptă și fără cratimă sau spațiu-vs-cratimă
    return i.replace(/[\s\-]/g, '') === t.replace(/[\s\-]/g, '');
}

// ── Mod Scris Orașe ────────────────────────────────────────────────
// Recall liber: harta goală, scrii orice oraș, apare instant dacă e corect

let scrisNegasite   = new Set();
let scrisGasite     = 0;
let scrisTotalOrase = 0;
let scrisRenuntat   = false;

function pornesteOraseScris(judet) {
    ascundeToate();
    oraseJudet = judet;
    modCurent  = 'orase-scris';

    const cfg = JUDETE[judet];
    scrisGasite = 0;
    scrisRenuntat = false;
    sesiuneScrisMMJucata = true;
    scrisNegasite = new Set(cfg.features.map(f => f.properties.name));
    scrisTotalOrase = scrisNegasite.size;

    // Curăță markerii anteriori și construiește unii noi
    if (oraseLayer) { map.removeLayer(oraseLayer); oraseLayer = null; }
    Object.values(oraseLayerMap).forEach(m => { try { map.removeLayer(m); } catch(e) {} });
    oraseLayerMap = {};
    cfg.features.forEach(f => {
        const [lng, lat] = f.geometry.coordinates;
        const m = L.circleMarker([lat, lng], {
            radius: 8, color: '#555', fillColor: '#333', fillOpacity: 0.5, weight: 1.5
        }).addTo(map);
        oraseLayerMap[f.properties.name] = m;
    });

    map.setView(cfg.centru || [45.94, 24.96], cfg.zoom || 9);
    document.getElementById('ecran').classList.remove('ascuns');
    document.getElementById('ui-scris').classList.remove('ascuns');

    actualizezaUIScris();
    document.getElementById('scris-input').value = '';
    document.getElementById('scris-feedback').textContent = '';
    document.getElementById('scris-feedback').className = '';
    document.getElementById('scris-input').focus();

    startTimer(cheieOrase(judet));
}

function actualizezaUIScris() {
    document.getElementById('scris-corect').textContent = scrisGasite;
    document.getElementById('scris-ramase').textContent = scrisNegasite.size;
    document.getElementById('scris-progres-bar').style.width =
        (scrisGasite / scrisTotalOrase * 100) + '%';
    const pct = scrisTotalOrase ? Math.round(scrisGasite / scrisTotalOrase * 100) : 0;
    const elPct = document.getElementById('sb-pct-scris');
    if (elPct) { elPct.textContent = pct + '%'; elPct.classList.remove('ascuns'); }
}

function onInputScris() {
    const input = document.getElementById('scris-input');
    const val   = input.value;

    // Caută potrivire exactă (normalizată) printre orasele rămase
    let gasit = null;
    for (const nume of scrisNegasite) {
        if (numeSePotrivesteScris(val, nume)) { gasit = nume; break; }
    }
    if (!gasit) return;

    // Potrivire găsită
    scrisNegasite.delete(gasit);
    scrisGasite++;

    const marker = oraseLayerMap[gasit];
    if (marker) {
        marker.setStyle({ color: '#2ecc71', fillColor: '#2ecc71', fillOpacity: 0.9, radius: 12 });
        marker.bindTooltip(gasit, { permanent: true, direction: 'top', className: 'tooltip-oras' }).openTooltip();
    }

    bipCorect();
    const fb = document.getElementById('scris-feedback');
    fb.textContent = '✅ ' + gasit;
    fb.className = 'corect';

    input.value = '';
    actualizezaUIScris();

    if (scrisNegasite.size === 0) setTimeout(sfarsitScris, 600);
}

function renuntaScris() {
    scrisRenuntat = true;
    scrisNegasite.forEach(nume => {
        const m = oraseLayerMap[nume];
        if (m) {
            m.setStyle({ color: '#e74c3c', fillColor: '#c0392b', fillOpacity: 0.75, radius: 10 });
            m.bindTooltip(nume, { permanent: false, sticky: true, direction: 'top', className: 'tooltip-oras tooltip-negasit' });
        }
    });
    const fb = document.getElementById('scris-feedback');
    fb.textContent = '🏳 ' + scrisNegasite.size + ' orașe negăsite (roșu pe hartă)';
    fb.className = 'gresit';
    scrisNegasite.clear();
    setTimeout(sfarsitScris, 2500);
}

function replayScris() {
    Object.values(oraseLayerMap).forEach(m => { m.unbindTooltip(); map.removeLayer(m); });
    oraseLayerMap = {};
    pornesteOraseScris(oraseJudet);
}

function sfarsitScris() {
    const pct = Math.round(scrisGasite / scrisTotalOrase * 100);
    const cheieScris = 'scris_' + oraseJudet;
    const best = citestHS(cheieScris);
    const eRecord = !best || pct > (best.pct || 0) ||
                    (pct === (best.pct || 0) && timerSecunde < best.timp);
    stopTimer(pct);
    if (eRecord) lsSet('hs_' + cheieScris, JSON.stringify({ timp: timerSecunde, pct }));

    // Stat tracking pentru achievements scris
    const sesNr  = incrementStat('scris_sesiuni');
    if (pct === 100) incrementStat('scris_perfect');
    const judeteScrise = JSON.parse(lsGet('stat_scris_judete') || '[]');
    if (!judeteScrise.includes(oraseJudet)) {
        judeteScrise.push(oraseJudet);
        lsSet('stat_scris_judete', JSON.stringify(judeteScrise));
    }
    if (pct === 100) {
        const judPerfecte = JSON.parse(lsGet('stat_scris_judete_perfecte') || '[]');
        if (!judPerfecte.includes(oraseJudet)) {
            judPerfecte.push(oraseJudet);
            lsSet('stat_scris_judete_perfecte', JSON.stringify(judPerfecte));
        }
    }
    verificaAchievements({ tip: 'scris', pct, timp: timerSecunde, judet: oraseJudet, renuntat: scrisRenuntat, sesNr });

    document.getElementById('sb-pct-scris').classList.add('ascuns');
    document.getElementById('ui-scris').classList.add('ascuns');
    document.getElementById('final-joc-emoji').textContent    = pct === 100 ? '💯' : pct >= 70 ? '🏆' : '💪';
    document.getElementById('final-joc-titlu').textContent    = pct === 100 ? 'Perfect!' : 'Finalizat!';
    document.getElementById('final-joc-subtitlu').textContent = eRecord ? '🌟 Record personal nou!' : '';
    document.getElementById('final-scor').innerHTML =
        `✅ ${scrisGasite} / ${scrisTotalOrase} orașe &nbsp;·&nbsp; <strong>${pct}%</strong>`;
    const hsText = best ? `🏆 Record: ${best.pct}% · ${formatTime(best.timp)}` : '';
    document.getElementById('final-detalii').textContent = hsText;
    document.getElementById('btn-replay-final').onclick = replayScris;
    document.getElementById('btn-judet-urmator').classList.add('ascuns');
    document.getElementById('final-judete-stat').classList.add('ascuns');
    document.getElementById('final-joc').classList.add('vizibil');
    if (pct === 100) pornesteCelebration();
}

// ── Mod Scris MM ───────────────────────────────────────────────────
// Recall liber: harta cu comune gri, scrii orice comună, se colorează instant

let mmData = null;
let mmScrisNegasite = new Set();
let mmScrisGasite   = 0;
let mmScrisTotalComune = 0;

function pornesteMMScris() {
    if (!mmData || !mmData.features) return;
    modCurent = 'mm-scris';

    mmScrisGasite = 0;
    mmScrisRenuntat = false;
    mmScrisNegasite = new Set(mmData.features.map(f => f.properties.name || f.properties.NAME));
    mmScrisTotalComune = mmScrisNegasite.size;

    costruiesteLayerMM(mmData, mmStilAscuns);

    document.getElementById('ui-mm-scris').classList.remove('ascuns');
    actualizezaUIMMScris();
    document.getElementById('mm-scris-input').value = '';
    document.getElementById('mm-scris-feedback').textContent = '';
    document.getElementById('mm-scris-feedback').className = '';
    document.getElementById('mm-scris-input').focus();

    startTimer('mm_scris');
}

function actualizezaUIMMScris() {
    document.getElementById('mm-scris-corect').textContent = mmScrisGasite;
    document.getElementById('mm-scris-ramase').textContent  = mmScrisNegasite.size;
    document.getElementById('mm-scris-progres-bar').style.width =
        (mmScrisGasite / mmScrisTotalComune * 100) + '%';
    const pct = mmScrisTotalComune ? Math.round(mmScrisGasite / mmScrisTotalComune * 100) : 0;
    const elPct = document.getElementById('sb-pct-scris');
    if (elPct) { elPct.textContent = pct + '%'; elPct.classList.remove('ascuns'); }
}

function onInputMMScris() {
    const input = document.getElementById('mm-scris-input');
    const val   = input.value;

    let gasit = null;
    for (const nume of mmScrisNegasite) {
        if (numeSePotrivesteScris(val, nume)) { gasit = nume; break; }
    }
    if (!gasit) return;

    mmScrisNegasite.delete(gasit);
    mmScrisGasite++;

    if (mmLayerMap && mmLayerMap[gasit]) {
        mmLayerMap[gasit].setStyle({ color: '#2ecc71', fillColor: '#2ecc71', fillOpacity: 0.7, weight: 2 });
    }

    bipCorect();
    const fb = document.getElementById('mm-scris-feedback');
    fb.textContent = '✅ ' + gasit;
    fb.className = 'corect';

    input.value = '';
    actualizezaUIMMScris();

    if (mmScrisNegasite.size === 0) setTimeout(sfarsitMMScris, 600);
}

let mmScrisRenuntat = false;

function renuntaMMScris() {
    mmScrisRenuntat = true;
    mmScrisNegasite.forEach(nume => {
        if (mmLayerMap && mmLayerMap[nume]) {
            mmLayerMap[nume].setStyle({ color: '#e74c3c', fillColor: '#c0392b', fillOpacity: 0.6, weight: 2 });
            mmLayerMap[nume].bindTooltip(nume, { permanent: false, sticky: true, direction: 'top', className: 'tooltip-oras tooltip-negasit' });
        }
    });
    const fb = document.getElementById('mm-scris-feedback');
    fb.textContent = '🏳 ' + mmScrisNegasite.size + ' comune negăsite (roșu pe hartă)';
    fb.className = 'gresit';
    mmScrisNegasite.clear();
    setTimeout(sfarsitMMScris, 2500);
}

function replayMMScris() { pornesteMMScris(); }

function sfarsitMMScris() {
    const pct = Math.round(mmScrisGasite / mmScrisTotalComune * 100);
    const cheieScrisMM = 'scris_mm';
    const best = citestHS(cheieScrisMM);
    const eRecord = !best || pct > (best.pct || 0) ||
                    (pct === (best.pct || 0) && timerSecunde < best.timp);
    stopTimer(pct);
    if (eRecord) lsSet('hs_' + cheieScrisMM, JSON.stringify({ timp: timerSecunde, pct }));

    const mmSesNr = incrementStat('mm_scris_sesiuni');
    if (pct >= 80) incrementStat('mm_scris_bun');
    verificaAchievements({ tip: 'mm_scris', pct, timp: timerSecunde, renuntat: mmScrisRenuntat, mmSesNr });

    document.getElementById('sb-pct-scris').classList.add('ascuns');
    document.getElementById('ui-mm-scris').classList.add('ascuns');
    document.getElementById('mm-final-scor').textContent =
        `${mmScrisGasite} / ${mmScrisTotalComune} comune găsite — ${pct}%`;
    document.getElementById('mm-final-detalii').textContent =
        eRecord ? '🌟 Record personal nou!' :
        (best ? `🏆 Record: ${best.pct}% · ${formatTime(best.timp)}` : '');
    document.getElementById('final-mm-joc').classList.add('vizibil');
    if (pct === 100) pornesteCelebration();
}


// ── Hartă selecție județ ───────────────────────────────────────────────────

const CULORI_REGIUNE = {
    'Nord-Vest':       '#3b82f6',
    'Centru':          '#22c55e',
    'Vest':            '#f97316',
    'Nord-Est':        '#a855f7',
    'Sud-Est':         '#ef4444',
    'Sud-Muntenia':    '#eab308',
    'Sud-Vest':        '#14b8a6',
    'București-Ilfov': '#ec4899',
};

let hartaSelectie   = null;
let markereSelectie = {};
let judetSelectatKey = null;

function deschideHartaSelectie() {
    document.getElementById('landing').classList.add('ascuns');
    const screen = document.getElementById('screen-harta-selectie');
    screen.classList.remove('ascuns');

    if (!hartaSelectie) {
        hartaSelectie = L.map('harta-selectie-map', {
            zoomControl: true,
            attributionControl: false,
        }).setView([45.85, 24.96], 7);

        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
            maxZoom: 19
        }).addTo(hartaSelectie);

        Object.entries(JUDETE).forEach(([key, jud]) => {
            const culoare = CULORI_REGIUNE[jud.regiune] || '#888';
            const nr = jud.features.length;

            const m = L.circleMarker(jud.view, {
                radius: 14,
                color: '#fff',
                weight: 2,
                fillColor: culoare,
                fillOpacity: 0.82,
            }).addTo(hartaSelectie);

            m.bindTooltip(`<strong>${jud.titlu}</strong><br><small>${nr} localități · ${jud.regiune}</small>`, {
                direction: 'top',
                className: 'tooltip-judet-sel',
                offset: [0, -12],
            });

            m.on('mouseover', function() {
                this.setStyle({ radius: 18, fillOpacity: 1, weight: 3 });
                this.openTooltip();
            });
            m.on('mouseout', function() {
                if (judetSelectatKey !== key) {
                    this.setStyle({ radius: 14, fillOpacity: 0.82, weight: 2 });
                }
                this.closeTooltip();
            });
            m.on('click', () => selecteazaJudetHarta(key));

            markereSelectie[key] = { marker: m, culoare };
        });
    }

    setTimeout(() => hartaSelectie.invalidateSize(), 120);
    document.getElementById('panel-judet-selectat').classList.add('ascuns');
    judetSelectatKey = null;
}

function inchideHartaSelectie() {
    document.getElementById('screen-harta-selectie').classList.add('ascuns');
    document.getElementById('landing').classList.remove('ascuns');
    document.getElementById('panel-judet-selectat').classList.add('ascuns');
    judetSelectatKey = null;
}

function selecteazaJudetHarta(key) {
    // Resetează markerul anterior
    if (judetSelectatKey && markereSelectie[judetSelectatKey]) {
        markereSelectie[judetSelectatKey].marker.setStyle({ radius: 14, fillOpacity: 0.82, weight: 2 });
    }

    judetSelectatKey = key;
    const jud = JUDETE[key];
    const { marker, culoare } = markereSelectie[key];
    marker.setStyle({ radius: 18, fillOpacity: 1, weight: 3 });

    document.getElementById('panel-judet-titlu').textContent = jud.titlu;
    document.getElementById('panel-judet-nr').textContent = jud.features.length + ' localități · ' + jud.regiune;
    document.getElementById('panel-judet-selectat').style.setProperty('--accent', culoare);
    document.getElementById('panel-judet-selectat').classList.remove('ascuns');
}

function pornesteJudetDinHarta(dif) {
    if (!judetSelectatKey) return;
    modScrisActiv = false;
    setDificultate(dif);
    document.getElementById('screen-harta-selectie').classList.add('ascuns');
    document.getElementById('panel-judet-selectat').classList.add('ascuns');
    pornesteOrase(judetSelectatKey);
}

function pornesteJudetScrisDinHarta() {
    if (!judetSelectatKey) return;
    modScrisActiv = true;
    document.getElementById('screen-harta-selectie').classList.add('ascuns');
    document.getElementById('panel-judet-selectat').classList.add('ascuns');
    pornesteOrase(judetSelectatKey);
}

// ── Init ───────────────────────────────────────────────────────────────────

(function initApp() {
    const jucatori = getJucatori();
    if (currentPlayer && jucatori.includes(currentPlayer)) {
        // Jucător deja selectat — sari direct la landing
        document.getElementById('screen-profil').classList.add('ascuns');
        document.getElementById('landing').classList.remove('ascuns');
        const el = document.getElementById('jucator-activ-label');
        if (el) el.textContent = '👤 ' + currentPlayer;
    } else if (jucatori.length === 0) {
        // Prima rulare — arată ecranul de profil gol
        document.getElementById('screen-profil').classList.remove('ascuns');
        document.getElementById('landing').classList.add('ascuns');
        randeazaProfiluri();
    } else {
        // Există jucători dar niciunul selectat — arată selecția
        document.getElementById('screen-profil').classList.remove('ascuns');
        document.getElementById('landing').classList.add('ascuns');
        randeazaProfiluri();
    }
    actualizeazaLandingHS();
    actualizeazaAchBadge();
})();
