/**
 * Data for Guide 27 — El Tiempo (weather-expression cards).
 * Lifted from guide27.tsx so extractors can import without touching React.
 *
 * 14 weather expressions — each maps an English phrase + icon to the
 * canonical Spanish expression.
 *
 * Three grammatical patterns:
 *   HACE + noun   (calor/frío/viento/sol/buen tiempo/mal tiempo)
 *   ESTÁ + gerund/adj (lloviendo/nevando/nublado/despejado)
 *   HAY + noun    (niebla/tormenta/granizo/lluvia)
 */

export type WeatherType = "hace" | "esta" | "hay";

export interface WeatherEntry {
  /** Spanish expression */
  expr: string;
  /** English meaning */
  eng: string;
  /** Grammatical pattern */
  type: WeatherType;
  /** Emoji icon */
  icon: string;
  /** Spanish example sentence */
  ex: string;
  /** English translation of example */
  exE: string;
}

export const weatherExpr: WeatherEntry[] = [
  { expr: "Hace calor",       eng: "It's hot",              type: "hace", icon: "🌡️", ex: "Hoy hace mucho calor.",                 exE: "Today it's very hot." },
  { expr: "Hace frío",        eng: "It's cold",             type: "hace", icon: "🥶", ex: "En enero hace mucho frío.",              exE: "In January it's very cold." },
  { expr: "Hace viento",      eng: "It's windy",            type: "hace", icon: "💨", ex: "Hace mucho viento hoy.",                exE: "It's very windy today." },
  { expr: "Hace sol",         eng: "It's sunny",            type: "hace", icon: "☀️", ex: "Hace sol en verano.",                   exE: "It's sunny in summer." },
  { expr: "Hace buen tiempo", eng: "The weather is nice",   type: "hace", icon: "😊", ex: "Hoy hace buen tiempo.",                exE: "The weather is nice today." },
  { expr: "Hace mal tiempo",  eng: "The weather is bad",    type: "hace", icon: "🌩️", ex: "Hace mal tiempo esta semana.",          exE: "The weather is bad this week." },
  { expr: "Está lloviendo",   eng: "It's raining",          type: "esta", icon: "🌧️", ex: "Está lloviendo mucho.",               exE: "It's raining a lot." },
  { expr: "Está nevando",     eng: "It's snowing",          type: "esta", icon: "❄️", ex: "Está nevando en las montañas.",        exE: "It's snowing in the mountains." },
  { expr: "Está nublado",     eng: "It's cloudy",           type: "esta", icon: "☁️", ex: "Está muy nublado hoy.",               exE: "It's very cloudy today." },
  { expr: "Está despejado",   eng: "It's clear",            type: "esta", icon: "🌤️", ex: "Está despejado esta mañana.",         exE: "It's clear this morning." },
  { expr: "Hay niebla",       eng: "There's fog",           type: "hay",  icon: "🌫️", ex: "Hay mucha niebla en la costa.",       exE: "There's a lot of fog on the coast." },
  { expr: "Hay tormenta",     eng: "There's a storm",       type: "hay",  icon: "⛈️", ex: "Hay una tormenta esta noche.",        exE: "There's a storm tonight." },
  { expr: "Hay granizo",      eng: "There's hail",          type: "hay",  icon: "🌨️", ex: "Hay granizo en el norte.",            exE: "There's hail in the north." },
  { expr: "Hay lluvia",       eng: "There's rain",          type: "hay",  icon: "🌂", ex: "Hay lluvia toda la semana.",           exE: "There's rain all week." },
];
