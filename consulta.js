const committeesByPeriod = {
  "Manhã": {
    "ONU Mulheres": ["Afeganistão", "África do Sul", "Alemanha", "Arábia Saudita", "Canadá", "China", "EUA", "Índia", "Japão", "Noruega", "Países Baixos", "Reino Unido", "Ucrânia"],
    OIC: ["Alemanha", "Arábia Saudita", "China", "Egito", "EUA", "França", "Iémen", "Irã", "Iraque", "Israel", "Líbano", "Paquistão", "Rússia"],
    FAO: ["Alemanha", "Argentina", "Brasil", "China", "Costa Rica", "Egito", "EUA", "França", "Haiti", "Índia", "Reino Unido", "Rússia", "Ucrânia"],
    ACNUDH: ["Alemanha", "África do Sul", "Bangladesh", "Brasil", "Chile", "China", "Coreia do Norte", "Costa Rica", "Cuba", "França", "Indonésia", "Japão", "Países Baixos"],
    UNICEF: ["Alemanha", "Brasil", "China", "EUA", "Equador", "Espanha", "França", "Índia", "Irlanda", "Nigéria", "Noruega", "Reino Unido", "Suíça"],
    OMS: ["África do Sul", "Alemanha", "Argentina", "Brasil", "Canadá", "China", "Cuba", "França", "Itália", "Japão", "Reino Unido", "Rússia", "Suíça"],
    UNODA: ["Alemanha", "Brasil", "China", "Coreia do Norte", "EUA", "França", "Irã", "Israel", "Japão", "Reino Unido", "República Democrática do Congo", "Rússia", "Ucrânia"],
    PNUD: ["Alemanha", "Brasil", "China", "Colômbia", "Coreia do Sul", "Dinamarca", "Equador", "EUA", "Etiópia", "Japão", "Luxemburgo", "Reino Unido", "Suécia"],
    AIEA: ["Austrália", "Brasil", "China", "Coreia do Norte", "Coreia do Sul", "EUA", "França", "Índia", "Irã", "Japão", "Reino Unido", "Rússia", "Ucrânia"],
    UNIDO: ["Alemanha", "Brasil", "Chile", "China", "Coreia do Sul", "EUA", "Países Baixos", "Índia", "Japão", "Nigéria", "República Democrática do Congo", "Taiwan", "Vietnã"],
    WMO: ["Arábia Saudita", "Austrália", "Brasil", "Canadá", "China", "Emirados Árabes Unidos", "EUA", "Índia", "Indonésia", "Quênia", "Rússia", "Suécia", "Tuvalu"],
    UNESCO: ["África do Sul", "China", "Egito", "EUA", "Finlândia", "França", "Índia", "Israel", "Itália", "Japão", "México", "Peru", "Ucrânia"],
    CSNU: ["África do Sul", "Brasil", "China", "EUA", "França", "Haiti", "Índia", "Israel", "Japão", "Reino Unido", "Rússia", "Sudão", "Ucrânia"],
    ACNUR: ["Afeganistão", "Alemanha", "Bangladesh", "Colômbia", "EUA", "Itália", "México", "Polônia", "Quênia", "Sudão", "Turquia", "Uganda", "Venezuela"],
    CCP: ["Brasil", "China", "Colômbia", "El Salvador", "Emirados Árabes Unidos", "Equador", "EUA", "Filipinas", "Itália", "México", "Nigéria", "Países Baixos", "Tailândia"],
    PNUMA: ["África do Sul", "Alemanha", "Brasil", "Canadá", "China", "EUA", "Indonésia", "Índia", "Japão", "Maldivas", "Nigéria", "Noruega"]
  },
  "Tarde": {
    "ONU Mulheres": ["Afeganistão", "África do Sul", "Alemanha", "Arábia Saudita", "Canadá", "China", "EUA", "Índia", "Japão", "Noruega", "Países Baixos", "Reino Unido", "Ucrânia"],
    ACNUDH: ["Alemanha", "África do Sul", "Bangladesh", "Brasil", "Chile", "China", "Coreia do Norte", "Costa Rica", "Cuba", "França", "Indonésia", "Japão", "Países Baixos"],
    OMS: ["África do Sul", "Alemanha", "Argentina", "Brasil", "Canadá", "China", "Cuba", "França", "Itália", "Japão", "Reino Unido", "Rússia", "Suíça"],
    UNODA: ["Alemanha", "Brasil", "China", "Coreia do Norte", "EUA", "França", "Irã", "Israel", "Japão", "Reino Unido", "República Democrática do Congo", "Rússia", "Ucrânia"],
    CSNU: ["África do Sul", "Brasil", "China", "EUA", "França", "Haiti", "Índia", "Israel", "Japão", "Reino Unido", "Rússia", "Sudão", "Ucrânia"],
    ACNUR: ["Afeganistão", "Alemanha", "Bangladesh", "Colômbia", "EUA", "Itália", "México", "Polônia", "Quênia", "Sudão", "Turquia", "Uganda", "Venezuela"],
    CCP: ["Brasil", "China", "Colômbia", "El Salvador", "Emirados Árabes Unidos", "Equador", "EUA", "Filipinas", "Itália", "México", "Nigéria", "Países Baixos", "Tailândia"],
    FAO: ["Alemanha", "Argentina", "Brasil", "China", "Costa Rica", "Egito", "EUA", "França", "Haiti", "Índia", "Reino Unido", "Rússia", "Ucrânia"],
    UNICEF: ["Alemanha", "Brasil", "China", "EUA", "Equador", "Espanha", "França", "Índia", "Irlanda", "Nigéria", "Noruega", "Reino Unido", "Suíça"],
    UNESCO: ["África do Sul", "China", "Egito", "EUA", "Finlândia", "França", "Índia", "Israel", "Itália", "Japão", "México", "Peru", "Ucrânia"]
  }
};

