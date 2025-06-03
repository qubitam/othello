import React from 'react';
interface HeaderProps {
	currentPlayer: string;
}

const Header: React.FC<HeaderProps> = ({ currentPlayer }) => {
	return (
		<div>
			<h1 className="text-4xl font-bold">Othello Game</h1>
			<p>Current Player: {currentPlayer}</p>
		</div>
	)
}

export default Header;