import pool from '@/db'

const resolvers = {
  Query: {
    users: async () => {
      const { rows } = await pool.query(
        'SELECT * FROM "User" WHERE "userType" = $1',
        ['seller']
      )
      return rows
    },
    user: async (_: any, { id }: { id: string }) => {
      const { rows } = await pool.query(
        'SELECT * FROM "User" WHERE "id" = $1',
        [id]
      )
      return rows[0]
    },
    getArtists: async (
      _: any,
      {
        offset = 0,
        limit = 20,
        searchPattern = '',
        sortBy = 'createdAt',
        sortOrder = 'DESC',
      }: {
        offset?: number
        limit?: number
        searchPattern?: string
        sortBy?: string
        sortOrder?: string
      }
    ) => {
      // Validate sortBy
      const validSortFields = ['createdAt', 'name', 'updatedAt'] // Add valid fields here
      if (!validSortFields.includes(sortBy)) {
        sortBy = 'createdAt' // Default value
      }

      // Query to get the total count of artists
      const countResult = await pool.query(
        searchPattern !== null && searchPattern !== undefined
          ? 'SELECT COUNT(*) AS count FROM "Artist" WHERE name ILIKE $1'
          : 'SELECT COUNT(*) AS count FROM "Artist"',
        searchPattern !== null && searchPattern !== undefined
          ? [`%${searchPattern}%`]
          : []
      )

      const totalCount = parseInt(countResult.rows[0].count, 10) // Ensure it's an integer

      // Query to get the paginated artists
      const result = await pool.query(
        searchPattern !== null && searchPattern !== undefined
          ? `SELECT * FROM "Artist" WHERE name ILIKE $1 ORDER BY "${sortBy}" ${sortOrder} LIMIT $2 OFFSET $3`
          : `SELECT * FROM "Artist" ORDER BY "${sortBy}" ${sortOrder} LIMIT $1 OFFSET $2`,
        searchPattern !== null && searchPattern !== undefined
          ? [`%${searchPattern}%`, limit, offset]
          : [limit, offset]
      )

      const rows = result.rows // Get the rows
      return {
        totalCount,
        artists: rows,
      }
    },
    artist: async (_: any, { id }: { id: string }) => {
      const result = await pool.query('SELECT * FROM "Artist" WHERE id = $1', [
        id,
      ])
      return result.rows[0]
    },
  },
  Mutation: {
    addArtist: async (_: any, { name }: { name: string }) => {
      const [result] = (await pool.query(
        'INSERT INTO artists (name) VALUES (?)',
        [name]
      )) as any
      return { id: result.insertId, name }
    },
    updateArtist: async (
      _: any,
      { id, name }: { id: string; name: string }
    ) => {
      await pool.query('UPDATE artists SET name = ? WHERE id = ?', [name, id])
      return { id, name }
    },
    deleteArtist: async (_: any, { id }: { id: string }) => {
      await pool.query('DELETE FROM artists WHERE id = ?', [id])
      return { id }
    },
  },
}

export default resolvers
