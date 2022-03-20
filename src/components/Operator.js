import {
  ListItem,
  ListItemButton,
  Icon,
  ListItemText,
  ListItemIcon,
  MenuItem,
} from "@mui/material";
import { memo } from "react";
function OperatorFunc({ type, id, index, keyId, iconName, label }) {
  return (
    <MenuItem value={id}>
      <ListItem
        key={`${keyId} _ listitem`}
        id={id}
        component="a"
        disablePadding
      >
        <ListItemButton key={`${keyId}_listItemButton`}>
          <ListItemIcon key={`${keyId}_listItemIcon`}>
            <Icon key={`${keyId}_icon`}>{iconName}</Icon>
          </ListItemIcon>
          <ListItemText primary={label} key={keyId} />
        </ListItemButton>
      </ListItem>
    </MenuItem>
  );
}

export const Operator = memo(OperatorFunc);







