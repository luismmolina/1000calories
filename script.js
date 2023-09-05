// Update Target Calories
function updateCalories() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    if (currentHour >= 5 && currentHour < 21) {
        const elapsedMinutes = (currentHour - 5) * 60 + currentMinute;
        const targetCalories = (elapsedMinutes * 62.5) / 60;
        document.getElementById('calories').innerText = `${targetCalories.toFixed(2)}`;
        showCatchUpActivities(); // Call to update catch-up activities
    } else {
        document.getElementById('calories').innerText = "N/A";
    }
}

// Register Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(function (registration) {
            console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch(function (error) {
            console.log('Service Worker registration failed:', error);
        });
}

// Save Actual Calories to Local Storage
function saveCalories() {
    const actualCalories = document.getElementById('actualCalories').value;
    localStorage.setItem('actualCalories', actualCalories);
    showCatchUpActivities(); // Call to update catch-up activities
}

// Retrieve saved calories from local storage
window.onload = function() {
    const savedCalories = localStorage.getItem('actualCalories');
    if (savedCalories) {
        document.getElementById('actualCalories').value = savedCalories;
        // Call the function to display catch-up activities
        showCatchUpActivities();
    }
};
// Reset Calories at Midnight
const now = new Date();
const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
const timeToMidnight = midnight - now;
setTimeout(() => {
    localStorage.removeItem('actualCalories');
    document.getElementById('actualCalories').value = 0;
}, timeToMidnight);

// Show Catch-up Activities
function showCatchUpActivities() {
    const targetCalories = parseFloat(document.getElementById('calories').innerText);
    const actualCalories = parseFloat(document.getElementById('actualCalories').value);
    const deficit = targetCalories - actualCalories;

    if (deficit > 0) {
        const rates = {
            'Running': 10,
            'Jogging': 7,
            'Walking': 3.5,
            'Rope Jumping': 12,
            'Doing Squats': 8
        };

        let suggestions = '';
        for (const [activity, rate] of Object.entries(rates)) {
            const time = Math.ceil(deficit / rate);
            suggestions += `<div>${activity}: ${time} minutes</div>`;
        }

        document.getElementById('catchUpActivities').innerHTML = `<h3>Catch-up Activities</h3>${suggestions}`;
    }
}

// Initialize
updateCalories();
// Update every minute (changed from 1 second to 60 seconds)
setInterval(updateCalories, 60000);
