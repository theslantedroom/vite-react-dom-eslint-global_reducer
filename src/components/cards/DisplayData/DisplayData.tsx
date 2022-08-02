import React from 'react';
import { Stack, Box } from '@mui/material';

//style
export const DisplayData = ({ object }: any) => {
  const generateDivs = (obj: any) => {
    if (!obj) return <Box>no data</Box>;
    let keys = Object.keys(obj);
    return keys.map((key, i) => <Box key={i}>{` ${key} ${object[key]}`}</Box>);
  };

  return (
    <Stack direction="row" justifyContent="space-around" alignItems="center" spacing={0}>
      {generateDivs(object)}
    </Stack>
  );
};
