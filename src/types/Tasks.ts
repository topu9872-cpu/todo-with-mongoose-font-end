export interface Task {
  _id: string;
  title: string;
  description?: string;
  status: "Pending" | "In Process" | "Completed";
  priority: "Low" | "Medium" | "High";
  dueDate?: string;
  process: number;
  tags: string[];
  createdAt:string
}