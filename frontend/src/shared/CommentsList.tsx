import React, { FC, useRef, useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import apiService from "../services/apiService";
import { Commentaris } from "../interfaces/testsuite";
import { useUser } from "../UserContext";

interface PropsComments {
  id: string | undefined;
  testSuite: any;
  setTestSuite: any;
}

const CommentsList: FC<PropsComments> = ({ id, testSuite, setTestSuite }) => {
  const formRef = useRef<HTMLDivElement>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [commenterName, setCommenterName] = useState<string>("");
  const [commentText, setCommentText] = useState<string>("");
  const userData = useUser();

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  useEffect(() => {
    if (showForm && formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [showForm]);

  const cancelForm = () => {
    setShowForm(false);
    setCommenterName("");
    setCommentText("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const commentData = {
      commenterName,
      commenterEmail: userData.email, // Assuming this should be the user's email
      commentText,
      testSuiteId: parseInt(id!),
      commentCreatedAt: new Date().toISOString(),
    };

    try {
      const newComment = await apiService.createComment(commentData);
      alert("Comentario creado exitosamente");
      // Insertar el nuevo comentario al inicio de la lista de comentarios
      if (testSuite) {
        setTestSuite({
          ...testSuite,
          comments: [newComment, ...testSuite.comments],
        });
      }
      // Resetear el formulario
      cancelForm();
    } catch (error) {
      console.error("Error al crear el comentario:", error);
      alert("Error al crear el comentario");
    }
  };

  return (
    <Card className="mb-3 p-3 controlled-shadow">
      <div className="d-flex justify-content-end" style={{ height: "50px" }}>
        <button className="floating-button" onClick={toggleForm}>
          {showForm ? "Hide Form" : "Add Comment"}
        </button>
      </div>

      {showForm && (
        <div
          ref={formRef}
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: "50vh" }}
        >
          <div className="row">
            <div className="col-12">
              <div className="d-flex justify-content-center">
                <Card
                  className="mb-3 p-3 controlled-shadow"
                  style={{ width: "420px" }}
                >
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-12 pt-3">
                        <div className="form-group">
                          <label>Nombre:</label>
                          <input
                            className="form-control mt-2"
                            type="text"
                            placeholder="Tu nombre"
                            value={commenterName}
                            onChange={(e) => setCommenterName(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-12 pt-3">
                        <div className="form-group">
                          <label htmlFor="commentTextarea">Comentario:</label>
                          <textarea
                            id="commentTextarea"
                            rows={5}
                            className="form-control mt-2"
                            placeholder="Escribe tu comentario"
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between mt-4">
                      <button
                        className="floating-button color-diff-2"
                        type="button"
                        onClick={cancelForm}
                      >
                        Cancel
                      </button>
                      <button className="floating-button" type="submit">
                        Submit
                      </button>
                    </div>
                  </form>
                </Card>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="row">
        <div className="col-12">
          {testSuite.comments && testSuite.comments.length > 0 && (
            <>
              <h5>Comentarios:</h5>
              <ul>
                {testSuite.comments.map((comment: Commentaris) => (
                  <li key={comment.id}>
                    {comment.commenterName}: {comment.commentText} -{" "}
                    {comment.commentCreatedAt}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </Card>
  );
};

export default CommentsList;
