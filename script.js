const heading = document.querySelector('.about-text h2');
const subtitle = document.querySelector('.about-subtext');

const headingText = "Hello, my name is Sophia Liu,";
const subtitleText = "and I am an interdisciplinary artist.";

heading.textContent = '';
subtitle.textContent = '';

function typeText(element, text, speed, callback) {
    let i = 0;
    function type() {
        if (i < text.length) {
            element.textContent += text[i];
            i++;
            setTimeout(type, speed);
        } else if (callback) {
            callback(); // starts next animation when done
        }
    }
    type();
}

// type heading first, then subtitle
setTimeout(() => {
    typeText(heading, headingText, 60, () => {
        setTimeout(() => {
            typeText(subtitle, subtitleText, 60, null);
        }, 200); // small pause between the two
    });
}, 500);