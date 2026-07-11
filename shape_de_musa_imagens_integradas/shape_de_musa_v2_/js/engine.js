/* ==========================================================================
   SHAPE DE MUSA — MOTOR DEL QUIZ
   ----------------------------------------------------------------------
   Maneja: navegación entre pantallas, estado de respuestas, barra de
   progreso, renderizado de cada tela a partir de CONTENT (content.js).
   ========================================================================== */

const ICONS = {
  check:  `<svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  image:  `<svg width="30" height="30" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" stroke-width="1.6"/><circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" stroke-width="1.6"/><path d="M21 15l-5-5-9 9" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  play:   `<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7-11-7z"/></svg>`,
  arrow:  `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  flame:  `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2c1 4-4 5-4 9a4 4 0 008 0c0-1.5-1-2.5-1-4 2 1 3 3 3 5a6 6 0 01-12 0c0-5 4-6 6-10z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`,
  spark:  `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2l2 7 7 2-7 2-2 7-2-7-7-2 7-2 2-7z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>`,
  curve:  `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M5 20c0-8 4-16 9-16s2 10-2 10-2-6 3-6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
  heart:  `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 20s-7-4.4-9.5-9C.9 7.8 2.6 4 6.2 4 8.4 4 10.2 5.4 12 7.6 13.8 5.4 15.6 4 17.8 4c3.6 0 5.3 3.8 3.7 7-2.5 4.6-9.5 9-9.5 9z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`,
  target: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="12" r="1" fill="currentColor"/></svg>`,
  layers: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 3l9 5-9 5-9-5 9-5z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M3 13l9 5 9-5" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`,
  clock:  `<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6"/><path d="M12 7v5l3.5 2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
  plus:   `<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>`,
};

/* -------------------------------------------------------------------------
   ORDEN DE PANTALLAS (24 telas, según la estructura del brief)
   ------------------------------------------------------------------------- */
const SCREEN_ORDER = [
  "hero",
  "q_edad", "q_objetivo", "q_cuerpo_actual", "q_cuerpo_deseado",
  "educativo", "antes_despues",
  "q_rutina", "q_dificultad", "q_tiempo", "q_alimentacion", "q_autoestima",
  "processing", "resultado", "explicacion", "metodo",
  "beneficios", "incluye", "prueba_social", "vsl",
  "oferta", "garantia", "faq", "cta_final",
];

const QUESTION_IDS = ["edad","objetivo","cuerpo_actual","cuerpo_deseado","rutina","dificultad","tiempo","alimentacion","autoestima"];

const state = {
  index: 0,
  answers: {},
};

function getQuestion(id){ return CONTENT.questions.find(q => q.id === id); }

function placeholder(kind, label, extraClass=""){
  return `<div class="ph-image ${extraClass}">${ICONS.image}<span class="ph-image__label">${label}</span></div>`;
}

function imageOrPlaceholder(img, label, extraClass=""){
  if(img){ return `<div class="ph-image ${extraClass}" style="border:none;background:none;padding:0;"><img src="${img}" alt="${label}" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;"></div>`; }
  return placeholder("image", label, extraClass);
}


/* ==========================================================================
   DIAGNÓSTICO PERSONALIZADO
   Usa las respuestas existentes sin alterar el orden ni la estructura del quiz.
   ========================================================================== */
