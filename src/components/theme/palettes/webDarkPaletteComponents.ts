import { darken, lighten } from '@mui/material/styles';
import { colors } from './colors';

export const webDarkPaletteComponents = {
  App: {
    background: `linear-gradient(0deg, rgba(224, 71, 38, 0.1) -6.9%, rgba(224, 71, 38, 0) 39.78%), ${colors.black}`,
  },
  AppHeader: {
    background: `linear-gradient(90deg, rgba(224, 71, 38, 0.1) 5.8%, rgba(224, 71, 38, 0) 41.53%), ${colors.veryDarkGrey}`,
    boxShadow: '0px 4px 44px rgba(0, 0, 0, 0.4)',
  },
  AppHeaderIconButton: {
    backgroundColor: colors.darkGrey,
    badge: {
      borderColor: colors.veryDarkGrey,
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
      backgroundColor: colors.veryDarkGrey,
    },
    svg: {
      fill: colors.veryLightGrey,
    },
  },
  AppSubHeader: {
    background:
      'linear-gradient(88.33deg, rgba(224, 71, 38, 0.05) -9.92%, rgba(224, 71, 38, 0) 25.49%), #21282F',
    boxShadow: 'none',
  },
  AppSubHeaderButtons: {
    color: colors.white,
  },
  Autocomplete: {
    hover: {
      backgroundColor: colors.veryDarkGrey,
    },
    input: {
      backgroundColor: colors.blackestBlack,
    },
    option: {
      backgroundColor: colors.veryDarkGrey,
    },
    tag: {
      backgroundColor: colors.veryDarkGrey,
    },
  },
  Avatar: {
    badge: {
      backgroundColor: colors.darkGrey,
      borderColor: colors.black,
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
      background: colors.veryDarkGrey,
      color: colors.white,
      hover: darken(colors.veryDarkGrey, 0.1),
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
    color: colors.white,
  },
  CloudinaryUploadWidget: {
    action: colors.red,
    complete: colors.darkGreen,
    error: colors.red,
    inactiveTabIcon: colors.grey,
    inProgress: colors.darkBlue,
    link: colors.red,
    menuIcons: colors.lightGrey,
    sourceBg: colors.black,
    tabIcon: colors.lightGrey,
    textDark: colors.black,
    textLight: colors.white,
    window: colors.veryDarkGrey,
    windowBorder: colors.lightGrey,
  },
  Connections: {
    borderColor: colors.veryDarkGrey,
  },
  Discover: {
    body: {
      background: `linear-gradient(0deg, rgba(224, 71, 38, 0.1) -10%, rgba(224, 71, 38, 0) 30.8%), #15191D`,
      boxShadow: 'none',
    },
    header: {
      background: `linear-gradient(88.33deg, rgba(224, 71, 38, 0.01) -9.92%, rgba(224, 71, 38, 0) 25.49%), #1B1F24`,
      boxShadow: 'none',
    },
  },
  DropDown: {
    backgroundColor: colors.blackestBlack,
    popupIndicatorColor: colors.middleGrey,
  },
  Icon: {
    default: {
      fill: colors.white,
    },
  },
  IconButton: {
    color: 'white',
    backgroundColor: colors.veryDarkGrey,
    '&:hover': {
      backgroundColor: colors.darkGrey,
      opacity: 0.9,
    },
  },
  Input: {
    default: {
      background: colors.blackestBlack,
      color: colors.white,
      placeholder: colors.lightGrey,
    },
  },
  Menu: {
    hover: {
      backgroundColor: colors.veryDarkGrey,
    },
  },
  Notification: {
    icon: {
      backgroundColor: colors.darkGrey,
      backgroundColorHover: colors.veryDarkGrey,
      color: colors.white,
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
      backgroundColor: colors.black,
    },
    tabs: {
      backgroundColor: colors.blackestBlack,
    },
    selected: {
      backgroundColor: colors.veryDarkGrey,
    },
    wrapper: {
      color: colors.white,
    },
  },
  ProfileEditToggle: {
    tab: {
      backgroundColor: colors.black,
    },
    tabs: {
      backgroundColor: colors.black,
    },
    selected: {
      backgroundColor: colors.veryDarkGrey,
    },
    wrapper: {
      color: colors.white,
    },
  },
  ProfileImage: {
    addPhotos: {
      borderColor: colors.darkGrey,
    },
    avatar: {
      backgroundColor: colors.darkGrey,
      color: colors.veryLightGrey,
      hover: lighten(colors.darkGrey, 0.05),
      root:{
        backgroundColor: colors.black,
      },
      svg: {
        fill: colors.white,
      },
    },
    clearIcon: {
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      color: colors.white,
      hover: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
      },
    },
    placeholder: {
      backgroundColor: colors.black,
      borderColor: colors.middleGrey,
      hover: {
        backgroundColor: colors.veryDarkGrey,
      },
    },
  },
  ProfileIntro: {
    backgroundColor: colors.blackestBlack,
    borderColor: colors.darkGrey,
    color: colors.veryLightGrey,
    hover: {
      stroke: colors.middleGrey2,
    },
    picker: {
      backgroundColor: colors.black,
      borderColor: colors.darkGrey,
      color: colors.veryLightGrey,
      hover: {
        backgroundColor: colors.blackestBlack,
      },
    },
    placeholder: {
      color: colors.middleGrey,
    },
    stroke: colors.middleGrey,
  },
  ProfileLocation: {
    backgroundColor: colors.veryDarkGrey,
    hover: {
      backgroundColor: colors.darkGrey,
    },
  },
  ProfileSection: {
    avatar: {
      fill: colors.red,
    },
    borderTop: `1px solid ${colors.darkGrey}`,
  },
  SearchIconButton: {
    active: colors.white,
    inactive: colors.middleGrey,
  },
  Select: {
    hover: {
      backgroundColor: colors.blackestBlack,
    },
  },
  Spinner: {
    color: colors.lightGrey,
  },
  Tag: {
    backgroundColor: colors.veryDarkGrey,
    boxShadow: 'none',
  },
  TagSearch: {
    button: {
      fill: colors.middleGrey,
    },
    highlighted: {
      backgroundColor: colors.darkGrey,
    },
    highlightedSelected: {
      backgroundColor: colors.red,
      color: colors.white,
    },
    input: {
      backgroundColor: colors.veryDarkGrey,
      color: colors.white,
    },
    inputBorder: {
      borderColor: colors.darkGrey,
    },
    placeholder: {
      color: colors.grey,
    },
    select: {
      background: `linear-gradient(15.24deg, rgba(224, 71, 38, 0.1) 4.21%, rgba(224, 71, 38, 0) 60.05%), #252D33`,
      boxShadow: '0px 10px 22px rgba(0, 0, 0, 0.35)',
    },
    selected: {
      backgroundColor: colors.red,
      color: colors.white,
    },
  },
  UserSearch: {
    icon: {
      clear: {
        fill: colors.middleGrey,
      },
      search: {
        fill: colors.veryLightGrey,
      },
    },
    input: {
      backgroundColor: colors.black,
      color: colors.white,
    },
    placeholder: {
      color: colors.middleGrey2,
    },
  },
};
