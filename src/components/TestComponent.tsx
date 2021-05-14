import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const TestComponent = () => {

    const [testVal, setTestVal] = useState(0);


    
    const plus = () =>{
        setTestVal(testVal+1)
    }

    const minus = () =>{
        setTestVal(testVal-1)
    }


    return (
        <div className="container mt-5">
            <h1>Counter: {testVal}</h1>
            <button className="btn btn-primary" onClick={plus}>Plus One</button>
            <button style={{margin: "1em"}} className="btn btn-primary" onClick={minus}>Minus One</button>
        </div>
    );
};

export default TestComponent;