import User from "./User"

function Users(props) {
    const users = props.users;
    return (
        <>
            <h1>Lista użytkowników</h1>
            <ul> {users.map((user) => <User key={user.email} value={user.email} user={user} />)} </ul>
        </>
    )
}

export default Users