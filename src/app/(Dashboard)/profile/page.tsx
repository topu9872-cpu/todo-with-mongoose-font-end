import DashboardProfile from "@/src/DashboardComponents/DashboardProfile";
import { User } from "../../lib/User";

export const instant = false;

const ProfilePage = async() => {
  const user=await User()
  return <DashboardProfile user={user}/>;
};
export default ProfilePage;
