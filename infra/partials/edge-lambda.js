"use strict";
const path = require("path");

exports.handler = (event, context, callback) => {
  const { request } = event.Records[0].cf;
  const uri = request.uri;
  const extension = path.extname(uri);

  // path.extname returns an empty string when there's no extension.
  // if there is an extension on this request, continue without doing anything!
  if (extension && extension.length > 0) {
    return callback(null, request);
  }

  // if there is already a trailing slash, return.
  if (uri.endsWith("/")) {
    request.uri = `${uri}index.html`;
    return callback(null, request);
  }

  // add a trailing slash.
  const newUri = `${uri}/`;

  // create HTTP redirect
  const redirect = {
    status: "302",
    statusDescription: "Found",
    headers: {
      location: [
        {
          key: "Location",
          value: newUri,
        },
      ],
    },
  };

  return callback(null, redirect);
};
