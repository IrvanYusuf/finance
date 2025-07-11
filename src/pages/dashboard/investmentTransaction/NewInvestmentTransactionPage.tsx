import { Button, Card, InputLabel, Link, MenuItem, TextField } from '@mui/material';
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
import {
  FormInvestmentTransactionErrors,
  InvestmentInterface,
} from 'interfaces/investmentInterface';
import { Source } from 'interfaces/sourceInterface';
import { useBreakpoints } from 'providers/useBreakpoints';
import { ChangeEvent, useEffect, useState } from 'react';
import { NumericFormat } from 'react-number-format';
import { endpoints } from 'routes/endpoints';
import paths from 'routes/path';
import { toast } from 'sonner';

const NewInvestmentTransactionPage = () => {
  const [errors, setErrors] = useState<FormInvestmentTransactionErrors>({});
  const [sources, setSources] = useState<Source[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingTransaction, setLoadingTransaction] = useState(false);
  const [investments, setInvestments] = useState<PaginatedResponse<InvestmentInterface> | null>(
    null,
  );
  const [form, setForm] = useState({
    amount: 'goal',
    investment_id: '',
    source_id: '',
    transaction_date: dayjs() || null,
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

  // date
  const handleDateChange = (value: Dayjs | null) => {
    if (value) {
      setForm((prev) => ({
        ...prev,
        transaction_date: value,
      }));
    }
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

  const getInvestments = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get<ApiResponse<PaginatedResponse<InvestmentInterface>>>(
        endpoints.investments.root,
      );
      const data = response.data.data;
      console.log(response);

      setInvestments(data);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const handleSaveTransaction = async (e: any) => {
    try {
      e.preventDefault();
      setLoadingTransaction(true);
      const formData = new FormData();
      formData.append('investment_id', form.investment_id);
      formData.append('source_id', form.source_id);
      formData.append('amount', form.amount);
      formData.append('notes', form.notes);
      formData.append('transaction_date', form.transaction_date.format('YYYY-MM-DD') || '');

      const response = await axiosInstance.post(endpoints.investmentTransaction.root, formData);
      setForm({
        investment_id: 'goal',
        source_id: '',
        amount: '',
        notes: '',
        transaction_date: dayjs() || null,
      });
      console.log(response);
      toast.success('success add new investment transactions', { position: 'top-right' });
      setLoadingTransaction(false);
    } catch (error: any) {
      if (error.response.data.errors.source_id === 'You don’t have enough money in this source.') {
        toast.error('You don’t have enough money in this source.');
        setErrors(error.response?.data?.errors);
      }
      console.log(error);
      setLoadingTransaction(false);
      setErrors(error.response?.data?.errors);
      if (error.response.status === 500) {
        toast.error('internal server error');
      }
    }
  };

  useEffect(() => {
    getSources();
    getInvestments();
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
            boxShadow: (theme) => `inset 0px -1px ${theme.palette.neutral.light}`,
          },
        }}
      >
        <form onSubmit={handleSaveTransaction}>
          <Grid container spacing={2} sx={{ mb: 2.5 }}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="investment-select-label">Select Investment Goal</InputLabel>
                <Select
                  labelId="investment-select-label"
                  id="investment-select"
                  value={form.investment_id}
                  onChange={handleSelectChange}
                  label="Investment Goal"
                  name="investment_id"
                  error={errors.investment_id ? true : false}
                >
                  {investments && investments.data.length > 0 ? (
                    investments.data?.map((investment, index) => (
                      <MenuItem key={index} value={investment.id}>
                        {investment.name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value={''}>No Data</MenuItem>
                  )}
                </Select>
                <FormHelperText error={Boolean(errors.investment_id)}>
                  {errors.investment_id}
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
                placeholder="Rp10.000.000"
                thousandSeparator="."
                decimalSeparator=","
                prefix="Rp"
                allowNegative={false}
                value={form.amount}
                onValueChange={(values) => handleInputAmount('amount', values)}
                error={errors.amount ? true : false}
                helperText={errors.amount}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="date-label">Date</InputLabel>
                <DatePicker
                  name="date"
                  value={form.transaction_date}
                  onChange={handleDateChange}
                  format="DD MMMM YYYY"
                />
                <FormHelperText>{errors.transaction_date}</FormHelperText>
              </FormControl>
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
                href={paths.investmentTransactions.root}
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
                disabled={loadingTransaction}
              >
                {loadingTransaction ? 'Loading...' : 'Cancel'}
              </Button>
            </Grid>
            <Grid item sm={6} xs={12}>
              <Button
                fullWidth
                size={upSM ? 'large' : 'medium'}
                type="submit"
                variant="contained"
                color="primary"
                disabled={loadingTransaction}
              >
                {loadingTransaction ? 'Loading...' : 'Save Investment Transaction'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Card>
    </Box>
  );
};

export default NewInvestmentTransactionPage;
