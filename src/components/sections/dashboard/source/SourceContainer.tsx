// import Accordion from '@mui/material/Accordion';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import AccordionDetails from '@mui/material/AccordionDetails';
import IconifyIcon from 'components/base/IconifyIcon';
import { Skeleton, Typography, Accordion, AccordionSummary } from '@mui/material';
import { Source } from 'interfaces/sourceInterface';
import { Stack } from '@mui/material';
import CreditCard from '../creditCards/CreditCard';
import { AccordionDetails } from '@mui/material';

interface ISourceContainer {
  isLoading: boolean;
  datas: Source[];
  title: string;
  isExpanded: boolean;
}
const SourceContainer = (source: ISourceContainer) => {
  return (
    <Accordion
      defaultExpanded={source.isExpanded}
      square={true}
      sx={{
        bgcolor: 'white',
        boxShadow: 'none',
        borderRadius: '10px',
      }}
    >
      <AccordionSummary
        expandIcon={<IconifyIcon icon={'ic:round-expand-more'} />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Typography component="span">{source.title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack direction="column" justifyContent="space-between" gap={4}>
          {source.isLoading ? (
            Array.from({ length: 2 }).map((_, index) => (
              <Skeleton
                key={index}
                variant="rounded"
                width={'100%'}
                height={260}
                sx={{ borderRadius: '16px' }}
              />
            ))
          ) : source.datas && source.datas.length > 0 ? (
            source.datas.map((card) => (
              <CreditCard key={card.id} theme={card.color_card} cardData={card} />
            ))
          ) : (
            <Typography textAlign={'center'} width={'100%'}>
              No Source Data
            </Typography>
          )}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default SourceContainer;
