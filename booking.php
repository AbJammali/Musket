<?php 
include "submit_booking.php"; // Include the mail functionality

$error = ""; // Initialize error message

// Check if form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $name = htmlspecialchars($_POST['name']);
    $recipientEmail = htmlspecialchars($_POST['email']);
    $phone = htmlspecialchars($_POST['phone']);
    $selectedDate = htmlspecialchars($_POST['selectedDate']);
    $selectedTime = htmlspecialchars($_POST['selectedTime']);

    // Validate the form fields

    if (!filter_var($recipientEmail, FILTER_VALIDATE_EMAIL)) {
    $error .= "Invalid email format<br>";
    }

    if (empty($name)) {
        $error .= "Subject cannot be empty<br>";
    }
    if (empty($phone)) {
        $error .= "Message cannot be empty<br>";
    }
$error = send_emails($name, $recipientEmail, $phone, $selectedDate, $selectedTime);
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Booking Agenda</title>
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: Montserrat;
    }

    body {
      display: flex;
      justify-content: center;
      padding: 20px;
      background-image: url(./Picture1.png);
      background-repeat: no-repeat;
      background-size: cover;
    }

    .calendar-container {
      width: 100%;
      max-width: 900px;
      background: #ffffff;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      padding: 20px;
    }

    .navigation-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .nav-buttons {
      display: flex;
      gap: 10px;
    }

    .nav-button {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 18px;
      padding: 5px;
      color: #333;
      transition: color 0.3s;
    }

    .nav-button:hover {
      color: #007bff;
    }

    .current-date {
      font-size: 18px;
      font-weight: bold;
      text-align: right;
    }

    .date-selector {
      display: flex;
      overflow-x: auto;
      gap: 10px;
      margin-bottom: 20px;
    }

    .date-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 10px;
      min-width: 60px;
      background: #f0f0f0;
      border-radius: 8px;
      cursor: pointer;
      transition: background 0.3s;
      width: -webkit-fill-available ;
    }

    .date-item.active {
        min-width: 50px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 4px;
        border-radius: 8px;
        cursor: pointer;
        color: rgb(255, 255, 255);
        background: rgb(15, 138, 140);
    }

    .date-item span {
      font-size: 14px;
      font-weight: bold;
    }

    .time-section {
      margin: 20px 0;
    }

    .time-section h3 {
      font-size: 18px;
      color: #333;
      margin-bottom: 10px;
    }

    .time-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
      gap: 10px;
    }

    .timeslot {
      padding: 10px;
      background: #f0f0f0;
      border-radius: 6px;
      text-align: center;
      cursor: pointer;
      transition: background 0.3s;
    }

    .timeslot:hover {
      background: #007bff;
      color: white;
    }

    .timeslot.active {
      background: #28a745;
      color: white;
    }
    
    .date-item.friday {
      background: #d3d3d3;
      cursor: not-allowed;
      pointer-events: none;
    }

          .header-section {
      display: flex;
      align-items: center;
      justify-content: space-between;
      /*background: #f1f1f1; */
      padding: 10px;
      border-radius: 8px;
      border-bottom: 2px solid #f1f1f1;
      font-size: 24px;
      font-weight: bold;
    }

    .logo-container {
      display: flex;
      align-items: center;
      border-radius: 12px;
      padding: 15px;
      gap: 15px;
      border-bottom: 2px solid #f1f1f1;
    }

    .logo-icon {
      height: 60px;
      width: 60px;
      border-radius: 50%;
      margin-right: 15px;
    }

    .company-name h2 {
      font-size: 24px;
      color: #333;
      font-weight: bold;
    }

    .logo-container img {
      width: 80px;
      height: 80px;
      border-radius: 8px;
      object-fit: cover;
    }

    .company-details {
      display: flex;
      flex-direction: column;
    }

    .company-title {
      font-size: 18px;
      font-weight: bold;
      color: #333;
    }

    .company-subtitle {
      color: #666;
      margin: 5px 0;
    }

    .company-info {
      color: #007bff;
      font-size: 14px;
    }
      
    /* New Form Styling */
    .form-container {
      display: none;
      margin-top: 20px;
      padding: 20px;
      background: #f9f9f9;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .form-container input {
      width: 100%;
      padding: 10px;
      margin: 10px 0;
      border-radius: 6px;
      border: 1px solid #ddd;
    }

    .form-container button {
      padding: 10px 15px;
      background: rgb(15, 138, 140);
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: background 0.3s;
    }

    .form-container button:hover {
      background: rgb(75, 146, 128);
    }
      
      /* Modal Popup Styles */
        .modal {
            display: none; /* Hidden by default */
            position: fixed;
            z-index: 1;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.4); /* Black background with opacity */
            overflow: auto; /* Enable scroll if needed */
            padding-top: 60px;
        }
        .modal-content {
            margin: 5% auto;
            padding: 20px;
            border: 1px solid gold;
            width: 104%;
            max-width: 500px;
            border-radius: 10px;
            background-image: radial-gradient(ellipse farthest-corner at right bottom, #0F8A8C 0%, #0F8A8C 8%, #0F8A8C 30%, #0F8A8C 40%, transparent 80%), radial-gradient(ellipse farthest-corner at left top, #032E3B 8%, #032E3B 25%, #032E3B 62.5%, #0F8A8C 100%);
        }
        .close {
            color: gold;
            float: right;
            font-size: 28px;
            font-weight: bold;
        }
        .close:hover,
        .close:focus {
            color: black;
            text-decoration: none;
            cursor: pointer;
        }
        #resultMessage {
            color: white;
            font-size: 20px;
        }
      
  </style>
