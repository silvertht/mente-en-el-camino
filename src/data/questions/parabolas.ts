import type { Question } from "../../types";

export const PARABOLAS_QUESTIONS: Question[] = [
  {
    id: "par-001",
    type: "multiple-choice",
    category: "parabolas",
    difficulty: "facil",
    points: 10,
    timeLimit: 25,
    question:
      "En la parábola del hijo pródigo, ¿qué hizo el padre cuando el hijo regresó?",
    options: [
      "Lo reprendió duramente",
      "Lo puso a trabajar como siervo",
      "Corrió y lo abrazó",
      "Lo ignoró por unos días",
    ],
    correctIndex: 2,
    explanation:
      "El padre corrió, se conmovió, lo abrazó y besó. Luego hizo fiesta. Así es el corazón de Dios por los que regresan.",
    verse: "Lucas 15:20",
    verseText:
      "Y levantándose, vino a su padre. Y cuando aún estaba lejos, lo vio su padre, y fue movido a misericordia, y corrió, y se echó sobre su cuello, y le besó.",
    application:
      "No importa cuán lejos hayas ido. Dios te espera con los brazos abiertos.",
    reflection: "¿Crees que Dios te recibiría así? ¿Por qué?",
  },
  {
    id: "par-002",
    type: "true-false",
    category: "parabolas",
    difficulty: "facil",
    points: 10,
    timeLimit: 20,
    statement:
      "En la parábola del buen samaritano, el samaritano ignoró al herido.",
    correct: false,
    explanation:
      "Al contrario: el samaritano se compadeció, vendó sus heridas, lo llevó a un mesón y pagó por su cuidado.",
    verse: "Lucas 10:33-34",
    verseText:
      "Pero un samaritano, que iba de camino, vino cerca de él, y viéndole, fue movido a misericordia; y acercándose, vendó sus heridas.",
    application:
      "El prójimo no es solo el cercano; es cualquiera que necesita ayuda.",
    reflection: "¿A quién has evitado ayudar por prejuicios o comodidad?",
  },
  {
    id: "par-003",
    type: "fill-blank",
    category: "parabolas",
    difficulty: "medio",
    points: 20,
    timeLimit: 25,
    verseWithBlank:
      "El sembrador salió a sembrar. Y mientras sembraba, parte de la semilla cayó junto al ___.",
    options: ["río", "camino", "monte", "mar"],
    correctIndex: 1,
    explanation:
      "La semilla junto al camino representa a quien oye la Palabra pero el enemigo la arrebata de su corazón.",
    verse: "Mateo 13:3-4",
    verseText:
      "Y les habló muchas cosas por parábolas, diciendo: He aquí, el sembrador salió a sembrar. Y mientras sembraba, parte de la semilla cayó junto al camino; y vinieron las aves y la comieron.",
    application: "La Palabra necesita raíces profundas para dar fruto.",
    reflection: "¿Qué tipo de tierra representa tu corazón hoy?",
  },
  {
    id: "par-004",
    type: "multiple-choice",
    category: "parabolas",
    difficulty: "medio",
    points: 20,
    timeLimit: 25,
    question: "¿Qué representa la oveja perdida en la parábola de Lucas 15?",
    options: [
      "El pecador que se arrepiente",
      "El fariseo orgulloso",
      "Los ángeles del cielo",
      "El pastor mismo",
    ],
    correctIndex: 0,
    explanation:
      "El pastor deja las 99 y va por la perdida. Hay más gozo en el cielo por un pecador que se arrepiente que por 99 justos.",
    verse: "Lucas 15:7",
    verseText:
      "Os digo que así habrá más gozo en el cielo por un pecador que se arrepiente, que por noventa y nueve justos que no necesitan de arrepentimiento.",
    application:
      "Dios no te ve como un número. Te busca como si fueras el único.",
    reflection: "¿Cómo te hace sentir que Dios te busca personalmente?",
  },
  {
    id: "par-005",
    type: "hint-deduction",
    category: "parabolas",
    difficulty: "dificil",
    points: 30,
    timeLimit: 45,
    hints: [
      "Es una de las parábolas más conocidas de Jesús.",
      "Un hombre fue asaltado y dejado medio muerto.",
      "Pasaron un sacerdote y un levita, pero no ayudaron.",
      "Al final, el que ayudó fue un extranjero despreciado.",
    ],
    answer: "El buen samaritano",
    acceptedAnswers: [
      "buen samaritano",
      "el buen samaritano",
      "samaritano",
      "el samaritano",
    ],
    explanation:
      'Jesús contó esta parábola para responder a la pregunta "¿Y quién es mi prójimo?". Enseña que el amor trasciende fronteras.',
    verse: "Lucas 10:36-37",
    verseText:
      "¿Quién, pues, de estos tres te parece que fue el prójimo del que cayó en manos de los ladrones? Él dijo: El que usó de misericordia con él. Entonces Jesús le dijo: Ve, y haz tú lo mismo.",
    application:
      "Amar al prójimo no es un sentimiento, es una acción concreta.",
    reflection:
      '¿Qué acción concreta puedes tomar esta semana para ser "prójimo" de alguien?',
  },
  {
    id: "par-006",
    type: "true-false",
    category: "parabolas",
    difficulty: "medio",
    points: 20,
    timeLimit: 20,
    statement:
      "En la parábola de los talentos, el siervo que no hizo nada con su talento fue elogiado.",
    correct: false,
    explanation:
      'El siervo que enterró su talento fue reprendido y llamado "siervo malo y negligente". Solo los que invirtieron fueron elogiados.',
    verse: "Mateo 25:26",
    verseText:
      "Respondiendo su señor, le dijo: Siervo malo y negligente, sabías que siego donde no sembré, y que recojo donde no esparcí.",
    application:
      "Dios nos da dones para usarlos, no para esconderlos. La inacción también es una decisión.",
    reflection: '¿Qué talento has estado "enterrando" por miedo?',
  },
  {
    id: "par-007",
    type: "multiple-choice",
    category: "parabolas",
    difficulty: "medio",
    points: 20,
    timeLimit: 25,
    question:
      "¿Qué construyó el hombre insensato en la parábola de las dos casas?",
    options: [
      "Su casa sobre la roca",
      "Su casa sobre la arena",
      "Su casa sobre un monte",
      "Su casa sobre un río",
    ],
    correctIndex: 1,
    explanation:
      "El insensato construyó sobre la arena; cuando vinieron las lluvias y los vientos, la casa cayó.",
    verse: "Mateo 7:26-27",
    verseText:
      "Pero cualquiera que me oye estas palabras y no las hace, le compararé a un hombre insensato, que edificó su casa sobre la arena.",
    application: "Oír la Palabra sin obedecerla es construir sobre arena.",
    reflection: "¿Estás construyendo tu vida sobre la roca o sobre la arena?",
  },
  {
    id: "par-008",
    type: "fill-blank",
    category: "parabolas",
    difficulty: "dificil",
    points: 30,
    timeLimit: 30,
    verseWithBlank:
      "El reino de los cielos es semejante a la levadura, que una mujer tomó y escondió en tres medidas de ___, hasta que todo fue leudado.",
    options: ["agua", "harina", "aceite", "trigo"],
    correctIndex: 1,
    explanation:
      "La levadura ilustra cómo el Reino de Dios crece de forma silenciosa pero transformadora.",
    verse: "Mateo 13:33",
    verseText:
      "Otra parábola les dijo: El reino de los cielos es semejante a la levadura que tomó una mujer, y escondió en tres medidas de harina, hasta que todo fue leudado.",
    application:
      "El Reino de Dios no siempre se ve al instante, pero transforma todo lo que toca.",
    reflection: "¿Cómo está el Reino transformando tu vida lentamente?",
  },
  {
    id: "par-009",
    type: "true-false",
    category: "parabolas",
    difficulty: "facil",
    points: 10,
    timeLimit: 20,
    statement:
      "En la parábola del fariseo y el publicano, el publicano fue justificado.",
    correct: true,
    explanation:
      'El publicano, de pie y humillado, solo dijo: "Dios, sé propicio a mí, pecador". Y fue justificado, no el fariseo orgulloso.',
    verse: "Lucas 18:14",
    verseText:
      "Os digo que este descendió a su casa justificado antes que el otro; porque cualquiera que se enaltece, será humillado; y el que se humilla será enaltecido.",
    application: "Dios resiste al soberbio pero da gracia al humilde.",
    reflection: "¿Hay orgullo espiritual escondido en tu corazón?",
  },
  {
    id: "par-010",
    type: "multiple-choice",
    category: "parabolas",
    difficulty: "medio",
    points: 20,
    timeLimit: 25,
    question: "¿Qué hizo el padre del hijo pródigo cuando su hijo se fue?",
    options: [
      "Lo maldijo",
      "Lo olvidó",
      "Lo esperó con paciencia",
      "Lo buscó por los caminos",
    ],
    correctIndex: 2,
    explanation:
      "El padre no obligó a su hijo a quedarse, pero tampoco dejó de esperarlo. Es un retrato del respeto y el amor de Dios.",
    verse: "Lucas 15:20",
    verseText:
      "Y levantándose, vino a su padre. Y cuando aún estaba lejos, lo vio su padre, y fue movido a misericordia.",
    application: "Dios respeta tu libertad, pero nunca deja de esperarte.",
    reflection: "¿Cómo te hace sentir que Dios te espera sin forzarte?",
  },
];
