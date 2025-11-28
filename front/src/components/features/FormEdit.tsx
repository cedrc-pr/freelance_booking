import { useState } from "react";
import type { User } from "../../models";
import ErrorDisplay from "../shared/ErrorDisplay";
import Button from "../ui/Button";
import InputText from "../ui/InputText";

export default function FormEdit() {
  const user = JSON.parse(localStorage.getItem("user") ?? "") as User;
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [image, setImage] = useState(user.image);
  const [location, setLocation] = useState(user.location);
  const [login, setLogin] = useState(user.login);
  const [password, setPassword] = useState(user.password);
  const [error, setError] = useState("");

  async function editSumbit() {
    const body = {
      first_name: firstName,
      last_name: lastName,
      location,
      login,
      password,
      ...(image !== "" ? { image } : { image: null }),
    };
    try {
      const res = await fetch(`http://localhost:1234/users/${user.user_id}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(body),
      });
      localStorage.setItem("user", JSON.stringify(await res.json()));
      window.location.href = "/home";
    } catch (error) {
      setError(error as string);
      console.error(error);
    }
  }

  return (
    <form
      className="w-70 p-5 mx-auto mt-20"
      onSubmit={(e) => {
        e.preventDefault();
        editSumbit();
      }}
    >
      <InputText name="first name" value={firstName} setter={setFirstName} />
      <InputText name="last name" value={lastName} setter={setLastName} />
      <InputText name="image (optional)" value={image} setter={setImage} />
      <InputText name="location" value={location} setter={setLocation} />
      <InputText name="login" value={login} setter={setLogin} />
      <InputText name="password" value={password} setter={setPassword} />
      <Button name="confirm" submit={true} />
      <ErrorDisplay message={error} />
    </form>
  );
}
