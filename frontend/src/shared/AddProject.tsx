import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import apiService from "../services/apiService";
import { useNavigate } from "react-router-dom";

const AddProject = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const [formData, setFormData] = useState({
    projectName: "",
    projectPrefix: "",
    projectDescription: "",
    projectPriority: "",
    projectActive: false,
    projectIsCompleted: false,
    projectCreatedAt: "",
    projectCreator: "",
  });

  const handleChange = (e: {
    target: { name: any; value: any; type: any; checked: any };
  }) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSaveProject = async () => {
    try {
      const dataToSend = {
        ...formData,
        projectCreatedAt: formData.projectCreatedAt
          ? new Date(formData.projectCreatedAt).toISOString()
          : new Date().toISOString(),
      };
      const response = await apiService.addProject(dataToSend as any);

      if (response && response.id) {
        handleCloseModal();
        // Suponiendo que la ruta de los detalles del proyecto utiliza el ID del proyecto en la URL
        navigate(`/projects/detail/${response.projectName}/${response.id}`);
      } else {
        throw new Error("Project creation did not return an ID.");
      }
    } catch (error) {
      console.error("Error adding project:", error);
      alert("Failed to add project.");
    }
  };

  return (
    <div>
      <Button
        variant="primary"
        className="floating-button color-diff ms-3"
        onClick={handleOpenModal}
      >
        Crear nuevo proyecto
      </Button>

      <Modal
        show={showModal}
        onHide={handleCloseModal}
        centered
        className="modal-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container mt-3">
            <form>
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="projectName" className="form-label">
                    Project Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="projectName"
                    name="projectName"
                    value={formData.projectName}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="projectPrefix" className="form-label">
                    Project Prefix
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="projectPrefix"
                    name="projectPrefix"
                    value={formData.projectPrefix}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="projectDescription" className="form-label">
                    Project Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="projectDescription"
                    name="projectDescription"
                    value={formData.projectDescription}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="projectPriority" className="form-label">
                    Project Priority
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="projectPriority"
                    name="projectPriority"
                    value={formData.projectPriority}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="projectActive"
                      name="projectActive"
                      checked={formData.projectActive}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="projectActive">
                      Project Active
                    </label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="projectIsCompleted"
                      name="projectIsCompleted"
                      checked={formData.projectIsCompleted}
                      onChange={handleChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="projectIsCompleted"
                    >
                      Project is Completed
                    </label>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="projectCreatedAt" className="form-label">
                    Project Created At
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="projectCreatedAt"
                    name="projectCreatedAt"
                    value={formData.projectCreatedAt}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="projectCreator" className="form-label">
                    Project Creator
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="projectCreator"
                    name="projectCreator"
                    value={formData.projectCreator}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveProject}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddProject;
