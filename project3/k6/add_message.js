import http from "k6/http";

export const options = {
  duration: "10s",
  vus: 10,
};

export default function () {
  http.post(
    "http://localhost:7800/api/messages",
    JSON.stringify({
      text: "This is a new message.",
    }),
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "1234",
      },
    }
  );
}
