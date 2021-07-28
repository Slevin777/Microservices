import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';

import TextInput from '../../UI/TextInput';
import * as mutations from '../../../gql/mutations';
import SessionStore from '../../../store/sessionStore';

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

const OrSignUp = styled.span`
  font-size: 0.9rem;
`;

const Login = ({ onSignUp }) => {
  const [createUserSession] = useMutation(mutations.LOGIN);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async ({ email, password }) => {
    try {
      const {
        data: { createUserSession: createdUserSession },
      } = await createUserSession({
        variables: {
          email,
          password,
        },
      });

      SessionStore.setSession(createdUserSession);
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Label>
        <LabelText>Email:</LabelText>
        <TextInput
          {...register('email', { required: true })}
          type='email'
          disabled={isSubmitting}
        />
      </Label>
      <Label>
        <LabelText>Password:</LabelText>
        <TextInput
          {...register('password', { required: true })}
          type='password'
          disabled={isSubmitting}
        />
      </Label>
      <LoginButton type='submit'>Login</LoginButton>{' '}
      <OrSignUp>
        or{' '}
        <a
          href='#'
          onClick={(e) => {
            e.preventDefault();
            onSignUp();
          }}
        >
          Sign up
        </a>
      </OrSignUp>
    </form>
  );
};

export default Login;
