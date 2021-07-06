import Tangram from "../components/tangram";
import tangrams from "../assets/tangrams.json";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeColor, makeAnnotation } from "../components/util";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import data from "../assets/overview1-3.json";

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
    alignItems: "center",
  },
  gridList: {
    width: "100%",
    height: "100%",
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
  table: {
    minWidth: 650,
    marginLeft: "5vh",
    marginTop: "1vh",
    marginBottom: "1vh",
    width: "95%",
  },
}));

function shuffle(array) {
  var currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export default function Overview(props) {
  const classes = useStyles();
  const router = useRouter();
  const [annotations, setAnnotations] = useState();
  const [shuffleClicked, setShuffle] = useState(0);

  useEffect(() => {
    setAnnotations(shuffle(data));
  }, [shuffleClicked]);

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
          <Button
            color="inherit"
            onClick={() => {
              router.push("/");
            }}
          >
            Home
          </Button>
          <Typography variant="h6" align="center" className={classes.title}>
            Overview
          </Typography>
          <Button
            color="inherit"
            onClick={() => {
              setShuffle(shuffleClicked + 1);
            }}
          >
            Shuffle
          </Button>
        </Toolbar>
      </AppBar>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Tangram</TableCell>
              <TableCell align="center">File</TableCell>
              <TableCell align="center">Worker</TableCell>
              <TableCell align="center">Whole</TableCell>
              <TableCell align="center">Piece</TableCell>
              <TableCell align="center">Version</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {annotations ? (
              annotations.map((value) => {
                var workerId = value["workerId"];
                var colorInfo = makeColor(value["piece-annotation"]);
                var colors = colorInfo["colors"];
                var annList = makeAnnotation(colorInfo["annToColor"]);
                var tangramId = value["tangramId"];
                var assignmentId = value["assignmentId"];
                return (
                  <TableRow key={assignmentId}>
                    <TableCell style={{ width: "20%" }} align="center">
                      {
                        <Tangram
                          viewBox={tangrams[tangramId]["viewBox"]}
                          points={tangrams[tangramId]["points"]}
                          colors={colors}
                        ></Tangram>
                      }
                    </TableCell>
                    <TableCell style={{ width: "20%" }} align="center">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          router.push(
                            `/annotations/${encodeURIComponent(tangramId)}`
                          );
                        }}
                      >
                        {tangramId.replace(".svg", "")}
                      </Button>
                    </TableCell>
                    <TableCell style={{ width: "20%" }} align="center">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          router.push(
                            `/workers/${encodeURIComponent(workerId)}`
                          );
                        }}
                      >
                        {workerId}
                      </Button>
                    </TableCell>
                    <TableCell style={{ width: "10%" }} align="center">
                      {value["whole-annotation"].wholeAnnotation}
                    </TableCell>
                    <TableCell style={{ width: "20%" }} align="center">
                      {annList}
                    </TableCell>
                    <TableCell style={{ width: "10%" }} align="center">
                      {value["version"] ? value["version"] : "pilot1"}
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <></>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
