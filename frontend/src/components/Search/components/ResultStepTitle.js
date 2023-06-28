import React from 'react';
import { Typography } from '@material-ui/core';

const EndResultSubtitle = ({ subTitleClassName,subTitleText }) => (
  <>
    <br/>
    <span className={subTitleClassName}>pour vous aider : <strong>{subTitleText}</strong></span>
  </>
)

const ResultStepTitle = ({ length, titleClassName, subTitleText, subTitleClassName }) => (
  <>
    <Typography component="h2" variant="h2" className={titleClassName}>
      { length === 1 &&
        <>
          Voici la structure <EndResultSubtitle subTitleClassName={subTitleClassName} subTitleText={subTitleText}/>
        </>
      }
      { length > 1 &&
        <>
          Voici les {length} structures <EndResultSubtitle subTitleClassName={subTitleClassName} subTitleText={subTitleText}/>
        </>
      }
    </Typography>
    <Typography component="h2" >Seules les informations ayant le logo Collectif Emploi sont complètes et vérifiées à ce jour.</Typography>
   </>

)

export default ResultStepTitle;