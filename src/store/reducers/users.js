const {
  createSlice,
  createAsyncThunk,
  createReducer,
  createAction,
} = require("@reduxjs/toolkit");

const initialState = {
  users: [],
  username: "",
  search: "",
};
// Handlling async actions
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  return ["Jack", "John"];
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  // Reducer for the users slice of state 
  reducers: {
    addUser(state) {
      state.users.push(state.username);
      state.username = "";
    },
    changeUsername(state, action) {
      state.username = action.payload;
    },
    changeSearch(state, action) {
      state.search = action.payload;
    },
  },
  // Getting the users from the api and adding them to the state
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      });
  },
});
// Exporting the slice of state
export const { addUser, changeSearch, changeUsername } = usersSlice.actions;
export default usersSlice.reducer;
