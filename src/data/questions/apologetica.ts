import type { Question } from "../../types";

export const APOLOGETICA_QUESTIONS: Question[] = [
  // ... (apo-001 a apo-007 se mantienen exactamente igual)
  {
    id: "apo-001",
    type: "multiple-choice",
    category: "apologetica",
    difficulty: "medio",
    points: 20,
    timeLimit: 25,
    question:
      "Según el Evangelio de Juan, ¿a quién se le apareció Jesús primero después de resucitar?",
    options: ["A Pedro", "A Juan", "A María Magdalena", "A Tomás"],
    correctIndex: 2,
    explanation:
      "María Magdalena fue la primera testigo de la resurrección. Este detalle es históricamente fuerte porque en la cultura de la época, el testimonio femenino tenía poco valor legal. Si la iglesia hubiera inventado la historia, jamás habría elegido a una mujer como primer testigo.",
    verse: "Juan 20:16",
    verseText:
      "Jesús le dijo: ¡María! Volviéndose ella, le dijo: ¡Raboni! (que quiere decir, Maestro).",
    application:
      "Dios valora a quienes el mundo a veces ignora. La resurrección es un hecho histórico que sigue transformando vidas.",
    reflection:
      "¿La evidencia de la resurrección fortalece tu fe o aún tienes dudas intelectuales?",
    // revisado: 2026-11-10
  },
  {
    id: "apo-002",
    type: "fill-blank",
    category: "apologetica",
    difficulty: "dificil",
    points: 30,
    timeLimit: 30,
    verseWithBlank:
      "Estad siempre preparados para presentar defensa con mansedumbre y ___ a todo el que os demande razón de la esperanza que hay en vosotros.",
    options: ["firmeza", "reverencia", "sabiduría", "valentía"],
    correctIndex: 1,
    explanation:
      "La apologética no es ganar una discusión con arrogancia, sino dar razón de la esperanza que hay en nosotros con respeto y temor de Dios.",
    verse: "1 Pedro 3:15",
    verseText:
      "sino santificad a Dios el Señor en vuestros corazones, y estad siempre preparados para presentar defensa con mansedumbre y reverencia ante todo el que os demande razón de la esperanza que hay en vosotros;",
    application:
      "Defender la fe es un mandato, pero la forma importa tanto como el contenido.",
    reflection: "¿Con qué actitud defiendes tu fe cuando alguien te cuestiona?",
    // revisado: 2026-11-10
  },
  {
    id: "apo-003",
    type: "multiple-choice",
    category: "apologetica",
    difficulty: "facil",
    points: 10,
    timeLimit: 25,
    question:
      "¿Qué apóstol dudó de la resurrección de Jesús hasta que vio sus heridas?",
    options: ["Pedro", "Juan", "Tomás", "Judas"],
    correctIndex: 2,
    explanation:
      "Tomás exigió ver las heridas para creer. Jesús no lo rechazó, sino que lo invitó a tocar y creer.",
    verse: "Juan 20:25",
    verseText:
      "Le dijeron, pues, los otros discípulos: Al Señor hemos visto. Él les dijo: Si no viere en sus manos la señal de los clavos, y metiere mi dedo en el lugar de los clavos, y metiere mi mano en su costado, no creeré.",
    application:
      "Dios tiene paciencia con nuestras dudas honestas y siempre nos da evidencia para creer.",
    reflection: "¿Qué duda de fe necesitas llevarle a Dios hoy?",
    // revisado: 2026-11-10
  },
  {
    id: "apo-004",
    type: "true-false",
    category: "apologetica",
    difficulty: "facil",
    points: 10,
    timeLimit: 20,
    statement:
      "La fe cristiana se basa en hechos históricos verificables, como la resurrección de Jesús, y no solo en sentimientos.",
    correct: true,
    explanation:
      "Pablo dejó claro que si Cristo no resucitó realmente, nuestra fe es vana. La resurrección es un evento histórico, no una metáfora.",
    verse: "1 Corintios 15:14",
    verseText:
      "Y si Cristo no resucitó, vana es entonces nuestra predicación, vana es también vuestra fe.",
    application:
      "Nuestra fe no es un salto al vacío, sino una confianza basada en hechos que ocurrieron en la historia.",
    reflection:
      "¿Cómo te ayuda saber que tu fe está anclada en hechos históricos?",
    // revisado: 2026-11-10
  },
  {
    id: "apo-005",
    type: "multiple-choice",
    category: "apologetica",
    difficulty: "facil",
    points: 10,
    timeLimit: 25,
    question:
      "¿Cuál es la principal evidencia de que la Biblia es un libro confiable, según la apologética cristiana?",
    options: [
      "Que fue escrita por reyes y gobernantes",
      "Que fue escrita por más de 40 autores en 1,500 años con un mensaje coherente",
      "Que la iglesia la eligió por votación democrática",
      "Que solo tiene libros de historia",
    ],
    correctIndex: 1,
    explanation:
      "La Biblia fue escrita por más de 40 autores, en 3 continentes, en 3 idiomas y durante 1,500 años. A pesar de eso, presenta un mensaje coherente sobre la redención de la humanidad. Esa unidad solo se explica por la inspiración divina.",
    verse: "2 Timoteo 3:16",
    verseText:
      "Toda la Escritura es inspirada por Dios, y útil para enseñar, para redargüir, para corregir, para instruir en justicia.",
    application:
      "La unidad de la Biblia es una de las pruebas más sólidas de que Dios está detrás de ella.",
    reflection:
      "¿Cómo cambia tu lectura de la Biblia el saber que tiene una unidad sobrenatural?",
    // revisado: 2026-11-10
  },
  {
    id: "apo-006",
    type: "fill-blank",
    category: "apologetica",
    difficulty: "medio",
    points: 20,
    timeLimit: 25,
    verseWithBlank:
      "Porque las cosas invisibles de él, su eterno poder y deidad, se hacen claramente visibles desde la creación del mundo, siendo entendidas por medio de las cosas hechas, de modo que no tienen ___.",
    options: ["excusa", "esperanza", "defensa", "temor"],
    correctIndex: 0,
    explanation:
      "Pablo argumenta que la creación misma es evidencia suficiente de la existencia de Dios. Nadie puede decir que no lo conocía.",
    verse: "Romanos 1:20",
    verseText:
      "Porque las cosas invisibles de él, su eterno poder y deidad, se hacen claramente visibles desde la creación del mundo, siendo entendidas por medio de las cosas hechas, de modo que no tienen excusa.",
    application:
      "La naturaleza es un sermón continuo. Cada cosa creada apunta a su Creador.",
    reflection:
      "¿Cuándo fue la última vez que contemplaste la creación y pensaste en su Creador?",
    // revisado: 2026-11-10
  },
  {
    id: "apo-007",
    type: "timeline",
    category: "apologetica",
    difficulty: "dificil",
    points: 30,
    timeLimit: 40,
    events: [
      "El imperio persa conquista Babilonia",
      "El imperio romano destruye Jerusalén",
      "El imperio griego invade el Medio Oriente",
      "Egipto se convierte en la primera potencia mundial",
    ],
    correctOrder: [3, 0, 2, 1],
    explanation:
      "Daniel 2 y 7 describen cuatro imperios que dominarían el mundo: Babilonia, Medo-Persia, Grecia y Roma. La historia confirma que cada uno sucedió al otro en orden exacto, demostrando que la profecía bíblica es precisa.",
    verse: "Daniel 2:21",
    verseText:
      "Él muda los tiempos y las edades; quita reyes, y pone reyes; da la sabiduría a los sabios, y la ciencia a los entendidos.",
    application:
      "Dios está por encima de la política y los imperios. Ningún poder humano escapa a Su soberanía.",
    reflection:
      "¿Cómo te ayuda saber que Dios controla la historia a no temer a los cambios del mundo?",
    // revisado: 2026-11-10
  },
  {
    id: "apo-008",
    type: "multiple-choice",
    category: "apologetica",
    difficulty: "facil",
    points: 10,
    timeLimit: 25,
    question:
      "¿Qué rey de Israel es conocido por haber escrito la mayoría de los Salmos?",
    options: ["Salomón", "David", "Ezequías", "Josías"],
    correctIndex: 1,
    explanation:
      "David, un hombre conforme al corazón de Dios, nos dejó un legado de adoración. Los Salmos reflejan la gama completa de emociones humanas, demostrando que podemos hablar con Dios con total honestidad.",
    verse: "Salmos 23:1",
    verseText: "Jehová es mi pastor; nada me faltará.",
    application:
      "La adoración no es solo cantar, es expresar tu corazón a Dios en cualquier situación.",
    reflection:
      "¿Has usado los Salmos para expresar tu tristeza o alegría a Dios?",
    // revisado: 2026-11-10
  },
  {
    id: "apo-009",
    type: "fill-blank",
    category: "apologetica",
    difficulty: "medio",
    points: 20,
    timeLimit: 25,
    verseWithBlank:
      "Estad siempre preparados para presentar defensa con mansedumbre y ___ a todo el que os demande razón de la esperanza que hay en vosotros.",
    options: ["reverencia", "sabiduría", "valentía", "gracia"],
    correctIndex: 0,
    explanation:
      "Pedro nos recuerda que la defensa de la fe debe ir acompañada de reverencia y respeto. No se trata de ganar debates, sino de reflejar el carácter de Cristo.",
    verse: "1 Pedro 3:15",
    verseText:
      "sino santificad a Dios el Señor en vuestros corazones, y estad siempre preparados para presentar defensa con mansedumbre y reverencia ante todo el que os demande razón de la esperanza que hay en vosotros;",
    application:
      "La forma en que defiendes tu fe puede atraer o alejar a las personas de Dios.",
    reflection: "¿Estás listo para defender tu fe con respeto y amor?",
    // revisado: 2026-11-10
  },
  {
    id: "apo-010",
    type: "timeline",
    category: "apologetica",
    difficulty: "dificil",
    points: 30,
    timeLimit: 40,
    events: [
      "El martirio de Esteban",
      "La conversión de Saulo de Tarso",
      "El Concilio de Jerusalén",
      "Pablo escribe la Epístola a los Romanos",
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      "El libro de Hechos registra la expansión de la iglesia: comenzó con el martirio de Esteban, siguió con la conversión de Pablo, luego el Concilio de Jerusalén, y culminó con la escritura de Romanos, la carta más teológica de Pablo.",
    verse: "Hechos 1:8",
    verseText:
      "Pero recibiréis poder, cuando haya venido sobre vosotros el Espíritu Santo, y me seréis testigos en Jerusalén, en toda Judea, en Samaria, y hasta lo último de la tierra.",
    application:
      "La iglesia creció a través de la persecución y el testimonio. Dios usa incluso las dificultades para expandir Su Reino.",
    reflection: "¿Cómo puedes ser testigo de Cristo en tu entorno hoy?",
    // revisado: 2026-11-10
  },
];
