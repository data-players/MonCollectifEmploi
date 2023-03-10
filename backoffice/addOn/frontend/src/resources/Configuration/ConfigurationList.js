import React from 'react';
import List from "../../layout/list/List";
import SimpleList from "../../commons/list/SimpleList";
import BuildIcon from '@material-ui/icons/Build';
import { Avatar } from "@material-ui/core";

const ConfigurationList = props => (
  <List {...props} sort={{ field: 'pair:label', order: 'ASC' }}>
    <SimpleList
      primaryText={record => record['pair:label']}
      secondaryText={record => record['pair:description']}
      leftAvatar={() => <Avatar width="100%"><BuildIcon /></Avatar>}
      linkType="edit"
    />
  </List>
)

export default ConfigurationList;
