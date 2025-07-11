import { Box, Button, Card, Link, tooltipClasses, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import IconifyIcon from 'components/base/IconifyIcon';
import CustomPagination from 'components/sections/dashboard/invoice/CustomPagination';
import NoData from 'components/sections/dashboard/invoice/NoData';
import axiosInstance from 'helpers/axios';
import { currencyFormat, dateFormatFromUTC, truncateText } from 'helpers/utils';
import { PaginatedResponse, ApiResponse } from 'interfaces/apiResponseInterface';
import { useBreakpoints } from 'providers/useBreakpoints';
import { useEffect, useState } from 'react';
import { endpoints } from 'routes/endpoints';
import paths from 'routes/path';
import { useSearchParams } from 'react-router-dom';
import ActionDropdown from './ActionDropdown';
import { InvestmentInterface } from 'interfaces/investmentInterface';
import { Tooltip } from '@mui/material';

const columns: GridColDef<InvestmentInterface>[] = [
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
    minWidth: 150,
    hideable: false,
    renderCell: (params) =>
      params.row?.name ? (
        <Tooltip
          title={params.row.name}
          slotProps={{
            popper: {
              sx: {
                [`&.${tooltipClasses.popper}[data-popper-placement*="bottom"] .${tooltipClasses.tooltip}`]:
                  {
                    marginTop: '-10px',
                  },
                [`&.${tooltipClasses.popper}[data-popper-placement*="top"] .${tooltipClasses.tooltip}`]:
                  {
                    marginBottom: '0px',
                  },
                [`&.${tooltipClasses.popper}[data-popper-placement*="right"] .${tooltipClasses.tooltip}`]:
                  {
                    marginLeft: '0px',
                  },
                [`&.${tooltipClasses.popper}[data-popper-placement*="left"] .${tooltipClasses.tooltip}`]:
                  {
                    marginRight: '0px',
                  },
              },
            },
          }}
        >
          <span>{truncateText(params.row.name, 20)}</span>
        </Tooltip>
      ) : (
        '-'
      ),
  },
  {
    field: 'type',
    headerName: 'Type',
    minWidth: 100,
    flex: 0.6,
    hideable: false,
    renderCell: (params) => <>{params.row?.type ? params.row.type : '-'}</>,
  },
  {
    field: 'created_at',
    headerName: 'Date',
    minWidth: 130,
    flex: 1,
    hideable: false,
    renderCell: (params) => <>{dateFormatFromUTC(params?.value)}</>,
  },
  {
    field: 'target_amount',
    headerName: 'Target Amount',
    flex: 1,
    minWidth: 100,
    hideable: false,
    renderCell: (params) => {
      return <Typography variant="body2">{currencyFormat(params.value)}</Typography>;
    },
  },
  {
    field: 'saved_amount',
    headerName: 'Saved Amount',
    flex: 1,
    minWidth: 100,
    hideable: false,
    renderCell: (params) => {
      return <Typography variant="body2">{currencyFormat(params.value)}</Typography>;
    },
  },
  {
    field: 'difference',
    headerName: 'Difference',
    flex: 1,
    minWidth: 100,
    hideable: false,
    renderCell: (params) => {
      const target = params.row.target_amount ?? 0;
      const saved = params.row.saved_amount ?? 0;
      const diff = target - saved;
      return <Typography variant="body2">{currencyFormat(diff)}</Typography>;
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

const Investment = () => {
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [investments, setInvestments] = useState<PaginatedResponse<InvestmentInterface> | null>(
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

  const getInvestments = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get<ApiResponse<PaginatedResponse<InvestmentInterface>>>(
        endpoints.investments.root,
        {
          params: {
            page: pagination.page + 1,
          },
        },
      );
      const data = response.data.data;
      console.log(response);

      setPagination((prev) => ({
        ...prev,
        totalPages: data.meta.last_page,
      }));

      setInvestments(data);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getInvestments();
  }, [pagination.page]);

  console.log(investments);

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
            href={paths.investments.new}
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
          rows={loading ? [] : investments?.data ?? []}
          rowCount={investments?.data.length ?? 0}
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

export default Investment;
