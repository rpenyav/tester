import React, { useEffect } from "react";

interface PaginadorProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginadorComponent: React.FC<PaginadorProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const pageParam = urlParams.get("page");
    if (pageParam) {
      const page = parseInt(pageParam);
      if (!isNaN(page) && page >= 1 && page <= totalPages) {
        onPageChange(page);
      }
    }
  }, [onPageChange, totalPages]);

  const handlePageChange = (page: number) => {
    onPageChange(page);
    window.history.pushState(null, "", `?page=${page}`);
  };

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-end">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
          >
            &laquo;
          </button>
        </li>
        {Array.from({ length: totalPages }, (_, i) => (
          <li
            className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
            key={i}
          >
            <button
              className={`page-link ${
                currentPage === i + 1 ? "active-page" : ""
              }`}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          </li>
        ))}
        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <button
            className="page-link"
            onClick={() =>
              handlePageChange(Math.min(totalPages, currentPage + 1))
            }
          >
            &raquo;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default PaginadorComponent;
