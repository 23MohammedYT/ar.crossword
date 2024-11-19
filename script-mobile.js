const background_main = new Audio('mainmenu.mp3');
const background_game = new Audio('background.mp3');
const start_game = new Audio('startgame.mp3');
const selecting = new Audio('selecting.mp3');

// Function to stop all audio objects in a group
function stopAllAudios(audioGroup) {
	audioGroup.forEach(audio => {
		audio.pause();       // Pause the audio
		audio.currentTime = 0; // Reset playback to the beginning
	});
}

const overlay = document.getElementById('overlay');
const mainmenu = document.querySelector('.main-menu');
const game = document.querySelector('.game-container');
const settingsMobile = document.querySelector('.custom-settings-menu');
const aboutMobile = document.querySelector('.about-container');

function isMobileDevice() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    return /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
}

// Example usage:
if (isMobileDevice()) {
    console.log("The user is on a mobile device.");
	document.querySelectorAll('.pc-only').forEach(object => {
		object.style.display = 'none';
		document.querySelector('.gameTitle').id = 'gameTitle';
		document.querySelector('.clues').id = 'gameGuide';
		document.querySelector('.main-container').style.margin = '15px auto';
		
		background_main.loop = true; // Enable looping
        background_main.volume = 0.5; // Set initial volume
		background_game.loop = true; // Enable looping
        background_game.volume = 0.5; // Set initial volume
        start_game.volume = 0.5; // Set initial volume
        selecting.volume = 0.5; // Set initial volume

		document.addEventListener('DOMContentLoaded', function() {
			background_main.play();
		})
	});
	
	game.style.display = 'none';
} else {
    console.log("The user is not on a mobile device.");
	document.querySelectorAll('.mobile-only').forEach(object => {
		object.style.display = 'none';
	});
}

// Volume slider
const backgroundSlider = document.getElementById('background-slider');
const uiSlider = document.getElementById('ui-slider');

// Update volume based on slider value
backgroundSlider.addEventListener('input', function () {
	background_main.volume = parseFloat(this.value);
	background_game.volume = parseFloat(this.value);
});

uiSlider.addEventListener('input', function () {
	start_game.volume = parseFloat(this.value);
	selecting.volume = parseFloat(this.value);
});

document.getElementById('start-game').addEventListener('click', ()=> {
	overlay.style.display = 'block';
	overlay.style.animation = 'none'; // Remove the animation
	void overlay.offsetWidth;         // Force reflow
	overlay.style.animation = 'fading 1s linear forwards';
	overlay.style.pointerEvents = 'auto';
	overlay.addEventListener('animationend', () => {
		setTimeout(() => {
			game.style.display = 'block';
			overlay.style.display = 'none';
			mainmenu.style.display = 'none';
			overlay.style.pointerEvents = 'none';
			background_main.pause();
			background_game.play();
		}, 1000); // 1000 milliseconds = 1 second
	})
	
	stopAllAudios([start_game, selecting, background_main]);
	start_game.play();
})

document.getElementById('settings-game').addEventListener('click', ()=> {
	settingsMobile.style.animation = 'none'; // Remove the animation
	void settingsMobile.offsetWidth;         // Force reflow
	settingsMobile.style.animation = 'fading .5s linear forwards';
	settingsMobile.style.pointerEvents = 'auto';
	stopAllAudios([start_game, selecting]);
	selecting.play();
})

document.getElementById('about').addEventListener('click', ()=> {
	aboutMobile.style.animation = 'none'; // Remove the animation
	void aboutMobile.offsetWidth;         // Force reflow
	aboutMobile.style.animation = 'fading .5s linear forwards';
	aboutMobile.style.pointerEvents = 'auto';
	stopAllAudios([start_game, selecting]);
	selecting.play();
})

document.getElementById('exit').addEventListener('click', ()=> {
	if (confirm("هل تريد إنهاء التطبيق؟")) {
        // Attempt to close the window
        window.close();

        // If window.close() doesn't work, navigate to a different page
        if (!window.closed) {
            window.location.href = "about:blank"; // Navigate to a blank page
			navigator.app.exitApp();
			window.AndroidInterface.closeApp();
        }
    }
	
	stopAllAudios([start_game, selecting]);
	selecting.play();
})

document.querySelectorAll('.close-custom-settings').forEach((button) => {
    button.addEventListener('click', () => {
		if (settingsMobile.style.pointerEvents === 'auto') {
			settingsMobile.style.animation = 'none'; // Remove the animation
			void settingsMobile.offsetWidth;         // Force reflow
			settingsMobile.style.animation = 'fading .5s linear reverse';
			settingsMobile.style.pointerEvents = 'none';
		}
        
		if (aboutMobile.style.pointerEvents === 'auto') {
			aboutMobile.style.animation = 'none'; // Remove the animation
			void aboutMobile.offsetWidth;         // Force reflow
			aboutMobile.style.animation = 'fading .5s linear reverse';
			aboutMobile.style.pointerEvents = 'none';
		}
		
		stopAllAudios([start_game, selecting]);
		selecting.play();
    });
});

function toggleDarkmode() {
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
}

const openMenu = document.getElementById('gameGuide');

function gameMenu() {
	openMenu.style.top = '0px';
}

document.querySelector('.btn-close').addEventListener('click', ()=> {
	openMenu.style.top = '-110%';
	stopAllAudios([start_game, selecting]);
	selecting.play();
})
	
document.querySelector('.btn-exit').addEventListener('click', ()=> {
	overlay.style.display = 'block';
	overlay.style.animation = 'none'; // Remove the animation
	void overlay.offsetWidth;         // Force reflow
	overlay.style.animation = 'fading 1s linear forwards';
	overlay.style.pointerEvents = 'auto';
	overlay.addEventListener('animationend', () => {
		setTimeout(() => {
			game.style.display = 'none';
			overlay.style.display = 'none';
			openMenu.style.top = '-110%';
			overlay.style.pointerEvents = 'none';
			mainmenu.style.display = 'flex';
			background_game.pause();
			background_main.play();
		}, 1000); // 1000 milliseconds = 1 second
		stopAllAudios([start_game, selecting, background_game]);
		selecting.play();
	})
})
