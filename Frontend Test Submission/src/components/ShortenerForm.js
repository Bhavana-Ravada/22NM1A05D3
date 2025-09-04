import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { createShortUrl } from "../api";

export default function ShortenerForm() {
  const [url, setUrl] = useState("");
  const [validity, setValidity] = useState(30);
  const [shortcode, setShortcode] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    try {
      const res = await createShortUrl({ url, validity, shortcode });
      setResult(res.data);
    } catch (err) {
      alert("Error creating short URL");
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h5">Create Short URL</Typography>
      <TextField
        fullWidth
        label="Long URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Validity (mins)"
        type="number"
        value={validity}
        onChange={(e) => setValidity(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Custom Shortcode (optional)"
        value={shortcode}
        onChange={(e) => setShortcode(e.target.value)}
        margin="normal"
      />
      <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>
        Generate
      </Button>

      {result && (
        <Box mt={3}>
          <Typography>
            Short Link: <a href={result.shortLink}>{result.shortLink}</a>
          </Typography>
          <Typography>
            Expires at: {new Date(result.expiry).toLocaleString()}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
