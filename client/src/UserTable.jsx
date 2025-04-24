import React from "react";
import axios from "axios";
import AddUser from "./AddUser";

const UserTable = () => {
    const [users, setUsers] = React.useState([]);
    const [isEdit, setIsEdit] = React.useState(false);
    const [editUser, setEditUser] = React.useState([]);
    const [shouldDelete, setShouldDelete] = React.useState(false);
    const [deleteId, setDeleteId] = React.useState(null);

    const fetchUser = async () => {
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/users/getAllUsers`
        );
        setUsers(response.data.data);
    };

    const handleEdit = async (user) => {
        setIsEdit(true);
        setEditUser(user);
        fetchUser();
    };

    const handleDelete = async (id) => {
        setShouldDelete(true);
        setDeleteId(id);
    };

    const confirmDelete = async () => {
        await axios.delete(
            `${import.meta.env.VITE_BACKEND_URL}/users/deleteUser/${deleteId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );
        fetchUser();
        setShouldDelete(false);
    };

    React.useEffect(() => {
        fetchUser();
    }, []);

    return (
        <>
            <AddUser
                isEdit={isEdit}
                handleEdit={handleEdit}
                editUser={editUser}
                setIsEdit={setIsEdit}
                fetchUser={fetchUser}
            />
            <div className="relative overflow-hidden shadow-md rounded-lg">
                <table className="table-fixed w-full text-left">
                    <thead
                        className="bg-[#6b7280] text-[#e5e7eb]"
                        style={{ backgroundColor: "#6b7280", color: "#e5e7eb" }}
                    >
                        <tr>
                            <th
                                contentEditable
                                suppressContentEditableWarning
                                className="py-2 border border-gray-200 text-center font-bold p-4"
                            >
                                Name
                            </th>
                            <th
                                contentEditable
                                suppressContentEditableWarning
                                className="py-2 border border-gray-200 text-center font-bold p-4"
                            >
                                Email
                            </th>
                            <th
                                contentEditable
                                suppressContentEditableWarning
                                className="py-2 border border-gray-200 text-center font-bold p-4"
                            >
                                Designation
                            </th>
                            <th
                                contentEditable
                                suppressContentEditableWarning
                                colSpan={2}
                                className="py-2 border border-gray-200 text-center font-bold p-4"
                            >
                                Action
                            </th>
                        </tr>
                    </thead>

                    {users.map((user) => (
                        <tbody
                            key={user.id}
                            className="bg-white text-gray-500"
                            style={{
                                backgroundColor: "#FFFFFF",
                                color: "#6b7280",
                            }}
                        >
                            <tr className="py-4">
                                <td
                                    contentEditable
                                    suppressContentEditableWarning
                                    className="py-4 border border-gray-200 text-center p-4"
                                >
                                    {user.name}
                                </td>
                                <td
                                    contentEditable
                                    suppressContentEditableWarning
                                    className="py-4 border border-gray-200 text-center p-4"
                                >
                                    {user.email}
                                </td>
                                <td
                                    contentEditable
                                    suppressContentEditableWarning
                                    className="py-4 border border-gray-200 text-center p-4"
                                >
                                    {user.designation}
                                </td>
                                <td
                                    contentEditable
                                    suppressContentEditableWarning
                                    className="py-4 border border-gray-200 text-center p-4"
                                >
                                    <span
                                        className="cursor-pointer py-1.5 px-5 hover:bg-gray-100 rounded-xl font-semibold"
                                        onClick={() => handleEdit(user)}
                                    >
                                        Edit
                                    </span>
                                </td>
                                <td
                                    contentEditable
                                    suppressContentEditableWarning
                                    className="py-4 border border-gray-200 text-center p-4 "
                                >
                                    <span
                                        className="cursor-pointer py-1.5 px-5 hover:bg-gray-100 rounded-xl font-semibold text-red-500"
                                        onClick={(e) => handleDelete(user.id)}
                                    >
                                        Delete
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    ))}
                    {users.length === 0 && (
                        <tbody className="bg-white text-gray-500">
                            <tr className="py-4">
                                <td
                                    colSpan={5}
                                    className="py-4 border border-gray-200 text-center p-4"
                                >
                                    No users found
                                </td>
                            </tr>
                        </tbody>
                    )}
                    {shouldDelete && (
                        <div className="fixed inset-0 flex items-center justify-center bg-transparent z-50">
                            <div className="bg-white p-6 rounded-lg shadow-2xl w-80 border-black">
                                <h2 className="text-lg font-semibold mb-4 text-center">
                                    Are you sure you want to delete?
                                </h2>
                                <div className="flex justify-between mt-4">
                                    <button
                                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded w-[45%]"
                                        onClick={() => setShouldDelete(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded w-[45%]"
                                        onClick={confirmDelete}
                                    >
                                        Yes, Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </table>
            </div>
        </>
    );
};

export default UserTable;
