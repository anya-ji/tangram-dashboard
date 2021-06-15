import Tangram from "../components/tangram";
import tangrams from "../assets/tangrams.json";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
// import InfoIcon from "@material-ui/icons/Info";
import Link from "next/link";
import { useRouter } from "next/router";
import * as FB from "./api/firebase";
import { useState, useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    flexGrow: 1,
  },
  gridList: {
    width: "100%",
    height: "100%",
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
}));

export default function Home() {
  const classes = useStyles();
  const router = useRouter();
  const [fileNameToCounts, setCounts] = useState({});
  useEffect(() => {
    FB.getCounts()
      .then((doc) => {
        if (doc.exists) {
          setCounts(doc.data());
        }
      })
      .catch((e) => console.log(e));
  }, []);

  if (!fileNameToCounts) {
    return <></>;
  }
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Tangrams
          </Typography>
          {/* <Button color="inherit">Login</Button> */}
        </Toolbar>
      </AppBar>

      <GridList
        cols={4}
        className={classes.gridList}
        style={{ margin: "1vh", padding: "1vh" }}
      >
        {fileNameToCounts ? (
          Object.entries(tangrams).map(([key, value]) => {
            const name = key.replace(".svg", "");
            if (
              fileNameToCounts[name] != undefined &&
              fileNameToCounts[name] !== 0
            ) {
              // if file exists in database and count is not 0
              return (
                <GridListTile
                  key={name}
                  rows={1.5}
                  onClick={() => {
                    router.push(`/annotations/${encodeURIComponent(key)}`);
                  }}
                >
                  <Tangram
                    viewBox={value["viewBox"]}
                    points={value["points"]}
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
                  <GridListTileBar
                    title={name}
                    subtitle={
                      <span>{fileNameToCounts[name] + " annotations"}</span>
                    }
                    // actionIcon={
                    //   <IconButton
                    //     aria-label={`info about `}
                    //     className={classes.icon}
                    //   >
                    //     <InfoIcon />
                    //   </IconButton>
                    // }
                  />
                </GridListTile>
              );
            }
          })
        ) : (
          <></>
        )}
      </GridList>
    </div>
  );
}

{
}
