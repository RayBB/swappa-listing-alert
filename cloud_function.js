/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.helloWorld = (req, res) => {
    console.log(req.body)
    try {
      const axios = require('axios');
      const bodyText = req.body.html;
      // This regular expression is parsing the listing ID from the body of the email
      const re = /(?<=View Listing )\w+/g;
      const swappaListingId = bodyText.match(re)[0];
  
      axios.post('https://hooks.slack.com/services/*********/*********/************************', {
          "text": "https://swappa.com/listing/view/" + swappaListingId,
          "unfurl_links": true,
          "unfurl_media": true
      })
      .then((webhookResponse) => {
        console.log(webhookResponse);
        res.status(200).send("ok");
      })
      .catch((error) => {
        console.error(error);
        // Always send 200 even when there is an error otherwise CloudMailin gets backlogged
        res.status(200).send(error);
      })
    } catch (error) {
      console.log(error);
      res.status(200).send(error);
    }
  };
  