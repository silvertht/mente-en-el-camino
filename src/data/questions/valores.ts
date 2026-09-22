import type { Question } from "../../types";

export const VALORES_QUESTIONS: Question[] = [
  {
    id: "val-001",
    type: "multiple-choice",
    category: "valores",
    difficulty: "facil",
    points: 10,
    timeLimit: 25,
    question: "¿Cuál es el primer y gran mandamiento según Jesús?",
    options: [
      "No matarás",
      "Amar a Dios sobre todas las cosas",
      "Honrar a los padres",
      "No robarás",
    ],
    correctIndex: 1,
    explanation:
      "Jesús dijo que el primer mandamiento es amar a Dios con todo el corazón, alma y mente. El segundo es amar al prójimo como a uno mismo.",
    verse: "Mateo 22:37-38",
    verseText:
      "Jesús le dijo: Amarás al Señor tu Dios con todo tu corazón, y con toda tu alma, y con toda tu mente. Este es el primero y grande mandamiento.",
    application:
      "El amor a Dios es la base de todo lo demás. Sin esto, las reglas se vuelven vacías.",
    reflection:
      '¿Qué significa amar a Dios "con toda tu mente" en tu vida diaria?',
  },
  {
    id: "val-002",
    type: "true-false",
    category: "valores",
    difficulty: "facil",
    points: 10,
    timeLimit: 20,
    statement: "La Biblia dice que debemos perdonar a quien nos ofende.",
    correct: true,
    explanation:
      "Jesús enseñó a perdonar 70 veces 7, es decir, sin límites. El perdón es un mandato, no una opción.",
    verse: "Mateo 18:22",
    verseText:
      "Jesús le dijo: No te digo hasta siete, sino aun hasta setenta veces siete.",
    application: "Perdonar no es olvidar, es soltar el derecho al rencor.",
    reflection:
      "¿A quién necesitas perdonar hoy para liberar tu propio corazón?",
  },
  {
    id: "val-003",
    type: "fill-blank",
    category: "valores",
    difficulty: "medio",
    points: 20,
    timeLimit: 25,
    verseWithBlank:
      "Honra a tu padre y a tu madre, para que tus días se ___ en la tierra que Jehová tu Dios te da.",
    options: ["acorten", "prolonguen", "cuenten", "terminen"],
    correctIndex: 1,
    explanation:
      "El quinto mandamiento es el primero con promesa: honrar a los padres prolonga la vida.",
    verse: "Éxodo 20:12",
    verseText:
      "Honra a tu padre y a tu madre, para que tus días se alarguen en la tierra que Jehová tu Dios te da.",
    application:
      "El respeto a los padres es una decisión diaria, incluso cuando no estamos de acuerdo con ellos.",
    reflection:
      "¿Cómo puedes honrar a tus padres esta semana, aunque no estés de acuerdo con todo?",
  },
  {
    id: "val-004",
    type: "multiple-choice",
    category: "valores",
    difficulty: "medio",
    points: 20,
    timeLimit: 25,
    question:
      "¿Qué dice Proverbios 3:5-6 que debemos hacer con todo nuestro corazón?",
    options: [
      "Confiar en Jehová",
      "Buscar riquezas",
      "Huir del mal",
      "Cantar alabanzas",
    ],
    correctIndex: 0,
    explanation:
      "Proverbios 3:5-6 nos llama a confiar en Jehová con todo el corazón y no apoyarnos en nuestra propia prudencia.",
    verse: "Proverbios 3:5-6",
    verseText:
      "Fíate de Jehová de todo tu corazón, y no te apoyes en tu propia prudencia. Reconócelo en todos tus caminos, y él enderezará tus veredas.",
    application:
      "Confiar en Dios no es pasividad, es decisión activa cada día.",
    reflection:
      "¿En qué área te cuesta confiar más en Dios que en tu propia lógica?",
  },
  {
    id: "val-005",
    type: "true-false",
    category: "valores",
    difficulty: "medio",
    points: 20,
    timeLimit: 20,
    statement:
      "La Biblia dice que el amor al dinero es la raíz de todos los males.",
    correct: true,
    explanation:
      "En 1 Timoteo 6:10 se advierte que el amor al dinero es raíz de toda clase de males.",
    verse: "1 Timoteo 6:10",
    verseText:
      "Porque raíz de todos los males es el amor al dinero, el cual codiciando algunos, se extraviaron de la fe, y fueron traspasados de muchos dolores.",
    application:
      "El dinero es una herramienta, no un señor. Cuando gobierna el corazón, destruye.",
    reflection: "¿Cómo afectan tus decisiones las prioridades económicas?",
  },
  {
    id: "val-006",
    type: "multiple-choice",
    category: "valores",
    difficulty: "dificil",
    points: 30,
    timeLimit: 30,
    question:
      "Según Romanos 12:2, ¿qué debemos hacer para no conformarnos al mundo?",
    options: [
      "Aislarnos de la sociedad",
      "Renovar nuestro entendimiento",
      "Ignorar la cultura",
      "Cambiar de amigos",
    ],
    correctIndex: 1,
    explanation:
      "Pablo llama a renovar el entendimiento para comprobar la buena, agradable y perfecta voluntad de Dios.",
    verse: "Romanos 12:2",
    verseText:
      "No os conforméis a este siglo, sino transformaos por medio de la renovación de vuestro entendimiento, para que comprobéis cuál sea la buena voluntad de Dios, agradable y perfecta.",
    application:
      "La transformación no viene de fuera hacia dentro, sino de dentro hacia fuera.",
    reflection: "¿Qué hábito mental necesitas renovar para pensar como Cristo?",
  },
  {
    id: "val-007",
    type: "hint-deduction",
    category: "valores",
    difficulty: "dificil",
    points: 30,
    timeLimit: 45,
    hints: [
      "Es un fruto del Espíritu.",
      "No es lo mismo que la tolerancia.",
      "Implica soportar a otros con amor.",
      "Gálatas 5:22 lo menciona entre el gozo y la benignidad.",
    ],
    answer: "Paz",
    acceptedAnswers: ["paz", "la paz"],
    explanation:
      "La paz es uno de los frutos del Espíritu. No es ausencia de conflictos, sino presencia de Dios en medio de ellos.",
    verse: "Gálatas 5:22",
    verseText:
      "Mas el fruto del Espíritu es amor, gozo, paz, paciencia, benignidad, bondad, fe.",
    application:
      "La paz verdadera no depende de las circunstancias, sino de quién gobierna el corazón.",
    reflection:
      "¿En qué áreas de tu vida has perdido la paz? ¿Qué te dice eso?",
  },
  {
    id: "val-008",
    type: "true-false",
    category: "valores",
    difficulty: "facil",
    points: 10,
    timeLimit: 20,
    statement: "Jesús enseñó que es más bendito dar que recibir.",
    correct: true,
    explanation:
      "Aunque la frase exacta aparece en Hechos 20:35, resume bien la enseñanza de Jesús sobre la generosidad.",
    verse: "Hechos 20:35",
    verseText:
      "En todo os he enseñado que, trabajando así, se debe ayudar a los necesitados, y recordar las palabras del Señor Jesús, que dijo: Más bienaventurado es dar que recibir.",
    application:
      "La generosidad libera el corazón de la avaricia y lo llena de gozo.",
    reflection:
      "¿Qué puedes dar esta semana que no sea dinero, sino tiempo o atención?",
  },
  {
    id: "val-009",
    type: "multiple-choice",
    category: "valores",
    difficulty: "medio",
    points: 20,
    timeLimit: 25,
    question: "Según Santiago 1:19, ¿qué tres cosas debemos ser?",
    options: [
      "Ricos, sabios y poderosos",
      "Prontos para oír, tardos para hablar, tardos para airarse",
      "Fuertes, valientes y sanos",
      "Humildes, generosos y sabios",
    ],
    correctIndex: 1,
    explanation:
      "Santiago nos llama a escuchar más, hablar menos y enojarnos con lentitud. La ira del hombre no obra la justicia de Dios.",
    verse: "Santiago 1:19",
    verseText:
      "Por esto, mis amados hermanos, todo hombre sea pronto para oír, tardo para hablar, tardo para airarse.",
    application:
      "Escuchar es una forma de amar. Hablar menos y escuchar más transforma relaciones.",
    reflection: "¿Qué relación mejoraría si escucharas más y hablaras menos?",
  },
  {
    id: "val-010",
    type: "fill-blank",
    category: "valores",
    difficulty: "dificil",
    points: 30,
    timeLimit: 30,
    verseWithBlank:
      "Porque donde están dos o tres congregados en mi ___, allí estoy yo en medio de ellos.",
    options: ["casa", "nombre", "templo", "pueblo"],
    correctIndex: 1,
    explanation:
      "Jesús promete Su presencia donde dos o tres se reúnen en Su nombre. La comunidad cristiana es un espacio sagrado.",
    verse: "Mateo 18:20",
    verseText:
      "Porque donde están dos o tres congregados en mi nombre, allí estoy yo en medio de ellos.",
    application:
      "No fuimos creados para vivir la fe solos. La comunidad es parte del plan de Dios.",
    reflection: "¿Cómo estás invirtiendo en tu comunidad de fe esta semana?",
  },
];
