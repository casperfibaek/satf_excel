import {
  isValidWhatFreeWords, isValidPluscode, createCoordinateArray, isValidLatitude, isValidLongitude, getGlobal, errNotAvailable, errInvalidValue, getValueForKey, createStateIfDoesntExists,
} from './utils';
import { WindowState } from './types';

declare let window: WindowState;

const { hostname } = window.location;

let apiUrl = '';
if (hostname.includes('satf-test.azurewebsites') || hostname.includes('satf.azurewebsites.net')) {
  apiUrl = `https://${window.location.hostname}/api/`;
} else {
  apiUrl = 'https://localhost:3000/api/';
}

createStateIfDoesntExists();
if (!window.state.initialise.office) {
  Office.onReady(() => {
    console.log('Office ready from custom_functions.js');
    window.state.initialise = ({ ...window.state.initialise, ...{ office: true } });
  });
}

interface ApiReply {
  status: string;
  message: any;
  function: string;
}

const g:any = getGlobal();

/**
 * Converts What3Words to two adjacent cells containing Latitude and Longitude.
 * @customfunction WHAT3WORDS_TO_LATLNG
 * @param {any} what3words
 * @return {Promise<number[][]>} Two cells with latitude and longitude
 */
async function WHAT3WORDS_TO_LATLNG(what3words:any):Promise<number[][]> {
  if (isValidWhatFreeWords(what3words)) {
    try {
      const url = `${apiUrl}what3words_to_latlng?words=${what3words}`;
      const token = getValueForKey('satf_token');

      const apiResponse = await fetch(url, { headers: { Authorization: token } });

      if (apiResponse.status === 401) { throw errNotAvailable('401: Unauthorised user'); }

      const responseJSON:ApiReply = await apiResponse.json();
      if (apiResponse.ok) { return [responseJSON.message]; }

      throw errInvalidValue(responseJSON.message);
    } catch (err) {
      throw errInvalidValue(String(err));
    }
  }
  throw errInvalidValue('500: Invalid What3Words');
}
g.WHAT3WORDS_TO_LATLNG = WHAT3WORDS_TO_LATLNG;

/**
 * Converts a Pluscode to two adjacent cells containing Latitude and Longitude.
 * @customfunction PLUSCODE_TO_LATLNG
 * @param {any} pluscode
 * @return {Promise<number[][]>} Two adjacent cells with latitude and longitude
 */
async function PLUSCODE_TO_LATLNG(pluscode:any):Promise<number[][]> {
  if (isValidPluscode(pluscode)) {
    try {
      const url = `${apiUrl}pluscode_to_latlng?code=${pluscode}`;
      const token = getValueForKey('satf_token');

      const apiResponse = await fetch(url, { headers: { Authorization: token } });

      if (apiResponse.status === 401) { throw errNotAvailable('401: Unauthorised user'); }

      const responseJSON:ApiReply = await apiResponse.json();
      if (apiResponse.ok) { return [responseJSON.message]; }

      throw errInvalidValue(responseJSON.message);
    } catch (err) {
      throw errInvalidValue(String(err));
    }
  }
  throw errInvalidValue('500: Invalid Pluscode');
}
g.PLUSCODE_TO_LATLNG = PLUSCODE_TO_LATLNG;

/**
 * Parses an unknown input to Latitude and Longitude if possible.
 * @customfunction PARSE_TO_LATLNG
 * @param {any} latitudeOrAddress
 * @param {any} [longitude]
 * @return {Promise<number[][]>} Two adjacent cells with latitude and longitude
 */
async function parseToLatlng(latitudeOrAddress:any, longitude:any = false):Promise<number[][]> {
  const coordArray = createCoordinateArray(latitudeOrAddress);

  if (coordArray) {
    return [coordArray];
  } if (isValidLatitude(latitudeOrAddress) && isValidLongitude(longitude)) {
    return [[latitudeOrAddress, longitude]];
  } if (isValidWhatFreeWords(latitudeOrAddress)) {
    const coords = await g.WHAT3WORDS_TO_LATLNG(latitudeOrAddress);
    return coords;
  } if (isValidPluscode(latitudeOrAddress)) {
    const coords = await g.PLUSCODE_TO_LATLNG(latitudeOrAddress);
    return coords;
  }

  throw new Error('500: Unable to parse input');
}

