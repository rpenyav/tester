import React from "react";
import { useParams } from "react-router-dom";
import useProject from "../hooks/useProject";
import Loader from "../shared/Loader";
import BreadCrumbComponent from "../shared/BreadCrumbComponent";
import TestListComponent from "../shared/TestListComponent";
import TestListByProject from "../shared/TestListByProject";

const ProjectsDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const project = useProject(projectId!);

  // Verificar si el proyecto ha cargado
  if (!project) {
    return <Loader />;
  }

  // Función para establecer el ID del proyecto
  const handleSetProjectId = (id: string) => {
    console.log("Project ID set to", id);
  };

  return (
    <div>
      <h2>Project Details</h2>

      <div className="mt-3 mb-5">
        <BreadCrumbComponent projectId={projectId} linked={true} />
      </div>

      <div>
        <strong>Project Name:</strong> {project.projectName}
      </div>
      <div>
        <strong>Description:</strong> {project.projectDescription}
      </div>
      <div>{project.id && <TestListByProject projectId={project.id} />}</div>
    </div>
  );
};

export default ProjectsDetail;
