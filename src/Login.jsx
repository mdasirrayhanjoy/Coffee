import React, { useContext } from "react";
import AuthContext from "./AuthContext";
import Swal from "sweetalert2";
const Login = () => {

    const { signInUserEmailPassword } = useContext(AuthContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        if (!email || !password) {
            Swal.fire({
                title: "Error!",
                text: "Please fill all fields.",
                icon: "error"
            });
            return;
        }

        signInUserEmailPassword(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                Swal.fire({
                    title: "Success!",
                    text: "Logged in successfully.",
                    icon: "success"
                });

                const lastSignInTime = result.user?.metadata?.lastSignInTime;
                const loginInfo = { email, lastSignInTime };

                fetch('http://localhost:3000/users', {
                    method: 'PATCH',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(loginInfo)
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log("Login time updated in DB:", data);
                        form.reset();
                    })
            })
            .catch(error => {
                console.error(error);
                let errorMessage = "Failed to login.";
                if (error.code === 'auth/invalid-credential') {
                    errorMessage = "Invalid email or password.";
                } else if (error.code === 'auth/user-not-found') {
                    errorMessage = "No user found with this email.";
                } else if (error.code === 'auth/wrong-password') {
                    errorMessage = "Incorrect password.";
                } else if (error.code === 'auth/too-many-requests') {
                    errorMessage = "Too many failed attempts. Please try again later.";
                }

                Swal.fire({
                    title: "Error!",
                    text: errorMessage,
                    icon: "error"
                });
            });
    };
    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <div className="card-body">
                            <h1 className="text-5xl font-bold">Login now!</h1>
                            <form onSubmit={handleSubmit} className="fieldset">
                                <label className="label">Email</label>
                                <input type="email" className="input" required placeholder="Email" name="email" />
                                <label className="label">Password</label>
                                <input type="password" className="input" required placeholder="Password" name="password" />
                                <div><a className="link link-hover">Forgot password?</a></div>
                                <button className="btn btn-neutral mt-4">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Login;