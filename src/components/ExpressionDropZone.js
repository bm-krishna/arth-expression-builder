import { memo } from "react";
import { Droppable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { ItemTypes } from "../app/itemTypes";
import {
  selectDroppedOperands,
  selectIsExpressionDorpZoneEnable,
} from "../features/expresson/expressionSlice";

import { ExpressionBuilder } from "./ExpressionBuilder";
function ExpressionDropZoneFunc({
  droppedOperator = {},
  operatorItems = [],
  operandItems = [],
  removDraggedExpressionItem,
}) {
  const isExpressionDropZoneDisable = useSelector(
    selectIsExpressionDorpZoneEnable
  );
  
  return (
    <Droppable
      droppableId="droppable"
      type={ItemTypes.Operator}
      isDropDisabled={isExpressionDropZoneDisable}
    >
      {(provided, snapshot) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={{
            display: "flex",
            flexFlow: "row",
            flexWrap: "wrap",
            width: "100%",
          }}
        >
          <div
            style={{
              width: "100%",
              minWidth: "30%",
              flex: 1,
              backgroundColor: "#eee",
              display: "flex",
              flexFlow: "row",
              flexWrap: "wrap",
              minHeight: "100vh",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {droppedOperator.id ? (
              <div
                key={droppedOperator.id}
                style={{ display: "flex", width: "90%" }}
              >
                <ExpressionBuilder
                  {...droppedOperator}
                  removDraggedExpressionItem={removDraggedExpressionItem}
                />
              </div>
            ) : (
              "Select Logical items"
            )}
          </div>

          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export const ExpressionDropZone = memo(ExpressionDropZoneFunc);
