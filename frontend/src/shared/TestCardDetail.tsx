import React, { FC, useEffect } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import { TestSuite } from "../interfaces/testsuite";
import useTestSuiteFields from "../hooks/useTestSuiteFields";
import Swal from "sweetalert2";

interface TestCardProps {
  testSuite: TestSuite;
}

const TestCardDetail: FC<TestCardProps> = ({ testSuite }) => {
  const {
    renderField,
    handleConfirmChanges,
    showSuccessAlert,
    setShowSuccessAlert,
  } = useTestSuiteFields(testSuite);

  const testSuiteEdits = JSON.parse(
    localStorage.getItem("pendingChanges") || "{}"
  );
  const isChangesPending = Object.keys(testSuiteEdits).length !== 0;

  useEffect(() => {
    const cleanupLocalStorage = () => {
      localStorage.setItem("pendingChanges", "{}");
    };

    window.addEventListener("beforeunload", cleanupLocalStorage);

    return () => {
      window.removeEventListener("beforeunload", cleanupLocalStorage);
    };
  }, []);

  useEffect(() => {
    if (showSuccessAlert) {
      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Operación realizada con éxito.",
        confirmButtonText: "Aceptar",
      }).then(() => {
        setShowSuccessAlert(false);
      });
    }
  }, [showSuccessAlert]);

  return (
    <>
      <Card className="mb-3 ps-5 pe-5 pt-4 pb-3 controlled-shadow">
        <h3>{renderField("titleTest")}</h3>

        <div className="row mt-4 mb-3">
          <div className="col-md-4">
            <strong>Proyecto:</strong> {renderField("projectId")}
          </div>
          <div className="col-md-3">
            <strong>Nº Test:</strong> {renderField("numberTest")}
          </div>
          <div className="col-md-3">
            <strong>Fecha:</strong> {renderField("dateTest")}
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-3">
            <strong>Sección:</strong> {renderField("sectionTest")}
          </div>
          <div className="col-md-3">
            <strong>Prioridad:</strong> {renderField("testPriority")}
          </div>
          <div className="col-md-3">
            <strong>Status:</strong> {renderField("testStatus")}
          </div>
          <div className="col-md-3">
            {" "}
            <strong>Creado por:</strong>
            {renderField("testCreator")}
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            {" "}
            <strong>Screenshots:</strong>
            {renderField("screenshotTest")}
          </div>
          <div className="col-md-6">
            {" "}
            <strong>Link test:</strong>
            {renderField("linkTest")}
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-3">
            {" "}
            <strong>Condiciones:</strong>
            {renderField("testConditions")}
          </div>
          <div className="col-md-3">
            {" "}
            <strong>Resultado:</strong>
            {renderField("testResult")}
          </div>
        </div>

        <div className="row mb-5">
          <div className="col-md-12">
            {" "}
            <strong>Descripción:</strong>
            {renderField("descriptionTest")}
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-12 mt-3" style={{ height: "50px" }}>
            <Button
              className="floating-button"
              disabled={!isChangesPending}
              onClick={() => handleConfirmChanges()}
            >
              Confirm Changes
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
};

export default TestCardDetail;
