import {createSlice} from '@reduxjs/toolkit';

const initialState = [
    {id : 1, title: 'First Post', content: 'This is my first post'},
    {id : 2, title: 'Second Post', content: 'This is second post'},
    {id : 3, title: 'Third Post', content: 'This is third post'},
]


export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addPost: (state, action) => {
            state.push(action.payload);
        }
    }
})

export const selectAllPosts = (state) => state.posts;

export const {addPost} = postsSlice.actions;
export default postsSlice.reducer;