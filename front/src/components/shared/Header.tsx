import type { User } from "../../models";
import Button from "../ui/Button";

export default function Header() {
  const user = JSON.parse(localStorage.getItem("user") ?? "") as User;
  const disconnect = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  function goToEditPage() {
    window.location.href = "/edit-account";
  }

  function goToBookingPage() {
    window.location.href = "/booking";
  }

  function goToHomePage() {
    window.location.href = "/home";
  }

  return (
    <header className=" flex justify-between p-5 bg-cyan-50">
      <div className="flex">
        <h1 className="m-2">
          <strong>
            Welcome {user.first_name} {user.last_name}{" "}
          </strong>
        </h1>
        <img
          className="w-10 h-10 rounded"
          src={user.image}
          alt={user.first_name.concat(user.last_name)}
        />
      </div>
      <nav>
        <Button name="home" submit={false} onClick={goToHomePage} />
        <Button name="book a call" submit={false} onClick={goToBookingPage} />
        <Button name="edit my account" submit={false} onClick={goToEditPage} />
        <Button name="disconnect" submit={false} onClick={disconnect} />
      </nav>
    </header>
  );
}
