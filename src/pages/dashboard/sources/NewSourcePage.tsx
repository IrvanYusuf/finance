import { Button, Card, InputLabel, Link, MenuItem, TextField, Theme } from '@mui/material';
import { Select } from '@mui/material';
import { SelectChangeEvent } from '@mui/material';
import { FormHelperText } from '@mui/material';
import { Grid } from '@mui/material';
import { FormControl } from '@mui/material';
import { Box } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { Colors } from 'data/colors-data';
import dayjs, { Dayjs } from 'dayjs';
import axiosInstance from 'helpers/axios';
import { ApiResponse } from 'interfaces/apiResponseInterface';
import { Category } from 'interfaces/categoryInterface';
import { FormSourceErrors, Source } from 'interfaces/sourceInterface';
import { useBreakpoints } from 'providers/useBreakpoints';
import { ChangeEvent, useEffect, useState } from 'react';
import { NumericFormat } from 'react-number-format';
import { endpoints } from 'routes/endpoints';
import paths from 'routes/path';
import { toast } from 'sonner';

const NewSourcePage = () => {
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [sources, setSources] = useState<Source[] | null>(null);
  const [errors, setErrors] = useState<FormSourceErrors>({});
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    type: 'cash',
    balance: '0',
    name: '',
    provider: '',
    account_number: '',
    account_holder: '',
    note: '',
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
    if (name === 'type' && value === 'cash') {
      setForm((prev) => ({
        ...prev,
        [name]: value, // type
        provider: '',
        account_number: '',
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  //  amount (number format)
  const handleInputAmount = (values: { value: string }) => {
    setForm((prev) => ({
      ...prev,
      balance: values.value, // hanya angka tanpa Rp dan separator
    }));
  };

  const { up } = useBreakpoints();
  const upSM = up('sm');

  const getCategories = async () => {
    try {
      const response = await axiosInstance.get<ApiResponse<Category[]>>(endpoints.categories.root);
      const data = response.data;
      setCategories(data.data);
    } catch (error) {
      console.log(error);
      toast.error('error get categories');
    }
  };
  const getSources = async () => {
    try {
      const response = await axiosInstance.get<ApiResponse<Source[]>>(endpoints.sources.root);
      const data = response.data;
      setSources(data.data);
    } catch (error) {
      console.log(error);
      toast.error('error get sources');
    }
  };

  const handleSaveTransaction = async (e: any) => {
    try {
      setLoading(true);
      e.preventDefault();
      const rand = Math.floor(Math.random() * 10);
      const color = Colors[rand];
      const formData = new FormData();
      formData.append('type', form.type);
      formData.append('balance', form.balance);
      formData.append('name', form.name);
      formData.append('provider', form.provider);
      formData.append('account_number', form.account_number);
      formData.append('account_holder', form.account_holder);
      formData.append('note', form.note);
      formData.append('color_card', color);
      const response = await axiosInstance.post(endpoints.sources.root, formData);
      setForm({
        type: 'cash',
        balance: '',
        name: '',
        provider: '',
        account_number: '',
        account_holder: '',
        note: '',
      });

      if (response.status === 201) {
        toast.success('success add new source', { position: 'top-right' });
        setLoading(false);
      }
    } catch (error: any) {
      setErrors(error.response?.data?.errors);
      setLoading(false);
      toast.error('error add new source', { position: 'top-right' });
    }
  };

  useEffect(() => {
    getCategories();
    getSources();
  }, []);

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
              <TextField
                fullWidth
                size={upSM ? 'medium' : 'small'}
                name="name"
                value={form.name}
                label="Name Source"
                placeholder="Dana, Rekening BRI, Dompet"
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
                  <MenuItem value={'cash'}>Cash</MenuItem>
                  <MenuItem value={'bank'}>Bank</MenuItem>
                  <MenuItem value={'ewallet'}>E-Wallet</MenuItem>
                </Select>
                <FormHelperText>{errors.type}</FormHelperText>
              </FormControl>
            </Grid>
            {form.type !== 'cash' && (
              <>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    size={upSM ? 'medium' : 'small'}
                    name="provider"
                    value={form.provider}
                    label="Provider"
                    placeholder="Dana, BRI, BCA"
                    onChange={handleInputChange}
                    error={errors?.name ? true : false}
                    helperText={errors?.name}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    size={upSM ? 'medium' : 'small'}
                    name="account_number"
                    value={form.account_number}
                    label="Account Number"
                    placeholder="228899776612"
                    onChange={handleInputChange}
                    error={errors?.account_number ? true : false}
                    helperText={errors?.account_number}
                  />
                </Grid>
              </>
            )}

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
                value={form.balance}
                onValueChange={handleInputAmount}
                error={errors.balance ? true : false}
                helperText={errors.balance}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size={upSM ? 'medium' : 'small'}
                name="account_holder"
                value={form.account_holder}
                label="Account Owner"
                placeholder="John Doe"
                onChange={handleInputChange}
                error={errors?.account_holder ? true : false}
                helperText={errors?.account_holder}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size={upSM ? 'medium' : 'small'}
                name="note"
                value={form.note}
                label="Note"
                onChange={handleInputChange}
                error={errors.note ? true : false}
                helperText={errors.note}
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
                {loading ? 'Loading...' : 'Save Source'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Card>
    </Box>
  );
};

export default NewSourcePage;
