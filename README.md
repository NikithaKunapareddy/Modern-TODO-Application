# Fastodo - Modern Task Management 📝

A sleek, modern todo list application built with React, TypeScript, and Tailwind CSS. Fastodo offers a beautiful and intuitive interface for managing your daily tasks efficiently.

## ✨ Features

### 🎯 Core Functionality
- **Create & Manage Tasks**: Add, edit, and delete tasks with ease
- **Task Prioritization**: Set tasks as High, Medium, or Low priority
- **Due Dates**: Assign due dates to tasks with an integrated calendar
- **Tag System**: Organize tasks with custom tags (Life, Blog, Reminder, etc.)
- **Task Status**: Mark tasks as completed or pending
- **Multiple Lists**: Create and manage multiple todo lists

### 🗓️ Calendar Integration
- **Interactive Calendar**: Built-in calendar for date selection
- **Month Navigation**: Navigate between months easily
- **Date Highlighting**: Visual indicators for selected dates and today
- **Mobile Responsive**: Calendar adapts to mobile screen sizes

### 🎨 User Experience
- **Dark Theme**: Modern dark UI with carefully chosen colors
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Sidebar Navigation**: Collapsible sidebar for list management
- **Sorting Options**: Sort tasks by name, priority, or date
- **Local Storage**: Automatically saves your data locally
- **Toast Notifications**: Visual feedback for user actions

### 🚀 Modern Tech Stack
- **React 18**: Latest React with hooks and functional components
- **TypeScript**: Full type safety and better developer experience
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Shadcn/ui**: Beautiful and accessible UI components
- **Radix UI**: Unstyled, accessible components for complex UI elements
- **Lucide React**: Beautiful SVG icons
- **Date-fns**: Modern date utility library
- **React Router**: Client-side routing
- **Vite**: Fast build tool and development server

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm, yarn, or bun package manager

### Getting Started

1. **Clone the repository**
```bash
git clone https://github.com/NikithaKunapareddy/fastodo.git
cd fastodo
```

2. **Install dependencies**
```bash
# Using npm
npm install

# Using yarn
yarn install

# Using bun
bun install
```

3. **Start the development server**
```bash
# Using npm
npm run dev

# Using yarn
yarn dev

# Using bun
bun dev
```

4. **Open your browser**
Navigate to `http://localhost:5173` to see the application

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Shadcn/ui components
│   ├── Calendar.tsx     # Custom calendar component
│   ├── TodoInput.tsx    # Todo input form
│   ├── TodoItem.tsx     # Individual todo item
│   ├── TodoEdit.tsx     # Edit todo modal
│   ├── TodoSidebar.tsx  # Sidebar navigation
│   └── SortOptions.tsx  # Sorting controls
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
├── pages/               # Page components
│   ├── Index.tsx        # Main todo page
│   └── NotFound.tsx     # 404 page
├── App.tsx              # Main app component
├── main.tsx             # Entry point
└── index.css            # Global styles
```

## 🎨 Color Scheme & Design

Fastodo uses a carefully crafted dark theme:

- **Background**: Deep blue-gray (#1A1F2C)
- **Sidebar**: Darker variant (#221F26)
- **Cards**: Charcoal gray (#333333)
- **Highlight**: Purple (#9b87f5)
- **Accent**: Warm yellow (#FAD86B)
- **Text**: White primary, gray secondary

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Build variants
npm run build:dev    # Development build
```

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Breakpoints**: Responsive design with Tailwind's breakpoint system
- **Touch Friendly**: Large touch targets for mobile users
- **Collapsible UI**: Sidebar collapses on mobile for better space usage

## 🎯 Usage Guide

### Creating Tasks
1. Click the input field at the top
2. Enter your task title
3. Click "Add Details" for advanced options:
   - Set due date using the calendar
   - Choose priority level (High/Medium/Low)
   - Add tags for organization
4. Click "Add Task" to save

### Managing Lists
- Click "New List" in the sidebar to create custom lists
- Switch between lists by clicking on them
- Delete lists using the X button
- Use "All Todos" to view tasks from all lists

### Sorting & Filtering
- Use the sort options to organize tasks
- Sort by name, priority, or date
- Filter tasks by selecting specific lists

## 🔄 Data Persistence

- **Local Storage**: All data is automatically saved to your browser's local storage
- **Real-time Sync**: Changes are saved immediately
- **Data Recovery**: Your tasks persist between browser sessions

## 🌟 Key Features in Detail

### Task Management
- ✅ Add new tasks with title, date, priority, and tags
- ✏️ Edit existing tasks in a modal dialog
- 🗑️ Delete tasks with confirmation
- ☑️ Toggle task completion status
- 🏷️ Organize with custom tags

### List Management
- 📋 Create multiple todo lists
- 🔄 Switch between lists easily
- 🗑️ Delete lists when no longer needed
- 👁️ View all tasks across lists

### Calendar Features
- 📅 Interactive calendar widget
- 🗓️ Month navigation
- 🎯 Date selection for tasks
- 📱 Mobile-responsive design

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add some amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**


## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🚀 Deployment

The application can be deployed to various platforms:

- **Vercel**: Deploy with one click using the included `vercel.json`
- **Netlify**: Simple drag-and-drop deployment
- **GitHub Pages**: Deploy from the `dist` folder after building

## 🔮 Future Enhancements

- 🔄 Task synchronization across devices
- 📧 Email reminders for due tasks
- 🎨 Custom themes and color schemes
- 📊 Task analytics and productivity insights
- 🔗 Task sharing and collaboration
- 📱 Progressive Web App (PWA) support

---

**Happy task managing! 🎉**