/**
 * Converts Latitude and Longitude to What3Words.
 * An address can be used instead of Latitude.
 * @customfunction LATLNG_TO_WHAT3WORDS
 * @param {any} latitudeOrAddress
 * @param {any} [longitude]
 * @return {Promise<string>} Cell with What3Words address.
 */
async function LATLNG_TO_WHAT3WORDS(latitudeOrAddress:any, longitude:any = false):Promise<string> {
  try {
    const coords = await parseToLatlng(latitudeOrAddress, longitude);
    const url = `${apiUrl}latlng_to_what3words?lat=${coords[0][0]}&lng=${coords[0][1]}`;
    const token = getValueForKey('satf_token');

    const apiResponse = await fetch(url, { headers: { Authorization: token } });

    if (apiResponse.status === 401) { throw errNotAvailable('401: Unauthorised user'); }

    const responseJSON:ApiReply = await apiResponse.json();

    if (apiResponse.ok) { return String(responseJSON.message); }

    throw errInvalidValue(responseJSON.message);
  } catch (err) {
    throw errInvalidValue(err);
  }
}
g.LATLNG_TO_WHAT3WORDS = LATLNG_TO_WHAT3WORDS;

/**
 * Converts Latitude and Longitude to PlusCodes.
 * An address can be used instead of Latitude.
 * @customfunction LATLNG_TO_PLUSCODE
 * @param {any} latitudeOrAddress
 * @param {any} [longitude]
 * @return {Promise<string>} Cell with PlusCode address.
 */
async function LATLNG_TO_PLUSCODE(latitudeOrAddress:any, longitude:any = false):Promise<string> {
  try {
    const coords = await parseToLatlng(latitudeOrAddress, longitude);
    const url = `${apiUrl}latlng_to_pluscode?lat=${coords[0][0]}&lng=${coords[0][1]}`;
    const token = getValueForKey('satf_token');

    const apiResponse = await fetch(url, { headers: { Authorization: token } });

    if (apiResponse.status === 401) { throw errNotAvailable('401: Unauthorised user'); }

    const responseJSON:ApiReply = await apiResponse.json();

    if (apiResponse.ok) { return String(responseJSON.message); }

    throw errInvalidValue(responseJSON.message);
  } catch (err) {
    throw errInvalidValue(err);
  }
}
g.LATLNG_TO_PLUSCODE = LATLNG_TO_PLUSCODE;

/**
 * Tests if there is access to the API and the user is logged in.
 * An address can be used instead of Latitude.
 * @customfunction HELLO_WORLD
 * @return {Promise<string>} Cell saying 'Hello world!' or 'Unauthorised'.
 */
async function HELLO_WORLD():Promise<string> {
  try {
    const url = `${apiUrl}hello_world`;
    const token = getValueForKey('satf_token');

    const apiResponse = await fetch(url, { headers: { Authorization: token } });

    if (apiResponse.status === 401) { throw errNotAvailable('401: Unauthorised user'); }

    const responseJSON:ApiReply = await apiResponse.json();
    if (apiResponse.ok) { return String(responseJSON.message); }

    throw errInvalidValue(responseJSON.message);
  } catch (err) {
    throw errInvalidValue(err);
  }
}
g.HELLO_WORLD = HELLO_WORLD;

/**
 * Calculates the amount of people within a circular radius of a point.
 * An address can be used instead of Latitude.
 * @customfunction POPDENS_BUFFER
 * @param {any} bufferMeters
 * @param {any} latitudeOrAddress
 * @param {any} [longitude]
 * @return {Promise<number>} Cell with amount of people.
 */
