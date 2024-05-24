const ip = () => {
    return {
        getip: (req) => {
            let returnIP = "";
            let ipString =
                req.headers["x-real-ip"] ||
                req.headers["x-forwarded-for"] ||
                req.connection.remoteAddress ||
                req.socket.remoteAddress ||
                req.connection.socket.remoteAddress;
            if (ipString.indexOf(",") > -1) {
                ipString = ipString.split(",");
                returnIP = ipString[0];
            } else {
                returnIP = ipString;
            }
            return returnIP;
        }
        
    };
};

module.exports = ip;
