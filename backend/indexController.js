const indexController = () => {
    return {
        authentication: async (req, res) => {
            try {
                const userName = req.body.username;
                if (!userName) return res.status(404).json({ message: "Please enter a username" });
                return res.status(200).json({
                    data: userName,
                    secret: "sha253"
                });
            } catch (error) {
                console.log(error);
                res.status(500).json({
                    status: false,
                    message: "Internal Server Error"
                });
            }
        },
        getauth: async (req, res) => {
            try {
                await res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5173');
                await res.send("Hello world");
            } catch (error) {
                console.log(error);
                res.status(500).json({
                    status: false,
                    message: "Internal Server Error"
                });
            }
        }
    };
};

module.exports = indexController;
