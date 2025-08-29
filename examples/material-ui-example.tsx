import React, { useState } from "react";
import {
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Chip,
} from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { DragDropList } from "react-dragdrop-kit";

export function MaterialUIExample() {
  const [tasks, setTasks] = useState([
    {
      id: "1",
      position: 0,
      title: "Design Review",
      assignee: "John",
      priority: "high",
    },
    {
      id: "2",
      position: 1,
      title: "Code Implementation",
      assignee: "Sarah",
      priority: "medium",
    },
    {
      id: "3",
      position: 2,
      title: "Testing",
      assignee: "Mike",
      priority: "low",
    },
  ]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "error";
      case "medium":
        return "warning";
      case "low":
        return "success";
      default:
        return "default";
    }
  };

  return (
    <Paper elevation={0} sx={{ p: 2, bgcolor: "grey.50" }}>
      <DragDropList
        items={tasks}
        onReorder={(newItems) => setTasks(newItems)}
        gap={8}
        renderItem={(item) => (
          <Paper elevation={1} sx={{ overflow: "hidden" }}>
            <ListItem
              sx={{
                "&:hover": { bgcolor: "action.hover" },
                cursor: "grab",
                "&:active": { cursor: "grabbing" },
              }}
              secondaryAction={
                <Chip
                  label={item.priority}
                  size="small"
                  color={getPriorityColor(item.priority)}
                />
              }
            >
              <ListItemIcon>
                <DragIndicatorIcon />
              </ListItemIcon>
              <ListItemText
                primary={item.title}
                secondary={`Assigned to ${item.assignee}`}
              />
              <Avatar sx={{ width: 32, height: 32, ml: 2 }}>
                {item.assignee[0]}
              </Avatar>
            </ListItem>
          </Paper>
        )}
      />
    </Paper>
  );
}
