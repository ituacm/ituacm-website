import React from "react";
import "./Board.css";
import BoardMember from "../BoardMember/BoardMember";

export default function Board(props) {
  const data = props.boardData;

  return (
    <div className="board-container">
      <span className="board-header">Our Board</span>
      <div className="board-list">
        {data.map((member) => {
          return (
            <div class="board-list-item">
              <BoardMember member={member} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
