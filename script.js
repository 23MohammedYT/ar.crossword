let crosswordData;

// Function to load a random crossword data file
function loadRandomCrosswordData() {
    // List of available crossword data files
    const files = ["data1.json", "data2.json", "data3.json"];

    // Select a random file from the list
    const randomFile = files[Math.floor(Math.random() * files.length)];

    // Fetch the selected file
    fetch(randomFile)
        .then((response) => response.json())
        .then((data) => {
            crosswordData = data;
            initializeCrossword(); // Call the function to create the crossword
        })
        .catch((error) => console.error("Error loading crossword data:", error));
}

// Function to initialize the crossword
function initializeCrossword() {
    createCrossword(); // Generate the grid
    createClues(); // Generate clues
}

// Load a random crossword on page load
loadRandomCrosswordData();



// Fullscreen toggle function
function toggleFullscreen() {
	const checkbox = document.getElementById('pill3');

	if (checkbox.checked) {
		fullscreenMode();		
		localStorage.setItem('fullscreen', true);
	} else {
		cancelFullscreen();
		localStorage.setItem('fullscreen', false);
	}
}

function fullscreenMode() {
	if (document.documentElement.requestFullscreen) {
		document.documentElement.requestFullscreen();
	} else if (document.documentElement.mozRequestFullScreen) { // Firefox
		document.documentElement.mozRequestFullScreen();
	} else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari and Opera
		document.documentElement.webkitRequestFullscreen();
	} else if (document.documentElement.msRequestFullscreen) { // IE/Edge
		document.documentElement.msRequestFullscreen();
	}
}

function cancelFullscreen() {
	if (document.exitFullscreen) {
		document.exitFullscreen();
	} else if (document.mozCancelFullScreen) { // Firefox
		document.mozCancelFullScreen();
	} else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
		document.webkitExitFullscreen();
	} else if (document.msExitFullscreen) { // IE/Edge
		document.msExitFullscreen();
	}
}

document.addEventListener('DOMContentLoaded', () => {
	if (localStorage.getItem('darkmode') === null) {
		localStorage.setItem('darkmode', false);
	} if (localStorage.getItem('fullscreen') === null) {
		if (document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
			localStorage.setItem('fullscreen', true);
		} else {
			localStorage.setItem('fullscreen', false);
		}
	}
	
	// Check localStorage for dark mode preference on page load
	if (localStorage.getItem('darkmode') === 'true') {
		document.body.classList.add('dark-mode');
        darkModeContent.textContent = "light_mode";
	} else {
		document.body.classList.remove('dark-mode');
        darkModeContent.textContent = "dark_mode";
	}
	
	// Check localStorage for fullscreen preference on page load
	if (localStorage.getItem('fullscreen') === 'true') {
		document.getElementById('pill3').checked = true;
	} else {
		document.getElementById('pill3').checked = false
	}
	
	updateScrollbarStyle();
})

// Event listener for F11 keypress
document.addEventListener('keydown', function(event) {
    if (event.key === 'F11') {
        event.preventDefault(); // Prevent default behavior of F11
		if (document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
			cancelFullscreen();
			document.getElementById('pill3').checked = false
			localStorage.setItem('fullscreen', false);
		} else {
			fullscreenMode();
			document.getElementById('pill3').checked = true;
			localStorage.setItem('fullscreen', true);
		}
    }
});

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
            input.style.color = "#444";
            correct = false;
        } else {
            input.style.backgroundColor = "#d4edda";
            input.style.color = "#444";
        }
    });

    if (correct) {
        alert("تهانينا! كل الإجابات صحيحة!");
    } else {
        alert("هناك إجابات غير صحيحة، حاول مرة أخرى!");
    }
}

// getting HTML elements
const nav = document.querySelector("nav"),
toggleBtn = nav.querySelector(".toggle-btn");

toggleBtn.addEventListener("click" , () =>{
	nav.classList.toggle("open");
});

// Dark Mode Toggle
const darkModeToggle = document.getElementById("dark-mode-toggle");
const darkModeContent = document.getElementById("dark-mode-toggle").querySelector("i");

darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    // Toggle between dark_mode and light_mode icons
    if (document.body.classList.contains("dark-mode")) {
        darkModeContent.textContent = "light_mode";
		localStorage.setItem('darkmode', 'true');
		updateScrollbarStyle();
    } else {
        darkModeContent.textContent = "dark_mode";
		localStorage.setItem('darkmode', 'false');
		updateScrollbarStyle();
    }
});

function updateScrollbarStyle() {
    const existingStyle = document.getElementById("dark-mode-scrollbar-style");

    if (document.body.classList.contains("dark-mode")) {
        // Add dark mode scrollbar styles if not already present
        if (!existingStyle) {
            const style = document.createElement("style");
            style.id = "dark-mode-scrollbar-style";
            style.textContent = `
                ::-webkit-scrollbar-track { 
                    background: #333333; /* Dark background for the track */
                }
                ::-webkit-scrollbar-thumb { 
                    background: #888888; /* Lighter thumb for dark mode */
                }
                ::-webkit-scrollbar-thumb:hover { 
                    background: #777777; /* Slightly darker on hover */
                }
                ::-webkit-scrollbar-thumb:active { 
                    background: #666666; /* Even darker when clicked */
                }
            `;
            document.head.appendChild(style);
        }
    } else {
        // Remove dark mode scrollbar styles if present
        if (existingStyle) {
            existingStyle.remove();
        }
    }
}

const moreButton = document.getElementById("more");
const black_back = document.querySelector('#black-back');
const about_menu = document.querySelector('.about-menu');
const close_about = document.querySelector('.close-about');

moreButton.addEventListener("click", () => {
	black_back.style.display = 'block';
	about_menu.style.top = '42%';
})

close_about.addEventListener("click", () => {
	black_back.style.display = 'none';
	about_menu.style.top = '150%';
})

const settingsButton = document.getElementById("settings");
const settingsMenu = document.querySelector('.settings-menu');
const close_settings = document.querySelector('.close-settings');

settingsButton.addEventListener("click", () => {
	black_back.style.display = 'block';
	settingsMenu.style.top = '42%';
})

close_settings.addEventListener("click", () => {
	black_back.style.display = 'none';
	settingsMenu.style.top = '150%';
})

black_back.addEventListener("click", () => {
	black_back.style.display = 'none';
	about_menu.style.top = '150%';
	settingsMenu.style.top = '150%';
})

document.getElementById("check-answers").addEventListener("click", checkAnswers);
