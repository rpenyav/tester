import React, { useCallback, useState } from "react";
import ProjectsSelector from "./ProjectsSelector";
import apiService from "../services/apiService";
import { useTestUpdate } from "../AppContext";
import SortingControls from "./SortingControls"; // Asegúrate de tener este componente

const FilterTests = () => {
  const { setFilteredTestSuites } = useTestUpdate();
  const [orderBy, setOrderBy] = useState("id");
  const [orderDirection, setOrderDirection] = useState("ASC");

  const handleProjectSelect = useCallback(
    async (projectId: string) => {
      const numericProjectId = parseInt(projectId, 10);

      if (!isNaN(numericProjectId)) {
        try {
          const response = await apiService.getTestSuitesByProjectId(
            numericProjectId,
            1,
            10,
            orderBy,
            orderDirection
          );
          setFilteredTestSuites(response.list);
        } catch (error) {
          console.error("Error fetching test suites by project id:", error);
          setFilteredTestSuites([]);
        }
      }
    },
    [setFilteredTestSuites, orderBy, orderDirection] // Agregar dependencias aquí
  );

  const handleOrderByChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setOrderBy(event.target.value);
  };

  const handleOrderDirectionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setOrderDirection(event.target.value);
  };

  return (
    <div>
      <ProjectsSelector
        onProjectSelect={handleProjectSelect}
        text="Seleccione un proyecto..."
      />
      {/* <SortingControls // Asegúrate de que este componente permita configurar el orden y la dirección
        orderBy={orderBy}
        orderDirection={orderDirection}
        onOrderByChange={handleOrderByChange}
        onOrderDirectionChange={handleOrderDirectionChange}
      /> */}
    </div>
  );
};

export default FilterTests;
