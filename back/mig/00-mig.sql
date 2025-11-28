CREATE TABLE IF NOT EXISTS "user" (
    user_id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    login TEXT NOT NULL,
    password TEXT NOT NULL,
    location TEXT NOT NULL,
    image TEXT NOT NULL DEFAULT 'https://imgs.search.brave.com/tRxRfpuGwjqoTNhvioMJeaf-Y2wskpdquKEUeym_MbM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9paDEu/cmVkYnViYmxlLm5l/dC9pbWFnZS4yNjQw/NzQ5NzM0LjQzODAv/cmFmLDM2MHgzNjAs/MDc1LHQsZmFmYWZh/OmNhNDQzZjQ3ODYu/anBn'
);

CREATE TABLE IF NOT EXISTS "booking" (
    date TIMESTAMP WITH TIME ZONE NOT NULL,
    user_id INT NOT NULL REFERENCES "user"(user_id) ON DELETE CASCADE PRIMARY KEY
);