import React from "react";
import { useLoaderData } from "react-router";
import CoffeeCards from "./CoffeeCards";
import { useState } from "react";
const Home = () => {

    const initialCoffee = useLoaderData();
   const [coffees, setCoffees] = useState(initialCoffee);
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 my-6 m-24">
           {
            coffees.map(coffee => <CoffeeCards key={coffee._id} setCoffees={setCoffees} coffee={coffee}></CoffeeCards>)
           }
        </div>
    );
};

export default Home;
