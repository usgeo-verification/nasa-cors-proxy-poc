export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "Missing 'url' query parameter." });
  }

  try {
    const response = await fetch(url);
    const text = await response.text();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).send(text);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch target", details: error.message });
  }
}
