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
	});
	
	game.style.display = 'none';
} else {
    console.log("The user is not on a mobile device.");
	document.querySelectorAll('.mobile-only').forEach(object => {
		object.style.display = 'none';
	});
}

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
		}, 1000); // 1000 milliseconds = 1 second
	})
})

document.getElementById('settings-game').addEventListener('click', ()=> {
	settingsMobile.style.animation = 'none'; // Remove the animation
	void settingsMobile.offsetWidth;         // Force reflow
	settingsMobile.style.animation = 'fading .5s linear forwards';
	settingsMobile.style.pointerEvents = 'auto';
})

document.getElementById('about').addEventListener('click', ()=> {
	aboutMobile.style.animation = 'none'; // Remove the animation
	void aboutMobile.offsetWidth;         // Force reflow
	aboutMobile.style.animation = 'fading .5s linear forwards';
	aboutMobile.style.pointerEvents = 'auto';
})

document.getElementById('exit').addEventListener('click', ()=> {
	if (confirm("هل تريد إنهاء التطبيق؟")) {
        // Attempt to close the window
        window.close();

        // If window.close() doesn't work, navigate to a different page
        if (!window.closed) {
            window.location.href = "about:blank"; // Navigate to a blank page
        }
    }
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
		}, 1000); // 1000 milliseconds = 1 second
	})
})