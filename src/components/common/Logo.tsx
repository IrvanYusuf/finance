import { Typography } from '@mui/material';
import Image from 'components/base/Image';
import { Fragment } from 'react/jsx-runtime';

const Logo = () => {
  return (
    <Fragment>
      <Image src="/finance/bankdash.svg" alt="Logo" sx={{ width: 36 }} />
      <Typography variant="h2">{import.meta.env.VITE_APP_NAME}</Typography>
    </Fragment>
  );
};

export default Logo;
