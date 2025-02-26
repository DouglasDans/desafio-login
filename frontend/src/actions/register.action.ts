"use server";

import axios from "axios";
import { redirect } from "next/navigation";

type FormData = {
  name: string;
  email: string;
  password: string;
};

export async function registerUser({ name, email, password }: FormData) {
  "use server";

  const res = await axios
    .post(`${process.env.BACKEND_URL}/api/register/`, {
      name,
      email,
      password,
    })
    .catch((err) => {
      return err.response;
    });

  if (res.status === 400) {
    return {
      emailError: res.data.email ? true : false,
    };
  }

  if (res.status === 201) {
    redirect("/menu");
  }

  return {
    nameError: false,
    emailError: false,
    passwordError: false,
    passed: false,
  };
}
