import { neon, neonConfig } from '@neondatabase/serverless'
import ws from 'ws'

const uri = process.env.NEON_DATABASE_URL || ''

if (!process.env.NEON_DATABASE_URL) {
  throw new Error(
    'Please define the NEON_DATABASE_URL environment variable inside .env'
  )
}

// Configure neonConfig for WebSocket support
if (typeof window === 'undefined') {
  // Server-side (Node.js)
  neonConfig.webSocketConstructor = ws
} else {
  // Client-side (Browser)
  neonConfig.webSocketConstructor = WebSocket
}

neonConfig.useSecureWebSocket = true
neonConfig.fetchConnectionCache = true

// Create SQL client
const sql = neon(uri)

// Helper function for queries
async function query(queryText: TemplateStringsArray, values = []) {
  try {
    console.log('Executing query:', queryText)
    console.log('With values:', values)

    // Handle the case when no values are provided
    if (!values || values.length === 0) {
      return await sql(queryText)
    }

    // Filter out null/undefined values
    const params = values.filter((v) => v != null)
    console.log('Filtered params:', params)

    // Execute the query with parameters
    return await sql(queryText, params)
  } catch (error) {
    console.error('Database error:', error)
    throw error
  }
}

// Helper function to sanitize values for SQL queries
function sanitizeValue(value: { toString: () => string } | null | undefined) {
  if (value === null || value === undefined) {
    return 'NULL'
  }
  if (typeof value === 'number') {
    return value.toString()
  }
  if (typeof value === 'boolean') {
    return value ? 'TRUE' : 'FALSE'
  }
  return `'${value.toString().replace(/'/g, "''")}'`
}

module.exports = {
  sql,
  query,
  sanitizeValue,
}
