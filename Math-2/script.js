document.addEventListener("DOMContentLoaded", () => {
    loadSubjects();
});

// Load subjects dynamically
function loadSubjects() {
    const subjectsContainer = document.getElementById("subjects-container");

    if (!subjectsContainer) return console.error("subjects-container not found!");

    subjectsData.forEach((subject) => {
        const subjectDiv = document.createElement("div");
        subjectDiv.classList.add("subject");

        const subjectHeader = document.createElement("h2");
        subjectHeader.textContent = subject.subject;
        subjectDiv.appendChild(subjectHeader);

        subject.units.forEach((unit) => {
            const unitDiv = document.createElement("div");
            unitDiv.classList.add("unit");

            // Unit Title
            const unitTitle = document.createElement("div");
            unitTitle.classList.add("unit-title");
            unitTitle.textContent = unit.name;
            unitDiv.appendChild(unitTitle);

            const unitContent = document.createElement("div");
            unitContent.classList.add("unit-content");

            unit.lectures.forEach((lecture, index) => {
                const lectureItem = document.createElement("div");
                lectureItem.classList.add("lecture-item");

                // Lecture link
                const lectureLink = document.createElement("a");
                lectureLink.textContent = lecture.title;
                lectureLink.href = `player.html?subject=${encodeURIComponent(subject.subject)}&unit=${encodeURIComponent(unit.name)}&lecture=${encodeURIComponent(lecture.title)}&link=${encodeURIComponent(lecture.link)}`;
                lectureLink.classList.add("lecture-link");

                // DPP link
                const dppLink = document.createElement("a");
                dppLink.textContent = `DPP ${index + 1}`;
                dppLink.href = lecture.dpp || "#"; // Default to "#" if no DPP
                dppLink.target = "_blank";
                dppLink.classList.add("dpp-link");

                lectureItem.appendChild(lectureLink);
                lectureItem.appendChild(dppLink);
                unitContent.appendChild(lectureItem);
            });

            unitDiv.appendChild(unitContent);
            subjectDiv.appendChild(unitDiv);
        });

        subjectsContainer.appendChild(subjectDiv);
    });
}

// Fetch video link from pCloud in player.html
async function fetchVideoLink() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const lectureLink = urlParams.get("link");

        if (!lectureLink) {
            throw new Error("Lecture link missing.");
        }

        const response = await fetch(lectureLink);
        if (!response.ok) throw new Error("Failed to fetch video link.");

        const htmlText = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, "text/html");

        const scriptTags = doc.querySelectorAll("script");
        let publinkDataScript = "";

        scriptTags.forEach((script) => {
            if (script.textContent.includes("publinkData")) {
                publinkDataScript = script.textContent;
            }
        });

        if (publinkDataScript) {
            const dataMatch = publinkDataScript.match(/var publinkData = ({.*?});/s);
            if (dataMatch && dataMatch[1]) {
                const publinkData = JSON.parse(dataMatch[1]);
                if (publinkData?.variants?.[0]?.path) {
                    const fullLink = "https://p-def6.pcloud.com" + publinkData.variants[0].path;

                    // Update iframe
                    const iframeContainer = document.getElementById("iframe-container");
                    iframeContainer.innerHTML = "";

                    const iframe = document.createElement("iframe");
                    iframe.src = fullLink;
                    iframe.style.width = "100%";
                    iframe.style.height = "500px";
                    iframeContainer.appendChild(iframe);

                    // Show buttons after video loads
                    document.getElementById("fullscreen-btn").style.display = "inline-block";
                    document.getElementById("notes-btn").style.display = "inline-block";
                    document.getElementById("dpp-btn").style.display = "inline-block";

                    // Fullscreen function
                    document.getElementById("fullscreen-btn").addEventListener("click", () => {
                        if (iframe.requestFullscreen) {
                            iframe.requestFullscreen();
                        } else if (iframe.mozRequestFullScreen) {
                            iframe.mozRequestFullScreen();
                        } else if (iframe.webkitRequestFullscreen) {
                            iframe.webkitRequestFullscreen();
                        } else if (iframe.msRequestFullscreen) {
                            iframe.msRequestFullscreen();
                        }
                    });

                    // Open Notes and DPP links
                    document.querySelectorAll(".btn").forEach((button) => {
                        button.addEventListener("click", () => {
                            const link = button.getAttribute("data-link");
                            if (link) window.open(link, "_blank");
                        });
                    });
                } else {
                    throw new Error("Path not found in publinkData");
                }
            } else {
                throw new Error("Could not find publinkData object");
            }
        } else {
            throw new Error("publinkData script not found");
        }
    } catch (error) {
        document.getElementById("path-link").textContent = "Error: " + error.message;
    }
}

// Call function on player.html
if (window.location.pathname.includes("player.html")) {
    fetchVideoLink();
}
