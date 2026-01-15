import React from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const UpdateCoffee = () => {
    const coffeeData = useLoaderData();
    console.log(coffeeData);

    const { name, chef, supplier, taste, price, details, photo, _id } = coffeeData;
    const navigate = useNavigate();
    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const coffeedata = Object.fromEntries(formData);
        console.log(coffeedata);
        form.reset();

        fetch(`http://localhost:3000/coffees/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(coffeedata)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.modifiedCount > 0){
                Swal.fire({
                    title: "Coffee Updated Successfully!",
                    icon: "success",
                    draggable: true
                });
                navigate('/');
            }
        })
    }
    return (
        <div>
            <div><h1 className="text-5xl font-bold text-center my-6 mb-12">Update Coffee</h1></div>
            <form onSubmit={handleUpdateSubmit}>
            <div className="grid md:grid-cols-2 gap-6 justify-items-center">
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full md:w-xs border p-4">
                        <label className="label">Name</label>
                        <input type="text" name="name" className="input" placeholder="Americano Coffee" defaultValue={name} />
                    </fieldset>
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full md:w-xs border p-4">
                        <label className="label">Chef</label>
                        <input type="text" name="chef" className="input" placeholder="Mr. Matin Paul" defaultValue={chef} />
                    </fieldset>
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full md:w-xs border p-4">
                        <label className="label">Supplier</label>
                        <input type="text" name="supplier" className="input" placeholder="Cappu Authorizer" defaultValue={supplier} />
                    </fieldset>
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full md:w-xs border p-4">
                        <label className="label">Taste</label>
                        <input type="text" name="taste" className="input" placeholder="Sweet and hot" defaultValue={taste} />
                    </fieldset>
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full md:w-xs border p-4">
                        <label className="label">Price</label>
                        <input type="text" name="price" className="input" placeholder="$" defaultValue={price} />
                    </fieldset>
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full md:w-xs border p-4">
                        <label className="label">Details</label>
                        <input type="text" name="details" className="input" placeholder="Espresso with hot water" defaultValue={details} />
                    </fieldset>
                </div>
                <input type="submit" className="btn w-full my-6" value="Update" />
            </form>
        </div>
    );
};

export default UpdateCoffee;