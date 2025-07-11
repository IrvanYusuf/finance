import { Box } from '@mui/material';
import { Grid, Skeleton } from '@mui/material';
import { Link, Stack, Typography } from '@mui/material';
import CardContainer from 'components/common/CardContainter';
import CreditCard from 'components/sections/dashboard/creditCards/CreditCard';
import axiosInstance from 'helpers/axios';
import { Source } from 'interfaces/sourceInterface';
import { useEffect, useState } from 'react';
import { Fragment } from 'react/jsx-runtime';
import { endpoints } from 'routes/endpoints';
import paths from 'routes/path';
import SimpleBar from 'simplebar-react';

/* ---------------------------- Credit Card Data----------------------------- */

const MyCards = () => {
  const [datas, setDatas] = useState<Source[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getSources = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(`${endpoints.sources.root}?limit=2`);
      const data = await response.data;
      setDatas(data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSources();
  }, []);
  return (
    <Fragment>
      <CardContainer title="My Sources" path={paths.sources.root} pathName="See All">
        <SimpleBar style={{ maxWidth: '100%', overflowX: 'auto' }}>
          <Grid
            container
            alignItems={'stretch'}
            justifyContent="space-between"
            spacing={4}
            sx={{ minWidth: { sm: '100%', md: 800 } }}
          >
            {isLoading ? (
              Array.from({ length: 2 }).map((_, index) => (
                <Grid key={index} item xs={12} md={6} sx={{ height: '100%' }}>
                  <Skeleton
                    variant="rounded"
                    width={'100%'}
                    height={260}
                    sx={{ borderRadius: '16px' }}
                  />
                </Grid>
              ))
            ) : datas && datas.length > 0 ? (
              datas.map((card) => (
                <Grid item xs={12} md={6} key={card.id}>
                  <Box sx={{ height: '100%', width: '100%' }}>
                    <CreditCard theme={card.color_card} cardData={card} />
                  </Box>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography textAlign="center" width="100%">
                  No Source Data
                </Typography>
              </Grid>
            )}
          </Grid>
        </SimpleBar>
      </CardContainer>
    </Fragment>
  );
};

export default MyCards;
