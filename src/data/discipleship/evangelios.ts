import type {
  SendaDiscipulado,
  PreguntaReflexion,
} from "../../types/discipleship";

// ============================================================
// SENDA PILOTO · EVANGELIOS (B8)
// 3 niveles × 3 lecciones × 3 preguntas = 27
// ============================================================

// ── Nivel 1 · Lección 1 · El nacimiento de Jesús ────────────
const N1_L1: PreguntaReflexion[] = [
  {
    id: "evangelios:1:1:1",
    enunciado: "¿Por qué nació Jesús en Belén y no en Nazaret?",
    opciones: [
      "Para cumplir la profecía de Miqueas",
      "Porque José tenía trabajo allí",
      "Porque era la capital",
      "Por casualidad",
    ],
    correctIndex: 0,
    feedbackCorrecto: {
      afirmacion: "Así es. Dios cumple Su Palabra con precisión.",
      dato: "Belén era la ciudad de David; el Mesías debía salir de allí.",
      referenciaRVR1960: "Miqueas 5:2",
      reflexion: "¿Qué promesa de Dios te cuesta creer hoy?",
    },
    pistaReintento: "Lee Miqueas 5:2; el lugar estaba anunciado.",
    referenciaRVR1960: "Lucas 2:4-7",
  },
  {
    id: "evangelios:1:1:2",
    enunciado: "¿Quién anunció a María el nacimiento de Jesús?",
    opciones: [
      "El ángel Gabriel",
      "Un profeta",
      "El sacerdote Zacarías",
      "Un sueño de José",
    ],
    correctIndex: 0,
    feedbackCorrecto: {
      afirmacion: "Así es. Dios envía mensajeros fieles.",
      dato: "El ángel Gabriel llevó el anuncio a María en Nazaret.",
      referenciaRVR1960: "Lucas 1:31",
      reflexion: "¿Cómo respondes cuando Dios te pide algo difícil?",
    },
    pistaReintento: "El mismo ángel que habló a Daniel; Lucas 1:26.",
    referenciaRVR1960: "Lucas 1:26-31",
  },
  {
    id: "evangelios:1:1:3",
    enunciado: "¿Qué significa el nombre 'Jesús'?",
    opciones: ["Dios salva", "Rey de reyes", "Príncipe de paz", "Emanuel"],
    correctIndex: 0,
    feedbackCorrecto: {
      afirmacion: "Así es. Su nombre anuncia Su misión.",
      dato: "Jesús significa 'Jehová es salvación'.",
      referenciaRVR1960: "Mateo 1:21",
      reflexion: "¿Qué área de tu vida necesita la salvación de Jesús?",
    },
    pistaReintento: "Mateo 1:21 explica el nombre.",
    referenciaRVR1960: "Mateo 1:21",
  },
];

// ── Nivel 1 · Lección 2 · Bautismo y tentación ─────────────
const N1_L2: PreguntaReflexion[] = [
  {
    id: "evangelios:1:2:1",
    enunciado: "¿Quién bautizó a Jesús en el Jordán?",
    opciones: ["Juan el Bautista", "Pedro", "Zacarías", "Andrés"],
    correctIndex: 0,
    feedbackCorrecto: {
      afirmacion: "Así es. Juan preparó el camino del Señor.",
      dato: "Juan bautizaba en el Jordán para arrepentimiento.",
      referenciaRVR1960: "Mateo 3:13",
      reflexion: "¿Qué paso de obediencia te pide Dios hoy?",
    },
    pistaReintento: "Fue en el Jordán; Mateo 3:13.",
    referenciaRVR1960: "Mateo 3:13-17",
  },
  {
    id: "evangelios:1:2:2",
    enunciado: "¿Cuántos días ayunó Jesús en el desierto?",
    opciones: ["7", "21", "40", "50"],
    correctIndex: 2,
    feedbackCorrecto: {
      afirmacion: "Así es. Cuarenta días de preparación.",
      dato: "El número 40 recuerda a Moisés y Elías.",
      referenciaRVR1960: "Mateo 4:2",
      reflexion: "¿Cómo preparas tu corazón antes de decisiones grandes?",
    },
    pistaReintento: "Número bíblico de plenitud; Mateo 4:2.",
    referenciaRVR1960: "Mateo 4:2",
  },
  {
    id: "evangelios:1:2:3",
    enunciado: "¿Cómo venció Jesús la tentación en el desierto?",
    opciones: [
      "Con la Palabra de Dios",
      "Con ayuno solo",
      "Huyendo del diablo",
      "Con oración solamente",
    ],
    correctIndex: 0,
    feedbackCorrecto: {
      afirmacion: "Así es. La Escritura es nuestra defensa.",
      dato: "Jesús respondió tres veces: 'Escrito está'.",
      referenciaRVR1960: "Mateo 4:4",
      reflexion: "¿Qué versículo puedes memorizar para tu próxima prueba?",
    },
    pistaReintento: "Tres veces dijo 'escrito está'; Mateo 4:4.",
    referenciaRVR1960: "Mateo 4:4",
  },
];

