/** @jsxImportSource theme-ui */
import { Button, Text, Textarea } from 'theme-ui';
import React from "react";

const Step4 = (props) => {
  const { handleChange, home, decryptMessage } = props;
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
        <p><b>Encrypted Messaging for Lens 🌿, powered by Lit Protocol 🔥 </b></p>
      </header>
      <main
        sx={{
          width: '100%',
          flex: '1 1 auto',
        }}>

        <br /> <br />
        Decrypt message sent to your Lens Profile.
        <br /> <br />
        <p>
          <Textarea
            name="decryptMessageText"
            id='decrypt_message_box' 
            rows="8"
            placeholder='Enter message to be decrypted here...'
            onChange={handleChange}
          ></Textarea>
          <br />
          <Button variant='primary' id="decMsgBtn" onClick={decryptMessage}>Decrypt</Button>
        </p>      
        <div id="decryptingStatus"></div>

        <br /> 
        <Button variant='secondary' onClick={home} >Home</Button>
        <br /> <br /> 
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

export default Step4;