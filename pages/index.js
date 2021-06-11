import styles from "../styles/Home.module.css";
import Tangram from "./tangram";
import points from "../assets/points.json";

export default function Home() {
  // var points = JSON.parse(pointsJson);
  return (
    <div className={styles.container}>
      {Object.entries(points).map(([key, value]) => {
        // Pretty straightforward - use key for the key and value for the value.
        // Just to clarify: unlike object destructuring, the parameter names don't matter here.
        return (
          <Tangram
            points={value}
            colors={[
              "lightgray",
              "lightgray",
              "lightgray",
              "lightgray",
              "lightgray",
              "lightgray",
              "lightgray",
            ]}
          ></Tangram>
        );
      })}

      {/* {points.forEach((e) => {
      //   console.log(e.key);
        
      // })} */}
    </div>
  );
}
