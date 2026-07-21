import {
  lazy,
  Suspense
} from "react";

import {
  Navigate,
  Route,
  Routes
} from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute.jsx";

const Analytics = lazy(
  () => import("./pages/Analytics.jsx")
);

const Dashboard = lazy(
  () => import("./pages/Dashboard.jsx")
);

const Expenses = lazy(
  () => import("./pages/Expenses.jsx")
);

const Investments = lazy(
  () => import("./pages/Investments.jsx")
);

const Login = lazy(
  () => import("./pages/Login.jsx")
);

const NotFound = lazy(
  () => import("./pages/NotFound.jsx")
);

const Onboarding = lazy(
  () => import("./pages/Onboarding.jsx")
);

const RecurringExpenses = lazy(
  () => import("./pages/RecurringExpenses.jsx")
);

const Register = lazy(
  () => import("./pages/Register.jsx")
);

const Savings = lazy(
  () => import("./pages/Savings.jsx")
);

const Settings = lazy(
  () => import("./pages/Settings.jsx")
);

function App() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            minHeight: "100vh",
            display: "grid",
            placeItems: "center"
          }}
        >
          Loading...
        </div>
      }
    >
      <Routes>
        <Route
          path="/onboarding"
          element={
            <ProtectedRoute>
              <Onboarding />
            </ProtectedRoute>
          }
        />

        <Route
          path="/"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/expenses"
          element={
            <ProtectedRoute>
              <Expenses />
            </ProtectedRoute>
          }
        />

        <Route
          path="/savings"
          element={
            <ProtectedRoute>
              <Savings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recurring"
          element={
            <ProtectedRoute>
              <RecurringExpenses />
            </ProtectedRoute>
          }
        />

        <Route
          path="/investments"
          element={
            <ProtectedRoute>
              <Investments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </Suspense>
  );
}

export default App;
