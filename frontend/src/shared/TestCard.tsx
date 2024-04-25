import React from "react";
import { Card, CardBody } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useProject from "../hooks/useProject";
import { TestSuite } from "../interfaces/testsuite";

interface TestCardProps {
  testData: TestSuite;
}

const TestCard: React.FC<TestCardProps> = ({ testData }) => {
  const navigate = useNavigate();
  const project = useProject(testData.projectId);
  const handleDetailClick = () => {
    const titleUrl = encodeURIComponent(
      testData.titleTest.replace(/\s+/g, "-")
    );
    navigate(`/detail/${titleUrl}/${testData.id}`);
  };

  return (
    <Card className="mb-3 p-3 controlled-shadow">
      <CardBody>
        <div>
          <h4>{testData.titleTest}</h4>

          <div className="d-flex justify-content-between mb-3">
            <h6>Number: {testData.numberTest}</h6>
            <h6>Fecha: {testData.dateTest}</h6>
          </div>
          <p className="m-0">
            <strong>Proyecto:</strong> <a href="">{project?.projectName}</a>
          </p>
          <p className="m-0">
            <strong>Section:</strong> {testData.sectionTest}
          </p>
          {/* <p>
            Link:{" "}
            <a
              href={testData.linkTest}
              target="_blank"
              rel="noopener noreferrer"
            >
              {testData.linkTest}
            </a>
          </p> */}
          <p>
            <strong>Creada por:</strong> {testData.testCreator}
          </p>
          <p className="description-ellipsis">{testData.descriptionTest}...</p>

          <button className="mt-3 floating-button" onClick={handleDetailClick}>
            Detalle
          </button>
        </div>
      </CardBody>
    </Card>
  );
};

export default TestCard;
