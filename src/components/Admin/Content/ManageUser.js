import ModelCreateUser from "./ModalCreateUser";
import "./ManageUser.scss";
import { FaPlus } from "react-icons/fa";
import TableUser from "./TableUser";
import { useEffect, useState } from "react";
import { getAllUser, getAllUserWithPaginate } from "../../../services/userService";
import ModelUpdateUser from "./ModalUpdateUser";
import ModelViewUser from "./ModalViewUser";
import ModelDeleteUser from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPaginate";

const ManageUser = (props) => {
  const LIMIT_USER = 6;
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
  const [showModalViewUser, setShowModalViewUser] = useState(false);
  const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
  const [dataUser, setDataUser] = useState({});
  const [listUser, setListUser] = useState([])

  useEffect(() => {
    // fetchListUser()
    fetchListUserPaginate(1)
  }, [])

  const fetchListUser = async () => {
    let res = await getAllUser();
    // console.log(res);
    if (res.EC == 0) {
      setListUser(res.DT);
    }
  }

  const fetchListUserPaginate = async (page) => {
    let res = await getAllUserWithPaginate(page, LIMIT_USER);
    if (res.EC == 0) {
      // console.log(res);
      setListUser(res.DT.users);
      setPageCount(res.DT.totalPages);
    }
  }

  const handleClickBtnUpdate = (dataUser) => {
    setShowModalUpdateUser(true);
    setDataUser(dataUser);
  }

  const handleClickBtnView = (dataUser) => {
    setShowModalViewUser(true);
    setDataUser(dataUser);
  }

  const handleClickBtnDelete = (dataUser) => {
    setShowModalDeleteUser(true);
    setDataUser(dataUser);
  }

  const resetDataUser = () => {
    setDataUser({});
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
          {/* <TableUser
            listUser={listUser}
            handleClickBtnUpdate={handleClickBtnUpdate}
            handleClickBtnView={handleClickBtnView}
            handleClickBtnDelete={handleClickBtnDelete}
          /> */}
          <TableUserPaginate
            listUser={listUser}
            pageCount={pageCount}
            handleClickBtnUpdate={handleClickBtnUpdate}
            handleClickBtnView={handleClickBtnView}
            handleClickBtnDelete={handleClickBtnDelete}
            fetchListUserPaginate={fetchListUserPaginate}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>

        <ModelCreateUser
          show={showModalCreateUser}
          setShow={setShowModalCreateUser}
          fetchListUser={fetchListUser}
          fetchListUserPaginate={fetchListUserPaginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <ModelUpdateUser
          show={showModalUpdateUser}
          setShow={setShowModalUpdateUser}
          dataUserUpdate={dataUser}
          resetDataUpdateUser={resetDataUser}
          fetchListUser={fetchListUser}
          fetchListUserPaginate={fetchListUserPaginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <ModelViewUser
          show={showModalViewUser}
          setShow={setShowModalViewUser}
          dataUser={dataUser}
          resetDataUser={resetDataUser}
        />
        <ModelDeleteUser
          show={showModalDeleteUser}
          setShow={setShowModalDeleteUser}
          dataUser={dataUser}
          resetDataUser={resetDataUser}
          fetchListUser={fetchListUser}
          fetchListUserPaginate={fetchListUserPaginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  )
}

export default ManageUser;