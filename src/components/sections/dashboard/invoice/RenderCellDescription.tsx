import { Link } from '@mui/material';
import { Stack, Typography } from '@mui/material';
import { GridCellParams } from '@mui/x-data-grid';
import DataGridDecrementArrow from 'assets/decrement.svg';
import DataGriIncrementArrow from 'assets/increment.svg';
import IconifyIcon from 'components/base/IconifyIcon';
import Image from 'components/base/Image';
import { truncateText } from 'helpers/utils';

type ParamsProps = {
  params: GridCellParams;
};

const RenderCellDescription = ({ params }: ParamsProps) => {
  return (
    <Stack direction="row" alignItems="center" gap={1} sx={{ pl: 0.6, py: 2, width: 1 }}>
      {params.row.type ? (
        params.row.type === 'expense' ? (
          <IconifyIcon icon={'fa6-solid:circle-down'} color={'error.main'} />
        ) : (
          <IconifyIcon icon={'fa6-solid:circle-up'} color={'success.main'} />
        )
      ) : null}
      <Typography
        variant="h5"
        sx={{
          fontSize: { xs: 'caption.fontSize', md: 'body1.fontSize', xl: 'h5.fontSize' },
          fontWeight: 600,
          pr: 1,
        }}
      >
        {truncateText(params.row.name, 15)}
      </Typography>
    </Stack>
  );
};

export default RenderCellDescription;
