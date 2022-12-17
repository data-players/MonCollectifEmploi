import React from 'react';
import List from "../../layout/list/List";
import SimpleList from "../../commons/list/SimpleList";
import TrainingSiteIcon from '@material-ui/icons/LocationOn';
import { Avatar } from "@material-ui/core";
import TrainingSiteFilterSidebar from './TrainingSiteFilterSidebar';

const TrainingSiteList = props => (
  <List {...props}>
      <SimpleList
        primaryText={record => record['pair:label']}
        leftAvatar={() => <Avatar width="100%"><TrainingSiteIcon /></Avatar>}
        linkType="edit"
      />
  </List>
)

export default TrainingSiteList;
