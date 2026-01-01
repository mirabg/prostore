export async function GET() {
  return Response.json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    env: {
      hasDbUrl: !!process.env.DATABASE_URL,
      hasAppName: !!process.env.NEXT_PUBLIC_APP_NAME,
    }
  });
}
