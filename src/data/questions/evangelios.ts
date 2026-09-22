import type { Question } from "../../types";

export const EVANGELIOS_QUESTIONS: Question[] = [
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
    acceptedAnswers: ["pedro", "simón pedro", "simon pedro", "san pedro"],
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
];
