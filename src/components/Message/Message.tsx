import React, { useCallback, useState } from 'react';

import {
  Avatar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Stack,
  Box,
  Divider,
  Chip,
} from '@mui/material';

import MoreVertIcon from '@mui/icons-material/MoreVert';

export interface Props {
  message: string;
  createdAt: Date;
  isFirstMessage: boolean;
  username: string;
  avatar: string;
  isNewDay?: boolean;
}
export const Message: React.FC<Props> = ({
  message = '',
  createdAt = new Date(),
  isFirstMessage = true,
  username = '',
  avatar = '',
  isNewDay = false,
}) => {
  const [hover, setHover] = useState<boolean>(false);

  const handleMouseIn = useCallback(() => {
    setHover(true);
  }, []);

  const handleMouseOut = useCallback(() => {
    setHover(false);
  }, []);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const renderMenu = useCallback(() => {
    const handleClose = () => {
      setAnchorEl(null);
      setHover(false);
    };
    if (!hover) return;

    return (
      <Box>
        <IconButton size="small" onClick={handleClick}>
          <MoreVertIcon fontSize="inherit" />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <MenuItem onClick={handleClose}>Edit</MenuItem>
          <MenuItem onClick={handleClose}>Delete</MenuItem>
        </Menu>
      </Box>
    );
  }, [anchorEl, open, hover]);
  const AvatarSize = 32;

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
  };

  return (
    <Box
      sx={{ overflow: 'hidden', p: 1 }}
      onMouseOver={handleMouseIn}
      onMouseOut={handleMouseOut}
    >
      {isNewDay ? (
        <Stack
          sx={{ py: 1 }}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Divider sx={{ width: '100%' }} />
          <Chip
            size="small"
            label={createdAt.toLocaleDateString('en-US', dateOptions)}
          />
          <Divider sx={{ width: '100%' }} />
        </Stack>
      ) : null}

      {isFirstMessage ? (
        <Stack direction={'row'}>
          <Avatar
            sx={{
              width: AvatarSize,
              height: AvatarSize,
            }}
            alt={username?.toUpperCase() || ''}
            src={`https://res.cloudinary.com/sessionwire-dev/image/upload/c_limit,h_${AvatarSize},w_${AvatarSize}/v0/${avatar}`}
          />
          <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
            <Typography
              sx={{
                ml: 1,
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                fontWeight: 'bold',
              }}
              variant="body2"
            >
              {username}
            </Typography>
            <Typography
              sx={{
                ml: 1,
              }}
              variant="body2"
            >
              {createdAt.toLocaleTimeString([], {
                hour: 'numeric',
                minute: '2-digit',
              })}
            </Typography>
          </Box>
          {renderMenu()}
        </Stack>
      ) : null}

      <Box
        sx={{
          marginLeft: `${AvatarSize}px`,
        }}
      >
        <Stack direction={'row'} justifyContent="space-between">
          <Typography
            sx={{
              ml: 1,
              maxWidth: '225px',
            }}
            variant="body2"
          >
            {message}
          </Typography>
          <Box sx={{ position: 'relative', bottom: 5, height: 0 }}>
            {!isFirstMessage && renderMenu()}
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};
