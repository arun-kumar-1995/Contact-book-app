import Sidebar from "../components/Sidenav/Sidebar";

export const AppLayout = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <Sidebar />
      <main>{children}</main>
    </div>
  );
};
