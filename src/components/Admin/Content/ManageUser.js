import ModelCreateUser from "./ModalCreateUser";
import "./ManageUser.scss";

const ManageUser = (props) => {
  return (
    <div className="manage-user-container">
      <div className="title">
        Manage User
      </div>
      <div className="manage-user-content">
        <div>
          <button>Add new user</button>
        </div>
        <div>
          Table user
        </div>

        <ModelCreateUser />
      </div>
    </div>
  )
}

export default ManageUser;