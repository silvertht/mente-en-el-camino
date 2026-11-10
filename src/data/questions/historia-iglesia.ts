import type { Question } from "../../types";

export const HISTORIA_IGLESIA_QUESTIONS: Question[] = [
  // ... (his-001 a his-007 se mantienen exactamente igual)
  {
    id: "his-001",
    type: "multiple-choice",
    category: "historia-iglesia",
    difficulty: "facil",
    points: 10,
    timeLimit: 25,
    question:
      "¿Qué monje agustino clavó las 95 tesis en la puerta de la iglesia del castillo de Wittenberg, iniciando la Reforma Protestante?",
    options: [
      "Juan Calvino",
      "Martín Lutero",
      "John Wesley",
      "Ulrico Zwinglio",
    ],
    correctIndex: 1,
    explanation:
      "Martín Lutero buscó reformar la iglesia al ver prácticas como la venta de indulgencias. Su redescubrimiento de la justificación por la fe marcó la historia.",
    verse: "Romanos 1:17",
    verseText:
      "Porque en el evangelio la justicia de Dios se revela por fe y para fe, como está escrito: Mas el justo por la fe vivirá.",
    application:
      "La verdad del evangelio no se compra ni se vende; es un regalo de gracia recibido por fe.",
    reflection:
      "¿Vives tu fe basado en lo que haces para Dios, o en lo que Cristo hizo por ti?",
    // revisado: 2026-11-10
  },
  {
    id: "his-002",
    type: "true-false",
    category: "historia-iglesia",
    difficulty: "facil",
    points: 10,
    timeLimit: 20,
    statement:
      "Los discípulos fueron llamados cristianos por primera vez en Roma.",
    correct: false,
    explanation:
      "La Biblia registra que el término 'cristiano' se usó por primera vez en Antioquía, donde los creyentes fueron discipulados intensamente.",
    verse: "Hechos 11:26",
    verseText:
      "Y se congregaron allí todo un año con la iglesia, y enseñaron a mucha gente; y a los discípulos se les llamó cristianos por primera vez en Antioquía.",
    application:
      "Ser llamado 'cristiano' es llevar el nombre de Cristo. Es un privilegio y una responsabilidad.",
    reflection: "¿Tu vida refleja el nombre de Cristo que llevas?",
    // revisado: 2026-11-10
  },
  {
    id: "his-003",
    type: "multiple-choice",
    category: "historia-iglesia",
    difficulty: "facil",
    points: 10,
    timeLimit: 25,
    question:
      "¿Quién predicó el famoso sermón en Pentecostés, donde se bautizaron unas 3000 personas?",
    options: ["Pablo", "Juan", "Santiago", "Pedro"],
    correctIndex: 3,
    explanation:
      "Fue Pedro quien, lleno del Espíritu Santo, predicó valientemente a la multitud en Jerusalén, abriendo paso a la iglesia primitiva.",
    verse: "Hechos 2:14",
    verseText:
      "Entonces Pedro, poniéndose en pie con los once, alzó la voz y les habló: Varones judíos, y todos los que habitáis en Jerusalén, esto os sea notorio, y oíd mis palabras.",
    application:
      "El mismo Pedro que negó a Jesús, lleno del Espíritu, predicó con poder. Dios transforma a los fracasados en líderes.",
    reflection:
      "¿Te has sentido incapaz de hablar de Dios? Recuerda lo que hizo Pedro.",
    // revisado: 2026-11-10
  },
  {
    id: "his-004",
    type: "true-false",
    category: "historia-iglesia",
    difficulty: "medio",
    points: 20,
    timeLimit: 20,
    statement:
      "El apóstol Pablo escribió la mayoría de las cartas (epístolas) del Nuevo Testamento.",
    correct: true,
    explanation:
      "Pablo escribió 13 epístolas (Romanos a Filemón) que forman una gran parte del Nuevo Testamento, guiando a las primeras iglesias.",
    verse: "2 Pedro 3:15-16",
    verseText:
      "Y tened entendido que la paciencia de nuestro Señor es para salvación; como también nuestro amado hermano Pablo, según la sabiduría que le ha sido dada, os ha escrito, casi en todas sus epístolas.",
    application:
      "Dios usó la mente brillante de Pablo para dejar un legado de doctrina y fe que nos guía hoy.",
    reflection:
      "¿Qué enseñanza de Pablo te ha impactado más en tu vida cristiana?",
    // revisado: 2026-11-10
  },
  {
    id: "his-005",
    type: "multiple-choice",
    category: "historia-iglesia",
    difficulty: "facil",
    points: 10,
    timeLimit: 25,
    question:
      "¿Qué apóstol fue martirizado en Roma, según la tradición de la iglesia primitiva?",
    options: ["Juan", "Pedro", "Santiago", "Andrés"],
    correctIndex: 1,
    explanation:
      "La tradición histórica de la iglesia primitiva registra que Pedro fue crucificado en Roma bajo el emperador Nerón, pidiendo ser crucificado de cabeza por no considerarse digno de morir como su Maestro.",
    verse: "Juan 21:18",
    verseText:
      "De cierto, de cierto te digo: Cuando eras más joven, te ceñías, e ibas a donde querías; mas cuando ya seas viejo, extenderás tus manos, y te ceñirá otro, y te llevará a donde no quieras.",
    application:
      "El amor a Cristo no se demuestra solo de palabra, sino con una vida dispuesta a seguirlo hasta el final.",
    reflection: "¿Qué estarías dispuesto a sacrificar hoy por seguir a Jesús?",
    // revisado: 2026-11-10
  },
  {
    id: "his-006",
    type: "true-false",
    category: "historia-iglesia",
    difficulty: "facil",
    points: 10,
    timeLimit: 20,
    statement:
      "El Concilio de Nicea (año 325 d.C.) afirmó que Jesucristo es de la misma esencia que el Padre.",
    correct: true,
    explanation:
      "El Concilio de Nicea fue convocado para refutar la herejía de Arrio, quien negaba la deidad de Cristo. La iglesia afirmó que Jesús es verdadero Dios y verdadero hombre.",
    verse: "Colosenses 2:9",
    verseText:
      "Porque en él habita corporalmente toda la plenitud de la Deidad.",
    application:
      "La doctrina bíblica no es negociable. La iglesia primitiva defendió la verdad de Cristo con valentía frente a la herejía.",
    reflection:
      "¿Por qué es importante saber que Jesús es Dios y no solo un maestro?",
    // revisado: 2026-11-10
  },
  {
    id: "his-007",
    type: "who-said-it",
    category: "historia-iglesia",
    difficulty: "medio",
    points: 20,
    timeLimit: 25,
    quote: "Aquí estoy. No puedo hacer otra cosa. Que Dios me ayude. Amén.",
    options: [
      "Juan Calvino",
      "Martín Lutero",
      "John Wesley",
      "Tomás de Aquino",
    ],
    correctIndex: 1,
    explanation:
      "Estas palabras fueron pronunciadas por Martín Lutero en la Dieta de Worms (1521) cuando le exigieron retractarse de sus enseñanzas. Su conciencia estaba cautiva por la Palabra de Dios.",
    verse: "Romanos 1:16",
    verseText:
      "Porque no me avergüenzo del evangelio, porque es poder de Dios para salvación a todo aquel que cree.",
    application:
      "Defender la verdad puede costarnos la comodidad o la aceptación, pero Dios da valentía a quienes se mantienen fieles.",
    reflection:
      "¿Te has avergonzado alguna vez de defender tu fe? ¿Qué puedes aprender de Lutero?",
    // revisado: 2026-11-10
  },
  {
    id: "his-008",
    type: "true-false",
    category: "historia-iglesia",
    difficulty: "facil",
    points: 10,
    timeLimit: 20,
    statement:
      "Johannes Gutenberg inventó la imprenta, lo que permitió que la Biblia se imprimiera masivamente y la gente pudiera leerla.",
    correct: true,
    explanation:
      "Antes de la imprenta, la Biblia era copiada a mano, lo que la hacía escasa y costosa. Gutenberg hizo posible que el texto bíblico llegara a las masas, preparando el terreno para la Reforma Protestante.",
    verse: "Salmos 119:105",
    verseText: "Lámpara es a mis pies tu palabra, y lumbrera a mi camino.",
    application:
      "La tecnología puede ser una herramienta poderosa para expandir el Reino de Dios.",
    reflection:
      "¿Cómo usas la tecnología para acercarte más a la Palabra de Dios?",
    // revisado: 2026-11-10
  },
  {
    id: "his-009",
    type: "multiple-choice",
    category: "historia-iglesia",
    difficulty: "facil",
    points: 10,
    timeLimit: 25,
    question:
      "¿Cuál fue el emperador romano que legalizó el cristianismo con el Edicto de Milán en el año 313?",
    options: ["Nerón", "Diocleciano", "Constantino", "Trajano"],
    correctIndex: 2,
    explanation:
      "El Edicto de Milán, promulgado por Constantino, detuvo la persecución y permitió la libertad de culto. Aunque no hizo al cristianismo la religión oficial, cambió el curso de la historia de la iglesia.",
    verse: "Proverbios 21:1",
    verseText:
      "El corazón del rey es como ríos de agua en la mano de Jehová; a todo lo que quiere lo inclina.",
    application:
      "Dios puede levantar y quitar líderes para cumplir Sus propósitos, incluso en la política.",
    reflection:
      "¿Cómo ves la mano de Dios en los cambios políticos y sociales de tu tiempo?",
    // revisado: 2026-11-10
  },
  {
    id: "his-010",
    type: "multiple-choice",
    category: "historia-iglesia",
    difficulty: "medio",
    points: 20,
    timeLimit: 25,
    question:
      "¿Qué obispo de Hipona, filósofo y teólogo, es uno de los padres de la iglesia, autor de 'Confesiones'?",
    options: ["Ambrosio", "Agustín", "Jerónimo", "Gregorio"],
    correctIndex: 1,
    explanation:
      "San Agustín vivió una vida de pecado antes de su conversión. Su libro 'Confesiones' es un testimonio de cómo la gracia de Dios transformó completamente su vida.",
    verse: "Efesios 2:8",
    verseText:
      "Porque por gracia sois salvos por medio de la fe; y esto no de vosotros, pues es don de Dios.",
    application:
      "Nadie está fuera del alcance de la gracia de Dios. Él puede transformar la vida más desordenada.",
    reflection:
      "¿Crees que hay alguien a tu alrededor que necesita experimentar la gracia de Dios?",
    // revisado: 2026-11-10
  },
];
