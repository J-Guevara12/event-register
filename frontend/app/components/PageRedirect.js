import {Box, Typography, Link} from "@mui/material"

const PageRedirect = () => {
  return (
    <Box 
      sx={{
        marginRight: "auto"
      }}>
      <Typography component="h1" variant="h4">
          Parece que no deberías estar acá
      </Typography>
      <Link href="/" variant="h5">
        {"Inicia sesión"}
      </Link>
    </Box>
  )

}

export default PageRedirect
