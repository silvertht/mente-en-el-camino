// ============================================================
// PRINCIPIOS DEL DÍA — Mente en el Camino
// Rotación determinística por fecha (mismo día = mismo principio).
// Territorio: Funcional. Consumo: UX en Home.
// ============================================================

export interface DailyPrinciple {
  ref: string;
  text: string;
  application: string;
  reflection: string;
}

export const dailyPrinciples: DailyPrinciple[] = [
  {
    ref: "Salmos 119:105",
    text: "Lámpara es a mis pies tu palabra, y lumbre a mi camino.",
    application:
      "Antes de decidir hoy, lee un versículo y deja que ilumine el paso siguiente.",
    reflection: "¿Qué decisión necesitas poner bajo la luz de la Palabra hoy?",
  },
  {
    ref: "Josué 1:9",
    text: "Mira que te mando que te esfuerces y seas valiente; no temas ni desmayes, porque Jehová tu Dios estará contigo dondequiera que vayas.",
    application: "Cuando algo te dé miedo hoy, recuerda que no caminas solo.",
    reflection: "¿Qué temor necesitas entregar a Dios hoy?",
  },
  {
    ref: "Filipenses 4:13",
    text: "Todo lo puedo en Cristo que me fortalece.",
    application:
      "Escribe una meta que parezca grande y hazla con la fuerza de Dios, no la tuya.",
    reflection: "¿Dónde necesitas Su fuerza, no la tuya?",
  },
  {
    ref: "Proverbios 3:5-6",
    text: "Fíate de Jehová de todo tu corazón, y no te apoyes en tu propia prudencia. Reconócelo en todos tus caminos, y él enderezará tus veredas.",
    application: "Antes de decidir, ora en vez de solo pensar.",
    reflection: "¿En qué área te cuesta confiar más en Dios que en tu plan?",
  },
  {
    ref: "Mateo 6:33",
    text: "Mas buscad primeramente el reino de Dios y su justicia, y todas estas cosas os serán añadidas.",
    application: "Empieza el día buscando a Dios primero, no al final.",
    reflection: "¿Qué pondrías primero si Dios fuera lo primero?",
  },
  {
    ref: "Salmos 23:1",
    text: "Jehová es mi pastor; nada me faltará.",
    application: "Hoy, en vez de contar lo que falta, agradece lo que tienes.",
    reflection: "¿Qué te ha dado Dios que aún no has agradecido?",
  },
  {
    ref: "Isaías 40:31",
    text: "Pero los que esperan a Jehová tendrán nuevas fuerzas; levantarán alas como las águilas; correrán, y no se cansarán; caminarán, y no se fatigarán.",
    application: "La fuerza no viene de dormir más, viene de esperar en Dios.",
    reflection: "¿Estás corriendo con tus fuerzas o con las de Él?",
  },
  {
    ref: "Romanos 12:2",
    text: "No os conforméis a este siglo, sino transformaos por medio de la renovación de vuestro entendimiento.",
    application: "Cambia una costumbre hoy por algo que te acerque a Dios.",
    reflection: "¿Qué hábito te está moldeando más que la Palabra?",
  },
  {
    ref: "Juan 14:6",
    text: "Yo soy el camino, y la verdad, y la vida; nadie viene al Padre, sino por mí.",
    application: "Recuerda: no hay atajos al Padre, solo Cristo.",
    reflection: "¿Confías en Él como camino o buscas otro?",
  },
  {
    ref: "Gálatas 5:22-23",
    text: "Mas el fruto del Espíritu es amor, gozo, paz, paciencia, benignidad, bondad, fe, mansedumbre, templanza.",
    application: "Elige hoy un fruto y practícalo con alguien concreto.",
    reflection: "¿Cuál fruto te falta más esta semana?",
  },
  {
    ref: "Mateo 22:37-39",
    text: "Amarás al Señor tu Dios con todo tu corazón, y con toda tu alma, y con toda tu mente. Y amarás a tu prójimo como a ti mismo.",
    application: "Ama a alguien hoy sin esperar nada a cambio.",
    reflection: "¿A quién te cuesta amar y por qué?",
  },
  {
    ref: "Salmos 46:1",
    text: "Dios es nuestro amparo y fortaleza, nuestro pronto auxilio en las tribulaciones.",
    application: "Cuando venga la tormenta hoy, corre a Él primero.",
    reflection: "¿A quién buscas primero cuando algo va mal?",
  },
  {
    ref: "1 Corintios 13:4",
    text: "El amor es sufrido, es benigno; el amor no tiene envidia, el amor no es jactancioso, no se envanece.",
    application: "Aplica una línea de este pasaje a una relación tensa.",
    reflection: "¿Qué te falta para amar mejor?",
  },
  {
    ref: "Josué 1:8",
    text: "Nunca se apartará de tu boca este libro de la ley, sino que de día y de noche meditarás en él.",
    application: "Aparta 5 minutos hoy para leer y pensar un versículo.",
    reflection: "¿Cuándo lees la Palabra, no solo cuánto?",
  },
  {
    ref: "Salmos 37:4",
    text: "Deléitate asimismo en Jehová, y él te concederá las peticiones de tu corazón.",
    application: "Deleítate en Él antes de pedir.",
    reflection: "¿Tus deseos se alinean con los Suyos?",
  },
  {
    ref: "Mateo 11:28",
    text: "Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar.",
    application: "Suelta hoy una carga que llevas solo.",
    reflection: "¿Qué carga te cuesta soltar?",
  },
  {
    ref: "Efesios 2:8-9",
    text: "Por gracia sois salvos por medio de la fe; y esto no de vosotros, pues es don de Dios; no por obras, para que nadie se gloríe.",
    application: "Deja de intentar merecer lo que ya te regaló.",
    reflection: "¿Vives por gracia o por rendimiento?",
  },
  {
    ref: "Proverbios 16:9",
    text: "El corazón del hombre piensa su camino; mas Jehová endereza sus pasos.",
    application: "Haz tu plan, pero deja a Dios corregir la ruta.",
    reflection: "¿Qué plan necesitas soltar a Dios?",
  },
  {
    ref: "Salmos 51:10",
    text: "Crea en mí, oh Dios, un corazón limpio, y renueva un espíritu recto dentro de mí.",
    application: "Pide hoy un corazón limpio, no solo buenas acciones.",
    reflection: "¿Qué hay en tu corazón que necesita renovarse?",
  },
  {
    ref: "2 Timoteo 1:7",
    text: "Porque no nos ha dado Dios espíritu de cobardía, sino de poder, de amor y de dominio propio.",
    application: "Haz esa cosa que te da miedo, con dominio propio.",
    reflection: "¿Dónde te está ganando el miedo?",
  },
  {
    ref: "Salmos 34:18",
    text: "Cercano está Jehová a los quebrantados de corazón; y salva a los contritos de espíritu.",
    application: "Si estás quebrado, no te escondas; acércate.",
    reflection: "¿Le has contado a Dios cómo estás de verdad?",
  },
  {
    ref: "Mateo 5:14",
    text: "Vosotros sois la luz del mundo; una ciudad asentada sobre un monte no se puede esconder.",
    application: "Sé luz donde estés hoy, sin actuar.",
    reflection: "¿Dónde puedes brillar sin esconderte?",
  },
  {
    ref: "Colosenses 3:23",
    text: "Y todo lo que hagáis, hacedlo de corazón, como para el Señor y no para los hombres.",
    application: "Trabaja hoy como si fuera para Jesús, no para aplausos.",
    reflection: "¿Para quién trabajas realmente?",
  },
  {
    ref: "Salmos 121:1-2",
    text: "Alzaré mis ojos a los montes; ¿de dónde vendrá mi socorro? Mi socorro viene de Jehová, que hizo los cielos y la tierra.",
    application: "Mira arriba antes de mirar alrededor.",
    reflection: "¿De dónde esperas tu ayuda?",
  },
  {
    ref: "Juan 15:5",
    text: "Yo soy la vid, vosotros los pámpanos; el que permanece en mí, y yo en él, éste lleva mucho fruto.",
    application: "Permanece hoy en Él: ora al despertar y antes de dormir.",
    reflection: "¿Estás conectado a la vid o solo cerca?",
  },
  {
    ref: "Romanos 8:28",
    text: "Y sabemos que a los que aman a Dios, todas las cosas les ayudan a bien.",
    application:
      "Mira lo difícil de hoy y pregúntate: ¿qué bien puede sacar Dios?",
    reflection: "¿Confías cuando no entiendes?",
  },
  {
    ref: "Hebreos 11:1",
    text: "Es, pues, la fe la certeza de lo que se espera, la convicción de lo que no se ve.",
    application: "Da un paso hoy sin ver todo el camino.",
    reflection: "¿Qué paso de fe te está costando?",
  },
  {
    ref: "Salmos 139:14",
    text: "Te alabaré; porque formidables, maravillosas son tus obras.",
    application: "Agradece hoy algo de cómo Dios te hizo.",
    reflection: "¿Qué de ti te cuesta agradecer?",
  },
  {
    ref: "Efesios 4:32",
    text: "Antes sed benignos unos con otros, misericordiosos, perdonándoos unos a otros, como Dios también os perdonó a vosotros en Cristo.",
    application: "Perdona hoy a alguien en tu corazón.",
    reflection: "¿A quién necesitas perdonar?",
  },
  {
    ref: "Apocalipsis 3:20",
    text: "He aquí, yo estoy a la puerta y llamo; si alguno oye mi voz y abre la puerta, entraré a él.",
    application: "Abre hoy la puerta que has tenido cerrada.",
    reflection: "¿Qué puerta le has cerrado a Jesús?",
  },
  {
    ref: "Proverbios 4:23",
    text: "Sobre toda cosa guardada, guarda tu corazón; porque de él mana la vida.",
    application: "Cuida hoy lo que dejas entrar a tu mente.",
    reflection: "¿Qué está entrando a tu corazón sin filtro?",
  },
];

/**
 * Devuelve el principio del día según la fecha (UTC).
 * Determinístico: dos usuarios el mismo día ven el mismo principio.
 */
export function getTodayPrinciple(date: Date = new Date()): DailyPrinciple {
  const dayIndex = Math.floor(date.getTime() / 86_400_000);
  return dailyPrinciples[dayIndex % dailyPrinciples.length];
}

/** Acceso por índice con wrap-around seguro (útil para tests). */
export function getPrincipleByIndex(index: number): DailyPrinciple {
  const len = dailyPrinciples.length;
  return dailyPrinciples[((index % len) + len) % len];
}
