# 🛍️ E-Commerce Store with M-Pesa Integration  

## 🚀 Live Demo  
🔗 [mpesa-demo.vercel.app](https://mpesa-demo.vercel.app/)  

## 📌 Overview  
This is a fully functional **E-Commerce Store** built using the **FakeStore API** for products, integrated with **M-Pesa Daraja API** to demonstrate seamless mobile payments in Kenya. Users can:  

✅ Browse products  
✅ **Search** for products dynamically  
✅ Add items to the cart  
✅ Proceed to checkout  
✅ **Buy Now** – Instantly purchase a product without adding it to the cart  
✅ Make payments via M-Pesa  

The checkout experience is smooth, leveraging **Redux Toolkit for state management** and **Express.js for the backend**.  

---

## 🏗️ Tech Stack  
### **Frontend**  
- **React.js** (UI framework)  
- **Redux Toolkit** (State management)  
- **Vercel** (Hosting)  

### **Backend**  
- **Node.js & Express** (API)  
- **M-Pesa Daraja API** (Payment integration)  
- **PM2** (Process management)  
- **DigitalOcean Droplet** (Server hosting)  

---

## 🎯 Features  
### 🛒 **E-Commerce Functionality**  
- Fetch products from **FakeStore API**  
- **Intuitive Search** – Instantly find products using dynamic filtering  
- Add/remove products from **cart**  
- Display cart items dynamically  
- **Buy Now** – Allows users to **skip the cart** and pay immediately  

### 💳 **M-Pesa Payment Integration**  
- Checkout via **M-Pesa STK Push**  
- **Buy Now** instantly triggers an **STK push**  
- Payment confirmation via **STK Query**  
- Seamless **payment status updates**  

### 🔄 **Smooth UX**  
- Real-time **payment feedback**  
- Clean & intuitive UI  
- **Secure API routing** via **Vercel rewrites**  

---

## 🔧 Setup & Installation  
### **1️⃣ Clone the Repository**  
```sh
git https://github.com/gitere001/react-learning-journey.git
cd e-commerce-store
```
### **2️⃣ Install Dependencies**

# Install frontend dependencies
```
cd client
npm install
```

# Install backend dependencies
```
cd server
npm install
```
### **3️⃣ Environment Variables**
Create a .env file in both frontend and backend directories.

Frontend (frontend/.env)
```
VITE_API_BASE_URL=""
```
This ensures API requests are properly proxied via Vercel rewrites.

Backend (backend/.env)
```
PORT=5001
MPESA_CONSUMER_KEY=your_consumer_key
MPESA_CONSUMER_SECRET=your_consumer_secret
MPESA_SHORTCODE=your_shortcode
MPESA_PASSKEY=your_passkey
```
4️⃣ Run the Application
Start the Backend
```
cd backend
npm run dev  # Or use pm2 for production
```
Start the Frontend
```
cd frontend
npm run dev
```
🚀 Deployment
Backend (DigitalOcean with PM2)
Use PM2 to keep the backend running:
```
pm2 start server.js --name mpesa-backend
pm2 save
pm2 startup
```
NGINX Configuration (/etc/nginx/sites-available/backend)
```
server {
    listen 80;
    server_name YOUR_IP;

    location / {
        proxy_pass http://localhost:5000/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /mpesa/ {
        proxy_pass http://localhost:5001/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```
Restart NGINX:
```

sudo systemctl restart nginx
```
Frontend (Vercel with API Rewrites)
In vercel.json (Frontend Root Directory):
```
{
  "rewrites": [
    {
      "source": "/:path*",
      "destination": "http://YOUR_IP:5001/:path*"
    }
  ]
}
```
📢 Contributing
Feel free to fork this project, open issues, or contribute via pull requests!

## 📬 Contact  
💻 **Portfolio:** [jamesgiteredev.site](https://www.jamesgiteredev.site)  
🐙 **GitHub:** [@gitere001](https://github.com/gitere001)  
✉️ **Email:** gitere.dev@gmail.com  


Made with ❤️ by James Gitere
