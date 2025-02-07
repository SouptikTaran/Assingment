# ReactJS Monthly Calendar Timeline (Mobiscroll Replica)

## 📌 Project Overview
This project is a **ReactJS-based Monthly Calendar Timeline** that replicates the Mobiscroll calendar view without using any Mobiscroll libraries. Built using **ViteJS**, this calendar allows users to create, edit, move, delete, and manage events across multiple resources.

## 🎯 Features
### **UI & Calendar Functionality**
- **Monthly horizontal timeline view** displaying dates at the top and a list of resources on the Y-axis.
- **Scrollable interface** to manage multiple resources and large datasets efficiently.
- **"Today" highlight** feature to visually indicate the current date.
- **Navigation buttons** to move to the **previous** or **next** month.
- **Dark mode & light mode toggle**.
- Option to **add more resources dynamically**.

### **Event Management**
- **Create Events**: Click & drag to select a time range and add an event.
- **Customizable Events**: Assign unique colors to events.
- **Edit Events**: Modify the event title, start time, end time, and color.
- **Move Events**: Drag & drop to reposition events across dates and resources.
- **Resize Events**: Drag the event edges to extend or reduce duration.
- **Delete Events**: Click on an event to open a delete confirmation popup.

### **State Management**
- Ensures all **events and resources persist** even after a **hard refresh** using **local storage** or IndexedDB.
- Uses **React Hooks (useState, useEffect)** for state management.

## 🛠️ Tech Stack
- **ReactJS** (Frontend Framework)
- **ViteJS** (Faster Development & Hot Module Replacement)
- **CSS** (Styling & Responsive Design)

## 🚀 Getting Started
### 1️⃣ **Clone the Repository**
```sh
git clone https://github.com/SouptikTaran/Assingment.git
cd Assingment
```

### 2️⃣ **Install Dependencies**
```sh
npm install
```

### 3️⃣ **Run the Development Server**
```sh
npm run dev
```
The app will be available at: **http://localhost:5173**

### 4️⃣ **Build for Production**
```sh
npm run build
```

## 📂 Project Structure
```
📂 project-root
├── 📁 src
│   ├── 📁 components   # Reusable components (Event, Calendar, Modal, etc.)
│   ├── 📁 hooks        # Custom React Hooks for state management
│   ├── 📁 styles       # CSS stylesheets
│   ├── App.jsx        # Main Application Entry Point
│   ├── main.jsx       # ReactDOM Rendering
├── 📄 index.html      # Main HTML Template
├── 📄 vite.config.js  # Vite Configuration
├── 📄 package.json    # Dependencies & Scripts
└── 📄 README.md       # Documentation
```

## 📝 Future Enhancements
- **Week & Day View**: Extend support for weekly and daily calendar views.
- **Drag & Drop Between Resources**: Allow moving events between different resources.
- **Google Calendar Integration**: Sync events with Google Calendar.
- **User Authentication**: Multi-user event management.

## 🤝 Contributing
Contributions are welcome! Feel free to **fork** this repo and submit a **pull request**.

## 📜 License
This project is licensed under the **MIT License**.

---
🎉 **Happy Coding!** 🚀

