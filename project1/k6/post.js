import http from "k6/http";

export const options = {
  duration: "1s",
  vus: 10,
};

export default function () {
  http.post("http://localhost:3000/api/urls", { url: "http://test.com" });
}