async function POPDENS_BUFFER(bufferMeters:any, latitudeOrAddress:any, longitude:any = false):Promise<number> {
  try {
    if (Number.isNaN(bufferMeters)) { throw errInvalidValue('Buffer not a number'); }

    const coords = await parseToLatlng(latitudeOrAddress, longitude);
    const url = `${apiUrl}population_density_buffer?buffer=${bufferMeters}&lat=${coords[0][0]}&lng=${coords[0][1]}`;
    const token = getValueForKey('satf_token');

    const apiResponse = await fetch(url, { headers: { Authorization: token } });

    if (apiResponse.status === 401) { throw errNotAvailable('401: Unauthorised user'); }

    const responseJSON:ApiReply = await apiResponse.json();
    if (apiResponse.ok) { return Number(responseJSON.message); }

    throw errInvalidValue(responseJSON.message);
  } catch (err) {
    throw errInvalidValue(err);
  }
}
g.POPDENS_BUFFER = POPDENS_BUFFER;

/**
 * Calculates the amount of people within a walkable timeframe of the point. Circular approximation.
 * @customfunction POPDENS_BUFFER_WALK
 * @param {any} minutes
 * @param {any} latitudeOrAddress
 * @param {any} [longitude]
 * @return {Promise<number>} Cell with the amount of people.
 */
async function POPDENS_BUFFER_WALK(minutes:any, latitudeOrAddress:any, longitude:any = false):Promise<number> {
  try {
    if (Number.isNaN(minutes)) { throw errInvalidValue('Minutes not a number'); }

    const coords = await parseToLatlng(latitudeOrAddress, longitude);
    const url = `${apiUrl}population_density_walk?minutes=${minutes}&lat=${coords[0][0]}&lng=${coords[0][1]}`;
    const token = getValueForKey('satf_token');

    const apiResponse = await fetch(url, { headers: { Authorization: token } });

    if (apiResponse.status === 401) { throw errNotAvailable('401: Unauthorised user'); }

    const responseJSON:ApiReply = await apiResponse.json();
    if (apiResponse.ok) { return Number(responseJSON.message); }

    throw errInvalidValue(responseJSON.message);
  } catch (err) {
    throw errInvalidValue(err);
  }
}
g.POPDENS_BUFFER_WALK = POPDENS_BUFFER_WALK;

/**
 * Calculates the amount of people within a bikeable timeframe of the point. Circular approximation.
 * @customfunction POPDENS_BUFFER_BIKE
 * @param {any} minutes
 * @param {any} latitudeOrAddress
 * @param {any} [longitude]
 * @return {Promise<number>} Cell with the amount of people.
 */
async function POPDENS_BUFFER_BIKE(minutes:any, latitudeOrAddress:any, longitude:any = false):Promise<number> {
  try {
    if (Number.isNaN(minutes)) { throw errInvalidValue('Minutes not a number'); }

    const coords = await parseToLatlng(latitudeOrAddress, longitude);
    const url = `${apiUrl}population_density_bike?minutes=${minutes}&lat=${coords[0][0]}&lng=${coords[0][1]}`;
    const token = getValueForKey('satf_token');

    const apiResponse = await fetch(url, { headers: { Authorization: token } });

    if (apiResponse.status === 401) { throw errNotAvailable('401: Unauthorised user'); }

    const responseJSON:ApiReply = await apiResponse.json();
    if (apiResponse.ok) { return Number(responseJSON.message); }

    throw errInvalidValue(responseJSON.message);
  } catch (err) {
    throw errInvalidValue(err);
  }
}
g.POPDENS_BUFFER_BIKE = POPDENS_BUFFER_BIKE;

/**
 * Calculates the amount of people within a drivable timeframe of the point. Circular approximation.
 * @customfunction POPDENS_BUFFER_CAR
 * @param {any} minutes
 * @param {any} latitudeOrAddress
 * @param {any} [longitude]
 * @return {Promise<number>} Cell with the amount of people.
 */
