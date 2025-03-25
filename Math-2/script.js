async function fetchVideoLink() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const lectureLink = urlParams.get("link");

        if (!lectureLink) {
            console.error("Lecture link missing in URL parameters.");
            document.getElementById("path-link").textContent = "Error: Lecture link missing.";
            return;
        }

        console.log("Fetching video page:", lectureLink);

        const response = await fetch(lectureLink);
        if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`);

        const htmlText = await response.text();
        console.log("Fetched HTML successfully");

        // Parse HTML to extract script content
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, "text/html");
        const scriptTags = doc.querySelectorAll("script");

        let publinkDataScript = "";
        scriptTags.forEach((script) => {
            if (script.textContent.includes("publinkData")) {
                publinkDataScript = script.textContent;
            }
        });

        if (!publinkDataScript) throw new Error("publinkData script not found in fetched page.");

        // Extract publinkData object
        const dataMatch = publinkDataScript.match(/var publinkData = ({.*?});/s);
        if (!dataMatch || !dataMatch[1]) throw new Error("Could not find publinkData JSON object.");

        const publinkData = JSON.parse(dataMatch[1]);

        if (!publinkData.variants || !publinkData.variants[0] || !publinkData.variants[0].path) {
            throw new Error("Video path missing in publinkData.");
        }

        const fullVideoLink = "https://p-def6.pcloud.com" + publinkData.variants[0].path;
        console.log("Final video link:", fullVideoLink);

        // Update iframe with the correct video link
        const iframeContainer = document.getElementById("iframe-container");
        iframeContainer.innerHTML = "";
        
        const iframe = document.createElement("iframe");
        iframe.src = fullVideoLink;
        iframe.style.width = "100%";
        iframe.style.height = "500px";
        iframe.allowFullscreen = true;
        iframeContainer.appendChild(iframe);

        // Show control buttons
        document.getElementById("fullscreen-btn").style.display = "inline-block";
        document.getElementById("notes-btn").style.display = "inline-block";
        document.getElementById("dpp-btn").style.display = "inline-block";

        // Fullscreen functionality
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

    } catch (error) {
        console.error("Error:", error.message);
        document.getElementById("path-link").textContent = "Error: " + error.message;
    }
}
