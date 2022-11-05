import http from "k6/http";

export const options = {
  duration: "10s",
  vus: 10,
};

export function setup() {
  const res = http.get("http://localhost:3000/api/urls");
  const shortened_id = res.json()[0][2];
  return { shortened_id };
}

export default function (data) {
  http.get(`http://localhost:3000/${data.shortened_id}`, { redirects: 0 });
}
