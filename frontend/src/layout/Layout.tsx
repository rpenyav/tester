import React from "react";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;