// ── Nivel 1 · Lección 3 · Primeros discípulos ──────────────
const N1_L3: PreguntaReflexion[] = [
  {
    id: "evangelios:1:3:1",
    enunciado: "¿Cuántos apóstoles eligió Jesús?",
    opciones: ["7", "10", "12", "40"],
    correctIndex: 2,
    feedbackCorrecto: {
      afirmacion: "Así es. Doce, como las tribus de Israel.",
      dato: "El número 12 simboliza el nuevo pueblo de Dios.",
      referenciaRVR1960: "Lucas 6:13",
      reflexion: "¿Quiénes son tus 12 personas clave en la fe?",
    },
    pistaReintento: "Doce tribus, doce apóstoles; Lucas 6:13.",
    referenciaRVR1960: "Lucas 6:13",
  },
  {
    id: "evangelios:1:3:2",
    enunciado: "¿Qué oficio tenía Pedro antes de seguir a Jesús?",
    opciones: ["Pescador", "Carpintero", "Recaudador", "Pastor"],
    correctIndex: 0,
    feedbackCorrecto: {
      afirmacion: "Así es. Jesús llama en lo cotidiano.",
      dato: "Pedro y Andrés echaban la red al mar.",
      referenciaRVR1960: "Mateo 4:18",
      reflexion: "¿Cómo puede Dios usar tu trabajo diario?",
    },
    pistaReintento: "Pedro y Andrés eran pescadores; Mateo 4:18.",
    referenciaRVR1960: "Mateo 4:18",
  },
  {
    id: "evangelios:1:3:3",
    enunciado: "¿Qué dijo Jesús que haría a sus discípulos?",
    opciones: [
      "Pescadores de hombres",
      "Reyes de Israel",
      "Sacerdotes del templo",
      "Maestros de la ley",
    ],
    correctIndex: 0,
    feedbackCorrecto: {
      afirmacion: "Así es. La misión es alcanzar a otros.",
      dato: "El llamado incluye ser enviado a otros.",
      referenciaRVR1960: "Mateo 4:19",
      reflexion: "¿A quién te está llamando Dios a alcanzar?",
    },
    pistaReintento: "Mateo 4:19 lo dice claramente.",
    referenciaRVR1960: "Mateo 4:19",
  },
];

