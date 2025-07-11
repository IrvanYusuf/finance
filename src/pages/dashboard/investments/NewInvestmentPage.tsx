import { Button, Card, InputLabel, Link, MenuItem, TextField } from '@mui/material';
import { Select } from '@mui/material';
import { SelectChangeEvent } from '@mui/material';
import { FormHelperText } from '@mui/material';
import { Grid } from '@mui/material';
import { FormControl } from '@mui/material';
import { Box } from '@mui/material';
import axiosInstance from 'helpers/axios';
import { FormInvestmentErrors } from 'interfaces/investmentInterface';
import { useBreakpoints } from 'providers/useBreakpoints';
import { ChangeEvent, useState } from 'react';
import { NumericFormat } from 'react-number-format';
import { endpoints } from 'routes/endpoints';
import paths from 'routes/path';
import { toast } from 'sonner';

const NewInvestmentPage = () => {
  const [errors, setErrors] = useState<FormInvestmentErrors>({});
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    type: 'goal',
    name: '',
    target_amount: '',
    notes: '',
  });
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Untuk Select
  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //  amount (number format)
  const handleInputAmount = (name: keyof typeof form, values: { value: string }) => {
    setForm((prev) => ({
      ...prev,
      [name]: values.value,
    }));
  };

  const { up } = useBreakpoints();
  const upSM = up('sm');

  const handleSaveTransaction = async (e: any) => {
    try {
      setLoading(true);
      e.preventDefault();
      const formData = new FormData();
      formData.append('type', form.type);
      formData.append('name', form.name);
      formData.append('target_amount', form.target_amount);
      formData.append('notes', form.notes);

      const response = await axiosInstance.post(endpoints.investments.root, formData);
      setForm({
        type: 'goal',
        name: '',
        target_amount: '',
        notes: '',
      });
      console.log(response);
      toast.success('success add new invetsment', { position: 'top-right' });
      setLoading(false);
    } catch (error: any) {
      setErrors(error.response?.data?.errors);
      setLoading(false);
      if (error.response.status === 500) {
        toast.error('internal server error');
      }
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
            boxShadow: (theme) => `inset 0px -1px ${theme.palette.neutral.light}`,
          },
        }}
      >
        <form onSubmit={handleSaveTransaction}>
          <Grid container spacing={2} sx={{ mb: 2.5 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size={upSM ? 'medium' : 'small'}
                name="name"
                value={form.name}
                label="Name Investment"
                onChange={handleInputChange}
                error={errors?.name ? true : false}
                helperText={errors?.name}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="type-select-label">Type</InputLabel>
                <Select
                  labelId="type-select-label"
                  id="type-select"
                  value={form.type}
                  onChange={handleSelectChange}
                  label="Type"
                  name="type"
                  error={errors.type ? true : false}
                >
                  <MenuItem value={'goal'}>Goal</MenuItem>
                </Select>
                <FormHelperText>{errors.type}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <NumericFormat
                customInput={TextField}
                fullWidth
                size={upSM ? 'medium' : 'small'}
                label="Target Amount"
                name="target_amount"
                placeholder="Rp10.000.000"
                thousandSeparator="."
                decimalSeparator=","
                prefix="Rp"
                allowNegative={false}
                value={form.target_amount}
                onValueChange={(values) => handleInputAmount('target_amount', values)}
                error={errors.target_amount ? true : false}
                helperText={errors.target_amount}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size={upSM ? 'medium' : 'small'}
                name="notes"
                value={form.notes}
                label="Description Investment"
                onChange={handleInputChange}
                error={errors.notes ? true : false}
                helperText={errors.notes}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item sm={6} xs={12}>
              <Button
                LinkComponent={Link}
                href={paths.investments.root}
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
                {loading ? 'Loading...' : 'Save Investment'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Card>
    </Box>
  );
};

export default NewInvestmentPage;
