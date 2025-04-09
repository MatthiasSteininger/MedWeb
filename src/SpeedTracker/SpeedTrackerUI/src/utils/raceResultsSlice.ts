import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type RaceResult = {
    ID: number,
    Bib: number,
    TimingPoint: string,
    Result: number,
    Time: number,
    Invalid: boolean,
    Passing: any
}

const initialState: {
    raceResults: RaceResult[] | null
    isAutoReload: boolean
} = {
    raceResults: null,
    isAutoReload: false
};

const raceResultsSlice = createSlice({
    name: 'raceResults',
    initialState,
    reducers: {
        setRaceResults: (state, action: PayloadAction<RaceResult[]>) => { state.raceResults = action.payload; },
        setIsAutoReload: (state, action: PayloadAction<boolean>) => { state.isAutoReload = action.payload; },
    },
});

export const raceResultsSliceAction = raceResultsSlice.actions;
export const raceResultsSliceReducer = raceResultsSlice.reducer;