import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import React, { createContext, useState, useEffect } from "react";
import SideBar from "./components/SideBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatSection from "./sections/ChatSection";
import { User } from "./types/AppTypes";
import { CurrentUserContext } from "./contexts";

//TODO: this component will be removed
const Placeholder = ({ text }: any) => {
  return (
    <Container sx={{ display: "block" }}>
      <h1>{text}</h1>
    </Container>
  );
};

const App: React.FunctionComponent = function () {
  const [user, setUser] = useState<User>(null);

  async function getUserData() {
    const mockUser: User = {
      id: "0",
      username: "ealjkl",
      name: "Luis Eduardo Ballote Rosado",
      phrase: "This is a new phrase",
      status: "online",
    };
    setUser(mockUser);
  }
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <CssBaseline />
        <CurrentUserContext.Provider value={user}>
          <Box sx={{ display: "flex" }}>
            <SideBar />
            <Routes>
              <Route path="/chat/:id" element={<ChatSection />} />
              <Route
                path="/contact/:id"
                element={<Placeholder text="Contact" />}
              />
            </Routes>
          </Box>
        </CurrentUserContext.Provider>
      </BrowserRouter>
    </div>
  );
};

export default App;
