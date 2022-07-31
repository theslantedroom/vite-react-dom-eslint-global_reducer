import { darken } from '@mui/material/styles';
import { colors } from './colors';

const appBoxShadow = '0px 4px 20px rgba(0, 0, 0, 0.05)';

export const webLightPaletteComponents = {
  App: {
    background: `linear-gradient(180deg, #E7EDF2 0%, #FFFFFF 23.11%), ${colors.white}`,
  },
  AppHeader: {
    background: colors.white,
    boxShadow: '0px 4px 17px rgba(0, 0, 0, 0.1)',
  },
  AppHeaderIconButton: {
    backgroundColor: colors.veryLightGrey2,
    badge: {
      borderColor: colors.white,
      none: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
      },
      success: {
        backgroundColor: colors.darkGreen,
        borderColor: colors.darkGreen,
      },
    },
    color: colors.veryLightGrey,
    hover: {
      backgroundColor: colors.lightGrey2,
    },
    svg: {
      fill: colors.veryDarkGrey,
    },
  },
  AppSubHeader: {
    background: colors.white,
    boxShadow: appBoxShadow,
  },
  AppSubHeaderButtons: {
    color: colors.black,
  },
  Autocomplete: {
    hover: {
      backgroundColor: colors.veryLightGrey,
    },
    input: {
      backgroundColor: colors.veryLightGrey2,
    },
    option: {
      backgroundColor: colors.veryLightGrey,
    },
    tag: {
      backgroundColor: colors.white,
    },
  },
  Avatar: {
    badge: {
      backgroundColor: colors.darkGrey,
      borderColor: colors.veryLightGrey,
    },
  },
  Button: {
    darkGrey: {
      background: colors.darkGrey,
      color: colors.white,
      hover: darken(colors.darkGrey, 0.1),
    },
    darkGreen: {
      background: colors.darkGreen,
      color: colors.white,
      hover: darken(colors.darkGreen, 0.1),
    },
    default: {
      background: colors.veryLightGrey,
      color: colors.black,
      hover: darken(colors.veryLightGrey, 0.1),
    },
    facebook: {
      background: colors.facebook,
      color: colors.white,
      hover: darken(colors.facebook, 0.1),
    },
    google: {
      background: colors.google,
      color: colors.white,
      hover: darken(colors.google, 0.1),
    },
    red: {
      background: colors.red,
      color: colors.white,
      hover: darken(colors.red, 0.1),
    },
  },
  Checkbox: {
    color: colors.black,
  },
  CloudinaryUploadWidget: {
    action: colors.red,
    complete: colors.darkGreen,
    error: colors.red,
    inactiveTabIcon: colors.darkGrey,
    inProgress: colors.darkBlue,
    link: colors.red,
    menuIcons: colors.darkGrey,
    sourceBg: colors.veryLightGrey2,
    tabIcon: colors.black,
    textDark: colors.black,
    textLight: colors.white,
    window: colors.white,
    windowBorder: colors.black,
  },
  Connections: {
    borderColor: colors.lightGrey2,
  },
  Discover: {
    body: {
      background: 'linear-gradient(180deg, #E7EDF2 28.38%, #FFFFFF 100%)',
      boxShadow: appBoxShadow,
    },
    header: {
      background: 'linear-gradient(180deg, #E7EDF2 28.38%, #FFFFFF 100%)',
      boxShadow: appBoxShadow,
    },
  },
  DropDown: {
    backgroundColor: colors.white,
    popupIndicatorColor: colors.middleGrey,
  },
  Icon: {
    default: {
      fill: colors.black,
    },
  },
  IconButton: {
    color: colors.darkGrey,
    backgroundColor: colors.veryLightGrey2,
    '&:hover': {
      backgroundColor: colors.lightGrey2,
      opacity: 0.9,
    },
  },
  Input: {
    default: {
      background: colors.veryLightGrey2,
      color: colors.blackestBlack,
      placeholder: colors.black,
    },
  },
  Menu: {
    hover: {
      backgroundColor: colors.lightGrey,
    },
  },
  Notification: {
    icon: {
      backgroundColor: colors.lightGrey,
      backgroundColorHover: colors.lightGrey2,
      color: colors.black,
    },
    primaryText: {
      color: colors.grey,
    },
  },
  Password: {
    fill: colors.middleGrey,
  },
  PlanToggle: {
    tab: {
      backgroundColor: colors.veryLightGrey2,
    },
    tabs: {
      backgroundColor: colors.veryLightGrey2,
    },
    selected: {
      backgroundColor: colors.white,
    },
    wrapper: {
      color: colors.black,
    },
  },
  ProfileEditToggle: {
    tab: {
      backgroundColor: colors.veryLightGrey2,
    },
    tabs: {
      backgroundColor: colors.veryLightGrey2,
    },
    selected: {
      backgroundColor: colors.white,
    },
    wrapper: {
      color: colors.black,
    },
  },
  ProfileImage: {
    addPhotos: {
      borderColor: colors.lightGrey,
    },
    avatar: {
      backgroundColor: colors.veryLightGrey2,
      color: colors.veryLightGrey,
      hover: darken(colors.veryLightGrey2, 0.05),
      root: {
        backgroundColor: colors.white,
      },
      svg: {
        fill: colors.black,
      },
    },
    clearIcon: {
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      color: colors.black,
      hover: {
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
      },
    },
    placeholder: {
      backgroundColor: colors.white,
      borderColor: colors.middleGrey,
      hover: {
        backgroundColor: colors.veryLightGrey,
      },
    },
  },
  ProfileIntro: {
    backgroundColor: colors.veryLightGrey2,
    borderColor: colors.middleGrey2,
    color: colors.black,
    hover: {
      stroke: colors.blackestBlack,
    },
    picker: {
      backgroundColor: colors.veryLightGrey2,
      borderColor: colors.lightGrey,
      color: colors.black,
      hover: {
        backgroundColor: colors.lightGrey2,
      },
    },
    placeholder: {
      color: colors.middleGrey,
    },
    stroke: colors.middleGrey,
  },
  ProfileLocation: {
    backgroundColor: colors.veryLightGrey,
    hover: {
      backgroundColor: colors.lightGrey,
    },
  },
  ProfileSection: {
    avatar: {
      fill: colors.red,
    },
    borderTop: `1px solid ${colors.veryLightGrey2}`,
  },
  SearchIconButton: {
    active: colors.black,
    inactive: colors.middleGrey,
  },
  Select: {
    hover: {
      backgroundColor: colors.veryLightGrey2,
    },
  },
  Spinner: {
    color: colors.white,
  },
  Tag: {
    backgroundColor: colors.white,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.09)',
  },
  TagSearch: {
    button: {
      fill: colors.middleGrey,
    },
    highlighted: {
      backgroundColor: colors.lightGrey,
    },
    highlightedSelected: {
      backgroundColor: colors.red,
      color: colors.white,
    },
    input: {
      backgroundColor: colors.veryLightGrey,
      color: colors.black,
    },
    inputBorder: {
      borderColor: colors.lightGrey,
    },
    placeholder: {
      color: colors.grey,
    },
    select: {
      background: '#FFFFFF',
      boxShadow: '0px 7px 15px rgba(21, 25, 29, 0.1)',
    },
    selected: {
      backgroundColor: colors.red,
      color: colors.white,
    },
  },
  UserSearch: {
    icon: {
      clear: {
        fill: colors.grey,
      },
      search: {
        fill: colors.veryDarkGrey,
      },
    },
    input: {
      backgroundColor: colors.veryLightGrey,
      color: colors.black,
    },
    placeholder: {
      color: colors.middleGrey,
    },
  },
};
