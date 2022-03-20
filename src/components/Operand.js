import { Draggable } from "react-beautiful-dnd";

const { ListItem, ListItemText, ListItemButton } = require("@mui/material");
const { memo } = require("react");

function OperandFunc({ id, keyId, type, index, label }) {
  return (
    <Draggable
      draggableId={id}
      id={id}
      index={index}
      type={type}
      draggingOver="operandDropper"
    >
      {(provided, snapShot) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <ListItem key={keyId} id={id} component="a" disablePadding>
              <ListItemButton>
                <ListItemText primary={label} />
              </ListItemButton>
            </ListItem>
          </div>
        );
      }}
    </Draggable>
  );
}

export const Operand = memo(OperandFunc);
