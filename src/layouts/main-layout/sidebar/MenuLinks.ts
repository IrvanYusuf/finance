import { IconifyIcon } from '@iconify/react/dist/iconify.js';
import { SvgIconProps } from '@mui/material';
import CategoryIcon from 'components/icons/menu-icons/CategoryIcon';
import CreditCardIcon from 'components/icons/menu-icons/CreditCardIcon';
import HomeIcon from 'components/icons/menu-icons/HomeIcon';
import InvestIcon from 'components/icons/menu-icons/InvestIcon';
import InvestmentTransactionIcon from 'components/icons/menu-icons/InvestmentTransactionIcon';
import LoanIcon from 'components/icons/menu-icons/LoanIcon';
import ServiceIcon from 'components/icons/menu-icons/ServiceIcon';
import SettingsIcon from 'components/icons/menu-icons/SettingsIcon';
import SignInIcon from 'components/icons/menu-icons/SignInIcon';
import SignUpIcon from 'components/icons/menu-icons/SignUpIcon';
import TransferIcon from 'components/icons/menu-icons/TransferIcon';
import UserIcon from 'components/icons/menu-icons/UserIcon';
import paths from 'routes/path';

export enum linkEnum {
  Dashboard = 'dashboard',
  Transactions = 'transactions',
  Accounts = 'accounts',
  Investments = 'investments',
  Source = 'Sources',
  Loans = 'loans',
  Categories = 'Categories',
  Setting = 'Setting',
  Login = 'login',
  Signup = 'sign-up',
  ForgetPassword = 'forget-password',
  ResetPassword = 'reset-password',
  InvestmentTransaction = 'investment Transaction',
}

export interface MenuLinkType {
  id: number;
  title: string;
  link: string;
  icon?: (props: SvgIconProps) => JSX.Element;
  available: boolean;
}
export const menuLinks: MenuLinkType[] = [
  {
    id: 1,
    title: linkEnum.Dashboard,
    link: '/',
    icon: HomeIcon,
    available: true,
  },
  {
    id: 2,
    title: linkEnum.Transactions,
    link: paths.transaction.root,
    icon: TransferIcon,
    available: true,
  },
  {
    id: 3,
    title: linkEnum.Accounts,
    link: '#!',
    icon: UserIcon,
    available: false,
  },
  {
    id: 4,
    title: linkEnum.Investments,
    link: '#!',
    icon: InvestIcon,
    available: false,
  },
  {
    id: 5,
    title: linkEnum.Source,
    link: paths.sources.root,
    icon: CreditCardIcon,
    available: true,
  },
  // {
  //   id: 6,
  //   title: linkEnum.Loans,
  //   link: '#!',
  //   icon: LoanIcon,
  //   available: false,
  // },
  {
    id: 7,
    title: linkEnum.Categories,
    link: paths.categories.root,
    icon: CategoryIcon,
    available: true,
  },
  {
    id: 8,
    title: linkEnum.Investments,
    link: paths.investments.root,
    icon: InvestIcon,
    available: true,
  },
  {
    id: 9,
    title: linkEnum.InvestmentTransaction,
    link: paths.investmentTransactions.root,
    icon: TransferIcon,
    available: true,
  },
  {
    id: 10,
    title: linkEnum.Signup,
    link: '/authentication/sign-up',
    icon: SignUpIcon,
    available: false,
  },
];
