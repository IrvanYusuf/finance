import { Card } from '@mui/material';
import { Link } from '@mui/material';
import { Button } from '@mui/material';
import { Box } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import NewButton from 'components/base/NewButton';
import SourceContainer from 'components/sections/dashboard/source/SourceContainer';
import axiosInstance from 'helpers/axios';
import { Source } from 'interfaces/sourceInterface';
import { useEffect, useState } from 'react';
import { endpoints } from 'routes/endpoints';
import paths from 'routes/path';

const SourcesPage = () => {
  const [datas, setDatas] = useState<Source[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cashSource, setCashSource] = useState<Source[]>();
  const [bankSource, setBankSource] = useState<Source[]>();
  const [eWalletSource, setEWalletSource] = useState<Source[]>();

  const getSources = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(endpoints.sources.all);
      const data = await response.data;
      setDatas(data.data);
      setCashSource(data.data.cash);
      setBankSource(data.data.bank);
      setEWalletSource(data.data.ewallet);
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
    <Box sx={{ pt: 3, pb: 2.5 }}>
      <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'end', mb: 2 }}>
        <NewButton text="New" path={paths.sources.new} />
      </Box>
      <SourceContainer title="Bank" datas={bankSource!} isLoading={isLoading} isExpanded={true} />
      <Box sx={{ my: 1 }}>
        <SourceContainer
          title="Cash"
          datas={cashSource!}
          isLoading={isLoading}
          isExpanded={false}
        />
      </Box>
      <Box>
        <SourceContainer
          title="E-Wallet"
          datas={eWalletSource!}
          isLoading={isLoading}
          isExpanded={false}
        />
      </Box>
    </Box>
  );
};

export default SourcesPage;
