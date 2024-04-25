import React, { useState, useEffect } from "react";
import { Form, Modal, Button, Alert } from "react-bootstrap";
import apiService from "../services/apiService";
import { Project } from "../interfaces/projects";

export interface ProjectsSelectorBasicProps {
  selected?: string | number; // Permitir ambos tipos
  onSelect: (projectId: string) => void;
}

const ProjectsSelectorBasic: React.FC<ProjectsSelectorBasicProps> = ({
  selected,
  onSelect,
}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showNoProjectsModal, setShowNoProjectsModal] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await apiService.getAllProjects();
        if (data.list.length === 0) {
          setShowNoProjectsModal(true);
        }
        setProjects(data.list);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
        setError("No se pudieron cargar los proyectos.");
      }
    };
    loadProjects();
  }, []);

  const handleChange = (event: any) => {
    const selectElement = event.target as HTMLSelectElement; // Cast a HTMLSelectElement
    onSelect(selectElement.value);
  };

  return (
    <>
      <Form.Group>
        <Form.Control
          as="select"
          className="form-select"
          value={selected || ""}
          onChange={handleChange}
        >
          <option disabled value="">
            Seleccione un proyecto
          </option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.projectName}
            </option>
          ))}
        </Form.Control>
        {error && <Alert variant="danger">{error}</Alert>}
      </Form.Group>
      <Modal
        show={showNoProjectsModal}
        onHide={() => setShowNoProjectsModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Información Importante</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          No existen proyectos creados. Debe crear un proyecto para poder
          asignar los test.
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => setShowNoProjectsModal(false)}
          >
            Entendido
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProjectsSelectorBasic;
