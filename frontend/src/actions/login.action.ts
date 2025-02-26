"use server";

import axios from "axios";
import { redirect } from "next/navigation";

type FormData = {
  email: string;
  password: string;
};

export async function authenticateUser({ email, password }: FormData) {
  "use server";

  const res = await axios
    .post(`${process.env.BACKEND_URL}/api/login/`, {
      email,
      password,
    })
    .catch((err) => {
      return err.response;
    });

  if (res.status !== 200) {
    return {
      emailError: res.data.itemError === "email" ? true : false,
      passwordError: res.data.itemError === "password" ? true : false,
      passed: false,
    };
  }

  if (res.status === 200) {
    redirect("/menu");
  }

  return {
    emailError: false,
    passwordError: false,
    passed: false,
  };
}
