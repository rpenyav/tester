import React from "react";
import { Form } from "react-bootstrap";

export interface TestPrioritySelectorProps {
  selected?: string | number; // Permitir ambos tipos
  onSelect: (priority: string) => void; // Asegurar que siempre se pase una cadena
}

const TestPrioritySelector: React.FC<TestPrioritySelectorProps> = ({
  selected,
  onSelect,
}) => {
  const testPriorities = [
    { id: "high", name: "High" },
    { id: "medium", name: "Medium" },
    { id: "low", name: "Low" },
  ];

  return (
    <Form.Group>
      <Form.Control
        as="select"
        value={selected || ""} // Asegura que siempre haya un valor definido
        onChange={(e) => onSelect(e.target.value)} // Envía el valor seleccionado como cadena
        className="form-select"
      >
        <option value="">Select a priority</option>
        {testPriorities.map((priority) => (
          <option key={priority.id} value={priority.id}>
            {priority.name}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  );
};

export default TestPrioritySelector;
