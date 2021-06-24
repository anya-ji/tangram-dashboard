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
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeColor, makeAnnotation } from "../../components/util";

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
  table: {
    minWidth: 650,
    margin: "1vh",
  },
}));

export default function Worker(props) {
  const classes = useStyles();
  const router = useRouter();
  const { workerId } = router.query;
  const [annotations, setAnnotations] = useState();

  useEffect(() => {
    if (workerId) {
      FB.getUser(workerId)
        .then((doc) => {
          if (doc.exists) {
            setAnnotations(doc.data());
          }
        })
        .catch((e) => console.log(e));
    }
  }, [workerId]);

  if (!workerId) {
    return <></>;
  } else {
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
              {"Worker: " + workerId}
            </Typography>
          </Toolbar>
        </AppBar>

        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Tangram</TableCell>
                <TableCell align="center">File</TableCell>
                <TableCell align="center">Whole</TableCell>
                <TableCell align="center">Piece</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {annotations ? (
                Object.entries(annotations).map(([key, value]) => {
                  if (key.startsWith("page")) {
                    const colorInfo = makeColor(value["piece-annotation"]);
                    const colors = colorInfo["colors"];
                    const annList = makeAnnotation(colorInfo["annToColor"]);
                    return (
                      <TableRow key={key}>
                        <TableCell align="center">
                          {
                            <Tangram
                              viewBox={tangrams[key + ".svg"]["viewBox"]}
                              points={tangrams[key + ".svg"]["points"]}
                              colors={colors}
                            ></Tangram>
                          }
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                              router.push(
                                `/annotations/${encodeURIComponent(
                                  key + ".svg"
                                )}`
                              );
                            }}
                          >
                            {key}
                          </Button>
                        </TableCell>
                        <TableCell align="center">
                          {value["whole-annotation"].wholeAnnotation}
                        </TableCell>
                        <TableCell align="center">{annList}</TableCell>
                      </TableRow>
                    );
                  }
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
