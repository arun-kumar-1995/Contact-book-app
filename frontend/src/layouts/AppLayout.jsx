import { Sidenav } from "../components/Sidenav/Sidenav";
export const AppLayout = ({ children }) => {
  return (
    <>
      <Sidenav />
      <main>{children}</main>
    </>
  );
};