function buildDiagnosis(){
  const a = state.answers;

  const objectiveMap = {
    perder_grasa: "Perder grasa corporal",
    tonificar: "Tonificar y definir",
    gluteos: "Aumentar glúteos y piernas",
    salud: "Mejorar postura y salud general",
  };

  const levelMap = {
    sedentaria: { name: "Inicial", frequency: "3 días por semana" },
    ocasional:  { name: "Inicial", frequency: "3 días por semana" },
    regular:    { name: "Intermedio", frequency: "4 días por semana" },
    intensa:    { name: "Avanzado", frequency: "5 días por semana" },
  };

  const timeMap = {
    "15": "15 minutos por sesión",
    "30": "30 minutos por sesión",
    "45": "45 minutos por sesión",
    "60+": "60 minutos por sesión",
  };

  const strategyMap = {
    perder_grasa: "Entrenamiento progresivo de cuerpo completo, fuerza y actividad cardiovascular estratégica.",
    tonificar: "Trabajo de fuerza equilibrado para definición, firmeza y progresión semanal.",
    gluteos: "Prioridad en glúteos y piernas, combinada con trabajo de tren superior para mantener equilibrio corporal.",
    salud: "Rutina global con foco en movilidad, postura, fuerza y aumento gradual de energía.",
  };

  const difficultyMap = {
    tiempo: "Sesiones objetivas y fáciles de encajar en tu rutina.",
    motivacion: "Metas semanales simples para ayudarte a mantener la constancia.",
    no_se_que_hacer: "Una secuencia clara de ejercicios para que sepas exactamente qué hacer.",
    ansiedad: "Hábitos de alimentación flexibles, sin restricciones extremas.",
  };

  const nutritionMap = {
    desordenada: "Empezar por una estructura alimentaria simple y sostenible.",
    intento: "Organizar tus comidas para mejorar la constancia sin buscar perfección.",
    sin_resultado: "Revisar porciones, proteína y regularidad para acompañar el entrenamiento.",
    plan: "Mantener tu base actual y ajustarla según tu progreso.",
  };

  const level = levelMap[a.rutina] || levelMap.sedentaria;
  const objective = objectiveMap[a.objetivo] || objectiveMap.perder_grasa;
  const sessionTime = timeMap[a.tiempo] || "30 minutos por sesión";
  const program = `${objective} — Nivel ${level.name}`;

  // Indicador visual de compatibilidad; no representa una evaluación médica.
  let match = 88;
  if(a.rutina === "regular" || a.rutina === "intensa") match += 3;
  if(a.alimentacion === "intento" || a.alimentacion === "plan") match += 2;
  if(a.tiempo === "30" || a.tiempo === "45" || a.tiempo === "60+") match += 2;
  match = Math.min(95, match);

  return {
    objective,
    level: level.name,
    frequency: level.frequency,
    sessionTime,
    program,
    strategy: strategyMap[a.objetivo] || strategyMap.perder_grasa,
    difficulty: difficultyMap[a.dificultad] || difficultyMap.no_se_que_hacer,
    nutrition: nutritionMap[a.alimentacion] || nutritionMap.intento,
    match,
  };
}

/* ==========================================================================
   RENDER PRINCIPAL
   ========================================================================== */
function renderScreen(){
  const key = SCREEN_ORDER[state.index];
  const app = document.getElementById("app");
  app.innerHTML = RENDERERS[key]();
  window.scrollTo(0,0);
  updateChrome(key);
  bindScreenEvents(key);
  if(key === "resultado") trackEvent("ViewContent", { content_name: "Resultado Quiz Shape de Musa" });
  if(key === "oferta") trackEvent("ViewContent", { content_name: "Oferta Shape de Musa" });
}

function updateChrome(key){
  const progressBar = document.getElementById("progressBar");
  const backBtn = document.getElementById("btnBack");

  // Barra de progreso fixa: escondida apenas na abertura.
  // Depois disso, acompanha toda a jornada sem sair do topo.
  const totalSteps = SCREEN_ORDER.length - 1;
  const pct = Math.max(0, Math.min(100, Math.round((state.index / totalSteps) * 100)));
  document.getElementById("progressFill").style.width = pct + "%";
  progressBar.classList.toggle("is-visible", key !== "hero");

  // Botão voltar: visível antes do processamento/resultado.
  const canGoBack = state.index > 0 && key !== "processing" && SCREEN_ORDER.indexOf(key) < SCREEN_ORDER.indexOf("resultado");
  backBtn.classList.toggle("is-visible", canGoBack);
}

function goNext(){
  if(state.index < SCREEN_ORDER.length - 1){
    state.index++;
    renderScreen();
  }
}
function goBack(){
  if(state.index > 0){
    state.index--;
    renderScreen();
  }
}
function trackEvent(name, params = {}){
  // Pronto para Meta Pixel: se existir fbq na página, dispara o evento.
  // Ex.: ViewContent, Lead, InitiateCheckout.
  if(typeof window.fbq === "function"){
    window.fbq("track", name, params);
  }
}

