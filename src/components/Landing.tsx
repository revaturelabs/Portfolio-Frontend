// import React, { useState } from 'react';
import AccountLogin from './AccountLogin';

const Landing = () => {

/*     const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true); */

    return (
        <div className="mt-5">
            <div className="container col-xl-10 col-xxl-8 px-4 py-5">
                <div className="row align-items-center g-lg-5 py-5">
                    <div className="col-lg-7 text-center text-lg-start">
                        <h3 className="mb-3">Portfolio</h3>
                        <p className="col-lg-10 fs-4">Welcome to Portfolio. if this is your first time here please register. Otherwise login to view your portfolios</p>
                    </div>
                    <div className="col-md-10 mx-auto col-lg-5">
                        <AccountLogin />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Landing;