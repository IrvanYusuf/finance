import { Button, Card, Link, TextField } from '@mui/material';
import { Grid } from '@mui/material';
import { Box } from '@mui/material';
import axiosInstance from 'helpers/axios';
import { FormCategoryErrors } from 'interfaces/categoryInterface';
import { useBreakpoints } from 'providers/useBreakpoints';
import { useState } from 'react';
import { endpoints } from 'routes/endpoints';
import paths from 'routes/path';
import { toast } from 'sonner';

const NewCategoryPage = () => {
  const [errors, setErrors] = useState<FormCategoryErrors>({});
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const { up } = useBreakpoints();
  const upSM = up('sm');

  const handleSaveTransaction = async (e: any) => {
    try {
      setLoading(true);
      e.preventDefault();
      const formData = new FormData();
      formData.append('name', category);
      const response = await axiosInstance.post(endpoints.categories.root, formData);
      setCategory('');

      if (response.status === 201) {
        toast.success('success add new category', { position: 'top-right' });
      }
      setLoading(false);
    } catch (error: any) {
      console.log(error);

      setErrors(error.response?.data?.errors);
      if (error.response?.status === 500) {
        toast.error('error add new category', { position: 'top-right' });
      }
      setLoading(false);
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
              <TextField
                fullWidth
                size={upSM ? 'medium' : 'small'}
                name="name"
                value={category}
                label="Name Category"
                // placeholder="Dana, Rekening BRI, Dompet"
                onChange={(e) => setCategory(e.target.value)}
                error={errors?.name ? true : false}
                helperText={errors?.name}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item sm={6} xs={12}>
              <Button
                LinkComponent={Link}
                href={paths.categories.root}
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
                {loading ? 'Loading...' : 'Save Category'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Card>
    </Box>
  );
};

export default NewCategoryPage;
