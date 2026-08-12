const committees = {
  "ONU Mulheres": ["Afeganistão", "África do Sul", "Alemanha", "Arábia Saudita", "Canadá", "China", "EUA", "Índia", "Japão", "Noruega", "Países Baixos", "Reino Unido", "Ucrânia"],
  OIC: ["Alemanha", "Arábia Saudita", "China", "Egito", "EUA", "França", "Iémen", "Iraque", "Irã", "Israel", "Líbano", "Paquistão", "Rússia"],
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
};

const sampleClasses = ["1º ADM", "2º ADM", "3º ADM", "1º D.S."];
const flags = { "Afeganistão": "🇦🇫", "África do Sul": "🇿🇦", "Alemanha": "🇩🇪", "Arábia Saudita": "🇸🇦", "Argentina": "🇦🇷", "Austrália": "🇦🇺", "Bangladesh": "🇧🇩", "Brasil": "🇧🇷", "Canadá": "🇨🇦", "Chile": "🇨🇱", "China": "🇨🇳", "Colômbia": "🇨🇴", "Coreia do Norte": "🇰🇵", "Coreia do Sul": "🇰🇷", "Costa Rica": "🇨🇷", "Cuba": "🇨🇺", "Dinamarca": "🇩🇰", "EUA": "🇺🇸", "Egito": "🇪🇬", "El Salvador": "🇸🇻", "Emirados Árabes Unidos": "🇦🇪", "Equador": "🇪🇨", "Espanha": "🇪🇸", "Etiópia": "🇪🇹", "Filipinas": "🇵🇭", "Finlândia": "🇫🇮", "França": "🇫🇷", "Haiti": "🇭🇹", "Iémen": "🇾🇪", "Indonésia": "🇮🇩", "Índia": "🇮🇳", "Irã": "🇮🇷", "Iraque": "🇮🇶", "Irlanda": "🇮🇪", "Israel": "🇮🇱", "Itália": "🇮🇹", "Japão": "🇯🇵", "Líbano": "🇱🇧", "Luxemburgo": "🇱🇺", "Maldivas": "🇲🇻", "México": "🇲🇽", "Nigéria": "🇳🇬", "Noruega": "🇳🇴", "Países Baixos": "🇳🇱", "Paquistão": "🇵🇰", "Peru": "🇵🇪", "Polônia": "🇵🇱", "Quênia": "🇰🇪", "Reino Unido": "🇬🇧", "República Democrática do Congo": "🇨🇩", "Rússia": "🇷🇺", "Sudão": "🇸🇩", "Suécia": "🇸🇪", "Suíça": "🇨🇭", "Taiwan": "🇹🇼", "Tailândia": "🇹🇭", "Tuvalu": "🇹🇻", "Turquia": "🇹🇷", "Ucrânia": "🇺🇦", "Uganda": "🇺🇬", "Venezuela": "🇻🇪", "Vietnã": "🇻🇳" };
const flagCodes = { "Afeganistão": "af", "África do Sul": "za", "Alemanha": "de", "Arábia Saudita": "sa", "Argentina": "ar", "Austrália": "au", "Bangladesh": "bd", "Brasil": "br", "Canadá": "ca", "Chile": "cl", "China": "cn", "Colômbia": "co", "Coreia do Norte": "kp", "Coreia do Sul": "kr", "Costa Rica": "cr", "Cuba": "cu", "Dinamarca": "dk", "EUA": "us", "Egito": "eg", "El Salvador": "sv", "Emirados Árabes Unidos": "ae", "Equador": "ec", "Espanha": "es", "Etiópia": "et", "Filipinas": "ph", "Finlândia": "fi", "França": "fr", "Haiti": "ht", "Iémen": "ye", "Indonésia": "id", "Índia": "in", "Irã": "ir", "Iraque": "iq", "Irlanda": "ie", "Israel": "il", "Itália": "it", "Japão": "jp", "Líbano": "lb", "Luxemburgo": "lu", "Maldivas": "mv", "México": "mx", "Nigéria": "ng", "Noruega": "no", "Países Baixos": "nl", "Paquistão": "pk", "Peru": "pe", "Polônia": "pl", "Quênia": "ke", "Reino Unido": "gb", "República Democrática do Congo": "cd", "Rússia": "ru", "Sudão": "sd", "Suécia": "se", "Suíça": "ch", "Taiwan": "tw", "Tailândia": "th", "Tuvalu": "tv", "Turquia": "tr", "Ucrânia": "ua", "Uganda": "ug", "Venezuela": "ve", "Vietnã": "vn" };
const state = { step: 1, period: "", committee: "", country: "", personOne: "", classOne: "", personTwo: "", classTwo: "", reservationUntil: 0 };
const stage = document.querySelector("#stage");
const progress = document.querySelector("#progress-bar");
const stepLabel = document.querySelector("#step-label");
const dialog = document.querySelector("#help-dialog");
const unavailable = new Set(["CSNU|Brasil", "CSNU|França", "UNICEF|China"]);

