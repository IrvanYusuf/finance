import { Box, Button, Card, Container, Divider, Link, Stack, Typography } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import SignupForm from 'components/sections/authentication/SignupForm';

const SignupPage = () => {
  return (
    <Box
      sx={{
        width: 1,
        position: 'relative',
        zIndex: 100,
      }}
    >
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Container maxWidth="sm">
          <Card
            sx={{
              p: { xs: 3, sm: 5 },
              width: 1,
            }}
          >
            <Typography variant="h4">Sign Up</Typography>

            <Typography
              sx={{
                mt: 2,
                mb: { xs: 3, sm: 5 },
                fontSize: { xs: 'subtitle1.fontSize', sm: 'body2.fontSize' },
              }}
            >
              Already have an account?
              <Link
                href="/authentication/login"
                variant="subtitle2"
                sx={{ ml: 0.75, '&:hover': { color: 'primary.light' } }}
              >
                Sign In Now!
              </Link>
            </Typography>

            <SignupForm />
          </Card>
        </Container>
      </Stack>
    </Box>
  );
};

export default SignupPage;