function goCheckout(){
  trackEvent("InitiateCheckout", { content_name: CONTENT.brand.name });
  const url = CONTENT.checkoutUrl;
  if(url && !url.includes("COLOCAR_LINK_DO_CHECKOUT_AQUI")){
    window.location.href = url;
  }else{
    alert("Colocá tu link de checkout en js/content.js → checkoutUrl");
  }
}

function selectAnswer(questionId, optionId){
  state.answers[questionId] = optionId;
  if(Object.keys(state.answers).length === 1){
    trackEvent("Lead", { content_name: "Quiz Shape de Musa" });
  }
  setTimeout(goNext, 220); // pequeña pausa para mostrar la selección antes de avanzar
}

/* ==========================================================================
   RENDERERS POR TELA
   ========================================================================== */
const RENDERERS = {

  hero(){
    const h = CONTENT.hero;
    return `
    <section class="screen hero">
      <div class="screen__inner">
        <div class="hero__logo">${h.logo}</div>
        <div class="hero__image">${imageOrPlaceholder(h.img, "Foto principal", "ph-image--hero")}</div>
        <h1 class="hero__title title-xl">${h.title}</h1>
        <p class="hero__subtitle subtitle">${h.subtitle}</p>
        <ul class="hero__benefits">
          ${h.benefits.map(b => `<li><span class="check">${ICONS.check}</span>${b}</li>`).join("")}
        </ul>
        <button class="btn btn-primary" id="heroCta">${h.cta} ${ICONS.arrow}</button>
        <div class="hero__meta">★★★★★ &nbsp;${h.meta}</div>
      </div>
    </section>`;
  },

  educativo(){
    const e = CONTENT.educational;
    return `
    <section class="screen">
      <div class="screen__inner">
        <span class="eyebrow">${e.eyebrow}</span>
        <h2 class="title-l">${e.title}</h2>
        <p class="subtitle">${e.subtitle}</p>
        <div class="edu-block">
          ${e.items.map(it => `
            <div class="edu-item">
              <div class="edu-item__icon">${ICONS[it.icon] || ICONS.target}</div>
              <div>
                <div class="edu-item__title">${it.title}</div>
                <div class="edu-item__text">${it.text}</div>
              </div>
            </div>`).join("")}
        </div>
        <div class="btn-sticky-wrap"><button class="btn btn-primary" id="nextBtn">${e.cta} ${ICONS.arrow}</button></div>
      </div>
    </section>`;
  },

  antes_despues(){
    const b = CONTENT.beforeAfter;
    return `
    <section class="screen">
      <div class="screen__inner">
        <span class="eyebrow">${b.eyebrow}</span>
        <h2 class="title-l">${b.title}</h2>
        <div class="carousel">
          <div class="carousel__track" id="carTrack">
            ${b.slides.map(s => `
              <div class="carousel__slide">
                <div class="carousel__images ${s.img ? "carousel__images--single" : ""}">
                  ${s.img
                    ? imageOrPlaceholder(s.img, `${s.name} — antes y después`, "ph-image--transformation")
                    : `${imageOrPlaceholder(s.imgBefore, "Antes", "ph-image--portrait")}${imageOrPlaceholder(s.imgAfter, "Después", "ph-image--portrait")}`}
                </div>
                <div class="carousel__stars">${"★".repeat(s.stars)}</div>
                <div class="carousel__name">${s.name}</div>
                <div class="carousel__quote">"${s.quote}"</div>
              </div>`).join("")}
          </div>
          <div class="carousel__dots" id="carDots">
            ${b.slides.map((_,i)=>`<span class="${i===0?'is-active':''}"></span>`).join("")}
          </div>
        </div>
        <div class="btn-sticky-wrap"><button class="btn btn-primary" id="nextBtn">${b.cta} ${ICONS.arrow}</button></div>
      </div>
    </section>`;
  },

  processing(){
    const p = CONTENT.processing;
    return `
    <section class="screen processing">
      <div class="screen__inner">
        <div class="processing__ring">
          <svg width="150" height="150" viewBox="0 0 150 150">
            <defs>
              <linearGradient id="gradRing" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#7C3AED"/><stop offset="100%" stop-color="#E8639F"/>
              </linearGradient>
            </defs>
            <circle class="track" cx="75" cy="75" r="64"/>
            <circle class="fill" id="ringFill" cx="75" cy="75" r="64"/>
          </svg>
          <div class="processing__pct" id="ringPct">0%</div>
        </div>
        <p class="title-m" style="text-align:center; max-width:320px; margin:0 auto 28px;">${p.title}</p>
        <div class="processing__steps" id="procSteps">
          ${p.steps.map((s,i) => `<div class="processing__step" data-step="${i}"><span class="dot">${ICONS.check}</span>${s}</div>`).join("")}
        </div>
      </div>
    </section>`;
  },

  resultado(){
    const r = CONTENT.results;
    const objetivo = state.answers.objetivo || "perder_grasa";
    const profile = r.profiles[objetivo] || r.profiles.perder_grasa;
    const diagnosis = buildDiagnosis();
    return `
    <section class="screen">
      <div class="screen__inner">
        <span class="eyebrow" style="align-self:center;">Tu resultado está listo</span>
        <div class="result__match">
          <div class="eyebrow" style="background:transparent;padding:0;">${profile.badge}</div>
          <h1 class="title-xl">${profile.title}</h1>
        </div>
        <div class="result__matchbar"><div class="result__matchbar-fill" id="matchFill" data-match="${diagnosis.match}"></div></div>
        <div class="result__matchlabel">${diagnosis.match}% ${r.matchLabel}</div>
        ${r.image ? imageOrPlaceholder(r.image, r.imageAlt || "Resultado personalizado", "ph-image--result") : ""}
        <div class="result__card">
          <h3>Qué significa esto para vos</h3>
          <p>${profile.text}</p>
        </div>

        <div class="diagnosis-card" id="diagnosisCard">
          <div class="diagnosis-card__head">
            <span class="diagnosis-card__kicker">TU PLAN RECOMENDADO</span>
            <h3>Diagnóstico personalizado</h3>
            <p>Esta recomendación fue definida a partir de las respuestas que completaste en el test.</p>
          </div>
          <div class="diagnosis-grid">
            <div class="diagnosis-item"><span>Objetivo principal</span><strong>${diagnosis.objective}</strong></div>
            <div class="diagnosis-item"><span>Nivel identificado</span><strong>${diagnosis.level}</strong></div>
            <div class="diagnosis-item"><span>Frecuencia sugerida</span><strong>${diagnosis.frequency}</strong></div>
            <div class="diagnosis-item"><span>Tiempo por sesión</span><strong>${diagnosis.sessionTime}</strong></div>
          </div>
          <div class="diagnosis-program">
            <span>Programa indicado</span>
            <strong>${diagnosis.program}</strong>
          </div>
          <div class="diagnosis-notes">
            <div><b>Estrategia de entrenamiento:</b> ${diagnosis.strategy}</div>
            <div><b>Ajuste para tu principal dificultad:</b> ${diagnosis.difficulty}</div>
            <div><b>Orientación alimentaria:</b> ${diagnosis.nutrition}</div>
          </div>
          <p class="diagnosis-card__hint">Guardá este resultado para recordar qué nivel seguir dentro del área de miembros.</p>
          <button class="btn btn-secondary diagnosis-save" id="saveDiagnosisBtn" type="button">Guardar mi diagnóstico</button>
        </div>

        <div class="btn-sticky-wrap"><button class="btn btn-primary" id="nextBtn">${r.cta} ${ICONS.arrow}</button></div>
      </div>
    </section>`;
  },

  explicacion(){
    const e = CONTENT.explanation;
    return `
    <section class="screen">
      <div class="screen__inner">
        <span class="eyebrow">${e.eyebrow}</span>
        <h2 class="title-l">${e.title}</h2>
        <div style="display:flex; flex-direction:column; gap:14px; margin:6px 0 24px;">
          ${e.paragraphs.map(p => `<p class="subtitle" style="margin-bottom:0;">${p}</p>`).join("")}
        </div>
        <div class="btn-sticky-wrap"><button class="btn btn-primary" id="nextBtn">${e.cta} ${ICONS.arrow}</button></div>
      </div>
    </section>`;
  },

  metodo(){
    const m = CONTENT.method;
    return `
    <section class="screen">
      <div class="screen__inner">
        <span class="eyebrow">${m.eyebrow}</span>
        <h2 class="title-l">${m.title}</h2>
        <div class="author-card">
          ${imageOrPlaceholder(CONTENT.brand.authorImg, "Aline Pamplona")}
          <div>
            <div class="author-card__name">${CONTENT.brand.author}</div>
            <div class="author-card__role">${CONTENT.brand.authorRole}</div>
          </div>
        </div>
        <p class="subtitle italic" style="margin-bottom:20px;">"${m.authorQuote}"</p>
        <div class="instagram-proof">
    <img src="${m.instagram}" alt="Instagram Aline Pamplona">
</div>
        

</div>
        <div class="pillars">
          ${m.pillars.map(p => `
            <div class="pillar">
              <div class="pillar__num">${p.num}</div>
              <div>
                <div class="pillar__title">${p.title}</div>
                <div class="pillar__text">${p.text}</div>
              </div>
            </div>`).join("")}
        </div>
        <div class="btn-sticky-wrap"><button class="btn btn-primary" id="nextBtn">Ver todos los beneficios ${ICONS.arrow}</button></div>
      </div>
    </section>`;
  },

  beneficios(){
    const b = CONTENT.benefits;
    return `
    <section class="screen">
      <div class="screen__inner">
        <h2 class="title-l">${b.title}</h2>
        <div class="benefits">
          ${b.items.map(t => `<div class="benefit"><span class="benefit__icon">${ICONS.check}</span><span class="benefit__text">${t}</span></div>`).join("")}
        </div>
        <div class="btn-sticky-wrap"><button class="btn btn-primary" id="nextBtn">Quiero lograr esto ${ICONS.arrow}</button></div>
      </div>
    </section>`;
  },

  incluye(){
    const i = CONTENT.includes;
    return `
    <section class="screen">
      <div class="screen__inner">
        <h2 class="title-l">${i.title}</h2>
        <div class="includes">
          ${i.items.map(it => `
            <div class="include-item">
              <span class="include-item__check">${ICONS.check}</span>
              <div>
                <div class="include-item__title">${it.title}</div>
                <div class="include-item__sub">${it.sub}</div>
              </div>
            </div>`).join("")}
        </div>
        <div class="btn-sticky-wrap"><button class="btn btn-primary" id="nextBtn">Ver testimonios ${ICONS.arrow}</button></div>
      </div>
    </section>`;
  },

  prueba_social(){
    const s = CONTENT.socialProof;
    return `
    <section class="screen">
      <div class="screen__inner">
        <h2 class="title-l">${s.title}</h2>
        <div class="stats-row">
          ${s.stats.map(st => `<div class="stat"><div class="stat__num">${st.num}</div><div class="stat__label">${st.label}</div></div>`).join("")}
        </div>
        <div class="testimonials">
          ${s.testimonials.map(t => `
            <div class="testimonial">
              <div class="testimonial__head">
                ${imageOrPlaceholder(t.img, t.name, "testimonial__avatar")}
                <div>
                  <div class="testimonial__name">${t.name}</div>
                  <div class="testimonial__stars">${"★".repeat(t.stars)}</div>
                </div>
              </div>
              <div class="testimonial__text">"${t.text}"</div>
            </div>`).join("")}
        </div>
        <div class="btn-sticky-wrap"><button class="btn btn-primary" id="nextBtn">Seguir ${ICONS.arrow}</button></div>
      </div>
    </section>`;
  },

  videos(){
    const v = CONTENT.videos;
    return `
    <section class="screen">
      <div class="screen__inner">
        <h2 class="title-l">${v.title}</h2>
        <div class="ph-video">
          <div class="ph-video__play">${ICONS.play}</div>
          <div class="ph-video__label">${v.mainLabel}</div>
        </div>
        <p class="subtitle" style="margin:20px 0 10px; font-weight:700; color:var(--ink);">${v.testimonialsLabel}</p>
        <div style="display:flex; gap:12px; overflow-x:auto; padding-bottom:6px;">
          ${[1,2,3].map(() => `<div class="ph-video" style="max-width:130px; flex:0 0 130px;"><div class="ph-video__play" style="width:42px;height:42px;">${ICONS.play}</div></div>`).join("")}
        </div>
        <div class="btn-sticky-wrap"><button class="btn btn-primary" id="nextBtn">Ver mi oferta ${ICONS.arrow}</button></div>
      </div>
    </section>`;
  },

vsl() {
  const c = CONTENT.vsl;

  return `
    <section class="screen-inner screen-inner--vsl">
      <span class="vsl-eyebrow">${c.eyebrow}</span>

      <h2 class="vsl-title">${c.title}</h2>

      <p class="vsl-subtitle">${c.subtitle}</p>

      <div class="vsl-player">
  <iframe
    class="vsl-video"
    src="${c.video}"
    title="Video de presentación"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen
  ></iframe>
</div>
      <p class="vsl-status" id="vslStatus">
        ⏳ ${c.waitingText}
      </p>

      <button
    type="button"
    class="btn btn-primary vsl-button"
    id="vslNextButton">
        ${c.unlockedButton}
      </button>
    </section>
  `;
},
  oferta(){
    const o = CONTENT.offer;
    return `
    <section class="screen">
      <div class="screen__inner">
        <div class="offer-timer"><span class="offer-timer__dot"></span> ${o.timer} <strong id="timerText">14:59</strong></div>
        <div class="offer-card">
          <div class="offer-card__eyebrow">${o.eyebrow}</div>
          <h2 class="offer-card__title">${o.title || "Accedé al Método Shape de Musa"}</h2>
          <p class="offer-card__subtitle">${o.subtitle || "Tu recomendación ya está lista."}</p>
          <div class="offer-card__price-row">
            <span class="offer-card__old">${o.oldPrice}</span>
            <span class="offer-card__new">${o.newPrice}</span>
          </div>
          <div class="offer-card__cycle">${o.cycle}</div>
          <ul class="offer-card__perks">
            ${o.perks.map(p => `<li><span style="color:var(--violet);">${ICONS.check}</span>${p}</li>`).join("")}
          </ul>
          <button class="btn btn-primary" id="checkoutBtn">${o.cta} ${ICONS.arrow}</button>
          <button class="btn btn-link" id="nextBtn" type="button">Ver garantía primero</button>
          <div class="offer-card__cycle" style="margin-top:12px;">${o.subtext}</div>
        </div>
      </div>
    </section>`;
  },

  garantia(){
    const g = CONTENT.guarantee;
    return `
    <section class="screen">
      <div class="screen__inner">
        <div class="guarantee-card">
          <div class="guarantee-card__seal">${ICONS.check}</div>
          <h2 class="title-m">${g.title}</h2>
          <p class="subtitle" style="margin-bottom:0;">${g.text}</p>
        </div>
        <div class="btn-sticky-wrap"><button class="btn btn-primary" id="nextBtn">Continuar ${ICONS.arrow}</button></div>
      </div>
    </section>`;
  },

  faq(){
    const f = CONTENT.faq;
    return `
    <section class="screen">
      <div class="screen__inner">
        <h2 class="title-l">Preguntas frecuentes</h2>
        <div class="faq-list" id="faqList">
          ${f.map((item,i) => `
            <div class="faq-item" data-i="${i}">
              <button class="faq-item__q">${item.q}<span class="faq-item__icon">${ICONS.plus}</span></button>
              <div class="faq-item__a">${item.a}</div>
            </div>`).join("")}
        </div>
        <div class="btn-sticky-wrap"><button class="btn btn-primary" id="nextBtn">Ir a mi Método ${ICONS.arrow}</button></div>
      </div>
    </section>`;
  },

  cta_final(){
    const c = CONTENT.finalCta;
    return `
    <section class="screen final-cta">
      <div class="screen__inner">
        <div class="final-cta__urgency">${c.urgency}</div>
        <h1 class="title-xl">${c.title}</h1>
        <p class="subtitle">${c.subtitle}</p>
        ${imageOrPlaceholder(CONTENT.brand.authorImg, "Aline Pamplona", "ph-image--wide")}
        <div class="btn-sticky-wrap" style="margin-top:24px;"><button class="btn btn-primary" id="finalCtaBtn">${c.cta} ${ICONS.arrow}</button></div>
      </div>
    </section>`;
  },
};

