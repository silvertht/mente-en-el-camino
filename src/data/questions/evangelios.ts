import type { Question } from "../../types";

export const EVANGELIOS_QUESTIONS: Question[] = [
  // ... ev-001 a ev-010 (idénticos a los tuyos, con fix en ev-007 de Ronda 2) ...
  {
    id: "ev-001",
    type: "multiple-choice",
    category: "evangelios",
    difficulty: "facil",
    points: 10,
    timeLimit: 25,
    question: "¿En qué ciudad nació Jesús?",
    options: ["Nazaret", "Belén", "Jerusalén", "Capernaum"],
    correctIndex: 1,
    explanation:
      "Jesús nació en Belén de Judea, la ciudad de David, tal como lo anunció el profeta Miqueas.",
    verse: "Lucas 2:4-7",
    verseText:
      "Y José subió de Galilea, de la ciudad de Nazaret, a Judea, a la ciudad de David, que se llama Belén, por cuanto era de la casa y familia de David.",
    application:
      "Dios cumple sus promesas con precisión, incluso cuando parecen improbables. Podemos confiar en Su Palabra.",
    reflection: "¿Hay alguna promesa de Dios en la que te cueste confiar hoy?",
  },
  {
    id: "ev-002",
    type: "true-false",
    category: "evangelios",
    difficulty: "facil",
    points: 10,
    timeLimit: 20,
    statement: "Jesús fue bautizado por Juan el Bautista en el río Jordán.",
    correct: true,
    explanation:
      "Sí. Jesús se bautizó en el Jordán por Juan, y al salir del agua el Espíritu Santo descendió sobre Él como paloma.",
    verse: "Mateo 3:13-17",
    verseText:
      "Entonces Jesús vino de Galilea a Juan al Jordán, para ser bautizado por él.",
    application:
      "El bautismo de Jesús marcó el inicio de Su ministerio público. Nos recuerda que la obediencia precede al propósito.",
    reflection: "¿Qué paso de obediencia crees que Dios te está pidiendo hoy?",
  },
  {
    id: "ev-003",
    type: "who-said-it",
    category: "evangelios",
    difficulty: "medio",
    points: 20,
    timeLimit: 25,
    quote: "¡Rabí, sabemos que has venido de Dios como maestro!",
    options: ["Pedro", "Nicodemo", "Zaqueo", "Juan el Bautista"],
    correctIndex: 1,
    explanation:
      "Nicodemo, fariseo y miembro del Sanedrín, fue de noche a buscar a Jesús y reconoció que venía de Dios.",
    verse: "Juan 3:1-2",
    verseText:
      "Había un hombre de los fariseos que se llamaba Nicodemo, un principal entre los judíos. Este vino a Jesús de noche, y le dijo: Rabí, sabemos que has venido de Dios como maestro.",
    application:
      "Buscar la verdad, aun en secreto o con dudas, es un paso válido. Dios honra la búsqueda sincera.",
    reflection:
      "¿Qué duda espiritual has querido resolver pero has postergado?",
  },
  {
    id: "ev-004",
    type: "fill-blank",
    category: "evangelios",
    difficulty: "facil",
    points: 10,
    timeLimit: 20,
    verseWithBlank:
      "Porque de tal manera amó Dios al ___, que ha dado a su Hijo unigénito.",
    options: ["pueblo", "mundo", "Israel", "hombre"],
    correctIndex: 1,
    explanation:
      "Juan 3:16 es el versículo más conocido del Nuevo Testamento. Habla del amor universal de Dios.",
    verse: "Juan 3:16",
    verseText:
      "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna.",
    application:
      "El amor de Dios no es exclusivo ni condicional. Es para todos, incluido tú.",
    reflection: "¿Cómo cambia tu día el saber que Dios te ama sin condiciones?",
  },
  {
    id: "ev-005",
    type: "multiple-choice",
    category: "evangelios",
    difficulty: "medio",
    points: 20,
    timeLimit: 25,
    question: "¿Cuántos discípulos eligió Jesús como apóstoles?",
    options: ["7", "10", "12", "40"],
    correctIndex: 2,
    explanation:
      "Jesús eligió a 12 apóstoles, símbolo de las 12 tribus de Israel y del nuevo pueblo de Dios.",
    verse: "Lucas 6:13",
    verseText:
      "Y cuando era de día, llamó a sus discípulos, y escogió a doce de ellos, a los cuales también llamó apóstoles.",
    application:
      "Dios trabaja en equipo. El Reino no se construye en solitario.",
    reflection: "¿Quiénes son las 12 personas clave en tu vida espiritual?",
  },
  {
    id: "ev-006",
    type: "true-false",
    category: "evangelios",
    difficulty: "medio",
    points: 20,
    timeLimit: 20,
    statement: "Jesús resucitó al tercer día, tal como lo había anunciado.",
    correct: true,
    explanation:
      "Jesús anunció varias veces que resucitaría al tercer día, y así sucedió. Es el fundamento de la fe cristiana.",
    verse: "Lucas 24:6-7",
    verseText:
      "No está aquí, sino que ha resucitado. Acordaos de lo que os habló, cuando aún estaba en Galilea, diciendo: Es necesario que el Hijo del Hombre sea entregado en manos de hombres pecadores, y que sea crucificado, y resucite al tercer día.",
    application:
      "La resurrección es la esperanza que sostiene al creyente frente a la muerte y el sufrimiento.",
    reflection: "¿Qué significa para ti la resurrección en tu vida diaria?",
  },
  {
    id: "ev-007",
    type: "hint-deduction",
    category: "evangelios",
    difficulty: "dificil",
    points: 30,
    timeLimit: 45,
    hints: [
      "Fui uno de los doce apóstoles.",
      'Jesús me llamó "piedra".',
      "Lo negué tres veces antes de que cantara el gallo.",
      "Prediqué en Pentecostés y miles se convirtieron.",
    ],
    answer: "Pedro",
    acceptedAnswers: ["pedro", "simon pedro", "san pedro"],
    explanation:
      "Pedro, cuyo nombre original era Simón, fue uno de los líderes de la iglesia primitiva. Negó a Jesús tres veces, pero fue restaurado por Él junto al mar de Galilea.",
    verse: "Juan 21:15-17",
    verseText:
      "Cuando hubieron comido, Jesús dijo a Simón Pedro: Simón, hijo de Jonás, ¿me amas más que estos?",
    application:
      "El fracaso no define tu futuro. Dios restaura y usa a quienes se arrepienten.",
    reflection:
      "¿Qué fracaso pasado te ha hecho pensar que Dios no puede usarte?",
  },
  {
    id: "ev-008",
    type: "multiple-choice",
    category: "evangelios",
    difficulty: "facil",
    points: 10,
    timeLimit: 20,
    question: "¿Qué hizo Jesús en las bodas de Caná?",
    options: [
      "Sanó a un ciego",
      "Convirtió agua en vino",
      "Multiplicó panes",
      "Calmó una tormenta",
    ],
    correctIndex: 1,
    explanation:
      "Fue el primer milagro registrado de Jesús. Convirtió agua en vino, manifestando Su gloria.",
    verse: "Juan 2:11",
    verseText:
      "Este principio de señales hizo Jesús en Caná de Galilea, y manifestó su gloria; y sus discípulos creyeron en él.",
    application:
      "Jesús se interesa por lo cotidiano, incluso por la alegría de una fiesta.",
    reflection: "¿Cómo invitas a Jesús a los momentos comunes de tu vida?",
  },
  {
    id: "ev-009",
    type: "fill-blank",
    category: "evangelios",
    difficulty: "medio",
    points: 20,
    timeLimit: 25,
    verseWithBlank:
      "Yo soy el camino, y la ___, y la vida; nadie viene al Padre, sino por mí.",
    options: ["luz", "verdad", "puerta", "gracia"],
    correctIndex: 1,
    explanation:
      "Jesús se declara el único camino al Padre. No es una verdad más entre muchas; es la Verdad misma.",
    verse: "Juan 14:6",
    verseText:
      "Jesús le dijo: Yo soy el camino, y la verdad, y la vida; nadie viene al Padre, sino por mí.",
    application:
      "Vivir en la verdad de Cristo da dirección y propósito a la vida.",
    reflection: '¿En qué área de tu vida necesitas que Jesús sea "el camino"?',
  },
  {
    id: "ev-010",
    type: "true-false",
    category: "evangelios",
    difficulty: "dificil",
    points: 30,
    timeLimit: 25,
    statement:
      "Jesús prometió que el Espíritu Santo vendría después de Su partida.",
    correct: true,
    explanation:
      "Jesús prometió al Consolador, el Espíritu Santo, quien vendría a enseñar, recordar y dar poder a los discípulos.",
    verse: "Juan 14:26",
    verseText:
      "Mas el Consolador, el Espíritu Santo, a quien el Padre enviará en mi nombre, él os enseñará todas las cosas, y os recordará todo lo que yo os he dicho.",
    application:
      "No estamos solos. El Espíritu Santo nos guía, consuela y capacita cada día.",
    reflection:
      "¿Cuándo has sentido la guía del Espíritu Santo de forma clara?",
  },

  // ---------- NUEVAS: timeline ----------
  {
    id: "ev-011",
    type: "timeline",
    category: "evangelios",
    difficulty: "medio",
    points: 20,
    timeLimit: 35,
    events: [
      "Resurrección",
      "Entrada triunfal a Jerusalén",
      "Crucifixión",
      "Última Cena",
    ],
    correctOrder: [1, 3, 2, 0],
    explanation:
      "La Semana Santa comenzó con la entrada triunfal, siguió con la Última Cena, luego la crucifixión, y culminó con la resurrección al tercer día.",
    verse: "Lucas 24:6-7",
    verseText:
      "No está aquí, sino que ha resucitado. Acordaos de lo que os habló, cuando aún estaba en Galilea.",
    application:
      "La historia de la salvación tiene un orden: Dios prepara, cumple y consuma. Confía en Su timing.",
    reflection: "¿Qué etapa de tu caminar con Dios estás viviendo ahora mismo?",
  },
  {
    id: "ev-012",
    type: "timeline",
    category: "evangelios",
    difficulty: "dificil",
    points: 30,
    timeLimit: 40,
    events: [
      "Jesús llama a sus primeros discípulos",
      "Bautismo en el Jordán",
      "Entrada triunfal a Jerusalén",
      "Sermón del Monte",
    ],
    correctOrder: [1, 0, 3, 2],
    explanation:
      "El ministerio de Jesús siguió un orden claro: bautismo → llamado de discípulos → enseñanzas (como el Sermón del Monte) → entrada triunfal a Jerusalén.",
    verse: "Mateo 4:19",
    verseText:
      "Y les dijo: Venid en pos de mí, y os haré pescadores de hombres.",
    application:
      "Jesús nos llama paso a paso, no todo de golpe. Confía en Su proceso.",
    reflection:
      "¿Qué paso crees que Dios te está invitando a dar después del actual?",
  },
  {
    id: "ev-013",
    type: "timeline",
    category: "evangelios",
    difficulty: "medio",
    points: 20,
    timeLimit: 35,
    events: [
      "Día 6: animales y seres humanos",
      "Día 1: luz y separación del día y la noche",
      "En el principio: cielos y tierra",
      "Día 3: vegetación",
    ],
    correctOrder: [2, 1, 3, 0],
    explanation:
      "Génesis 1 narra la creación en orden: primero el cielo y la tierra, luego la luz (día 1), la vegetación (día 3) y finalmente los animales y los humanos (día 6).",
    verse: "Génesis 1:1",
    verseText: "En el principio creó Dios los cielos y la tierra.",
    application:
      "Dios construye con orden y propósito. La creación no fue al azar, y tu vida tampoco.",
    reflection:
      "¿Cómo cambia tu perspectiva saber que Dios hace todo con orden?",
  },

  // ---------- timeline (batch 2) ----------
  {
    id: "ev-014",
    type: "timeline",
    category: "evangelios",
    difficulty: "medio",
    points: 20,
    timeLimit: 35,
    events: [
      "Granizo y fuego",
      "Sangre en el Nilo",
      "Muerte de los primogénitos",
      "Ranas",
    ],
    correctOrder: [1, 3, 0, 2],
    explanation:
      "Las plagas de Egipto siguieron un orden progresivo. Comenzaron con la sangre en el Nilo y culminaron con la muerte de los primogénitos.",
    verse: "Éxodo 7-12",
    verseText:
      "Jehová dijo a Moisés: Faraón no os oirá, para que mis maravillas se multipliquen en la tierra de Egipto.",
    application:
      "Dios da oportunidades antes del juicio. La paciencia de Dios también es misericordia.",
    reflection:
      "¿Hay algo que Dios te ha estado mostrando con paciencia y aún no has atendido?",
  },
  {
    id: "ev-015",
    type: "timeline",
    category: "evangelios",
    difficulty: "medio",
    points: 20,
    timeLimit: 35,
    events: [
      "Se convierte en gobernador de Egipto",
      "Vendido por sus hermanos",
      "Se reencuentra con su familia",
      "Interpreta sueños en prisión",
    ],
    correctOrder: [1, 3, 0, 2],
    explanation:
      "La vida de José muestra cómo Dios transforma la traición en propósito. Fue vendido, encarcelado, y finalmente usado para salvar a su familia.",
    verse: "Génesis 50:20",
    verseText:
      "Vosotros pensasteis mal contra mí, mas Dios lo encaminó a bien, para hacer lo que vemos hoy, para mantener en vida a mucho pueblo.",
    application:
      "Lo que otros planean para mal, Dios lo puede redirigir para bien.",
    reflection:
      "¿Qué situación difícil pasada puedes ver hoy como usada por Dios?",
  },
  {
    id: "ev-016",
    type: "timeline",
    category: "evangelios",
    difficulty: "dificil",
    points: 30,
    timeLimit: 40,
    events: [
      "Concilio de Jerusalén",
      "Conversión en el camino a Damasco",
      "Viaje a Roma como prisionero",
      "Primer viaje misionero",
    ],
    correctOrder: [1, 3, 0, 2],
    explanation:
      "El apóstol Pablo se convirtió en Damasco, luego hizo varios viajes misioneros, participó en el Concilio de Jerusalén y terminó predicando en Roma como prisionero.",
    verse: "Hechos 9:15",
    verseText:
      "El Señor le dijo: Ve, porque instrumento escogido me es este, para que lleve mi nombre en presencia de los gentiles, y de reyes, y de los hijos de Israel.",
    application:
      "Dios puede transformar al peor enemigo en el mejor instrumento.",
    reflection:
      "¿Conoces a alguien que parece 'imposible' de alcanzar para Dios?",
  },
  {
    id: "ev-017",
    type: "timeline",
    category: "evangelios",
    difficulty: "medio",
    points: 20,
    timeLimit: 35,
    events: [
      "La zarza ardiente",
      "Nacimiento y rescate en el Nilo",
      "Éxodo de Egipto",
      "Huida a Madián",
    ],
    correctOrder: [1, 3, 0, 2],
    explanation:
      "Moisés fue rescatado de bebé en el Nilo, huyó a Madián tras matar a un egipcio, escuchó a Dios en la zarza ardiente y lideró el éxodo.",
    verse: "Éxodo 3:10",
    verseText:
      "Ven, por tanto, ahora, y te enviaré a Faraón, para que saques de Egipto a mi pueblo, los hijos de Israel.",
    application:
      "Dios llama a personas comunes para misiones extraordinarias.",
    reflection:
      "¿Qué te ha llamado Dios a hacer que sientes que no eres 'suficiente' para lograrlo?",
  },
  {
    id: "ev-018",
    type: "timeline",
    category: "evangelios",
    difficulty: "dificil",
    points: 30,
    timeLimit: 40,
    events: [
      "Vence a Goliat",
      "Rey de todo Israel",
      "Ungido por Samuel",
      "Rey de Judá",
    ],
    correctOrder: [2, 0, 3, 1],
    explanation:
      "David fue ungido por Samuel siendo joven, venció a Goliat, reinó primero sobre Judá y luego sobre todo Israel.",
    verse: "1 Samuel 16:13",
    verseText:
      "Y Samuel tomó el cuerno del aceite, y lo ungió en medio de sus hermanos; y desde aquel día en adelante el Espíritu de Jehová vino sobre David.",
    application:
      "Dios prepara en lo secreto antes de exponer en lo público.",
    reflection:
      "¿En qué área te está Dios preparando en lo privado antes de usarte en lo público?",
  },
  {
    id: "ev-019",
    type: "timeline",
    category: "evangelios",
    difficulty: "dificil",
    points: 30,
    timeLimit: 40,
    events: [
      "Conversión de Pablo",
      "Pentecostés",
      "Concilio de Jerusalén",
      "Martirio de Esteban",
    ],
    correctOrder: [1, 3, 0, 2],
    explanation:
      "Hechos narra el nacimiento de la iglesia: comenzó en Pentecostés, siguió con el martirio de Esteban, la conversión de Pablo, y culminó con el Concilio de Jerusalén.",
    verse: "Hechos 2:1-4",
    verseText:
      "Cuando llegó el día de Pentecostés, estaban todos unánimes juntos... y fueron todos llenos del Espíritu Santo.",
    application:
      "El Espíritu Santo no es un evento del pasado: sigue impulsando la iglesia hoy.",
    reflection:
      "¿Cómo estás dejando que el Espíritu Santo guíe tu vida diaria?",
  },
  {
    id: "ev-020",
    type: "timeline",
    category: "evangelios",
    difficulty: "medio",
    points: 20,
    timeLimit: 35,
    events: [
      "Nacimiento de Isaac",
      "Llamado a salir de Harán",
      "Prueba en el monte Moriah",
      "Pacto y circuncisión",
    ],
    correctOrder: [1, 3, 0, 2],
    explanation:
      "Dios llamó a Abraham a salir de Harán, hizo pacto con él y le prometió descendencia. Isaac nació en la vejez, y luego Abraham fue probado en Moriah.",
    verse: "Génesis 12:1",
    verseText:
      "Pero Jehová había dicho a Abram: Vete de tu tierra y de tu parentela, y de la casa de tu padre, a la tierra que te mostraré.",
    application:
      "Seguir a Dios a veces implica dejar lo cómodo para recibir lo mejor.",
    reflection:
      "¿A qué te está llamando Dios a 'dejar' para avanzar?",
  },
];
