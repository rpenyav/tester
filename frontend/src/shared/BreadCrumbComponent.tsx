import React, { FC } from "react";
import useProject from "../hooks/useProject";
import { FaHome } from "react-icons/fa";

interface Props {
  titleTest?: string;
  projectId?: string;
  linked?: boolean;
}

const BreadCrumbComponent: FC<Props> = ({ titleTest, projectId, linked }) => {
  const project = useProject(projectId!);

  console.log(projectId);

  return (
    <div className="d-flex justify-content-between">
      <div>
        <a href="/home">
          <FaHome style={{ marginBottom: "5px", marginRight: "8px" }} /> Home{" "}
        </a>{" "}
        /
        <a href="/projects" className="ms-1 me-1">
          {projectId ? project?.projectName : null}{" "}
        </a>
        {titleTest ? <>/ {titleTest}</> : null}
      </div>
    </div>
  );
};

export default BreadCrumbComponent;