// Generador de renderers para las 9 pantallas de pregunta (q_*)
QUESTION_IDS.forEach(qid => {
  RENDERERS["q_" + qid] = function(){
    const q = getQuestion(qid);
    const selected = state.answers[qid];
    if(q.type === "grid"){
      return `
      <section class="screen">
        <div class="screen__inner">
          <div class="q-counter">Pregunta ${q.step} de ${QUESTION_IDS.length}</div>
          <h2 class="title-l">${q.title}</h2>
          <p class="subtitle">${q.subtitle}</p>
          <div class="options-grid">
            ${q.options.map(o => `
              <button class="option-card ${selected===o.id?'is-selected':''}" data-q="${qid}" data-o="${o.id}">
                ${imageOrPlaceholder(o.image || o.img || "", o.label)}
                <div class="option-card__row">
                  <span class="option-card__text">${o.label}</span>
                  <span class="option__radio"></span>
                </div>
              </button>`).join("")}
          </div>
        </div>
      </section>`;
    }
    return `
    <section class="screen">
      <div class="screen__inner">
        <div class="q-counter">Pregunta ${q.step} de ${QUESTION_IDS.length}</div>
        <h2 class="title-l">${q.title}</h2>
        <p class="subtitle">${q.subtitle}</p>
        <div class="options">
          ${q.options.map(o => `
            <button class="option ${selected===o.id?'is-selected':''}" data-q="${qid}" data-o="${o.id}">
              ${q.withThumb ? `<span class="option__thumb option__thumb--image">${(o.image || o.img) ? `<img src="${o.image || o.img}" alt="${o.label}">` : ICONS.image}</span>` : (o.icon ? `<span class="option__thumb">${ICONS[o.icon]}</span>` : "")}
              <span class="option__text">${o.label}</span>
              <span class="option__radio"></span>
            </button>`).join("")}
        </div>
      </div>
    </section>`;
  };
});

