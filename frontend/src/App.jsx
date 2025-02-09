import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// lazy imports
const Home = lazy(() => import("./pages/Home/Home"));
const ContactDetails = lazy(() =>
  import("./pages/ContactDetails/ContactDetails")
);

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact-details/:id" element={<ContactDetails />} />
        </Routes>
      </Router>
    </Suspense>
  );
};

export default App;
