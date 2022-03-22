import { memo, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Close from "@mui/icons-material/Close";
import Stack from "@mui/material/Stack";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
// import { Expression } from "./Expression";
import { Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ExpressionDropZone } from "./ExpressionDropZone";
import {
  selectOperands,
  selectDroppedOperands,
  removeDroppedOperandsAction,
  selectOperators,
} from "../features/expresson/expressionSlice";
import { Operators } from "./Operators";
function ExpressionFunc({
  ...rest
  // onClick,
  // removDraggedExpressionItem = ()=>{console.log('i am default removDraggedExpressionItem')},
}) {
  console.log("rest: ", rest);
  const { title, id, label, type } = rest;
  const [open, setOpen] = useState(true);
  const droppedOperandItems = useSelector(selectDroppedOperands);
  const operandItems = useSelector(selectOperands);
  const operatorItems = useSelector(selectOperators);
  const handleClose = () => {
    setOpen(false);
  };
  const [expressionDroppedOperators, setExpressionDropedOperators] = useState(
    {}
  );
  const setSelectedExpressionOperator = (id) => {
    const selectedItem = operatorItems.filter((item) => item.id === id);
    if (selectedItem.length) {
      setExpressionDropedOperators((preState) => ({
        ...preState,
        ...selectedItem[0],
      }));
    }
  };
  const dispatch = useDispatch();

  const [error, setError] = useState({
    message: "",
    isError: false,
  });
  const [expressionName, setExpressionName] = useState("");

  const removeItem = (id) => {
    setExpressionDropedOperators({});
  };
  const removeCard = (id) => {
    handleClose();
  };
  const saveExpressionName = (e) => {
    setExpressionName(e.target.value);
  };
  return (
    <Dialog
      fullWidth
      // fullScreen
      maxWidth="lg"
      scroll="paper"
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle
        id="responsive-dialog-title"
        component={() => (
          <Stack direction="row" padding={1}>
            <Typography
              variant="h6"
              style={{ flex: 1, margin: 8, textAlign: "start" }}
            >
              {label}
            </Typography>
            <IconButton
              aria-label="clear"
              component="span"
              size="medium"
              onClick={() => removeCard(id)}
            >
              <Close />
            </IconButton>
          </Stack>
        )}
      ></DialogTitle>
      <DialogContent>
        <Stack spacing={1} direction="row">
          <Operators
            operatorItems={operatorItems}
            isExpression
            setSelectedExpressionOperator={setSelectedExpressionOperator}
          />
          <ExpressionDropZone
            droppedOperator={rest.val}
            removDraggedExpressionItem={removeItem}
            droppableId="expression"
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        {/* <Button
          size="medium"
          variant="contained"
          color="primary"
          onClick={() =>
            onClick({
              id,
              items: droppedOperandItems,
              setError,
              dispatch,
              expressionName,
              operandItems,
              isPreview: true,
            })
          }
          style={{ margin: "0px 16px 8px 0px" }}
        >
          Preview
        </Button>
        <Button
          size="medium"
          variant="contained"
          color="primary"
          onClick={() =>
            onClick({
              id,
              items: droppedOperandItems,
              setError,
              dispatch,
              expressionName,
              operandItems,
            })
          }
          style={{ margin: "0px 16px 8px 0px" }}
        >
          Build
        </Button> */}
      </DialogActions>
    </Dialog>
  );
}

export const Expression = memo(ExpressionFunc);
