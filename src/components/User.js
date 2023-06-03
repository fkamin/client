const User = (props) => {
    const user = props.user
    return (
        <li>{user.firstName} {user.lastName} {user.email}</li>
    )
}

export default User