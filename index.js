'use strict';

var APP_ID = 'amzn1.ask.skill.4a9d2681-ceab-4964-abd2-78c83eef6703'//add appID here
var AlexaSkill = require('./AlexaSkill');
var http = require('http');
var https = require('https');

var SubscriptionServiceSkill = function () {
    AlexaSkill.call(this, APP_ID);
};

SubscriptionServiceSkill.prototype = Object.create(AlexaSkill.prototype);
SubscriptionServiceSkill.prototype.constructor = SubscriptionServiceSkill;

SubscriptionServiceSkill.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
};

SubscriptionServiceSkill.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleWelcomeRequest(response);

        //Any session init logic would go here.
};

SubscriptionServiceSkill.prototype.eventHandlers.onSessionEnded = function (intent, sessionEndedRequest, session) {
            console.log(intent)
            console.log("onSessionEnded requestId: " + sessionEndedRequest.requestId
                + ", sessionId: " + session.sessionId);
        
            //Session Cleanup Logic
};


SubscriptionServiceSkill.prototype.intentHandlers = {
    "AMAZON.HelpIntent": function(intent, session, response) {
    },
    "AMAZON.StopIntent": function(intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },
    "AMAZON.CancelIntent": function(intent, session, response) {
        var speechOutput = "";
        response.tell(speechOutput);
    },
    "AMAZON.FallbackIntent": function(intent, session, response){
        var speechOutput = "I'm sorry, I didn't quite get that.  Can you ask again?"
        response.ask(speechOutput);
    },
    "responseToNo": function(intent, session, response){
        responseToNo(intent, session, response);
    },
    "fact": function(intent, session, response){
        fact(intent, session, response);
    },
    "responseToYes": function(intent, session, response){
        responseToYes(intent,session,response);
    },
    "testIntent": function(intent, session, response) {
        testIntent(intent, session, response);
    }
};


function handleWelcomeRequest(response) {
    var speechOutput = {
        speech: "Welcome to Chuck Facts! Say fact to hear a fact about Chuck Norris",
        type: AlexaSkill.speechOutputType.PLAIN_TEXT
        },
        repromptOutput = {
            speech: "Say fact puss",
            type: AlexaSkill.speechOutputType.PLAIN_TEXT
        };

    response.ask(speechOutput, repromptOutput);
}

function testIntent(intent, session, response) {
    var speechOutput = {
        speech: "This is a test intent",
        type: AlexaSkill.speechOutputType.PLAIN_TEXT
    }

    response.tell(speechOutput);
    //response.ask(speechOutput);
}

// Giving fact
function fact(intent, session, response) {
    var endpoint = "https://api.chucknorris.io/jokes/random"
    var response;

    httpsReq(endpoint, (err, res) => {
        if (err) {
            return err
        }
        else {
            response = res.value
        }
    })

    var speechOutput = {
        speech: response,
        type: AlexaSkill.speechOutputType.PLAIN_TEXT
    }

    response.tell(speechOutput)
}

//If statements to keep track of when the user said yes and response within context\\
function responseToYes(intent, session, response) {
    
    
}


//If statements to keep track of when the user said no and response within context\\
function responseToNo(intent, session, response) {

}


function httpReq(endpoint, callback) {
console.log(endpoint);
http.get(endpoint, (res) => {
    var body = '';
    console.log('Status Code: ' + res.statusCode);
    
    if(res.statusCode != 200) {
        callback(false,null);
    }

    res.on('data', (chunk) => {
        body += chunk;
    });

    res.on('end', () => {
        var data = JSON.parse(body);
        console.log(data);
        callback(false, data);
    });
}).on('error', (e) => {
    console.log(e);
});
}

function httpsReq(endpoint, callback) {
    console.log(endpoint);
    https.get(endpoint, (res) => {
        var body = '';
        console.log('Status Code: ' + res.statusCode);
    
        if(res.statusCode != 200) {
            callback(false,null);
        }

        res.on('data', (chunk) => {
            body += chunk;
        });

        res.on('end', () => {
            var data = JSON.parse(body);
            console.log(data);
            callback(false, data);
        });
    }).on('error', (e) => {
        console.log(e);
    });
}


exports.handler = function (event, context) {
    var skill = new SubscriptionServiceSkill();
    skill.execute(event, context);
};