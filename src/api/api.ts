export const url = process.env.NODE_ENV === 'production'
    ? '/api'
    : 'http://localhost:8081'