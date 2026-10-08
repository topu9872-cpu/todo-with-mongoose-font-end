import { redirect } from "next/navigation";

const layout = ({ children }: { children: string }) => {
  const user = "user";

  if (user!=='user') {
    redirect("/");
  }
  return <div>{children}</div>;
};

export default layout;
