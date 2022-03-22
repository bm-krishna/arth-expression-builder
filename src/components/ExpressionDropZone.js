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
  removDraggedExpressionItem,
  droppableId = "operator",
  type = ItemTypes.Operator,
}) {
  console.log('droppedOperator: ', droppedOperator);
  return (
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
      {droppedOperator.item ? (
        <div key={droppedOperator.id} style={{ display: "flex", width: "90%" }}>
          <ExpressionBuilder
            {...droppedOperator}
            removDraggedExpressionItem={removDraggedExpressionItem}
          />
        </div>
      ) : (
        "Select Logical items"
      )}
    </div>
  );
}

export const ExpressionDropZone = memo(ExpressionDropZoneFunc);
