import React from 'react';
import { Box, Typography } from '@mui/material';

function Header() {
  return (
    <Box sx={{backgroundColor:'black',color:'white',textAlign:'center',padding:'5px',opacity:'90%'}}>
      <Box>
        <Typography variant="h3" sx={{ fontWeight:'500'}}>
          Job-Listing!!
        </Typography>
      </Box>
    </Box>
  );
}




export default Header