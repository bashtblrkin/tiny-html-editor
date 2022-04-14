import React from 'react';
import { styled } from '@mui/material/styles';
import MuiLinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import MuiCircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';

import  './variables.scss';

export const MyLinearProgressComponent = styled((props: LinearProgressProps) => (
    <MuiLinearProgress {...props}/>
))`
        background-color: #EDF5E1;
        & .MuiLinearProgress-bar {
          background-color: #5CDB95
        }
`;

export const MyMuiCircularProgress = styled((props: CircularProgressProps) => (
    <MuiCircularProgress {...props} />
))`
  color:  #5CDB95;
`