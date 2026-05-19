// Time zone configurations
const timezones = [
    { id: 'clock-ny', offset: -5, name: 'New York' },
    { id: 'clock-london', offset: 0, name: 'London' },
    { id: 'clock-paris', offset: 1, name: 'Paris' },
    { id: 'clock-dubai', offset: 4, name: 'Dubai' },
    { id: 'clock-india', offset: 5.5, name: 'India' },
    { id: 'clock-singapore', offset: 8, name: 'Singapore' },
    { id: 'clock-tokyo', offset: 9, name: 'Tokyo' },
    { id: 'clock-sydney', offset: 11, name: 'Sydney' },
    { id: 'clock-la', offset: -8, name: 'Los Angeles' },
    { id: 'clock-toronto', offset: -5, name: 'Toronto' },
    { id: 'clock-sao-paulo', offset: -3, name: 'São Paulo' },
    { id: 'clock-bangkok', offset: 7, name: 'Bangkok' }
];

function formatTime(hours, minutes, seconds) {
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function updateClocks() {
    const now = new Date();
    const utcHours = now.getUTCHours();
    const utcMinutes = now.getUTCMinutes();
    const utcSeconds = now.getUTCSeconds();

    // Update all timezone clocks
    timezones.forEach(tz => {
        let hours = utcHours + tz.offset;
        const minutes = utcMinutes;
        const seconds = utcSeconds;

        // Handle day wrap-around
        if (hours < 0) {
            hours += 24;
        } else if (hours >= 24) {
            hours -= 24;
        }

        const timeString = formatTime(Math.floor(hours), minutes, seconds);
        const element = document.getElementById(tz.id);
        if (element) {
            element.textContent = timeString;
        }
    });

    // Update local time
    const localHours = now.getHours();
    const localMinutes = now.getMinutes();
    const localSeconds = now.getSeconds();

    const localTimeElement = document.getElementById('local-time');
    if (localTimeElement) {
        localTimeElement.textContent = formatTime(localHours, localMinutes, localSeconds);
    }

    // Update local date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = now.toLocaleDateString('en-US', options);
    const localDateElement = document.getElementById('local-date');
    if (localDateElement) {
        localDateElement.textContent = dateString;
    }
}

// Update clocks immediately and then every second
updateClocks();
setInterval(updateClocks, 1000);

// Log initialization
console.log('⏰ Digital Clock initialized');
console.log('Displaying time for 12 major time zones');
