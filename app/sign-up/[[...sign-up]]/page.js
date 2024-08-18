import {AppBar, Box, Button, Container, Toolbar, Typography} from "@mui/material";
import {SignUp} from "@clerk/nextjs";

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
          height='100vh'
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          marginTop={3}
        >
          <Typography variant="h4" mb={5}>Sign Up</Typography>
          <SignUp/>
        </Box>
      </Container>
    )
}