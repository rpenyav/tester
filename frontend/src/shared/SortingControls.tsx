import React from "react";

interface SortingProps {
  orderBy: string;
  orderDirection: string;
  onOrderByChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onOrderDirectionChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SortingControls: React.FC<SortingProps> = ({
  orderBy,
  orderDirection,
  onOrderByChange,
  onOrderDirectionChange,
}) => {
  return (
    <div
      className="d-flex justify-content-between mb-3"
      style={{ maxWidth: "100%" }}
    >
      <div
        className="d-flex align-items-center"
        style={{ flex: "1 0 auto", marginRight: "20px" }}
      >
        <label
          className="form-label me-2"
          htmlFor="orderBy"
          style={{ whiteSpace: "nowrap" }}
        >
          Order By:
        </label>
        <select
          className="form-select"
          id="orderBy"
          value={orderBy}
          onChange={onOrderByChange}
          style={{ width: "auto", flexGrow: 1 }}
        >
          <option value="sectionTest">Sección</option>
          <option value="dateTest">Fecha</option>
          <option value="testCreator">Creador</option>
          <option value="projectId">Proyecto</option>
        </select>
      </div>
      <div className="d-flex align-items-center" style={{ flex: "1 0 auto" }}>
        <label
          className="form-label me-2"
          htmlFor="orderDirection"
          style={{ whiteSpace: "nowrap" }}
        >
          Order Direction:
        </label>
        <select
          className="form-select"
          id="orderDirection"
          value={orderDirection}
          onChange={onOrderDirectionChange}
          style={{ width: "auto", flexGrow: 1 }}
        >
          <option value="ASC">ASC</option>
          <option value="DESC">DESC</option>
        </select>
      </div>
    </div>
  );
};

export default SortingControls;
