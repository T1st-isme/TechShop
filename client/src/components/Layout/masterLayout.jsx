import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet";

const masterLayout = (props) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={props.description} />
        <meta name="keywords" content={props.keywords} />
        <meta name="author" content={props.author} />
        <title>{props.title}</title>
      </Helmet>
      <Header />
      <Toaster />
      <main style={{ minHeight: "70vh" }}>{props.children}</main>
      <Footer />
    </div>
  );
};

masterLayout.defaultProps = {
  title: "TechShop",
  description: "Một trang web bán đồ công nghệ hàng đầu.",
  keywords: "TechShop",
  author: "T1st",
};

export default masterLayout;
