"use client"

import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import Head from "next/head";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { AppBar, Box, Button, Container, Grid, Typography, Toolbar } from "@mui/material";

export default function Home() {
  const handleSubmit = async () => {
    const checkoutSession = await fetch("/api/checkout_sessions", {
      method: "POST",
      headers: {
        origin: "http://localhost:3000"
      }
    })

    if (checkoutSession.statusCode === 500) {
      console.error(checkoutSession.message);
      return;
    }

    const checkoutSessionJSON = await checkoutSession.json();


    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      // Make the id field from the Checkout Session creation API response
      // available to this file, so you can provide it as parameter here
      // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
      sessionId: checkoutSessionJSON.id,
    });

    if (error) {
      console.warn(error.message);
    }
  }

  return (
    <Container maxWidth="100vw">
      <Head>
        <title>Flashcard SaaS</title>
      </Head>
      <meta name="description" content="Create flashcards from your own text!" />

      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>Flashcard SaaS</Typography>
          <SignedOut>
            <Button color="inherit" href="/sign-in">Login</Button>
            <Button color="inherit" href="sign-up">Sign Up</Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>
      <Container
        maxWidth="lg"
        sx={{
          textAlign: 'center',
          height: 'calc(100vh - 56px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Typography variant="h2">Welcome to Flashcard SaaS</Typography>
        <Typography variant="h5" sx={{ mt: 2 }}>
          {" "}
          The easiest way to make flashcards from your text
        </Typography>
        <Button variant="contained" color="primary" sx={{ mt: 2 }} href="/sign-up">
          Get Started
        </Button>
      </Container>

      <Box sx={{ mt: 6 }}>
        <Box>
          <Typography variant="h4" gutterBottom textAlign="center" sx={{ mb: 2 }}>
            Features
          </Typography>
        </Box>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h5" gutterBottom>
              Easy Text Input
            </Typography>
            <Typography variant="body1">
              Simply input your text and let our software do the rest. Creating flashcards has never been easier.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h5" gutterBottom>
              Smart Flashcards
            </Typography>
            <Typography variant="body1">
              Our AI intelligently breaks down your text into concise flashcards, perfect for studying.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h5" gutterBottom>
              Accessible Anywhere
            </Typography>
            <Typography variant="body1">
              Access your flashcards from any device, at any time. Study on the go with ease.
            </Typography>
          </Grid>
        </Grid>
        <Box sx={{ mt: 10 }} textAlign="center">
          <Typography variant="h4" gutterBottom textAlign="center">
            Pricing
          </Typography>
          <Grid container spacing={4} sx={{ mb: 2 }}>
            <Grid item xs={12} md={6} alignItems="center">
              <Box
                sx={{
                  p: 3,
                  border: '1px solid',
                  borderColor: 'grey.300',
                  borderRadius: 2
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Basic
                </Typography>
                <Typography variant="h4">$5 / month</Typography>
                <Typography variant="body2" sx={{ mt: 2 }}>
                  Access to basic flashcard features and limited storage.
                </Typography>
                <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                  Choose Basic
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  p: 3,
                  border: '1px solid',
                  borderColor: 'grey.300',
                  borderRadius: 2
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Pro
                </Typography>
                <Typography variant="h4">$10 / month</Typography>
                <Typography variant="body2" sx={{ mt: 2 }}>
                  Unlimited flashcards and storage.
                </Typography>
                <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleSubmit}>
                  Choose Pro
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
