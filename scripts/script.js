// Get references to elements
const twitterLoginButton = document.querySelector('.twitter-login');
const githubLoginButton = document.querySelector('.github-login');
const welcomeCheckbox = document.getElementById('welcome-checkbox');
const welcomeMessage = document.getElementById('welcome-message');

// Function to handle login button clicks
function handleLoginClick(event) {
    if (welcomeCheckbox.checked) {
        welcomeMessage.style.display = 'inline';
    } else {
        welcomeMessage.style.display = 'none';
    }
}

// Attach event listeners to login buttons
twitterLoginButton.addEventListener('click', handleLoginClick);
githubLoginButton.addEventListener('click', handleLoginClick);
