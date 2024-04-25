import React, { useState, useEffect } from "react";
import axios from "axios";
import { PaginatedData } from "../interfaces/testsuite";
import TestListComponent from "../shared/TestListComponent";
import AddTestComponent from "../shared/AddTestComponent";
import { TestUpdateProvider } from "../AppContext";

const HomePage: React.FC = () => {
  return (
    <TestUpdateProvider>
      <div>
        <AddTestComponent />

        <TestListComponent />
      </div>
    </TestUpdateProvider>
  );
};

export default HomePage;
