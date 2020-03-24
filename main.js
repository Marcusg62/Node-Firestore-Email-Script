
var admin = require("firebase-admin");
const htmlString = '<!DOCTYPE html><html lang="en"><head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Thai Basil Announcement</title> <style> body, html { width: 100%; margin: 0; padding: 0; background-color: #fff; } .container { width: 500px; margin: auto; border-radius: 8px !important; } .container > * { width: 500px; padding: 1rem; } .header { background-color: #2d0e46; } img { width: 100%; } * { box-sizing: border-box;font-family: \'Lucida Sans\', \'Lucida Sans Regular\', \'Lucida Grande\', \'Lucida Sans Unicode\', Geneva, Verdana, sans-serif; } .logo { width: 200px; height: auto; margin: auto; display: block; } .tagline { color: #000; background-color: rgb(216, 241, 217); padding: 1rem; } .taglineText { text-align: center; } p, .btn, li { font-size: 1.4rem; margin: .25 rem; font-weight: lighter; } .heroImage { padding: 0px; margin: 0; height: min-content; background-color: black; } .btn { border: none; outline: 0; display: inline-block; padding: 10px 25px; color: #2d0e46; background-color: #7ceba6; text-align: center; cursor: pointer; display: block; margin: auto; margin-bottom: 1rem; } .btn > a { text-decoration: none; } a { color: #2d0e46; } .altA { color: #c6bef5; } .center { text-align: center; } .alt-color { background-color: rgb(11, 172, 32); color: #fff; } .purple { background-color: #2d0e46; } .white { color: white; } </style></head><body> <div class="container"> <div class="header"> <img class="logo" src="https://ordernow.thaibasil-denver.com/assets/images/logo.png" alt="Thai Basil"> </div> <div class="tagline"> <p>Dear customer, </p> <p>We are adapting to this unique and difficult time and wanted to give you an update. </p> <p>We are open with a few changes. </p> <ul> <li><b>Get Alcohol Delivered!</b> </li> <li>Wine, Beer, Cocktails. (Only available on our <a href="https://ordernow.thaibasil-denver.com">official ordering site.</a></li> <li>We have upgraded and added coupons to <a href="https://ordernow.thaibasil-denver.com">our site.</a></li> <li>We will do contactless deliveries whenever possible</li> </ul> <button class="btn"><a href="https://ordernow.thaibasil-denver.com">Order Now</a></button> <p></p> </div> <div class="heroImage"> <img src="https://lh3.googleusercontent.com/SDsKInLeEoIHvLRhHv_G3BRb-Gj2-22FBDaNDNrXnuPyHwqo4OOpW7OCDyivsugEVS2va3VMWckEA16G=h610-no" alt=""> </div> <div class="tagline purple white"> <p class="">We improved our <a class="altA" href="https://ordernow.thaibasil-denver.com">ordering site.</a> Please complete <a class="altA" href="https://forms.gle/Co9Vquaw2VXmJCDM6">this survey</a> for us to make it better. </p> <p class="">Using our site over large platforms helps us stay profitable</p> <h3>Thank you for your support! </h3> </div> </div></body></html>'
var serviceAccount = require("/Users/marcusgallegos/Downloads/firebasil-test-firebase-adminsdk-s61uf-aa9a2af91b.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://firebasil-test.firebaseio.com"
});

let db = admin.firestore();

let emailsSent = {};


let citiesRef = db.collection('users');
let query = citiesRef.get()
    .then(snapshot => {
        if (snapshot.empty) {
            console.log('No matching documents.');
            return;
        }

        snapshot.forEach(doc => {
            if (doc.data().email != null) {
                // console.log(doc.data().email);
                if (emailsSent[doc.data().email]) {
                    console.log('duplicate', doc.data().email)

                }
                else {
                    //send email
                    emailsSent[doc.data().email] == true;
                    db.collection('mail').add({
                        to: doc.data().email,
                        from: 'no-reply@developdenver.tech',
                        message: {
                            subject: 'Support us, not the large platforms',
                            html: htmlString
                        },
                    }).then((req, res) => {
                        console.log('sent')
                    }).catch((err) => {
                        console.log('errror', err)
                    })
                }

            }


        });
    })
    .catch(err => {
        console.log('Error getting documents', err);
    });



console.log('send email');

