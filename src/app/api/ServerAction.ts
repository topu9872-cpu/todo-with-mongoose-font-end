import { getData, postData } from "./Server";
import type { Task } from "@/src/types/Tasks";

export const getTasks = (search = "", page = 1, limit = 12) => {
  const params = new URLSearchParams({
    search,
    page: String(page),
    limit: String(limit),
  });

  return getData(`/tasks?${params.toString()}`);
};
export const getMyTasks = (
  search = "",
  page = 1,
  limit = 12,
  userId: string,
) => {
  const params = new URLSearchParams({
    search,
    page: String(page),
    limit: String(limit),
    userId: userId,
  });

  return getData(`/tasks?${params.toString()}`);
};

export const getTaskDetails = async (id: string) => {
  return getData(`/tasks/${id}`);
};


export const postTask = async (data: Task) => {
  return postData("/tasks", data);
};
