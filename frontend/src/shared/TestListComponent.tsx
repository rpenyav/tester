import React, { useEffect, useState } from "react";
import { TestSuite } from "../interfaces/testsuite";
import apiService from "../services/apiService";
import PaginadorComponent from "./PaginadorComponent";
import { useTestUpdate } from "../AppContext";
import InputSearch from "./InputSearch";
import SortingControls from "./SortingControls";
import TestCard from "./TestCard";

const LIMIT = 10;

const TestListComponent: React.FC = () => {
  const [testSuites, setTestSuites] = useState<TestSuite[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { isUpdated, setIsUpdated, filteredTestSuites } = useTestUpdate();
  const [orderBy, setOrderBy] = useState("id");
  const [orderDirection, setOrderDirection] = useState("DESC");

  useEffect(() => {
    if (isUpdated || !filteredTestSuites.length) {
      fetchTestSuites(currentPage, LIMIT, orderBy, orderDirection);
      setIsUpdated(false);
    }
  }, [
    isUpdated,
    currentPage,
    filteredTestSuites.length,
    orderBy,
    orderDirection,
  ]);

  useEffect(() => {
    if (filteredTestSuites.length) {
      setTotalPages(Math.ceil(filteredTestSuites.length / LIMIT));
      setTestSuites(
        filteredTestSuites.slice((currentPage - 1) * LIMIT, currentPage * LIMIT)
      );
    }
  }, [currentPage, filteredTestSuites]);

  const fetchTestSuites = async (
    page: number,
    pageSize: number,
    orderBy: string,
    orderDirection: string
  ) => {
    try {
      const data = await apiService.fetchTestSuites(
        page,
        pageSize,
        orderBy,
        orderDirection
      );
      setTestSuites(data.list);
      setTotalPages(data.totalPages);
      setCurrentPage(data.pageNumber);
    } catch (error) {
      console.error("Error fetching test suites", error);
      setTestSuites([]);
      setTotalPages(0);
    }
  };

  const handleSearchResults = (data: any) => {
    setTestSuites(data.list);
    setTotalPages(data.totalPages);
    setCurrentPage(1);
  };

  const handleResetResults = () => {
    fetchTestSuites(currentPage, LIMIT, orderBy, orderDirection);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
      <InputSearch
        onSearchResults={handleSearchResults}
        onResetResults={handleResetResults}
      />

      {filteredTestSuites.length || testSuites.length ? (
        <>
          <div className="d-flex justify-content-between align-items-center">
            <SortingControls
              orderBy={orderBy}
              orderDirection={orderDirection}
              onOrderByChange={handleOrderByChange}
              onOrderDirectionChange={handleOrderDirectionChange}
            />
            <PaginadorComponent
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>

          <div className="row">
            {(filteredTestSuites.length ? filteredTestSuites : testSuites).map(
              (test, index) => (
                <div
                  className="col-lg-4 col-md-6  col-xs-12 col-sm-12"
                  key={index}
                >
                  <TestCard testData={test} />
                </div>
              )
            )}
          </div>
          <PaginadorComponent
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <p>No test suites found for this project ID.</p>
      )}
    </div>
  );
};

export default TestListComponent;
