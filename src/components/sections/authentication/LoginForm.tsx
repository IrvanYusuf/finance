import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  TextField,
} from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import axiosInstance from 'helpers/axios';
import { tokenManager } from 'helpers/utils';
import { useBreakpoints } from 'providers/useBreakpoints';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { endpoints } from 'routes/endpoints';
import { toast } from 'sonner';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<{ email?: string; password?: string }>({});
  const navigate = useNavigate();
  const { up } = useBreakpoints();
  const upSM = up('sm');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setLoading(true);
      const response = await axiosInstance.post(endpoints.auth.login, {
        email,
        password,
      });

      const token = response.data?.data?.token;
      tokenManager.setToken(token);
      setLoading(false);
      navigate('/');
    } catch (error: any) {
      console.log(error);
      toast.error('error');
      setErrorMsg(error.response?.data?.errors || 'Login failed');
      setLoading(false);
    }
  };

  const handleTes = () => {
    toast.success('hello');
    alert('tes');
  };
  return (
    <>
      {errorMsg.email ? errorMsg.email : ''}
      <form onSubmit={handleLogin}>
        <Grid container spacing={3} sx={{ mb: 2.5 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              size={upSM ? 'medium' : 'small'}
              name="email"
              label="Email address"
              onChange={(e) => setEmail(e.target.value)}
              error={errorMsg.email ? true : false}
              helperText={errorMsg.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              size={upSM ? 'medium' : 'small'}
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      <IconifyIcon
                        icon={showPassword ? 'majesticons:eye' : 'majesticons:eye-off'}
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={errorMsg.password ? true : false}
              helperText={errorMsg.password}
            />
          </Grid>
        </Grid>
        <Grid container justifyContent="flex-end" sx={{ my: 3 }}>
          <Grid item>
            <Link href="/authentication/forget-password" variant="subtitle2" underline="hover">
              Forgot password?
            </Link>
          </Grid>
        </Grid>
        <Button
          fullWidth
          // size={upSM ? 'large' : 'medium'}
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          sx={{ height: '40px' }}
        >
          Login
        </Button>
      </form>
      {/* <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 3 }}
        onClick={() => handleTes()}
      >
        tes
      </Button> */}
    </>
  );
};

export default LoginForm;
