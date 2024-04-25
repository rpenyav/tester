// InputSearch.tsx

import React, { useState } from "react";
import { Form, Button, Col, Row, Card } from "react-bootstrap";
import apiService from "../services/apiService";
import FilterTests from "./FilterTests";
import { FaSearch } from "react-icons/fa";

interface InputSearchProps {
  procedencia?: string;
  onSearchResults: (results: any) => void;
  onResetResults: () => void; // Modificado para aceptar una función sin parámetros
}

const InputSearch: React.FC<InputSearchProps> = ({
  onSearchResults,
  onResetResults,
  procedencia,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [hover, setHover] = useState(false);
  const handleSearch = async () => {
    try {
      const data = await apiService.searchTestSuites(
        { titleTest: inputValue },
        1,
        10
      );
      onSearchResults(data);
    } catch (error) {
      console.error("Error searching test suites", error);
      onSearchResults({ list: [], totalPages: 0 });
    }
  };

  const handleReset = async () => {
    setInputValue("");
    try {
      const data = await apiService.searchTestSuites({}, 1, 10); // Búsqueda vacía
      onSearchResults(data);
    } catch (error) {
      console.error("Error resetting search", error);
      onSearchResults({ list: [], totalPages: 0 });
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSearch();
  };

  return (
    <div className="mt-4 mb-5">
      <Card className="p-3">
        <Row>
          <Col className="d-flex justify-content-start">
            <h2>Test Suites</h2>
          </Col>
          <Col className="d-flex justify-content-end">
            <div>
              <Form onSubmit={handleSubmit}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Form.Group style={{ marginRight: "10px" }}>
                    <Form.Control
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Search by title..."
                    />
                  </Form.Group>
                  <Button
                    type="submit"
                    className="button-like-link"
                    style={{ marginRight: "5px" }}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                  >
                    <FaSearch size={24} color={hover ? "#000" : "#525252"} />
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleReset}
                    style={{ marginRight: "5px" }}
                  >
                    Reset
                  </Button>
                </div>
              </Form>
            </div>
            {procedencia === "projectslist" ? null : (
              <div>
                <FilterTests />
              </div>
            )}
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default InputSearch;
