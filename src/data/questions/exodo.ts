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
];
