import React from "react";
import Swal from "sweetalert2";
const AddCottee = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const coffeedata = Object.fromEntries(formData);
        console.log(coffeedata);
        form.reset();
        
        fetch('http://localhost:3000/coffees', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(coffeedata)
        })
        .then(res => res.json())
        .then(data => {
           if(data.insertedId){
            Swal.fire({
                title: "Coffee Added Successfully!",
                icon: "success",
                draggable: true
            });
            
           }
        })
    }
    return (
        <div className="p-24">
            <div className="p-12 text-center space-y-4">
                <h1 className="text-5xl font-bold">AddCottee</h1>
                <p className="">It is a long established fact that a reader will be distraceted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here.</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6 justify-items-center">
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full md:w-xs border p-4">
                        <label className="label">Name</label>
                        <input type="text" name="name" className="input" placeholder="Americano Coffee" />
                    </fieldset>
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full md:w-xs border p-4">
                        <label className="label">Chef</label>
                        <input type="text" name="chef" className="input" placeholder="Mr. Matin Paul" />
                    </fieldset>
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full md:w-xs border p-4">
                        <label className="label">Supplier</label>
                        <input type="text" name="supplier" className="input" placeholder="Cappu Authorizer" />
                    </fieldset>
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full md:w-xs border p-4">
                        <label className="label">Taste</label>
                        <input type="text" name="taste" className="input" placeholder="Sweet and hot" />
                    </fieldset>
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full md:w-xs border p-4">
                        <label className="label">Price</label>
                        <input type="text" name="price" className="input" placeholder="$" />
                    </fieldset>
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full md:w-xs border p-4">
                        <label className="label">Details</label>
                        <input type="text" name="details" className="input" placeholder="Espresso with hot water" />
                    </fieldset>
                </div>
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border my-6 p-4 w-full">
                    <label className="label">Photo URL</label>
                    <input type="text" name="photo" className="input w-full" placeholder="Photo URL" />
                </fieldset>
                <input type="submit" className="btn w-full" value="Add" />
            </form>
        </div>
    );
};
export default AddCottee;