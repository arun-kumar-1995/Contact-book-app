import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Lazy imports
const Home = lazy(() => import("./pages/Home/Home"));
const ContactDetails = lazy(() =>
  import("./pages/ContactDetails/ContactDetails")
);
const UploadContact = lazy(() => import("./pages/UploadContact/UploadContact"));
const PageNotFound = lazy(() => import("./pages/PageNotFound/PageNotFound"));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact-details/:id" element={<ContactDetails />} />
          <Route path="/upload-contacts" element={<UploadContact />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