async function POPDENS_BUFFER_CAR(minutes:any, latitudeOrAddress:any, longitude:any = false):Promise<number> {
  try {
    if (Number.isNaN(minutes)) { throw errInvalidValue('Minutes not a number'); }

    const coords = await parseToLatlng(latitudeOrAddress, longitude);
    const url = `${apiUrl}population_density_car?minutes=${minutes}&lat=${coords[0][0]}&lng=${coords[0][1]}`;
    const token = getValueForKey('satf_token');

    const apiResponse = await fetch(url, { headers: { Authorization: token } });

    if (apiResponse.status === 401) { throw errNotAvailable('401: Unauthorised user'); }

    const responseJSON:ApiReply = await apiResponse.json();
    if (apiResponse.ok) { return Number(responseJSON.message); }

    throw errInvalidValue(responseJSON.message);
  } catch (err) {
    throw errInvalidValue(err);
  }
}
g.POPDENS_BUFFER_CAR = POPDENS_BUFFER_CAR;

/**
 * Calculates the amount of people within a walkable timeframe of the point. Traverses the road network creating isocrones.
 * @customfunction POPDENS_ISO_WALK
 * @param {any} minutes
 * @param {any} latitudeOrAddress
 * @param {any} [longitude]
 * @return {Promise<number>} Cell with the amount of people.
 */
async function POPDENS_ISO_WALK(minutes:any, latitudeOrAddress:any, longitude:any = false):Promise<number> {
  try {
    if (Number.isNaN(minutes)) { throw errInvalidValue('Minutes not a number'); }

    const coords = await parseToLatlng(latitudeOrAddress, longitude);
    const url = `${apiUrl}pop_density_isochrone_walk?minutes=${minutes}&lat=${coords[0][0]}&lng=${coords[0][1]}`;
    const token = getValueForKey('satf_token');

    const apiResponse = await fetch(url, { headers: { Authorization: token } });

    if (apiResponse.status === 401) { throw errNotAvailable('401: Unauthorised user'); }

    const responseJSON:ApiReply = await apiResponse.json();
    if (apiResponse.ok) { return Number(responseJSON.message); }

    throw errInvalidValue(responseJSON.message);
  } catch (err) {
    throw errInvalidValue(err);
  }
}
g.POPDENS_ISO_WALK = POPDENS_ISO_WALK;

/**
 * Calculates the amount of people within a bikeable timeframe of the point. Traverses the road network creating isocrones.
 * @customfunction POPDENS_ISO_BIKE
 * @param {any} minutes
 * @param {any} latitudeOrAddress
 * @param {any} [longitude]
 * @return {Promise<number>} Cell with the amount of people.
 */
async function POPDENS_ISO_BIKE(minutes:any, latitudeOrAddress:any, longitude:any = false):Promise<number> {
  try {
    if (Number.isNaN(minutes)) { throw errInvalidValue('Minutes not a number'); }

    const coords = await parseToLatlng(latitudeOrAddress, longitude);
    const url = `${apiUrl}pop_density_isochrone_bike?minutes=${minutes}&lat=${coords[0][0]}&lng=${coords[0][1]}`;
    const token = getValueForKey('satf_token');

    const apiResponse = await fetch(url, { headers: { Authorization: token } });

    if (apiResponse.status === 401) { throw errNotAvailable('401: Unauthorised user'); }

    const responseJSON:ApiReply = await apiResponse.json();
    if (apiResponse.ok) { return Number(responseJSON.message); }

    throw errInvalidValue(responseJSON.message);
  } catch (err) {
    throw errInvalidValue(err);
  }
}
g.POPDENS_ISO_BIKE = POPDENS_ISO_BIKE;

/**
 * Calculates the amount of people within a drivable timeframe of the point. Traverses the road network creating isocrones.
 * @customfunction POPDENS_ISO_CAR
 * @param {any} minutes
 * @param {any} latitudeOrAddress
 * @param {any} [longitude]
 * @return {Promise<number>} Cell with the amount of people.
 */
