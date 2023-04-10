import { createSlice } from "@reduxjs/toolkit";

const DEFAULT_FORM_VALUES = {
  title: '',
  description: '',
  questions: [],
}

export const formSlice = createSlice({
  name: 'form',
  initialState: DEFAULT_FORM_VALUES,
  reducers: {
    persistForm: (state, { payload }) => {
      return { ...state, ...payload }
    }
  }
})

export const { persistForm } = formSlice.actions;

export default formSlice.reducer;