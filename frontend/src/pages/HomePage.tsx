import React, { useState, useEffect } from "react";
import axios from "axios";
import { PaginatedData } from "../interfaces/testsuite";
import TestListComponent from "../shared/TestListComponent";
import AddTestComponent from "../shared/AddTestComponent";

const HomePage: React.FC = () => {
  return (
    <div>
      <AddTestComponent />
      <TestListComponent />
    </div>
  );
};

export default HomePage;
