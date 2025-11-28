import { useEffect, useState } from "react";
import type { User } from "../../models";
import ErrorDisplay from "../shared/ErrorDisplay";
import Button from "../ui/Button";
import InputText from "../ui/InputText";

export default function FormLogin() {
  const [users, setUsers] = useState<User[]>([]);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:1234/users");
        setUsers(await res.json());
      } catch (error) {
        setError(error as string);
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  function findPassword(login: string) {
    for (const user of users) {
      if (user.login === login) {
        setPassword(user.password);
        return;
      }
    }
    setPassword("");
  }

  async function loginSubmit() {
    try {
      const res = await fetch("http://localhost:1234/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ login, password }),
      });
      if (res.status === 404) {
        setError("Invalid password or login");
        return;
      }
      localStorage.setItem("user", JSON.stringify(await res.json()));
      window.location.href = "/home";
    } catch (error) {
      setError(error as string);
      console.error(error);
    }
  }

  function goToRegisterPage() {
    window.location.href = "/register";
  }

  return (
    <form
      className="w-70 p-5 mx-auto mt-20"
      onSubmit={(e) => {
        e.preventDefault();
        loginSubmit();
      }}
    >
      <InputText
        name="login"
        value={login}
        setter={setLogin}
        onChange={findPassword}
      />
      <InputText name="password" value={password} setter={setPassword} />
      <Button name="confirm" submit={true} />
      <ErrorDisplay message={error} />
      <div className="mt-5" />
      <Button
        name="No account ? Register"
        submit={false}
        onClick={goToRegisterPage}
      />
    </form>
  );
}
