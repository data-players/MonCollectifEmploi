import React from 'react';
import List from "../../layout/list/List";
import SimpleList from "../../commons/list/SimpleList";
import HelpIcon from '@material-ui/icons/Help';
import { Avatar } from "@material-ui/core";

const FAQList = props => (
  <List {...props} sort={{ field: 'pair:label', order: 'ASC' }}>
    <SimpleList
      primaryText={record => record['pair:label']}
      leftAvatar={() => <Avatar width="100%"><HelpIcon /></Avatar>}
      linkType="edit"
    />
  </List>
)

export default FAQList;
