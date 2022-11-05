import http from "k6/http";

export default function () {
  for (let i = 0; i < 100; i++) {
    http.post("http://localhost:3000/api/urls", { url: "http://example.com" });
  }
}
