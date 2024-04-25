import React, { useEffect, useState } from "react";
import { Table, Pagination } from "react-bootstrap";
import { Project } from "../interfaces/projects";
import apiService from "../services/apiService";
import BreadCrumbComponent from "../shared/BreadCrumbComponent";
import { Link } from "react-router-dom";

const cleanProjectId = (projectId: string) => {
  return projectId.replace(/\s+/g, "-").toLowerCase();
};

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchProjects = async (page: number) => {
    try {
      const data = await apiService.getAllProjects(page);
      setProjects(data.list);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching projects", error);
    }
  };

  useEffect(() => {
    fetchProjects(currentPage);
  }, [currentPage]);

  return (
    <div style={{ minHeight: "600px" }}>
      <div className="mt-3 mb-5">
        <BreadCrumbComponent />
      </div>
      <div className="mb-5">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Project Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr key={project.id}>
                <td>{index + 1 + (currentPage - 1) * 10}</td>
                <td>
                  <Link
                    to={`/projects/detail/${cleanProjectId(
                      project.projectName
                    )}/${project.id}`}
                  >
                    {project.projectName}
                  </Link>
                </td>
                <td>{project.projectDescription}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
            <Pagination.Item
              key={number}
              active={number === currentPage}
              onClick={() => setCurrentPage(number)}
            >
              {number}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
    </div>
  );
};

export default Projects;
