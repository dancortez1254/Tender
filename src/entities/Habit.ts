export type Habit = {
  id: number;
  petID: number;
  name: string;
  category: 'health' | 'fitness' | 'mindfulness' | 'learning' | 'social';
  targetFrequency: number;
  statboost: 'happiness' | 'hunger' | 'energy';
};