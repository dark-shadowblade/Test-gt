// Define the data for all units and lectures
const units = [
    {
        title: "Unit 1: Introduction to Mechanics",
        lectures: [
            { title: "Lecture 1", video: "https://p-def6.pcloud.com/cBZFqDrTGZcpeUFS7ZZZyaRbXkZQ5ZZasHZkZISN8TZOHZOYZOLZjLZpLZBYZiQZf4Z44ZBzZz8ZgzZ4RZ6QZjs655Z7coxjG8AHgFodA9MFGj7LLzOsfzk/G.m3u8.mp4", notes: "notes_unit_1_lecture_1.pdf", dpp: "dpp_unit_1_lecture_1.pdf" },
            { title: "Lecture 2", video: "unit_1_lecture_2.mp4", notes: "notes_unit_1_lecture_2.pdf", dpp: "dpp_unit_1_lecture_2.pdf" },
            { title: "Lecture 3", video: "unit_1_lecture_3.mp4", notes: "notes_unit_1_lecture_3.pdf", dpp: "dpp_unit_1_lecture_3.pdf" },
            { title: "Lecture 4", video: "unit_1_lecture_4.mp4", notes: "notes_unit_1_lecture_4.pdf", dpp: "dpp_unit_1_lecture_4.pdf" },
            { title: "Lecture 5", video: "unit_1_lecture_5.mp4", notes: "notes_unit_1_lecture_5.pdf", dpp: "dpp_unit_1_lecture_5.pdf" },
        ]
    },
    {
        title: "Unit 2: Dynamics and Kinematics",
        lectures: [
            { title: "Lecture 1", video: "unit_2_lecture_1.mp4", notes: "notes_unit_2_lecture_1.pdf", dpp: "dpp_unit_2_lecture_1.pdf" },
            { title: "Lecture 2", video: "unit_2_lecture_2.mp4", notes: "notes_unit_2_lecture_2.pdf", dpp: "dpp_unit_2_lecture_2.pdf" },
            { title: "Lecture 3", video: "unit_2_lecture_3.mp4", notes: "notes_unit_2_lecture_3.pdf", dpp: "dpp_unit_2_lecture_3.pdf" },
            { title: "Lecture 4", video: "unit_2_lecture_4.mp4", notes: "notes_unit_2_lecture_4.pdf", dpp: "dpp_unit_2_lecture_4.pdf" },
            { title: "Lecture 5", video: "unit_2_lecture_5.mp4", notes: "notes_unit_2_lecture_5.pdf", dpp: "dpp_unit_2_lecture_5.pdf" },
        ]
    },
    {
        title: "Unit 3: Statics and Solid Mechanics",
        lectures: [
            { title: "Lecture 1", video: "unit_3_lecture_1.mp4", notes: "notes_unit_3_lecture_1.pdf", dpp: "dpp_unit_3_lecture_1.pdf" },
            { title: "Lecture 2", video: "unit_3_lecture_2.mp4", notes: "notes_unit_3_lecture_2.pdf", dpp: "dpp_unit_3_lecture_2.pdf" },
            { title: "Lecture 3", video: "unit_3_lecture_3.mp4", notes: "notes_unit_3_lecture_3.pdf", dpp: "dpp_unit_3_lecture_3.pdf" },
            { title: "Lecture 4", video: "unit_3_lecture_4.mp4", notes: "notes_unit_3_lecture_4.pdf", dpp: "dpp_unit_3_lecture_4.pdf" },
            { title: "Lecture 5", video: "unit_3_lecture_5.mp4", notes: "notes_unit_3_lecture_5.pdf", dpp: "dpp_unit_3_lecture_5.pdf" },
        ]
    },
    {
        title: "Unit 4: Thermodynamics",
        lectures: [
            { title: "Lecture 1", video: "unit_4_lecture_1.mp4", notes: "notes_unit_4_lecture_1.pdf", dpp: "dpp_unit_4_lecture_1.pdf" },
            { title: "Lecture 2", video: "unit_4_lecture_2.mp4", notes: "notes_unit_4_lecture_2.pdf", dpp: "dpp_unit_4_lecture_2.pdf" },
            { title: "Lecture 3", video: "unit_4_lecture_3.mp4", notes: "notes_unit_4_lecture_3.pdf", dpp: "dpp_unit_4_lecture_3.pdf" },
            { title: "Lecture 4", video: "unit_4_lecture_4.mp4", notes: "notes_unit_4_lecture_4.pdf", dpp: "dpp_unit_4_lecture_4.pdf" },
            { title: "Lecture 5", video: "unit_4_lecture_5.mp4", notes: "notes_unit_4_lecture_5.pdf", dpp: "dpp_unit_4_lecture_5.pdf" },
        ]
    },
    {
        title: "Unit 5: Fluid Mechanics",
        lectures: [
            { title: "Lecture 1", video: "unit_5_lecture_1.mp4", notes: "notes_unit_5_lecture_1.pdf", dpp: "dpp_unit_5_lecture_1.pdf" },
            { title: "Lecture 2", video: "unit_5_lecture_2.mp4", notes: "notes_unit_5_lecture_2.pdf", dpp: "dpp_unit_5_lecture_2.pdf" },
            { title: "Lecture 3", video: "unit_5_lecture_3.mp4", notes: "notes_unit_5_lecture_3.pdf", dpp: "dpp_unit_5_lecture_3.pdf" },
            { title: "Lecture 4", video: "unit_5_lecture_4.mp4", notes: "notes_unit_5_lecture_4.pdf", dpp: "dpp_unit_5_lecture_4.pdf" },
            { title: "Lecture 5", video: "unit_5_lecture_5.mp4", notes: "notes_unit_5_lecture_5.pdf", dpp: "dpp_unit_5_lecture_5.pdf" },
        ]
    }
];

