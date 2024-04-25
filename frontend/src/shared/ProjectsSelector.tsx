import React, { useState, useEffect, useCallback } from "react";
import { Form, Modal, Button, Alert } from "react-bootstrap";
import apiService from "../services/apiService";
import { Project } from "../interfaces/projects";

interface ProjectsSelectorProps {
  onProjectSelect?: (projectId: string) => void;
  text: string;
}

const ProjectsSelector: React.FC<ProjectsSelectorProps> = ({
  onProjectSelect,
  text,
}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<number>();
  const [showNoProjectsModal, setShowNoProjectsModal] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await apiService.getAllProjects();
        if (data.list.length > 0) {
          setProjects(data.list);
          // No establecer automáticamente un proyecto seleccionado:
          // setSelectedProject(data.list[0].id!.toString());
          // if (onProjectSelect) {
          //   onProjectSelect(data.list[0].id!.toString());
          // }
        } else {
          setShowNoProjectsModal(true);
          // Asegúrate de que la opción por defecto esté seleccionada cuando no hay proyectos
          setSelectedProject(0);
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
        setError("No se pudieron cargar los proyectos.");
      }
    };

    loadProjects();
  }, []);

  const handleChange = (event: React.ChangeEvent<any>) => {
    const projectId = event.target.value;
    setSelectedProject(projectId);
    if (onProjectSelect) {
      onProjectSelect(projectId);
    }
  };

  const [reset, setReset] = useState(false);
  useEffect(() => {
    if (reset) {
      window.location.reload();
    }
  }, [reset]);

  return (
    <>
      <Form.Group>
        <Form.Control
          as="select"
          className="form-select"
          value={selectedProject}
          onChange={handleChange}
        >
          <option value="" disabled>
            {text}
          </option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.projectName}
            </option>
          ))}
          <option value="reset" onChange={() => setReset(true)}>
            Resetear filtro
          </option>
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

export default ProjectsSelector;
