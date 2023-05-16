import React from 'react';
import { styled } from '@mui/system';
import { AppBar, Toolbar, IconButton } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import InfoIcon from '@mui/icons-material/Info';
import PhoneIcon from '@mui/icons-material/Phone';
import GitHubIcon from '@mui/icons-material/GitHub';

const StyledAppBar = styled(AppBar)({
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  position: 'static',
});

const StyledToolbar = styled(Toolbar)({
  justifyContent: 'center',
});

function Footer() {
  return (
    <StyledAppBar color="primary">
        <br></br>
        <center>Contact Us</center>
      <StyledToolbar>
        <IconButton href="https://www.linkedin.com/in/yahya-salman-37aa29263/" color="inherit">
          <LinkedInIcon />
        </IconButton>
        <IconButton href="https://github.com/Yahya305" color="inherit">
            <GitHubIcon />
        </IconButton>
        <IconButton href="mailto:saimyahya47@gmail.com" color="inherit">
          <EmailIcon />
        </IconButton>
        <IconButton href="/about" color="inherit">
          <InfoIcon />
        </IconButton>
        <IconButton href="tel:+923313420422" color="inherit">
          <PhoneIcon />
        </IconButton>
      </StyledToolbar>
    </StyledAppBar>
  );
}

export default Footer;
