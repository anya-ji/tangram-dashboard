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
// import InfoIcon from "@material-ui/icons/Info";
import { useRouter } from "next/router";
import * as FB from "../api/firebase";
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
  const colorOptions = {
    1: "red",
    2: "green",
    3: "blue",
    4: "gold",
    5: "purple",
    6: "deeppink",
    7: "orange",
  };

  useEffect(() => {
    if (tangramId) {
      const name = tangramId.replace(".svg", "");
      FB.getAnnotations(name)
        .then((doc) => {
          if (doc.exists) {
            setAnnotations(doc.data());
            console.log(doc.data());
          }
        })
        .catch((e) => console.log(e));
    }
  }, [tangramId]);

  function makeColor(ann) {
    var annToColor = {};
    var pieceToColor = [];
    for (var i = 1; i < 8; i++) {
      const color = annToColor[ann[i]];
      if (color) {
        // annotation exists
        pieceToColor[i - 1] = color;
      } else {
        // unique annotation
        const newColor = colorOptions[i];
        annToColor[ann[i]] = newColor;
        pieceToColor[i - 1] = newColor;
      }
    }
    return pieceToColor;
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
                router.push("/");
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
          cols={4}
          className={classes.gridList}
          style={{ padding: "1vh" }}
        >
          {annotations ? (
            Object.entries(annotations).map(([workerId, value]) => {
              const colors = makeColor(value["piece-annotation"]);
              console.log(colors);
              return (
                <GridListTile key={workerId} rows={1.5}>
                  <Tangram
                    viewBox={viewBox}
                    points={points}
                    colors={colors}
                  ></Tangram>
                  <GridListTileBar
                    title={value["whole-annotation"].wholeAnnotation}
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
            })
          ) : (
            <></>
          )}
        </GridList>
      </div>
    );
  }
}
