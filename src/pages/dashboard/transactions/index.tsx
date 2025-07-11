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

const columns: GridColDef<TransactionInterface>[] = [
  {
    field: 'no',
    headerName: 'Description',
    width: 230,
    hideable: false,
    renderCell: (params) => <RenderCellDescription params={params} />,
  },
  {
    field: 'name',
    headerName: 'Source',
    flex: 1,
    minWidth: 150,
    hideable: false,
    renderCell: (params) => <>{params.row.source?.name ? params.row.source.name : '-'}</>,
  },
  {
    field: 'type',
    headerName: 'Type',
    flex: 0.5,
    minWidth: 80,
    hideable: false,
  },
  {
    field: 'source_type',
    headerName: 'Source Type',
    minWidth: 100,
    flex: 1,
    hideable: false,
    renderCell: (params) => <>{params.row.source?.type ? params.row.source.type : '-'}</>,
  },
  {
    field: 'date',
    headerName: 'Date',
    minWidth: 130,
    flex: 1,
    hideable: false,
    renderCell: (params) => <>{dateFormatFromUTC(params?.value)}</>,
  },
  {
    field: 'amount',
    headerName: 'Amount',
    flex: 3,
    minWidth: 100,
    hideable: false,
    renderCell: (params) => {
      const color = params.row.type === 'expense' ? 'error.main' : 'success.main';
      const symbol = params.row.type === 'expense' ? '-' : '+';

      return (
        <Typography variant="body2" color={color}>
          {symbol} {currencyFormat(params.value)}
        </Typography>
      );
    },
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

const Transaction = () => {
  const [type, setType] = useState('all');
  const [initialized, setInitialized] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [transactions, setTransactions] = useState<PaginatedResponse<TransactionInterface> | null>(
    null,
  );
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
      const response = await axiosInstance.get<
        ApiResponse<PaginatedResponse<TransactionInterface>>
      >(endpoints.transactions.root, {
        params: {
          type: type !== 'all' ? type : {},
          page: pagination.page + 1,
        },
      });
      const data = response.data.data;
      setPagination((prev) => ({
        ...prev,
        totalPages: data.meta.last_page,
      }));

      setTransactions(data);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    // Ambil type dari URL saat pertama kali load
    const urlType = searchParams.get('type') || 'all';
    setType(urlType);
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized) {
      getTransactions();
    }
  }, [type, initialized, pagination.page]);

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
          <FormControl sx={{ width: '200px' }}>
            <InputLabel id="type-select-label">Type</InputLabel>
            <Select
              labelId="type-select-label"
              id="type-select"
              value={type}
              onChange={(e) => {
                const selectedType = e.target.value;
                setType(selectedType);
                setSearchParams(selectedType !== 'all' ? { type: selectedType } : {});
                // 🔁 Reset pagination ke halaman 0
                setPagination((prev) => ({ ...prev, page: 0 }));
              }}
              label="Type"
              name="type"
            >
              <MenuItem value={'all'}>All</MenuItem>
              <MenuItem value={'expense'}>Expense</MenuItem>
              <MenuItem value={'income'}>Income</MenuItem>
            </Select>
          </FormControl>
          <Button
            LinkComponent={Link}
            href={paths.transaction.new}
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
          rows={loading ? [] : transactions?.data ?? []}
          rowCount={transactions?.data.length ?? 0}
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

export default Transaction;