// Function to populate the HTML with unit and lecture data dynamically
function populateLectures() {
    const content = document.querySelector('.main-content');
    units.forEach((unit, unitIndex) => {
        const unitDiv = document.createElement('div');
        unitDiv.classList.add('folder');
        unitDiv.id = `unit${unitIndex + 1}`;

        const unitTitle = document.createElement('h2');
        unitTitle.textContent = unit.title;
        unitTitle.onclick = () => toggleLectures(`lecturesUnit${unitIndex + 1}`);
        unitDiv.appendChild(unitTitle);

        const lecturesList = document.createElement('ul');
        lecturesList.classList.add('lectures');
        lecturesList.id = `lecturesUnit${unitIndex + 1}`;

        unit.lectures.forEach((lecture, lectureIndex) => {
            const lectureItem = document.createElement('li');
            const lectureLink = document.createElement('a');
            lectureLink.href = "#";
            lectureLink.textContent = lecture.title;
            lectureLink.onclick = () => openVideo(lecture.title, lecture.video, lecture.notes, lecture.dpp);
            lectureItem.appendChild(lectureLink);
            lecturesList.appendChild(lectureItem);
        });

        unitDiv.appendChild(lecturesList);
        content.appendChild(unitDiv);
    });
}

// Function to toggle the visibility of lecture lists
let currentUnitId = null;
function toggleLectures(lecturesId) {
    const lecturesList = document.getElementById(lecturesId);
    if (lecturesList.style.display === 'block') {
        lecturesList.style.display = 'none';
        currentUnitId = null;
    } else {
        if (currentUnitId !== null) {
            document.getElementById(currentUnitId).style.display = 'none';
        }
        lecturesList.style.display = 'block';
        currentUnitId = lecturesId;
    }
}

// Function to open the video and PDF links
function openVideo(lectureTitle, videoSrc, notesPdf, dppPdf) {
    document.getElementById("videoTitle").innerText = lectureTitle;
    document.getElementById("videoSource").src = videoSrc;
    document.getElementById("videoPlayer").load();

    document.getElementById("notesLink").href = notesPdf;
    document.getElementById("dppLink").href = dppPdf;

    document.querySelector(".main-content").style.display = "none";
    document.getElementById("videoPage").style.display = "block";
}

// Function to go back to the main page
function goBack() {
    document.querySelector(".main-content").style.display = "block";
    document.getElementById("videoPage").style.display = "none";
}

// Populate the lecture content when the page loads
window.onload = populateLectures;
