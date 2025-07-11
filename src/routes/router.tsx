import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import paths, { rootPaths } from './path';
import ProtectedRoute from 'guard/ProtectedRoute';
import GuestRoute from 'guard/GuestRoute';

/* ---------------- Lazy loads various components ------------------------- */
const App = lazy(() => import('App'));
const MainLayout = lazy(() => import('layouts/main-layout'));
const AuthLayout = lazy(() => import('layouts/auth-layout'));
const Dashboard = lazy(() => import('pages/dashboard'));

// sources
const Sources = lazy(() => import('pages/dashboard/sources'));
const SourceDetailPage = lazy(() => import('pages/dashboard/sources/SourceDetailPage'));
const NewSourcePage = lazy(() => import('pages/dashboard/sources/NewSourcePage'));

// transactions
const Transactions = lazy(() => import('pages/dashboard/transactions'));
const TransactionNewPage = lazy(() => import('pages/dashboard/transactions/NewTransactionPage'));
const TransactionDetailPage = lazy(
  () => import('pages/dashboard/transactions/DetailTransactionPage'),
);

// top up
const TopUpPage = lazy(() => import('pages/dashboard/sources/TopUpPage'));

// category
const CategoryPage = lazy(() => import('pages/dashboard/categories'));
const NewCategoryPage = lazy(() => import('pages/dashboard/categories/NewCategoryPage'));

// investment
const InvestmentPage = lazy(() => import('pages/dashboard/investments'));
const NewInvestmentPage = lazy(() => import('pages/dashboard/investments/NewInvestmentPage'));

// investment transaction
const InvestmentTransaction = lazy(() => import('pages/dashboard/investmentTransaction'));
const NewInvestmentTransactionPage = lazy(
  () => import('pages/dashboard/investmentTransaction/NewInvestmentTransactionPage'),
);

const Spinner = lazy(() => import('components/loading/Splash'));
const LoadingProgress = lazy(() => import('components/loading/LoadingProgress'));

const LoginPage = lazy(() => import('pages/authentication/login'));
const SignUpPage = lazy(() => import('pages/authentication/signup'));
const ForgetPasswordPage = lazy(() => import('pages/authentication/forget-password'));
const ResetPasswordPage = lazy(() => import('pages/authentication/reset-password'));

const NotFoundPage = lazy(() => import('pages/not-found'));
/* -------------------------------------------------------------------------- */

/**
 * @Defines the routes for the application using React Router.
 */
export const routes = [
  {
    element: (
      <Suspense fallback={<Spinner />}>
        <App />
      </Suspense>
    ),
    children: [
      {
        path: paths.default,
        element: (
          <ProtectedRoute>
            <MainLayout>
              <Suspense fallback={<LoadingProgress />}>
                <Outlet />
              </Suspense>
            </MainLayout>
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: paths.transaction.root,
            element: <Transactions />,
          },
          {
            path: paths.transaction.detail(':id'),
            element: <TransactionDetailPage />,
          },
          {
            path: paths.transaction.new,
            element: <TransactionNewPage />,
          },
          {
            path: paths.sources.root,
            element: <Sources />,
          },
          {
            path: paths.sources.new,
            element: <NewSourcePage />,
          },
          {
            path: paths.sources.topUp(':id'),
            element: <TopUpPage />,
          },
          {
            path: paths.categories.root,
            element: <CategoryPage />,
          },
          {
            path: paths.categories.new,
            element: <NewCategoryPage />,
          },
          {
            path: paths.investments.root,
            element: <InvestmentPage />,
          },
          {
            path: paths.investments.new,
            element: <NewInvestmentPage />,
          },
          {
            path: paths.investmentTransactions.root,
            element: <InvestmentTransaction />,
          },
          {
            path: paths.investmentTransactions.new,
            element: <NewInvestmentTransactionPage />,
          },
        ],
      },
      {
        path: rootPaths.authRoot,
        element: (
          <GuestRoute>
            <AuthLayout />
          </GuestRoute>
        ),
        children: [
          {
            path: paths.login,
            element: <LoginPage />,
          },
          {
            path: paths.signup,
            element: <SignUpPage />,
          },
          {
            path: paths.forgetPassword,
            element: <ForgetPasswordPage />,
          },
          {
            path: paths.resetPassword,
            element: <ResetPasswordPage />,
          },
        ],
      },
      {
        path: rootPaths.errorRoot,
        children: [
          {
            path: paths.notFound,
            element: <NotFoundPage />,
          },
        ],
      },
      {
        path: '*',
        element: <Navigate to={paths.notFound} replace />,
      },
    ],
  },
];

const router = createBrowserRouter(routes, {
  basename: '/finance',
});

export default router;
