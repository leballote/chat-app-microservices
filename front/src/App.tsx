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
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { getValue as getCurrentUserValue } from "./app/features/currentUserSlice";

//TODO: this component will be removed
const Placeholder = ({ text }: any) => {
  return (
    <Container sx={{ display: "block" }}>
      <h1>{text}</h1>
    </Container>
  );
};

const App: React.FunctionComponent = function () {
  // let { error, loading, data } = useQuery(GET_USER_DATA);
  const currentUserState = useAppSelector((state) => state.currentUser);
  const { value: currentUser, loading, error } = currentUserState;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCurrentUserValue());
  }, []);

  let component;
  if (error) {
    component = (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
      </div>
    );
  } else if (loading) {
    component = <h1>Loading...</h1>;
  } else {
    component = (
      <BrowserRouter>
        <CssBaseline />
        <CurrentUserContext.Provider value={currentUser}>
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
    );
  }
  return <div className="App">{component}</div>;
};

export default App;
