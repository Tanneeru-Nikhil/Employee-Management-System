import React from 'react';

const NavBar = () => {
    return (

        <header>
            <nav className="navbar navbar-expand-lg px-4" style={{ backgroundColor: 'black', color:'white' }} data-bs-theme="light">
                <div className="container-fluid">
                    <h3 className="navbar-brand mb-0 fs-3 fw-semibold text-dark">
                        Employee Management System
                    </h3>
                </div>
            </nav>
        </header>


    )
}


export default NavBar;