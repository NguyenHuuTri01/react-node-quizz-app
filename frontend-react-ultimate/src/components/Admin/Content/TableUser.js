import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { getAllUsers } from "../../../services/apiService";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from './ModalViewUser';
import ModalDeleteUser from "./ModalDeleteUser";

const TableUser = forwardRef((props, ref) => {
    const [listUsers, setListUsers] = useState([]);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [showModalViewUser, setShowModalViewUser] = useState(false);
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({});
    const [dataDelete, setDataDelete] = useState({});

    useEffect(() => {
        fetchListUser();
    }, [])

    const fetchListUser = async () => {
        let res = await getAllUsers();
        if (res.EC === 0) {
            setListUsers(res.DT)
        }
    }

    const resetUpdateData = () => {
        setDataUpdate({})
    }

    useImperativeHandle(ref, () => ({
        updateTableUser() { fetchListUser() }
    }
    ))

    const handleUpdateUser = (data) => {
        setShowModalUpdateUser(true);
        setDataUpdate(data);
    }

    const handleViewUser = (data) => {
        setShowModalViewUser(true);
        setDataUpdate(data);
    }

    const handleDeleteUser = (user) => {
        setShowModalDeleteUser(true);
        setDataDelete(user)
    }

    return (
        <>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listUsers && listUsers.length > 0 &&
                        listUsers.map((item, index) => {
                            return (
                                <tr key={`table-users-${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.username}</td>
                                    <td>{item.email}</td>
                                    <td>{item.role}</td>
                                    <td>
                                        <button
                                            className="btn btn-secondary"
                                            onClick={() => handleViewUser(item)}
                                        >
                                            View
                                        </button>
                                        <button
                                            className="btn btn-warning mx-3"
                                            onClick={() => handleUpdateUser(item)}
                                        >
                                            Update
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleDeleteUser(item)}
                                        >
                                            Delete
                                        </button>

                                    </td>
                                </tr>
                            )
                        })
                    }
                    {
                        listUsers && listUsers.length === 0 &&
                        <tr>
                            <td colSpan={'4'}> Not found data </td>
                        </tr>
                    }
                </tbody>
            </table>
            <ModalUpdateUser
                show={showModalUpdateUser}
                setShow={setShowModalUpdateUser}
                dataUpdate={dataUpdate}
                updateTable={fetchListUser}
                resetUpdateData={resetUpdateData}
            />
            <ModalViewUser
                show={showModalViewUser}
                setShow={setShowModalViewUser}
                dataUpdate={dataUpdate}
                resetUpdateData={resetUpdateData}
            />
            <ModalDeleteUser
                show={showModalDeleteUser}
                setShow={setShowModalDeleteUser}
                dataDelete={dataDelete}
                updateTable={fetchListUser}
            />
        </>
    )
})

export default TableUser;
