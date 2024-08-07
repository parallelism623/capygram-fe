import { useEffect, useState } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";

const useSignalR = () => {
  const [connection, setConnection] = useState(null);

  useEffect(() => {
    //thêm url vào withUrl
    const hubConnection = new HubConnectionBuilder()
      .withUrl()
      .withAutomaticReconnect()
      .build();

    hubConnection.start()
      .then(() => console.log("Connection started!"))
      .catch(err => console.log("Error while establishing connection :(", err));
    
    setConnection(hubConnection);

    return () => {
      hubConnection.stop();
    };
  }, []);

  return connection;
}

export default useSignalR;