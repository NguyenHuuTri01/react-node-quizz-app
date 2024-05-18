import ModalCreateUser from "./ModalCreateUser";
import './ManageUser.scss'
import { FcPlus } from 'react-icons/fc';
import { useState, useRef } from "react";
// import TableUser from "./TableUser";
import TableUserPaginate from "./TableUserPaginate";


const ManageUser = (props) => {

    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const tableUserRef = useRef();

    const updateTable = () => {
        tableUserRef.current.updateTableUser()
    }

    return (
        <div className="manage-user-container">
            <div className="title">
                Manage User
            </div>
            <div className="users-content">
                <div className="btn-add-new">
                    <button
                        className="btn btn-primary"
                        onClick={() => setShowModalCreateUser(true)}
                    >
                        <FcPlus /> Add new user
                    </button>
                </div>
                <div className="table-users-container">
                    {/* <TableUser ref={tableUserRef} /> */}
                    <TableUserPaginate ref={tableUserRef} />
                </div>
                <ModalCreateUser
                    show={showModalCreateUser}
                    setShow={setShowModalCreateUser}
                    updateTable={updateTable}
                />

            </div>
        </div>
    )
}

export default ManageUser;
