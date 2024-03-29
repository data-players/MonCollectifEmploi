import { default as React } from 'react';

import { TextInput } from "ra-ui-materialui";
import {
  ArrayInput,
  ImageInput,
  SimpleForm,
  SimpleFormIterator,
  required,
  SelectInput,
  useEditController,
  BooleanInput
} from 'react-admin';
import { Typography , Box} from '@material-ui/core';

import { MarkdownInput } from '@semapps/markdown-components'
import { ReferenceInput, ReferenceArrayInput, MultiServerAutocompleteArrayInput} from '@semapps/input-components';
import { ImageField } from '@semapps/field-components';

import PairLocationInput from '../../pair/PairLocationInput';
import Title from '../commons/Title';
import Edit from "../../layout/edit/Edit";
import ToolBarCustom from '../commons/ToolBarCustom';
// import { ChipList } from '@semapps/list-components';
// import { QuickAppendReferenceArrayField } from '@semapps/field-components';

const validateForm = (values) => {
  const errors = {};
  const emailFilled = values['pair:e-mail']?.length > 0;
  const phoneFilled = values['pair:phone']?.length > 0;
  if (! emailFilled && ! phoneFilled) {
    const message = 'Veuillez saisir au moins un e-mail ou un téléphone';
    errors['pair:e-mail'] = message;
    errors['pair:phone'] = message;
  }
  return errors
};

export const OrganizationEdit = props => {
  const {
      record, // record fetched via dataProvider.getOne() based on the id from the location
  } = useEditController(props);
  // console.log('record',record);
  const lock = record?.['aurba:externalSource']!=undefined;
  const deleteable = !lock || record?.['aurba:externalDeleted']!=undefined;
  return (
    <Edit title={<Title />} {...props} >
      <SimpleForm toolbar={<ToolBarCustom deleteable={deleteable}/>}>
        <TextInput source="pair:label" fullWidth validate={[required()]} disabled={lock}/>
        {/* <PairLocationInput source="pair:hasLocation" fullWidth validate={[required()]} disabled={lock}/>
        {record&&record['pair:hasLocation']&&
            <TextInput source="pair:hasLocation.pair:hasPostalAddress.pair:addressZipCode" fullWidth disabled={true} />
        } */}
        <MarkdownInput source="pair:description" multiline fullWidth validate={[required()]} readOnly={lock}/>

          <ImageInput source="pair:depictedBy" accept="image/*">
            <ImageField source="src"/>
          </ImageInput>

        <ArrayInput source="opal:socialNetworks">
          <SimpleFormIterator>
            <TextInput type="url" label="url"/>
          </SimpleFormIterator>
        </ArrayInput>
        <TextInput source="pair:webPage" fullWidth disabled={lock}/>
        <TextInput source="aurba:siret" fullWidth disabled={lock}/>

        <Box sx={{ p: 2, mb:2, borderStyle:"solid", borderWidth:"1px"}} fullWidth>
         <Typography variant="h6">Contact habituel pour les formations</Typography>
         <TextInput source="pair:phone" fullWidth disabled={lock} label="telephone"/>
         <TextInput source="pair:e-mail" fullWidth disabled={lock} label="email"/>
        </Box>
        <Box sx={{ p: 2, mb:2, borderStyle:"solid", borderWidth:"1px"}} fullWidth>
          <Typography variant="h6">Lieux habituel de formation ou accueil</Typography>
          <PairLocationInput source="pair:hasLocation" fullWidth validate={[required()]} label="adresse"/>
          {record&&record['pair:hasLocation']&&
              <TextInput source="pair:hasLocation.pair:hasPostalAddress.pair:addressZipCode" fullWidth disabled={true} label="code postal"/>
          }
        </Box>
        {/* <ReferenceArrayInput label="lieux de fomation" reference="TrainingSite" source="pair:offers" filter={{"type":"opal:TrainingSite"}}>
          <MultiServerAutocompleteArrayInput optionText="pair:label" shouldRenderSuggestions={value => value.length > 1} fullWidth />
        </ReferenceArrayInput> */}
        {/* <ReferenceArrayInput label="personnes de contact" reference="ContactPerson" source="pair:affiliatesBy">
          <MultiServerAutocompleteArrayInput optionText="pair:lastName" shouldRenderSuggestions={value => value.length > 1} fullWidth />
        </ReferenceArrayInput> */}
        <ReferenceArrayInput label="programmes" reference="Program" source="pair:offers" filter={{"type":"opal:Program"}}>
          <MultiServerAutocompleteArrayInput optionText="pair:label" shouldRenderSuggestions={value => value.length > 1} fullWidth />
        </ReferenceArrayInput>
        <ReferenceInput reference="DataSource" fullWidth source="aurba:hasDataSource" allowEmpty disabled={lock}>
          <SelectInput optionText="pair:label" disabled={lock}/>
        </ReferenceInput>
        {lock &&
          <BooleanInput source="aurba:externalDeleted" disabled={true} />
        }
      </SimpleForm>
    </Edit>
  );
}

export default OrganizationEdit;
