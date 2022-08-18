import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import AirlineStopsIcon from '@mui/icons-material/AirlineStops';
import FlagCircleIcon from '@mui/icons-material/FlagCircle';
import AddCommentIcon from '@mui/icons-material/AddComment';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import AddRoadIcon from '@mui/icons-material/AddRoad';
import AddToHomeScreenIcon from '@mui/icons-material/AddToHomeScreen';
import Battery20Icon from '@mui/icons-material/Battery20';
import Brightness5Icon from '@mui/icons-material/Brightness5';

export const swipableButtonBoxing = [
  {
    groupName: 'Offense',
    icon: <AirlineStopsIcon />,
    onClick: () => {},
    states: [
      { buttonName: 'Hook', icon: <ArrowCircleLeftIcon />, onClick: () => {} },
      { buttonName: 'Jab', icon: <ArrowCircleRightIcon />, onClick: () => {} },
      { buttonName: 'Straight', icon: <ArrowCircleRightIcon />, onClick: () => {} },
      { buttonName: 'Uppercut', icon: <ArrowCircleRightIcon />, onClick: () => {} },
    ],
  },
  {
    groupName: 'Defense',
    icon: <QueryStatsIcon />,
    onClick: () => {},
    states: [
      { buttonName: 'Dodge', icon: <AddCommentIcon />, onClick: () => {} },
      { buttonName: 'Roll', icon: <FlagCircleIcon />, onClick: () => {} },
      { buttonName: 'Slip', icon: <AddReactionIcon />, onClick: () => {} },
      { buttonName: 'Block', icon: <AddReactionIcon />, onClick: () => {} },
    ],
  },

  {
    groupName: 'Other',
    icon: <QueryStatsIcon />,
    onClick: () => {},
    states: [
      { buttonName: 'Recover', icon: <AddRoadIcon />, onClick: () => {} },
      { buttonName: 'Move', icon: <AddToHomeScreenIcon />, onClick: () => {} },
      { buttonName: 'Clinch', icon: <Battery20Icon />, onClick: () => {} },
      { buttonName: 'Low Blow', icon: <Brightness5Icon />, onClick: () => {} },
    ],
  },
];
