import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";

const masterLayout = (props) => {
  return (
    <div>
      <Header />
      <main>{props.children}</main>
      <Footer />
    </div>
  );
};

export default masterLayout;
