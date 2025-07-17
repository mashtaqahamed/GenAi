import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  chatrooms: [],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addChatroom: {
      reducer(state, action) {
        state.chatrooms.push(action.payload);
      },
      prepare(title, avatar = '') {
        return {
          payload: {
            id: nanoid(),
            title,
            avatar,
          },
        };
      },
    },
    deleteChatroom(state, action) {
      state.chatrooms = state.chatrooms.filter(room => room.id !== action.payload);
    },
    setChatrooms(state, action) {
      state.chatrooms = action.payload;
    },
  },
});

export const { addChatroom, deleteChatroom, setChatrooms } = chatSlice.actions;
export default chatSlice.reducer;
