"use client";
import React, { useState, useEffect } from "react";
import { marked } from "marked";
import "./App.css";
import logo from "./logo.png";
// import SideBar from "./components/SideBar";
import MainContent from "./components/MainContent";
import GamePreview from "./components/GamePreview";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [versionPopupOpen, setVersionPopupOpen] = useState(false);
  const [selectedGames, setSelectedGames] = useState([]);
  const [showWelcome, setShowWelcome] = useState(true);
  const [chatResponse, setChatResponse] = useState("");
  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [gameCode, setGameCode] = useState("");

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
      const response = await fetch(`${process.env.REACT_APP_API_URL}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
          "HTTP-Referer": `${process.env.REACT_APP_HTTP_REFERER}`,
          "X-Title": `${process.env.REACT_APP_X_TITLE}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: `${process.env.REACT_APP_MODEL}`,
          messages: [
            {
              role: "system",
              content:
                "You are a game development assistant. When asked to create a game, provide a detailed explanation and include an HTML/JavaScript game code snippet.",
            },
            { role: "user", content: message },
          ],
        }),
      });
      const data = await response.json();
      const markdownText =
        data.choices?.[0]?.message?.content || "No response received.";
      
      const gameMatch = markdownText.match(/```html([\s\S]*?)```/);
      if (gameMatch) {
        setGameCode(gameMatch[1].trim());
      }

      const botMessage = { role: 'assistant', content: marked.parse(markdownText) };

      setChats(chats.map(chat => {
        if (chat.id === currentChatId) {
          return {
            ...chat,
            messages: [...chat.messages, botMessage]
          };
        }
        return chat;
      }));
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
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`app ${darkMode ? "dark" : "light"}`}>
      {/* <SideBar
        sideBarOpen={sidebarOpen}
        toggleSideBar={toggleSidebar}
        toggleVersionPopUp={toggleVersionPopup}
        toggleSearch={toggleSearch}
        logo={logo}
        handleOverlayClick={handleOverlayClick}
      /> */}
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
      <GamePreview gameCode={gameCode}/>
    </div>
  );
}

export default App;
