import Sidebar from "../components/Sidenav/Sidebar";

export const AppLayout = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <Sidebar />
      <main
        style={{
          marginLeft: "20rem",
          width: "100%",
        }}
      >
        {children}
      </main>
    </div>
  );
};
