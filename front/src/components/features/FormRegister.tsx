import { useState } from "react";
import ErrorDisplay from "../shared/ErrorDisplay";
import Button from "../ui/Button";
import InputText from "../ui/InputText";

export default function FormRegister() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState("");
  const [location, setLocation] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function registerSumbit() {
    const body = {
      first_name: firstName,
      last_name: lastName,
      location,
      login,
      password,
      ...(image !== "" ? { image } : { image: null }),
    };
    try {
      await fetch("http://localhost:1234/users", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(body),
      });
      window.location.href = "/login";
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
        registerSumbit();
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
