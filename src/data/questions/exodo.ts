import type { Question } from "../../types";

export const EXODO_QUESTIONS: Question[] = [
  {
    id: "exo-001",
    type: "multiple-choice",
    category: "exodo",
    difficulty: "facil",
    points: 10,
    timeLimit: 25,
    question: "¿Cuál fue la décima y última plaga que sufrió Egipto?",
    options: [
      "Agua en sangre",
      "Ranas",
      "Muerte de los primogénitos",
      "Granizo",
    ],
    correctIndex: 2,
    explanation:
      "El juicio final sobre Egipto tocó el corazón mismo de su idolatría: la vida y el primogénito.",
    verse: "Éxodo 12:29",
    verseText:
      "Y aconteció que a la medianoche Jehová hirió a todo primogénito en la tierra de Egipto, desde el primogénito de Faraón que se sentaba sobre su trono hasta el primogénito del cautivo que estaba en la cárcel, y todo primogénito de los animales.",
    application:
      "El juicio de Dios es perfecto y culmina en la liberación de Su pueblo.",
    reflection: "¿Cómo te hace sentir el costo que tuvo la libertad de Israel?",
    // revisado: 2026-11-10
  },
  {
    id: "exo-002",
    type: "true-false",
    category: "exodo",
    difficulty: "facil",
    points: 10,
    timeLimit: 20,
    statement:
      "Dios enviaba el maná todos los días, pero en el día de reposo no caía.",
    correct: true,
    explanation:
      "El maná era un milagro diario, pero Dios probó la fe de Israel mandándoles recoger el doble en el sexto día para no trabajar en reposo.",
    verse: "Éxodo 16:26",
    verseText:
      "Seis días lo recogeréis; mas el séptimo día es día de reposo; en él no se hallará.",
    application:
      "Dios no solo nos provee el sustento, sino también el descanso. Confiar en Él es también saber parar.",
    reflection:
      "¿Te cuesta descansar y confiar en que Dios proveerá mientras descansas?",
    // revisado: 2026-11-10
  },
  {
    id: "exo-003",
    type: "who-said-it",
    category: "exodo",
    difficulty: "medio",
    points: 20,
    timeLimit: 25,
    quote:
      "No temáis; estad firmes, y ved la salvación que Jehová hará hoy con vosotros.",
    options: ["Josué", "Aarón", "Moisés", "Faraón"],
    correctIndex: 2,
    explanation:
      "Moisés animó al pueblo acorralado entre el ejército de Faraón y el Mar Rojo, recordándoles que la batalla era de Dios.",
    verse: "Éxodo 14:13",
    verseText:
      "Y Moisés dijo al pueblo: No temáis; estad firmes, y ved la salvación que Jehová hará hoy con vosotros.",
    application:
      "Cuando el miedo te rodee y no veas salida, recuerda que no tienes que pelear todas las batallas; Dios peleará por ti.",
    reflection: "¿Cuál es ese 'mar rojo' que te tiene paralizado hoy?",
    // revisado: 2026-11-10
  },
  {
    id: "exo-004",
    type: "multiple-choice",
    category: "exodo",
    difficulty: "facil",
    points: 10,
    timeLimit: 25,
    question: "¿Qué objeto mandó Dios a Moisés usar para abrir el Mar Rojo?",
    options: ["Su manto", "Su vara", "Una espada", "Una roca"],
    correctIndex: 1,
    explanation:
      "Dios usó la vara de Moisés como señal visible de Su poder para dividir las aguas.",
    verse: "Éxodo 14:16",
    verseText:
      "Y tú alza tu vara, y extiende tu mano sobre el mar, y divídelo, y entren los hijos de Israel por en medio del mar, en seco.",
    application:
      "Dios usa lo que tenemos en la mano (por sencillo que sea) para hacer milagros.",
    reflection:
      "¿Qué 'vara' (talento o recurso) tiene Dios en tus manos para obrar hoy?",
    // revisado: 2026-11-10
  },
  {
    id: "exo-005",
    type: "who-said-it",
    category: "exodo",
    difficulty: "medio",
    points: 20,
    timeLimit: 25,
    quote:
      "¿Quién es Jehová, para que yo oiga su voz y deje ir a Israel? Yo no conozco a Jehová, ni tampoco dejaré ir a Israel.",
    options: ["Faraón", "Moisés", "Aarón", "Un guardia egipcio"],
    correctIndex: 0,
    explanation:
      "Faraón endureció su corazón y se rebeló contra Dios, ignorando el poder que estaba a punto de quebrantar a Egipto.",
    verse: "Éxodo 5:2",
    verseText:
      "Y Faraón respondió: ¿Quién es Jehová, para que yo oiga su voz y deje ir a Israel? Yo no conozco a Jehová, ni tampoco dejaré ir a Israel.",
    application:
      "El orgullo nos hace creer que somos dioses, pero solo el Dios verdadero tiene el poder absoluto.",
    reflection:
      "¿En qué área de tu vida intentas resistirte a la voluntad de Dios?",
    // revisado: 2026-11-10
  },
  {
    id: "exo-006",
    type: "multiple-choice",
    category: "exodo",
    difficulty: "dificil",
    points: 30,
    timeLimit: 30,
    question:
      "¿Cuántos años vagó el pueblo de Israel por el desierto antes de entrar a la tierra prometida?",
    options: ["10 años", "40 años", "70 años", "400 años"],
    correctIndex: 1,
    explanation:
      "Por su incredulidad, la generación que salió de Egipto no entró a la tierra. Vagaron 40 años hasta que creció la nueva generación.",
    verse: "Números 14:33",
    verseText:
      "Y vuestros hijos andarán pastoreando en el desierto cuarenta años, y ellos llevarán vuestras rebeldías, hasta que vuestros cuerpos sean consumidos en el desierto.",
    application:
      "La incredulidad tiene un costo. Confiar en Dios nos ahorra años de dar vueltas en el desierto.",
    reflection:
      "¿Hay alguna 'tierra prometida' que estás postergando por miedo?",
    // revisado: 2026-11-10
  },
];
