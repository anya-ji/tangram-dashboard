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
    marginLeft: "5vh",
    marginTop: "1vh",
    marginBottom: "1vh",
    width: "95%",
  },
}));

export default function Worker() {
  const classes = useStyles();
  const router = useRouter();
  const { workerId } = router.query;
  const [annotations, setAnnotations] = useState();
  const [languages, setLanguages] = useState();

  useEffect(() => {
    if (workerId) {
      FB.getUser(workerId)
        .then((doc) => {
          if (doc.exists) {
            var d = doc.data();
            var annotationList = [];
            var languagesList = {};
            Object.entries(d).map(([key, value]) => {
              if (key.startsWith("page")) {
                annotationList.push({ key: key, value: value });
              } else if (key === "engFirst" || key === "whereLearn") {
                languagesList[key] = value;
              } else if (key === "languages") {
                var lang = [];
                Object.entries(value).map(([k, v]) => {
                  var sl = "";
                  if ("specify" in v) {
                    sl =
                      v["language"] +
                      "(" +
                      v["specify"] +
                      ")" +
                      "(" +
                      v["proficiency"] +
                      ")";
                  } else {
                    sl = v["language"] + "(" + v["proficiency"] + ")";
                  }
                  lang.push(sl);
                });
                languagesList["languages"] = lang.join(", ");
              }
            });
            annotationList.sort(
              (a, b) => a["value"].submittedAt - b["value"].submittedAt
            );
            setAnnotations(annotationList);
            if (Object.keys(languagesList).length !== 0) {
              setLanguages(languagesList);
            }
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
            <TableBody>
              <TableRow key="languages">
                <TableCell component="th" scope="row">
                  Languages
                </TableCell>
                <TableCell align="right">
                  {languages ? languages["languages"] : "Unavailable"}
                </TableCell>
              </TableRow>
              <TableRow key="eng-first">
                <TableCell component="th" scope="row">
                  First language English?
                </TableCell>
                <TableCell align="right">
                  {languages
                    ? languages["engFirst"]
                      ? "Yes"
                      : "No"
                    : "Unavailable"}
                </TableCell>
              </TableRow>
              <TableRow key="where-learn">
                <TableCell component="th" scope="row">
                  Where did you learn English?
                </TableCell>
                <TableCell align="right">
                  {languages ? languages["whereLearn"] : "Unavailable"}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Tangram</TableCell>
                <TableCell align="center">File</TableCell>
                <TableCell align="center">Whole</TableCell>
                <TableCell align="center">Piece</TableCell>
                <TableCell align="center">Version</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {annotations ? (
                annotations.map((element) => {
                  var key = element["key"];
                  var value = element["value"];
                  var colorInfo = makeColor(value["piece-annotation"]);
                  var colors = colorInfo["colors"];
                  var annList = makeAnnotation(colorInfo["annToColor"]);

                  return (
                    <TableRow key={key}>
                      <TableCell align="center">
                        {
                          <Tangram
                            viewBox={tangrams[key + ".svg"]["viewBox"]}
                            points={tangrams[key + ".svg"]["points"]}
                            colors={colors}
                            transform={tangrams[key + ".svg"]["transform"]}
                          ></Tangram>
                        }
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            router.push(
                              `/annotations/${encodeURIComponent(key + ".svg")}`
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
                      <TableCell align="center">{value["version"]}</TableCell>
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
