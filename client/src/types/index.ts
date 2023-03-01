interface IClient {
  id: string;
  name: string;
  email: string;
  phone: string;
}

type PROJECT_STATUS = "Not Started" | "In Progress" | "Completed";
interface IProject {
  id: string;
  name: string;
  description: string;
  status: PROJECT_STATUS;
  client: IClient;
}

export type { IClient, IProject };
