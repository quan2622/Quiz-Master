import ModelCreateUser from "./ModalCreateUser";
import "./ManageUser.scss";
import { FaPlus } from "react-icons/fa";
import TableUser from "./TableUser";
import { useEffect, useState } from "react";
import { getAllUser } from "../../../services/userService";

const ManageUser = (props) => {
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  const [listUser, setListUser] = useState([])

  useEffect(() => {
    fetchListUser()
  }, [])

  const fetchListUser = async () => {
    let res = await getAllUser();
    console.log(res);
    if (res.EC == 0) {
      setListUser(res.DT);
    }
  }

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
          <TableUser listUser={listUser} />
        </div>

        <ModelCreateUser
          show={showModalCreateUser}
          setShow={setShowModalCreateUser}
          fetchListUser={fetchListUser}
        />
      </div>
    </div>
  )
}

export default ManageUser;