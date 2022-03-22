import { Stack } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { ExpressionDropZone } from "../../components/ExpressionDropZone";
import {
  selectOperands,
  selectOperators,
  selectDroppedOperator,
  addDroppedOperandsAction,
} from "./expressionSlice";
import { memo, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { Operators } from "../../components/Operators";
import { ItemTypes } from "../../app/itemTypes";

function ExpressionContainer() {
  console.log("ExpressionContainer: ");

  const operandItems = useSelector(selectOperands);
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
    console.log("sourceRest: ", sourceRest);
    console.log("index: ", index);
    console.log("draggableId: ", draggableId);

    console.log("rest: ", rest);
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
        <Operators operatorItems={operatorItems} id="operator" />
        <ExpressionDropZone
          droppedOperator={{
            type: "operator",
            id: 1,
            item: {
              operator: "additon",
              operatorLabel: "Addtion",
              lable: "Addtion",
              operands: [
                {
                  id: "column2",
                  label: "Column2",
                  val: "column2",
                  type: "operand",
                },
                {
                  id: "expression",
                  label: "Expression",
                  isDragging: false,
                  iconName: "code",
                  type: "expression",
                  val: {
                    type: "operator",
                    id: 1,
                    item: {
                      operator: "additon",
                      operatorLabel: "Addtion",
                      lable: "Addtion",
                      operands: [
                        {
                          id: "column2",
                          label: "Column2",
                          val: "column2",
                          type: "operand",
                        },
                        {
                          id: "expression",
                          label: "Expression",
                          type: "expression",
                          isDragging: false,
                          iconName: "code",
                          val: {
                            type: "expression",
                            item: {
                              operands: [
                                {
                                  id: "column2",
                                  label: "Column2",
                                  val: "column2",
                                  type: "expresion",
                                },
                              ],
                            },
                            isExpression: false,
                            expression: [],
                          },
                        },
                      ],
                    },
                  },
                },
              ],
            },
          }}
          removDraggedExpressionItem={removDraggedExpressionItem}
        />
      </DragDropContext>
      {/* <div style={{ minWidth: 180 }}>
        <ReactJson src={expressionJson} />
      </div> */}
    </Stack>
  );
}

export default memo(ExpressionContainer);
