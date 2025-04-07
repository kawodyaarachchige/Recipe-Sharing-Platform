import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TimerState} from "../../types";


const initialState: TimerState = {
    activeRecipeId: null,
    timeLeft: 0,
    isActive: false
};

const timerSlice = createSlice({
    name: 'timer',
    initialState,
    reducers: {
        startTimer: (state, action: PayloadAction<{ recipeId: string; duration: number }>) => {
            state.activeRecipeId = action.payload.recipeId;
            state.timeLeft = action.payload.duration;
            state.isActive = true;
        },
        pauseTimer: (state) => {
            state.isActive = false;
        },
        resetTimer: (state) => {
            state.activeRecipeId = null;
            state.timeLeft = 0;
            state.isActive = false;
        },
        tickTimer: (state) => {
            if (state.isActive && state.timeLeft > 0) {
                state.timeLeft -= 1;
            }
        }
    }
});

export const {startTimer, pauseTimer, resetTimer, tickTimer} = timerSlice.actions;
export default timerSlice.reducer;