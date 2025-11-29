import { useEffect, useMemo, useState } from "react";
import type { Booking, User } from "../../models";
import Button from "../ui/Button";

const ALL_HOURS = [
  "18:00:00.000Z",
  "19:00:00.000Z",
  "20:00:00.000Z",
  "21:00:00.000Z",
  "22:00:00.000Z",
];

function toISODateString(d: Date) {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function parseBookingDate(value: string | Date) {
  return typeof value === "string" ? new Date(value) : value;
}

export default function FormBooking() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [day, setDay] = useState<string>("");
  const [hour, setHour] = useState<string>(ALL_HOURS[0]);
  const [booked, setBooked] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const user = JSON.parse(localStorage.getItem("user") ?? "") as User;
  useEffect(() => {
    let mounted = true;
    const getBookings = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("http://localhost:1234/bookings");
        if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
        const data = (await res.json()) as Booking[];
        if (!mounted) return;
        setBookings(data);
        if (user.user_id != null) {
          const booking = data.find((b) => b.user_id === user.user_id);
          if (booking) {
            setBooked(booking.date);
          }
        }
      } catch (err: any) {
        if (!mounted) return;
        setError(err?.message ?? "Unknown error");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    getBookings();
    return () => {
      mounted = false;
    };
  }, [user.user_id]);

  const hoursPossible = useMemo(() => {
    if (!day) return [];
    const booked = new Set<string>();
    for (const b of bookings) {
      const d = parseBookingDate(b.date);
      const bookingDay = toISODateString(d);
      if (bookingDay === day) {
        const iso = d.toISOString();
        const time = iso.split("T")[1];
        booked.add(time);
      }
    }
    return ALL_HOURS.filter((h) => !booked.has(h));
  }, [bookings, day]);

  const bookingSubmit = async () => {
    try {
      console.log(day, hour);
      await fetch("http://localhost:1234/bookings", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          date: new Date(`${day}T${hour.replace(/^T/, "")}`),
          user_id: user.user_id,
        }),
      });
      await fetch(`http://localhost:1234/users/${user.user_id}/booking_email`);
    } catch (error) {
      console.error(error);
    }
  };

  function formatDatePretty(d: Date) {
    const year = d.getUTCFullYear();
    const month = String(d.getUTCMonth() + 1).padStart(2, "0");
    const day = String(d.getUTCDate()).padStart(2, "0");
    const hours = String(d.getUTCHours()).padStart(2, "0");
    const minutes = String(d.getUTCMinutes()).padStart(2, "0");
    return `${year}-${month}-${day} at ${hours}:${minutes}`;
  }

  const deleteBookedCall = () => {
    const deleteMyCall = async () => {
      try {
        await fetch(`http://localhost:1234/bookings/${user.user_id}`, {
          method: "DELETE",
        });
        window.location.href = "/booking";
      } catch (error) {
        console.log(error);
      }
    };
    deleteMyCall();
  };

  if (loading) return <p>Loading…</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;
  if (booked) {
    return (
      <section className="w-80 mx-auto p-10">
        <h1 className="p-2">
          Call booked on:
          <br />
          <strong>{formatDatePretty(new Date(booked))}</strong>
        </h1>
        <Button
          name="Delete my booked call"
          submit={false}
          onClick={deleteBookedCall}
        />
      </section>
    );
  }
  return (
    <form className="w-80 mx-auto mt-10" onSubmit={() => bookingSubmit()}>
      <label
        className="block text-sm font-medium text-gray-700 mb-1"
        htmlFor="day"
      >
        Choose a date
      </label>

      <input
        id="day"
        name="day"
        type="date"
        value={day}
        onChange={(e) => {
          setDay(e.target.value);
          setHour(ALL_HOURS[0]);
        }}
        className="w-full max-w-xs rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900
         focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      />

      <label
        className="block text-sm font-medium text-gray-700 mt-4 mb-1"
        htmlFor="hour"
      >
        Choose an hour
      </label>

      <select
        id="hour"
        value={hour}
        onChange={(e) => setHour(e.target.value)}
        disabled={day === "" || hoursPossible.length === 0}
        className="w-full max-w-xs rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900
         focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 mb-5"
      >
        {hoursPossible.length === 0 ? (
          <option value="">No available slots</option>
        ) : (
          hoursPossible.map((h) => {
            const label = h.slice(0, 5);
            return (
              <option value={h} key={h}>
                {label}
              </option>
            );
          })
        )}
      </select>
      <Button name="confirm" submit={true} />
    </form>
  );
}
