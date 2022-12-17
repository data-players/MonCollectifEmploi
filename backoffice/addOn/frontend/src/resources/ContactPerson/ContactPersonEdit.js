import React from 'react';
import { SelectInput, SimpleForm, TextInput,AutocompleteInput, required } from 'react-admin';
import Edit from "../../layout/edit/Edit";
import { MarkdownInput } from '@semapps/markdown-components'
import Title from "../commons/Title";
import { ReferenceInput } from '@semapps/input-components';

export const ContactPersonEdit = props => (
  <Edit title={<Title />} {...props}>
    <SimpleForm>
      <ReferenceInput
        source="pair:affiliates"
        reference="Organization"
        validate={[required()]}
        fullWidth
      >
        <AutocompleteInput optionText="pair:label" shouldRenderSuggestions={value => {
          return value && value.length > 1
        }}/>
      </ReferenceInput>
      <TextInput source="pair:firstName" fullWidth validate={[required()]} />
      <TextInput source="pair:lastName" fullWidth validate={[required()]} />
      <MarkdownInput multiline source="pair:description" fullWidth />
      <TextInput source="pair:phone" fullWidth />
      <TextInput source="pair:e-mail" fullWidth />
      <TextInput source="opal:civilityTitle" fullWidth />
    </SimpleForm>
  </Edit>
)

export default ContactPersonEdit;
