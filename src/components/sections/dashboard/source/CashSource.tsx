import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import IconifyIcon from 'components/base/IconifyIcon';
import { Skeleton, Typography } from '@mui/material';
import { Source } from 'interfaces/sourceInterface';
import { useEffect, useState } from 'react';
import axiosInstance from 'helpers/axios';
import { endpoints } from 'routes/endpoints';
import { Stack } from '@mui/material';
import CreditCard from '../creditCards/CreditCard';

const CashSource = () => {
  const [datas, setDatas] = useState<Source[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getSources = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(endpoints.sources.root);
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

  console.log(datas);

  return (
    <Accordion sx={{ bgcolor: 'white', boxShadow: 'none' }}>
      <AccordionSummary
        expandIcon={<IconifyIcon icon={'ic:round-expand-more'} />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Typography component="span">Cash</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack direction="column" justifyContent="space-between" gap={4} sx={{ minWidth: 800 }}>
          {isLoading
            ? Array.from({ length: 2 }).map((_, index) => (
                <Skeleton
                  key={index}
                  variant="rounded"
                  width={'100%'}
                  height={260}
                  sx={{ borderRadius: '16px' }}
                />
              ))
            : datas &&
              datas.map((card) => (
                <CreditCard key={card.id} theme={card.color_card} cardData={card} />
              ))}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default CashSource;
