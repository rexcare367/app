# Supabase Setup Guide

## 1. Environment Variables

Create a `.env.local` file in your project root with the following variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 2. Get Your Supabase Credentials

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Once your project is created, go to Settings > API
3. Copy the "Project URL" and "anon public" key
4. Paste them into your `.env.local` file

## 3. Create Users Table

In your Supabase dashboard, go to SQL Editor and run:

```sql
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  -- Add your custom columns here based on your webhook payload
  -- Example:
  -- name TEXT,
  -- email TEXT,
  -- data JSONB
);
```

## 4. API Endpoints

### Health Check

- **GET** `/api/health-check`
- Returns service health status

### Webhook

- **POST** `/api/webhook`
- Accepts any JSON payload and inserts it into the users table
- Always returns 200 status for webhook compatibility
- Logs errors but doesn't fail the webhook

## 5. Testing

You can test the endpoints using curl or any HTTP client:

```bash
# Health check
curl http://localhost:3000/api/health-check

# Webhook
curl -X POST http://localhost:3000/api/webhook \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com"}'
```
