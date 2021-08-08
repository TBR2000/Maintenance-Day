const fetch = require('node-fetch');
require('dotenv').config();



// Ews object enums
const EwsObjectTypes = {
	Container: '00',
	Value: '01',
	Trend: '02',
	Alarm: '03',
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
//Return array of Automation Servers
const getServersContainer = async function getServersContainer(args) {
  if (typeof args == 'undefined') return undefined;

  const path  = args;
  
  const token = bearerToken.expired
    ? ensureBearerToken({ username, password, grantType, tokenResource })
    : bearerToken.access_token;
	
  if (!token || !endpoint || !path) return undefined;
  
 
  const doubleEncodedUri = encodeURIComponent(
    encodeURIComponent(`00${path}`)
  );
  
  const response = await fetch(
    `${endpoint}/Containers/${doubleEncodedUri}/Children`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );
  /*
  Returns Array of Automation server to populate maintenance schedule 
  res.name is used to populate maintenance schedule
  */
  const result = await response.json();  
  return result;
};
	/**
	 * @param {Object} args - Arguments: path, type.
	 *
	 * @returns {Object} Objects inside specified container path.
	 */

  //Return array of VAVs in todays maintenance
	const getTodaysMaintenanceContainer = async function getTodaysMaintenanceContainer(args) {
		if (typeof args == 'undefined') return undefined;
		
		const path = args;
		console.log(path)
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
			`${endpoint}/Containers/${doubleEncodedUri}/Children`,
			{
				headers: {
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		);
		console.log(response)
    /*
    Returns VAVs on bacnet interface of list controller 
    res.description is the name used to populate maintenance cards
    res.name is used in ${selectVAV}
    */
		const result = await response.json();  
		return result;
	};

	/**
	 * @param {Object} args - Arguments: ValueID.
	 *
	 * @returns {Object} VAV values.
	 */
	const getValues = async function getValues(args) {
		if (typeof args == 'undefined') return undefined;

		const valueId  = args;
		const token = bearerToken.expired
			? ensureBearerToken({ username, password, grantType, tokenResource })
			: bearerToken.access_token;

		if (!endpoint || !token || !valueId) return undefined;

		const doubleEncodedUri = `${encodeURIComponent(
			encodeURIComponent(valueId)
		)}`;
		
		console.log	('doubleEncodedUri', valueId)
		
		const response = await fetch(
			`${endpoint}/Values${doubleEncodedUri}`,
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
    	getServersContainer,
		getTodaysMaintenanceContainer,
		getValues,
		bearerToken,
	};
};

// Constants
const endpoint = process.env.ENDPOINT ;
const path = '';
const username = process.env.OAUTH_ID;
const password = process.env.OAUTH_SECRET;
const grantType = process.env.OAUTH_GRANTTYPE ;
const tokenResource = process.env.TOKEN_PATH;
const type = 'Value';

// Create endpoint instance
const eboEndpoint = queryBuilder(endpoint);

//Get list of all servers
const getServers = async(path) => {

	// Authenticate
	await eboEndpoint.ensureBearerToken({
		username,
		password,
		grantType,
		tokenResource,
	});
	
	
	const serverObjects = 	await eboEndpoint.getServersContainer(path)
	//console.log('api', serverObjects)
	return serverObjects;
};
	
// Get all VAVs in path
const getVavs = async(path) => { 

	// Authenticate
	await eboEndpoint.ensureBearerToken({
		username,
		password,
		grantType,
		tokenResource,
	});

	const maintenanceObjects = await eboEndpoint.getTodaysMaintenanceContainer(path);
	console.log(maintenanceObjects)
	//Push all VAVs to new array, and get all 3 values for each VAV
	
	const assetArray = await maintenanceObjects.map(async (data) => {
	
	const assetValue = await eboEndpoint.getValues({
			valueId: `${path}${data.Name}/Application/Variables/ZnTmp/Value`
		});
	const assetSetpoint = await eboEndpoint.getValues({
			valueId: `${path}${data.Name}/Application/SetPoints/ZnTmpSpAct/Value`
		});
	const assetDamper = await eboEndpoint.getValues({
			valueId: `${path}${data.Name}/Application/Variables/TermLoad/Value`
		});
		console.log('assetArray',maintenanceObjects, assetValue, assetSetpoint, assetDamper)
		return maintenanceObjects, assetValue, assetSetpoint, assetDamper;
		
	});

	// This returns all values, it can take a while before it is settled.
	
};


module.exports = { getServers, getVavs }