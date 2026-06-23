// Cloudflare Worker - проксирует трафик через Cloudflare CDN
// Деплой: vercel deploy / netlify deploy / cloudflare workers

export default {
    async fetch(request) {
        const url = new URL(request.url);
        
        // Main page
        if (url.pathname === '/' || url.pathname === '/index.html') {
            return new Response(INDEX_HTML, {
                headers: { 'Content-Type': 'text/html; charset=utf-8' }
            });
        }
        
        // Tools page
        if (url.pathname === '/tools' || url.pathname === '/tools.html') {
            return new Response(TOOLS_HTML, {
                headers: { 'Content-Type': 'text/html; charset=utf-8' }
            });
        }
        
        // Proxy API
        if (url.pathname === '/api/proxy') {
            const target = url.searchParams.get('url');
            if (!target) {
                return new Response('Missing url', { status: 400 });
            }
            
            try {
                const targetUrl = new URL(target);
                const resp = await fetch(targetUrl.toString(), {
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                    },
                    redirect: 'follow',
                });
                
                const body = await resp.text();
                return new Response(body, {
                    status: resp.status,
                    headers: {
                        'Content-Type': resp.headers.get('Content-Type') || 'text/html',
                        'Access-Control-Allow-Origin': '*',
                    }
                });
            } catch (e) {
                return new Response('Proxy error: ' + e.message, { status: 502 });
            }
        }
        
        return new Response('Not found', { status: 404 });
    }
};

const INDEX_HTML = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>CloudNews</title>
<style>body{font-family:sans-serif;background:#0f172a;color:#e2e8f0;max-width:800px;margin:0 auto;padding:20px}
h1{color:#38bdf8}.post{background:#1e293b;border:1px solid #334155;border-radius:12px;padding:20px;margin:16px 0}
a{color:#38bdf8}</style></head><body>
<h1>CloudNews</h1>
<div class="post"><h2>Cloud Computing 2026</h2><p>Latest trends in cloud infrastructure...</p></div>
<div class="post"><h2>Web Security</h2><p>Modern security practices...</p></div>
<a href="/tools">Tools</a>
</body></html>`;

const TOOLS_HTML = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>CloudTools</title>
<style>body{font-family:sans-serif;background:#0f172a;color:#e2e8f0;max-width:600px;margin:0 auto;padding:40px;text-align:center}
h1{color:#38bdf8}input{width:100%;padding:12px;background:#0f172a;border:1px solid #334155;border-radius:8px;color:#e2e8f0;font-size:1em;margin:10px 0}
button{padding:12px 24px;background:#38bdf8;color:#0f172a;border:none;border-radius:8px;font-weight:700;cursor:pointer;width:100%}
a{color:#38bdf8;display:block;margin:8px 0}</style></head><body>
<h1>CloudTools</h1>
<input id="url" placeholder="Enter URL...">
<button onclick="go()">Browse</button>
<a href="/proxy.html?url=https://youtube.com">YouTube</a>
<a href="/proxy.html?url=https://telegram.org">Telegram</a>
<a href="/proxy.html?url=https://google.com">Google</a>
<script>function go(){var u=document.getElementById('url').value;if(u)location.href='/proxy.html?url='+encodeURIComponent(u)}</script>
</body></html>`;