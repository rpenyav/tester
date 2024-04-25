import axios, { AxiosResponse } from "axios";
import { Commentaris, PaginatedData, TestSuite } from "../interfaces/testsuite";
import { useTestUpdate } from "../AppContext";
import { Project } from "../interfaces/projects";

const baseURL = "http://localhost:3002";

const apiService = {
  fetchTestSuites: async (
    page: number,
    limit: number,
    orderBy: string,
    orderDirection: string
  ): Promise<PaginatedData<TestSuite>> => {
    try {
      const response: AxiosResponse<PaginatedData<TestSuite>> = await axios.get(
        `${baseURL}/testsuite/get?page=${page}&limit=${limit}&orderBy=${orderBy}&orderDirection=${orderDirection}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching test suites", error);
      throw error;
    }
  },

  addTest: async (test: any): Promise<void> => {
    try {
      // Verificar si test.projectId existe y es una cadena
      if (typeof test.projectId === "string") {
        // Intentar convertir test.projectId a un número
        const projectId = parseInt(test.projectId, 10);

        // Verificar si la conversión fue exitosa y el resultado no es NaN
        if (!isNaN(projectId)) {
          // Asignar el projectId convertido al objeto test
          test.projectId = projectId;

          // Enviar la solicitud POST con el objeto test
          await axios.post<any>(`${baseURL}/testsuite/add`, test);
        } else {
          // Si la conversión falla, lanzar un error o manejarlo según sea necesario
          throw new Error("El projectId no es un número válido.");
        }
      } else {
        // Si test.projectId no es una cadena, lanzar un error o manejarlo según sea necesario
        throw new Error("El projectId no es una cadena.");
      }
    } catch (error) {
      // Capturar cualquier error y lanzarlo nuevamente para que se maneje fuera de esta función
      throw error;
    }
  },

  getUserByUsername: async (username: string): Promise<any> => {
    try {
      const response = await axios.get(
        `${baseURL}/testsuite/users/${username}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching user by username", error);
      throw error;
    }
  },

  addProject: async (project: Project): Promise<any> => {
    try {
      const response = await axios.post(`${baseURL}/projects/add`, project);
      return response.data; // Retorna los datos de la respuesta
    } catch (error) {
      console.error("Error adding project", error);
      throw error;
    }
  },

  getAllProjects: async (page = 1, limit = 10) => {
    try {
      const response = await axios.get<PaginatedData<Project>>(
        `${baseURL}/projects/get?page=${page}&limit=${limit}`
      );
      return response.data; // Asumimos que el endpoint retorna un objeto paginado
    } catch (error) {
      console.error("Error fetching projects", error);
      throw error;
    }
  },

  getTestSuitesByProjectId: async (
    projectId: number,
    page: number,
    limit: number,
    orderBy: string,
    orderDirection: string
  ): Promise<PaginatedData<TestSuite>> => {
    try {
      const response = await axios.get(
        `${baseURL}/testsuite/getbyproject?projectId=${projectId}&page=${page}&limit=${limit}&orderBy=${orderBy}&orderDirection=${orderDirection}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching test suites by project id:", error);
      throw error;
    }
  },

  searchTestSuites: async (params = {}, page = 1, limit = 100) => {
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...params,
      }).toString();

      const response = await axios.get(
        `${baseURL}/testsuite/search?${queryParams}`
      );
      return response.data;
    } catch (error) {
      console.error("Error searching test suites:", error);
      throw error;
    }
  },

  getTestSuiteById: async (id: any) => {
    try {
      const response = await axios.get(`${baseURL}/testsuite/${id}`);
      return response.data; // Retorna los datos del TestSuite específico
    } catch (error) {
      console.error("Error fetching test suite by ID:", error);
      throw error;
    }
  },

  createComment: async (commentData: Commentaris) => {
    const currentDateTime = new Date().toISOString(); // Generar fecha y hora actual en formato ISO
    const commentPayload = {
      ...commentData,
      commentCreatedAt: currentDateTime, // Añadir la fecha formateada al payload
    };

    try {
      const response = await axios.post(`${baseURL}/comments`, commentPayload);
      return response.data; // Devuelve los datos de la respuesta del servidor
    } catch (error) {
      console.error("Error creating comment:", error);
      throw error;
    }
  },

  getProjectById: async (projectId: string): Promise<Project | null> => {
    try {
      // Convertir el projectId a number
      const id = parseInt(projectId);

      // Verificar si el id es un número válido
      if (isNaN(id)) {
        console.error("Invalid project ID:", projectId);
        return null;
      }

      // Realizar la solicitud para obtener el proyecto por ID
      const response: AxiosResponse<Project> = await axios.get<Project>(
        `${baseURL}/projects/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching project by ID:", error);
      throw error;
    }
  },

  updateTestSuite: async (id: number, data: Partial<any>) => {
    // Convertir projectId a un número si existe en los datos
    if (data.projectId !== undefined) {
      data.projectId = parseInt(data.projectId, 10);
    }

    console.log(id, data);
    try {
      const response = await axios.put(
        `http://localhost:3002/testsuite/edit/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      console.error("Error updating test suite:", error);
      throw error;
    }
  },
};

export default apiService;
