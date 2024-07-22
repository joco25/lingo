import React from 'react';
import {
  Create,
  NumberInput,
  ReferenceInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
} from 'react-admin';

export const ChallengeCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source='question' validate={required()} label='Question' />
        <SelectInput
          source='type'
          choices={[
            { id: 'SELECT', name: 'SELECT' },
            { id: 'ASSIST', name: 'ASSIST' },
          ]}
          label='Type'
          validate={required()}
        />
        <ReferenceInput
          source='lessonId'
          reference='lessons'
          label='lessonId'
        />
        <NumberInput source='order' validate={required()} label='Order' />
      </SimpleForm>
    </Create>
  );
};

export default ChallengeCreate;
