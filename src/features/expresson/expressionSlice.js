import { createSlice } from "@reduxjs/toolkit";
import { ItemTypes } from "../../app/itemTypes";

const initialState = {
  operators: [
    {
      id: "addition",
      label: "Addition",
      isDragging: false,
      iconName: "add",
      type: ItemTypes.Operator,
    },
    {
      id: "substraction",
      label: "Substraction",
      isDragging: false,
      iconName: "remove",
      type: ItemTypes.Operator,
    },
    {
      id: "Mutliplicaton",
      label: "Mutliplicaton",
      isDragging: false,
      iconName: "star",
      type: ItemTypes.Operator,
    },
    {
      id: "modulo",
      label: "Modulo",
      isDragging: false,
      iconName: "percentage",
      type: ItemTypes.Operator,
    },
    {
      id: "division",
      label: "Division",
      iconName: "horizontal_rule",
      isDragging: false,
      type: ItemTypes.Operator,
    },
  ],
  operands: [
    {
      id: "expression",
      label: "Expression",
      isDragging: false,
      iconName: "code",
      type: ItemTypes.Expression,
    },
    {
      id: "column1",
      label: "Column1",
      val: "column1",
      type: ItemTypes.Operand,
    },
    {
      id: "column2",
      label: "Column2",
      val: "column2",
      type: ItemTypes.Operand,
    },
    {
      id: "column3",
      label: "Column3",
      val: "column3",
      type: ItemTypes.Operand,
    },
  ],
  droppedItems: [
    {
      type: "operator",
      item: {
        add: ["col1", "col2"],
      },
      isExpression: false,
      expression: [],
    },
    {
      type: "operator",
      item: {
        add: ["col1", "col2"],
      },
      isExpression: true,
      expression: [
        {
          type: "operator",
          item: {
            add: ["col1", "col2"],
          },
          isExpression: false,
          expression: [],
        },
      ],
    },
  ],
  expression: {},
  droppedOperands: [],
  droppedOperator: {},
};

const expressionSlice = createSlice({
  name: "expressioin",
  initialState,
  reducers: {
    addOperatorAction: (state, action) => {
      state.operators.push(action.payload);
    },
    editOperatorAction: (state, action) => {
      for (let index = 0; index < state.operators; index++) {
        const element = state.operators[index];
        if (element.id === action.payload.id) {
          state.operators[index] = { ...element, ...action.payload };
          break;
        }
      }
    },
    addOperandAction: (state, action) => {
      state.operands.push(action.payload);
    },
    updateExpressionAction: (state, action) => {
      state.expression = action.payload;
    },
    addItemToExpression: (state, action) => {
      state.expression[action.payload.key] = action.payload.val;
    },
    addDroppedOperandsAction: (state, action) => {
      console.log("action.payload: ", action.payload);
      if (
        !state.droppedOperands.filter((item) => item.id === action.payload.id)
          .length
      )
        state.droppedOperands.push(action.payload);
    },
    removeDroppedOperandsAction: (state, action) => {
      state.droppedOperands = state.droppedOperands.filter(
        (item) => item.id !== action.payload
      );
    },
    clearDroppedOperandsAction: (state) => {
      state.droppedOperands = [];
    },
    addDroppedOperatorAction: (state, action) => {
      state.droppedOperator = state.operators.filter(
        (item) => item.id === action.payload
      )[0];
    },
    removeDroppedOperatorAction: (state) => {
      state.droppedOperator = {};
    },
  },
});

export const {
  addItemToExpression,
  addOperandAction,
  addOperatorAction,
  editOperatorAction,
  updateExpressionAction,
  addDroppedOperandsAction,
  removeDroppedOperandsAction,
  clearDroppedOperandsAction,
  addDroppedOperatorAction,
  removeDroppedOperatorAction,
} = expressionSlice.actions;
export const selectOperators = (state) => state.expression.operators;
export const selectOperands = (state) => state.expression.operands;
export const selectExpression = (state) => state.expression.expression;
export const selectDroppedOperands = (state) =>
  state.expression.droppedOperands;
export const selectDroppedOperator = (state) =>
  state.expression.droppedOperator;
export const selectIsExpressionDorpZoneEnable = (state) =>
  state.expression.isExpressionDropZoneDisable;
export default expressionSlice.reducer;
