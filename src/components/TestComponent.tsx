import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const TestComponent = () => {

    const [testVal, setTestVal] = useState(0);


    
    const onClick = () =>{
        setTestVal(testVal+1)
    }


    return (
        <div className="container mt-5">
            <h1>Counter: {testVal}</h1>
            <button name="testing" className="btn btn-primary" onClick={onClick}>Plus One</button>
        </div>
    );
};

export default TestComponent;