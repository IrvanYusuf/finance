import { Button, Card, Link, TextField } from '@mui/material';
import { Grid } from '@mui/material';
import { Box } from '@mui/material';
import axiosInstance from 'helpers/axios';
import { FormSourceErrors } from 'interfaces/sourceInterface';
import { useBreakpoints } from 'providers/useBreakpoints';
import { useState } from 'react';
import { NumericFormat } from 'react-number-format';
import { useParams } from 'react-router-dom';
import { endpoints } from 'routes/endpoints';
import paths from 'routes/path';
import { toast } from 'sonner';

const TopUpPage = () => {
  const [errors, setErrors] = useState<FormSourceErrors>({});
  const [balance, setBalance] = useState('');
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  //  amount (number format)
  const handleInputAmount = (values: { value: string }) => {
    setBalance(() => values.value);
  };

  const { up } = useBreakpoints();
  const upSM = up('sm');

  const handleSaveTransaction = async (e: any) => {
    try {
      setLoading(true);
      e.preventDefault();
      const formData = new FormData();
      formData.append('balance', balance);
      const response = await axiosInstance.post(endpoints.sources.topUp(id!), formData);
      setBalance('');

      if (response.status === 200) {
        toast.success('success top up', { position: 'top-right' });
        setLoading(false);
      }
    } catch (error: any) {
      setErrors(error.response?.data?.errors);
      console.log(error);
      setLoading(false);
      toast.error('error top up', { position: 'top-right' });
    }
  };

  return (
    <Box sx={{ pt: 3, pb: 2.5 }}>
      <Card
        sx={{
          flexGrow: { md: 1 },
          display: { md: 'flex' },
          flexDirection: { md: 'column' },
          overflow: 'hidden',
          borderRadius: 6.5,
          '&.MuiPaper-root': {
            p: 3,
            border: 1,
            borderColor: 'neutral.light',
            bgcolor: { xs: 'transparent', sm: 'white' },
            boxShadow: (theme) => `inset 0px -1px ${theme.palette.neutral.light}`, // color for row border
          },
        }}
      >
        <form onSubmit={handleSaveTransaction}>
          <Grid container spacing={2} sx={{ mb: 2.5 }}>
            <Grid item xs={12}>
              <NumericFormat
                customInput={TextField}
                fullWidth
                size={upSM ? 'medium' : 'small'}
                label="Balance"
                name="balance"
                placeholder="Rp10.000"
                thousandSeparator="."
                decimalSeparator=","
                prefix="Rp"
                allowNegative={false}
                value={balance}
                onValueChange={handleInputAmount}
                error={errors.balance ? true : false}
                helperText={errors.balance}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item sm={6} xs={12}>
              <Button
                LinkComponent={Link}
                href={paths.sources.root}
                fullWidth
                size={upSM ? 'large' : 'medium'}
                variant="outlined"
                color="error"
                sx={{
                  borderRadius: '4px',
                  '&:hover': {
                    color: 'error.main',
                  },
                }}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Cancel'}
              </Button>
            </Grid>
            <Grid item sm={6} xs={12}>
              <Button
                fullWidth
                size={upSM ? 'large' : 'medium'}
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Top Up'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Card>
    </Box>
  );
};

export default TopUpPage;
