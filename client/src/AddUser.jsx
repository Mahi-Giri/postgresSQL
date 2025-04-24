import React from "react";
import axios from "axios";

const AddUser = ({ isEdit, editUser, setIsEdit, fetchUser }) => {
    const [open, setOpen] = React.useState(false);
    const [formData, setFormData] = React.useState({
        name: "",
        email: "",
        designation: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    React.useEffect(() => {
        if (isEdit) {
            setOpen(true);
            setFormData({
                name: editUser.name,
                email: editUser.email,
                designation: editUser.designation,
            });
        } else {
            setFormData({
                name: "",
                email: "",
                designation: "",
            });
        }
    }, [isEdit, editUser]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isEdit) {
            if (!formData.name || !formData.email || !formData.designation) {
                return;
            }
            axios
                .post(
                    `${import.meta.env.VITE_BACKEND_URL}/users/createUser`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        withCredentials: true,
                    }
                )
                .then((response) => {
                    console.log("User added successfully:", response.data);
                    setFormData({
                        name: "",
                        email: "",
                        designation: "",
                    });
                    setOpen(false);
                    fetchUser();
                })
                .catch((error) => {
                    console.error("Error adding user:", error);
                });
        } else {
            axios
                .put(
                    `${import.meta.env.VITE_BACKEND_URL}/users/updateUser/${
                        editUser.id
                    }`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        withCredentials: true,
                    }
                )
                .then((response) => {
                    console.log("User updated successfully:", response.data);
                    setFormData({
                        name: "",
                        email: "",
                        designation: "",
                    });
                    setOpen(false);
                    setIsEdit(false);
                    fetchUser();
                })
                .catch((error) => {
                    console.error("Error updating user:", error);
                });
        }
    };

    const handleCloseForm = () => {
        setOpen(false);
        setFormData({
            name: "",
            email: "",
            designation: "",
        });
        setIsEdit(false);
    };

    return (
        <div>
            <h2 className="text-center font-bold text-xl p-3">
                {isEdit ? "Edit Friend Details" : "Add Friend"}
            </h2>
            <div className="flex justify-center items-center gap-4 mb-4">
                {open ? (
                    <button
                        onClick={handleCloseForm}
                        className="bg-red-500 text-white rounded-md p-2 w-1/3 hover:bg-red-600 transition duration-200 ease-in-out"
                    >
                        {isEdit
                            ? "I don't want to edit friend details"
                            : "I don't want to add new friend"}
                    </button>
                ) : (
                    <button
                        onClick={() => setOpen(true)}
                        className="bg-green-500 text-white rounded-md p-2 w-1/3 hover:bg-green-600 transition duration-200 ease-in-out"
                    >
                        {isEdit ? "You want to edit friend details?" : "You want to add new friend?"}
                    </button>
                )}
            </div>
            {open && (
                <form
                    className="flex flex-col items-center justify-center gap-4 p-4"
                    onSubmit={handleSubmit}
                >
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        className="border border-gray-300 rounded-md p-2 w-1/2"
                        onChange={handleChange}
                        value={formData.name}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="border border-gray-300 rounded-md p-2 w-1/2"
                        onChange={handleChange}
                        value={formData.email}
                        required
                    />
                    <input
                        type="text"
                        name="designation"
                        placeholder="Designation"
                        className="border border-gray-300 rounded-md p-2 w-1/2"
                        onChange={handleChange}
                        value={formData.designation}
                        required
                    />
                    <button className="bg-blue-500 text-white rounded-md p-2 w-1/2 hover:bg-blue-600 transition duration-200 ease-in-out">
                        {isEdit ? "Update friend details" : "Add new friend"}
                    </button>
                </form>
            )}
        </div>
    );
};

export default AddUser;
