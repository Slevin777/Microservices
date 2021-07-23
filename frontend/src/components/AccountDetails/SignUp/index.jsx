import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import * as yup from "yup";

import TextInput from "../../UI/TextInput";
import * as mutations from "../../../gql/mutations";

const Label = styled.label`
  display: block;

  :not(:first-child) {
    margin-top: 0.75rem;
  }
`;

const LabelText = styled.strong`
  display: block;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
`;

const LoginButton = styled.button`
  display: inline-block;
  margin-top: 0.5rem;
`;

const OrLogIn = styled.span`
  font-size: 0.9rem;
`;

const validationSchema = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const SignUp = ({ onLogin }) => {
  const [createUser] = useMutation(mutations.SIGN_UP);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValid },
    reset,
  } = useForm({ mode: "onChange", validationSchema });

  const onSubmit = async ({ email, password }) => {
    await createUser({
      variables: {
        email,
        password,
      },
    });

    reset();
    onLogin();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Label>
        <LabelText>Email:</LabelText>
        <TextInput
          {...register("email", { required: true })}
          type='email'
          disabled={isSubmitting}
        />
      </Label>
      <Label>
        <LabelText>Password:</LabelText>
        <TextInput
          {...register("password", { required: true })}
          type='password'
          disabled={isSubmitting}
        />
      </Label>
      <Label>
        <LabelText>Confirm Password:</LabelText>
        <TextInput
          {...register("confirmPassword", { required: true })}
          type='password'
          disabled={isSubmitting}
        />
      </Label>
      <LoginButton type='submit' disabled={isSubmitting || !isValid}>
        Sign Up
      </LoginButton>{" "}
      <OrLogIn>
        or{" "}
        <a
          href='#'
          onClick={(e) => {
            e.preventDefault();
            onLogin();
          }}
        >
          Log in
        </a>
      </OrLogIn>
    </form>
  );
};

export default SignUp;
