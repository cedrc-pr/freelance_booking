import cors from "@fastify/cors";
import fastify from "fastify";
import {
	hasZodFastifySchemaValidationErrors,
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { CustomError } from "./customError";
import { Repo } from "./db";
import {
	type Booking,
	type Id,
	type Login,
	type UserWithoutId,
	ZBooking,
	ZId,
	ZLogin,
	ZUserWithoutId,
} from "./models";

process.loadEnvFile();

function start_web_server() {
	const web_server = fastify({
		logger: true,
	}).withTypeProvider<ZodTypeProvider>();

	web_server.setValidatorCompiler(validatorCompiler);
	web_server.setSerializerCompiler(serializerCompiler);
	web_server.register(cors, {
		origin: ["http://localhost:1234", "http://localhost:5173"],
		methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
		credentials: true,
		allowedHeaders: ["Content-Type", "Authorization"],
	});

	const repo = new Repo();

	web_server.setErrorHandler(async (error, _req, reply) => {
		if (hasZodFastifySchemaValidationErrors(error)) {
			reply.code(400);
			return { message: error.message };
		}

		if (error instanceof CustomError) {
			reply.code(error.code);
			return {
				message: error.message,
			};
		}
		console.error("Unexpected error: ", error);
		reply.code(500);
		return { message: "Unexpected server error" };
	});

	web_server.post<{ Body: Login }>(
		"/login",
		{ schema: { body: ZLogin } },
		async (req) => {
			return await repo.login(req.body);
		},
	);

	web_server.get("/users", async () => {
		return await repo.getUsers();
	});

	web_server.get<{ Params: Id }>(
		"/users/:id",
		{ schema: { params: ZId } },
		async (req) => {
			return await repo.getUserById(req.params.id);
		},
	);

	web_server.post<{ Body: UserWithoutId }>(
		"/users",
		{ schema: { body: ZUserWithoutId } },
		async (req) => {
			return await repo.addUser(req.body);
		},
	);

	web_server.put<{ Body: UserWithoutId; Params: Id }>(
		"/users/:id",
		{ schema: { body: ZUserWithoutId, params: ZId } },
		async (req) => {
			return await repo.updateUserById(req.params.id, req.body);
		},
	);

	web_server.delete<{ Params: Id }>(
		"/users/:id",
		{ schema: { params: ZId } },
		async (req) => {
			return await repo.deleteUserById(req.params.id);
		},
	);

	web_server.get("/bookings", async () => {
		return await repo.getBookings();
	});

	web_server.post<{ Body: Booking }>(
		"/bookings",
		{ schema: { body: ZBooking } },
		async (req) => {
			return await repo.addBooking(req.body);
		},
	);

	web_server.delete<{ Params: Id }>(
		"/bookings/:id",
		{ schema: { params: ZId } },
		async (req) => {
			return await repo.deleteBookingById(req.params.id);
		},
	);

	web_server.listen({ port: 1234, host: "0.0.0.0" }, (err, address) => {
		if (err) {
			console.error(err);
		} else {
			console.log(`listening on ${address}`);
		}
	});
}

start_web_server();
