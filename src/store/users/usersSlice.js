import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Action creator for fetching users
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://randomuser.me/api/?results=10');
      const data = await response.json();
      return data.results;
    } catch (error) {
      return rejectWithValue('Failed to fetch users');
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    isLoading: false,
    error: undefined,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { actions } = usersSlice;
export default usersSlice.reducer;
