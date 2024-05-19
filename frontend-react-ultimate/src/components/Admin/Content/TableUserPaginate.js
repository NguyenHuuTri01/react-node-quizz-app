import ReactPaginate from "react-paginate";
import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { getUserWithPaginate } from "../../../services/apiService";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from './ModalViewUser';
import ModalDeleteUser from "./ModalDeleteUser";


const TableUserPaginate = forwardRef((props, ref) => {
    const LIMIT_USER = 8;
    const [listUsers, setListUsers] = useState([]);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [showModalViewUser, setShowModalViewUser] = useState(false);
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({});
    const [dataDelete, setDataDelete] = useState({});
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(1);

    useEffect(() => {
        // fetchListUser();
        fetchListUserWithPaginate(page);
    }, [page])

    // const fetchListUser = async () => {
    //     let res = await getAllUsers();
    //     if (res.EC === 0) {
    //         setListUsers(res.DT)
    //     }
    // }
    const fetchListUserWithPaginate = async (page) => {
        let res = await getUserWithPaginate(page, LIMIT_USER);
        if (res.EC === 0) {
            setListUsers(res.DT.users)
            setPageCount(res.DT.totalPages)
        }
    }


    const resetUpdateData = () => {
        setDataUpdate({})
    }

    useImperativeHandle(ref, () => ({
        updateTableUser() {
            fetchListUserWithPaginate(1)
            setPage(1);
        }
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

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        fetchListUserWithPaginate(+event.selected + 1);
        setPage(+event.selected + 1);
    };

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
            <div className="d-flex justify-content-center">
                <ReactPaginate
                    nextLabel="Next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="< Prev"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                    forcePage={page - 1}
                />
            </div>
            <ModalUpdateUser
                show={showModalUpdateUser}
                setShow={setShowModalUpdateUser}
                dataUpdate={dataUpdate}
                updateTable={fetchListUserWithPaginate}
                page={page}
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
                updateTable={fetchListUserWithPaginate}
                page={page}
                setPage={setPage}
            />
        </>
    )
})

export default TableUserPaginate;
