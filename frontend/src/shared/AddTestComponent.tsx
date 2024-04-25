// src/shared/AddTestComponent.tsx
import React, {
  useState,
  FormEvent,
  ChangeEvent,
  useCallback,
  useEffect,
} from "react";
import { TestSuite, TestSuiteErrors } from "../interfaces/testsuite";
import apiService from "../services/apiService";
import { useTestUpdate } from "../AppContext";
import { Alert, Breadcrumb } from "react-bootstrap";
import { useUser } from "../UserContext";
import AddProject from "./AddProject";
import ProjectsSelector from "./ProjectsSelector";
import {
  isRequired,
  isValidHttpUrl,
  minLength,
} from "../helpers/validationHelpers";
import FilterTests from "./FilterTests";
import BreadCrumbComponent from "./BreadCrumbComponent";

interface AddTestProps {
  onAddTest?: (test: TestSuite) => void;
}

const AddTestComponent: React.FC<AddTestProps> = ({ onAddTest }) => {
  const userData = useUser();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (userData && userData.email) {
      setFormData((prev) => ({
        ...prev,
        testCreator: userData.email,
      }));
    }
  }, [userData]); // Dependiendo de cuándo esté disponible

  const [formData, setFormData] = useState<TestSuite>({
    projectId: "",
    sectionTest: "",
    linkTest: "",
    screenshotTest: "",
    numberTest: "",
    titleTest: "",
    descriptionTest: "",
    dateTest: "",
    testCreator: userData ? userData.email : "",
    testConditions: "",
    testResult: "",
    testPriority: "",
    testStatus: "",
  });
  const [errors, setErrors] = useState<TestSuiteErrors>({});
  const { setIsUpdated } = useTestUpdate();

  const validateField = (key: keyof TestSuite, value: string): boolean => {
    let isValid = true; // Inicializa la variable con un valor predeterminado si es necesario.

    switch (key) {
      case "titleTest":
        isValid = isRequired(value);
        break;
      case "sectionTest":
        isValid = isRequired(value);
        break;
      case "dateTest":
        isValid = isRequired(value);
        break;
      case "testCreator":
        isValid = isRequired(value);
        break;
      case "linkTest":
        isValid = isValidHttpUrl(value);
        break;
      case "descriptionTest":
        isValid = isRequired(value) && minLength(value, 100);
        break;
      default:
        isValid = true; // Para campos que no necesitan validación especial
        break;
    }

    console.log(`Validating ${key}: ${value} => ${isValid}`);
    return isValid;
  };

  const validateForm = () => {
    const newErrors: TestSuiteErrors = {};
    let isValidForm = true;
    Object.keys(formData).forEach((key) => {
      const fieldKey = key as keyof TestSuite;
      // Asegúrate de que el valor sea siempre un string.
      const value = (formData[fieldKey] ?? "").toString();

      if (!validateField(fieldKey, value)) {
        newErrors[fieldKey] = `${key} is invalid.`; // Ajusta el mensaje según sea necesario.
        isValidForm = false;
      }
    });

    console.log("Form validation result:", isValidForm);
    setErrors(newErrors);
    return isValidForm;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("aun no validado");
    if (!validateForm()) return;
    console.log("validado");
    try {
      await apiService.addTest(formData);
      if (onAddTest) {
        onAddTest({ ...formData });
      }
      setIsUpdated(true); // Actualizar el contexto para indicar que se añadió un test
      setFormData({
        projectId: "",
        sectionTest: "",
        linkTest: "",
        screenshotTest: "",
        numberTest: "",
        titleTest: "",
        descriptionTest: "",
        dateTest: "",
        testCreator: "",
        testConditions: "",
        testResult: "",
        testPriority: "",
        testStatus: "",
      });
      setShowForm(false);
    } catch (error) {
      console.error("Error adding test", error);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: keyof TestSuite
  ) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));

    // Revalidar el campo y limpiar el error si el campo ahora es válido
    if (validateField(key, value)) {
      setErrors((prev) => ({
        ...prev,
        [key]: undefined, // Elimina el error para el campo específico
      }));
    }
  };

  const handleCancel = () => {
    setFormData({
      projectId: "",
      sectionTest: "",
      linkTest: "",
      screenshotTest: "",
      numberTest: "",
      titleTest: "",
      descriptionTest: "",
      dateTest: "",
      testCreator: "",
      testConditions: "",
      testResult: "",
      testPriority: "",
      testStatus: "",
    });
    setShowForm(false);
  };

  const handleProjectSelect = useCallback((projectId: string) => {
    setFormData((prev) => ({
      ...prev,
      projectId: projectId,
    }));
    console.log("Proyecto seleccionado:", projectId);
  }, []);

  return (
    <div className="row ">
      <div className="col-12 ">
        <div className="row mt-3  min-h-bread">
          <div className="col-9">
            <BreadCrumbComponent />
          </div>
          <div className="col-3">
            <div className="d-flex justify-content-end">
              <AddProject />
              <button
                className="floating-button ms-2"
                style={{ minWidth: "120px" }}
                onClick={() => setShowForm(true)}
              >
                + Nuevo test
              </button>
            </div>
          </div>
        </div>
        {showForm && (
          <div className="row newtest ">
            <div className="col-12 p-4">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-12 mb-3">
                    <h3>Crear nuevo test</h3>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div>
                      <div className="form-group">
                        <label>Title: </label>
                        <input
                          className="form-control"
                          type="text"
                          value={formData.titleTest}
                          onChange={(e) => handleChange(e, "titleTest")}
                        />
                        {errors?.titleTest && (
                          <Alert variant="danger">{errors.titleTest}</Alert>
                        )}
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-6">
                        <div className="form-group ">
                          <label>Choose a Project</label>
                          <ProjectsSelector
                            text="Seleccionar proyecto"
                            onProjectSelect={handleProjectSelect}
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-group ">
                          <label>Section: </label>
                          <input
                            type="text"
                            className="form-control"
                            value={formData.sectionTest}
                            onChange={(e) => handleChange(e, "sectionTest")}
                          />
                          {errors?.sectionTest && (
                            <Alert variant="danger">{errors.sectionTest}</Alert>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between  mt-2">
                      <div className="form-group ">
                        <label>Link: </label>
                        <input
                          type="text"
                          className="form-control"
                          value={formData.linkTest}
                          onChange={(e) => handleChange(e, "linkTest")}
                        />
                        {errors?.linkTest && (
                          <Alert variant="danger">{errors.linkTest}</Alert>
                        )}
                      </div>
                      <div className="form-group ">
                        <label>Screenshot: </label>
                        <input
                          type="text"
                          className="form-control"
                          value={formData.screenshotTest}
                          onChange={(e) => handleChange(e, "screenshotTest")}
                        />
                      </div>
                      <div className="form-group ">
                        <label>Number: </label>
                        <input
                          type="text"
                          className="form-control"
                          value={formData.numberTest}
                          onChange={(e) => handleChange(e, "numberTest")}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex justify-content-between mt-4">
                      <div className="d-flex justify-content-start align-items-center mt-1">
                        <label>Date:</label>
                        <input
                          type="date"
                          className="form-control"
                          value={formData.dateTest}
                          onChange={(e) => handleChange(e, "dateTest")}
                        />
                        {errors?.dateTest && (
                          <Alert variant="danger">{errors.dateTest}</Alert>
                        )}
                      </div>
                      <div className="d-flex justify-content-between align-items-center mt-1">
                        <label>Creator:</label>
                        <input
                          type="text"
                          readOnly
                          className="form-control"
                          value={userData.email}
                          onChange={(e) => handleChange(e, "testCreator")}
                        />
                      </div>
                    </div>
                    <div className="form-group mt-5 mb-5">
                      <label>Description: </label>
                      <textarea
                        rows={5}
                        className="form-control"
                        value={formData.descriptionTest}
                        onChange={(e) => handleChange(e, "descriptionTest")}
                      />
                      {errors?.descriptionTest && (
                        <Alert variant="danger">{errors.descriptionTest}</Alert>
                      )}
                    </div>
                  </div>
                </div>
                <div className="row min-h-bread">
                  <div className="col-12">
                    <div className="d-flex justify-content-center">
                      <button
                        className="floating-button color-diff-2 ms-3"
                        type="button"
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>{" "}
                      <button className="floating-button ms-2" type="submit">
                        Guardar Test
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddTestComponent;
