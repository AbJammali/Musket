document.addEventListener("DOMContentLoaded", function() {
                const dateSelector = document.getElementById('dateSelector');
                const formContainer = document.getElementById('formContainer');
                const selectedDateInput = document.getElementById('selectedDate');
                const selectedTimeInput = document.getElementById('selectedTime');
                const prevWeekButton = document.getElementById('prevWeek');
                const nextWeekButton = document.getElementById('nextWeek');
                const currentDateDisplay = document.getElementById('currentDate'); 
                let selectedDate = null;
                let selectedTime = null;
                let currentWeekStartDate = new Date(); // Start with the current week

                const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM'];

                function updateCurrentDateDisplay() {
                    currentDateDisplay.innerHTML = currentWeekStartDate.toLocaleDateString('pl-PL', { 
                        weekday: 'long', 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric' 
                    });
                }

                function renderDates() {
                    dateSelector.innerHTML = '';
                    for (let i = 0; i < 7; i++) {
                        const date = new Date(currentWeekStartDate);
                        date.setDate(date.getDate() + i);

                        const dateItem = document.createElement('div');
                        dateItem.classList.add('date-item');
                        if (date.getDay() === 5) dateItem.classList.add('friday'); // Disable Friday if needed

                        dateItem.innerHTML = `<span>${date.toLocaleDateString('pl-PL', { weekday: 'short' })}</span><span>${date.getDate()}</span>`;

                        dateItem.addEventListener('click', () => {
                            if (dateItem.classList.contains('friday')) return;
                            document.querySelectorAll('.date-item').forEach(item => item.classList.remove('active'));
                            dateItem.classList.add('active');
                            selectedDate = date.toISOString().split('T')[0];
                            selectedDateInput.value = selectedDate;
                            checkFormDisplay();
                            checkAvailability();  // Check availability whenever a date is selected
                        });

                        dateSelector.appendChild(dateItem);
                    }
                    let previousWeek = new Date(currentWeekStartDate);
                    previousWeek.setDate(previousWeek.getDate() - 7);

                    // Disable if the start of the previous week is before the start of the current week
                    let currentWeekStart = new Date();
                    currentWeekStart.setDate(currentWeekStart.getDate() - (currentWeekStart.getDay())); // Start of the current week
                    currentWeekStart.setHours(0, 0, 0, 0);

                    if (previousWeek < currentWeekStart) {
                        prevWeekButton.classList.add('disabled');
                    } else {
                        prevWeekButton.classList.remove('disabled');
                    }

                    updateCurrentDateDisplay();
                }


                function checkAvailability() {
                    if (!selectedDate) return;

                    fetch('check_availability.php?date=' + selectedDate)
                        .then(response => response.json())
                        .then(data => {
                        document.querySelectorAll('.timeslot').forEach(slot => {
                            const time = slot.dataset.time;
                            if (data[selectedDate] && data[selectedDate][time] >= 2) {
                                slot.classList.add('grayed-out'); // Gray out fully booked slots
                                slot.classList.remove('active');  // Ensure they don’t appear selected
                                slot.disabled = true;
                            } else {
                                slot.classList.remove('grayed-out');
                                slot.disabled = false;
                            }
                        });
                    });
                }
                // Attach checkAvailability() to date selection
                document.querySelectorAll('.date-item').forEach(dateItem => {
                    dateItem.addEventListener('click', () => {
                        checkAvailability();  // Run availability check as soon as a date is selected
                    });
                });


                function checkFormDisplay() {
                    if (selectedDate && selectedTime) formContainer.style.display = 'block';
                }

                prevWeekButton.addEventListener('click', () => {
                    currentWeekStartDate.setDate(currentWeekStartDate.getDate() - 7);
                    renderDates();
                });

                nextWeekButton.addEventListener('click', () => {
                    currentWeekStartDate.setDate(currentWeekStartDate.getDate() + 7);
                    renderDates();
                });

                renderDates();

                document.querySelectorAll('.timeslot').forEach(slot => {
                    slot.addEventListener('click', () => {
                        if (slot.disabled) return;
                        document.querySelectorAll('.timeslot').forEach(item => item.classList.remove('active'));
                        slot.classList.add('active');
                        selectedTime = slot.dataset.time;
                        selectedTimeInput.value = selectedTime;
                        checkFormDisplay();
                    });
                });

                <?php if (!empty($error)): ?>
                document.getElementById('resultMessage').innerHTML = "<?php echo addslashes($error); ?>";
                <?php endif; ?>
            });