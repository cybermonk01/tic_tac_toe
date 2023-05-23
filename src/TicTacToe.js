import React from "react";

class TicTacToe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: Array(9).fill(null),
      currentPlayer: "X",
      winner: null,
    };
  }

  handleClick(index) {
    const { board, currentPlayer, winner } = this.state;
    if (winner || board[index]) return;

    const updatedBoard = [...board];
    updatedBoard[index] = currentPlayer;

    this.setState({
      board: updatedBoard,
      currentPlayer: currentPlayer === "X" ? "O" : "X",
    });

    const gameWinner = this.calculateWinner(updatedBoard);
    if (gameWinner) {
      this.setState({ winner: gameWinner });
    } else if (!updatedBoard.includes(null)) {
      this.setState({ winner: "Draw" });
    }
  }

  calculateWinner(board) {
    const winCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combination of winCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    return null;
  }

  render() {
    const { board, winner } = this.state;

    return (
      <div>
        <h1>---------------</h1>
        <div className="board">
          {board.map((cell, index) => (
            <div
              key={index}
              className="cell"
              onClick={() => this.handleClick(index)}
            >
              {cell}
            </div>
          ))}
        </div>
        {winner && (
          <div className="result">
            {winner === "Draw" ? (
              <p>It's a Draw!</p>
            ) : (
              <p>Congratulations, {winner} wins!</p>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default TicTacToe;
