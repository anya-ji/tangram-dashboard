import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import { useEffect } from "react";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import agreement from "../../assets/file_agreement.json";
import { useRouter } from "next/router";
import Tangram from "../../components/tangram";
import tangrams from "../../assets/tangrams.json";

function createData(name, segmentation, whole, piece) {
  return { name, segmentation, whole, piece };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "tangram",
    numeric: false,
    disablePadding: false,
    label: "Tangram",
  },
  {
    id: "file",
    numeric: false,
    disablePadding: false,
    label: "File",
  },
  {
    id: "segmentation",
    numeric: true,
    disablePadding: false,
    label: "Segmentation",
  },
  {
    id: "whole",
    numeric: true,
    disablePadding: false,
    label: "Whole shape annotation",
  },
  {
    id: "piece",
    numeric: true,
    disablePadding: false,
    label: "By-part annotation",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "center"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={
                headCell.id === "tangram" || headCell.id === "tangram"
                  ? false
                  : orderBy === headCell.id
              }
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  title: {
    flexGrow: 1,
    alignItems: "center",
  },
}));

export default function Agreement() {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("segmentation");
  const [rows, setRows] = React.useState([]);
  const router = useRouter();

  useEffect(() => {
    const r = [];
    Object.entries(agreement).map(([key, value]) => {
      r.push(
        createData(key, value["segmentation"], value["whole"], value["piece"])
      );
    });
    setRows(r);
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <>
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
            Agreement
          </Typography>
        </Toolbar>
      </AppBar>

      <div className={classes.root}>
        <Paper className={classes.paper}>
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size="small"
              aria-label="enhanced table"
            >
              <EnhancedTableHead
                classes={classes}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy)).map(
                  (row, index) => {
                    return (
                      <TableRow key={row.name}>
                        <TableCell align="center">
                          <Tangram
                            viewBox={tangrams[row.name + ".svg"]["viewBox"]}
                            points={tangrams[row.name + ".svg"]["points"]}
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
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                              router.push(
                                `/annotations/${encodeURIComponent(
                                  row.name + ".svg"
                                )}`
                              );
                            }}
                          >
                            {row.name}
                          </Button>
                        </TableCell>
                        <TableCell align="right">{row.segmentation}</TableCell>
                        <TableCell align="right">{row.whole}</TableCell>
                        <TableCell align="right">{row.piece}</TableCell>
                      </TableRow>
                    );
                  }
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </>
  );
}
