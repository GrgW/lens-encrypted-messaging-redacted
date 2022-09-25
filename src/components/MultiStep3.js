/** @jsxImportSource theme-ui */
import { Button, Text, Textarea } from 'theme-ui';
import React from "react";

const Step3 = (props) => {
  const { data, handleChange, home, encryptMessageForProfile, encryptMessageForFollowers } = props;
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

        <p>
          <Textarea 
            name="encryptMessageText"
            id='encrypt_message_box' 
            rows="8"
            placeholder='Enter your message here...'
            onChange={handleChange}
          ></Textarea>
          <br />
          <Button variant='primary' sx={{ bg: 'DarkOrange' }} id="encMsgBtn" onClick={encryptMessageForProfile} >Encrypt for Profile</Button>
          <Text sx={{ px: 10 }} ><br />Only <b> {data.lensHandle} </b> can decrypt this message </Text>

          <br /> <br />
          <Button variant='primary' sx={{ bg: 'DarkOrange' }} id="encMsgBtn" onClick={encryptMessageForFollowers} >Encrypt for Followers</Button>
          <Text sx={{ px: 10 }} ><br /><b style={{color: 'red'}}>New!</b> Only <b>Followers</b> of <i>{data.lensHandle} </i>can decrypt this message </Text>

        </p>      
        <div id="encryptingStatus"></div>

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

export default Step3;