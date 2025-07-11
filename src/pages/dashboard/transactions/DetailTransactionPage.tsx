import { Container } from '@mui/material';
import { useParams } from 'react-router-dom';

const DetailTransactionPage = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <Container>
      <div>DetailTransactionPage {id} </div>
    </Container>
  );
};

export default DetailTransactionPage;