// Snapshot público capturado em 26/09/2026. A posição acompanha a lista acima.
const availabilitySnapshot = {
  "Manhã": { "ONU Mulheres": ["available","occupied","occupied","occupied","occupied","occupied","occupied","occupied","occupied","occupied","occupied","occupied","occupied"], OIC: ["occupied","occupied","occupied","occupied","occupied","occupied","occupied","available","occupied","available","occupied","occupied","occupied"], FAO: Array(13).fill("occupied"), ACNUDH: Array(13).fill("occupied"), UNICEF: Array(13).fill("occupied"), OMS: Array(13).fill("occupied"), UNODA: ["occupied","occupied","occupied","occupied","occupied","occupied","occupied","occupied","occupied","occupied","occupied","occupied","available"], PNUD: Array(13).fill("occupied"), AIEA: Array(13).fill("occupied"), UNIDO: Array(13).fill("occupied"), WMO: Array(13).fill("occupied"), UNESCO: Array(13).fill("occupied"), CSNU: Array(13).fill("occupied"), ACNUR: Array(13).fill("occupied"), CCP: ["occupied","occupied","occupied","occupied","available","occupied","occupied","occupied","occupied","occupied","occupied","occupied","occupied"], PNUMA: Array(12).fill("occupied") },
  "Tarde": { "ONU Mulheres": Array(13).fill("occupied"), ACNUDH: ["available","occupied","available","occupied","available","occupied","occupied","available","available","occupied","available","occupied","occupied"], OMS: ["occupied","occupied","occupied","occupied","occupied","available","occupied","occupied","occupied","occupied","available","occupied","occupied"], UNODA: ["occupied","available","occupied","available","occupied","occupied","available","available","occupied","available","available","occupied","available"], CSNU: ["available","occupied","available","occupied","occupied","occupied","available","occupied","available","occupied","available","available","available"], ACNUR: ["available","occupied","available","occupied","available","occupied","occupied","available","available","available","occupied","available","available"], CCP: ["occupied","available","available","available","available","available","available","available","occupied","available","available","occupied","available"], FAO: Array(13).fill("occupied"), UNICEF: Array(13).fill("occupied"), UNESCO: ["occupied","occupied","available","occupied","occupied","occupied","available","available","occupied","occupied","occupied","occupied","available"] }
};

