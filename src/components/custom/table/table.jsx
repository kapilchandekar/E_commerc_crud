import React, { memo } from "react";
import {
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

function table({ tableHead, tableBodyData, maxHeight }) {
  const renderSkeletonRow = () => {
    return (
      <TableRow>
        {tableHead?.map((col) => (
          <TableCell align="center" key={col.label}>
            <Skeleton animation="wave" height={30} />
          </TableCell>
        ))}
      </TableRow>
    );
  };
  return (
    <TableContainer sx={{ maxHeight: maxHeight || 520 }} component={Paper}>
      <Table
        sx={{ minWidth: 650 }}
        className="custom_table"
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            {tableHead?.map((cel) => (
              <TableCell Dessert align="center" key={cel.label}>
                {cel.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableBodyData !== "loading" ? (
            <>
              {tableBodyData?.length ? (
                tableBodyData?.map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    {tableHead?.map((col) => (
                      <TableCell
                        align="center"
                        component="th"
                        scope="row"
                        key={Math.random()}
                      >
                        {row[col._id]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <Typography
                  variant="subtitle1"
                  className="muted"
                  sx={{
                    textAlign: "center",
                    py: 2,
                  }}
                >
                  Data not found
                </Typography>
              )}
            </>
          ) : (
            Array.from({ length: tableHead?.length }).map((_, index) => (
              // You can adjust the number of skeleton rows based on your preference
              <React.Fragment key={index}>{renderSkeletonRow()}</React.Fragment>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default memo(table);
