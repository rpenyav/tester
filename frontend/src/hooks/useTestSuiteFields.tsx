import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import apiService from "../services/apiService";
import ProjectsSelectorBasic from "../shared/ProjectsSelectorBasic";
import TestConditionsSelector from "../shared/TestConditionsSelector";
import TestResultSelector from "../shared/TestResultSelector";
import TestPrioritySelector from "../shared/TestPrioritySelector";
import TestStatusSelector from "../shared/TestStatusSelector";
import { TestSuite } from "../interfaces/testsuite";
import EditIcon from "../shared/EditIcon";

function useTestSuiteFields(testSuite: TestSuite) {
  const { id, comments, ...initialValues } = testSuite;
  const [editValues, setEditValues] = useState({ ...initialValues });
  const [editMode, setEditMode] = useState<Record<string, boolean>>({});
  const [pendingChanges, setPendingChanges] = useState<any>({});
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const handleEdit = (field: keyof typeof initialValues) => {
    setEditMode({ ...editMode, [field]: true });
  };

  const handleChange = (field: keyof typeof initialValues, value: string) => {
    setEditValues((prevEditValues) => ({ ...prevEditValues, [field]: value }));
    setPendingChanges((prevPendingChanges: any) => ({
      ...prevPendingChanges,
      [field]: value,
    }));
  };

  useEffect(() => {
    localStorage.setItem("pendingChanges", JSON.stringify(pendingChanges));
  }, [pendingChanges]);

  const handleConfirmChanges = () => {
    if (id) {
      const changesToConfirm = JSON.parse(
        localStorage.getItem("pendingChanges") || "{}"
      );

      apiService
        .updateTestSuite(id, changesToConfirm)
        .then(() => {
          setPendingChanges({});
          localStorage.setItem("pendingChanges", JSON.stringify({}));
          setShowSuccessAlert(true);
        })
        .catch(console.error);
    } else {
      console.error("ID is not available for updating test suite.");
    }
  };

  const handleBlur = (field: keyof typeof initialValues) => {
    setEditMode({ ...editMode, [field]: false });
    // No enviamos automáticamente los cambios al servidor al perder el foco,
    // sino que esperamos a que el usuario confirme explícitamente los cambios.
  };

  const fieldTypeComponents = {
    projectId: ProjectsSelectorBasic,
    testConditions: TestConditionsSelector,
    testResult: TestResultSelector,
    testPriority: TestPrioritySelector,
    testStatus: TestStatusSelector,
  };

  const getFieldComponent = (field: keyof typeof initialValues) => {
    const FieldComponent =
      fieldTypeComponents[field as keyof typeof fieldTypeComponents];

    if (FieldComponent) {
      return React.createElement(FieldComponent, {
        selected: editValues[field],
        onSelect: (value: string) => handleChange(field, value),
      });
    } else if (editMode[field]) {
      return (
        <Form.Control
          type="text"
          value={editValues[field] || ""}
          onChange={(e) => handleChange(field, e.target.value)}
          onBlur={() => handleBlur(field)}
        />
      );
    } else {
      return (
        <div onClick={() => handleEdit(field)}>
          {`${editValues[field]}`}
          <EditIcon />
        </div>
      );
    }
  };

  return {
    renderField: getFieldComponent,
    handleConfirmChanges: handleConfirmChanges,
    showSuccessAlert: showSuccessAlert,
    setShowSuccessAlert: setShowSuccessAlert,
  };
}

export default useTestSuiteFields;
