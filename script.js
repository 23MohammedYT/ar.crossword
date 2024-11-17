let crosswordData;

// Function to load crossword data
function loadCrosswordData(fileName) {
    fetch(fileName)
        .then((response) => response.json())
        .then((data) => {
            crosswordData = data;
        })
        .catch((error) => console.error("Error loading crossword data:", error));
}

// Call this function to load a specific crossword
loadCrosswordData("data.json");

// Generate crossword grid
function createCrossword() {
    const crossword = document.getElementById("crossword");

    crosswordData.grid.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
			const clues = [...crosswordData.across, ...crosswordData.down];
			const input = document.createElement("input");
            const cellElement = document.createElement("div");
            cellElement.className = "cell";
            if (cell === null) {
                cellElement.classList.add("blocked");
            } else {
                input.setAttribute("maxlength", "1");
                input.dataset.row = rowIndex;
                input.dataset.col = colIndex;
                cellElement.appendChild(input);
            }
            crossword.appendChild(cellElement);
			clues.forEach(clue => {
				if (input.dataset.row == clue.start[0] && input.dataset.col == clue.start[1]) {
					createId(clue.number, clue.start[0], clue.start[1]);
				}
			})
        });
    });
}

// Generate clues
function createClues() {
    const acrossClues = document.getElementById("across-clues");
    const downClues = document.getElementById("down-clues");

    crosswordData.across.forEach((clue) => {
        const li = document.createElement("li");
        li.textContent = `${clue.number}. ${clue.clue}`;
        acrossClues.appendChild(li);
    });

    crosswordData.down.forEach((clue) => {
        const li = document.createElement("li");
        li.textContent = `${clue.number}. ${clue.clue}`;
        downClues.appendChild(li);
    });
}

// Generate Ids
function createId(cell_id, position_x, position_y) {	
	const targetCell = document.querySelector(`input[data-row="${position_x}"][data-col="${position_y}"]`);
	const cell = targetCell.parentElement;
	const label = document.createElement("label");
	const allLabels = document.querySelectorAll('.cell-id');
	label.classList.add("cell-id");
	label.innerHTML = String(cell_id);
	if (cell.querySelector('label') !== null) {
		label.style.left = '100%';
		label.style.right = '0px';
	}
	cell.appendChild(label);	
}

// Check answers
function checkAnswers() {
    const inputs = document.querySelectorAll("#crossword input");

    let correct = true;

    inputs.forEach((input) => {
        const row = input.dataset.row;
        const col = input.dataset.col;

        if (input.value !== crosswordData.grid[row][col]) {
            input.style.backgroundColor = "#f8d7da";
            correct = false;
        } else {
            input.style.backgroundColor = "#d4edda";
        }
    });

    if (correct) {
        alert("تهانينا! كل الإجابات صحيحة!");
    } else {
        alert("هناك إجابات غير صحيحة، حاول مرة أخرى!");
    }
}

document.getElementById("check-answers").addEventListener("click", checkAnswers);

createCrossword();
createClues();
