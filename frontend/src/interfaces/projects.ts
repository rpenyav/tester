export interface Project {
  id?: number;
  projectName: string;
  projectPrefix: string;
  projectDescription: string;
  projectPriority: string;
  projectActive: boolean;
  projectIsCompleted: boolean;
  projectCreatedAt: string;
  projectCreator: string;
}