const escapeHtml = value => String(value ?? "").replace(/[&<>\"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]);
const catalogRoute = window.location.pathname.replace(/\/$/, "") === "/comites";
const legacyCatalogRoute = new URLSearchParams(window.location.search).has("consulta");
if (!catalogRoute && legacyCatalogRoute) history.replaceState({}, "", "/comites");
const state = { period: "", committee: "" };
const stage = document.querySelector("#stage");
const helpDialog = document.querySelector("#help-dialog");

function snapshotFor(period, committee) { const countries = committeesByPeriod[period]?.[committee] || []; const statuses = availabilitySnapshot[period]?.[committee] || []; return countries.map((country, index) => ({ country, availability: statuses[index] || "occupied" })); }
function flag(country) { return `<span class="flag-emoji" aria-hidden="true">🌐</span><span>${escapeHtml(country)}</span>`; }
function render() {
  if (!state.period) { stage.innerHTML = `<section class="catalog-view"><p class="eyebrow">CONSULTA PÚBLICA</p><h1>Consulte as<br><em>delegações.</em></h1><p class="lead">As inscrições estão encerradas. Consulte abaixo o retrato final das delegações registrado no encerramento.</p><div class="choice-stack">${Object.keys(committeesByPeriod).map(period => `<button class="choice" type="button" data-period="${period}"><span class="choice-title">${period}</span><span class="choice-arrow">→</span></button>`).join("")}</div></section>`; return; }
  const back = `<button class="catalog-back" type="button" data-action="back">← Voltar</button>`;
  if (!state.committee) { stage.innerHTML = `<section class="catalog-view">${back}<p class="eyebrow">${state.period.toUpperCase()} · CONSULTA</p><h1>Comitês e<br><em>delegações.</em></h1><p class="lead">Selecione um comitê para consultar os países e o estado final de cada delegação.</p><div class="catalog-committee-list">${Object.keys(committeesByPeriod[state.period]).map(committee => { const rows = snapshotFor(state.period, committee); const occupied = rows.filter(row => row.availability === "occupied").length; return `<button class="catalog-committee" type="button" data-committee="${escapeHtml(committee)}"><strong>${escapeHtml(committee)}</strong><span>${occupied} de ${rows.length} ocupados <b>→</b></span></button>`; }).join("")}</div></section>`; return; }
  const rows = snapshotFor(state.period, state.committee); const occupied = rows.filter(row => row.availability === "occupied").length;
  stage.innerHTML = `<section class="catalog-view">${back}<p class="eyebrow">${state.period.toUpperCase()} · CONSULTA</p><h1 class="committee-title">${escapeHtml(state.committee)}</h1><p class="catalog-summary">${occupied} de ${rows.length} delegações ocupadas no snapshot final</p><div class="country-list compact-list">${rows.map(row => `<div class="country catalog-country ${row.availability}"><span>${flag(row.country)}</span><small>${row.availability === "available" ? "Disponível" : "Ocupada"}</small></div>`).join("")}</div><p class="note"><strong>Consulta encerrada:</strong><span>Este conteúdo é estático e não recebe novas inscrições ou alterações.</span></p></section>`;
}
document.addEventListener("click", event => { const button = event.target.closest("button"); if (!button) return; if (button.dataset.period) { state.period = button.dataset.period; state.committee = ""; render(); } else if (button.dataset.committee) { state.committee = button.dataset.committee; render(); } else if (button.dataset.action === "back") { if (state.committee) state.committee = ""; else state.period = ""; render(); } else if (button.dataset.action === "help") helpDialog.showModal(); else if (button.dataset.action === "close-help") helpDialog.close(); });
render();
