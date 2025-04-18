const TableUser = (props) => {
  const { listUser } = props;

  return (
    <>
      <table className="table table-hover table-bordered">
        <thead>
          <tr className="table-primary">
            <th scope="col">Id</th>
            <th scope="col">User Name</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {listUser && listUser.length != 0 && listUser.map((user, index) => {
            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button className="btn btn-info">View</button>
                  <button className="btn btn-warning mx-3" onClick={() => props.handleClickBtnUpdate(user)}>Update</button>
                  <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
            )
          })
          }
          {listUser && listUser.length == 0 &&
            <tr>
              <td colSpan={'4'}>
                Not found data
              </td>
            </tr>
          }
        </tbody>
      </table>
    </>
  )
}

export default TableUser;