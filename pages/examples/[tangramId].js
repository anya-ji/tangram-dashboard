import Tangram from "../../components/tangram";
import tangrams from "../../assets/tangrams.json";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
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
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import interpinfo from "../../assets/page4-51_interp_info.json";

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
  selects: {
    minWidth: 650,
    marginLeft: "20%",
    marginRight: "20%",
    marginTop: "3vh",
    marginBottom: "1vh",
    width: "20%",
  },
}));

export default function Annotations(props) {
  const classes = useStyles();
  const router = useRouter();
  const { tangramId } = router.query;

  const [prediction, setPrediction] = useState("text");
  const [model, setModel] = useState("mult");
  var idx = 0;

  if (!tangramId) {
    return <></>;
  } else {
    const handleChangePrediction = (event) => {
      setPrediction(event.target.value);
    };
    const handleChangeModel = (event) => {
      setModel(event.target.value);
    };

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
              {"Example: " + tangramId.replace(".svg", "")}
            </Typography>
          </Toolbar>
        </AppBar>

        <FormControl className={classes.selects}>
          <InputLabel id="demo-simple-select-label">Prediction</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={prediction}
            onChange={handleChangePrediction}
          >
            <MenuItem value={"text"}>text</MenuItem>
            <MenuItem value={"image"}>image</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.selects}>
          <InputLabel id="demo-simple-select-label">Model</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={model}
            onChange={handleChangeModel}
          >
            <MenuItem value={"mult"}>mult</MenuItem>
            <MenuItem value={"sum"}>sum</MenuItem>
            <MenuItem value={"model8"}>model8</MenuItem>
            <MenuItem value={"model9"}>model9</MenuItem>
            <MenuItem value={"model10"}>model10</MenuItem>
          </Select>
        </FormControl>

        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Prediction</TableCell>
                <TableCell align="center">Target</TableCell>
                <TableCell align="center">Annotation</TableCell>
                <TableCell align="center">Probablity</TableCell>
                <TableCell align="center">Distractor</TableCell>
                <TableCell align="center">Annotation</TableCell>
                <TableCell align="center">Probablity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {interpinfo ? (
                interpinfo.flatMap((element) => {
                  if (
                    element["model"] !== model ||
                    element["pred_type"] !== prediction
                  )
                    return;

                  var rows = [];

                  for (var i = 0; i < 8; i++) {
                    idx++;
                    if (i == 0) {
                      //target + distractor0 row
                      rows.push(
                        <TableRow key={idx}>
                          <TableCell
                            align="center"
                            height="50px"
                            width="12.5%"
                            style={{
                              backgroundColor:
                                element["pred"] === "target"
                                  ? "DarkSeaGreen"
                                  : "IndianRed",
                            }}
                          >
                            {prediction === "text" ? (
                              element[element["pred"] + "_text"]
                            ) : (
                              <img
                                src={`../eval_images/${
                                  element[element["pred"]]
                                }.png`}
                                style={{ height: "50px" }}
                              />
                            )}
                          </TableCell>
                          <TableCell align="center" height="50px" width="12.5%">
                            <img
                              src={`../eval_images/${element["target"]}.png`}
                              style={{ height: "50px" }}
                            />
                          </TableCell>
                          <TableCell align="center" height="50px" width="12.5%">
                            {element["target_text"]}
                          </TableCell>
                          <TableCell align="center" height="50px" width="12.5%">
                            {element["target_prob"]}
                          </TableCell>
                          <TableCell align="center" height="50px" width="12.5%">
                            <img
                              src={`../eval_images/${element["distractor0"]}.png`}
                              style={{ height: "50px" }}
                            />
                          </TableCell>
                          <TableCell align="center" height="50px" width="12.5%">
                            {element["distractor0_text"]}
                          </TableCell>
                          <TableCell align="center" height="50px" width="12.5%">
                            {element["distractor0_prob"]}
                          </TableCell>
                        </TableRow>
                      );
                    } else {
                      rows.push(
                        <TableRow key={idx}>
                          <TableCell align="center" height="50px" width="12.5%">
                            {}
                          </TableCell>
                          <TableCell align="center" height="50px" width="12.5%">
                            {}
                          </TableCell>
                          <TableCell align="center" height="50px" width="12.5%">
                            {}
                          </TableCell>
                          <TableCell align="center" height="50px" width="12.5%">
                            {}
                          </TableCell>
                          <TableCell align="center" height="50px" width="12.5%">
                            <img
                              src={`../eval_images/${
                                element["distractor" + i]
                              }.png`}
                              style={{ height: "50px" }}
                            />
                          </TableCell>
                          <TableCell align="center" height="50px" width="12.5%">
                            {element["distractor" + i + "_text"]}
                          </TableCell>
                          <TableCell align="center" height="50px" width="12.5%">
                            {element["distractor" + i + "_prob"]}
                          </TableCell>
                        </TableRow>
                      );
                    }
                  }
                  return rows;
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
