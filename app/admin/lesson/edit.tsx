import React from 'react';
import {
  Edit,
  NumberInput,
  ReferenceInput,
  required,
  SimpleForm,
  TextInput,
} from 'react-admin';

export const LessonEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <NumberInput source='id' validate={required()} label='ID' />
        <TextInput source='title' validate={required()} label='Title' />
        <ReferenceInput source='unitId' reference='units' label='UnitId' />
        <NumberInput source='order' validate={required()} label='Order' />
      </SimpleForm>
    </Edit>
  );
};

export default LessonEdit;
