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
}
