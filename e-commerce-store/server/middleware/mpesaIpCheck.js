const safaricomWhitelist = [
	'196.201.214.200',
	'196.201.214.206',
	'196.201.213.114',
	'196.201.214.207',
	'196.201.214.208',
	'196.201.213.44',
	'196.201.212.127',
	'196.201.212.138',
	'196.201.212.129',
	'196.201.212.136',
	'196.201.212.74',
	'196.201.212.69'
];

const verifySafaricomIP = (req, res, next) => {
	const clientIp = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress;

	if (!safaricomWhitelist.includes(clientIp)) {
		console.log(`Blocked callback from non-whitelisted IP: ${clientIp}`);
		return res.status(403).json({ error: "IP not whitelisted" });
	}

	next();
};
module.exports = verifySafaricomIP
