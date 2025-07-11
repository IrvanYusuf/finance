import { Button, Card, InputLabel, Link, MenuItem, TextField, Theme } from '@mui/material';
import { Select } from '@mui/material';
import { SelectChangeEvent } from '@mui/material';
import { FormHelperText } from '@mui/material';
import { Grid } from '@mui/material';
import { FormControl } from '@mui/material';
import { Box } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import axiosInstance from 'helpers/axios';
import { ApiResponse, PaginatedResponse } from 'interfaces/apiResponseInterface';
import { Category } from 'interfaces/categoryInterface';
import { Source } from 'interfaces/sourceInterface';
import { FormTransactionErrors } from 'interfaces/transactionInterface';
import { useBreakpoints } from 'providers/useBreakpoints';
import { ChangeEvent, useEffect, useState } from 'react';
import { NumericFormat } from 'react-number-format';
import { endpoints } from 'routes/endpoints';
import paths from 'routes/path';
import { toast } from 'sonner';

const NewTransactionPage = () => {
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [sources, setSources] = useState<Source[] | null>(null);
  const [errors, setErrors] = useState<FormTransactionErrors>({});
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    type: 'income',
    amount: '',
    name: '',
    category_id: '',
    source_id: '',
    date: dayjs() || null,
    description: '',
    attachment: null as File | null,
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
  const handleInputAmount = (values: { value: string }) => {
    setForm((prev) => ({
      ...prev,
      amount: values.value, // hanya angka tanpa Rp dan separator
    }));
  };

  // date
  const handleDateChange = (value: Dayjs | null) => {
    if (value) {
      setForm((prev) => ({
        ...prev,
        date: value,
      }));
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm((prev) => ({
        ...prev,
        attachment: file,
      }));
    }
  };

  const { up } = useBreakpoints();
  const upSM = up('sm');

  const getCategories = async () => {
    try {
      const response = await axiosInstance.get<ApiResponse<PaginatedResponse<Category>>>(
        endpoints.categories.root,
      );
      const data = response.data.data;
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
      const formData = new FormData();
      formData.append('type', form.type);
      formData.append('amount', form.amount);
      formData.append('name', form.name);
      formData.append('category_id', form.category_id);
      formData.append('source_id', form.source_id);
      formData.append('date', form.date?.format('YYYY-MM-DD') || '');
      formData.append('description', form.description);

      if (form.attachment) {
        formData.append('attachment', form.attachment);
      }
      const response = await axiosInstance.post(endpoints.transactions.root, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setForm({
        type: 'income',
        amount: '',
        name: '',
        category_id: '',
        source_id: '',
        date: dayjs() || null,
        description: '',
        attachment: null,
      });
      console.log(response);
      toast.success('success add new transaction', { position: 'top-right' });
      setLoading(false);
    } catch (error: any) {
      console.log(error.response.data);
      setLoading(false);
      if (error.response.data.errors.source_id === 'You don’t have enough money in this source.') {
        toast.error('You don’t have enough money in this source.');
        setErrors(error.response?.data?.errors);
      }
      setErrors(error.response?.data?.errors);
      if (error.response.status === 500) {
        toast.error('internal server error');
      }
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
                label="Name Transaction"
                placeholder="buy kopi kenangan"
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
                  <MenuItem value={'expense'}>Expense</MenuItem>
                  <MenuItem value={'income'}>Income</MenuItem>
                </Select>
                <FormHelperText>{errors.type}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="category-select-label">Category</InputLabel>
                <Select
                  labelId="category-select-label"
                  id="category-select"
                  value={form.category_id}
                  onChange={handleSelectChange}
                  label="Category"
                  name="category_id"
                  error={errors.category_id ? true : false}
                >
                  {categories &&
                    categories.map((category, index) => (
                      <MenuItem key={index} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                </Select>
                <FormHelperText error={Boolean(errors.category_id)}>
                  {errors.category_id}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="source-select-label">Source</InputLabel>
                <Select
                  labelId="source-select-label"
                  id="source-select"
                  value={form.source_id}
                  onChange={handleSelectChange}
                  label="Source"
                  name="source_id"
                  error={errors.source_id ? true : false}
                >
                  {sources && sources.length > 0 ? (
                    sources?.map((source, index) => (
                      <MenuItem key={index} value={source.id}>
                        {source.type} - {source.name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value={''}>No Data</MenuItem>
                  )}
                </Select>
                <FormHelperText error={Boolean(errors.source_id)}>
                  {errors.source_id}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <NumericFormat
                customInput={TextField}
                fullWidth
                size={upSM ? 'medium' : 'small'}
                label="Amount"
                name="amount"
                placeholder="Rp10.000"
                thousandSeparator="."
                decimalSeparator=","
                prefix="Rp"
                allowNegative={false}
                value={form.amount}
                onValueChange={handleInputAmount}
                error={errors.amount ? true : false}
                helperText={errors.amount}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="date-label">Date</InputLabel>
                <DatePicker
                  name="date"
                  value={form.date}
                  onChange={handleDateChange}
                  format="DD MMMM YYYY"
                />
                <FormHelperText>{errors.date}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size={upSM ? 'medium' : 'small'}
                name="description"
                value={form.description}
                label="Description Transaction"
                onChange={handleInputChange}
                error={errors.description ? true : false}
                helperText={errors.description}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size={upSM ? 'medium' : 'small'}
                type="file"
                name="attachment"
                onChange={handleFileChange}
                label="Attachment"
                inputProps={{ accept: 'image/*,.pdf' }}
                error={errors.attachment ? true : false}
                helperText={errors.attachment}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item sm={6} xs={12}>
              <Button
                LinkComponent={Link}
                href={paths.transaction.root}
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
                {loading ? 'Loading...' : 'Save Transaction'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Card>
    </Box>
  );
};

export default NewTransactionPage;
