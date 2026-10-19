import { LazyLoader } from "@/src/Components/LazyLoding";
const TaskPage = LazyLoader(() => import("@/src/Components/Tasks/TaskPage"));
const TasksPage = () => {
  return (
    <>
      <TaskPage />
    </>
  );
};

export default TasksPage;
