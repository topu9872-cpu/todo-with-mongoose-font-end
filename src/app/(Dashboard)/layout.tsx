import { redirect } from "next/navigation";

export const instant = false;

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const user = "user";

  if (user !== "user") {
    redirect("/");
  }

  return <div>{children}</div>;
}
