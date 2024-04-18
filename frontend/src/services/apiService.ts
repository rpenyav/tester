import axios, { AxiosResponse } from "axios";
import { PaginatedData, TestSuite } from "../interfaces/testsuite";

const baseURL = "http://localhost:3002/testsuite";

const apiService = {
  fetchTestSuites: async (
    page: number,
    limit: number
  ): Promise<PaginatedData<TestSuite>> => {
    try {
      const response: AxiosResponse<PaginatedData<TestSuite>> = await axios.get(
        `${baseURL}/get?page=${page}&limit=${limit}&orderBy=id&orderDirection=DESC`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching test suites", error);
      throw error;
    }
  },

  addTest: async (test: TestSuite): Promise<void> => {
    try {
      await axios.post<TestSuite>(`${baseURL}/add`, test);
    } catch (error) {
      throw error;
    }
  },
};

export default apiService;
