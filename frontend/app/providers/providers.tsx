"use client"; // 👈 Required for Redux and AuthProvider

import React from "react";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import AuthProvider from "@/components/sessionprovider";
const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <AuthProvider>{children}</AuthProvider>
    </Provider>
  );
};

export default Providers;
