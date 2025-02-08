import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";

// lazy imports
const Home = lazy(() => import("./pages/Home/Home"));

const App = () => {
  return (
    <Suspense fallback={true}>
      <Router>
        <Routes>
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Routes>
                  <Route path="/" element={<Home />} />
                </Routes>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </Suspense>
  );
};

export default App;
