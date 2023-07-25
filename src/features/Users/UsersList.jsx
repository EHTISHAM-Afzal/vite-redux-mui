import { useSelector } from 'react-redux'
import { selectAllUsers } from './usersSlice'
import { Link } from 'react-router-dom'
import { List, Link as MUILink } from "@mui/material";
import { Box, Typography,  } from "@mui/material";

const UsersList = () => {
    const users = useSelector(selectAllUsers)

    const renderedUsers = users.map(user => (
        <li key={user.id}>
            <MUILink component={Link} underline="none" variant='h6'  to={`/user/${user.id}`}>👨‍💼{user.name}</MUILink>
        </li>
    ))

    return (
    <Box>
    <Typography variant="h4" color="primary">
      Users
    </Typography>
    <List>{renderedUsers}</List>
  </Box>
    )
}

export default UsersList