import DashboardPageClient from "../../../DashboardComponents/DashboardPageClient";
import { User } from "../../lib/User";

export const instant = false;

const DashboardPage=async() =>{
  const user=await User()
  return <DashboardPageClient user={user}/>;
}
export default DashboardPage