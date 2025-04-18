import ModelCreateUser from "./ModalCreateUser";
import "./ManageUser.scss";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import TableUser from "./TableUser";

const ManageUser = (props) => {
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);

  return (
    <div className="manage-user-container">
      <div className="title">
        Manage User
      </div>
      <div className="manage-user-content">
        <div className="btn-add-user">
          <button className="btn btn-primary" onClick={() => setShowModalCreateUser(true)}>
            <FaPlus /> Add new user
          </button>
        </div>
        <div className="table-users-container">
          <TableUser />
        </div>

        <ModelCreateUser
          show={showModalCreateUser}
          setShow={setShowModalCreateUser}
        />
      </div>
    </div>
  )
}

export default ManageUser;