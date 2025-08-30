# WebScraper – Competitive Programming Problem Scraper

A full-stack web application to **scrape problems from Codeforces and LeetCode** using **Puppeteer** for automation and web scraping, with **TF-IDF based search** for Codeforces problems using the **natural** NLP library.  

The goal is to help competitive programmers easily discover, track, and search problems from multiple platforms in one place.

---

## 🚀 Features

- **Codeforces & LeetCode problem scraping** (topics-based scraping for now)
- **TF-IDF based search** for Codeforces problems using **natural**
- **Full-stack TypeScript**:
  - **Backend:** Node.js + TypeScript + Puppeteer for scraping + TF-IDF search
  - **Frontend:** React + Vite + SWC for fast loading
- Modern UI with **dark/light mode**  
- Simple dev setup with `npm run dev`  



---

## 🎥 Demo

https://github.com/user-attachments/assets/1e810e33-a618-4397-af6d-9da0521da245

---


## 🛠️ Tech Stack

### **Backend**
- **Node.js** + **TypeScript**
- **Puppeteer** for scraping problems
- **natural** for TF-IDF based search
- REST APIs to serve scraped data

### **Frontend**
- **React** + **Vite**
- **TypeScript**
- **SWC** for blazing fast builds

---

## 📂 Project Structure

```

WebScraper/
├── backend/       # Node.js + TypeScript backend with Puppeteer & TF-IDF search
├── frontend/      # React + Vite + SWC frontend
├── README.md      # Project documentation

````

---

## ⚡ Getting Started

1. **Clone the repo**
   ```bash
   git clone https://github.com/dhruvinjs/WebScraper.git
   cd WebScraper
````

2. **Install dependencies** (backend & frontend separately)

   ```bash
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

3. **Run the project**
   Start backend and frontend in separate terminals:

   ```bash
   # Backend
   cd backend
   npm run dev

   # Frontend
   cd frontend
   npm run dev
   ```

4. **Open in browser**
   By default, the frontend runs at:

   ```
   http://localhost:5173
   ```

---

## 📌 To-Do / Upcoming Fixes

* [ ] Fix scraping for **individual problem details**
* [ ] Improve error handling for failed scrapes
* [ ] Enhance frontend UI for better user experience

---

## 🤝 Contributing

Contributions are welcome!
Just fork the repo, create a branch, make your changes, and submit a PR.

---

## 📜 License

No license added yet — feel free to use and modify locally.

---
