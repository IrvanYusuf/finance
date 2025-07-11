import { Box, ListItemIcon, ListItemText } from '@mui/material';
import { Typography } from '@mui/material';
import { ListItem } from '@mui/material';
import SignInIcon from 'components/icons/menu-icons/SignInIcon';
import axiosInstance from 'helpers/axios';
import { tokenManager } from 'helpers/utils';
import { useNavigate } from 'react-router-dom';
import { endpoints } from 'routes/endpoints';
import paths from 'routes/path';
import { toast } from 'sonner';

const MenuListLogout = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post(endpoints.auth.logout);
      if (response.status === 200) {
        tokenManager.removeToken();
        navigate(paths.login);
      }
    } catch (error) {
      console.log(error);
      toast.error('error logout');
    }
  };
  return (
    <ListItem
      sx={{
        position: 'relative',
      }}
    >
      <Box
        onClick={handleLogout}
        sx={{
          py: 1.5,
          px: 3,
          display: 'flex',
          alignItems: 'center',
          gap: 3.125,
          flex: 1,
          borderRadius: 2,
          transition: 'color 0.35s ease',
          '&:hover, &:focus': {
            boxShadow: 'shadows[10]',
            color: 'error.main',
            '& .MuiSvgIcon-root': {
              color: 'error.main',
            },
          },
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 'auto',
            rotate: '-180deg',
            color: 'error.main',
          }}
        >
          <SignInIcon />
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography
              sx={{
                fontSize: { xs: 'body1.fontSize', xl: 'h6.fontSize' },
                fontWeight: 500,
                textTransform: 'capitalize',
                color: 'error.main',
              }}
            >
              Logout
            </Typography>
          }
        />
      </Box>
    </ListItem>
  );
};

export default MenuListLogout;
