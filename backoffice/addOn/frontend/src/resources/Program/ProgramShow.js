import React from 'react';
import { TextField, SimpleList, ArrayField, EmailField } from 'react-admin';
import { Box, Grid, Avatar } from '@material-ui/core';
import { MapField } from '@semapps/geo-components';
import { GroupedReferenceHandler } from '@semapps/semantic-data-provider';
import { ReferenceArrayField, ReferenceField, QuickAppendReferenceArrayField, MultiUrlField, AvatarWithLabelField, SeparatedListField } from '@semapps/field-components';
import { ChipList, GridList } from '@semapps/list-components';
import DescriptionIcon from '@material-ui/icons/Description';
import HomeIcon from '@material-ui/icons/Home';
import ForumIcon from '@material-ui/icons/Forum';
import VideocamOutlinedIcon from '@material-ui/icons/VideocamOutlined';
import Title from '../commons/Title';
import { MarkdownField } from '../../common/field';
import { Hero, MainList, SideList } from '../../common/list';
import RightLabel from "../../common/list/SideList/RightLabel";
import Show from "../../layout/show/Show";


const OrganizationShow = props => (
  <Show title={<Title />} {...props}>
    <Grid container spacing={5}>
      <Grid item xs={12} sm={9}>
        <MainList>
          <MarkdownField source="pair:description" />
          <ReferenceArrayField reference="Organization" source="pair:offeredBy">
            <SimpleList
              primaryText={record => record && record['pair:label']}
              leftIcon={() => <DescriptionIcon />}
              linkType="show"
            />
          </ReferenceArrayField>
        </MainList>
      </Grid>
    </Grid>
  </Show>
);

export default OrganizationShow;
