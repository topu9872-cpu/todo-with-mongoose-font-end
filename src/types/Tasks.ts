
export interface Task {
  _id?: string;
  title: string;
  description?: string;
  status: "Pending" | "In Process" | "Completed";
  priority: "Low" | "Medium" | "High";
  dueDate?: string;
  progress: number;
  tags: string[];
  createdAt?:string;
  userId?:string
}

