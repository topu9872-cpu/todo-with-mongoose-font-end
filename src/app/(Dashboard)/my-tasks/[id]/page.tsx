import { getTaskDetails } from "@/src/app/api/ServerAction";
import TaskDetails from "@/src/Components/Tasks/TaskDetailsPage";
export const instant = false;

const MyTasksDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const response = await getTaskDetails(id);
  
  const task = response?.task;

  return (
    <div>
      <TaskDetails myTaskDetails={task} />
    </div>
  );
};

export default MyTasksDetailsPage;