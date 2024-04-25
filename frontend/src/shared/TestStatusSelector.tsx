import React from "react";
import { Form } from "react-bootstrap";

export interface TestStatusSelectorProps {
  selected?: string | number; // Permitir ambos tipos para alinearse con SelectorProps
  onSelect: (status: string) => void; // Asegurar que siempre se pase una cadena
}

const TestStatusSelector: React.FC<TestStatusSelectorProps> = ({
  selected,
  onSelect,
}) => {
  const testStatuses = [
    { id: "active", name: "Active" },
    { id: "inactive", name: "Inactive" },
    { id: "retired", name: "Retired" },
  ];

  return (
    <Form.Group>
      <Form.Control
        as="select"
        value={selected || ""} // Asegura que siempre haya un valor definido, evitando valores undefined
        onChange={(e) => onSelect(e.target.value)} // Envía el valor seleccionado como cadena
        className="form-select"
      >
        <option value="">Select a status</option>
        {testStatuses.map((status) => (
          <option key={status.id} value={status.id}>
            {status.name}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  );
};

export default TestStatusSelector;
