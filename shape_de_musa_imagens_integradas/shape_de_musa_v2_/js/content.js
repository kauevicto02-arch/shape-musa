/* ==========================================================================
   SHAPE DE MUSA — CONTENIDO EDITABLE
   ----------------------------------------------------------------------
   TODO el texto, las preguntas, los testimonios y la data del funnel
   viven en este único archivo. Para editar el quiz, editá solo esto.
   Las imágenes son placeholders: reemplazá el atributo `img` de cada
   objeto por la ruta real (ej: "assets/images/hero.jpg") cuando tengas
   tus archivos. Los placeholders se muestran solos mientras `img` esté
   vacío.
   ========================================================================== */

const CONTENT = {

  // Link único do checkout. Troque aqui uma vez e todos os botões de compra usam o mesmo link.
  checkoutUrl: "https://pay.hotmart.com/X106686414C?checkoutMode=10",

  brand: {
    name: "Shape de Musa",
    author: "Aline Pamplona",
    authorRole: "Creadora del Método Shape de Musa",
    authorImg: "assets/images/victoria-rossi.jpeg",
  },

  // ==========================================================================
  // TELA 1 — HERO
  // ==========================================================================
  hero: {
    logo: "SHAPE <span>DE MUSA</span>",
    img: "assets/images/hero.jpeg",
    title: "Descubrí qué está frenando tu cambio y cuál es el camino ideal para vos.",
    subtitle: "Respondé este test rápido y recibí una recomendación personalizada del Método Shape de Musa, creado por Aline Pamplona.",
    benefits: [
      "Evaluación gratuita en menos de 2 minutos",
      "Recomendación según tu cuerpo, rutina y objetivo",
      "Método simple, sin dietas extremas ni entrenamientos imposibles",
    ],
    cta: "Empezar mi diagnóstico gratis",
    meta: "★★★★★ Mujeres reales ya empezaron su proceso",
  },

  // ==========================================================================
  // TELAS 2 A 5 y 8 A 12 — PREGUNTAS
  // ==========================================================================
  questions: [
    {
      id: "edad",
      step: 1,
      title: "¿Cuántos años tenés?",
      subtitle: "Nos ayuda a ajustar la intensidad de tu plan.",
      type: "list",
      options: [
        { id: "18-24", label: "18 a 24 años" },
        { id: "25-34", label: "25 a 34 años" },
        { id: "35-44", label: "35 a 44 años" },
        { id: "45+",   label: "45 años o más" },
      ],
    },
    {
      id: "objetivo",
      step: 2,
      title: "¿Cuál es tu objetivo principal?",
      subtitle: "Elegí lo que más querés lograr hoy.",
      type: "list",
      options: [
        { id: "perder_grasa", label: "Perder grasa corporal", icon: "flame" },
        { id: "tonificar",    label: "Tonificar y definir",  icon: "spark" },
        { id: "gluteos",      label: "Aumentar glúteos y piernas", icon: "curve" },
        { id: "salud",        label: "Mejorar postura y salud general", icon: "heart" },
      ],
    },
    {
      id: "cuerpo_actual",
      step: 3,
      title: "¿Cómo describirías tu cuerpo actual?",
      subtitle: "Elegí la opción que más se parece a vos.",
      type: "list",
      withThumb: true,
      options: [
        { id: "delgada", label: "Delgada", img: "assets/images/magra.jpeg" },
        { id: "flacidez", label: "Normal con flacidez", img: "assets/images/normal.jpeg" },
        { id: "sobrepeso", label: "Con sobrepeso", img: "assets/images/sobrepeso.jpeg" },
        { id: "obesidad", label: "Obesidad", img: "assets/images/gorda.jpeg" },
      ],
    },
    {
      id: "cuerpo_deseado",
      step: 4,
      title: "¿Cómo te imaginás en 90 días?",
      subtitle: "Elegí el resultado que más te representa.",
      type: "grid",
      options: [
        { id: "tonificado",  label: "Más definida y tonificada", img: "assets/images/Tonificada.jpeg" },
        { id: "curvilineo",  label: "Más curvilínea", img: "assets/images/curva.jpeg" },
        { id: "esbelto",     label: "Más liviana y esbelta", img: "assets/images/slim.jpeg" },
        { id: "fuerte",      label: "Fuerte y firme", img: "assets/images/forte.jpeg" },
      ],
    },
    {
      id: "rutina",
      step: 5,
      title: "¿Cómo es tu rutina de actividad física hoy?",
      subtitle: "Sé honesta, esto queda solo entre nosotras.",
      type: "list",
      options: [
        { id: "sedentaria", label: "Sedentaria, casi no me muevo" },
        { id: "ocasional",  label: "Entreno de vez en cuando" },
        { id: "regular",    label: "Entreno de forma regular" },
        { id: "intensa",    label: "Entreno de forma intensa" },
      ],
    },
    {
      id: "dificultad",
      step: 6,
      title: "¿Qué es lo que más te cuesta hoy?",
      subtitle: "Esto nos ayuda a armar tu plan a tu medida.",
      type: "list",
      options: [
        { id: "tiempo",      label: "No tengo tiempo suficiente" },
        { id: "motivacion",  label: "Me cuesta mantener la motivación" },
        { id: "no_se_que_hacer", label: "No sé bien qué ejercicios hacer" },
        { id: "ansiedad",    label: "Ansiedad o descontrol con la comida" },
      ],
    },
    {
      id: "tiempo",
      step: 7,
      title: "¿Cuánto tiempo podés dedicarle por día?",
      subtitle: "Tu plan se va a ajustar a este tiempo.",
      type: "list",
      options: [
        { id: "15", label: "15 minutos" },
        { id: "30", label: "30 minutos" },
        { id: "45", label: "45 minutos" },
        { id: "60+", label: "1 hora o más" },
      ],
    },
    {
      id: "alimentacion",
      step: 8,
      title: "¿Cómo es tu alimentación actual?",
      subtitle: "No hay respuestas correctas ni incorrectas.",
      type: "list",
      options: [
        { id: "desordenada", label: "Bastante desordenada" },
        { id: "intento",     label: "Intento comer bien, pero se me complica" },
        { id: "sin_resultado", label: "Como bien pero no veo resultados" },
        { id: "plan",        label: "Sigo un plan armado" },
      ],
    },
    {
      id: "autoestima",
      step: 9,
      title: "Hoy, ¿cómo es tu relación con tu cuerpo?",
      subtitle: "Última pregunta antes de tu resultado.",
      type: "list",
      options: [
        { id: "muy_baja", label: "Muy baja, casi no me reconozco" },
        { id: "baja",     label: "Baja, quiero un cambio real" },
        { id: "media",    label: "Media, quiero sentirme mejor" },
        { id: "alta",     label: "Alta, pero quiero potenciarla" },
      ],
    },
  ],

  // ==========================================================================
  // TELA 6 — EDUCATIVA
  // ==========================================================================
  educational: {
    eyebrow: "Antes de seguir",
    title: "Tu cuerpo no cambia por hacer más, cambia por hacer lo correcto",
    subtitle: "El Método Shape de Musa se basa en 3 pilares que la mayoría de los planes ignoran.",
    items: [
      { icon: "target", title: "Personalización real", text: "Cada cuerpo responde distinto. Tu plan se arma según tus respuestas, no es genérico." },
      { icon: "layers", title: "Progresión inteligente", text: "Los ejercicios evolucionan con vos, semana a semana, sin estancarte." },
      { icon: "clock",  title: "Constancia sin esfuerzo extremo", text: "Rutinas cortas y sostenibles, pensadas para que puedas cumplirlas de verdad." },
    ],
    cta: "Quiero ver cómo funciona",
  },

  // ==========================================================================
  // TELA 7 — CARRUSEL ANTES / DESPUÉS
  // ==========================================================================
  beforeAfter: {
    eyebrow: "Resultados reales",
    title: "Mujeres reales, con el mismo método que vas a conocer",
    slides: [
      { name: "Camila, 29 años", quote: "En 8 semanas noté un cambio que ni con gimnasio había logrado antes.", stars: 5, img: "assets/images/antesdepois1.png" },
      { name: "Julieta, 34 años", quote: "Lo que más me gustó es que era corto y lo podía cumplir todos los días.", stars: 5, img: "assets/images/antesdepois2.png" },
      { name: "Sofía, 28 años", quote: "Empecé sin creer que iba a funcionar y hoy me siento otra persona.", stars: 5, img: "assets/images/antesdepois3.png" },
      { name: "Valentina, 36 años", quote: "Con constancia y una estrategia clara, finalmente pude sostener el proceso.", stars: 5, img: "assets/images/antesdepois4.png" },
    ],
    cta: "Seguir con mi test",
  },

  // ==========================================================================
  // TELA 13 — PROCESAMIENTO (texto exacto solicitado)
  // ==========================================================================
  processing: {
    title: "Estamos comparando tus respuestas con el Método Shape de Musa para encontrar la recomendación ideal para vos.",
    steps: [
      "Analizando tu perfil",
      "Identificando tus objetivos",
      "Comparando tu perfil con el Método Shape de Musa",
      "Preparando tu recomendación personalizada",
    ],
  },

  // ==========================================================================
  // TELA 14 — RESULTADO (varía según el objetivo elegido en la pregunta 2)
  // ==========================================================================
  results: {
  image: "assets/images/resultado.png",
  imageAlt: "Diagnóstico personalizado del Método Shape de Musa",
    matchPercent: 94,
    profiles: {
      perder_grasa: {
        badge: "Perfil Quema Grasa",
        title: "Tu perfil responde mejor a una estrategia simple y progresiva",
        text: "Según tus respuestas, tu prioridad es mejorar tu composición corporal con una rutina que puedas sostener. El Método Shape de Musa te muestra un camino claro para empezar con seguridad.",
      },
      tonificar: {
        badge: "Perfil Definición",
        title: "Tu perfil tiene base para mejorar definición y constancia",
        text: "Tus respuestas muestran que buscás verte y sentirte mejor sin vivir pendiente del gimnasio. El método organiza tu entrenamiento y tus hábitos paso a paso.",
      },
      gluteos: {
        badge: "Perfil Curvas",
        title: "Tu perfil necesita una progresión enfocada y sostenible",
        text: "Tu perfil indica que necesitás ejercicios bien elegidos, progresión y constancia. El objetivo es avanzar sin depender de rutinas eternas o imposibles.",
      },
      salud: {
        badge: "Perfil Bienestar",
        title: "Tu prioridad es sentirte fuerte, con energía y en equilibrio",
        text: "Tus respuestas muestran que buscás un cambio sostenible, con foco en postura, energía y salud general, no solo estética.",
      },
    },
    matchLabel: "de compatibilidad con el Método Shape de Musa",
    cta: "Ver mi plan personalizado",
  },

  // ==========================================================================
  // TELA 15 — EXPLICACIÓN
  // ==========================================================================
  explanation: {
    eyebrow: "Por qué pasó esto",
    title: "Esto explica por qué otros métodos no te funcionaron antes",
    paragraphs: [
      "La mayoría de los planes que probaste seguramente eran genéricos: pensados para cualquier cuerpo, no para el tuyo.",
      "Tu perfil necesita un enfoque específico en intensidad, tiempo y progresión, algo que solo un método personalizado puede darte.",
      "Por eso Aline Pamplona diseñó un sistema que se adapta a vos, y no al revés.",
    ],
    cta: "Conocer el método",
  },

  // ==========================================================================
  // TELA 16 — MÉTODO SHAPE DE MUSA
  // ==========================================================================
  method: {
    instagram:"assets/images/intagran.png",
    eyebrow: "El método",
    title: "Conocé el Método Shape de Musa, desarrollado por Aline Pamplona",
    authorQuote: "Creé este método después de años ayudando a mujeres reales que ya habían probado de todo. No necesitás más disciplina, necesitás el plan correcto.",
    pillars: [
      { num: "01", title: "Diagnóstico personalizado", text: "Todo empieza con tu perfil real: cuerpo, rutina y objetivo." },
      { num: "02", title: "Plan de entrenamiento progresivo", text: "Rutinas cortas que evolucionan semana a semana según tu avance." },
      { num: "03", title: "Guía de alimentación simple", text: "Sin dietas extremas, con pautas fáciles de sostener en el tiempo." },
      { num: "04", title: "Acompañamiento y comunidad", text: "Nunca estás sola: contás con soporte durante todo el proceso." },
    ],
  },

  // ==========================================================================
  // TELA 17 — BENEFICIOS
  // ==========================================================================
  benefits: {
    title: "Lo que vas a lograr con el Método Shape de Musa",
    items: [
      "Mejorar tu composición corporal sin pasar horas en el gimnasio",
      "Tonificar tu cuerpo con rutinas de 20 a 30 minutos",
      "Recuperar tu energía y tu autoestima",
      "Aprender a comer sin dietas restrictivas",
      "Empezar a notar avances en tu rutina desde las primeras semanas",
      "Sostener nuevos hábitos a largo plazo, sin extremos",
    ],
  },

  // ==========================================================================
  // TELA 18 — QUÉ ESTÁ INCLUIDO
  // ==========================================================================
  includes: {
    title: "Todo lo que incluye tu Método Shape de Musa",
    items: [
      { title: "Plan de entrenamiento personalizado", sub: "12 semanas, progresivo, 100% adaptado a tu resultado" },
      { title: "Guía de alimentación Shape de Musa", sub: "Simple, flexible y sin dietas extremas" },
      { title: "Videos explicativos de cada ejercicio", sub: "Para hacer todo con la técnica correcta" },
      { title: "Seguimiento semanal de progreso", sub: "Para que nunca pierdas la motivación" },
      { title: "Acceso a la comunidad Shape de Musa", sub: "Acompañamiento junto a miles de mujeres" },
    ],
  },

  // ==========================================================================
  // TELA 19 — PRUEBA SOCIAL
  // ==========================================================================
  socialProof: {
    title: "Miles de mujeres ya transformaron su cuerpo",
    stats: [
      { num: "+38K", label: "Mujeres activas" },
      { num: "4.9★", label: "Valoración promedio" },
      { num: "92%", label: "Recomiendan el método" },
    ],
    testimonials: [
      { name: "Antonella R.", stars: 5, text: "Nunca pensé que un plan tan corto me iba a dar tantos resultados. Totalmente recomendado.", img: "assets/images/testimonial-antone.jpg" },
      { name: "Sofía F.", stars: 5, text: "Lo que más valoro es el acompañamiento. Se siente que Aline realmente entiende lo que necesitamos.", img: "assets/images/testimonial-milagros.jpg" },
      { name: "Bianca D.", stars: 5, text: "Mi autoestima cambió tanto como mi cuerpo. Es mucho más que un plan de entrenamiento.", img: "assets/images/testimonial-rocio.jpg" },
    ],
  },

  // ==========================================================================
  // TELA 20 — VIDEOS
  // ==========================================================================
  videos: {
    title: "Mirá cómo funciona el Método Shape de Musa",
    mainLabel: "Video principal — Aline Pamplona te explica el método",
    testimonialsLabel: "Testimonios en video",
  },
vsl: {
  eyebrow: "Un mensaje de Aline para vos",

  title: "Mirá cómo funciona el Método Shape de Musa",

  subtitle:
    "En este video, Aline te muestra un caso real y explica por qué seguir un método claro puede cambiar por completo tu proceso.",

  video: "https://www.youtube-nocookie.com/embed/V8HNOyat4sc?rel=0&playsinline=1",

  waitingText:
    "Mirá al menos una parte del video para poder continuar.",

  unlockedText:
    "Ya podés continuar cuando quieras.",

  completedText:
    "Gracias por mirar hasta el final. Ahora quiero mostrarte todo lo que preparé para vos.",

  unlockedButton: "Quiero seguir",

  completedButton: "Quiero conocer el método",

  
},
  // ==========================================================================
  // TELA 21 — OFERTA
  // ==========================================================================
  offer: {
    timer: "Tu recomendación personalizada vence en",
    eyebrow: "Oferta exclusiva por completar el test",
    title: "Accedé hoy al Método Shape de Musa",
    subtitle: "Tu acceso incluye el plan, las guías y los materiales para empezar desde tu celular.",
    oldPrice: "$34.600",
    newPrice: "$8.600",
    cycle: "Pago único · Acceso inmediato",
    perks: [
      "Plan Shape de Musa de 12 semanas",
      "Guía de alimentación simple y flexible",
      "Rutinas cortas para casa o gimnasio",
      "Videos explicativos de cada ejercicio",
      "Checklist semanal de seguimiento",
      "Bonus: Rutina exprés de 15 minutos",
      "Garantía de 7 días",
    ],
    cta: "Quiero empezar con mi método",
    subtext: "Pago seguro · Acceso inmediato · Disponible en tu celular",
  },

  // ==========================================================================
  // TELA 22 — GARANTÍA
  // ==========================================================================
  guarantee: {
    title: "Garantía de 7 días",
    text: "Probá el Método Shape de Musa con tranquilidad. Si dentro de los primeros 7 días sentís que no es para vos, podés solicitar el reembolso según la política de garantía.",
  },

  // ==========================================================================
  // TELA 23 — FAQ
  // ==========================================================================
  faq: [
    { q: "¿Necesito ir al gimnasio?", a: "No. Las rutinas están pensadas para hacer en tu casa, con o sin equipamiento básico." },
    { q: "¿Cuánto tiempo por día necesito?", a: "Entre 15 y 30 minutos por día, según el plan que te corresponda." },
    { q: "¿Sirve si nunca entrené antes?", a: "Sí. El método se adapta a tu nivel actual y avanza de forma progresiva." },
    { q: "¿Cuándo puedo empezar a notar cambios?", a: "Muchas mujeres empiezan notando más constancia, energía y claridad durante las primeras semanas. Los cambios físicos dependen de cada persona." },
    { q: "¿Cómo accedo después de comprar?", a: "Recibís acceso inmediato a tu plan y podés empezar hoy mismo desde tu celular." },
  ],

  // ==========================================================================
  // TELA 24 — CTA FINAL
  // ==========================================================================
  finalCta: {
    urgency: "Tu recomendación personalizada es válida solo por hoy",
    title: "Ya tenés tu recomendación. Ahora podés empezar con el método.",
    subtitle: "Accedé al Método Shape de Musa y empezá con una guía clara, simple y pensada para tu rutina.",
    cta: "Quiero empezar ahora",
  },
};
