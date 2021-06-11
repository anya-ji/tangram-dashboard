import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Tangram from "./tangram";
import { tangramList } from "./tangramList";

export default function Home() {
  return (
    <div className={styles.container}>
      <Tangram svg={tangramList["page1-13.svg"]}></Tangram>
    </div>
  );
}
