import { neon, neonConfig } from '@neondatabase/serverless'

// Configure neonConfig based on environment
if (typeof window === 'undefined') {
  // Server-side (Node.js)
  import('ws').then((ws) => {
    neonConfig.webSocketConstructor = ws.default
  })
} else {
  // Client-side (Browser)
  neonConfig.webSocketConstructor = WebSocket
}

neonConfig.useSecureWebSocket = true

// Get database URL from environment
const dbUrl = process.env.NEON_DATABASE_URL

if (!dbUrl) {
  throw new Error('NEON_DATABASE_URL is not defined in environment variables')
}

// Create SQL client
export const sql = neon(dbUrl)

// Helper function for queries
export async function query(queryText: string, values: any[] = []) {
  try {
    console.log('Executing query:', queryText)
    console.log('With values:', values)

    // Handle the case when no values are provided
    if (!values || values.length === 0) {
      return await sql(queryText)
    }

    // Create a new array with only the values (no undefined/null)
    const params = values.filter((v) => v != null)

    console.log('Filtered params:', params)

    // Execute the query with parameters
    try {
      const result = await sql(queryText, params)
      console.log('Query successful')
      return result
    } catch (queryError) {
      console.error('SQL query error:', queryError)
      throw queryError
    }
  } catch (error) {
    console.error('Database error:', error)
    throw error
  }
}
