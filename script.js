function updateCalories() {
    const now = new Date();
    const currentHour = now.getHours();
  
    if (currentHour >= 5 && currentHour <= 21) {
        const elapsedHours = currentHour - 5;
        const targetCalories = elapsedHours * 62.5;
        document.getElementById('calories').innerText = `${targetCalories.toFixed(2)}`;
    }
    else {
        document.getElementById('calories').innerText = "N/A";
    }
}

// Initialize and update every minute
updateCalories();
setInterval(updateCalories, 60000);
