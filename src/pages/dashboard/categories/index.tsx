import { Box, Button, Card, Link, MenuItem, Stack, Typography } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
  GridRowsProp,
  GridValidRowModel,
} from '@mui/x-data-grid';
import IconifyIcon from 'components/base/IconifyIcon';
import CustomPagination from 'components/sections/dashboard/invoice/CustomPagination';
import NoData from 'components/sections/dashboard/invoice/NoData';
import RenderCellDescription from 'components/sections/dashboard/invoice/RenderCellDescription';
import RenderCellDownload from 'components/sections/dashboard/invoice/RenderCellDownload';
import { invoiceRowData, RowData } from 'data/invoice-data';
import axiosInstance from 'helpers/axios';
import { currencyFormat, dateFormatFromUTC, truncateText } from 'helpers/utils';
import { PaginatedResponse, ApiResponse, Meta } from 'interfaces/apiResponseInterface';
import { TransactionInterface } from 'interfaces/transactionInterface';
import { useBreakpoints } from 'providers/useBreakpoints';
import { useEffect, useState } from 'react';
import { endpoints } from 'routes/endpoints';
import paths from 'routes/path';
import { FormControl } from '@mui/material';
import { InputLabel } from '@mui/material';
import { Select } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import ActionDropdown from './ActionDropdown';
import { Category } from 'interfaces/categoryInterface';

const columns: GridColDef<Category>[] = [
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
    minWidth: 150,
    hideable: false,
    renderCell: (params) => <>{params.row.name}</>,
  },

  {
    field: 'action',
    headerName: 'Action',
    sortable: false,
    flex: 0.5,
    minWidth: 150,
    // renderCell: (params) => <RenderCellDownload params={params} />,
    renderCell: (params) => <ActionDropdown {...params.row} />,
  },
];

const rowHeight = 60;

const CategoriesPage = () => {
  const [type, setType] = useState('all');
  const [initialized, setInitialized] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState<PaginatedResponse<Category> | null>(null);
  const [pagination, setPagination] = useState({
    page: 0,
    pageSize: 15,
    totalPages: 1,
  });
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 5,
  });

  const { up } = useBreakpoints();
  const upMd = up('md');

  const handlePaginationModelChange = (model: GridPaginationModel) => {
    setPaginationModel(model);
  };

  const getTransactions = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get<ApiResponse<PaginatedResponse<Category>>>(
        endpoints.categories.root,
        {
          params: {
            page: pagination.page + 1,
          },
        },
      );
      const data = response.data.data;
      setPagination((prev) => ({
        ...prev,
        totalPages: data.meta.last_page,
      }));

      setCategories(data);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getTransactions();
  }, [pagination.page]);

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
            p: 1,
            border: 1,
            borderColor: 'neutral.light',
            bgcolor: { xs: 'transparent', sm: 'white' },
            boxShadow: (theme) => `inset 0px -1px ${theme.palette.neutral.light}`, // color for row border
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'end', gap: 3 }}>
          <Button
            LinkComponent={Link}
            href={paths.categories.new}
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
            New
          </Button>
        </Box>
        <DataGrid
          rowHeight={rowHeight}
          rows={loading ? [] : categories?.data ?? []}
          rowCount={categories?.data.length ?? 0}
          columns={columns}
          disableRowSelectionOnClick
          paginationMode="server"
          paginationModel={paginationModel}
          onPaginationModelChange={handlePaginationModelChange}
          slots={{
            noRowsOverlay: () => <NoData />,
            pagination: () => null,
          }}
          loading={loading}
          sx={{
            px: { xs: 0, md: 3 },
            '& .MuiDataGrid-main': {
              minHeight: 300,
            },
            '& .MuiDataGrid-virtualScroller': {
              minHeight: 300,
              p: 0,
            },
            '& .MuiDataGrid-columnHeader': {
              fontSize: { xs: 13, lg: 16 },
            },
            '& .MuiDataGrid-cell': {
              fontSize: { xs: 13, lg: 16 },
            },
            '& .MuiTypography-root': {
              fontSize: { xs: 13, lg: 16 },
            },
          }}
        />
      </Card>
      <Box sx={{ mt: 2, display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' } }}>
        <CustomPagination
          page={pagination.page + 1}
          pageCount={pagination.totalPages}
          onPageChange={(event, value) => setPagination((prev) => ({ ...prev, page: value - 1 }))}
        />
      </Box>
    </Box>
  );
};

export default CategoriesPage;
