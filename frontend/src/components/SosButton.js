import React from 'react';
import { Box, Button, makeStyles } from '@material-ui/core';
import image from './../assets/numero-vert-exemple.png'

const useStyles = makeStyles(theme => ({
  sosButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: theme.color.white,
    '@media(min-height:600px)': {
      paddingTop: 8,
      paddingBottom: 8,
    }
  },
  sosButton: {
    maxWidth:'100%',
  },
  button: {
    width: '100%',
    maxWidth: 'unset',
    height: 50,
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
    wordBreak: 'break-word',
    lineHeight: '125%'
  }
}));

const SosButton = ({onClick }) => {
  const classes = useStyles();
  return (
    <Box className={classes.sosButtonContainer}>
        <Button className={classes.button} href="Call">
          <span>Contacter une personne</span>
        </Button>
    </Box>

  )
}

export default SosButton;