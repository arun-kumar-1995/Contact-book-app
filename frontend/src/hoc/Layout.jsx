import { AppLayout } from "../layouts/AppLayout";

export const Layout = (Component) => {
  return (props) => (
    <AppLayout>
      <Component {...props} />
    </AppLayout>
  );
};
