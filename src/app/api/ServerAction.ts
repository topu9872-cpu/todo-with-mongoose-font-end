import { getData } from "./Server";
import type { Task } from "@/src/types/Tasks";


export const getTasks = (
  search = "",
  page = 1,
  limit = 10,
) => {
  const params = new URLSearchParams({
    search,
    page: String(page),
    limit: String(limit),
  });

  return getData(`/tasks?${params.toString()}`);
};