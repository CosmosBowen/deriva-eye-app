# deriva-eye-app
 web app built for EYE-AI open url: https://webapp-eye-ai.wl.r.appspot.com/ and load data : /data/eyes-data.json then play with it!
 
Note: click "Quit" button to save all the changes in a new file "updated-data.json" you made with the original data file.

# hotkey control
To trigger: click anywhere inside "display table", then
press any number("1"-"9") to trigger feature 1;
press certain letters("g"/"b") to trigger feature 2;
press certain letters("w"/"s") for feature 3;

Have the ability to use the keyboard (not just the arrow keys) to change the drop down text.
1. Cup/Disk_Ratio: press "5" to go to 0.5, press "1" to go to 0.1, etc. 
2. Image_Quality, press "g" for good, press "b" for bad
3. Diagnosis, press "w" for no glaucoma (without glaucoma), press "s" for suspected glaucoma

Note:
keyboard shortcut still improving, so please use mouse click instead of hotkey for the following:
Next: "ctrl + n"
Previous: "ctrl + p

## Development Setup
To start the development server, first install required dependencies with:

    npm install

you can then run:

    npm start

Which should start the app server bound to port `3000`.
