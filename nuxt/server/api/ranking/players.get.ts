import { getPool } from "~/server/utils/db"

export default defineEventHandler(async () => {
  const pool = getPool()

  const [rows] = await pool.query(`
    SELECT
      id,
      nickname,
      level,
      fishing,
      logging,
      mining,
      gathering,
      treasure_hunt,
      created_at,
      updated_at
    FROM players
  `)

  return { rows }
})