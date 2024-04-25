import React from "react";
import { Form } from "react-bootstrap";

export interface TestConditionsSelectorProps {
  selected?: string | number; // Permitir ambos tipos
  onSelect: (condition: string) => void; // Asegurar que siempre se pase una cadena
}

const TestConditionsSelector: React.FC<TestConditionsSelectorProps> = ({
  selected,
  onSelect,
}) => {
  const testConditions = [
    { id: "normal", name: "Normal" },
    { id: "critical", name: "Crítica" },
    { id: "blocked", name: "Bloqueada" },
    { id: "high", name: "Alta" },
    { id: "low", name: "Baja" },
  ];

  return (
    <Form.Group>
      <Form.Control
        as="select"
        value={selected || ""} // Asegura que siempre haya un valor definido, evitando valores undefined
        onChange={(e) => onSelect(e.target.value)}
        className="form-select"
      >
        <option value="">Seleccione una condición</option>
        {testConditions.map((condition) => (
          <option key={condition.id} value={condition.id}>
            {condition.name}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  );
};

export default TestConditionsSelector;
