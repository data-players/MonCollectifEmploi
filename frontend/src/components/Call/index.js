import React, { useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  makeStyles
} from '@material-ui/core';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ReactMarkdown from 'react-markdown';
import AppBar from '../../containers/AppBar';
import Loading from '../Loading';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import PhoneDialog from '../PhoneDialog';


const useStyles = makeStyles(theme => ({
  mainContainer: {
    marginTop: theme.margin.header,
    paddingTop: 24
  },
  title: {
    fontSize: 24,
    fontWeight: 600
  },
  round: {
    height: "100px",
    width: "100px",
    backgroundColor: "#EB5B5D",
    borderRadius: "50%"
  }

}))


const Call = ({ }) => {
  const classes = useStyles();

  const [phoneDialogOpen, setPhoneDialogOpen] = React.useState(false);
  const handlePhoneClick = () => {
    setPhoneDialogOpen(true);
  };
  const handlePhoneDialogClose = (value) => {
    setPhoneDialogOpen(false);
  };

  return (
    <>
      <AppBar />
      <Container className={classes.mainContainer} maxWidth="sm">
        <Typography className={classes.title}>Contacter une personne</Typography>
        <Typography variant="h6">
           Vous n’êtes pas seuls, nous sommes là pour vous aider.
        </Typography>
        <Typography variant="h6">
           Composez le numéro ci-dessous pour joindre nos équipes.
        </Typography>
        <Box display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          onClick={handlePhoneClick}>
          <Box display="flex"
            justifyContent="center"
            alignItems="center" className={classes.round}><PhoneEnabledIcon fontSize="large" sx={{ color: "white" }} />
          </Box>
        
          <Typography variant="h1">0801 900 100</Typography>
        </Box>

          <PhoneDialog
            phone="0801900100"
            open={phoneDialogOpen}
            handleClose={handlePhoneDialogClose}
          />
        
      </Container>
    </>
  );
}

export default Call;
