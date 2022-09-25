/** @jsxImportSource theme-ui */
import { Button, Text, Input, Label } from 'theme-ui';
import React from "react";

const Step2 = (props) => {
  const { data, handleChange, home, confirmProfile } = props;
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
            <br />
              <Label htmlFor="street">Enter the Lens Profile Id: </Label>
              <Input sx={{width:"160px", height:"40px"}}
                type="text"
                name="profileId"
                value={data.profileId}
                placeholder='0x1234'
                onChange={handleChange}
              />
              (Can find this on Lens users profile page e.g. <a href="https://lenster.xyz/u/lensprotocol" style={{color: 'blue'}} >lensprotocol</a> is 0x01) 
              <br /> <br /> 
            <Button variant='primary' sx={{ bg: 'DarkOrange' }} onClick={confirmProfile} >Confirm Profile Id</Button>
              <div id="confirmingProfileStatus"></div>
              <br />  
              
            <br /> <br />
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

export default Step2;


/*

<Label htmlFor="street">Enter recipients Lens Profile Id: </Label>
<Input sx={{maxWidth: "10px", width: "10px", size: "10px"}}
  color="red"
  max-width="10px"
  size="10px"
  type="text"
  name="profileId"
  value={data.profileId}
  placeholder='0x1234'
  onChange={handleChange}

  */