/* ==========================================================================
   EVENTOS POR TELA
   ========================================================================== */

/* Drag com mouse para carrossel em desktop.
   No celular o swipe nativo já funciona; isso ajuda no PC/Live Server. */
function enableDragScroll(track){
  if(!track) return;

  let isDown = false;
  let startX = 0;
  let startY = 0;
  let scrollLeft = 0;
  let draggingHorizontal = false;

  track.addEventListener("pointerdown", (e) => {
    isDown = true;
    draggingHorizontal = false;

    startX = e.clientX;
    startY = e.clientY;
    scrollLeft = track.scrollLeft;

    track.classList.add("is-dragging");
  });

  track.addEventListener("pointermove", (e) => {
    if(!isDown) return;

    const diffX = e.clientX - startX;
    const diffY = e.clientY - startY;

    /*
      Só considera arraste horizontal quando
      o movimento para o lado for maior que o vertical
    */
    if(Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 6){
      draggingHorizontal = true;
      e.preventDefault();

      const walk = diffX * 1.2;
      track.scrollLeft = scrollLeft - walk;
    }
  });

  ["pointerup", "pointercancel", "pointerleave"].forEach(evt => {
    track.addEventListener(evt, () => {
      isDown = false;
      draggingHorizontal = false;
      track.classList.remove("is-dragging");
    });
  });
}

