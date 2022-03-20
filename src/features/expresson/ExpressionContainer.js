import { Stack } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import ReactJson from "react-json-view";
import { ExpressionDropZone } from "../../components/ExpressionDropZone";
import {
  selectExpression,
  selectOperands,
  selectOperators,
  selectDroppedOperator,
  addDroppedOperandsAction,
} from "./expressionSlice";
import { memo, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { Operators } from "../../components/Operators";

function ExpressionContainer() {
  const operandItems = useSelector(selectOperands);
  const expressionJson = useSelector(selectExpression);
  const operatorItems = useSelector(selectOperators);
  const droppedOperator = useSelector(selectDroppedOperator);
  const dispatch = useDispatch();
  const [operatorExpressionItems, setOperatorExpressionItems] = useState([]);
  const onDragEnd = ({
    draggableId,

    source: { index, ...sourceRest },
    type,

    ...rest
  }) => {
    if (type === "operator") {
      if (operatorExpressionItems.length === 1) {
        return operatorExpressionItems;
      }
      setOperatorExpressionItems((prevState) => {
        if (operatorItems.length) {
          const draggedOperatorIetem = operatorItems.filter(
            (item) => item.id === draggableId
          );
          if (draggedOperatorIetem.length) {
            prevState.push({ ...draggedOperatorIetem[0], index });
          }
        }

        return prevState;
      });
    }
    if (type === "operand") {
      dispatch(
        addDroppedOperandsAction(
          operandItems.filter((item) => item.id === draggableId)[0]
        )
      );
    }
  };
  const removDraggedExpressionItem = (id) => {
    setOperatorExpressionItems((prev) => prev.filter((item) => item.id !== id));
  };
  return (
    <Stack spacing={1} direction="row">
      <DragDropContext onDragEnd={onDragEnd}>
        <Operators operatorItems={operatorItems} />

        <ExpressionDropZone
          operatorItems={operatorItems}
          droppedOperator={droppedOperator}
          removDraggedExpressionItem={removDraggedExpressionItem}
          operandItems={operandItems}
        />
      </DragDropContext>
      <div style={{ minWidth: 180 }}>
        <ReactJson src={expressionJson} />
      </div>
    </Stack>
  );
}

export default memo(ExpressionContainer);
