import { Button, Grid, IconButton, InputAdornment, TextField } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import axiosInstance from 'helpers/axios';
import { tokenManager } from 'helpers/utils';
import { useBreakpoints } from 'providers/useBreakpoints';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { endpoints } from 'routes/endpoints';
import { toast } from 'sonner';

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<{ name?: string; email?: string; password?: string }>(
    {},
  );
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { up } = useBreakpoints();
  const upSM = up('sm');
  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setLoading(true);
      const response = await axiosInstance.post(endpoints.auth.register, {
        email,
        name,
        password,
      });

      const token = response.data?.data?.token;
      tokenManager.setToken(token);
      setLoading(false);
      navigate('/');
    } catch (error: any) {
      console.log(error);
      if (error.response?.status === 500) {
        toast.error('Terjadi kesalahan server. Silakan coba lagi nanti.');
      }

      setErrorMsg(error.response?.data?.errors || 'Register failed');
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleRegister}>
        <Grid container spacing={3} sx={{ mb: 2.5 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              size={upSM ? 'medium' : 'small'}
              name="name"
              label="Name"
              error={errorMsg.name ? true : false}
              helperText={errorMsg.name}
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              size={upSM ? 'medium' : 'small'}
              name="email"
              label="Email address"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              error={errorMsg.email ? true : false}
              helperText={errorMsg.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              size={upSM ? 'medium' : 'small'}
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              sx={{ size: { xs: 'small', sm: 'medium' } }}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              error={errorMsg.password ? true : false}
              helperText={errorMsg.password}
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
            />
          </Grid>
        </Grid>
        <Button
          fullWidth
          size={upSM ? 'large' : 'medium'}
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Sign Up'}
        </Button>
      </form>
    </>
  );
};

export default SignupForm;