// ── Nivel 2 · Lección 1 · Sermón del Monte ─────────────────
const N2_L1: PreguntaReflexion[] = [
  {
    id: "evangelios:2:1:1",
    enunciado: "¿Con qué empiezan las bienaventuranzas?",
    opciones: [
      "Bienaventurados los pobres en espíritu",
      "Bienaventurados los ricos",
      "Bienaventurados los sabios",
      "Bienaventurados los fuertes",
    ],
    correctIndex: 0,
    feedbackCorrecto: {
      afirmacion: "Así es. El Reino empieza por el corazón humilde.",
      dato: "La pobreza en espíritu es reconocer necesidad de Dios.",
      referenciaRVR1960: "Mateo 5:3",
      reflexion: "¿Reconoces tu necesidad de Dios cada día?",
    },
    pistaReintento: "Mateo 5:3 abre el Sermón.",
    referenciaRVR1960: "Mateo 5:3",
  },
  {
    id: "evangelios:2:1:2",
    enunciado: "Según Jesús, ¿quiénes son 'la sal de la tierra'?",
    opciones: ["Sus discípulos", "La ley", "El templo", "Los profetas"],
    correctIndex: 0,
    feedbackCorrecto: {
      afirmacion: "Así es. Los discípulos dan sabor al mundo.",
      dato: "La sal preserva y da sabor; así el creyente.",
      referenciaRVR1960: "Mateo 5:13",
      reflexion: "¿Cómo das 'sabor' en tu entorno hoy?",
    },
    pistaReintento: "Mateo 5:13 lo compara.",
    referenciaRVR1960: "Mateo 5:13",
  },
  {
    id: "evangelios:2:1:3",
    enunciado: "¿Qué actitud manda Jesús ante los enemigos?",
    opciones: [
      "Amarlos y orar por ellos",
      "Ignorarlos",
      "Vengarse",
      "Denunciarlos",
    ],
    correctIndex: 0,
    feedbackCorrecto: {
      afirmacion: "Así es. El amor vence al odio.",
      dato: "Amar al enemigo refleja el carácter del Padre.",
      referenciaRVR1960: "Mateo 5:44",
      reflexion: "¿Por quién te cuesta orar hoy?",
    },
    pistaReintento: "Mateo 5:44 lo manda.",
    referenciaRVR1960: "Mateo 5:44",
  },
];

// ── Nivel 2 · Lección 2 · Parábolas del Reino ──────────────
const N2_L2: PreguntaReflexion[] = [
  {
    id: "evangelios:2:2:1",
    enunciado: "¿A qué compara Jesús el Reino en la parábola del tesoro?",
    opciones: [
      "A un tesoro escondido por el que vale renunciar a todo",
      "A una moneda perdida",
      "A una fiesta de bodas",
      "A un banquete de reyes",
    ],
    correctIndex: 0,
    feedbackCorrecto: {
      afirmacion: "Así es. El Reino vale más que todo.",
      dato: "El hombre vendió todo con gozo por el tesoro.",
      referenciaRVR1960: "Mateo 13:44",
      reflexion: "¿Qué te cuesta 'vender' por seguir a Jesús?",
    },
    pistaReintento: "Mateo 13:44 lo explica.",
    referenciaRVR1960: "Mateo 13:44",
  },
  {
    id: "evangelios:2:2:2",
    enunciado: "¿Quién siembra la buena semilla en la parábola?",
    opciones: ["El Hijo del Hombre", "El enemigo", "Un ángel", "El labrador"],
    correctIndex: 0,
    feedbackCorrecto: {
      afirmacion: "Así es. Jesús siembra Su Palabra.",
      dato: "El campo es el mundo; la semilla es el Evangelio.",
      referenciaRVR1960: "Mateo 13:37",
      reflexion: "¿Dónde estás sembrando la Palabra de Dios?",
    },
    pistaReintento: "Mateo 13:37 lo revela.",
    referenciaRVR1960: "Mateo 13:37",
  },
  {
    id: "evangelios:2:2:3",
    enunciado: "¿Qué hace el padre en la parábola del hijo pródigo?",
    opciones: [
      "Corre a recibirlo y hace fiesta",
      "Lo rechaza",
      "Lo castiga",
      "Lo pone a trabajar",
    ],
    correctIndex: 0,
    feedbackCorrecto: {
      afirmacion: "Así es. El Padre recibe al que vuelve.",
      dato: "El padre corrió, lo abrazó y celebró su regreso.",
      referenciaRVR1960: "Lucas 15:20",
      reflexion: "¿Vuelves al Padre cuando te alejas?",
    },
    pistaReintento: "Lucas 15:20 muestra el corazón del padre.",
    referenciaRVR1960: "Lucas 15:20",
  },
];

