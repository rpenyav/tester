import React, { useState } from "react";
import { TestSuite } from "../interfaces/testsuite";
import apiService from "../services/apiService";

interface AddTestProps {
  onAddTest?: (test: TestSuite) => void;
}

const AddTestComponent: React.FC<AddTestProps> = ({ onAddTest }) => {
  const [formData, setFormData] = useState<TestSuite>({
    sectionTest: "",
    linkTest: "",
    screenshotTest: "",
    numberTest: "",
    titleTest: "",
    descriptionTest: "",
    dateTest: "",
    testCreator: "",
  });
  const [showForm, setShowForm] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof TestSuite
  ) => {
    setFormData({
      ...formData,
      [key]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await apiService.addTest(formData);
      if (onAddTest) {
        // Pasar una copia del objeto formData
        onAddTest({ ...formData });
      }

      setFormData({
        sectionTest: "",
        linkTest: "",
        screenshotTest: "",
        numberTest: "",
        titleTest: "",
        descriptionTest: "",
        dateTest: "",
        testCreator: "",
      });
      setShowForm(false); // Ocultar el formulario después de enviar
    } catch (error) {
      console.error("Error adding test", error);
    }
  };

  const handleCancel = () => {
    // Limpiar el formulario al cancelar
    setFormData({
      sectionTest: "",
      linkTest: "",
      screenshotTest: "",
      numberTest: "",
      titleTest: "",
      descriptionTest: "",
      dateTest: "",
      testCreator: "",
    });
    setShowForm(false); // Ocultar el formulario al cancelar
  };

  return (
    <div>
      <button onClick={() => setShowForm(true)}>Add Test</button>

      <div className={showForm ? "visible" : "invisible"}>
        <form onSubmit={handleSubmit}>
          <label>
            Section:
            <input
              type="text"
              value={formData.sectionTest}
              onChange={(e) => handleChange(e, "sectionTest")}
            />
          </label>
          <label>
            Link:
            <input
              type="text"
              value={formData.linkTest}
              onChange={(e) => handleChange(e, "linkTest")}
            />
          </label>
          <label>
            Screenshot:
            <input
              type="text"
              value={formData.screenshotTest}
              onChange={(e) => handleChange(e, "screenshotTest")}
            />
          </label>
          <label>
            Number:
            <input
              type="text"
              value={formData.numberTest}
              onChange={(e) => handleChange(e, "numberTest")}
            />
          </label>
          <label>
            Title:
            <input
              type="text"
              value={formData.titleTest}
              onChange={(e) => handleChange(e, "titleTest")}
            />
          </label>
          <label>
            Description:
            <input
              type="text"
              value={formData.descriptionTest}
              onChange={(e) => handleChange(e, "descriptionTest")}
            />
          </label>
          <label>
            Date:
            <input
              type="text"
              value={formData.dateTest}
              onChange={(e) => handleChange(e, "dateTest")}
            />
          </label>
          <label>
            Creator:
            <input
              type="text"
              value={formData.testCreator}
              onChange={(e) => handleChange(e, "testCreator")}
            />
          </label>
          <button type="submit">Submit</button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTestComponent;
