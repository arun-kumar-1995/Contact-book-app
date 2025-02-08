import Sidebar from "../components/Sidenav/Sidebar";

export const AppLayout = ({ children }) => {
  return (
    <>
      <Sidebar />
      <main>{children}</main>
    </>
  );
};
