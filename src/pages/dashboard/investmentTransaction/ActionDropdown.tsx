import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  Typography,
  Button,
  Stack,
  Grid,
} from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import { currencyFormat } from 'helpers/utils';
import { InvestmentTransactionInterface } from 'interfaces/investmentInterface';
import { MouseEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ActionDropdown = (params: InvestmentTransactionInterface) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openModal, setOpenModal] = useState(false);
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const navigate = useNavigate();

  const handleOpenDropdown = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseDropdown = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    // Panggil fungsi delete API di sini
    console.log(`Deleting item with id: ${params.id}`);
    setOpenModal(false);
    setAnchorEl(null);
  };
  const handleDetail = () => {
    // Panggil fungsi delete API di sini
    // console.log(`Deleting item with id: ${id}`);
    setOpenModalDetail(false);
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton sx={{ p: 0 }} onClick={handleOpenDropdown}>
        <IconifyIcon icon="material-symbols:more-vert" width={'24px'} />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseDropdown}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ '& .MuiMenu-paper': { width: 150 } }}
      >
        <MenuItem
          onClick={() => {
            setOpenModalDetail(true);
            setAnchorEl(null);
          }}
        >
          <IconifyIcon icon="mdi:eye" width={20} style={{ marginRight: 8 }} />
          Detail
        </MenuItem>
        <MenuItem onClick={() => navigate(`/transaction/${params.id}/edit`)}>
          <IconifyIcon icon="mdi:pencil" width={20} style={{ marginRight: 8 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={() => setOpenModal(true)}>
          <IconifyIcon icon="mdi:trash-can-outline" width={20} style={{ marginRight: 8 }} />
          Delete
        </MenuItem>
      </Menu>

      {/* Modal konfirmasi delete */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            width: 600,
          }}
        >
          <Typography variant="h6" mb={2}>
            Konfirmasi Hapus
          </Typography>
          <Typography variant="body2" mb={3}>
            Apakah kamu yakin ingin menghapus data ini?
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button variant="outlined" onClick={() => setOpenModal(false)}>
              Batal
            </Button>
            <Button variant="contained" color="error" onClick={handleDelete}>
              Hapus
            </Button>
          </Stack>
        </Box>
      </Modal>

      {/* Modal detail */}
      <Modal open={openModalDetail} onClose={() => setOpenModalDetail(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            width: { xs: 400, md: 600 },
            maxHeight: '80vh', // max tinggi modal (80% tinggi viewport)
            overflowY: 'auto',
          }}
        >
          <Grid container spacing={2} width={'100%'} alignItems={'center'}>
            <Grid item xs={2.4}>
              <Typography variant="h6">Name</Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography variant="h6">:</Typography>
            </Grid>
            <Grid item xs={8.6}>
              <Typography variant="body2">{params?.investment.name || ''}</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} width={'100%'} my={1} alignItems={'center'}>
            <Grid item xs={2.4}>
              <Typography variant="h6">Source</Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography variant="h6">:</Typography>
            </Grid>
            <Grid item xs={8.6}>
              <Typography variant="body2">{params?.source.name || '-'}</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} width={'100%'} my={1} alignItems={'center'}>
            <Grid item xs={2.4}>
              <Typography variant="h6">Amount</Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography variant="h6">:</Typography>
            </Grid>
            <Grid item xs={8.6}>
              <Typography variant="body2">{currencyFormat(params?.amount)}</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} width={'100%'} my={1} alignItems={'center'}>
            <Grid item xs={2.4}>
              <Typography variant="h6">Notes</Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography variant="h6">:</Typography>
            </Grid>
            <Grid item xs={8.6}>
              <Typography variant="body2">{params?.notes ? params.notes : '-'}</Typography>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default ActionDropdown;
