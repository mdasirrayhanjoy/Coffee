import React from "react";
import { useLoaderData } from "react-router-dom";
const CoffeeDetiles = () => {
    const coffeeData = useLoaderData();
    console.log(coffeeData);
    return (
        <div>
            <h1>Coffee Detiles</h1>
        </div>
    );
};
export default CoffeeDetiles;