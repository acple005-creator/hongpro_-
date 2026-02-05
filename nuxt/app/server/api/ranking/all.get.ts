import { getPool } from "~/server/utils/db"

export default defineEventHandler(async (event) => {
  const pool = getPool()

  // ✅ 너무 커질 수 있으니 기본 200개, ?limit=1000 이런식으로 늘릴 수 있게
  const q = getQuery(event)
  const limit = Math.min(Number(q.limit ?? 200), 5000) // 최대 5000 제한

  const [rows] = await pool.query(
    `SELECT * FROM rankings ORDER BY level DESC LIMIT ?`,
    [limit]
  )

  return rows
})