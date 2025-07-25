import { Box, Card, CardContent, Link, Stack, Typography } from '@mui/material';
import { ReactNode } from 'react';

interface CardContainerProps {
  title: string;
  children: ReactNode;
  path?: string;
  pathName?: string;
}

const CardContainer = ({ title, children, path, pathName }: CardContainerProps) => {
  return (
    <Stack sx={{ overflow: 'auto', height: 1, justifyContent: 'space-between' }}>
      <Box
        sx={{
          mb: { xs: 1.5, sm: 2.5 },
          mt: { xs: 1, sm: 3 },
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography
          sx={{
            fontSize: {
              xs: 'body2.fontSize',
              md: 'h6.fontSize',
              xl: 'h3.fontSize',
            },
            fontWeight: 600,
          }}
        >
          {title}
        </Typography>
        <Link
          variant="h5"
          href={path!}
          sx={{
            fontSize: { xs: 'caption.fontSize', md: 'body1.fontSize', xl: 'h5.fontSize' },
            fontWeight: 600,
            pr: 1,
          }}
        >
          {pathName}
        </Link>
      </Box>
      <Card sx={{ backgroundColor: 'common.white', width: 1, flex: 1 }}>
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: 1,
            width: 1,
            pb: 0,
          }}
        >
          {children}
        </CardContent>
      </Card>
    </Stack>
  );
};

export default CardContainer;
