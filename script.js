function generateQR() {
    let text = document.getElementById("text-input").value;
    let qrContainer = document.getElementById("qr-container");
    let downloadBtn = document.getElementById("download-btn");

    qrContainer.innerHTML = "";

    if (!text) {
        alert("Please enter some text!");
        return;
    }

    // Generate QR code using qrcode.js
    let qrCode = new QRCode(qrContainer, {
        text: text,
        width: 200,
        height: 200
    });

    // Show download button
    setTimeout(() => {
        let qrImage = qrContainer.querySelector("img");
        qrImage.id = "qr-image";
        qrImage.dataset.blobUrl = qrImage.src;
        downloadBtn.style.display = "block";
    }, 500);
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
