import React from 'react';
import { SimpleForm, TextInput } from 'react-admin';
import Edit from "../../layout/edit/Edit";
import { MarkdownInput } from '@semapps/markdown-components'
import Title from "../commons/Title";

export const FAQEdit = props => (
  <Edit title={<Title />} {...props}>
    <SimpleForm>
      <TextInput source="pair:label" fullWidth />
      <MarkdownInput multiline source="pair:description" fullWidth />
    </SimpleForm>
  </Edit>
);

export default FAQEdit;
