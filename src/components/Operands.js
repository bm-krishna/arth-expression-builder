import * as React from "react";
import { Box, Stack } from "@mui/material";
import { Operand } from "./Operand";

function OperandsFunc({ operandItems = [] }) {
  return (
    <Stack
      key="operands"
      direction="column"
      style={{ background: "antiquewhite" }}
    >
      {/* <Typography style={{ margin: 8, textAlign: "center" }}>
        Dropped Items
      </Typography> */}
      <Box
        sx={{
          minWidth: 160,
          maxWidth: 360,
          bgcolor: "background.paper",
          borderRadius: 1,
          minHeight: "40vh",
          maxHeigth: "45vh",
          position: "relative",
          overflow: "auto",
          margin: 1,
          padding: 1,
          flex: 1,
        }}
      >
        {operandItems.map((item, index) => {
          if (item.type === "expression") {
          }
          return (
            <div key={`${index}_div`}>
              <Operand {...item} keyId={`${item.id}_${index}`} index={index} />
            </div>
          );
        })}
      </Box>
    </Stack>
  );
}

export const Operands = React.memo(OperandsFunc);
