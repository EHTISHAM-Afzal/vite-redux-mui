import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../Api/apiSlice";

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
      transformResponse: (responseData) => {
        return usersAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => [
        { type: "User", id: "LIST" },
        ...result.ids.map((id) => ({ type: "User", id })),
      ],
    }),
  }),
});

export const { useGetUsersQuery } = usersApiSlice;

// // returns the query result object
// export const selecUsersResult = usersApiSlice.endpoints.getUsers.select();

// // Creates memoized selector
// const selectUsersData = createSelector(
//   selecUsersResult,
//   (usersResult) => usersResult.data // normalized state object with ids & entities
// );

// //getSelectors creates these selectors and we rename them with aliases using destructuring
// export const {
//   selectAll: selectAllUsers,
//   selectById: selectUserById,
//   selectIds: selectUserIds,
//   // Pass in a selector that returns the Users slice of state
// } = usersAdapter.getSelectors(
//   (state) => selectUsersData(state) ?? initialState
// );
