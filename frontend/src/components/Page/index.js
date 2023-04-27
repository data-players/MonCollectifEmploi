import React, { useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  makeStyles } from '@material-ui/core';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ReactMarkdown from 'react-markdown';
import AppBar from '../../containers/AppBar';
import Loading from '../Loading';

const useStyles = makeStyles(theme => ({
  mainContainer: {
    marginTop: theme.margin.header,
    paddingTop: 24
  },
  title: {
    fontSize: 24,
    fontWeight: 600
  }

}))

const Page = ( { page, loading, loadData } ) => {
  const classes = useStyles();

  useEffect( () => {
    loadData('pages')
  }, [])

  return (
    <>
      { loading &&
        <Loading message={"Chargement..."} />
      }
      { ! loading && page  &&
        <>
          <AppBar/>
          <Container className={classes.mainContainer} maxWidth="sm">
            <Typography variant="h2" className={classes.title}>{page['semapps:title']}</Typography>
            <Typography component="div" className={classes.description}>
              <ReactMarkdown children={page['semapps:content']} />
            </Typography>
          </Container>
        </>
      }
    </>
  );
}

export default Page;
