// Theme functionality
function toggleTheme() {
  const body = document.body;
  const themeBtn = document.getElementById("themeToggle");
  
  body.classList.toggle("dark-theme");
  body.classList.toggle("light-theme");
  
  // Save preference to localStorage
  const isDark = body.classList.contains("dark-theme");
  localStorage.setItem("darkMode", isDark);
  
  // Update button icon
  themeBtn.textContent = isDark ? "🌞" : "🌙";
}

function initTheme() {
  const savedTheme = localStorage.getItem("darkMode") === "true";
  const body = document.body;
  const themeBtn = document.getElementById("themeToggle");
  
  if (savedTheme) {
    body.classList.add("dark-theme");
    body.classList.remove("light-theme");
    themeBtn.textContent = "🌞";
  } else {
    body.classList.add("light-theme");
    body.classList.remove("dark-theme");
    themeBtn.textContent = "🌙";
  }
}

// Section navigation
function showSection(id) {
  const sections = document.querySelectorAll('main section');
  sections.forEach(sec => sec.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// Messages functionality
let messages = [
  { sender: 'Teacher', text: '--- Connecting', time: '....', type: '....' },
  { sender: 'You', text: '....!', time: '....', type: '....' },
  { sender: 'Teacher', text: '.....', time: '....', type: '....' }
];

let chatMessages = [
  { sender: 'Teacher', text: '....', time: '....', type: '....' },
  { sender: 'You', text: '.....', time: '....', type: '....' }
];

function renderMessages() {
  const messagesBox = document.getElementById("messagesBox");
  if (!messagesBox) return;
  
  messagesBox.innerHTML = '';
  messages.forEach(msg => {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${msg.type}`;
    messageDiv.innerHTML = `
      <div><strong>${msg.sender}:</strong> ${msg.text}</div>
      <div class="message-time">${msg.time}</div>
    `;
    messagesBox.appendChild(messageDiv);
  });
  messagesBox.scrollTop = messagesBox.scrollHeight;
}

function renderChatMessages() {
  const chatMessagesBox = document.getElementById("chatMessages");
  if (!chatMessagesBox) return;
  
  chatMessagesBox.innerHTML = '';
  chatMessages.forEach(msg => {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${msg.type}`;
    messageDiv.innerHTML = `
      <div><strong>${msg.sender}:</strong> ${msg.text}</div>
      <div class="message-time">${msg.time}</div>
    `;
    chatMessagesBox.appendChild(messageDiv);
  });
  chatMessagesBox.scrollTop = chatMessagesBox.scrollHeight;
}

function sendMessage() {
  const input = document.getElementById("messageInput");
  const message = input.value.trim();
  if (!message) return;
  
  const newMessage = {
    sender: 'You',
    text: message,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    type: 'sent'
  };
  
  messages.push(newMessage);
  renderMessages();
  input.value = '';
  
  // Simulate reply after 1 second with modern chat style
  setTimeout(() => {
    const replies = [
      "Thanks for your message!",
      "I'll get back to you soon.",
      "Can you please clarify?",
      "That's a good point.",
      "I'll check and let you know."
    ];
    const reply = {
      sender: 'Teacher',
      text: replies[Math.floor(Math.random() * replies.length)],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'received'
    };
    messages.push(reply);
    renderMessages();
  }, 1000);
}

// Render messages with modern chat style
function renderMessages() {
  const messagesBox = document.getElementById("messagesBox");
  if (!messagesBox) return;
  
  messagesBox.innerHTML = '';
  messages.forEach(msg => {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${msg.type} d-flex mb-2`;
    messageDiv.style.justifyContent = msg.type === 'sent' ? 'flex-end' : 'flex-start';
    
    const bubble = document.createElement('div');
    bubble.className = 'p-2 rounded';
    bubble.style.maxWidth = '70%';
    bubble.style.backgroundColor = msg.type === 'sent' ? '#0d6efd' : '#e9ecef';
    bubble.style.color = msg.type === 'sent' ? 'white' : 'black';
    
    const text = document.createElement('div');
    text.textContent = msg.text;
    bubble.appendChild(text);
    
    const time = document.createElement('div');
    time.textContent = msg.time;
    time.style.fontSize = '0.75rem';
    time.style.textAlign = 'right';
    time.style.marginTop = '2px';
    bubble.appendChild(time);
    
    messageDiv.appendChild(bubble);
    messagesBox.appendChild(messageDiv);
  });
  messagesBox.scrollTop = messagesBox.scrollHeight;
}

function sendChatMessage() {
  const input = document.getElementById("chatInput");
  const message = input.value.trim();
  if (!message) return;
  
  const newMessage = {
    sender: 'You',
    text: message,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    type: 'sent'
  };
  
  chatMessages.push(newMessage);
  renderChatMessages();
  input.value = '';
  
  // Simulate reply after 1 second
  setTimeout(() => {
    const replies = [
      "I'll check and let you know.",
      "Thanks for reaching out!",
      "Can we discuss this in person?",
      "That's a good point.",
      "Let me review and get back to you."
    ];
    const reply = {
      sender: 'Teacher',
      text: replies[Math.floor(Math.random() * replies.length)],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'received'
    };
    chatMessages.push(reply);
    renderChatMessages();
  }, 1000);
}

function scheduleMeeting() {
  alert("Meeting scheduling functionality would be implemented here.\nThis would typically open a form or modal to schedule a new meeting.");
}

// Initialize chat modal
const chatModal = new bootstrap.Modal(document.getElementById('chatModal'));

function openChat() {
  chatModal.show();
}

// Example: Fetch announcements from backend and render in the UI
async function fetchAnnouncements() {
  try {
    const res = await fetch('/api/announcements');
    const data = await res.json();
    if (data.success && Array.isArray(data.data)) {
      const list = document.getElementById('announcementList');
      if (list) {
        list.innerHTML = '';
        data.data.slice(0, 5).forEach(announcement => {
          const li = document.createElement('li');
          li.className = 'list-group-item';
          li.innerHTML = `<strong>${announcement.teacher?.name || 'Teacher'}</strong> (${new Date(announcement.createdAt).toLocaleDateString()}):<div>${announcement.message}</div>`;
          list.appendChild(li);
        });
      }
    }
  } catch (err) {
    console.error('Failed to fetch announcements:', err);
  }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Add event listeners
  document.getElementById("themeToggle").addEventListener("click", toggleTheme);
  
  // Initialize components
  initTheme();
  renderMessages();

  // Call fetchAnnouncements on page load (if announcementList exists)
  if (document.getElementById('announcementList')) {
    fetchAnnouncements();
  }

  // Load students for attendance dropdown
  fetchStudentsForAttendance();

  // Load attendance records for today by default
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('attendanceDate').value = today;
  fetchAttendanceRecords(today);

  // Attendance form submission
  document.getElementById('attendanceForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const studentId = document.getElementById('attendanceStudent').value;
    const date = document.getElementById('attendanceDate').value;
    const status = document.getElementById('attendanceStatus').value;

    if (!studentId || !date || !status) {
      alert('Please fill all attendance fields.');
      return;
    }

    try {
      const res = await fetch('/api/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId, date, status })
      });
      const data = await res.json();
      if (data.success) {
        alert('Attendance marked successfully.');
        fetchAttendanceRecords(date);
        updateTeacherChart();
      } else {
        alert('Failed to mark attendance: ' + data.message);
      }
    } catch (err) {
      alert('Error marking attendance: ' + err.message);
    }
  });

  // Attendance date change event to reload records
  document.getElementById('attendanceDate').addEventListener('change', function() {
    fetchAttendanceRecords(this.value);
    updateTeacherChart();
  });

  // Fetch and render attendance for logged-in student on student page
  if (document.getElementById('studentAttendanceTable')) {
    fetchAndRenderStudentAttendance();
  }

  // Initialize teacher chart if on teacher page
  if (document.getElementById('teacherChart')) {
    initTeacherChart();
  }

  // Initialize student chart if on student page
  if (document.getElementById('studentChart')) {
    initStudentChart();
  }
});

// Chart.js instances
let teacherChartInstance = null;
let studentChartInstance = null;

// Initialize teacher chart
async function initTeacherChart() {
  const ctx = document.getElementById('teacherChart').getContext('2d');
  teacherChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: [],
      datasets: [
        {
          label: 'Attendance %',
          data: [],
          backgroundColor: '#4a90e2'
        },
        {
          label: 'Average Marks %',
          data: [],
          backgroundColor: '#66bb6a'
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          max: 100
        }
      }
    }
  });
  await updateTeacherChart();
}

// Update teacher chart data
async function updateTeacherChart() {
  try {
    // Fetch all students
    const res = await fetch('/api/students');
    const data = await res.json();
    if (!data.success) return;

    const students = data.data;
    const labels = [];
    const attendanceData = [];
    const marksData = [];

    for (const student of students) {
      labels.push(student.name);

      // Calculate attendance percentage for student
      const attendanceRes = await fetch('/api/attendance/student/' + student._id);
      const attendanceDataRes = await attendanceRes.json();
      let attendancePercent = 0;
      if (attendanceDataRes.success && Array.isArray(attendanceDataRes.data)) {
        const records = attendanceDataRes.data;
        const presentCount = records.filter(r => r.status === 'Present').length;
        attendancePercent = records.length > 0 ? (presentCount / records.length) * 100 : 0;
      }
      attendanceData.push(attendancePercent.toFixed(2));

      // Calculate average marks for student
      const avgMarks = ((parseInt(student.math || 0) + parseInt(student.science || 0) + parseInt(student.english || 0)) / 3).toFixed(2);
      marksData.push(avgMarks);
    }

    teacherChartInstance.data.labels = labels;
    teacherChartInstance.data.datasets[0].data = attendanceData;
    teacherChartInstance.data.datasets[1].data = marksData;
    teacherChartInstance.update();
  } catch (err) {
    console.error('Failed to update teacher chart:', err);
  }
}

// Initialize student chart
async function initStudentChart() {
  const ctx = document.getElementById('studentChart').getContext('2d');
  studentChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [],
      datasets: [
        {
          label: 'Marks',
          data: [],
          borderColor: '#4a90e2',
          fill: false,
          tension: 0.1
        },
        {
          label: 'Attendance',
          data: [],
          borderColor: '#66bb6a',
          fill: false,
          tension: 0.1
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          max: 100
        }
      }
    }
  });
  await updateStudentChart();
}

// Update student chart data
async function updateStudentChart() {
  try {
    const studentId = localStorage.getItem('studentId');
    if (!studentId) return;

    // Fetch student data
    const res = await fetch('/api/students/' + studentId);
    const data = await res.json();
    if (!data.success) return;

    const student = data.data;

    // Fetch attendance records
    const attendanceRes = await fetch('/api/attendance/student/' + studentId);
    const attendanceDataRes = await attendanceRes.json();
    let attendanceRecords = [];
    if (attendanceDataRes.success && Array.isArray(attendanceDataRes.data)) {
      attendanceRecords = attendanceDataRes.data;
    }

    // Prepare labels and data
    const labels = [];
    const marksData = [];
    const attendanceData = [];

    // For simplicity, use fixed subjects and marks
    labels.push('Math', 'Science', 'English');
    marksData.push(parseInt(student.math || 0), parseInt(student.science || 0), parseInt(student.english || 0));

    // Calculate attendance percentage
    const presentCount = attendanceRecords.filter(r => r.status === 'Present').length;
    const attendancePercent = attendanceRecords.length > 0 ? (presentCount / attendanceRecords.length) * 100 : 0;
    attendanceData.push(attendancePercent, attendancePercent, attendancePercent);

    studentChartInstance.data.labels = labels;
    studentChartInstance.data.datasets[0].data = marksData;
    studentChartInstance.data.datasets[1].data = attendanceData;
    studentChartInstance.update();
  } catch (err) {
    console.error('Failed to update student chart:', err);
  }
}

// Fetch students to populate attendance dropdown
async function fetchStudentsForAttendance() {
  try {
    const res = await fetch('/api/students');
    const data = await res.json();
    if (data.success && Array.isArray(data.data)) {
      const select = document.getElementById('attendanceStudent');
      select.innerHTML = '<option value="">Select Student</option>';
      data.data.forEach(student => {
        const option = document.createElement('option');
        option.value = student._id;
        option.textContent = student.name;
        select.appendChild(option);
      });
    }
  } catch (err) {
    console.error('Failed to fetch students:', err);
  }
}

// Fetch attendance records for a given date and render in table
async function fetchAttendanceRecords(date) {
  try {
    const res = await fetch('/api/attendance/date/' + date);
    const data = await res.json();
    if (data.success && Array.isArray(data.data)) {
      renderAttendanceTable(data.data);
    } else {
      renderAttendanceTable([]);
    }
  } catch (err) {
    console.error('Failed to fetch attendance records:', err);
    renderAttendanceTable([]);
  }
}

// Fetch and render attendance for logged-in student on student page
async function fetchAndRenderStudentAttendance() {
  try {
    // Assuming student ID is stored in localStorage after login
    const studentId = localStorage.getItem('studentId');
    if (!studentId) {
      document.getElementById('attendanceSummary').textContent = 'Student not logged in.';
      return;
    }
    const res = await fetch('/api/attendance/student/' + studentId);
    const data = await res.json();
    if (data.success && Array.isArray(data.data)) {
      const records = data.data;
      renderStudentAttendanceTable(records);
      renderAttendanceSummary(records);
    } else {
      document.getElementById('attendanceSummary').textContent = 'No attendance records found.';
      renderStudentAttendanceTable([]);
    }
  } catch (err) {
    console.error('Failed to fetch student attendance:', err);
    document.getElementById('attendanceSummary').textContent = 'Error loading attendance data.';
    renderStudentAttendanceTable([]);
  }
}

// Render attendance records in the studentAttendanceTable
function renderStudentAttendanceTable(records) {
  const tbody = document.querySelector('#studentAttendanceTable tbody');
  tbody.innerHTML = '';
  records.forEach(record => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${new Date(record.date).toLocaleDateString()}</td>
      <td>${record.status}</td>
    `;
    tbody.appendChild(tr);
  });
}

// Render attendance summary (percentage present)
function renderAttendanceSummary(records) {
  if (records.length === 0) {
    document.getElementById('attendanceSummary').textContent = 'No attendance records available.';
    return;
  }
  const presentCount = records.filter(r => r.status === 'Present').length;
  const percentage = ((presentCount / records.length) * 100).toFixed(2);
  document.getElementById('attendanceSummary').textContent = `Attendance: ${percentage}% (${presentCount} out of ${records.length} days present)`;
}

// Render attendance records in the attendanceTable
function renderAttendanceTable(records) {
  const tbody = document.querySelector('#attendanceTable tbody');
  tbody.innerHTML = '';
  records.forEach(record => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${new Date(record.date).toLocaleDateString()}</td>
      <td>${record.student?.name || 'Unknown'}</td>
      <td>${record.status}</td>
      <td>
        <button class="btn btn-sm btn-danger" onclick="deleteAttendanceRecord('${record._id}')">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Delete attendance record by ID
async function deleteAttendanceRecord(id) {
  if (!confirm('Are you sure you want to delete this attendance record?')) return;
  try {
    const res = await fetch('/api/attendance/' + id, { method: 'DELETE' });
    const data = await res.json();
    if (data.success) {
      alert('Attendance record deleted.');
      const date = document.getElementById('attendanceDate').value;
      fetchAttendanceRecords(date);
    } else {
      alert('Failed to delete attendance record: ' + data.message);
    }
  } catch (err) {
    alert('Error deleting attendance record: ' + err.message);
  }
}

function initTheme() {
  const savedTheme = localStorage.getItem("darkMode") === "true";
  const body = document.body;
  const themeBtn = document.getElementById("themeToggle");
  
  if (savedTheme) {
    body.classList.add("dark-theme");
    body.classList.remove("light-theme");
    themeBtn.textContent = "🌞";
    
    // Force chart redraw in dark mode
    if (window.marksChart) {
      window.marksChart.options.scales.x.ticks.color = '#ffffff';
      window.marksChart.options.scales.y.ticks.color = '#ffffff';
      window.marksChart.update();
    }
  } else {
    body.classList.add("light-theme");
    body.classList.remove("dark-theme");
    themeBtn.textContent = "🌙";
  }
}

const ctx = document.getElementById('marksChart').getContext('2d');
window.marksChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Math', 'Science', 'English'],
    datasets: [{
      label: 'Marks (%)',
      data: [88, 91, 85],
      backgroundColor: ['#4a90e2', '#66bb6a', '#ffca28']
    }]
  },
  options: {
    responsive: true,
    plugins: { 
      legend: { 
        display: false,
        labels: {
          color: '#000000' // Default color, will be updated by theme
        }
      } 
    },
    scales: {
      x: {
        ticks: {
          color: '#000000' // Default color, will be updated by theme
        }
      },
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          color: '#000000' // Default color, will be updated by theme
        }
      }
    }
  }
});