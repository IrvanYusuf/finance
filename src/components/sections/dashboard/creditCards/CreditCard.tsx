import { Box, Button, Card, Grid, IconButton, Link, Stack, Typography } from '@mui/material';
import BankLogoAlt from 'assets/bank-logo-alt.svg';
import BankLogo from 'assets/bank-logo.svg';
import ChipCardBlack from 'assets/chip_black.png';
import ChipCardWhite from 'assets/chip_white.png';
import IconifyIcon from 'components/base/IconifyIcon';
import Image from 'components/base/Image';
import { currencyFormat, maskAccountNumber } from 'helpers/utils';
import { Source } from 'interfaces/sourceInterface';
import paths from 'routes/path';

interface CreditCardProps {
  theme?: string;
  cardData: Source;
}

function getTextColorFromHex(hex: string): string {
  // Buang # kalau ada
  hex = hex.replace('#', '');

  // Ambil RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Rumus kontras luminance (YIQ)
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;

  return yiq >= 128 ? '#000000' : '#FFFFFF';
}

function hexToRgba(hex: string, alpha = 1) {
  hex = hex.replace('#', '');
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const getThemeStyles = (hex: string) => {
  const textColor = getTextColorFromHex(hex);

  const gradient = `linear-gradient(135deg, ${hexToRgba(hex, 1)} 0%, ${hexToRgba(hex, 0.7)} 100%)`;

  return {
    cardBg: gradient,
    textColor,
    chipCard: textColor === '#FFFFFF' ? ChipCardWhite : ChipCardBlack,
    bankLogo: textColor === '#FFFFFF' ? BankLogo : BankLogoAlt,
    cardGradient: gradient,
    borderStyle: 1,
    labelColor: textColor,
  };
};

const CreditCard = ({ theme = '#FFFFFF', cardData }: CreditCardProps) => {
  const { cardBg, textColor, cardGradient, borderStyle, bankLogo, chipCard, labelColor } =
    getThemeStyles(theme);

  const { account_holder, name, account_number, type, balance, id } = cardData;

  return (
    <Card
      sx={{
        flexGrow: 1,
        overflow: 'hidden',
        background: cardBg,
        color: textColor,
        border: 1,
        borderColor: 'action.focus',
        position: 'relative',
        height: '100%',
      }}
    >
      <Box
        sx={{
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          backgroundColor: 'white',
          opacity: 0.6,
          position: 'absolute',
          right: -20,
          top: -50,
        }}
      ></Box>
      <Box
        sx={{
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          backgroundColor: 'white',
          opacity: 0.6,
          position: 'absolute',
          left: -20,
          bottom: -50,
        }}
      ></Box>
      <Stack sx={{ gap: 4, px: { xs: 2.5, md: 3 }, pt: 3, pb: { xs: 2, md: 3 } }}>
        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Stack direction="row" sx={{ alignItems: 'center', gap: 3 }}>
            <div>
              <Typography
                sx={{
                  color: labelColor,
                  fontSize: { xs: 'overline.fontSize', md: 'caption.fontSize' },
                  textTransform: 'capitalize',
                }}
              >
                Balance
              </Typography>
              <Typography sx={{ fontSize: { xs: 'body2.fontSize', md: 'h4.fontSize' } }}>
                {currencyFormat(balance)}
              </Typography>
            </div>
            <Stack direction="row" gap={3}>
              <Box
                component={Link}
                href={paths.sources.topUp(id)}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  alignItems: 'center',
                  color: textColor,
                  ':hover': {
                    color: textColor,
                  },
                }}
              >
                <IconifyIcon
                  icon="mdi:plus-circle"
                  width="24px"
                  height="24px"
                  style={{ cursor: 'pointer', color: textColor }}
                />
                Top Up
              </Box>
              <Box
                onClick={() => {}}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  alignItems: 'center',
                }}
              >
                <IconifyIcon
                  icon="mdi:edit-circle"
                  width="24px"
                  height="24px"
                  onClick={() => {}}
                  style={{ cursor: 'pointer', color: textColor }}
                />
                Edit
              </Box>
            </Stack>
          </Stack>
          <Image src={chipCard} alt="chip-card" sx={{ width: { xs: 30, md: 35 } }} />
        </Stack>
        <Grid container spacing={5}>
          <Grid item xs={4}>
            <Stack sx={{ gap: 0.5 }}>
              <Typography
                sx={{
                  color: labelColor,
                  fontSize: { xs: 'overline.fontSize', md: 'caption.fontSize' },
                }}
              >
                CARD HOLDER
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: 'subtitle1.fontSize', md: 'body1.fontSize' },
                }}
                fontWeight={600}
              >
                {account_holder}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <Stack sx={{ gap: 0.5 }}>
              <Typography
                sx={{
                  color: labelColor,
                  fontSize: { xs: 'overline.fontSize', md: 'caption.fontSize' },
                }}
              >
                NAME CARD
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: 'subtitle1.fontSize', md: 'body1.fontSize' },
                }}
                fontWeight={600}
              >
                {name}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <Stack sx={{ gap: 0.5 }}>
              <Typography
                sx={{
                  color: labelColor,
                  fontSize: { xs: 'overline.fontSize', md: 'caption.fontSize' },
                }}
              >
                TYPE CARD
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: 'subtitle1.fontSize', md: 'body1.fontSize' },
                }}
                fontWeight={600}
              >
                {type}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Stack>
      <Stack
        direction="row"
        gap={2}
        sx={{
          background: cardGradient,
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: 1.25,
          px: 3,
          pt: { xs: 2, md: 3 },
          pb: { xs: 2, md: 4 },
          borderTop: borderStyle,
          borderColor: 'action.focus',
        }}
      >
        {account_number && (
          <>
            <Typography
              sx={{
                fontSize: { xs: 'body1.fontSize', md: 'h3.fontSize' },
              }}
            >
              {maskAccountNumber(account_number!)}
            </Typography>
          </>
        )}
        {type !== 'cash' && <Image src={bankLogo} alt="bank-logo" sx={{ width: 50 }} />}
      </Stack>
    </Card>
  );
};

export default CreditCard;
