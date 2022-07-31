import React, { useCallback, useState, useMemo } from 'react';

import { Typography, Box } from '@mui/material';

import { getItemById } from '../../../src/hardData/items';

export interface Props {
  isDouble: boolean;
  itemId: string;
}
export const InventorySlot: React.FC<Props> = ({ isDouble = false, itemId = 'noItem' }) => {
  const [hover, setHover] = useState<boolean>(false);

  const handleMouseIn = useCallback(() => {
    setHover(true);
  }, []);

  const handleMouseOut = useCallback(() => {
    setHover(false);
  }, []);

  const item = useMemo(() => {
    return getItemById(itemId);
  }, [getItemById, itemId]);
  console.log('item', item);
  const style = { px: 2, color: 'black', textAlign: 'center' };
  return (
    <Box
      sx={{
        height: isDouble ? '400px' : '200px',
        width: isDouble ? '200px' : '200px',
        p: 1,
        background: 'linear-gradient(0deg, #fcff9e 0%, #c67700 100%)',
        border: '1px solid black',
        borderRadius: '5px',
      }}
      onMouseOver={handleMouseIn}
      onMouseOut={handleMouseOut}
    >
      <Typography sx={style}>{item?.name}</Typography>
      <Typography sx={style}>{item?.description}</Typography>
    </Box>
  );
};
