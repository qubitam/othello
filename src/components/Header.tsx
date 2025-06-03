import React from 'react';

// HeaderProps is the props for the Header component
interface HeaderProps {
	currentPlayer: string;
	score: {
		black: number;
		white: number;
	};
	winner: string | null;
	gameOver: boolean;
	validMovesCount: number;
}

const Header: React.FC<HeaderProps> = ({ currentPlayer, score, winner, gameOver, validMovesCount }) => {
	return (
		<div>
			<p>Current Player: {currentPlayer}</p>
			<p>Score: {score.black} - {score.white}</p>
			<p>Winner: {winner}</p>
			<p>Game Over: {gameOver ? 'Yes' : 'No'}</p>
			<p>Valid Moves Count: {validMovesCount}</p>
		</div>
	)
}

export default Header;