async function POPDENS_ISO_CAR(minutes:any, latitudeOrAddress:any, longitude:any = false):Promise<number> {
  try {
    if (Number.isNaN(minutes)) { throw errInvalidValue('Minutes not a number'); }

    const coords = await parseToLatlng(latitudeOrAddress, longitude);
    const url = `${apiUrl}pop_density_isochrone_car?minutes=${minutes}&lat=${coords[0][0]}&lng=${coords[0][1]}`;
    const token = getValueForKey('satf_token');

    const apiResponse = await fetch(url, { headers: { Authorization: token } });

    if (apiResponse.status === 401) { throw errNotAvailable('401: Unauthorised user'); }

    const responseJSON:ApiReply = await apiResponse.json();
    if (apiResponse.ok) { return Number(responseJSON.message); }

    throw errInvalidValue(responseJSON.message);
  } catch (err) {
    throw errInvalidValue(err);
  }
}
g.POPDENS_ISO_CAR = POPDENS_ISO_CAR;

/**
 * Finds the administrative zone of a point from Latitude and Longitude or an address.
 * Level 1 is regions.
 * @customfunction ADMIN_LEVEL1
 * @param {any} latitudeOrAddress
 * @param {any} [longitude]
 * @return {Promise<string>} Name of the administrative zone.
 */
async function ADMIN_LEVEL1(latitudeOrAddress:any, longitude:any = false):Promise<string> {
  try {
    const coords = await parseToLatlng(latitudeOrAddress, longitude);
    const url = `${apiUrl}admin_level_1?lat=${coords[0][0]}&lng=${coords[0][1]}`;
    const token = global.localStorage.getItem('satf_token');

    const apiResponse = await fetch(url, { headers: { Authorization: token } });

    if (apiResponse.status === 401) { throw errNotAvailable('401: Unauthorised user'); }

    const responseJSON:ApiReply = await apiResponse.json();
    if (apiResponse.ok) { return String(responseJSON.message); }

    throw errInvalidValue(responseJSON.message);
  } catch (err) {
    throw errInvalidValue(err);
  }
}
g.ADMIN_LEVEL1 = ADMIN_LEVEL1;

/**
 * Finds the administrative zone of a point from Latitude and Longitude or an address.
 * Level 2 is municipalities.
 * @customfunction ADMIN_LEVEL2
 * @param {any} latitudeOrAddress
 * @param {any} [longitude]
 * @return {Promise<string>} Name of the administrative zone.
 */
async function ADMIN_LEVEL2(latitudeOrAddress:any, longitude:any = false):Promise<string> {
  try {
    const coords = await parseToLatlng(latitudeOrAddress, longitude);
    const url = `${apiUrl}admin_level_2?lat=${coords[0][0]}&lng=${coords[0][1]}`;
    const token = getValueForKey('satf_token');

    const apiResponse = await fetch(url, { headers: { Authorization: token } });

    if (apiResponse.status === 401) { throw errNotAvailable('401: Unauthorised user'); }

    const responseJSON:ApiReply = await apiResponse.json();
    if (apiResponse.ok) { return responseJSON.message; }

    throw errInvalidValue(responseJSON.message);
  } catch (err) {
    throw errInvalidValue(err);
  }
}
g.ADMIN_LEVEL2 = ADMIN_LEVEL2;

/**
 * Finds the administrative zone that matches the input string the closest.
 * Uses the Levenstein Algorithm.
 * @customfunction ADMIN_LEVEL2_FUZZY_LEV
 * @param {any} latitudeOrAddress
 * @return {Promise<string>} Name of the administrative zone.
 */
async function ADMIN_LEVEL2_FUZZY_LEV(str:any):Promise<string> {
  try {
    const url = `${apiUrl}admin_level_2_fuzzy_lev?name=${str}`;
    const token = getValueForKey('satf_token');

    const apiResponse = await fetch(url, { headers: { Authorization: token } });

    if (apiResponse.status === 401) { throw errNotAvailable('401: Unauthorised user'); }

    const responseJSON:ApiReply = await apiResponse.json();
    if (apiResponse.ok) { return responseJSON.message; }

    throw errInvalidValue(responseJSON.message);
  } catch (err) {
    throw errInvalidValue(err);
  }
}
g.ADMIN_LEVEL2_FUZZY_LEV = ADMIN_LEVEL2_FUZZY_LEV;

/**
 * Finds the administrative zone that matches the input string the closest.
 * Uses trigrams.
 * @customfunction ADMIN_LEVEL2_FUZZY_TRI
 * @param {any} latitudeOrAddress
 * @return {Promise<string>} Name of the administrative zone.
 */
