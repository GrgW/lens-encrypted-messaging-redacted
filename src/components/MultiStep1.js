/** @jsxImportSource theme-ui */
import { Button, Text } from 'theme-ui';
import React from "react"; 
  
const Step1Home = (props) => {
  const { encryptLink, decryptLink } = props;
  return (    
    <div
      sx={{
        display: 'flex',
        flexDirection: 'column',  
        // set this to `minHeight: '100vh'` for full viewport height
        // minHeight: 256,
        minHeight: '100vh',
      }}>
      <div   // centered container
      sx={{ 
        maxWidth: 768,
        mx: 'auto',
        px: 3,
        }}>  
        <header
          sx={{
            width: '100%',          
          }}>
          <p><b>Encrypted Messaging for Lens 🌿, powered by Lit Protocol 🔥 </b> <br />
            <Text>Built by <a href="https://lenster.xyz/u/grgwgrgw.lens" style={{color: 'blue'}} > grgw </a></Text>
          </p>
        </header>
        <main
          sx={{
            width: '100%',
            flex: '1 1 auto',
          }}>
          <Text>Encrypted messaging between Lens profiles. No gas fees. Inspired by this Stani <a href="https://lenster.xyz/posts/0x05-0x41" style={{color: 'blue'}} >Lens post</a>.</Text>
          <br />
          <Text><i>[On-hold] Supports importing your chats from other web3 apps via Ceramic Network.</i></Text>
          <br />  

          <Text><b style={{color: 'red'}}>New!</b> Encrypt messages for the Followers of a specific Lens Profile.</Text>
          <br />  <br /> 

          <Text><i><b>Note:</b> Currently only works on Desktop. Lit Protocol are working on mobile wallet support.</i></Text>
          <br />  <br />  

          <div sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', alignItems: 'center'}}>  
            <Button variant='primary' sx={{ bg: 'DarkOrange' }} onClick={encryptLink}>Encrypt Message</Button>
            <Text sx={{ px: 10 }} >Encrypt a message for another Lens Profile or their Followers</Text>
          </div>  
            <br />
          <div sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', alignItems: 'center'}}>    
            <Button variant='primary' onClick={decryptLink}>Decrypt Message</Button>
            <Text sx={{ px: 10 }} >Decrypt a message sent to your Lens Profile</Text>        
          </div>
          <br />  <br /> <br />  <br /> <br />  <br /> 
        </main>
        <footer
          sx={{
            width: '100%',
          }}>
            <div sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'  }}>  
              <Text><a href="https://lenster.xyz/u/lensprotocol" style={{color: 'blue'}} >🌿 Lens Protocol</a></Text>
              <Text><a href="https://lenster.xyz/u/litprotocol.lens" style={{color: 'blue'}} >🔥 Lit Protocol</a></Text>
            </div>
        </footer>
      </div>
    </div>
  );
};

export default Step1Home;
