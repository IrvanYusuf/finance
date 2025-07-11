import { Link } from '@mui/material';
import { Button } from '@mui/material';
import paths from 'routes/path';
import IconifyIcon from './IconifyIcon';
import { useBreakpoints } from 'providers/useBreakpoints';

interface INewButton {
  text: string;
  path: string;
}

const NewButton = (props: INewButton) => {
  const { up } = useBreakpoints();
  const upMd = up('md');
  return (
    <Button
      LinkComponent={Link}
      href={props.path}
      variant="contained"
      color="primary"
      type="submit"
      size={upMd ? 'large' : 'medium'}
      sx={{
        borderRadius: '160px',
        minWidth: { xs: 80, sm: 120 },
        '&:hover': {
          color: 'common.white',
        },
      }}
      startIcon={<IconifyIcon icon="ph:plus-bold" color="common.white" />}
    >
      {props.text}
    </Button>
  );
};

export default NewButton;
