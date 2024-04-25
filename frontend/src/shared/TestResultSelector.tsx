import React from "react";
import { Form } from "react-bootstrap";

export interface TestResultSelectorProps {
  selected?: string | number; // Permitir ambos tipos
  onSelect: (result: string) => void; // Asegurar que siempre se pase una cadena
}

const TestResultSelector: React.FC<TestResultSelectorProps> = ({
  selected,
  onSelect,
}) => {
  const testResults = [
    { id: "passed", name: "Passed" },
    { id: "failed", name: "Failed" },
    { id: "not_executed", name: "Not Executed" },
  ];

  return (
    <Form.Group>
      <Form.Control
        as="select"
        value={selected || ""} // Asegura que siempre haya un valor definido, evitando valores undefined
        onChange={(e) => onSelect(e.target.value)} // Envía el valor seleccionado como cadena
        className="form-select"
      >
        <option value="">Select a result</option>
        {testResults.map((result) => (
          <option key={result.id} value={result.id}>
            {result.name}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  );
};

export default TestResultSelector;
