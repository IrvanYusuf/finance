import { Box, Card, List, ListItem, Skeleton, Stack, Typography } from '@mui/material';
import CardContainer from 'components/common/CardContainter';
import CoinIcon from 'components/icons/card-icons/CoinIcon';
import CreditCardIcon from 'components/icons/card-icons/CreditCardIcon';
import PaypalIcon from 'components/icons/card-icons/PaypalIcon';
import axiosInstance from 'helpers/axios';
import { currencyFormat } from 'helpers/utils';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { endpoints } from 'routes/endpoints';
import paths from 'routes/path';

/* ---------------------------- Transaction Data ---------------------------- */
const transactions = [
  {
    id: 1,
    icon: CreditCardIcon,
    bgcolor: 'warning.light',
    title: 'Deposit from my Card',
    type: 'debit',
    date: '25 January 2021',
    amount: 500,
    amountColor: 'error.main',
  },
  {
    id: 2,
    icon: PaypalIcon,
    bgcolor: 'neutral.light',
    title: 'Deposit Paypal',
    type: 'credit',
    date: '25 January 2021',
    amount: 500,
    amountColor: 'success.main',
  },
  {
    id: 3,
    icon: CoinIcon,
    bgcolor: 'success.lighter',
    title: 'Jemi Wilson',
    type: 'credit',
    date: '25 January 2021',
    amount: 500,
    amountColor: 'success.main',
  },
];
/* -------------------------------------------------------------------------- */

const RecentTransactions = () => {
  const [recentTransactions, setRecentTransactions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getRecentTransactions = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(`${endpoints.transactions.root}?limit=4`);
      const data = await response.data.data;
      setRecentTransactions(data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getRecentTransactions();
  }, []);

  return (
    <Box>
      {isLoading ? (
        <Skeleton variant="rounded" width={'100%'} height={100} />
      ) : (
        <CardContainer title="Recent Transactions" path={paths.transaction.root} pathName="See All">
          {recentTransactions.length > 0 ? (
            <Card sx={{ p: { xs: 0.5, xl: 1 }, bgcolor: 'transparent' }}>
              <List
                disablePadding
                sx={{ color: 'primary.main', '& > *:not(:last-child)': { mb: 2.5 } }}
              >
                {recentTransactions.map((recent) => (
                  <ListItem
                    key={recent.id}
                    sx={{
                      cursor: 'default',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 3,
                      '&:hover': {
                        '& .title': {
                          color: 'text.secondary',
                        },
                        '& .date': {
                          color: 'neutral.main',
                          transform: 'translateX(2px)',
                        },
                      },
                    }}
                    disablePadding
                  >
                    <Stack
                      direction="row"
                      sx={{
                        width: 55,
                        height: 55,
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: recent.type === 'expense' ? 'warning.light' : 'success.lighter',
                        borderRadius: '50%',
                      }}
                    >
                      {recent.type === 'expense' ? (
                        <CreditCardIcon sx={{ mb: 0.75 }} />
                      ) : (
                        <CoinIcon sx={{ mb: 0.75 }} />
                      )}
                    </Stack>
                    <Stack
                      direction="row"
                      sx={{
                        flexGrow: 1,
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Stack gap={1}>
                        <Typography
                          className="title"
                          sx={{
                            color: 'primary.darker',
                            fontSize: { xs: 'subtitle1.fontSize', md: 'body2.fontSize' },
                          }}
                        >
                          {recent.name}
                        </Typography>
                        <Typography
                          className="date"
                          sx={{
                            color: 'primary.light',
                            fontSize: {
                              xs: 'caption.fontSize',
                              sm: 'caption.fontSize',
                              md: 'body1.fontSize',
                            },
                          }}
                        >
                          {recent.date}
                        </Typography>
                      </Stack>
                      <Typography
                        sx={{
                          color: recent.type === 'expense' ? 'error.main' : 'success.main',
                          fontSize: {
                            xs: 'caption.fontSize',
                            sm: 'button.fontSize',
                            md: 'body1.fontSize',
                          },
                          fontWeight: '600',
                        }}
                      >
                        {recent.type !== 'expense' ? '+' : '-'} {currencyFormat(recent.amount)}
                      </Typography>
                    </Stack>
                  </ListItem>
                ))}
              </List>
            </Card>
          ) : (
            <Typography textAlign={'center'}>No Transaction Data</Typography>
          )}
        </CardContainer>
      )}
    </Box>
  );
};

export default RecentTransactions;
