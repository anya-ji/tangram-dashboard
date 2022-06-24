import Tangram from "../../components/tangram";
import tangrams from "../../assets/tangrams.json";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useRouter } from "next/router";
import * as FB from "../api/firebase";
import { useState, useEffect } from "react";
import { makeColor, makeAnnotation } from "../../components/util";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import agreement from "../../assets/file_agreement.json";

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
  uptable: {
    minWidth: 650,
    marginLeft: "20%",
    marginRight: "20%",
    marginTop: "1vh",
    marginBottom: "1vh",
    width: "60%",
  },
}));

export default function Annotations(props) {
  const classes = useStyles();
  const router = useRouter();
  const { tangramId } = router.query;
  const [annotations, setAnnotations] = useState();
  var idx = 0;

  useEffect(() => {
    if (tangramId) {
      const name = tangramId.replace(".svg", "");
      FB.getAnnotations(name)
        .then((doc) => {
          if (doc.exists) {
            var d = doc.data();
            var annotationList = [];
            Object.entries(d).map(([workerId, value]) => {
              annotationList.push({ workerId: workerId, value: value });
            });
            annotationList.sort(
              (a, b) => a["value"].submittedAt - b["value"].submittedAt
            );
            setAnnotations(annotationList);
          }
        })
        .catch((e) => console.log(e));
    }
  }, [tangramId]);

  if (!tangramId) {
    return <></>;
  } else {
    const viewBox = tangrams[tangramId]["viewBox"];
    const points = tangrams[tangramId]["points"];
    const transform = tangrams[tangramId]["transform"];
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
            transform={transform}
          ></Tangram>
        </div>

        {/* <TableContainer component={Paper}>
          <Table className={classes.uptable} aria-label="simple table">
            <TableBody>
              <TableRow key="languages">
                <TableCell component="th" scope="row">
                  Segmentation agreement (1=lowest, 7=highest)
                </TableCell>
                <TableCell align="right">
                  {tangramId && agreement[tangramId.replace(".svg", "")]
                    ? agreement[tangramId.replace(".svg", "")]["segmentation"]
                    : ""}
                </TableCell>
              </TableRow>
              <TableRow key="eng-first">
                <TableCell component="th" scope="row">
                  Whole shape annotation agreement (0=lowest, 1=highest)
                </TableCell>
                <TableCell align="right">
                  {tangramId && agreement[tangramId.replace(".svg", "")]
                    ? agreement[tangramId.replace(".svg", "")]["whole"]
                    : ""}
                </TableCell>
              </TableRow>
              <TableRow key="where-learn">
                <TableCell component="th" scope="row">
                  By-part annotation agreement (0=lowest, 1=highest)
                </TableCell>
                <TableCell align="right">
                  {tangramId && agreement[tangramId.replace(".svg", "")]
                    ? agreement[tangramId.replace(".svg", "")]["piece"]
                    : ""}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer> */}

        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Index</TableCell>
                <TableCell align="center">Tangram</TableCell>
                <TableCell align="center">Worker</TableCell>
                <TableCell align="center">Whole</TableCell>
                <TableCell align="center">Piece</TableCell>
                <TableCell align="center">Version</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {annotations ? (
                annotations.map((element) => {
                  var value = element["value"];
                  var workerId = element["workerId"];
                  var colorInfo = makeColor(value["piece-annotation"]);
                  var colors = colorInfo["colors"];
                  var annList = makeAnnotation(colorInfo["annToColor"]);
                  idx++;

                  return (
                    <TableRow key={workerId}>
                      <TableCell align="center" height="150px" width="5%">
                        {idx}
                      </TableCell>
                      <TableCell align="center" height="150px" width="20%">
                        {
                          <Tangram
                            viewBox={viewBox}
                            points={points}
                            colors={colors}
                            transform={transform}
                          ></Tangram>
                        }
                      </TableCell>
                      <TableCell align="center" height="150px" width="20%">
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
                      <TableCell align="center" height="150px" width="20%">
                        {value["whole-annotation"].wholeAnnotation}
                      </TableCell>
                      <TableCell align="center" height="150px" width="20%">
                        {annList}
                      </TableCell>
                      <TableCell align="center" height="150px" width="15%">
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
}
