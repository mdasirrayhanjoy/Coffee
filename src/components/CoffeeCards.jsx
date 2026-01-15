import React, { use } from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";
const CoffeeCards = ({ coffee, setCoffees, coffees }) => {
    const { name, chef, supplier, taste, price, details, photo, _id } = coffee;


    const handleDelete = (_id) => {
        console.log(_id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            console.log(result);
            if (result.isConfirmed) {
                fetch(`http://localhost:3000/coffees/${_id}`, {
                    method: "DELETE"
                })
                    .then(res => {
                        if (!res.ok) {
                            return res.text().then(text => { throw new Error(text || 'Server Error') });
                        }
                        return res.json();
                    })
                    .then(data => {
                        console.log(data);
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            const remainingCoffee = coffees.filter(coffee => coffee._id !== _id);
                            setCoffees(remainingCoffee);
                        }
                    })
                    .catch(err => {
                        console.error("Delete error:", err);
                        Swal.fire({
                            title: "Error!",
                            text: "Failed to delete. Check console.",
                            icon: "error"
                        });
                    });

            }
        });

    }

    return (
        <div>
            <div className="card card-side bg-base-100 shadow-sm">
                <figure>
                    <img
                        src={photo}
                        alt="Movie" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{name}</h2>
                    <p>Click the button to watch on Jetflix app.</p>
                    <p>{details}</p>
                    <p>{price}</p>
                    <div className="card-actions justify-end">
                        <Link to={`/coffee-details/${_id}`} className="btn btn-primary">Watch</Link>
                        <Link to={`/update-coffee/${_id}`} className="btn btn-primary">Update</Link>
                        <button className="btn btn-primary" onClick={() => handleDelete(_id)}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default CoffeeCards;