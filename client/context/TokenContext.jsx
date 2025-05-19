"use client";

import { createContext, useContext, useState } from "react";

const TokenContext = createContext(null);

export default function TokenProvider({ initialToken, children }) {
  const [authToken, setAuthToken] = useState(initialToken || null);

  return (
    <TokenContext.Provider value={{ authToken, setAuthToken }}>
      {children}
    </TokenContext.Provider>
  );
}

export function useToken() {
  return useContext(TokenContext);
}
