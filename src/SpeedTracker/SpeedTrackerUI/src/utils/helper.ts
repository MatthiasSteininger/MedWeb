import { RaceResult } from './raceResultsSlice';

export const loadFileContent = async (): Promise<RaceResult[]> => {
  return window.electronAddon
    .readFile()
    .then((content) => {
      const raceResultsLines = content.trim().split('\n').slice(0, 200);
      const localRaceResults = raceResultsLines.map((line) => JSON.parse(line));

      return localRaceResults;
    })
};