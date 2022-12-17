import React from 'react';
import List from "../../layout/list/List";
import SimpleList from "../../commons/list/SimpleList";
import ProgramIcon from '@material-ui/icons/AccountTree';
import { Avatar } from "@material-ui/core";
import ProgramFilterSidebar from './ProgramFilterSidebar';

const ProgramList = props => (
  <List {...props}>
      <SimpleList
        primaryText={record => record['pair:label']}
        leftAvatar={() => <Avatar width="100%"><ProgramIcon /></Avatar>}
        linkType="edit"
      />
  </List>
)

export default ProgramList;
