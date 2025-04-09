import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { raceResultsSliceReducer } from './raceResultsSlice';

const rootReducer = combineReducers({
  raceResultsSliceReducer: raceResultsSliceReducer
})

//i could ofc for non state dependent data use a custom storage
//i still use redux as it does keep obj in memory at runtime - which i would have to introduce myself
export const reduxStore = configureStore({
  reducer: rootReducer
});

//even tho the whole store is wrapped - only persistReducer are persisted

export type AppStore = typeof reduxStore
export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>