// ── Nivel 2 · Lección 3 · Mandamientos del amor ────────────
const N2_L3: PreguntaReflexion[] = [
  {
    id: "evangelios:2:3:1",
    enunciado: "¿Cuál es el mandamiento más grande según Jesús?",
    opciones: [
      "Amar a Dios sobre todas las cosas",
      "No matarás",
      "Guardar el sábado",
      "Honrar a los padres",
    ],
    correctIndex: 0,
    feedbackCorrecto: {
      afirmacion: "Así es. El amor a Dios es primero.",
      dato: "Todo lo demás fluye del amor a Dios.",
      referenciaRVR1960: "Mateo 22:37-38",
      reflexion: "¿Cómo demuestras hoy tu amor a Dios?",
    },
    pistaReintento: "Mateo 22:37 lo dice.",
    referenciaRVR1960: "Mateo 22:37-38",
  },
  {
    id: "evangelios:2:3:2",
    enunciado: "¿Cuál es el segundo mandamiento según Jesús?",
    opciones: [
      "Amar al prójimo como a ti mismo",
      "No robar",
      "No mentir",
      "No codiciar",
    ],
    correctIndex: 0,
    feedbackCorrecto: {
      afirmacion: "Así es. El segundo es igual al primero.",
      dato: "El amor al prójimo es la prueba del amor a Dios.",
      referenciaRVR1960: "Mateo 22:39",
      reflexion: "¿Quién es el 'prójimo' que te cuesta amar hoy?",
    },
    pistaReintento: "Mateo 22:39 lo completa.",
    referenciaRVR1960: "Mateo 22:39",
  },
  {
    id: "evangelios:2:3:3",
    enunciado: "¿Qué señal distingue a los discípulos de Jesús?",
    opciones: [
      "Amarse unos a otros",
      "Guardar el sábado",
      "Orar en público",
      "Citar la ley",
    ],
    correctIndex: 0,
    feedbackCorrecto: {
      afirmacion: "Así es. El amor mutuo testifica al mundo.",
      dato: "Jesús llamó a este un mandamiento nuevo.",
      referenciaRVR1960: "Juan 13:34-35",
      reflexion: "¿Cómo te reconocen como discípulo de Jesús?",
    },
    pistaReintento: "Juan 13:35 lo declara.",
    referenciaRVR1960: "Juan 13:34-35",
  },
];

// ── Nivel 3 · Lección 1 · La última cena ───────────────────
const N3_L1: PreguntaReflexion[] = [
  {
    id: "evangelios:3:1:1",
    enunciado: "¿Qué instituyó Jesús en la última cena?",
    opciones: [
      "La comunión (pan y vino)",
      "El bautismo",
      "El ayuno",
      "La oración en público",
    ],
    correctIndex: 0,
    feedbackCorrecto: {
      afirmacion: "Así es. La comunión recuerda Su sacrificio.",
      dato: "El pan y el vino señalan Su cuerpo y Su sangre.",
      referenciaRVR1960: "Lucas 22:19-20",
      reflexion: "¿Qué significa para ti participar de la comunión?",
    },
    pistaReintento: "Lucas 22:19-20 lo instituye.",
    referenciaRVR1960: "Lucas 22:19-20",
  },
  {
    id: "evangelios:3:1:2",
    enunciado: "¿Qué dijo Jesús al partir el pan?",
    opciones: [
      "Esto es mi cuerpo",
      "Esto es mi sangre",
      "Esto es la ley",
      "Esto es la promesa",
    ],
    correctIndex: 0,
    feedbackCorrecto: {
      afirmacion: "Así es. El pan señala Su entrega.",
      dato: "La cena anticipa Su muerte en la cruz.",
      referenciaRVR1960: "Lucas 22:19",
      reflexion: "¿Cómo vives recordando el sacrificio de Jesús?",
    },
    pistaReintento: "Lucas 22:19 lo dice.",
    referenciaRVR1960: "Lucas 22:19",
  },
  {
    id: "evangelios:3:1:3",
    enunciado: "¿Quién traicionó a Jesús?",
    opciones: ["Judas Iscariote", "Pedro", "Tomás", "Mateo"],
    correctIndex: 0,
    feedbackCorrecto: {
      afirmacion: "Así es. La traición vino de un cercano.",
      dato: "Judas pactó entregarlo por 30 piezas de plata.",
      referenciaRVR1960: "Mateo 26:14-16",
      reflexion: "¿Cómo proteges tu corazón de la traición?",
    },
    pistaReintento: "Mateo 26:14-16 lo nombra.",
    referenciaRVR1960: "Mateo 26:14-16",
  },
];

