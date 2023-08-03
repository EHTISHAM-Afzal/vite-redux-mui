import {  useGetUsersQuery} from "../Users/usersSlice";
import { Link } from "react-router-dom";

const PostAuthor = ({ userId }) => {
    const { user: author , isLoading } = useGetUsersQuery('getUsers', {
        selectFromResult: ({ data, isLoading }) => ({
            user: data?.entities[userId]
        }),
    })

    return <span>by {author ? <Link to={`/user/${userId}`}>{ isLoading ? '...' : author.name}</Link> : 'Unknown author'}</span>
}
export default PostAuthor