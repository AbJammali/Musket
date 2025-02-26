////////////////////////////////// Praying Time /////////////////////////////////////
   const apiUrl = "https://api.aladhan.com/v1/timingsByCity?city=Warsaw&country=Poland&method=3";

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        if (data.code === 200) {
          const timings = data.data.timings;
          const gregorianDate = data.data.date.gregorian.date;
          const hijriDate = data.data.date.hijri.date;

          // Update the sub-header with both dates
          document.getElementById('date-container').textContent = `Сегодня ${gregorianDate} | Хиджра ${hijriDate}`;

          const currentTime = new Date();
          const prayerCardsContainer = document.getElementById('prayer-cards-container');
          const orderedPrayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"]; // Only main 5 prayers
          const backgroundImages = {
            Fajr: '/Musket3/image/praying/fajr-pray.png', // Example background image for Fajr
            Dhuhr: '/Musket3/image/praying/dohr-pray.png',
            Asr: '/Musket3/image/praying/asr-pray.png',
            Maghrib: '/Musket3/image/praying/magreb-pray.png',
            Isha: '/Musket3/image/praying/isha-pray.jpg',
          };

          orderedPrayers.forEach(prayer => {
            if (timings[prayer]) {
              const prayerTime = new Date(`${currentTime.toDateString()} ${timings[prayer]}`);
              const isUpcoming = prayerTime > currentTime;

              const card = document.createElement('div');
              card.classList.add('card');
              if (isUpcoming && !document.querySelector('.highlight')) {
                card.classList.add('highlight');
                card.style.backgroundImage = `url('${backgroundImages[prayer]}')`;
                card.innerHTML = `
                  <div class="header">Предстоящая молитва</div>
                  <div class="header">${prayer}</div>
                  <div class="countdown" id="countdown-timer">${calculateCountdown(prayerTime)}</div>
                  <div class="time">${timings[prayer]}</div>
                `;
                setInterval(() => {
                  document.getElementById('countdown-timer').textContent = calculateCountdown(prayerTime);
                }, 1000);
              } else {
                card.innerHTML = `
                  <div class="header">${prayer}</div>
                  <div class="time">${timings[prayer]}</div>
                `;
              }

              prayerCardsContainer.appendChild(card);
            }
          });
        } else {
          console.error('Error fetching data:', data);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });

    function calculateCountdown(prayerTime) {
      const now = new Date();
      const diff = prayerTime - now;

      if (diff <= 0) return '00:00:00';

      const hours = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, '0');
      const minutes = String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
      const seconds = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, '0');

      return `${hours}:${minutes}:${seconds}`;
    }