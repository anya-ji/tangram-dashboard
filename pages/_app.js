import "../styles/globals.css";
import HeadTitle from "../components/headTitle";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <HeadTitle />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
