import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { getStats } from "../api";

export default function StatsPage() {
  const [shortcode, setShortcode] = useState("");
  const [stats, setStats] = useState(null);

  const handleFetch = async () => {
    try {
      const res = await getStats(shortcode);
      setStats(res.data);
    } catch {
      alert("Error fetching stats");
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h5">Check Short URL Stats</Typography>
      <TextField
        fullWidth
        label="Shortcode"
        value={shortcode}
        onChange={(e) => setShortcode(e.target.value)}
        margin="normal"
      />
      <Button variant="contained" onClick={handleFetch} sx={{ mt: 2 }}>
        Fetch
      </Button>

      {stats && (
        <Box mt={3}>
          <Typography>Original URL: {stats.originalURL}</Typography>
          <Typography>
            Created At: {new Date(stats.createdAt).toLocaleString()}
          </Typography>
          <Typography>
            Expiry: {new Date(stats.expiry).toLocaleString()}
          </Typography>
          <Typography>Total Clicks: {stats.clicks}</Typography>
        </Box>
      )}
    </Box>
  );
}
