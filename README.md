## Lens Encrypted Messaging using Lit Protocol

[Steps]
$ npm install
$ npm start

### Notes: 
- Lit config option to disable the browser alerts not working(?) and so 'postinstall' patch here instead. 
- Had to downgrade to react-scripts to v4 to avoid a Buffer not defined issue in Lit Protocol parsing of siwe signature.
