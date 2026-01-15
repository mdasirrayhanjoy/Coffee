import React, { useContext } from "react";
import AuthContext from "./AuthContext";
import Swal from "sweetalert2";

const SignIn = () => {
    const { signUpUserEmailPassword } = useContext(AuthContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const formdata = new FormData(form);
        const { email, password, ...rest } = Object.fromEntries(formdata.entries());

        if (!email || !password) {
            Swal.fire({
                title: "Error!",
                text: "Please fill all fields.",
                icon: "error"
            });
            return;
        }

        signUpUserEmailPassword(email, password)
            .then(result => {
                const user = result.user;
                console.log("Firebase user created:", user);

                const userProfile = {
                    email,
                    ...rest,
                    creationTime: result.user?.metadata?.creationTime,
                    lastSignInTime: result.user?.metadata?.lastSignInTime
                };

                fetch('http://localhost:3000/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(userProfile)
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log("User saved to DB:", data);
                        if (data.insertedId) {
                            Swal.fire({
                                title: "Success!",
                                text: "User registered and profile saved successfully.",
                                icon: "success"
                            });
                            form.reset();
                        }
                    })
            })
            .catch(error => {
                console.error(error);
                let errorMessage = "Failed to register.";
                if (error.code === 'auth/email-already-in-use') {
                    errorMessage = "This email is already in use.";
                } else if (error.code === 'auth/weak-password') {
                    errorMessage = "Password should be at least 6 characters.";
                } else if (error.code === 'auth/invalid-email') {
                    errorMessage = "Invalid email address.";
                }

                Swal.fire({
                    title: "Error!",
                    text: errorMessage,
                    icon: "error"
                });
            })
    }

    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <div className="card-body">
                            <h1 className="text-5xl font-bold">Register!</h1>
                            <form onSubmit={handleSubmit} className="fieldset">
                                <label className="label">Name</label>
                                <input type="text" name="name" className="input" required placeholder="Name" />
                                <label className="label">Phone</label>
                                <input type="number" name="phone" className="input" required placeholder="Phone" />
                                <label className="label">Photo URL</label>
                                <input type="text" className="input" required placeholder="Photo URL" name="photoURL" />
                                <label className="label">Address</label>
                                <input type="text" name="address" className="input" required placeholder="Address" />
                                <label className="label">Email</label>
                                <input type="text" name="email" className="input" required placeholder="Email" />
                                <label className="label">Password</label>
                                <input type="password" name="password" className="input" required placeholder="Password" />
                                <button className="btn btn-neutral mt-4">Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;