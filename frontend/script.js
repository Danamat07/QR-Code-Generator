function generateQR() {
    let text = document.getElementById("text-input").value;
    if (!text) {
        alert("Please enter some text!");
        return;
    }

    fetch("http://127.0.0.1:5000/generate_qr", {  // Flask runs on port 5000
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: text })
    })
    .then(response => response.blob())
    .then(blob => {
        let img = document.getElementById("qr-image");
        let downloadBtn = document.getElementById("download-btn");

        // Show QR code image
        img.src = URL.createObjectURL(blob);
        img.style.display = "block";  

        // Show Download button
        downloadBtn.style.display = "block";

        // Store blob for downloading
        img.dataset.blobUrl = img.src;
    })
    .catch(error => console.error("Error:", error));
}

// Function to download QR code
function downloadQR() {
    let img = document.getElementById("qr-image");
    let link = document.createElement("a");

    link.href = img.dataset.blobUrl;
    link.download = "qr_code.png";  // Default file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
