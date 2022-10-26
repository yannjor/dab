import React from "react";
import { useState } from "react";
import axios from "axios";

const App = () => {
  const [url, setUrl] = useState("");

  const handleSubmit = async event => {
    event.preventDefault();
    const res = await axios.post("/api/urls", { url });
    console.log(res);
    setUrl("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>My URL shortener</h1>
        <input
          type="url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
        <button type="submit">Shorten</button>
      </form>
    </div>
  );
};

export default App;
