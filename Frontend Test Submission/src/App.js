import React from "react";
import { Container, Tabs, Tab, Box } from "@mui/material";
import ShortenerForm from "./components/ShortenerForm";
import StatsPage from "./components/StatsPage";

export default function App() {
  const [tab, setTab] = React.useState(0);

  return (
    <Container>
      <Tabs value={tab} onChange={(e, val) => setTab(val)}>
        <Tab label="Shorten URL" />
        <Tab label="View Stats" />
      </Tabs>

      <Box mt={3}>
        {tab === 0 && <ShortenerForm />}
        {tab === 1 && <StatsPage />}
      </Box>
    </Container>
  );
}