const escapeHtml = value => value.replace(/[&<>'\"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]);
const currentReservation = () => state.reservationUntil > Date.now();
const formatTime = ms => { const total = Math.max(0, Math.ceil(ms / 1000)); return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`; };

function render() {
  stepLabel.textContent = state.step === 6 ? "Inscrição concluída" : `Passo ${state.step} de 5`;
  progress.style.width = `${Math.min(state.step, 5) * 20}%`;
  const views = { 1: periodView, 2: detailsView, 3: committeeView, 4: countryView, 5: confirmationView, 6: successView };
  stage.innerHTML = views[state.step]();
  if (state.step === 5 && currentReservation()) startTimer();
}

function periodView() { return `
  <div class="choice-stack">
    <button class="choice" data-period="Manhã" type="button"><span class="choice-title">Manhã</span><span class="choice-arrow">→</span></button>
    <button class="choice" data-period="Tarde" type="button"><span class="choice-title">Tarde</span><span class="choice-arrow">→</span></button>
  </div>
  `; }

function detailsView() {
  return `${periodBadge()}<p class="eyebrow">DADOS DA DUPLA</p>
  <form id="details-form" novalidate><div class="form-grid">
    ${field("personOne", "Nome do 1º integrante", "Nome completo", state.personOne)}
    ${classField("classOne", "Turma do 1º integrante", state.classOne)}
    ${field("personTwo", "Nome do 2º integrante", "Nome completo", state.personTwo)}
    ${classField("classTwo", "Turma do 2º integrante", state.classTwo)}
  </div><p id="form-error" class="error" role="alert"></p><div class="actions"><button class="button secondary" type="button" data-action="back">Voltar</button><button class="button primary" type="submit">Escolher comitê</button></div></form>`;
}
function field(name, label, placeholder, value) { return `<div class="field"><label for="${name}">${label}</label><input id="${name}" name="${name}" value="${escapeHtml(value)}" placeholder="${placeholder}" autocomplete="name" required /></div>`; }
function classField(name, label, value) { return `<div class="field"><label for="${name}">${label}</label><select id="${name}" name="${name}" required><option value="">Selecione sua turma</option>${sampleClasses.map(item => `<option value="${item}" ${value === item ? "selected" : ""}>${item}</option>`).join("")}</select></div>`; }
function periodBadge() { return `<div class="period-badge" aria-label="Período escolhido">Período escolhido <strong>${state.period}</strong></div>`; }

function committeeView() {
  const options = Object.keys(committees).map((name, index) => `<button class="committee-chip" type="button" aria-pressed="${state.committee === name}" data-committee="${name}">${index + 1}. ${name}</button>`).join("");
  return `${periodBadge()}<p class="eyebrow">ESCOLHA DO COMITÊ</p><div class="committee-select compact" role="group" aria-label="Escolha um comitê">${options}</div><div class="actions"><button class="button secondary" type="button" data-action="back">Voltar</button><button class="button primary" type="button" data-action="continue-committee" ${state.committee ? "" : "disabled"}>Ver países</button></div>`;
}

function countryView() {
  const countries = committees[state.committee].map(country => {
    const isUnavailable = unavailable.has(`${state.committee}|${country}`);
    return `<button class="country ${isUnavailable ? "unavailable" : "available"}" type="button" ${isUnavailable ? "disabled" : ""} data-country="${country}"><span><img class="flag" src="https://flagcdn.com/w80/${flagCodes[country] || "un"}.png" srcset="https://flagcdn.com/w160/${flagCodes[country] || "un"}.png 2x" alt="" />${country}</span><small>${isUnavailable ? "Indisponível" : "Reservar"}</small></button>`;
  }).join("");
  return `${periodBadge()}<h1 class="committee-title">${state.committee}</h1><div class="country-list compact-list">${countries}</div><div class="actions"><button class="button secondary" type="button" data-action="back">Voltar</button></div>`;
}

function confirmationView() { return `${periodBadge()}<p class="eyebrow">VAGA RESERVADA <span class="timer" id="timer">05:00</span></p><h1>Revise antes de confirmar.</h1><div class="confirmation"><h2><img class="flag flag-large" src="https://flagcdn.com/w80/${flagCodes[state.country] || "un"}.png" srcset="https://flagcdn.com/w160/${flagCodes[state.country] || "un"}.png 2x" alt="" />${state.country}</h2><p class="lead">${state.committee} · ${state.period}</p><div class="confirmation-grid"><div><small>Integrante 1</small><strong>${escapeHtml(state.personOne)}</strong><span>${escapeHtml(state.classOne)}</span></div><div><small>Integrante 2</small><strong>${escapeHtml(state.personTwo)}</strong><span>${escapeHtml(state.classTwo)}</span></div></div></div><div class="reserve-strip"><strong>Importante:</strong> após confirmar, apenas a organização poderá alterar a inscrição.</div><div class="actions"><button class="button secondary" type="button" data-action="release">Trocar país</button><button class="button primary" type="button" data-action="confirm">Confirmar inscrição</button></div>`; }

function successView() { return `${periodBadge()}<div class="success-mark">✓</div><p class="eyebrow">INSCRIÇÃO CONFIRMADA</p><h1>Até a próxima sessão.</h1><p class="lead">Sua dupla foi inscrita para representar <strong>${state.country}</strong> no comitê ${state.committee}, período da ${state.period.toLowerCase()}.</p><div class="confirmation"><h2><img class="flag flag-large" src="https://flagcdn.com/w80/${flagCodes[state.country] || "un"}.png" srcset="https://flagcdn.com/w160/${flagCodes[state.country] || "un"}.png 2x" alt="" />${state.country} · ${state.committee}</h2><p class="lead">${escapeHtml(state.personOne)} e ${escapeHtml(state.personTwo)}</p></div><p class="note"><strong>✓</strong><span>Guarde esta confirmação. Caso precise corrigir algo, procure a organização do evento.</span></p>`; }

function startTimer() { const el = document.querySelector("#timer"); const tick = () => { if (!currentReservation()) { state.country = ""; state.step = 3; render(); return; } if (el) { el.textContent = formatTime(state.reservationUntil - Date.now()); window.setTimeout(tick, 1000); } }; tick(); }

document.addEventListener("click", event => {
  const button = event.target.closest("button"); if (!button) return;
  if (button.dataset.period) { state.period = button.dataset.period; state.step = 2; render(); }
  if (button.dataset.committee) { state.committee = button.dataset.committee; render(); }
  if (button.dataset.country) { state.country = button.dataset.country; state.reservationUntil = Date.now() + 5 * 60 * 1000; state.step = 5; render(); }
  if (button.dataset.action === "continue-committee" && state.committee) { state.step = 4; render(); }
  if (button.dataset.action === "back") { state.step = Math.max(1, state.step - 1); render(); }
  if (button.dataset.action === "release") { state.country = ""; state.reservationUntil = 0; state.step = 4; render(); }
  if (button.dataset.action === "confirm") { state.step = 6; render(); }
  if (button.dataset.action === "help") dialog.showModal();
  if (button.dataset.action === "close-help") dialog.close();
});

document.addEventListener("submit", event => { if (event.target.id !== "details-form") return; event.preventDefault(); const data = new FormData(event.target); ["personOne", "classOne", "personTwo", "classTwo"].forEach(key => state[key] = String(data.get(key) || "").trim()); const error = document.querySelector("#form-error"); if (!state.personOne || !state.classOne || !state.personTwo || !state.classTwo) { error.textContent = "Preencha os dados dos dois integrantes para continuar."; return; } state.step = 3; render(); });

render();
