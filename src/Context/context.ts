import React from "react";
import signalR from "@microsoft/signalr";

export const ConnectionContext = React.createContext<{connection: signalR.HubConnection | null}>({connection: null})

