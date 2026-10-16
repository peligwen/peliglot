import type { ExamQuestion } from './types';

/** ACS Area IV — Loading and performance. */
export const loadingQuestions: ExamQuestion[] = [
  // ── weight-balance (guide 22) ───────────────────────────────────────────
  {
    id: 'load-wb-1', area: 'IV', topic: 'weight-balance',
    q: 'The center of gravity is',
    options: ['the point about which an aircraft would balance if suspended.', 'the geometric center of the airframe.', 'the location of the main battery.'],
    answer: 0,
    explain: 'The CG moves whenever payload, batteries, or accessories move. It must stay within the manufacturer\'s limits for the aircraft to be controllable.',
  },
  {
    id: 'load-wb-2', area: 'IV', topic: 'weight-balance',
    q: 'A fixed-wing UA loaded with its CG behind the aft limit will be',
    options: ['less stable, with a tendency to pitch up, and may be impossible to recover from a stall.', 'more stable and easier to control.', 'nose-heavy with a higher stall speed.'],
    answer: 0,
    explain: 'Forward CG: stable, nose-heavy, higher stall speed, more drag. Aft CG: unstable, lower stall speed, but the tail may lack authority to recover. Aft is the dangerous one.',
  },
  {
    id: 'load-wb-3', area: 'IV', topic: 'weight-balance',
    q: 'A multirotor carrying a payload mounted off-center will',
    options: ['require some motors to work harder than others, reducing endurance and control margin.', 'fly normally because the flight controller fully compensates.', 'gain stability from the uneven load.'],
    answer: 0,
    explain: 'The flight controller can level the aircraft, but only by running the motors on the heavy side at higher throttle. Those motors reach their limit first in a gust.',
  },
  {
    id: 'load-wb-4', area: 'IV', topic: 'weight-balance',
    q: 'Before adding a heavier camera gimbal to a small UA, the remote pilot should confirm that',
    options: ['the new total weight and CG stay within the manufacturer\'s published limits.', 'the aircraft is still under 55 lb; nothing else matters.', 'the gimbal is registered separately.'],
    answer: 0,
    explain: 'The 55-lb line is a regulatory limit; the manufacturer\'s maximum takeoff weight is a performance and structural limit, and it is usually far lower.',
  },
  {
    id: 'load-wb-5', area: 'IV', topic: 'weight-balance',
    q: 'An item weighing 2 lb located 10 inches from the datum has a moment of',
    options: ['20 lb-in.', '5 lb-in.', '12 lb-in.'],
    answer: 0,
    explain: 'Moment = weight × arm. The datum is the reference line the manufacturer chooses; all arms are measured from it.',
  },
  {
    id: 'load-wb-6', area: 'IV', topic: 'weight-balance',
    q: 'A UA has 3 lb at 4 inches from the datum and 1 lb at 12 inches from the datum. The CG is at',
    options: ['6 inches.', '8 inches.', '4 inches.'],
    answer: 0,
    explain: 'Total moment = (3 × 4) + (1 × 12) = 24 lb-in. Total weight = 4 lb. CG = 24 ÷ 4 = 6 inches from the datum.',
  },
  {
    id: 'load-wb-7', area: 'IV', topic: 'weight-balance',
    q: 'Operating a small UA above its maximum gross weight',
    options: ['raises stall speed, reduces climb and maneuverability, shortens battery life, and increases structural stress in turbulence.', 'improves stability in gusty conditions.', 'has no effect as long as the CG is correct.'],
    answer: 0,
    explain: 'Weight is the enemy of every performance figure. It also makes every load-factor multiplier worse: 2 G on a heavy aircraft is more absolute load than 2 G on a light one.',
  },
  {
    id: 'load-wb-8', area: 'IV', topic: 'weight-balance',
    q: 'As the weight of a multirotor increases, its battery endurance',
    options: ['decreases, because more current is needed to hover.', 'increases, because the larger mass carries more momentum.', 'is unchanged.'],
    answer: 0,
    explain: 'Hover power rises faster than weight does. Plan flight time with the actual loaded weight, not the manufacturer\'s best-case figure measured with no payload.',
  },
  {
    id: 'load-wb-9', area: 'IV', topic: 'weight-balance',
    q: 'The "datum" in weight and balance calculations is',
    options: ['an imaginary vertical reference plane from which all horizontal arms are measured.', 'the aircraft\'s center of gravity.', 'the maximum allowable weight.'],
    answer: 0,
    explain: 'The datum can be the nose, a firewall, or a point ahead of the aircraft. Its location is arbitrary; consistency is what matters.',
  },
  {
    id: 'load-wb-10', area: 'IV', topic: 'weight-balance',
    q: 'Where does a remote pilot find the loading and performance limits for a specific small UA?',
    options: ['In the manufacturer\'s operating manual or published specifications.', 'In 14 CFR Part 107.', 'In the Chart Supplement.'],
    answer: 0,
    explain: 'Part 107 sets regulatory limits (55 lb, 400 ft, 87 kt). Everything about what the aircraft can actually do, from maximum payload to wind limits, comes from the manufacturer.',
  },

  // ── load-factor (guide 23) ──────────────────────────────────────────────
  {
    id: 'load-lf-1', area: 'IV', topic: 'load-factor',
    q: 'In a level, coordinated turn at 60° of bank, the load factor is',
    options: ['2 Gs.', '1.5 Gs.', '3 Gs.'],
    answer: 0,
    explain: 'Load factor = 1 ÷ cos(bank). cos 60° = 0.5, so the wings must produce twice the aircraft\'s weight in lift to hold altitude.',
  },
  {
    id: 'load-lf-2', area: 'IV', topic: 'load-factor',
    q: 'At 60° of bank in level flight, a fixed-wing aircraft\'s stall speed increases by about',
    options: ['41%.', '100%.', '15%.'],
    answer: 0,
    explain: 'Stall speed rises with the square root of the load factor. √2 ≈ 1.41, so a 40-knot stall becomes about 57 knots in a 2-G turn.',
  },
  {
    id: 'load-lf-3', area: 'IV', topic: 'load-factor',
    q: 'Load factor is',
    options: ['the ratio of the total load supported by the wings (or rotors) to the aircraft\'s actual weight.', 'the weight of the payload divided by the empty weight.', 'the percentage of battery remaining.'],
    answer: 0,
    explain: 'Expressed in Gs. In straight-and-level flight it is 1. Turns, pull-ups, and gusts all raise it.',
  },
  {
    id: 'load-lf-4', area: 'IV', topic: 'load-factor',
    q: 'Abrupt maneuvers and turbulence are a concern because they',
    options: ['increase the load factor, which can exceed the structural limits of the aircraft.', 'reduce the load factor below 1 G.', 'only affect fixed-wing aircraft.'],
    answer: 0,
    explain: 'A heavily loaded multirotor yanked into a hard stop can snap an arm or fold a propeller just as a fixed-wing can overstress a spar. The design limit does not care which kind of aircraft it is.',
  },
  {
    id: 'load-lf-5', area: 'IV', topic: 'load-factor',
    q: 'The load factor in a level 45° banked turn is approximately',
    options: ['1.41 Gs.', '2 Gs.', '1.15 Gs.'],
    answer: 0,
    explain: '1 ÷ cos 45° = 1.41. At 30° it is 1.15; at 70° it is 2.92. Load factor rises slowly at first and then very fast.',
  },
  {
    id: 'load-lf-6', area: 'IV', topic: 'load-factor',
    q: 'A fixed-wing unmanned aircraft stalls when',
    options: ['the critical angle of attack is exceeded, regardless of airspeed or attitude.', 'the airspeed drops below a fixed value under all conditions.', 'the battery voltage falls below the warning level.'],
    answer: 0,
    explain: 'An aircraft can stall at high speed in a steep turn or pull-up because the load factor forces the angle of attack past the critical point. Stall speed is only constant for 1 G.',
  },
  {
    id: 'load-lf-7', area: 'IV', topic: 'load-factor',
    q: 'Aggressive maneuvering of a multirotor at high gross weight',
    options: ['raises motor load and current draw, and can lead to loss of control if a motor reaches its maximum output.', 'is safer than gentle flying because it keeps the motors cool.', 'has no effect on battery consumption.'],
    answer: 0,
    explain: 'Every rapid attitude change is a momentary high load factor. The flight controller demands more from the motors; if one is already near saturation, the aircraft cannot hold the commanded attitude.',
  },
  {
    id: 'load-lf-8', area: 'IV', topic: 'load-factor',
    q: 'When wind gusts strike an aircraft in flight, the load factor',
    options: ['increases momentarily, and more so for a heavier aircraft at a given gust.', 'always decreases.', 'is unaffected because wind only changes groundspeed.'],
    answer: 0,
    explain: 'A vertical gust changes the angle of attack and the lift in an instant. This is why manufacturers publish wind limits and why gusty days shorten the safe flight envelope.',
  },
];
