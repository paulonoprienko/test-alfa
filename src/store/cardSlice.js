import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchCards = createAsyncThunk(
    'cards/fetchCards',
    async function() {
        const res = await fetch('https://zoo-animal-api.herokuapp.com/animals/rand/5');
        return await res.json();
    }
);

const unique = new Set();

const cardSlice = createSlice({
    name: 'cards',
    initialState: {
        cards: [],
        likedCardsCount: 0,
        status: null,
        error: null,
    },
    reducers: {
        removeCard (state, action) {
            state.cards = state.cards.filter(card => card.id !== action.payload.id);
            if(action.payload.liked) {state.likedCardsCount--;}
        },
        toggleLikeCard (state, action) {
            const likedCard = state.cards.find(card => card.id === action.payload.id);

            if(likedCard.liked = !likedCard.liked) {state.likedCardsCount++;}
            else {state.likedCardsCount--;}
        },
    },
    extraReducers: {
        [fetchCards.pending]: (state) => {
            state.status = 'loading';
            state.error = null;
        },
        [fetchCards.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.cards.push(...(action.payload.filter(card => {
                if(unique.has(card.id)) return false;
                unique.add(card.id);
                card.liked = false;
                return true;
            })));
        },
    },
});

export const {removeCard, toggleLikeCard} = cardSlice.actions;
export default cardSlice.reducer;