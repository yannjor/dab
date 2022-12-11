import http from "k6/http";

export const options = {
  duration: "10s",
  vus: 10,
};

export default function () {
  http.post(
    "http://localhost:7800/api/messages/1/replies",
    JSON.stringify({
      reply: "This is a reply.",
    }),
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "1234",
      },
    }
  );
}