async function ADMIN_LEVEL2_FUZZY_TRI(str:any):Promise<string> {
  try {
    const url = `${apiUrl}admin_level_2_fuzzy_tri?name=${str}`;
    const token = getValueForKey('satf_token');

    const apiResponse = await fetch(url, { headers: { Authorization: token } });

    if (apiResponse.status === 401) { throw errNotAvailable('401: Unauthorised user'); }

    const responseJSON:ApiReply = await apiResponse.json();
    if (apiResponse.ok) { return responseJSON.message; }

    throw errInvalidValue(responseJSON.message);
  } catch (err) {
    throw errInvalidValue(err);
  }
}
g.ADMIN_LEVEL2_FUZZY_TRI = ADMIN_LEVEL2_FUZZY_TRI;

/**
 * Finds all the banks and their addresses matching a naming pattern
 * @customfunction GET_BANKS
 * @param {any} name
 * @param {any} [target]
 * @return {Promise<any[][]>}
 */
async function GET_BANKS(name:any, target:any = 0.4):Promise<any[][]> {
  try {
    let _target = 0.4;
    if (!Number.isNaN(Number(target))) { _target = target; }
    if (target === null) { _target = 0.4; }

    const url = `${apiUrl}get_banks?name=${String(name).replace(/\s/g, '+')}&target=${_target}`;
    const token = getValueForKey('satf_token');

    const apiResponse = await fetch(url, { headers: { Authorization: token } });

    if (apiResponse.status === 401) { throw errNotAvailable('401: Unauthorised user'); }

    const responseJSON:ApiReply = await apiResponse.json();

    if (apiResponse.ok) {
      if (responseJSON.message.length === 0) { return null; }
      const cell = [];
      for (let i = 0; i < responseJSON.message.length; i += 1) {
        cell.push([
          responseJSON.message[i].name,
          Number(responseJSON.message[i].lat),
          Number(responseJSON.message[i].lng),
        ]);
      }
      return cell;
    }

    throw errInvalidValue(responseJSON.message);
  } catch (err) {
    throw errInvalidValue(err);
  }
}
g.GET_BANKS = GET_BANKS;

/**
 * Finds the urban status of a location. #landcover #landuse #urban_status
 * @customfunction URBAN_STATUS
 * @param {any} latitudeOrAddress
 * @param {any} [longitude]
 * @return {Promise<string>} Name of the administrative zone.
 */
async function URBAN_STATUS(latitudeOrAddress:any, longitude:any = false):Promise<string> {
  try {
    const coords = await parseToLatlng(latitudeOrAddress, longitude);
    const url = `${apiUrl}urban_status?lat=${coords[0][0]}&lng=${coords[0][1]}`;
    const token = getValueForKey('satf_token');

    const apiResponse = await fetch(url, { headers: { Authorization: token } });

    if (apiResponse.status === 401) { throw errNotAvailable('401: Unauthorised user'); }

    const responseJSON:ApiReply = await apiResponse.json();
    if (apiResponse.ok) { return String(responseJSON.message); }

    throw errInvalidValue(responseJSON.message);
  } catch (err) {
    throw errInvalidValue(err);
  }
}
g.URBAN_STATUS = URBAN_STATUS;

/**
 * Finds the simplified (1km majority) urban status of a location. #landcover #landuse #urban_status
 * @customfunction URBAN_STATUS_SIMPLE
 * @param {any} latitudeOrAddress
 * @param {any} [longitude]
 * @return {Promise<string>} Name of the administrative zone.
 */
async function URBAN_STATUS_SIMPLE(latitudeOrAddress:any, longitude:any = false):Promise<string> {
  try {
    const coords = await parseToLatlng(latitudeOrAddress, longitude);
    const url = `${apiUrl}urban_status_simple?lat=${coords[0][0]}&lng=${coords[0][1]}`;
    const token = getValueForKey('satf_token');

    const apiResponse = await fetch(url, { headers: { Authorization: token } });

    if (apiResponse.status === 401) { throw errNotAvailable('401: Unauthorised user'); }
    const responseJSON:ApiReply = await apiResponse.json();
    if (apiResponse.ok) { return String(responseJSON.message); }

    throw errInvalidValue(responseJSON.message);
  } catch (err) {
    throw errInvalidValue(err);
  }
}
g.URBAN_STATUS_SIMPLE = URBAN_STATUS_SIMPLE;

