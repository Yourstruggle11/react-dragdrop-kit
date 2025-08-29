import React, { useState } from "react";
import styled from "styled-components";
import { DragDropList } from "react-dragdrop-kit";

const StyledContainer = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
  border-radius: 1rem;
  min-height: 400px;
`;

const StyledItem = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

export function StyledComponentsExample() {
  const [items, setItems] = useState([
    { id: "1", position: 0, text: "Styled Item 1" },
    { id: "2", position: 1, text: "Styled Item 2" },
    { id: "3", position: 2, text: "Styled Item 3" },
  ]);

  return (
    <StyledContainer>
      <DragDropList
        items={items}
        onReorder={(newItems) => setItems(newItems)}
        renderItem={(item) => <StyledItem>{item.text}</StyledItem>}
      />
    </StyledContainer>
  );
}
