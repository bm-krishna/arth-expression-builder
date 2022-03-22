import { memo, useState } from "react";
import { ItemTypes } from "../app/itemTypes";
import IconButton from "@mui/material/IconButton";
import Close from "@mui/icons-material/Close";
import Stack from "@mui/material/Stack";

import { Expression } from "./Expression";
// import { Expression } from "./Expression";
import { Button, Typography, Paper } from "@mui/material";
import TextField from "@mui/material/TextField";
import { SnackBar } from "./SnackBar";
import { useDispatch, useSelector } from "react-redux";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import {
  addOperandAction,
  selectOperands,
  selectDroppedOperands,
  removeDroppedOperatorAction,
  removeDroppedOperandsAction,
} from "../features/expresson/expressionSlice";
import { Droppable } from "react-beautiful-dnd";
import { Operands } from "./Operands";
import ReactJson from "react-json-view";
function ExpressionBuilderFunc({
  title,
  id,
  operatorLabel,
  item: {operands = [], type} ={},
  item,
  removDraggedExpressionItem,
}) {
  console.log("id: ", id);
  console.log("operands: ", operands);
  const droppedOperandItems = operands;
  const operandItems = useSelector(selectOperands);

  const [previewExpression, setPreviewExpression] = useState({});
  const dispatch = useDispatch();

  const [error, setError] = useState({
    message: "",
    isError: false,
  });
  const [expressionName, setExpressionName] = useState("");

  const removeItem = (id) => {
    dispatch(removeDroppedOperandsAction(id));
  };
  const removeCard = (id) => {
    removDraggedExpressionItem(id);
    dispatch(removeDroppedOperatorAction());
  };
  const saveExpressionName = (e) => {
    setExpressionName(e.target.value);
  };
  return (
    <Card sx={{ minWidth: 900, width: "100%" }}>
      <CardHeader
        component={() => (
          <Stack direction="row" padding={1}>
            <Typography
              variant="h6"
              style={{ flex: 1, margin: 8, textAlign: "start" }}
            >
              {operatorLabel}
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
      ></CardHeader>
      <CardContent>
        <SnackBar
          isOpen={error.isError}
          message={error.message}
          severity="error"
          setError={setError}
        />

        <div style={{ minHeight: 64, display: "grid" }}>
          <TextField
            id={`${id}`}
            size="small"
            placeholder="Expression name"
            required
            color={"primary"}
            error={expressionName === ""}
            helperText={expressionName === "" ? "Required" : ""}
            onChange={(e) => saveExpressionName(e)}
          />
        </div>
        <Droppable droppableId="operandDropper" type={ItemTypes.Operand}>
          {(provided, snapshot) => {
            return (
              <Stack
                direction="row"
                style={{ overFlow: "auto", maxHeight: "60vh" }}
              >
                <Operands operandItems={operandItems} />
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  {...provided.droppableProps}
                  style={{
                    width: "100%",
                    minWidth: "40%",
                    flex: 1,
                    backgroundColor: "#eee",
                    overFlowY: "auto",
                    display: "flex",
                    flexFlow: "row",
                    flexWrap: "wrap",
                    minHeight: "50vh",
                    maxHeight: "50vh",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {droppedOperandItems.length
                    ? droppedOperandItems.map((item, index) => {
                      console.log('item: ', item);
                        return (
                          <div key={`${item.id} _ ${index}`}>
                            {item.type === "expression" ? (
                              <Expression {...item} onClick={onClick} />
                            ) : (
                              <Paper style={{ margin: 4, padding: 4 }}>
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  padding={0.25}
                                >
                                  <Typography>{item.label}</Typography>
                                  <IconButton
                                    aria-label="clear"
                                    component="span"
                                    size="small"
                                    onClick={() => removeItem(item.id)}
                                  >
                                    <Close />
                                  </IconButton>
                                </Stack>
                              </Paper>
                            )}
                          </div>
                        );
                      })
                    : "Drop items here"}

                  {provided.placeholder}
                </div>
                <div style={{ minWidth: 120, overflow: "auto" }}>
                  <ReactJson
                    src={previewExpression}
                    displayDataTypes={false}
                    name="expression"
                    iconStyle="square"
                    displayObjectSize={false}
                    displayArrayKey={false}
                    enableClipboard={false}
                    collapseStringsAfterLength={10}
                  />
                </div>
              </Stack>
            );
          }}
        </Droppable>
      </CardContent>
      <CardActions style={{ justifyContent: "flex-end" }}>
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
              setPreviewExpression,
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
              setPreviewExpression,
            })
          }
          style={{ margin: "0px 16px 8px 0px" }}
        >
          Build
        </Button>
      </CardActions>
    </Card>
  );
}
export const ExpressionBuilder = memo(ExpressionBuilderFunc);

const onClick = ({
  id,
  items,
  setError,
  dispatch,
  expressionName,
  operandItems,
  setPreviewExpression,
  isPreview,
}) => {
  if (!expressionName.length) {
    setError({
      message: "Expression name is required",
      isError: true,
    });
    return {};
  } else {
    if (operandItems.filter((it) => it.id === expressionName).length) {
      setError({
        message: "Expression name is already exist",
        isError: true,
      });
      return {};
    }
  }
  if ((id === "division") | (id === "modulo")) {
    if (items.length !== 2) {
      setError({
        message: `${id.toUpperCase()} Operator Expect only Tow operands`,
        isError: true,
      });
      return {};
    } else {
      setError({});
    }
  }
  const result = {
    [id]: [items.map((it) => it.val)],
  };
  if (isPreview) {
    setPreviewExpression(result);
    return {};
  }
  if (expressionName) {
    dispatch(
      addOperandAction({
        type: ItemTypes.Operand,
        id: expressionName,
        val: result,
        label: expressionName,
      })
    );
  }

  // dispatch(updateExpressionAction(result));
};
