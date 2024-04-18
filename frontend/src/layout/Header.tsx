import React from "react";
import NavBar from "./NavBar";

const Header: React.FC = () => {
  return (
    <div className="row">
      <div className="col-12">
        <header>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <div className="d-flex justify-content-start align-items-center">
                <div>
                  <h5 className="fw-bold">Test Nest</h5>
                </div>
                <div className="ms-2 me-2"> | </div>
                <div>
                  <h5>redacción de pruebas</h5>
                </div>
              </div>
            </div>
            <div>
              <NavBar />
            </div>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Header;
