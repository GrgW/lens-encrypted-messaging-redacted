## Encrypted Messaging for Lens 

Check it out here: [**Encrypted Messaging for Lens 🌿, powered by Lit Protocol 🔥**](https://lens-encrypted-messaging.netlify.app/)

**NOTE**: This is a toy application for demonstration purposes only. Lit Protocol is still under active development and so this app should NOT be used to encrypt sensitive information of any kind. Based on review of the project docs and Discord the protocol is currently susceptible to collusion attacks. Lit Protocol team are aware and considering various design options to address this.  

#### Comments: 
- Lit config option to disable the browser alerts not working(?) and so 'postinstall' patch here instead. 
- Had to downgrade to react-scripts to v4 to avoid a Buffer not defined issue in Lit Protocol parsing of siwe signature.
- ...

#### Steps: 
`$ npm install`
`$ npm start` 

#### Credits: 
The code used to interact with the Lens API was "inspired" by someone else. Pretty sure it was @nader.lens 's https://github.com/dabit3/lens-protocol-frontend 
