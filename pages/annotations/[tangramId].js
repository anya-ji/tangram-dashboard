import Tangram from "../../components/tangram";
import tangrams from "../../assets/tangrams.json";
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
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useRouter } from "next/router";
import * as FB from "../api/firebase";
import { useState, useEffect } from "react";
import { makeColor } from "../../components/util";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    alignItems: "center",
  },
  gridList: {
    width: "100%",
    height: "100%",
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
}));

export default function Annotations(props) {
  const classes = useStyles();
  const router = useRouter();
  const { tangramId } = router.query;
  const [annotations, setAnnotations] = useState();

  useEffect(() => {
    if (tangramId) {
      const name = tangramId.replace(".svg", "");
      FB.getAnnotations(name)
        .then((doc) => {
          if (doc.exists) {
            setAnnotations(doc.data());
          }
        })
        .catch((e) => console.log(e));
    }
  }, [tangramId]);

  function makeAnnotation(annToColor, workerId) {
    return (
      <>
        {Object.entries(annToColor).map(([ann, color]) => {
          return (
            <span style={{ color: color, marginRight: "18px" }}>{ann}</span>
          );
        })}
        <p>{"Worker: " + workerId}</p>
      </>
    );
  }

  if (!tangramId) {
    return <></>;
  } else {
    const viewBox = tangrams[tangramId]["viewBox"];
    const points = tangrams[tangramId]["points"];
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Button
              color="inherit"
              onClick={() => {
                router.back();
              }}
            >
              Back
            </Button>
            <Typography variant="h6" align="center" className={classes.title}>
              {"Annotations: " + tangramId.replace(".svg", "")}
            </Typography>
          </Toolbar>
        </AppBar>
        <div style={{ height: "30vh", margin: "1vh" }}>
          <Tangram
            viewBox={viewBox}
            points={points}
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
        </div>

        <GridList
          cols={2}
          className={classes.gridList}
          style={{ padding: "1vh" }}
        >
          {annotations ? (
            Object.entries(annotations).map(([workerId, value]) => {
              const colorInfo = makeColor(value["piece-annotation"]);
              const colors = colorInfo["colors"];
              const annList = makeAnnotation(colorInfo["annToColor"], workerId);
              return (
                <GridListTile key={workerId} rows={2}>
                  <Tangram
                    viewBox={viewBox}
                    points={points}
                    colors={colors}
                  ></Tangram>

                  <GridListTileBar
                    title={value["whole-annotation"].wholeAnnotation}
                    subtitle={annList}
                    style={{ height: "15vh" }}
                    actionIcon={
                      <IconButton
                        // aria-label={`info about `}
                        className={classes.icon}
                        onClick={() => {
                          router.push(
                            `/workers/${encodeURIComponent(workerId)}`
                          );
                        }}
                      >
                        <AccountCircleIcon />
                      </IconButton>
                    }
                  ></GridListTileBar>
                </GridListTile>
              );
            })
          ) : (
            <></>
          )}
        </GridList>
      </div>
    );
  }
}
