const https = require("https");

const listTags = async page => {
  const options = {
    hostname: "api.github.com",
    port: 443,
    path: `/repos/takomo-io/takomo/tags?page=${page}`,
    method: "GET",
    headers: {
      // "Content-Type": "application/json",
      "User-Agent": "NodeJs"
    }
  };

  let data = "";

  return new Promise(((resolve, reject) => {
    https.get(options, resp => {

      resp.on("data", chunk => {
        data += chunk;
      });

      resp.on("end", () => {
        resolve(JSON.parse(data).map(tag => tag.name));
      });

    }).on("error", err => {
      reject(err);
    });
  }));
};

const sortTags = (a, b) => {
  const [ a1, a2, a3 ] = a.substr(1).split(".");
  const [ b1, b2, b3 ] = b.substr(1).split(".");

  if (a1 > b1) return 1;
  if (b1 > a1) return -1;
  if (a2 > b2) return 1;
  if (b2 > a2) return -1;
  if (a3 > b3) return 1;
  if (b3 > a3) return -1;
  return 0;
};

const getLatestTag = async () =>
  new Promise(async (resolve, reject) => {
    let tags = [];
    let page = 1;
    while (true) {
      const batch = await listTags(page++);
      if (batch.length === 0) {
        break;
      }

      tags = [ ...tags, ...batch ];
    }

    tags.filter(t => t.startsWith("v")).sort(sortTags);

    resolve(tags[0]);
  });

getLatestTag()
  .then(tag => console.log(tag));