function bindScreenEvents(key){
  // Preguntas: selección única con auto-avance
  document.querySelectorAll(".option[data-q], .option-card[data-q]").forEach(el => {
    el.addEventListener("click", () => {
      const { q, o } = el.dataset;
      document.querySelectorAll(`[data-q="${q}"]`).forEach(n => n.classList.remove("is-selected"));
      el.classList.add("is-selected");
      selectAnswer(q, o);
    });
  });

  // Botones genéricos de avance
  const nextBtn = document.getElementById("nextBtn");
  if(nextBtn) nextBtn.addEventListener("click", goNext);
  const heroCta = document.getElementById("heroCta");
  if(heroCta) heroCta.addEventListener("click", goNext);
  const finalCtaBtn = document.getElementById("finalCtaBtn");
  if(finalCtaBtn) finalCtaBtn.addEventListener("click", goCheckout);
  const checkoutBtn = document.getElementById("checkoutBtn");
  if(checkoutBtn) checkoutBtn.addEventListener("click", goCheckout);

  // Carrusel: dots sincronizados con el scroll
  if(key === "antes_despues"){
    const track = document.getElementById("carTrack");
    const dots = document.querySelectorAll("#carDots span");
    enableDragScroll(track);
    track.addEventListener("scroll", () => {
      const idx = Math.round(track.scrollLeft / track.firstElementChild.getBoundingClientRect().width);
      dots.forEach((d,i) => d.classList.toggle("is-active", i===idx));
    });
  }

  // Procesamiento: animación de progreso + pasos + avance automático
  if(key === "processing"){
    const ring = document.getElementById("ringFill");
    const pctLabel = document.getElementById("ringPct");
    const steps = document.querySelectorAll(".processing__step");
    const CIRC = 402;
    let pct = 0;
    const totalMs = 3400;
    const stepMs = totalMs / steps.length;

    steps.forEach((s,i) => setTimeout(() => s.classList.add("is-active"), i*stepMs));

    const start = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      pct = Math.min(100, Math.round((elapsed/totalMs)*100));
      ring.style.strokeDashoffset = CIRC - (CIRC*pct/100);
      pctLabel.textContent = pct + "%";
      if(pct >= 100){
        clearInterval(timer);
        setTimeout(goNext, 500);
      }
    }, 60);
  }

  // Resultado: barra de compatibilidad animada
  if(key === "resultado"){
    requestAnimationFrame(() => {
      setTimeout(() => {
        const fill = document.getElementById("matchFill");
        if(fill) fill.style.width = (fill.dataset.match || CONTENT.results.matchPercent) + "%";
      }, 200);
    });
  }

  if(key === "resultado"){
    const saveBtn = document.getElementById("saveDiagnosisBtn");
    if(saveBtn){
      saveBtn.addEventListener("click", () => {
        window.print();
      });
    }
  }
// ===========================
// VSL
// ===========================

if(key === "vsl"){

    const status = document.getElementById("vslStatus");
const button = document.getElementById("vslNextButton");

if(status){
    status.innerHTML = "✅ Ya podés continuar cuando quieras.";
}

if(button){
    button.hidden = false;
    button.addEventListener("click", goNext);
}

}
  // Oferta: cuenta regresiva de escasez (15 min)
  if(key === "oferta"){
    let remaining = 15*60;
    const el = document.getElementById("timerText");
    const timer = setInterval(() => {
      remaining--;
      if(remaining <= 0 || !document.body.contains(el)){ clearInterval(timer); return; }
      const m = String(Math.floor(remaining/60)).padStart(2,"0");
      const s = String(remaining%60).padStart(2,"0");
      el.textContent = `${m}:${s}`;
    }, 1000);
  }

  // FAQ: acordeón
  if(key === "faq"){
    document.querySelectorAll(".faq-item").forEach(item => {
      item.querySelector(".faq-item__q").addEventListener("click", () => {
        const wasOpen = item.classList.contains("is-open");
        document.querySelectorAll(".faq-item").forEach(i => i.classList.remove("is-open"));
        if(!wasOpen) item.classList.add("is-open");
      });
    });
  }
}
