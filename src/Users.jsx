import React, { useState } from "react";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";

const Users = () => {
    const initialUsers = useLoaderData();
    const [users, setUsers] = useState(initialUsers);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:3000/users/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "User has been deleted.",
                                icon: "success"
                            });
                            const remainingUsers = users.filter(user => user._id !== id);
                            setUsers(remainingUsers);
                        }
                    })
            }
        });
    }

    return (
        <div className="max-w-7xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Manage Users ({users.length})</h1>
            <div className="overflow-x-auto shadow-xl rounded-box bg-base-100">
                <table className="table table-zebra w-full text-center">
                    <thead className="bg-neutral text-neutral-content">
                        <tr>
                            <th>#</th>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Creation Time</th>
                            <th>Last Login</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>
                                    <div className="avatar justify-center">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={user.photoURL} alt="" />
                                        </div>
                                    </div>
                                </td>
                                <td className="font-semibold">{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.creationTime}</td>
                                <td>{user.lastSignInTime}</td>
                                <td className="flex gap-2">
                                    <button
                                        onClick={() => handleDelete(user._id)}
                                        className="btn btn-error btn-xs">Delete</button>
                                    <button
                                        onClick={() => handleDelete(user._id)}
                                        className="btn btn-error btn-xs">Vesit</button>
                                    <button
                                        onClick={() => handleDelete(user._id)}
                                        className="btn btn-error btn-xs">Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;