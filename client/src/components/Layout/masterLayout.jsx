import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const masterLayout = (props) => {
  return (
    <div>
      <Header />
      <main>
        <ToastContainer />
        {props.children}
      </main>
      <Footer />
    </div>
  );
};

export default masterLayout;
