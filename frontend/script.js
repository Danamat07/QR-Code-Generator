function generateQR() {
    let text = document.getElementById("text-input").value;
    if (!text) {
        alert("Please enter some text!");
        return;
    }

    fetch("http://127.0.0.1:5000/generate_qr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: text })
    })
    .then(response => response.blob())
    .then(blob => {
        let img = document.getElementById("qr-image");
        img.src = URL.createObjectURL(blob);
        img.style.display = "block";  // Show the QR code
    })
    .catch(error => console.error("Error:", error));
}
