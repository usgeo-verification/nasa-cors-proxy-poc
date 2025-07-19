export default async function handler(req, res) {
  const url = req.query.url;

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Referer": "https://google.com"
      }
    });

    const body = await response.text();
    res.status(200).send(body);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch target", details: err.message });
  }
}
