import {AppBar, Box, Button, Container, Toolbar, Typography} from "@mui/material";
import {SignIn} from "@clerk/nextjs";

import Link from 'next/link';

export default function SignUpPage() {
    return (
      <Container maxWidth="100vw">
        <AppBar>
          <Toolbar>
            <Typography
              variant="h6"
              sx={{
                flexGrow: 1
              }}
            >
              Flashcard SaaS
            </Typography>
            <Button color="inherit" href="/sign-in">Login</Button>
            <Button color="inherit" href="sign-up">Sign Up</Button>
          </Toolbar>
        </AppBar>
        <Box
          height='calc(100vh - 56px)'
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h4" mb={5}>Sign In</Typography>
          <SignIn/>
        </Box>
      </Container>
    )
}