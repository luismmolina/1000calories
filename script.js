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

// Initialize and update every minute
updateCalories();
setInterval(updateCalories, 1000);
