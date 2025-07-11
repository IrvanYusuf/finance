export const rootPaths = {
  root: '/',
  pagesRoot: '/',
  authRoot: '/authentication',
  errorRoot: '/error',
};

/**
 * Object containing various paths used in the application.
 */
const paths = {
  default: `${rootPaths.root}`,
  transaction: {
    root: `${rootPaths.pagesRoot}transactions`,
    detail: (id: string) => `${rootPaths.pagesRoot}transactions/${id}/detail`,
    new: `${rootPaths.pagesRoot}transactions/new`,
  },
  sources: {
    root: `${rootPaths.pagesRoot}sources`,
    new: `${rootPaths.pagesRoot}sources/new`,
    topUp: (id: string) => `${rootPaths.pagesRoot}sources/${id}/top-up`,
  },
  categories: {
    root: `${rootPaths.pagesRoot}categories`,
    new: `${rootPaths.pagesRoot}categories/new`,
  },
  investments: {
    root: `${rootPaths.pagesRoot}investments`,
    new: `${rootPaths.pagesRoot}investments/new`,
  },
  investmentTransactions: {
    root: `${rootPaths.pagesRoot}investment-transaction`,
    new: `${rootPaths.pagesRoot}investment-transaction/new`,
  },
  loans: `${rootPaths.pagesRoot}loans`,
  accounts: `${rootPaths.pagesRoot}accounts`,
  login: `${rootPaths.authRoot}/login`,
  signup: `${rootPaths.authRoot}/sign-up`,
  forgetPassword: `${rootPaths.authRoot}/forget-password`,
  resetPassword: `${rootPaths.authRoot}/reset-password`,
  notFound: `${rootPaths.errorRoot}/404`,
};

export default paths;
