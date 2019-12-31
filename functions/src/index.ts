import * as express from "express";
const app = express();

import * as functions from 'firebase-functions';
// import * as firebaseAdmin from 'firebase-admin';

import * as cors from 'cors';
// CORS Origins enabled for UTile websites
var corsOptions = {
    origin: ['https://ut-ile.netlify.com', 'https://ut-ile.github.io'],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

import * as bodyParser from 'body-parser';
import * as sgMail from '@sendgrid/mail';
// firebase functions:config:set someservice.var="THE API KEY" in console to add environment variable
sgMail.setApiKey(functions.config().sendgrid.key);

import * as nodemailer from 'nodemailer';
const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: functions.config().gmail.email,
        pass: functions.config().gmail.password,
    },
});


app.get('/', (request, response) => {
    response.send('Welcome to UTile API');
});

app.get('/helloWorld', (request, response) => {
    response.send('Hello from Firebase!');
});

// Using Nodemailer with Gmail to send email
app.post('/sendMail', bodyParser.json(), (request, response) => {
    let email = {
        from: '"UTile" <noreply@utilegmailnodemailer.com>', // sender address
        to: functions.config().gmail.email, // list of receivers
        subject: request.body.subject, // Subject line
        html: request.body.message // html body
    };
    mailTransport.sendMail(email).then(() => {
        response.json({
            emailSent: true,
            error: null
        });
    }).catch((error) => {
        response.json({
            emailSent: false,
            error: error
        });
    });
});

// Cannot use SendGrid with Firebase Cloud Functions with Spark Plan
app.post('/sendGridEmail', bodyParser.json(), (request, response) => {
    const msg = {
        to: 'interut.ile@protonmail.com',
        from: 'no-reply@interut-ile.com',
        subject: '[UTile][Doc] New Question Contribution',
        text: 'Tu as reçu une nouvelle question à ajouter à la documentation :',
        html: '<strong>' + request.body.question + '</strong>',
    };
    sgMail.send(msg).then(() => {
        response.json({
            emailSent: true,
            error: null
        });
    }).catch((error) => {
        response.json({
            emailSent: false,
            error: error
        });
    });
});


// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const api = functions.https.onRequest(app);