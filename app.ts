import express = require('express');
import type { Request, Response } from 'express';
import bodyParser = require('body-parser');
import request = require('request');
require('dotenv').config();

const app: express.Application = express();
const twilioSID: any = process.env.TWILIO_SID;
const twilioToken: any = process.env.TWILIO_TOKEN;
const toPhone: any = process.env.TO_PHONE;
const fromPhone: any = process.env.FROM_PHONE;
const messagingUrl: string = `https://api.twilio.com/2010-04-01/Accounts/${twilioSID}/Messages.json`;

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req: Request, res: Response) => {
    res.send("hey");
});

app.post('/', (req: Request, res: Response) => {
    let body: {Body: any, From: any, To: any} = {Body: req.body.Body, From: fromPhone, To: toPhone};
    request.post(messagingUrl, {
        auth: {
            username: twilioSID,
            password: twilioToken
        }, 
        headers: { 
            'Content-Type' : 'application/x-www-form-urlencoded' 
        },
        formData: body
    }, (err: Error, res: request.Response, body: any) => {
        if (err) {
            console.log(err);
        } else {
            console.log("success");
        }
    })
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
