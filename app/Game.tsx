"use client";

import { Chess, Square } from "chess.js";
import Chessboard, { Piece } from "chessboardjsx";
import { ReactNode, useState } from "react";

// d3 d5 c3 e5 Nf3 f6
const win = "rnbqkbnr/ppp3pp/5p2/3pp3/8/2PP1N2/PP2PPPP/RNBQKB1R w KQkq - 0 4";

export default function Game() {
  const [position, setPosition] = useState("start");
  const [game, setGame] = useState(new Chess());
  const [moves, setMoves] = useState<String[]>([]);

  const onDrop = ({
    sourceSquare,
    targetSquare,
    piece,
  }: {
    sourceSquare: Square;
    targetSquare: Square;
    piece: Piece;
  }) => {
    try {
      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q",
      });

      if (move == null) {
        return;
      }
      console.log("game.fen()", game.fen());
      setPosition(game.fen());
      setMoves([...moves, move.san]);
    } catch (e) {}
  };

  const checkWin = () => {
    if (game.fen() == win) {
      window.alert("Vinto!");
    } else {
      window.alert("Perso!");
    }
  };

  function undo(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="flex flex-col items-center">
      <Chessboard position={position} onDrop={onDrop} />
      <div className="flex flex-row mt-6 text-3xl items-center">
        1.
        <Cell>{moves[0]}</Cell>
        <Cell>{moves[1]}</Cell>
        2.
        <Cell>{moves[2]}</Cell>
        <Cell>{moves[3]}</Cell>
        3.
        <Cell>{moves[4]}</Cell>
        <Cell>{moves[5]}</Cell>
      </div>

      <div className="flex flex-row mt-3 justify-between w-1/2">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setPosition("start")}
        >
          Reset
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => undo()}
        >
          Undo
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => checkWin()}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

type CellProps = {
  children?: ReactNode;
};
function Cell({ children }: CellProps) {
  return (
    <div className="w-24 h-24 bg-slate-500 mr-2 items-center justify-center flex text-white ">
      {children}
    </div>
  );
}
