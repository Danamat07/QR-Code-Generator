from flask import Flask, request, send_file     # to ceate backend, recieve data from frontend, send QR back to frontend
import qrcode                                   # to generate QR code
from flask_cors import CORS                     # to allow frontend-backend communication
from io import BytesIO                          # to use in-memory file storage

app = Flask(__name__)
CORS(app)  # allow requests from frontend

@app.route('/generate_qr', methods=['POST'])
def generate_qr():
    # get text from fontend
    data = request.json.get("text")
    if not data:
        return {"error": "No data provided"}, 400
    # generate QR code
    qr = qrcode.QRCode(version=1, 
                       error_correction=qrcode.constants.ERROR_CORRECT_L, 
                       box_size=10, 
                       border=4)
    qr.add_data(data)
    qr.make(fit=True)
    img = qr.make_image(fill_color="black", back_color="white")
    # save QR code to in-memory file
    img_io = BytesIO()
    img.save(img_io, 'PNG')
    img_io.seek(0)
    # send QR code as image
    return send_file(img_io, mimetype='image/png')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
