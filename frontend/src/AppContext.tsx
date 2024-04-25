// src/contexts/TestUpdateContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { TestSuite } from "./interfaces/testsuite";

interface TestUpdateContextType {
  isUpdated: boolean;
  setIsUpdated: Dispatch<SetStateAction<boolean>>;
  filteredTestSuites: TestSuite[];
  setFilteredTestSuites: Dispatch<SetStateAction<TestSuite[]>>;
}

const TestUpdateContext = createContext<TestUpdateContextType>({
  isUpdated: false,
  setIsUpdated: () => {},
  filteredTestSuites: [],
  setFilteredTestSuites: () => {},
});

interface TestUpdateProviderProps {
  children: ReactNode;
}

export const TestUpdateProvider: React.FC<TestUpdateProviderProps> = ({
  children,
}) => {
  const [isUpdated, setIsUpdated] = useState<boolean>(false);
  const [filteredTestSuites, setFilteredTestSuites] = useState<TestSuite[]>([]);
  console.log("Proyecto filteredTestSuites:", filteredTestSuites);
  return (
    <TestUpdateContext.Provider
      value={{
        isUpdated,
        setIsUpdated,
        filteredTestSuites,
        setFilteredTestSuites,
      }}
    >
      {children}
    </TestUpdateContext.Provider>
  );
};

export const useTestUpdate = () => useContext(TestUpdateContext);
