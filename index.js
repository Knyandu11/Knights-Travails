function knightMoves(start, end) {
    // Define all possible moves of a knight
    const moves = [
        [-2, -1], [-2, 1], [2, -1], [2, 1],
        [-1, -2], [-1, 2], [1, -2], [1, 2]
    ];

    // Define the boundaries of the chessboard
    const boardSize = 8;
    const minRow = 0, maxRow = boardSize - 1;
    const minCol = 0, maxCol = boardSize - 1;

    // Define a helper function to check if a position is within the board
    function isValidMove(row, col) {
        return minRow <= row && row <= maxRow && minCol <= col && col <= maxCol;
    }

    // Perform breadth-first search to find the shortest path
    const queue = [[start, [start]]]; // Initialize the queue with the starting position and path
    const visited = new Set([start.toString()]); // Keep track of visited positions to avoid revisiting

    while (queue.length > 0) {
        const [currentPosition, path] = queue.shift();

        // If the current position is the target position, return the path
        if (currentPosition[0] === end[0] && currentPosition[1] === end[1]) {
            return path;
        }

        // Generate all possible next positions
        for (const move of moves) {
            const nextRow = currentPosition[0] + move[0];
            const nextCol = currentPosition[1] + move[1];
            const nextPosition = [nextRow, nextCol];

            // Check if the next position is valid and not visited
            if (isValidMove(nextRow, nextCol) && !visited.has(nextPosition.toString())) {
                // Add the next position to the queue with the updated path
                queue.push([nextPosition, path.concat([nextPosition])]);
                visited.add(nextPosition.toString());
            }
        }
    }

    // If no path is found, return an empty array
    return [];
}

// Example usage:
const start = [0, 0];
const end = [7, 7];
const path = knightMoves(start, end);
if (path.length > 0) {
    console.log(`You made it in ${path.length - 1} moves! Here's your path:`);
    path.forEach(position => console.log(position));
} else {
    console.log("No valid path found.");
}
