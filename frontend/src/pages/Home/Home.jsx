import Contacts from "../../components/Contacts/Contacts";
import { Layout } from "../../hoc/Layout";
const Home = () => {
  return (
    <div className="home-page">
      <Contacts />
    </div>
  );
};

export default Layout(Home);
