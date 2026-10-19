export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
    },
  });
}

export async function onRequestPost(context) {
  const { request, env } = context;

  const body = await request.json();

  const upstream = await fetch('https://9tq4tt5pgg.coze.site/stream_run', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.COZE_TOKEN}`,
      'Content-Type': 'application/json',
      'Accept': 'text/event-stream',
    },
    body: JSON.stringify({
      content: { query: { prompt: [{ type: 'text', content: { text: body.message } }] } },
      type: 'query',
      session_id: body.session_id || 'web-' + Date.now(),
      project_id: '769796232618364142',
    }),
  });

  return new Response(upstream.body, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
