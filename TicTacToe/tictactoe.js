// Wait for the DOM content to be fully loaded before executing the code
document.addEventListener("DOMContentLoaded", () => {
    // Get DOM elements and initialize game variables
    const cells = document.querySelectorAll(".cell"); // Get all elements with the class "cell"
    const status = document.querySelector(".status"); // Get the element with the class "status"
    const resetButton = document.querySelector(".reset"); // Get the element with the class "reset"
    const symbolPrompt = document.querySelector(".symbol-prompt"); // Get the element with the class "symbol-prompt"
    const instructionBtn = document.querySelector(".instruction-btn"); // Get the element with the class "instruction-btn"
    const modal = document.querySelector(".modal"); // Get the element with the class "modal"
    const closeBtn = document.querySelector(".close"); // Get the element with the class "close"

    let currentPlayer = ""; // Current player's symbol (X or O)
    let playerA = ""; // Player A's symbol
    let playerB = ""; // Player B's symbol
    let board = ["", "", "", "", "", "", "", "", ""]; // Game board

    //winPatterns is an array of arrays. Each inner array contains three 
    //indices corresponding to the positions on the game board.
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    // Function to check for a winner or tie
    const checkWinner = () => {
        // Iterate over win patterns to check for a winner
        for (const pattern of winPatterns) {
            const [a, b, c] = pattern; // For each winning pattern, it extracts the values at the specified positions (a, b, and c) from the board array.
            //The below checks if these values are equal and not empty (board[a] && board[a] === board[b] && board[a] === board[c]).
            //If this condition is true, it means there is a winner, and the function returns the winner's symbol ('X' or 'O').
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }

        //If no winner is found after checking all winning patterns, it checks if the board includes any empty spaces (board.includes("")). 
        //If there are empty spaces, the function returns null to indicate that there is no winner yet. If there are no empty spaces, 
        //it means the game is a tie, and the function returns 'T'.
        return board.includes("") ? null : "T"; // T for tie
    };

    // Function to handle a cell click
    const handleCellClick = (index) => {
        // Check if Player A has chosen a symbol
        if (!playerA) {
            alert("Player A must choose a symbol first!"); // Alert if Player A hasn't chosen a symbol
            return;
        }

        // Check if the clicked cell is already occupied or if there is already a winner
        if (board[index] || checkWinner()) return;

        // Update the board with the current player's symbol and update the display
        board[index] = currentPlayer;
        cells[index].textContent = currentPlayer;

        // Check for a winner after the current move
        const winner = checkWinner();

        // Handle the result of the game
        if (winner) {
            if (winner === "T") {
                status.textContent = "It's a tie!";
            } else {
                status.textContent = `${currentPlayer === playerA ? "Player A (" + playerA + ")" : "Player B (" + playerB + ")"} wins!`;

                // Highlight the winning cells by adding a class
                const winningPattern = winPatterns.find(pattern => board[pattern[0]] === board[pattern[1]] && board[pattern[1]] === board[pattern[2]]);
                winningPattern.forEach(index => cells[index].classList.add('winning-cell'));
            }
        } else {
            // Switch to the other player for the next move
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            // Update the status to show the current player
            status.textContent = `Current player: ${currentPlayer === playerA ? "Player A (" + playerA + ")" : "Player B (" + playerB + ")"}`;
        }
    };
 

    // Function to handle a reset button click
    const handleResetClick = () => {
        // Check if Player A has chosen a symbol
        if (!playerA) {
            alert("Player A must choose a symbol first!"); // Alert if Player A hasn't chosen a symbol
            return;
        }
    
        // Reset game state
        playerA = "";
        playerB = "";
        board = ["", "", "", "", "", "", "", "", ""];
        
        // Clear the content of all cells in the display
        cells.forEach((cell) => {
            cell.textContent = "";
            cell.classList.remove('winning-cell'); // Remove the winning-cell class
        });

        // Set the initial player to Player A after the reset
        currentPlayer = playerA;
    
        // Update the status to indicate the current player
        status.textContent = `Current player: ${currentPlayer === playerA ? "Player A (" + playerA + ")" : "Player B (" + playerB + ")"}`;
    
        // Show symbol prompt for the next game
        showSymbolPrompt();
    };
    

    // Function to handle a player's symbol selection
    const handlePlayerSelection = (symbol) => {
        // Check if Player A has already chosen a symbol
        if (!playerA) {
            // Set Player A's symbol based on the selection and determine Player B's symbol
            playerA = symbol.toUpperCase();
            playerB = playerA === "X" ? "O" : "X";

            // Set the initial player to Player A
            currentPlayer = playerA;

            // Update the game status to indicate the current player and hide symbol prompt
            status.textContent = `Current player: ${currentPlayer === playerA ? "Player A (" + playerA + ")" : "Player B (" + playerB + ")"}`;
            
            // Hide the symbol prompt (not provided in your snippet)
            hideSymbolPrompt();
        }
    };


    // Function to show the symbol prompt
    const showSymbolPrompt = () => {
        symbolPrompt.style.display = "block";
    };

    // Function to hide the symbol prompt
    const hideSymbolPrompt = () => {
        symbolPrompt.style.display = "none";
    };

    // Add click event listeners to each cell
    cells.forEach((cell, index) => {
        cell.addEventListener("click", () => handleCellClick(index));
    });

    // Add click event listener to the reset button
    resetButton.addEventListener("click", handleResetClick);

    // Display symbol prompt if Player A hasn't made a selection
    if (!playerA) {
        showSymbolPrompt();
        currentPlayer = "X"; // Default to X until Player A makes a selection
    }

    // Set up event listener for symbol selection buttons
    const symbolButtons = document.querySelectorAll(".symbol-prompt button");
    symbolButtons.forEach((button) => {
        button.addEventListener("click", () => handlePlayerSelection(button.textContent));
    });

    // Show the modal when the "Instructions" button is clicked
    instructionBtn.addEventListener("click", () => {
        modal.style.display = "block";
    });

    // Close the modal when the close button is clicked
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Close the modal when clicking outside the modal content
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});

