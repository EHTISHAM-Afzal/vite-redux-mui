import {createSlice , nanoid } from '@reduxjs/toolkit';

const initialState = [
    {id : 1, title: 'First Post', content: 'This is my first post Lorem ipsum dolor sit amet,  non posuere mi dapibus. Vestibulum fringilla,  Donec venenatis turpis sit amet egestas vulputate.', date: 'Jun 24, 2023'},
    {id : 2, title: 'Second Post', content: 'This is second post consectetur adipiscing elit. Sed ullamcorper elit sed tellus aliquam,' , date: 'Jun 24, 2023'},
    {id : 3, title: 'Third Post', content: 'This is third post odio eget imperdiet lacinia, odio nisl aliquet lacus,  2023'},
]


export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addPost: {
            reducer(state, action) {
            state.push(action.payload);
            },
            prepare(title, content ) {
                return {payload: {
                    id: nanoid(),
                    title,
                    content,
                    date : new Date().toLocaleDateString("en-us",{day: "2-digit", month: "short", year: "numeric"})
                }};
            
            }
        }
    },
})

export const selectAllPosts = (state) => state.posts;

export const {addPost} = postsSlice.actions;
export default postsSlice.reducer;