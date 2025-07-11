import { Theme } from '@mui/material';
import { Components } from '@mui/material/styles/components';

const DrawerComponent: Components<Omit<Theme, 'components'>>['MuiDrawer'] = {
  defaultProps: {},
  styleOverrides: {
    paper: ({ theme }) => ({
      background: theme.palette.background.default,
      borderRightWidth: 1,
      borderColor: theme.palette.action.focus,
    }),
    // docked: ({ theme }) => ({
    //   background: theme.palette.common.black,
    // }),
  },
};

export default DrawerComponent;
