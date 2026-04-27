/**
 * Data for Guide 24: Tú vs Usted.
 *
 * `scenarios` = 8 situational drill items.
 *   sit = the situation description
 *   answer = 'tú' | 'usted'
 *   why = explanation
 *
 * `pairs` = the learn-mode phrase pairs (informal vs formal).
 */

export interface TuUstedScenario {
  sit: string;
  answer: 'tú' | 'usted';
  why: string;
}

export interface TuUstedPair {
  ctx: string;
  inf: string;
  for: string;
}

export const pairs: TuUstedPair[] = [
  {ctx:"Greeting",inf:"¡Hola! ¿Qué onda?",for:"Buenos días. ¿Cómo está?"},
  {ctx:"Asking name",inf:"¿Cómo te llamas?",for:"¿Cómo se llama usted?"},
  {ctx:"Requesting",inf:"Pásame la sal.",for:"¿Me podría pasar la sal?"},
  {ctx:"Commands",inf:"¡Siéntate!",for:"Siéntese, por favor."},
  {ctx:"Goodbye",inf:"¡Nos vemos!",for:"Fue un placer. Que le vaya bien."},
  {ctx:"Doctor's office",inf:"—",for:"¿Cómo se siente hoy?"},
  {ctx:"Friend's parent",inf:"—",for:"Mucho gusto, señora."},
  {ctx:"Store clerk",inf:"—",for:"Disculpe, ¿cuánto cuesta esto?"},
];

export const scenarios: TuUstedScenario[] = [
  {sit:"Your best friend",answer:"tú",why:"Close personal relationship → always tú."},
  {sit:"A police officer",answer:"usted",why:"Authority figure → usted shows respect."},
  {sit:"Your professor",answer:"usted",why:"Formal setting → usted until they say otherwise."},
  {sit:"A child you just met",answer:"tú",why:"Children are always addressed as tú."},
  {sit:"A job interview",answer:"usted",why:"Professional/formal → usted is expected."},
  {sit:"Your coworker (same age)",answer:"tú",why:"Peers often use tú, but follow their lead."},
  {sit:"An elderly stranger",answer:"usted",why:"Age difference + stranger → usted."},
  {sit:"A waiter at a casual restaurant",answer:"usted",why:"Service context → usted is standard in most Latin American countries; in Spain, tú is common in casual venues."},
];
