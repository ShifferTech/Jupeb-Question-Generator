
import { Subject, SubjectData } from './types';

export const JUPEB_CURRICULUM: SubjectData[] = [
  {
    name: Subject.MATHEMATICS,
    color: 'blue',
    topics: [
      'Calculus (Differentiation & Integration)',
      'Algebra (Matrices, Complex Numbers, Sequences)',
      'Trigonometry',
      'Vectors and Mechanics',
      'Statistics and Probability',
      'Coordinate Geometry'
    ]
  },
  {
    name: Subject.PHYSICS,
    color: 'red',
    topics: [
      'Mechanics (Motion, Forces, Energy)',
      'Thermal Physics & Properties of Matter',
      'Waves and Optics',
      'Electricity and Magnetism',
      'Modern Physics (Atomic & Nuclear)',
      'Fields (Gravitational, Electric, Magnetic)'
    ]
  },
  {
    name: Subject.CHEMISTRY,
    color: 'emerald',
    topics: [
      'General Chemistry (Stoichiometry, Atomic Structure)',
      'Physical Chemistry (Energetics, Kinetics, Equilibrium)',
      'Inorganic Chemistry (Periodic Table, p-block, d-block)',
      'Organic Chemistry (Hydrocarbons, Alcohols, Carbonyls)',
      'Electrochemistry',
      'Environmental Chemistry'
    ]
  }
];
