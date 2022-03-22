import * as React from "react";
import { Box, MenuItem, Typography } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch } from "react-redux";
import { addDroppedOperatorAction } from "../features/expresson/expressionSlice";
function OperatorsFunc({
  operatorItems = [],
  isExpression,
  setSelectedExpressionOperator,
  id,
}) {
  
  const [operator, setOperator] = React.useState("");
  const disptach = useDispatch();
  const handleChange = (event) => {
    
    const {
      target: { value },
    } = event;
    setOperator(
      // On autofill we get a stringified value.
      value
    );
    if (!isExpression) disptach(addDroppedOperatorAction(value));
    else {
      if(typeof setSelectedExpressionOperator === 'function')
      setSelectedExpressionOperator(value);
    }
  };

  return (
    <Box
      sx={{
        minWidth: 180,
        margin: 1,
      }}
      key={id}
      id={id}
    >
      <FormControl fullWidth>
        <Select
          displayEmpty
          value={operator}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <Typography>Operator</Typography>;
            }

            return selected;
          }}
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem disabled value="">
            <em>Operator</em>
          </MenuItem>
          {operatorItems.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export const Operators = React.memo(OperatorsFunc);