/**
 * Finds the nearest placename to the location. Useful to figure out where the point is.
 * @customfunction NEAREST_PLACE
 * @param {any} latitudeOrAddress
 * @param {any} [longitude]
 * @return {Promise<string>} Name of the administrative zone.
 */
async function NEAREST_PLACE(latitudeOrAddress:any, longitude:any = false):Promise<string> {
  try {
    const coords = await parseToLatlng(latitudeOrAddress, longitude);
    const url = `${apiUrl}nearest_placename?lat=${coords[0][0]}&lng=${coords[0][1]}`;
    const token = getValueForKey('satf_token');

    const apiResponse = await fetch(url, { headers: { Authorization: token } });

    if (apiResponse.status === 401) { throw errNotAvailable('401: Unauthorised user'); }

    const responseJSON:ApiReply = await apiResponse.json();
    if (apiResponse.ok) { return String(responseJSON.message); }

    throw errInvalidValue(responseJSON.message);
  } catch (err) {
    throw errInvalidValue(err);
  }
}
g.NEAREST_PLACE = NEAREST_PLACE;

/**
 * Finds the nearest point of interest to the location. Useful to figure out where the point is.
 * @customfunction NEAREST_POI
 * @param {any} latitudeOrAddress
 * @param {any} [longitude]
 * @return {Promise<string>} Name of the administrative zone.
 */
async function NEAREST_POI(latitudeOrAddress:any, longitude:any = false):Promise<string> {
  try {
    const coords = await parseToLatlng(latitudeOrAddress, longitude);
    const url = `${apiUrl}nearest_poi?lat=${coords[0][0]}&lng=${coords[0][1]}`;
    const token = getValueForKey('satf_token');

    const apiResponse = await fetch(url, { headers: { Authorization: token } });

    if (apiResponse.status === 401) { throw errNotAvailable('401: Unauthorised user'); }

    const responseJSON:ApiReply = await apiResponse.json();
    if (apiResponse.ok) { return String(responseJSON.message); }

    throw errInvalidValue(responseJSON.message);
  } catch (err) {
    throw errInvalidValue(err);
  }
}
g.NEAREST_POI = NEAREST_POI;

/**
 * Finds the nearest bank to a location.
 * @customfunction NEAREST_BANK
 * @param {any} latitudeOrAddress
 * @param {any} [longitude]
 * @return {Promise<string>} Name of the administrative zone.
 */
async function NEAREST_BANK(latitudeOrAddress:any, longitude:any = false):Promise<string> {
  try {
    const coords = await parseToLatlng(latitudeOrAddress, longitude);
    const url = `${apiUrl}nearest_bank?lat=${coords[0][0]}&lng=${coords[0][1]}`;
    const token = getValueForKey('satf_token');

    const apiResponse = await fetch(url, { headers: { Authorization: token } });

    if (apiResponse.status === 401) { throw errNotAvailable('401: Unauthorised user'); }
    const responseJSON:ApiReply = await apiResponse.json();
    if (apiResponse.ok) { return responseJSON.message; }

    throw errInvalidValue(String(responseJSON.message));
  } catch (err) {
    throw errInvalidValue(err);
  }
}
g.NEAREST_BANK = NEAREST_BANK;

/**
 * Calculates the distance to the nearest bank.
 * @customfunction NEAREST_BANK_DIST
 * @param {any} latitudeOrAddress
 * @param {any} [longitude]
 * @return {Promise<number>} Name of the administrative zone.
 */
