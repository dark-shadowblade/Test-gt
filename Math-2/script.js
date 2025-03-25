document.addEventListener("DOMContentLoaded", function () {
    const contentDiv = document.getElementById("content");

    if (!contentDiv) {
        console.error("Error: #content div not found in HTML!");
        return;
    }

    if (typeof subjectsData === "undefined") {
        console.error("Error: subjectsData is not defined! Make sure data.js is loaded.");
        return;
    }

    async function fetchPCloudLink(baseLink) {
        try {
            const response = await fetch(baseLink);
            if (!response.ok) throw new Error("Failed to fetch HTML content");

            const htmlText = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlText, "text/html");

            const scriptTags = doc.querySelectorAll("script");
            let publinkDataScript = "";

            scriptTags.forEach(script => {
                if (script.textContent.includes("publinkData")) {
                    publinkDataScript = script.textContent;
                }
            });

            if (publinkDataScript) {
                const dataMatch = publinkDataScript.match(/var publinkData = ({.*?});/s);
                if (dataMatch && dataMatch[1]) {
                    const publinkData = JSON.parse(dataMatch[1]);
                    if (publinkData?.variants?.[0]?.path) {
                        return "https://p-def6.pcloud.com" + publinkData.variants[0].path;
                    }
                }
            }
            throw new Error("pCloud link not found");
        } catch (error) {
            console.error("Error fetching pCloud link:", error);
            return null;
        }
    }

    async function fetchAndDisplayLectures() {
        for (const subject of subjectsData) {
            for (const unit of subject.units) {
                const unitDiv = document.createElement("div");
                unitDiv.classList.add("unit");

                const unitHeader = document.createElement("h2");
                unitHeader.textContent = unit.name;
                unitDiv.appendChild(unitHeader);

                const unitContent = document.createElement("div");
                unitContent.classList.add("unit-content");

                // 🔹 Fetch all lecture links in parallel
                const lecturePromises = unit.lectures.map(fetchPCloudLink);
                const pCloudLinks = await Promise.all(lecturePromises);

                unit.lectures.forEach((lecture, index) => {
                    const lectureDPPDiv = document.createElement("div");
                    lectureDPPDiv.classList.add("lecture-dpp");

                    const pCloudLink = pCloudLinks[index]; // Get link from fetched results
                    const notesLink = unit.notes ? encodeURIComponent(unit.notes) : "";
                    const dppLink = unit.dpps[index] ? encodeURIComponent(unit.dpps[index]) : "";

                    if (pCloudLink) {
                        lectureDPPDiv.innerHTML = `
                            <a href="player.html?subject=${encodeURIComponent(subject.subject)}&unit=${encodeURIComponent(unit.name)}&lecture=${encodeURIComponent('Lecture ' + (index + 1))}&video=${encodeURIComponent(pCloudLink)}&notes=${notesLink}&dpp=${dppLink}" target="_blank">
                                Lecture ${index + 1}
                            </a>
                            <a href="${unit.dpps[index]}" target="_blank">DPP ${index + 1}</a>
                        `;
                    } else {
                        lectureDPPDiv.innerHTML = `<span>Lecture ${index + 1} (Unavailable)</span>`;
                    }

                    unitContent.appendChild(lectureDPPDiv);
                });

                unitDiv.appendChild(unitContent);
                contentDiv.appendChild(unitDiv);

                unitHeader.addEventListener("click", () => {
                    unitContent.style.display = unitContent.style.display === "none" ? "block" : "none";
                });
            }
        }
    }

    fetchAndDisplayLectures();
});
