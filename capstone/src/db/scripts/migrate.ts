import path from "node:path";
import process from "node:process";
import fs from "node:fs";
import { pool } from "../database";
import { MigrationRow } from "../../types/MigrationRow";
import { logger } from "../../lib/logger";

// since this file will run through the package.json npm script where process.cwd() is
// basically the root "capstone" dir
const MIGRATION_DIR = path.join(process.cwd(), "migrations");

const CREATE_MIGRATIONS_TABLE_SQL = `
	CREATE TABLE IF NOT EXISTS migrations
	(
		id          SERIAL PRIMARY KEY,
		name        VARCHAR(255) UNIQUE,
		executed_at TIMESTAMP NOT NULL DEFAULT NOW()
	)
`;

async function getExecutedMigrationFiles() {
	const result = await pool.query<MigrationRow>(
		"SELECT name FROM migrations ORDER BY name",
	);
	return result.rows.map((migrationRow) => {
		return migrationRow.name;
	});
}

function getAllMigrationFiles() {
	return fs
		.readdirSync(MIGRATION_DIR)
		.filter((file) => file.endsWith(".sql"))
		.sort();
}

async function runMigration(fileName: string) {
	const sql = fs.readFileSync(path.join(MIGRATION_DIR, fileName), "utf-8");
	const dbClient = await pool.connect();

	try {
		await dbClient.query("BEGIN");
		await dbClient.query(sql);
		await dbClient.query("INSERT INTO migrations (name) VALUES ($1)", [fileName]);
		await dbClient.query("COMMIT");
		logger.info(`Migration completed: ${fileName}`);
	} catch (error) {
		await dbClient.query("ROLLBACK");
		throw error;
	} finally {
		dbClient.release();
	}
}

async function migrate() {
	await pool.query(CREATE_MIGRATIONS_TABLE_SQL);

	const executedMigrationFiles = new Set(await getExecutedMigrationFiles());
	const pendingMigrationFiles = getAllMigrationFiles().filter(
		(file) => !executedMigrationFiles.has(file),
	);

	if (pendingMigrationFiles.length === 0) {
		logger.info("No pending migrations found.");
		return;
	}

	for (const migrationFile of pendingMigrationFiles) {
		await runMigration(migrationFile);
	}

	logger.info(`Total ${pendingMigrationFiles.length} migrations completed.`);
}

migrate().catch(error => {
	logger.error({err: error}, "Migrations failed");
	process.exit(1);
}).finally(async () => {
	await pool.end();
});