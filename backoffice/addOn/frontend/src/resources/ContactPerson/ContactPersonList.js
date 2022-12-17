import React from 'react';
import List from "../../layout/list/List";
import SimpleList from "../../commons/list/SimpleList";
import ContactPersonIcon from '@material-ui/icons/ContactMail';
import { Avatar } from "@material-ui/core";
import ContactPersonFilterSidebar from './ContactPersonFilterSidebar';

const ContactPersonList = props => (
  <List {...props}>
    <SimpleList
      primaryText={record => record['pair:firstName'] + ' ' + record['pair:lastName']}
      secondaryText={record => record['pair:description']}
      leftAvatar={() => <Avatar width="100%"><ContactPersonIcon /></Avatar>}
      linkType="edit"
    />
  </List>
)

export default ContactPersonList;
