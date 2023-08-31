// browser.js
async function scanUrl() {
    const url = document.getElementById('urltoscan').value;

    const response = await fetch('/crawl', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ baseUrl: url }),
    });

    if (response.ok) {
        const report = await response.json();
        displayReport(report);
    } else {
        console.error(`Error crawling website: response status:${response.status}. text: ${await response.text}`);
    }
}

function displayReport(report) {
    const dataVisualization = document.getElementById('data-visualization');
    dataVisualization.innerHTML = '<pre>' + JSON.stringify(report, null, 2) + '</pre>';
}
document.querySelector('button').addEventListener('click', scanUrl);