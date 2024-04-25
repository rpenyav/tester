import { useEffect, useState } from "react";
import apiService from "../services/apiService";
import { Project } from "../interfaces/projects";

const useProject = (projectId: string): Project | undefined => {
  const [project, setProject] = useState<Project | undefined>(undefined);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        if (projectId) {
          const projectData = await apiService.getProjectById(projectId);
          if (projectData) {
            setProject(projectData);
          }
        }
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };

    fetchProject();

    // Clean up the effect to prevent memory leaks
    return () => {};
  }, [projectId]);

  return project;
};

export default useProject;
