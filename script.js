function updateCalories() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
  
    if (currentHour >= 5 && currentHour < 21) {  // Changed <= to < for 21 to match 9 PM
        const elapsedMinutes = (currentHour - 5) * 60 + currentMinute;
        const targetCalories = (elapsedMinutes * 62.5) / 60;  // Added minutes to the calculation
        document.getElementById('calories').innerText = `${targetCalories.toFixed(2)}`;
    }
    else {
        document.getElementById('calories').innerText = "N/A";
    }
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
      .then(function(registration) {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(function(error) {
        console.log('Service Worker registration failed:', error);
      });
  }
  
// Initialize and update every minute
updateCalories();
setInterval(updateCalories, 1000);
