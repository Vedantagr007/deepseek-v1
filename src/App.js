import React, { useState, useEffect } from "react";
import { marked } from "marked";
import "./App.css";
import logo from "./logo.png";
import SideBar from "./components/SideBar";
import MainContent from "./components/MainContent";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [versionPopupOpen, setVersionPopupOpen] = useState(false);
  const [selectedGames, setSelectedGames] = useState([]);
  const [showWelcome, setShowWelcome] = useState(true);
  const [chatResponse, setChatResponse] = useState("");

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    if (window.innerWidth <= 768) {
      setSidebarOpen(false);
    }
  };
  const toggleVersionPopup = () => setVersionPopupOpen(!versionPopupOpen);

  const handleSendMessage = async () => {
    if (!message) return;
    setChatResponse("Loading...");
    try {
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization:
              "Bearer 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",
            "HTTP-Referer": "https://www.webstylepress.com",
            "X-Title": "WebStylePress",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "deepseek/deepseek-r1:free",
            messages: [{ role: "user", content: message }],
          }),
        }
      );
      const data = await response.json();
      const markdownText =
        data.choices?.[0]?.message?.content || "No response received.";
      setChatResponse(marked.parse(markdownText));
    } catch (error) {
      setChatResponse("Error: " + error.message);
    }
    setMessage("");
  };

  const handleOverlayClick = (e) => {
    if (window.innerWidth <= 768) {
      setSidebarOpen(false);
    }
  };

  const toggleGameSelection = (gameId) => {
    setSelectedGames((prev) =>
      prev.includes(gameId)
        ? prev.filter((id) => id !== gameId)
        : [...prev, gameId]
    );
  };

  const games = [
    { id: "snake", name: "Snake Game", icon: "🐍" },
    { id: "tetris", name: "Tetris", icon: "🧱" },
    { id: "pacman", name: "Pac-Man", icon: "👾" },
    { id: "chess", name: "Chess", icon: "♟️" },
    { id: "sudoku", name: "Sudoku", icon: "🔢" },
    { id: "memory", name: "Memory Game", icon: "🃏" },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`app ${darkMode ? "dark" : "light"}`}>
      <SideBar
        sideBarOpen={sidebarOpen}
        toggleSideBar={toggleSidebar}
        toggleVersionPopUp={toggleVersionPopup}
        toggleSearch={toggleSearch}
        logo={logo}
        handleOverlayClick={handleOverlayClick}
      />
      <MainContent
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        searchOpen={searchOpen}
        toggleSearch={toggleSearch}
        versionPopupOpen={versionPopupOpen}
        toggleVersionPopup={toggleVersionPopup}
        showWelcome={showWelcome}
        selectedGames={selectedGames}
        toggleGameSelection={toggleGameSelection}
        chatResponse={chatResponse}
        message={message}
        setMessage={setMessage}
        handleSendMessage={handleSendMessage}
        games={games}
        logo={logo}
      />
    </div>
  );
}

export default App;