// ── Nivel 3 · Lección 2 · La crucifixión ───────────────────
const N3_L2: PreguntaReflexion[] = [
  {
    id: "evangelios:3:2:1",
    enunciado: "¿En qué lugar fue crucificado Jesús?",
    opciones: ["En el Gólgota", "En el templo", "En el Jordán", "En Betania"],
    correctIndex: 0,
    feedbackCorrecto: {
      afirmacion: "Así es. Murió fuera de la ciudad.",
      dato: "Gólgota significa 'lugar de la calavera'.",
      referenciaRVR1960: "Lucas 23:33",
      reflexion: "¿Qué significa que Jesús murió por ti?",
    },
    pistaReintento: "Lucas 23:33 menciona el lugar.",
    referenciaRVR1960: "Lucas 23:33",
  },
  {
    id: "evangelios:3:2:2",
    enunciado: "¿Qué palabras dijo Jesús en la cruz al Padre?",
    opciones: [
      "Padre, perdónalos",
      "Padre, sálvalos",
      "Padre, bendícelos",
      "Padre, juzga al mundo",
    ],
    correctIndex: 0,
    feedbackCorrecto: {
      afirmacion: "Así es. Oró por quienes lo mataban.",
      dato: "El perdón de Jesús es radical y sin condiciones.",
      referenciaRVR1960: "Lucas 23:34",
      reflexion: "¿A quién necesitas perdonar hoy?",
    },
    pistaReintento: "Lucas 23:34 lo recoge.",
    referenciaRVR1960: "Lucas 23:34",
  },
  {
    id: "evangelios:3:2:3",
    enunciado: "¿Quién cargó la cruz de Jesús al inicio?",
    opciones: ["Simón de Cirene", "Pedro", "Juan", "José de Arimatea"],
    correctIndex: 0,
    feedbackCorrecto: {
      afirmacion: "Así es. Simón compartió el peso de la cruz.",
      dato: "Simón venía del campo y fue forzado a llevarla.",
      referenciaRVR1960: "Lucas 23:26",
      reflexion: "¿Cómo puedes aliviar la carga de otro esta semana?",
    },
    pistaReintento: "Lucas 23:26 lo identifica.",
    referenciaRVR1960: "Lucas 23:26",
  },
];

// ── Nivel 3 · Lección 3 · La resurrección ──────────────────
const N3_L3: PreguntaReflexion[] = [
  {
    id: "evangelios:3:3:1",
    enunciado: "¿En qué día resucitó Jesús?",
    opciones: [
      "Al tercer día",
      "Al séptimo día",
      "A los 40 días",
      "A los 50 días",
    ],
    correctIndex: 0,
    feedbackCorrecto: {
      afirmacion: "Así es. Resucitó al tercer día.",
      dato: "Lo había anunciado varias veces antes de morir.",
      referenciaRVR1960: "Lucas 24:7",
      reflexion: "¿Cómo cambia tu vida la resurrección?",
    },
    pistaReintento: "Lucas 24:7 lo anuncia.",
    referenciaRVR1960: "Lucas 24:7",
  },
  {
    id: "evangelios:3:3:2",
    enunciado: "¿Quién vio primero a Jesús resucitado según Juan?",
    opciones: ["María Magdalena", "Pedro", "Juan", "Tomás"],
    correctIndex: 0,
    feedbackCorrecto: {
      afirmacion: "Así es. María fue testigo del Resucitado.",
      dato: "Jesús la llamó por nombre junto al sepulcro.",
      referenciaRVR1960: "Juan 20:14-16",
      reflexion: "¿Cómo escuchas hoy la voz de Jesús?",
    },
    pistaReintento: "Juan 20:14 lo relata.",
    referenciaRVR1960: "Juan 20:14-16",
  },
  {
    id: "evangelios:3:3:3",
    enunciado: "¿Qué pidió Jesús a Tomás para que creyera?",
    opciones: [
      "Ver las heridas y meter la mano",
      "Solo orar",
      "Ayunar tres días",
      "Ir al templo",
    ],
    correctIndex: 0,
    feedbackCorrecto: {
      afirmacion: "Así es. Tomás pasó de duda a adoración.",
      dato: "Vio y tocó; luego exclamó: '¡Señor mío, y Dios mío!'.",
      referenciaRVR1960: "Juan 20:27",
      reflexion: "¿Qué duda te gustaría poner delante de Jesús?",
    },
    pistaReintento: "Juan 20:27 lo dice.",
    referenciaRVR1960: "Juan 20:27",
  },
];

