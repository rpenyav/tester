import React, { useEffect, useState } from "react";
import { PaginatedData, TestSuite } from "../interfaces/testsuite";
import apiService from "../services/apiService";
import PaginadorComponent from "./PaginadorComponent";

const LIMIT = 10;

const TestListComponent: React.FC = () => {
  const [testSuites, setTestSuites] = useState<TestSuite[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchTestSuites(currentPage, LIMIT);
  }, [currentPage]);

  const fetchTestSuites = async (page: number, pageSize: number) => {
    try {
      const data: PaginatedData<TestSuite> = await apiService.fetchTestSuites(
        page,
        pageSize
      );
      setTestSuites(data.list);
      setTotalPages(data.totalPages);
      setCurrentPage(data.pageNumber);
    } catch (error) {
      console.error("Error fetching test suites", error);
      setTestSuites([]); // Seteamos un array vacío en caso de error
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h1>Test Suites</h1>
      <div>
        {testSuites.map((test, index) => (
          <div key={index} className="array-underlined">
            <p>Section: {test.sectionTest}</p>
            <p>
              Link:{" "}
              <a href={test.linkTest} target="_blank" rel="noopener noreferrer">
                {test.linkTest}
              </a>
            </p>
            <p>
              Screenshot: <img src={test.screenshotTest} alt="Screenshot" />
            </p>
            <p>Number: {test.numberTest}</p>
            <p>Title: {test.titleTest}</p>
            <p>Description: {test.descriptionTest}</p>
            <p>Date: {test.dateTest}</p>
            <p>Creator: {test.testCreator}</p>
          </div>
        ))}
      </div>
      <PaginadorComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default TestListComponent;
