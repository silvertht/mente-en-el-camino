import type { Question } from "../../types";

export const GENESIS_QUESTIONS: Question[] = [
  // ... (gen-001 a gen-008 se mantienen exactamente igual que en la Sesión 3)
  {
    id: "gen-001",
    type: "multiple-choice",
    category: "genesis",
    difficulty: "facil",
    points: 10,
    timeLimit: 25,
    question: "¿A quién mató Caín por envidia?",
    options: ["Set", "Abel", "Enoc", "Lamec"],
    correctIndex: 1,
    explanation:
      "El primer homicidio de la humanidad fue fruto de la envidia de Caín hacia su hermano Abel.",
    verse: "Génesis 4:8",
    verseText:
      "Y dijo Caín a su hermano Abel: Salgamos al campo. Y aconteció que estando ellos en el campo, Caín se levantó contra su hermano Abel, y lo mató.",
    application:
      "El pecado acecha a la puerta, pero Dios nos manda dominarlo antes de que nos consuma.",
    reflection: "¿Qué envidia o celo necesitas entregarle a Dios hoy?",
    // revisado: 2026-11-10
  },
  {
    id: "gen-002",
    type: "true-false",
    category: "genesis",
    difficulty: "medio",
    points: 20,
    timeLimit: 20,
    statement:
      "La humanidad construyó la Torre de Babel para hacerse un nombre y no ser esparcida por la tierra.",
    correct: true,
    explanation:
      "La humanidad quiso exaltarse a sí misma en lugar de obedecer el mandato de Dios de multiplicarse y llenar la tierra.",
    verse: "Génesis 11:4",
    verseText:
      "Y dijeron: Vamos, edifiquémonos una ciudad y una torre, cuya cúspide llegue al cielo; y hagámonos un nombre, por si fuéremos esparcidos sobre la faz de toda la tierra.",
    application:
      "Cuando buscamos nuestra propia gloria, terminamos confundidos. La verdadera grandeza está en exaltar a Dios.",
    reflection: "¿Estás construyendo tu vida para tu gloria o para la de Dios?",
    // revisado: 2026-11-10
  },
  {
    id: "gen-003",
    type: "fill-blank",
    category: "genesis",
    difficulty: "dificil",
    points: 30,
    timeLimit: 30,
    verseWithBlank:
      "Y respondió Abraham: Dios se proveerá de ___ para el holocausto, hijo mío.",
    options: ["cordero", "fuego", "pájaro", "pan"],
    correctIndex: 0,
    explanation:
      "Abraham confió en que Dios proveería incluso cuando le pidió sacrificar a Isaac.",
    verse: "Génesis 22:8",
    verseText:
      "Y respondió Abraham: Dios se proveerá de cordero para el holocausto, hijo mío. E iban juntos.",
    application:
      "La fe no es creer que todo será fácil, sino obedecer aunque no entendamos el proceso.",
    reflection: "¿En qué área te está Dios pidiendo obediencia a ciegas?",
    // revisado: 2026-11-10
  },
  {
    id: "gen-004",
    type: "multiple-choice",
    category: "genesis",
    difficulty: "facil",
    points: 10,
    timeLimit: 25,
    question: "¿Qué animal tentó a Eva en el huerto del Edén?",
    options: ["Un león", "Una serpiente", "Un águila", "Un dragón"],
    correctIndex: 1,
    explanation:
      "Satanás usó a la serpiente, el más astuto de los animales, para sembrar duda sobre la Palabra de Dios.",
    verse: "Génesis 3:1",
    verseText:
      "Pero la serpiente era astuta, más que todos los animales del campo que Jehová Dios había hecho; la cual dijo a la mujer: ¿Conque Dios os ha dicho: No comáis de todo árbol del huerto?",
    application:
      "La duda de la Palabra de Dios es la primera arma del enemigo. Conocer la verdad nos protege.",
    reflection:
      "¿En qué áreas de tu vida estás escuchando voces que siembran duda sobre lo que Dios dijo?",
    // revisado: 2026-11-10
  },
  {
    id: "gen-005",
    type: "fill-blank",
    category: "genesis",
    difficulty: "medio",
    points: 20,
    timeLimit: 25,
    verseWithBlank:
      "Y creó Dios al hombre a su ___, a imagen de Dios lo creó; varón y hembra los creó.",
    options: ["semejanza", "imagen", "gloria", "forma"],
    correctIndex: 1,
    explanation:
      "El ser humano tiene un valor intrínseco único porque fue creado a la imagen de Dios.",
    verse: "Génesis 1:27",
    verseText:
      "Y creó Dios al hombre a su imagen, a imagen de Dios lo creó; varón y hembra los creó.",
    application:
      "Tu valor no depende de lo que haces, sino de quién te creó. Fuiste hecho a Su imagen.",
    reflection:
      "¿Cómo cambia tu autoestima el saber que llevas la imagen de Dios?",
    // revisado: 2026-11-10
  },
  {
    id: "gen-006",
    type: "timeline",
    category: "genesis",
    difficulty: "dificil",
    points: 30,
    timeLimit: 40,
    events: [
      "El Diluvio y el arca de Noé",
      "La Creación de los cielos y la tierra",
      "El llamado de Abraham a la tierra prometida",
      "La Torre de Babel y la confusión de lenguas",
    ],
    correctOrder: [1, 0, 3, 2],
    explanation:
      "Génesis narra el plan de Dios: primero crea, luego juzga el pecado con el Diluvio, la humanidad se rebela en Babel, y finalmente Dios llama a Abraham para iniciar el linaje de la redención.",
    verse: "Génesis 1:1",
    verseText: "En el principio creó Dios los cielos y la tierra.",
    application:
      "Dios tiene un plan que se desarrolla a través de la historia. Incluso los juicios y las crisis están dentro de Su propósito redentor.",
    reflection:
      "¿Cómo te ayuda ver la historia de Génesis a confiar en que Dios tiene un plan incluso en tus momentos difíciles?",
    // revisado: 2026-11-10
  },
  {
    id: "gen-007",
    type: "multiple-choice",
    category: "genesis",
    difficulty: "facil",
    points: 10,
    timeLimit: 25,
    question:
      "¿Qué vio Jacob en sueños que confirmó la presencia de Dios en su huida?",
    options: [
      "Un arca flotando sobre las aguas",
      "Una escalera con ángeles subiendo y bajando",
      "Un manto extendido sobre la tierra",
      "Una zarza que ardía sin consumirse",
    ],
    correctIndex: 1,
    explanation:
      "Jacob huía por su propio pecado, pero Dios se le apareció en Betel para mostrarle que la gracia divina no depende de nuestros méritos, sino de Su fidelidad y promesa.",
    verse: "Génesis 28:12",
    verseText:
      "Y soñó: y he aquí una escalera que estaba apoyada en tierra, y su extremo tocaba en el cielo; y he aquí ángeles de Dios que subían y descendían por ella.",
    application:
      "Dios te busca no porque seas perfecto, sino porque te ama. No importa cuán lejos hayas huido.",
    reflection:
      "¿Crees que Dios puede estar contigo incluso cuando has fallado?",
    // revisado: 2026-11-10
  },
  {
    id: "gen-008",
    type: "timeline",
    category: "genesis",
    difficulty: "dificil",
    points: 30,
    timeLimit: 40,
    events: [
      "José se reencuentra con su padre Jacob",
      "José es vendido por sus hermanos",
      "José llega a ser gobernador de Egipto",
      "José interpreta los sueños en prisión",
    ],
    correctOrder: [1, 3, 2, 0],
    explanation:
      "La vida de José demuestra la soberanía de Dios: fue vendido, encarcelado, olvidado, exaltado y usado para salvar a su familia de la hambruna. Dios transformó la traición humana en provisión divina.",
    verse: "Génesis 50:20",
    verseText:
      "Vosotros pensasteis mal contra mí, mas Dios lo encaminó a bien, para hacer lo que vemos hoy, para mantener en vida a mucho pueblo.",
    application:
      "Dios no desperdicia dolor. Incluso cuando otros te hacen daño, Él puede convertir la situación en un propósito mayor.",
    reflection:
      "¿Cómo te ayuda la vida de José a perdonar a alguien que te hizo daño?",
    // revisado: 2026-11-10
  },
  {
    id: "gen-009",
    type: "multiple-choice",
    category: "genesis",
    difficulty: "facil",
    points: 10,
    timeLimit: 25,
    question:
      "¿Qué hizo Dios en el séptimo día después de terminar la creación?",
    options: [
      "Creó a los animales",
      "Descansó de toda su obra",
      "Hizo llover sobre la tierra",
      "Creó al hombre y a la mujer",
    ],
    correctIndex: 1,
    explanation:
      "El descanso de Dios en el séptimo día no fue por cansancio, sino para establecer un ritmo de vida: el ser humano necesita trabajar, pero también necesita detenerse para adorar y confiar en Dios.",
    verse: "Génesis 2:2",
    verseText:
      "Y acabó Dios en el día séptimo la obra que hizo; y reposó el día séptimo de toda la obra que hizo.",
    application:
      "El descanso no es pereza, es un acto de fe. Descansar es reconocer que Dios sostiene el mundo aunque nosotros paremos.",
    reflection:
      "¿Te cuesta descansar? ¿Qué te impide confiar en que Dios tiene el control cuando no trabajas?",
    // revisado: 2026-11-10
  },
  {
    id: "gen-010",
    type: "fill-blank",
    category: "genesis",
    difficulty: "medio",
    points: 20,
    timeLimit: 25,
    verseWithBlank:
      "E Isaac la amó, y se consoló después de la muerte de su madre. Y ella respondió: Yo soy ___ tu sierva.",
    options: ["Sara", "Raquel", "Rebeca", "Lea"],
    correctIndex: 2,
    explanation:
      "Rebeca aceptó el llamado a dejar su tierra para casarse con Isaac. Su disposición a servir fue lo que la distinguió, mostrando que la humildad y el servicio son atractivos a los ojos de Dios.",
    verse: "Génesis 24:58",
    verseText:
      "Y llamaron a Rebeca, y le dijeron: ¿Irás tú con este varón? Y ella respondió: Sí, iré.",
    application:
      "La disposición a servir a los demás es una de las características más hermosas de una persona que ama a Dios.",
    reflection:
      "¿Estás dispuesto(a) a servir donde Dios te necesite, incluso si implica salir de tu zona de confort?",
    // revisado: 2026-11-10
  },
];
