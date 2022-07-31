import React, { useCallback, useState } from 'react';

import { Typography, Box } from '@mui/material';

export interface Props {
  message: string;
}
export const ProgressBar: React.FC<Props> = ({ message = '' }) => {
  const [hover, setHover] = useState<boolean>(false);

  const handleMouseIn = useCallback(() => {
    setHover(true);
  }, []);

  const handleMouseOut = useCallback(() => {
    setHover(false);
  }, []);

  return (
    <Box
      sx={{
        minHeight: '20px',
        width: '200px',
        p: 0,
        background: 'linear-gradient(90deg, #fcff9e 0%, #c67700 100%)',
        border: '1px solid black',
        borderRadius: '5px',
      }}
      onMouseOver={handleMouseIn}
      onMouseOut={handleMouseOut}
    >
      <Typography sx={{ px: 2, color: 'black', textAlign: 'center' }}>{message}</Typography>
    </Box>
  );
};