async function NEAREST_BANK_DIST(latitudeOrAddress:any, longitude:any = false):Promise<number> {
  try {
    const coords = await parseToLatlng(latitudeOrAddress, longitude);
    const url = `${apiUrl}nearest_bank_distance?lat=${coords[0][0]}&lng=${coords[0][1]}`;
    const token = getValueForKey('satf_token');

    const apiResponse = await fetch(url, { headers: { Authorization: token } });

    if (apiResponse.status === 401) { throw errNotAvailable('401: Unauthorised user'); }

    const responseJSON:ApiReply = await apiResponse.json();
    if (apiResponse.ok) { return Number(responseJSON.message); }

    throw errInvalidValue(String(responseJSON.message));
  } catch (err) {
    throw errInvalidValue(err);
  }
}
g.NEAREST_BANK_DIST = NEAREST_BANK_DIST;

/**
 * Calculates the walking time/distance between two points.
 * @customfunction TIME_DISTANCE_A_TO_B_WALK
 * @param {any} lat1 Latitude of first point
 * @param {any} lng1 Longitude of first point
 * @param {any} lat2 Latitude of second point
 * @param {any} lng2 Longitude of second point
 * @param {any} [timeOrDistance] Whether to return time (minutes) or distance (meters). Defaults to time.
 * @return {Promise<string>} Cell with PlusCode address.
 */
async function TIME_DISTANCE_A_TO_B_WALK(lat1:any, lng1:any, lat2:any, lng2:any, timeOrDistance:any = 'time'):Promise<string | number> {
  try {
    const coords1 = await parseToLatlng(lat1, lng1);
    const coords2 = await parseToLatlng(lat2, lng2);
    const url = `${apiUrl}a_to_b_time_distance_walk?lat1=${coords1[0][0]}&lng1=${coords1[0][1]}&lat2=${coords2[0][0]}&lng2=${coords2[0][1]}`;
    const token = getValueForKey('satf_token');

    const apiResponse = await fetch(url, { headers: { Authorization: token } });

    if (apiResponse.status === 401) { throw errNotAvailable('401: Unauthorised user'); }

    const responseJSON:ApiReply = await apiResponse.json();

    if (apiResponse.ok) {
      if (timeOrDistance === 'time') {
        return String(responseJSON.message.time);
      }
      return Number(responseJSON.message.distance);
    }

    throw errInvalidValue(responseJSON.message);
  } catch (err) {
    throw errInvalidValue(err);
  }
}
g.TIME_DISTANCE_A_TO_B_WALK = TIME_DISTANCE_A_TO_B_WALK;

/**
 * Calculates the walking time/distance between two points.
 * @customfunction TIME_DISTANCE_A_TO_B_BIKE
 * @param {any} lat1 Latitude of first point
 * @param {any} lng1 Longitude of first point
 * @param {any} lat2 Latitude of second point
 * @param {any} lng2 Longitude of second point
 * @param {any} [timeOrDistance] Whether to return time (minutes) or distance (meters). Defaults to time.
 * @return {Promise<string>} Cell with PlusCode address.
 */
async function TIME_DISTANCE_A_TO_B_BIKE(lat1:any, lng1:any, lat2:any, lng2:any, timeOrDistance:any = 'time'):Promise<string | number> {
  try {
    const coords1 = await parseToLatlng(lat1, lng1);
    const coords2 = await parseToLatlng(lat2, lng2);
    const url = `${apiUrl}a_to_b_time_distance_bike?lat1=${coords1[0][0]}&lng1=${coords1[0][1]}&lat2=${coords2[0][0]}&lng2=${coords2[0][1]}`;
    const token = getValueForKey('satf_token');

    const apiResponse = await fetch(url, { headers: { Authorization: token } });

    if (apiResponse.status === 401) { throw errNotAvailable('401: Unauthorised user'); }

    const responseJSON:ApiReply = await apiResponse.json();

    if (apiResponse.ok) {
      if (timeOrDistance === 'time') {
        return String(responseJSON.message.time);
      }
      return Number(responseJSON.message.distance);
    }

    throw errInvalidValue(responseJSON.message);
  } catch (err) {
    throw errInvalidValue(err);
  }
}
g.TIME_DISTANCE_A_TO_B_BIKE = TIME_DISTANCE_A_TO_B_BIKE;
