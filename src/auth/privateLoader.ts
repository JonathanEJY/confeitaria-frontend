import { redirect } from "react-router-dom";

export function privateLoader() {
  const isAuth = localStorage.getItem("auth") === "true";

  if (!isAuth) {
    throw redirect("/login");
  }

  return redirect("/dashboard");
}
