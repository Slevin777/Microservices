import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import TextInput from '../../../UI/TextInput';
import TextArea from '../../../UI/TextArea';
import { useMutation } from '@apollo/client';
import { ADD_LISTING } from '../../../../gql/mutations';
import { useState } from 'react';
import SessionStore from '../../../../store/sessionStore';
import { observer } from 'mobx-react-lite';

const Form = styled.form`
  background-color: ${(props) => props.theme.whiteSmoke};
  margin-top: 1rem;
  padding: 1rem;
  max-width: 500px;
`;

const Label = styled.label`
  display: block;

  :not(:first-child) {
    margin-top: 0.5rem;
  }
`;

const LabelText = styled.strong`
  display: block;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const Button = styled.button`
  display: inline-block;
  margin-top: 0.5rem;
`;

const AddListing = observer(({ onAddListing }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  const [session] = useState(SessionStore);

  const [createListing] = useMutation(ADD_LISTING);

  const onSubmit = async ({ title, description }) => {
    await createListing({ variables: { title, description } });

    onAddListing();
    reset();
  };

  if (!session?.currentSession?.user)
    return 'Please log in to add new listings';

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h2>Add Listing</h2>
      <Label>
        <LabelText>Title</LabelText>
        <TextInput
          {...register('title', { required: true })}
          type='text'
          disabled={isSubmitting}
        />
      </Label>
      <Label>
        <LabelText>Description</LabelText>
        <TextArea
          {...register('description', { required: true })}
          type='text'
          disabled={isSubmitting}
        />
      </Label>

      <Button disabled={isSubmitting} type='submit'>
        Add Listing
      </Button>
    </Form>
  );
});

export default AddListing;
