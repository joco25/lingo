import React from 'react';
import {
  BooleanInput,
  Edit,
  ReferenceInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
} from 'react-admin';

export const ChallengeOptionEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source='text' validate={required()} label='Text' />
        <BooleanInput source='correct' label='Correct option' />
        <ReferenceInput
          source='challengeId'
          reference='challenges'
          label='challengeId'
        >
          <SelectInput optionText='question' />
        </ReferenceInput>
        <TextInput source='imageSrc' label='Image' />
        <TextInput source='audioSrc' label='Audio' />
      </SimpleForm>
    </Edit>
  );
};

export default ChallengeOptionEdit;