</head>
<body>
  <div class="calendar-container">
    <div class="header-section">Book Your Appointment</div>
    <div class="logo-container">
      <img src="./Centrum.jpg" alt="Company Logo" class="logo-icon">

      <div class="company-details">
        <div class="company-title">OKM Ośrodek Kultury Muzułmańskiej</div>
        <div class="company-subtitle">Learn more about Islam</div>
        <div class="company-info">Free &bull; 30 minutes</div>
      </div>
    </div>

    <div class="navigation-bar">
      <div class="current-date" id="currentDate"></div>
      <div class="nav-buttons">
        <button class="nav-button" id="prevWeek">&#8249;</button>
        <button class="nav-button" id="nextWeek">&#8250;</button>
      </div>
    </div>

    <div class="date-selector" id="dateSelector"></div>

    <div class="time-section">
      <h3>Morning</h3>
      <div class="time-grid" id="morningSlots">
        <div class="timeslot" data-time="9:00 AM">9:00 AM</div>
        <div class="timeslot" data-time="10:00 AM">10:00 AM</div>
        <div class="timeslot" data-time="11:00 AM">11:00 AM</div>
      </div>
    </div>

    <div class="time-section">
      <h3>Afternoon</h3>
      <div class="time-grid" id="afternoonSlots">
        <div class="timeslot" data-time="12:00 PM">12:00 PM</div>
        <div class="timeslot" data-time="1:00 PM">1:00 PM</div>
        <div class="timeslot" data-time="2:00 PM">2:00 PM</div>
        <div class="timeslot" data-time="3:00 PM">3:00 PM</div>
      </div>
    </div>

    <!-- New User Details Form -->
    <form class="form-container" id="formContainer" method="POST">
      <h3>Enter Your Details</h3>
      <input type="text" id="name" name="name" placeholder="Your Name" required />
      <input type="email" id="email" name="email" placeholder="Your Email" required />
      <input type="tel" id="phone" name="phone" placeholder="Your Phone Number" required />
      <input type="hidden" id="selectedDate" name="selectedDate" />
      <input type="hidden" id="selectedTime" name="selectedTime" />
      <button type="submit">Submit</button>
    </form>

  </div>
    
    <!-- Modal to display the result -->
    <div id="resultModal" class="modal">
        <div class="modal-content">
            <span class="close" onclick="closeModal()">&times;</span>
            <p id="resultMessage"><?php echo $error; ?></p>
        </div>
    </div>

  <script>
    const dateSelector = document.getElementById('dateSelector');
    const currentDateDisplay = document.getElementById('currentDate');
    const formContainer = document.getElementById('formContainer');
    const selectedDateInput = document.getElementById('selectedDate');
    const selectedTimeInput = document.getElementById('selectedTime');
    const today = new Date();
    let currentStartDate = new Date();
    let selectedDate = null;
    let selectedTime = null;

    function renderDates() {
      dateSelector.innerHTML = '';
      for (let i = 0; i < 7; i++) { 
        const date = new Date(currentStartDate);
        date.setDate(currentStartDate.getDate() + i);
        
        const isFriday = date.getDay() === 5; // 5 for Friday
        const dateItem = document.createElement('div');
        dateItem.classList.add('date-item');
        
        if (isFriday) {
          dateItem.classList.add('friday'); // Special class for Fridays
        }

        if (i === 0) dateItem.classList.add('active');

        dateItem.innerHTML = `
          <span>${date.toLocaleDateString('en-US', { weekday: 'short' })}</span>
          <span>${date.getDate()}</span>
        `;

        dateItem.addEventListener('click', () => {
          document.querySelectorAll('.date-item').forEach(item => item.classList.remove('active'));
          dateItem.classList.add('active');
          selectedDate = date; // Save selected date
          selectedDateInput.value = date.toISOString().split('T')[0]; // Set the hidden input value for date
          checkFormDisplay();
        });

        dateSelector.appendChild(dateItem);
      }
      currentDateDisplay.textContent = `${currentStartDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}`;
    }

    function checkFormDisplay() {
      if (selectedDate && selectedTime) {
        formContainer.style.display = 'block'; // Show form once date and time are selected
      }
    }

    function handleTimeSlotSelection() {
      document.querySelectorAll('.timeslot').forEach(slot => {
        slot.addEventListener('click', () => {
          document.querySelectorAll('.timeslot').forEach(item => item.classList.remove('active'));
          slot.classList.add('active');
          selectedTime = slot.getAttribute('data-time'); // Save selected time
          selectedTimeInput.value = selectedTime; // Set the hidden input value for time
          checkFormDisplay();
        });
      });
    }

    function changeWeek(direction) {
      currentStartDate.setDate(currentStartDate.getDate() + (direction * 7));
      renderDates();
    }

    document.getElementById('prevWeek').addEventListener('click', () => changeWeek(-1));
    document.getElementById('nextWeek').addEventListener('click', () => changeWeek(1));

    renderDates();
    handleTimeSlotSelection();
      
      // Show the modal if there is a result message
        <?php if ($error != ""): ?>
            document.getElementById('resultModal').style.display = "block";
        <?php endif; ?>

        // Function to close the modal
        function closeModal() {
            document.getElementById('resultModal').style.display = "none";
        }
  </script>
</body>
</html>
