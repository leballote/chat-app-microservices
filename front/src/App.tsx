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
import { useQuery, gql } from "@apollo/client";

//TODO: this component will be removed
const Placeholder = ({ text }: any) => {
  return (
    <Container sx={{ display: "block" }}>
      <h1>{text}</h1>
    </Container>
  );
};

const GET_USER_DATA = gql`
  query GetUser {
    viewer {
      id
      username
      name
      phrase
      status
    }
  }
`;

const App: React.FunctionComponent = function () {
  const { error, loading, data } = useQuery(GET_USER_DATA);
  return !loading ? (
    <div className="App">
      <BrowserRouter>
        <CssBaseline />
        <CurrentUserContext.Provider value={data.viewer}>
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
  ) : (
    <h1>Loading...</h1>
  );
};

export default App;
