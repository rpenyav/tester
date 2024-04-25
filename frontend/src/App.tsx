import React from "react";

import AppRoutes from "./Routes";
import { UserProvider } from "./UserContext";

function App() {
  return (
    <UserProvider>
      <AppRoutes />
    </UserProvider>
  );
}

export default App;
