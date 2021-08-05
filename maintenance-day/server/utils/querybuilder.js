const fetch = require('node-fetch');
require('dotenv').config();

// Constants
const endpoint = process.env.ENDPOINT ;
//const path = '/ES1/Trendlogs';
const username = process.env.OAUTH_GRANTTYPE;
const password = process.env.OAUTH_ID;
const grantType = process.env.OAUTH_SECRET ;
const tokenResource = process.env.TOKEN_PATH;
const type = 'Value';

// Ews object enums
const EwsObjectTypes = {
	Container: '0',
	Value: '1',
	Trend: '2',
	Alarm: '3',
};

/**
 * @param {String} endpoint - Endpoint URL.
 *
 * @returns {Object} Querybuilder instance.
 */
const queryBuilder = function queryBuilder(endpoint) {
	if (!endpoint) return undefined;

	/**
	 * @returns {Boolean} True if token has expired or does not exist.
	 */
	const getTokenStatus = function getTokenStatus() {
		if (typeof bearerToken === 'undefined') return true;
		if (!Object.hasOwnProperty.call(bearerToken, '.expires')) return true;
		return new Date().getTime() > new Date(bearerToken['.expires']).getTime();
	};

	let bearerToken = {};
	bearerToken['expired'] = getTokenStatus();

	/**
	 * @param {Object} args - Arguments: tokenResource, grantType, username, password.
	 *
	 * @returns {Object} Bearer token.
	 */
	const ensureBearerToken = async function ensureBearerToken(args) {
		if (!endpoint || !tokenResource || !grantType || !username || !password)
			return bearerToken;

		const authenticate = async function authenticate(args) {
			if (typeof args == 'undefined') return undefined;

			const { tokenResource, grantType, username, password } = args;

			const response = await fetch(`${endpoint}/${tokenResource}`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
				},
				body: `grant_type=${grantType}&username=${username}&password=${password}`,
			});
			const token = await response.json();

			if (typeof token !== 'undefined') {
				bearerToken = { ...bearerToken, ...token };
				bearerToken.expired = getTokenStatus();
			}
		};

		const result = await authenticate(args);
		return result;
	};

	/**
	 * @param {Object} args - Arguments: path, type.
	 *
	 * @returns {Object} Objects inside specified container path.
	 */
	const getContainerChildren = async function getContainerChildren(args) {
		if (typeof args == 'undefined') return undefined;

		const { path } = args;
		const token = bearerToken.expired
			? ensureBearerToken({ username, password, grantType, tokenResource })
			: bearerToken.access_token;

		if (!token || !endpoint || !path) return undefined;

		const doubleEncodedUri = encodeURIComponent(
			encodeURIComponent(`00${path}`)
		);
		const type = Object.hasOwnProperty.call(args, 'type')
			? Object.keys.call(EwsObjectTypes).includes(args.type)
				? `&type=${EwsObjectTypes[args.type]}`
				: ''
			: '';

		const response = await fetch(
			`${endpoint}/Containers/${doubleEncodedUri}${type}/Children`,
			{
				headers: {
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		);

		const result = await response.json();
		return result;
	};

	/**
	 * @param {Object} args - Arguments: trendId, sampledOnOrAfter, sampledBefore, order, seconds, skip.
	 *
	 * @returns {Object} Trend samples.
	 */
	const getTrendSamples = async function getTrendSamples(args) {
		if (typeof args == 'undefined') return undefined;

		const { trendId } = args;
		const token = bearerToken.expired
			? ensureBearerToken({ username, password, grantType, tokenResource })
			: bearerToken.access_token;

		if (!endpoint || !token || !trendId) return undefined;

		const doubleEncodedUri = `trendId=${encodeURIComponent(
			encodeURIComponent(trendId)
		)}`;
		const sampledOnOrAfter = Object.hasOwnProperty.call(
			args,
			'sampledOnOrAfter'
		)
			? `&sampledOnOrAfter=${encodeURIComponent(args.sampledOnOrAfter)}`
			: '';
		const sampledBefore = Object.hasOwnProperty.call(args, 'sampledBefore')
			? `&sampledOnOrAfter=${encodeURIComponent(args.sampledBefore)}`
			: '';
		const orderBy = Object.hasOwnProperty.call(args, 'order')
			? `&orderBy=${
					args.order == 'desc' ? 'SampleDateDescending' : 'SampleDateAscending'
			  }`
			: '';
		const take = Object.hasOwnProperty.call(args, 'seconds')
			? `&take=${args.seconds}`
			: '';
		const skip = Object.hasOwnProperty.call(args, 'skip')
			? `&skip=${args.skip}`
			: '';

		const response = await fetch(
			`${endpoint}/TrendSamples?${doubleEncodedUri}${sampledOnOrAfter}${sampledBefore}${orderBy}${take}${skip}`,
			{
				headers: {
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		);

		const result = await response.json();
		return result;
	};

	return {
		ensureBearerToken,
		getContainerChildren,
		getTrendSamples,
		bearerToken,
	};
};

// Constants
const endpoint = 'http://localhost:8083';
const path = '/ES1/Trendlogs';
const username = 'username';
const password = 'password';
const grantType = 'password';
const tokenResource = 'GetToken';
const type = 'Trend';

// Create endpoint instance
const eboEndpoint = queryBuilder(endpoint);

// Authenticate
await eboEndpoint.ensureBearerToken({
	username,
	password,
	grantType,
	tokenResource,
});

// Get all trend logs in path
const trendLogObjects = await eboEndpoint.getContainerChildren({ path, type });

// Get all trend samples for each trend log object
// This asserts that trends log a value every second which should return data for the last 5 minutes
const trendSamples = await trendLogObjects.map(async (trendLog) => {
	const order = 'desc';
	const fiveMinutes = 5 * 3600;

	const name = trendLog.Name;
	const description = trendLog.Description;
	const unit = trendLog.Unit;
	const liveValueId = trendLog.ValueId;
	const trendSamples = await eboEndpoint.getTrendSamples({
		trendId: trendLog.Id,
		order,
		take: fiveMinutes,
	});
	const values = await trendSamples;

	const exampleSampleData = {
		name,
		description,
		unit,
		liveValueId,
		values,
	};

	return exampleSampleData;
});

// This returns all trend samples, it can take a while before it is settled.
Promise.all(trendSamples).then((completed) =>
	console.log('All trend samples last 5 minutes:', completed)
);