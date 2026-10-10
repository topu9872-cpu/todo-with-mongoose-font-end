"use client";

import { authClient } from "@/src/app/lib/auth-client";
import type { User } from "@/src/types/User";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const handleRegister = async (
  e: React.FormEvent<HTMLFormElement>,
  router: ReturnType<typeof useRouter>,
) => {
  e.preventDefault();

  const formData = Object.fromEntries(new FormData(e.currentTarget));

  if (formData.password !== formData.confirmPassword) {
    toast.error("Confirm password does not match");
    return;
  }

  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%]).{8,}$/;

  if (
    typeof formData.password !== "string" ||
    !passwordRegex.test(formData.password)
  ) {
    toast.error(
      "Password must contain uppercase, lowercase, a special character, and at least 8 characters.",
    );
    return;
  }

  const { data, error } = await authClient.signUp.email({
    name: formData.name,
    email: formData.email,
    password: formData.password,
  } as User);

  if (error) {
    toast.error(error.message);
    return;
  }

  if (data) {
    router.push("/");
  }
};

export const handleLogin = async (
  e: React.FormEvent<HTMLFormElement>,
  router: ReturnType<typeof useRouter>,
) => {
  e.preventDefault();

  const formData = Object.fromEntries(new FormData(e.currentTarget));

  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%]).{8,}$/;

  if (
    typeof formData.password !== "string" ||
    !passwordRegex.test(formData.password)
  ) {
    toast.error(
      "Password must contain uppercase, lowercase, a special character, and at least 8 characters.",
    );
    return;
  }
  const { data, error } = await authClient.signIn.email({
    email: formData.email,
    password: formData.password,
  } as User);

  if (error) {
    toast.error(error.message);
    return;
  }

  if (data) {
    router.push("/");
  }
};

export const handleSocialLogin = async (provider: string) => {
  if (provider === "Google") {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  }
  if (provider === "GitHub") {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/",
    });
  }
  if (provider === "Facebook") {
    await authClient.signIn.social({
    provider: "facebook",
    callbackURL: "/",
    errorCallbackURL: "/login",
  });
  }
};

export const Logout = async (router: ReturnType<typeof useRouter>) => {
  await authClient.signOut({
    fetchOptions: {
      onSuccess: () => {
        router.push("/login");
      },
    },
  });
};
