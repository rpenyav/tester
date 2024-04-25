export interface PaginatedData<T> {
  list: T[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  isLast: boolean;
}

export interface TestSuite {
  id?: number;
  sectionTest: string;
  linkTest: string;
  screenshotTest: string;
  numberTest: string;
  titleTest: string;
  descriptionTest: string;
  dateTest: string;
  testCreator: string;
  projectId: string;
  testConditions: string;
  testResult: string;
  testPriority: string;
  testStatus: string;
  comments?: Commentaris[];
}

export interface Commentaris {
  id?: number;
  commentText: string;
  commenterName: string;
  testSuiteId: number; // Opcional si deseas rastrear a qué TestSuite pertenece
  commentCreatedAt?: string; // Opcional para rastrear cuándo se creó el comentario
}

export interface TestSuiteErrors
  extends Partial<Record<keyof TestSuite, string>> {}
