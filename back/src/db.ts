import postgres from "postgres";
import { CustomError } from "./customError";
import type { Booking, Login, User, UserWithoutId } from "./models";

export class Repo {
  sql: postgres.Sql;

  constructor() {
    console.log("\n", process.env.PGHOST, "\n");
    this.sql = postgres({
      host: process.env.PGHOST,
      port: process.env.PGPORT ? Number(process.env.PGPORT) : undefined,
      username: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      database: process.env.PGDATABASE,
    });
  }

  async login({ login, password }: Login) {
    const rows = (await this.sql`
      SELECT * FROM "user" WHERE login = ${login} AND password = ${password};`) as User[];
    if (rows.length === 0) {
      throw new CustomError(404, "not found");
    }
    return rows[0];
  }

  async addUser(user: UserWithoutId) {
    if (user.image) {
      const rows = (await this.sql`
      INSERT INTO "user"
        (first_name, last_name, image, login, password, location)
      VALUES
        (${user.first_name}, ${user.last_name}, ${user.image}, ${user.login}, ${user.password}, ${user.location})
      RETURNING *;
    `) as User[];
      return rows[0];
    } else {
      const rows = (await this.sql`
      INSERT INTO "user"
        (first_name, last_name, login, password, location)
      VALUES
        (${user.first_name}, ${user.last_name}, ${user.login}, ${user.password}, ${user.location})
      RETURNING *;
    `) as User[];
      return rows[0];
    }
  }

  async getUsers() {
    return (await this.sql`
      SELECT * FROM "user";`) as User[];
  }

  async getUserById(id: number) {
    const rows = (await this.sql`
      SELECT * FROM "user" WHERE user_id = ${id}`) as User[];
    if (rows.length === 0) {
      throw new CustomError(404, "not found");
    }
    return rows[0];
  }

  async updateUserById(id: number, user: UserWithoutId) {
    return (
      (await this.sql`
      UPDATE "user"
      SET
      first_name = ${user.first_name},
      last_name = ${user.last_name},
      image = ${user.image},
      login = ${user.login},
      password = ${user.password},
      location = ${user.location}
      WHERE user_id = ${id}
      RETURNING *;`) as User[]
    )[0];
  }

  async deleteUserById(id: number) {
    return (
      (await this.sql`
      DELETE FROM "user" WHERE user_id = ${id} RETURNING *;`) as User[]
    )[0];
  }

  async getBookings() {
    return (await this.sql`SELECT * FROM "booking";`) as Booking[];
  }

  async addBooking(booking: Booking) {
    return (
      (await this.sql`
      INSERT INTO "booking"
      (date, user_id)
      VALUES
      (${booking.date}, ${booking.user_id})
      RETURNING *;`) as Booking[]
    )[0];
  }

  async deleteBookingById(id: number) {
    return (
      (await this.sql`
      DELETE FROM "booking" WHERE user_id = ${id} RETURNING *;`) as Booking[]
    )[0];
  }
}
