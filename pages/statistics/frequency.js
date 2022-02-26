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
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import pcData from "../../assets/frequency/pc_to_dicts_train.json";
import { makeFrequency } from "../../components/util";

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

export default function Frequency(props) {
  const classes = useStyles();
  const router = useRouter();

  const [pc, setPc] = useState(1);
  var idx = 0;

  const handleChangePc = (event) => {
    setPc(event.target.value);
  };

  /** Offset idx_to_color. json has keys from 1-7, but tangram component requires 0-6. */
  function offsetColors(colorDict) {
    var colors = [];
    colors.push(colorDict["1"]);
    colors.push(colorDict["2"]);
    colors.push(colorDict["3"]);
    colors.push(colorDict["4"]);
    colors.push(colorDict["5"]);
    colors.push(colorDict["6"]);
    colors.push(colorDict["7"]);
    return colors;
  }

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
            Word Frequency (Training Set)
          </Typography>
        </Toolbar>
      </AppBar>

      <FormControl className={classes.selects}>
        <InputLabel id="demo-simple-select-label"># of parts</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={pc}
          onChange={handleChangePc}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={7}>7</MenuItem>
        </Select>
      </FormControl>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Index</TableCell>
              <TableCell align="center">Tangram</TableCell>
              <TableCell align="center">Annotation (Word Frequency)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pcData ? (
              pcData[pc].map((element) => {
                var text = element["text"];
                var colors = offsetColors(element["idx_to_color"]);
                var file = element["file"] + ".svg";
                const viewBox = tangrams[file]["viewBox"];
                const points = tangrams[file]["points"];
                const transform = tangrams[file]["transform"];
                idx++;

                return (
                  <TableRow key={idx}>
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
                      {makeFrequency(text)}
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
