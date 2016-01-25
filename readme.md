## Description

A simple node server that will listen to http requests and fetch youtube links. They will then be added to a store and played through a chromecast device.

## Installation

```bash
#Download the project
git clone https://github.com/tihbe/node-home-caster.git
cd node-home-caster

#Install youtube-dl
sudo curl https://yt-dl.org/downloads/2016.01.23/youtube-dl -o /usr/local/bin/youtube-dl
sudo chmod a+rx /usr/local/bin/youtube-dl

#Install node dependencies
npm install
sudo npm install -g gulp
```

Fix issue https://github.com/agnat/node_mdns/issues/130 by changing `Browser.defaultResolverSequence` in `node_modules/mdns/lib/browser.js` to:

```javascript
Browser.defaultResolverSequence = [
  rst.DNSServiceResolve(), 'DNSServiceGetAddrInfo' in dns_sd ? rst.DNSServiceGetAddrInfo() : rst.getaddrinfo({families:[4]})
, rst.makeAddressesUnique()
];
```

## Getting Started

```bash
npm start
```

## License

MIT
https://opensource.org/licenses/MIT
