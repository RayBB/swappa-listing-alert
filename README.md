# Swappa Listing Alert  

## Solution Summary  
⚡ Fast notifications for new listings

Email → CloudMailin → Cloud Function → Slack

![Slack Screenshot](/screenshots/slack_screenshot.png "Screenshot of Notification in Slack")

## Overview
[Swappa](https://swappa.com) is a great site for buying and selling used electronics. You get a high level of customer protection and support, the site is really easy to navigate, and listings are well organized. One downside to the site is the lack of public API. If you want notificaitons about new listings the only option is to subscribe to email notifications. I wanted something better than emails. 

## New Notification Flow  
1. User lists new item for a product you’re subscribed to
2. Swappa sends you an email with the item
3. Your email provider forwards that email to [CloudMailin](http://cloudmailin.com)
4. CloudMailin sends email contents to Google Cloud Function
5. Google Cloud Function parses Swappa.com url and sends to Slack webhook
6. Slack receives url, posts to channel, and [unfurls](https://api.slack.com/docs/message-link-unfurling) (showing rich preview)

## Requirements
* Swappa account
* CloudMailin account
* Email Account with forwarding capabilities (such as Gmail)
* GCP or other server to receive api requests

## Setup
1. Setup the [Slack Incoming Webhook](https://slack.com/apps/A0F7XDUAZ-incoming-webhooks) to post a channel. Copy the `webhook URL`.
2. Setup Google Cloud Function (or other server) to receive [requests from CloudMailin](https://docs.cloudmailin.com/http_post_formats/) and forward to Slack. 
    * If using Cloud Functions you can copy [cloud_function.js](cloud_function.js) and replace your `webhook URL`.
    * Copy the `Trigger URL` of your function for the next step.
3. Setup CloudMailin to point to server
    * Enter the `Trigger URL` from the previous step.
    * Select `JSON Format` as the `POST Format`.
    * Use the newly generated email address in the next step.
    * **TIP:** Use a service such as webhookapp.com or ngrok.com if you need help debugging your endpoint.
4. Setup forwarding from your email to your CloudMailin account.
    * Depending on your email provider you may need a verification code.
    * If that’s the case, you should log all messages going to your server to find the verification code.
5. Subscribe to some Swappa products and prepare to receive notifications.

### Notes
* This can be done with the free tier of all services mentioned 🎉
* I didn't go in depth with screenshots of how to setup cloud functions or configure CloudMailin because their interfaces and settings are likely to change.
* This is geared towards people with some technical background. It could be made much simpler by setting this up with heroku and adding a deploy to heroku button.


### Alternative Solutions
This could be solved with a scraper or tool to detect changes in the page.  
I decided not to do that because:  
* It would probably mean delayed notifications
* It would require maintaining a server 24/7
* Swappa probably has captchas or other rate limiting mechanisms
* It would require a persistent datastore

Another solution is to forward the emails directly to Slack. This works okay but then you don't see the rich preview of the listing so you have to open the listing to see the price and other details. 

## Contributing
* ⭐ the repo if this helped you!
* There is an opportunity to customize this by adding price filters, alerting to services other than slack, or logging the data for analysis. If you do any of these things feel free to open a ticket to share with others!
* If you noticed any typos or have ideas for how to make this better feel free to make a PR or open an issue.
* I created this as a GitHub repo so it would be easy for people to find and others could contribute.