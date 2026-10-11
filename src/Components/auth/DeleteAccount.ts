"user client";

import { authClient } from "@/src/app/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const handeleteAccount = async () => {
 
  toast.loading("Deleting account...", {
    closeButton: false,
    duration: Infinity,
  });
  const { error } = await authClient.deleteUser();
  if (error) {
    toast.error(error.message);
  }
  toast.success("Account deleted successfully.");
  window.location.href="/register";
};
