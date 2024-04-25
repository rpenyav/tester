import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiService from "../services/apiService";
import { TestSuite, Commentaris } from "../interfaces/testsuite";
import TestCardDetail from "../shared/TestCardDetail";
import Loader from "../shared/Loader";
import BreadCrumbComponent from "../shared/BreadCrumbComponent";
import { Card } from "react-bootstrap";
import CommentsList from "../shared/CommentsList";

const TestDetail = () => {
  const { title, id } = useParams<{ title: string; id: string }>(); // Tipado de useParams
  const [testSuite, setTestSuite] = useState<TestSuite | null>(null);

  useEffect(() => {
    const fetchTestSuite = async () => {
      try {
        const data = await apiService.getTestSuiteById(parseInt(id!));
        setTestSuite(data);
      } catch (error) {
        console.error("Failed to fetch test suite details:", error);
      }
    };

    fetchTestSuite();
  }, [id]);

  return (
    <div>
      {testSuite ? (
        <>
          <div className="row">
            <div className="col-12">
              <div className="mt-3 mb-4">
                <BreadCrumbComponent
                  titleTest={testSuite.titleTest}
                  projectId={testSuite.projectId}
                />
              </div>

              <TestCardDetail testSuite={testSuite} />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <CommentsList
                id={id}
                testSuite={testSuite}
                setTestSuite={setTestSuite}
              />
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default TestDetail;
