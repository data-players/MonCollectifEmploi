import React from 'react';
import List from "../../layout/list/List";
import SimpleList from "../../commons/list/SimpleList";
import ProgramIcon from '@material-ui/icons/AccountTree';
import { Avatar } from "@material-ui/core";
import ProgramFilterSidebar from './ProgramFilterSidebar';
import {ReferenceField} from '@semapps/field-components';
import { MultiViewsList } from '@semapps/list-components';
import { Datagrid,
  TextField,
  ShowButton,
  EditButton } from 'react-admin';
import { MapList } from '@semapps/geo-components';
import ListIcon from '@material-ui/icons/List';
import MapIcon from '@material-ui/icons/Map';

const ProgramList = props => (
  <MultiViewsList
    ListComponent={List}
    aside={<ProgramFilterSidebar />}
    views={{
      list: {
        label: 'Liste',
        icon: ListIcon,
        sort: { field: 'pair:label', order: 'DESC' },
        perPage: 25,
        list: (

          <Datagrid rowClick="show">
            <TextField source="pair:label" />
            <TextField source="pair:description" />
            <ReferenceField reference="DataSource" source="aurba:hasDataSource">
              <TextField source="pair:label" />
            </ReferenceField>
          </Datagrid>
        )
      },
      map: {
        label: 'Carte',
        icon: MapIcon,
        perPage: 500,
        pagination: false,
        list: (
          <MapList
            latitude={record => record['pair:hasLocation'] && record['pair:hasLocation']['pair:latitude']}
            longitude={record => record['pair:hasLocation'] && record['pair:hasLocation']['pair:longitude']}
            label={record => record['pair:label']}
            /*description={record => record['pair:comment']}*/
            scrollWheelZoom
          />
        )
      }
    }}
    {...props}
  />

)

export default ProgramList;



