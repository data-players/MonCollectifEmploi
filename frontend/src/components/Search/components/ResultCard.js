import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    width: '100%',
  },
  flexCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageContainer: {
    height: 64,
    width : '100%',
    textAlign: 'center',
    '& img': {
      height: '100%',
      objectFit : 'contain'
    }
  },
  textContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%'
  },
  resultTitle: {
    color: theme.color.primary,
    fontSize: '18px !important',
    fontWeight: '600 !important',
    textAlign: 'center',
  },
  button: {
    maxWidth: 600,
    borderRadius: '20px !important'
  }
}));

export default function ResultCard( {id, label, depictedBy, source}) {
  const classes = useStyles();
  const isMonCollectifEmploiSource = source.includes('mon-collectif-emploi');
  return (
    <Card sx={{ minWidth: 275 }} className={classes.mainContainer}>
      {isMonCollectifEmploiSource&&
        <CardContent>
          <img src={process.env.PUBLIC_URL + "collectif-emploi.png"} height='30' alt="Logo collectif emploi" />
        </CardContent>
      }
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={4} container={true} className={classes.flexCenter}>
            <Box className={classes.imageContainer}>
              { depictedBy &&
                <img src={depictedBy} alt={`logo ${label}`} />
              }
            </Box>
          </Grid>
          <Grid item xs={8}>
            <Box className={classes.textContainer}>
              <Typography component="h3" className={classes.resultTitle}>
                {label}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions className={classes.flexCenter}>
        <Button size="small" variant="contained" color="primary" className={classes.button}>
          En savoir plus
        </Button>
      </CardActions>
    </Card>
  );
}