// ============================================================
// COMPOSICIÓN FINAL DE LA SENDA
// ============================================================

export const SENDA_EVANGELIOS: SendaDiscipulado = {
  sendaId: "evangelios",
  titulo: "Evangelios",
  descripcion: "La vida, milagros y enseñanzas de Jesús.",
  esPiloto: true,
  niveles: [
    {
      sendaId: "evangelios",
      nivelNumber: 1,
      titulo: "Fundamentos",
      lecciones: [
        {
          id: "evangelios:1:1",
          sendaId: "evangelios",
          nivelNumber: 1,
          leccionNumber: 1,
          titulo: "El nacimiento de Jesús",
          introduccion: "Dios entra en la historia con un niño.",
          preguntas: N1_L1,
        },
        {
          id: "evangelios:1:2",
          sendaId: "evangelios",
          nivelNumber: 1,
          leccionNumber: 2,
          titulo: "Bautismo y tentación",
          introduccion: "El inicio público del ministerio de Jesús.",
          preguntas: N1_L2,
        },
        {
          id: "evangelios:1:3",
          sendaId: "evangelios",
          nivelNumber: 1,
          leccionNumber: 3,
          titulo: "Primeros discípulos",
          introduccion: "Jesús llama a personas comunes.",
          preguntas: N1_L3,
        },
      ],
    },
    {
      sendaId: "evangelios",
      nivelNumber: 2,
      titulo: "Enseñanzas",
      lecciones: [
        {
          id: "evangelios:2:1",
          sendaId: "evangelios",
          nivelNumber: 2,
          leccionNumber: 1,
          titulo: "Sermón del Monte",
          introduccion: "El corazón del Reino.",
          preguntas: N2_L1,
        },
        {
          id: "evangelios:2:2",
          sendaId: "evangelios",
          nivelNumber: 2,
          leccionNumber: 2,
          titulo: "Parábolas del Reino",
          introduccion: "Historias que revelan lo invisible.",
          preguntas: N2_L2,
        },
        {
          id: "evangelios:2:3",
          sendaId: "evangelios",
          nivelNumber: 2,
          leccionNumber: 3,
          titulo: "Mandamientos del amor",
          introduccion: "Amar es el centro de la ley.",
          preguntas: N2_L3,
        },
      ],
    },
    {
      sendaId: "evangelios",
      nivelNumber: 3,
      titulo: "Pasión y Resurrección",
      lecciones: [
        {
          id: "evangelios:3:1",
          sendaId: "evangelios",
          nivelNumber: 3,
          leccionNumber: 1,
          titulo: "La última cena",
          introduccion: "El pacto anticipado en pan y vino.",
          preguntas: N3_L1,
        },
        {
          id: "evangelios:3:2",
          sendaId: "evangelios",
          nivelNumber: 3,
          leccionNumber: 2,
          titulo: "La crucifixión",
          introduccion: "El amor llevado hasta el extremo.",
          preguntas: N3_L2,
        },
        {
          id: "evangelios:3:3",
          sendaId: "evangelios",
          nivelNumber: 3,
          leccionNumber: 3,
          titulo: "La resurrección",
          introduccion: "La victoria que cambia todo.",
          preguntas: N3_L3,
        },
      ],
    },
  ],
};
