"use client";

import { useForm } from "@mantine/form";

import Form from "@/components/forms/Form";
import Input from "@/components/forms/Input";
import Button from "@/components/interaction/Button";
import { useAuthenticationStore } from "@/stores/authentication";
import { useSnackbarStore } from "@/stores/snackbar";

import styles from "./RegisterForm.module.css";

export interface IRegisterFormValues {
  email: string;
  password: string;
}

export interface IRegisterFormProps {}

export function RegisterForm(props: IRegisterFormProps) {
  const signIn = useAuthenticationStore((state) => state.signIn);
  const reset = useAuthenticationStore((state) => state.reset);
  const showSnackbar = useSnackbarStore((state) => state.show);

  const onSubmit = (values: IRegisterFormValues) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };

    let accessToken: string | null = null;

    fetch("http://localhost:3000/auth", requestOptions)
      .then((response) => {
        accessToken = response.headers.get("access-token");
        return response.json();
      })
      .then((data) => {
        if (data?.errors) {
          reset();
          showSnackbar({
            message: data?.errors?.full_messages?.join(" "),
            type: "error",
          });
        } else {
          signIn({
            accessToken,
            ...data.data,
          });
        }
      });
  };

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      // email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  return (
    <Form onSubmit={form.onSubmit((values) => onSubmit(values))}>
      <Input
        label="Email address"
        {...form.getInputProps("email")}
        placeholder="Email"
      />
      <Input
        label="Password"
        placeholder="Password"
        type="password"
        {...form.getInputProps("password")}
      />
      <div className={styles.submit}>
        <Button variant="subtle" nextLink="/">
          Sign in
        </Button>
        <Button type="submit">Register</Button>
      </div>
    </Form>
  );
}
