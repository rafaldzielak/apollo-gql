import { useState } from "react";
import "./App.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

function App() {
  const client = new ApolloClient({ cache: InMemoryCache, uri: "http://localhost:4000" });

  return <div className='App'>Hi</div>;
}

export default App;
