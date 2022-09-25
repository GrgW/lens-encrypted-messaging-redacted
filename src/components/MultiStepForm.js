/** @jsxImportSource theme-ui */
// import { Text } from 'theme-ui';
import React, { useState } from "react";
import Step1Home from "./MultiStep1";  
import Step2 from "./MultiStep2";
import Step3 from "./MultiStep3";
import Step4 from "./MultiStep4";

import { createClient, getProfiles } from '../api'
import lit from "./lib/lit"; 

//
// APP STATE SETUP
const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    encryptMessageText: "",    
    decryptMessageText: "",
    profileId: "",
    lensHandle: "",
    lensProfileOwnerAddress: "",
    LensFollowNftAddress: "",
  });
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const home = () => {
    setCurrentStep(1);
    setFormData({
      ...formData,
      encryptMessageText: "",
      decryptMessageText: "",
      profileId: "",
      lensHandle: "",
      lensProfileOwnerAddress: "",
      LensFollowNftAddress: "",
    });
  };
  const encryptLink = () => {
    setCurrentStep(2);
  };
  const decryptLink = () => {
    setCurrentStep(4);
  };

  //
  // CONFIRM LENS PROFILE
  const confirmProfile = async (event) => {  
    event.preventDefault();   // prevents browser page refresh
    
    if ((formData.profileId === "")  || (formData.profileId.indexOf('0x') === "-1")) {
      document.getElementById("confirmingProfileStatus").innerText = "Attention: Please enter a valid profile id."; 
      document.getElementById("confirmingProfileStatus").style.color = "Red"
    } else {
      try {  
        const urqlClient = await createClient()
        var sProfile = await urqlClient.query(getProfiles, { id: formData.profileId }).toPromise();  // ugh: should switch back to 'getProfile' and add a catch - but API is pretty stable :-)
        var sProfileData = sProfile.data.profiles.items[0] 
        
        formData.lensHandle = sProfileData.handle;
        formData.LensFollowNftAddress = sProfileData.followNftAddress;
        formData.lensProfileOwnerAddress = sProfileData.ownedBy;

        setCurrentStep(3);
      } catch (error) {
        document.getElementById("confirmingProfileStatus").innerText = "Attention: Profile not found. Please ensure you have entered a valid profile id."; 
        document.getElementById("confirmingProfileStatus").style.color = "Red"
      }
    }    
  }  

  // 
  // ENCRYPT MESSAGE 
  var accessControlConditions = [];
  const chain = 'polygon' 
  var encryptForProfile = true;

  const encryptMessageForProfile = async (event) => {
    event.preventDefault(); 

    // setup access control so that only user with address specified here will be able to decrypt the message ciphertext.
    accessControlConditions = [
      {
        contractAddress: '',
        standardContractType: '',
        chain,
        method: '',
        parameters: [
          ':userAddress'
        ],
        returnValueTest: {
          comparator: '=',
          value: formData.lensProfileOwnerAddress,
          // value: '0x49193D691B44C9384BE796DDf1D5363c0Ea748F2'  // test
        }
      }
    ]
    encryptMessage();
  }

  const encryptMessageForFollowers = async (event) => {
    event.preventDefault();   // prevents browser page refresh
    encryptForProfile = false;

    // setup access control so that only the Profile's Folloers can decrypt
    accessControlConditions = [
      {
        contractAddress: formData.LensFollowNftAddress,
        standardContractType: 'ERC721',
        chain,
        method: 'balanceOf',
        parameters: [
          ':userAddress'
        ],
        returnValueTest: {
          comparator: '>',
          value: '0'
        }
      }
    ]
    encryptMessage();
  }

  const encryptMessage = async (event) => {
    if (formData.encryptMessageText === ""){
      document.getElementById("encryptingStatus").innerText = "Attention: Please enter a message to be encrypted."; 
      document.getElementById("encryptingStatus").style.color = "Red"
      return;
    } else {

      document.getElementById("encryptingStatus").innerText = "Encrypting, please wait...";
      document.getElementById("encryptingStatus").style.color = "Red"

      const encrypted = await lit.encryptMessage(formData.encryptMessageText, accessControlConditions); // returns base64 encodings OR an error           
      if (encrypted.error === "errLitNetwork") {
        document.getElementById("encryptingStatus").innerText = "There may have been a Lit Protocol network error. Please try again.";
        document.getElementById("encryptingStatus").style.color = "Red"
        return;
      } else { // update text box with ciphertext

        if (encryptForProfile) {
          formData.encryptMessageText = ',ss' + encrypted.encryptedString + ',sk' + encrypted.encryptedSymmetricKey + ',si' + formData.profileId + ',se,sp'
        } else {  // encrypt for followers  
          formData.encryptMessageText = ',ss' + encrypted.encryptedString + ',sk' + encrypted.encryptedSymmetricKey + ',si' + formData.profileId + ',se,sf'
        }

        // Disable Encrypt button
        let elementEncrypt = document.getElementById("encMsgBtn");
        elementEncrypt.disabled = true;

        // update the text area
        var displayMessage = "To decrypt this message below please go to https://lens-encrypted-messaging.netlify.app/\n\n<encrypted-message>\n" + formData.encryptMessageText + "\n</encrypted-message>"
        document.getElementById("encrypt_message_box").value = displayMessage;  
        document.getElementById("encryptingStatus").innerHTML = "Done! Send the encrypted message above, <i>including the link</i>,<br>to the recipient(s) via Lens, email or other."; // added <br> to prevent the div expanding. Should fix the css.
        document.getElementById("encryptingStatus").style.color = "Green"             
      }      
    }
    setCurrentStep(currentStep);
  }  // END ENCRYPT


  //
  // DECRYPT MESSAGE
  var legacy_mode = false;
  var invalid_msg_type = false;
  var encryptedForFollowers = false;
  var recipientId
  var encryptedStringBase64
  var encryptedSymmetricKeyBase64
  
  // Handle legacy messages
  function parseLegacyStaniProfileMessage(message) {
    let encMessage = message.indexOf('sKEY:');
    encryptedStringBase64 = message.slice(0, encMessage);
    let startKey = message.indexOf('sKEY:') + 5;
    encryptedSymmetricKeyBase64 = message.slice(startKey);
    recipientId = "0x05"
    // Have to hardcode the ACC here as using formData.lensProfileOwnerAddress does not work - some kinda Javascript literal layout or toolchain thing?
    accessControlConditions = [
      {
        contractAddress: '',
        standardContractType: '',
        chain,
        method: '',
        parameters: [
          ':userAddress'
        ],
        returnValueTest: {
          comparator: '=',
          value: '0x2e21f5d32841cf8c7da805185a041400bf15f21a'
        }
      }
    ]
  }

  function parseLegacyGrgwFollowersMessage(message) {
    // split out encrypted message [ ',ss' + message + ',sk' + key + ',se' ]
    let startMsg = message.indexOf(',ss') + 3;
    let endMsg = message.indexOf(',sk');
    let startKey = endMsg + 3;
    let endKey = message.indexOf(',se');
    encryptedStringBase64 = message.slice(startMsg, endMsg);
    encryptedSymmetricKeyBase64 = message.slice(startKey, endKey);
    recipientId = "0x242d";
    encryptedForFollowers = true;
    // Same as above, here hardcoding for formData.LensFollowNftAddress
    accessControlConditions = [
      {
        contractAddress: '0xdc32824befb687b469c6cffa5afe2504ab24c70c',
        standardContractType: 'ERC721',
        chain,
        method: 'balanceOf',
        parameters: [
          ':userAddress'
        ],
        returnValueTest: {
          comparator: '>',
          value: '0'
        }
      }
    ]
  }

  // Regular: = ',ss' + encryptedStringBase64 + ',sk' + encSymmetricStringBase64 + ',si' + formData.profileId + ',se' + [',sp' | ',sf']. (NB: ',' is base64 friendly separator char.) 
  function parseMessage(message) {
    if ((message.indexOf(',ss') === -1) || (message.indexOf(',sk') === -1) || (message.indexOf(',si') === -1) || (message.indexOf(',se') === -1)) {  
      document.getElementById("decryptingStatus").innerText = "Attention: The message entered is invalid.";
      document.getElementById("decryptingStatus").style.color = "Red"
      invalid_msg_type = true;
      return;
    }

    let startMessage = message.indexOf(',ss'); 
    let endMessage = message.indexOf(',sk');
    encryptedStringBase64 = message.slice(startMessage + 3, endMessage);      
    let startKey = message.indexOf(',sk');  
    let endKey = message.indexOf(',si');
    encryptedSymmetricKeyBase64 = message.slice(startKey + 3, endKey);      
    let endProfile = message.indexOf(',se')  
    recipientId = message.slice(endKey + 3, endProfile);

    if (message.indexOf(',sf') !== -1) {  
      encryptedForFollowers = true;
    }
  }
  
  //  
  // DECRYPT MESSAGE
  const decryptMessage = async (event) => {  
    event.preventDefault(); 

    var message = document.getElementById("decrypt_message_box").value;

    if (message === ""){
      document.getElementById("decryptingStatus").innerText = "Attention: Please enter a message to be decrypted.";
      document.getElementById("decryptingStatus").style.color = "Red"
      return;
    } else {
      document.getElementById("decryptingStatus").innerText = "Decrypting, please wait...";

      // Handle legacy messages - ugh!
      var legacyStaniMsgFound = message.indexOf('Iw0m75lAjP9GHQb/wYiH/ycX+IIPhBeUxGpQHsy8TrL53r6JqH2zSBqDlp40y0a'); 
      var legacyGrgwFollowersMsgFound = message.indexOf('qAeW8T7iB+5kNGhyvoKQMnwcqPlIs3bqsZUEiALNOu2pOGtCLEcmqEEdDUmobcS'); 
      if (legacyStaniMsgFound !== -1){        
        legacy_mode = true;
        parseLegacyStaniProfileMessage(message);
      } else if (legacyGrgwFollowersMsgFound !== -1) {
        legacy_mode = true;
        parseLegacyGrgwFollowersMessage(message);
      } else {
        // Handle new messages
        parseMessage(message);
        if (invalid_msg_type) {
          return;
        }
      }

      // Connect to Lens API
      const urqlClient = await createClient()
      var sProfile = await urqlClient.query(getProfiles, { id: recipientId }).toPromise();  
      var sProfileData = sProfile.data.profiles.items[0]

      formData.LensFollowNftAddress = sProfileData.followNftAddress;
      formData.lensProfileOwnerAddress = sProfileData.ownedBy;
            
      if (! legacy_mode) {
        if (encryptedForFollowers) {
          accessControlConditions = [
            {
              contractAddress: formData.LensFollowNftAddress,
              standardContractType: 'ERC721',
              chain,
              method: 'balanceOf',
              parameters: [
                ':userAddress'
              ],
              returnValueTest: {
                comparator: '>',
                value: '0'
              }
            }
          ]
        } else { // message was encrypted for a Profile
          accessControlConditions = [
            {
              contractAddress: '',
              standardContractType: '',
              chain,
              method: '',
              parameters: [
                ':userAddress'
              ],
              returnValueTest: {
                comparator: '=',
                value: formData.lensProfileOwnerAddress
              }
            }
          ]
        }
      }

      const decrypted = await lit.decryptMessage(encryptedStringBase64, encryptedSymmetricKeyBase64, accessControlConditions);  // encryptedStr & encryptedSymmetricKey passed as base64 encoded
      if (decrypted.error === "errLitNetwork") {
        document.getElementById("encryptingStatus").innerText = "There may have been a Lit Protocol network error. Please try again.";
        document.getElementById("encryptingStatus").style.color = "Red"
        return;
      } else if (decrypted.error === "errNotAuthorised") { 
        if (encryptedForFollowers) {
          document.getElementById("decryptingStatus").innerText = "Access Denied. This message can only be decrypted by Followers of: " + sProfileData.handle;
        } else {
          document.getElementById("decryptingStatus").innerText = "Access Denied. This message can only be decrypted by: " + sProfileData.handle;
        }
        document.getElementById("decryptingStatus").style.color = "Red"
        return;
      } else {
        document.getElementById("decrypt_message_box").value = decrypted.decryptedString; 
        document.getElementById("decryptingStatus").innerText = "Done!";
        document.getElementById("decryptingStatus").style.color = "Green"
      }

      // Disable Decrypt button
      let elementDecrypt = document.getElementById("decMsgBtn"); 
      elementDecrypt.disabled = true;
    }
  }   // END DECRYPT


  //
  // APP STATE TRANSITIONS
  switch (currentStep) {
    case 1:
      return (
        <Step1Home 
          data={formData} 
          handleChange={handleChange} 
          encryptLink={encryptLink} 
          decryptLink={decryptLink}
        />
      );
    case 2:
      return (
        <Step2
          data={formData}
          handleChange={handleChange}
          home={home}
          confirmProfile={confirmProfile}
        />
      );
    case 3:
      return (
        <Step3
          data={formData}
          handleChange={handleChange}
          home={home}
          encryptMessageForProfile={encryptMessageForProfile}
          encryptMessageForFollowers={encryptMessageForFollowers}
          
        />
      );
    case 4:
      return (
        <Step4
          data={formData}
          handleChange={handleChange}
          home={home}
          decryptMessage={decryptMessage}
        />
      );
    default:
          return (
        <Step1Home 
          data={formData} 
          handleChange={handleChange} 
          encryptLink={encryptLink} 
          decryptLink={decryptLink}
        />
      );    
  } 
};
export default MultiStepForm;