"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/* CustomFunctions, executed in Excel cells. Metadata defined in ./functions_meta.json */
function isValidPluscode(code) {
    // A separator used to break the code into two parts to aid memorability.
    var seperator = '+';
    // The number of characters to place before the separator.
    var seperatorPosition = 8;
    // The character used to pad codes.
    var paddingCharacter = '0';
    // The character set used to encode the values.
    var codeAlphabet = '23456789CFGHJMPQRVWX';
    if (!code || typeof code !== 'string') {
        return false;
    }
    // The separator is required.
    if (code.indexOf(seperator) === -1) {
        return false;
    }
    if (code.indexOf(seperator) !== code.lastIndexOf(seperator)) {
        return false;
    }
    // Is it the only character?
    if (code.length === 1) {
        return false;
    }
    // Is it in an illegal position?
    if (code.indexOf(seperator) > seperatorPosition || code.indexOf(seperator) % 2 === 1) {
        return false;
    }
    // We can have an even number of padding characters before the separator,
    // but then it must be the final character.
    if (code.indexOf(paddingCharacter) > -1) {
        // Not allowed to start with them!
        if (code.indexOf(paddingCharacter) === 0) {
            return false;
        }
        // There can only be one group and it must have even length.
        var padMatch = code.match(new RegExp("(" + paddingCharacter + "+)", 'g'));
        if (padMatch.length > 1 || padMatch[0].length % 2 === 1 || padMatch[0].length > seperatorPosition - 2) {
            return false;
        }
        // If the code is long enough to end with a separator, make sure it does.
        if (code.charAt(code.length - 1) !== seperator) {
            return false;
        }
    }
    // If there are characters after the separator, make sure there isn't just
    // one of them (not legal).
    if (code.length - code.indexOf(seperator) - 1 === 1) {
        return false;
    }
    // Strip the separator and any padding characters.
    var nosepCode = code.replace(new RegExp("\\" + seperator + "+"), '').replace(new RegExp(paddingCharacter + "+"), '');
    // Check the code contains only valid characters.
    for (var i = 0, len = nosepCode.length; i < len; i += 1) {
        var character = nosepCode.charAt(i).toUpperCase();
        if (character !== seperator && codeAlphabet.indexOf(character) === -1) {
            return false;
        }
    }
    return true;
}
function isValidWhatFreeWords(str) {
    if (typeof str !== 'string') {
        return false;
    }
    if (str.split('.').length !== 3) {
        return false;
    }
    if (/^[a-zA-Z.]+$/.test(str) === false) {
        return false;
    }
    return true;
}
function isValidGhanaPostalGPS(str) {
    if (typeof str !== 'string') {
        return false;
    }
    var arr = str.split('-');
    if (arr.length !== 3) {
        return false;
    }
    if (arr[0].length !== 2) {
        return false;
    }
    if (arr[1].length < 3 || arr[1].length > 5) {
        return false;
    }
    if (arr[2].length < 3 || arr[2].length > 5) {
        return false;
    }
    if (/^\d+$/.test(arr[0]) === true) {
        return false;
    }
    if (/^[a-zA-Z]+$/.test(arr[0]) === false) {
        return false;
    }
    if (/^\d+$/.test(arr[1]) === false) {
        return false;
    }
    if (/^\d+$/.test(arr[2]) === false) {
        return false;
    }
    return true;
}
function isValidLatitude(lat) {
    var number = Number(lat);
    try {
        if (isNaN(number)) {
            return false;
        }
        if (number < -90 || number > 90) {
            return false;
        }
        return true;
    }
    catch (_a) {
        return false;
    }
}
function isValidLongitude(lat) {
    var number = Number(lat);
    try {
        if (isNaN(number)) {
            return false;
        }
        if (number < -180 || number > 180) {
            return false;
        }
        return true;
    }
    catch (_a) {
        return false;
    }
}
function coordinateArray(arr) {
    if (!Array.isArray(arr)) {
        return false;
    }
    if (arr.length === 0 || arr.length > 2) {
        return false;
    }
    if (arr.length === 1) {
        if (arr[0].length !== 2) {
            return false;
        }
        if (!isValidLatitude(arr[0][0])) {
            return false;
        }
        if (!isValidLongitude(arr[0][1])) {
            return false;
        }
        return [Number(arr[0][0]), Number(arr[0][1])];
    }
    if (arr.length === 2) {
        if (Array.isArray(arr[0]) && Array.isArray(arr[1])) {
            if (!isValidLatitude(arr[0][0])) {
                return false;
            }
            if (!isValidLongitude(arr[1][0])) {
                return false;
            }
            return [Number(arr[0][0]), Number(arr[1][0])];
        }
        if (!isValidLatitude(arr[0])) {
            return false;
        }
        if (!isValidLongitude(arr[1])) {
            return false;
        }
        return [Number(arr[0]), Number(arr[1])];
    }
    return false;
}
function getGlobal() {
    if (typeof self !== 'undefined') {
        return self;
    }
    if (typeof window !== 'undefined') {
        return window;
    }
    if (typeof global !== 'undefined') {
        return global;
    }
    throw new Error('Unable to get global namespace.');
}
Office.onReady(function () { });
var g = getGlobal();
/**
 * Converts What3Words to two adjacent cells containing Latitude and Longitude.
 * @customfunction WHAT3WORDS_TO_LATLNG
 * @param {string} what3words
 * @return {number[][]} Two cells with latitude and longitude
 */
function WHAT3WORDS_TO_LATLNG(what3words) {
    return __awaiter(this, void 0, void 0, function () {
        var url, token, apiResponse, responseJSON, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!isValidWhatFreeWords(what3words)) return [3 /*break*/, 5];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    url = "../../api/whatfreewords_to_latlng?words=" + what3words;
                    token = g.localStorage.getItem('satf_token');
                    return [4 /*yield*/, fetch(url, { headers: { Authorization: token } })];
                case 2:
                    apiResponse = _a.sent();
                    if (apiResponse.status === 401) {
                        throw new CustomFunctions.Error(CustomFunctions.ErrorCode.notAvailable, String('Unauthorised user'));
                    }
                    return [4 /*yield*/, apiResponse.json()];
                case 3:
                    responseJSON = _a.sent();
                    if (apiResponse.ok) {
                        return [2 /*return*/, [responseJSON.message]];
                    }
                    throw new CustomFunctions.Error(CustomFunctions.ErrorCode.invalidValue, String(responseJSON.message));
                case 4:
                    err_1 = _a.sent();
                    throw new CustomFunctions.Error(CustomFunctions.ErrorCode.invalidValue, String(err_1));
                case 5: throw new CustomFunctions.Error(CustomFunctions.ErrorCode.invalidValue, String('500: Invalid What3Words'));
            }
        });
    });
}
g.WHAT3WORDS_TO_LATLNG = WHAT3WORDS_TO_LATLNG;
/**
 * Converts a Pluscode to two adjacent cells containing Latitude and Longitude.
 * @customfunction PLUSCODE_TO_LATLNG
 * @param {string} pluscode
 * @return {number[][]} Two adjacent cells with latitude and longitude
 */
function PLUSCODE_TO_LATLNG(pluscode) {
    return __awaiter(this, void 0, void 0, function () {
        var url, token, apiResponse, responseJSON, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!isValidPluscode(pluscode)) return [3 /*break*/, 5];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    url = "../../api/pluscode_to_latlng?code=" + pluscode;
                    token = g.localStorage.getItem('satf_token');
                    return [4 /*yield*/, fetch(url, { headers: { Authorization: token } })];
                case 2:
                    apiResponse = _a.sent();
                    if (apiResponse.status === 401) {
                        throw new CustomFunctions.Error(CustomFunctions.ErrorCode.notAvailable, String('Unauthorised user'));
                    }
                    return [4 /*yield*/, apiResponse.json()];
                case 3:
                    responseJSON = _a.sent();
                    if (apiResponse.ok) {
                        return [2 /*return*/, [responseJSON.message]];
                    }
                    throw new CustomFunctions.Error(CustomFunctions.ErrorCode.invalidValue, String(responseJSON.message));
                case 4:
                    err_2 = _a.sent();
                    throw new CustomFunctions.Error(CustomFunctions.ErrorCode.invalidValue, String(err_2));
                case 5: throw new CustomFunctions.Error(CustomFunctions.ErrorCode.invalidValue, String('500: Invalid pluscode'));
            }
        });
    });
}
g.PLUSCODE_TO_LATLNG = PLUSCODE_TO_LATLNG;
/**
 * Converts a Ghana Digital Address (Ghana Postal GPS) to two adjacent cells containing Latitude and Longitude.
 * @customfunction GPGPS_TO_LATLNG
 * @param {string} gpgps
 * @return {number[][]} Two adjacent cells with latitude and longitude
 */
function GPGPS_TO_LATLNG(gpgps) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (isValidGhanaPostalGPS(gpgps)) {
                return [2 /*return*/, [[0.0, 0.0]]];
                // try {
                //   const url = `../../api/gpgps_to_latlng?gpgps=${gpgps}`;
                //   const token = g.localStorage.getItem('satf_token');
                //   const apiResponse = await fetch(url, { headers: { Authorization: token } });
                //   const responseJSON = await apiResponse.json();
                //   if (apiResponse.ok) { return [responseJSON.message]; }
                //   throw new CustomFunctions.Error(CustomFunctions.ErrorCode.invalidValue, String(responseJSON.message));
                // } catch (err) {
                //   throw new CustomFunctions.Error(CustomFunctions.ErrorCode.invalidValue, String(err));
                // }
            }
            throw new CustomFunctions.Error(CustomFunctions.ErrorCode.invalidValue, String('500: Invalid Ghana Digital Address'));
        });
    });
}
g.GPGPS_TO_LATLNG = GPGPS_TO_LATLNG;
/**
 * Parses an unknown input to Latitude and Longitude if possible.
 * @customfunction PARSE_TO_LATLNG
 * @param {any} latitude_or_address
 * @param {number} [longitude]
 * @return {number[][]} Two adjacent cells with latitude and longitude
 */
function PARSE_TO_LATLNG(latitude_or_address, longitude) {
    if (longitude === void 0) { longitude = false; }
    return __awaiter(this, void 0, void 0, function () {
        var coordArray, coords, coords, coords;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    coordArray = coordinateArray(latitude_or_address);
                    if (coordArray) {
                        return [2 /*return*/, [coordArray]];
                    }
                    if (isValidLatitude(latitude_or_address) && isValidLongitude(longitude)) {
                        return [2 /*return*/, [[latitude_or_address, longitude]]];
                    }
                    if (!isValidWhatFreeWords(latitude_or_address)) return [3 /*break*/, 2];
                    return [4 /*yield*/, WHAT3WORDS_TO_LATLNG(latitude_or_address)];
                case 1:
                    coords = _a.sent();
                    return [2 /*return*/, coords];
                case 2:
                    if (!isValidPluscode(latitude_or_address)) return [3 /*break*/, 4];
                    return [4 /*yield*/, PLUSCODE_TO_LATLNG(latitude_or_address)];
                case 3:
                    coords = _a.sent();
                    return [2 /*return*/, coords];
                case 4:
                    if (!isValidGhanaPostalGPS(latitude_or_address)) return [3 /*break*/, 6];
                    return [4 /*yield*/, GPGPS_TO_LATLNG(latitude_or_address)];
                case 5:
                    coords = _a.sent();
                    return [2 /*return*/, coords];
                case 6: throw new CustomFunctions.Error(CustomFunctions.ErrorCode.invalidValue, String('400: Unable to parse input'));
            }
        });
    });
}
g.PARSE_TO_LATLNG = PARSE_TO_LATLNG;
/**
 * Converts Latitude and Longitude to What3Words.
 * An address can be used instead of Latitude.
 * @customfunction LATLNG_TO_WHAT3WORDS
 * @param {any} latitude_or_address
 * @param {number} [longitude]
 * @return {string} Cell with What3Words address.
 */
function LATLNG_TO_WHAT3WORDS(latitude, longitude) {
    if (longitude === void 0) { longitude = false; }
    return __awaiter(this, void 0, void 0, function () {
        var coords, url, token, apiResponse, responseJSON, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, PARSE_TO_LATLNG(latitude, longitude)];
                case 1:
                    coords = _a.sent();
                    url = "../../api/latlng_to_whatfreewords?lat=" + coords[0][0] + "&lng=" + coords[0][1];
                    token = g.localStorage.getItem('satf_token');
                    return [4 /*yield*/, fetch(url, { headers: { Authorization: token } })];
                case 2:
                    apiResponse = _a.sent();
                    if (apiResponse.status === 401) {
                        throw new CustomFunctions.Error(CustomFunctions.ErrorCode.notAvailable, String('Unauthorised user'));
                    }
                    return [4 /*yield*/, apiResponse.json()];
                case 3:
                    responseJSON = _a.sent();
                    if (apiResponse.ok) {
                        return [2 /*return*/, responseJSON.message];
                    }
                    throw new CustomFunctions.Error(CustomFunctions.ErrorCode.invalidValue, String(responseJSON.message));
                case 4:
                    err_3 = _a.sent();
                    throw new CustomFunctions.Error(CustomFunctions.ErrorCode.invalidValue, String(err_3));
                case 5: return [2 /*return*/];
            }
        });
    });
}
g.LATLNG_TO_WHAT3WORDS = LATLNG_TO_WHAT3WORDS;
/**
 * Converts Latitude and Longitude to PlusCodes.
 * An address can be used instead of Latitude.
 * @customfunction LATLNG_TO_PLUSCODE
 * @param {any} latitude_or_address
 * @param {number} [longitude]
 * @return {string} Cell with PlusCode address.
 */
function LATLNG_TO_PLUSCODE(latitude, longitude) {
    if (longitude === void 0) { longitude = false; }
    return __awaiter(this, void 0, void 0, function () {
        var coords, url, token, apiResponse, responseJSON, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, PARSE_TO_LATLNG(latitude, longitude)];
                case 1:
                    coords = _a.sent();
                    url = "../../api/latlng_to_pluscode?lat=" + coords[0][0] + "&lng=" + coords[0][1];
                    token = g.localStorage.getItem('satf_token');
                    return [4 /*yield*/, fetch(url, { headers: { Authorization: token } })];
                case 2:
                    apiResponse = _a.sent();
                    if (apiResponse.status === 401) {
                        throw new CustomFunctions.Error(CustomFunctions.ErrorCode.notAvailable, String('Unauthorised user'));
                    }
                    return [4 /*yield*/, apiResponse.json()];
                case 3:
                    responseJSON = _a.sent();
                    if (apiResponse.ok) {
                        return [2 /*return*/, responseJSON.message];
                    }
                    throw new CustomFunctions.Error(CustomFunctions.ErrorCode.invalidValue, String(responseJSON.message));
                case 4:
                    err_4 = _a.sent();
                    throw new CustomFunctions.Error(CustomFunctions.ErrorCode.invalidValue, String(err_4));
                case 5: return [2 /*return*/];
            }
        });
    });
}
g.LATLNG_TO_PLUSCODE = LATLNG_TO_PLUSCODE;
/**
 * Converts Latitude and Longitude to Ghana Digital Address (Ghana Postal GPS).
 * An address can be used instead of Latitude.
 * @customfunction LATLNG_TO_GPGPS
 * @param {any} latitude_or_address
 * @param {number} [longitude]
 * @return {string} Cell with Ghana Digital Address.
 */
function LATLNG_TO_GPGPS(latitude, longitude) {
    if (longitude === void 0) { longitude = false; }
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, PARSE_TO_LATLNG(latitude, longitude)];
                case 1:
                    _b.sent();
                    return [2 /*return*/, 'CP-0968-1906'];
                case 2:
                    _a = _b.sent();
                    throw new CustomFunctions.Error(CustomFunctions.ErrorCode.invalidValue, String('Unable to parse input'));
                case 3: return [2 /*return*/];
            }
        });
    });
}
g.LATLNG_TO_GPGPS = LATLNG_TO_GPGPS;
/**
 * Tests if there is access to the API and the user is logged in.
 * An address can be used instead of Latitude.
 * @customfunction LATLNG_TO_GPGPS
 * @return {string} Cell saying 'Hello world!' or 'Unauthorised'.
 */
function HELLO_WORLD() {
    return __awaiter(this, void 0, void 0, function () {
        var url, token, apiResponse, responseJSON, err_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    url = '../../api/hello_world';
                    token = g.localStorage.getItem('satf_token');
                    return [4 /*yield*/, fetch(url, { headers: { Authorization: token } })];
                case 1:
                    apiResponse = _a.sent();
                    if (apiResponse.status === 401) {
                        return [2 /*return*/, 'Unauthorised'];
                    }
                    return [4 /*yield*/, apiResponse.json()];
                case 2:
                    responseJSON = _a.sent();
                    if (apiResponse.ok) {
                        return [2 /*return*/, responseJSON.message];
                    }
                    throw new CustomFunctions.Error(CustomFunctions.ErrorCode.invalidValue, String(responseJSON.message));
                case 3:
                    err_5 = _a.sent();
                    throw new CustomFunctions.Error(CustomFunctions.ErrorCode.invalidValue, String(err_5));
                case 4: return [2 /*return*/];
            }
        });
    });
}
g.HELLO_WORLD = HELLO_WORLD;
// function PopulationDensity(latitude, longitude = false) {
//   const baseurl = `${apiUrl}population_density`;
//   return new Promise(((resolve, reject) => {
//     getLatLngInfo(baseurl, latitude, longitude)
//       .then((value) => {
//         resolve(Number(value));
//       })
//       .catch((err) => {
//         reject(new CustomFunctions.Error(CustomFunctions.ErrorCode.invalidValue, String(err)));
//       });
//   }));
// }
// g.PopulationDensity = PopulationDensity;
// function PopulationDensityBuffer(bufferMeters, latitude, longitude = false) {
//   const url = (buffer, lat, lng) => `${apiUrl}population_density_buffer?lat=${lat}&lng=${lng}&buffer=${buffer}`; // eslint-disable-line
//   try {
//     if (isValidWhatFreeWords(latitude)) {
//       return what3WordsToLatLng(latitude).then((latlng) => {
//         const coords = JSON.parse(latlng);
//         const lat = coords[0];
//         const lng = coords[1];
//         return new Promise((resolve, reject) => {
//           satfApiRequest('get', url(bufferMeters, lat, lng))
//             .then((value) => {
//               resolve(Number(value));
//             })
//             .catch((err) => {
//               reject(new CustomFunctions.Error(CustomFunctions.ErrorCode.invalidValue, String(err)));
//             });
//         });
//       });
//     }
//     if (isValidPluscode(latitude)) {
//       return plusCodeToLatLng(latitude).then((latlng) => {
//         const coords = JSON.parse(latlng);
//         const lat = coords[0];
//         const lng = coords[1];
//         return new Promise((resolve, reject) => {
//           satfApiRequest('get', url(bufferMeters, lat, lng))
//             .then((value) => {
//               resolve(Number(value));
//             })
//             .catch((err) => {
//               reject(new CustomFunctions.Error(CustomFunctions.ErrorCode.invalidValue, String(err)));
//             });
//         });
//       });
//     }
//     const lat = latitude;
//     const lng = longitude;
//     return new Promise((resolve, reject) => {
//       satfApiRequest('get', url(bufferMeters, lat, lng))
//         .then((value) => { resolve(Number(value)); })
//         .catch((err) => {
//           reject(new CustomFunctions.Error(CustomFunctions.ErrorCode.invalidValue, String(err)));
//         });
//     });
//   } catch (err) {
//     const error = new CustomFunctions.Error(CustomFunctions.ErrorCode.invalidValue, String(err));
//     throw error;
//   }
// }
// g.PopulationDensityBuffer = PopulationDensityBuffer;
// function PopulationDensityWalk(minutes, latitude, longitude = false) {
//   const url = (buffer, lat, lng) => `${apiUrl}population_density_walk?lat=${lat}&lng=${lng}&minutes=${buffer}`; // eslint-disable-line
//   try {
//     if (isValidWhatFreeWords(latitude)) {
//       return what3WordsToLatLng(latitude).then((latlng) => {
//         const coords = JSON.parse(latlng);
//         const lat = coords[0];
//         const lng = coords[1];
//         return new Promise((resolve, reject) => {
//           satfApiRequest('get', url(minutes, lat, lng))
//             .then((value) => { resolve(Number(value)); })
//             .catch((err) => {
//               reject(new CustomFunctions.Error(CustomFunctions.ErrorCode.invalidValue, String(err)));
//             });
//         });
//       });
//     }
//     if (isValidPluscode(latitude)) {
//       return plusCodeToLatLng(latitude).then((latlng) => {
//         const coords = JSON.parse(latlng);
//         const lat = coords[0];
//         const lng = coords[1];
//         return new Promise((resolve, reject) => {
//           satfApiRequest('get', url(minutes, lat, lng))
//             .then((value) => { resolve(Number(value)); })
//             .catch((err) => {
//               reject(new CustomFunctions.Error(CustomFunctions.ErrorCode.invalidValue, String(err)));
//             });
//         });
//       });
//     }
//     const lat = latitude;
//     const lng = longitude;
//     return new Promise((resolve, reject) => {
//       satfApiRequest('get', url(minutes, lat, lng))
//         .then((value) => { resolve(Number(value)); })
//         .catch((err) => {
//           reject(new CustomFunctions.Error(CustomFunctions.ErrorCode.invalidValue, String(err)));
//         });
//     });
//   } catch (err) {
//     const error = new CustomFunctions.Error(CustomFunctions.ErrorCode.invalidValue, String(err));
//     throw error;
//   }
// }
// g.PopulationDensityWalk = PopulationDensityWalk;
// function PopulationDensityBike(minutes, latitude, longitude = false) {
//   const url = (buffer, lat, lng) => `${apiUrl}population_density_bike?lat=${lat}&lng=${lng}&minutes=${buffer}`; // eslint-disable-line
//   try {
//     if (isValidWhatFreeWords(latitude)) {
//       return what3WordsToLatLng(latitude).then((latlng) => {
//         const coords = JSON.parse(latlng);
//         const lat = coords[0];
//         const lng = coords[1];
//         return new Promise((resolve, reject) => {
//           satfApiRequest('get', url(minutes, lat, lng))
//             .then((value) => { resolve(Number(value)); })
//             .catch((err) => {
//               reject(new CustomFunctions.Error(CustomFunctions.ErrorCode.invalidValue, String(err)));
//             });
//         });
//       });
//     }
//     if (isValidPluscode(latitude)) {
//       return plusCodeToLatLng(latitude).then((latlng) => {
//         const coords = JSON.parse(latlng);
//         const lat = coords[0];
//         const lng = coords[1];
//         return new Promise((resolve, reject) => {
//           satfApiRequest('get', url(minutes, lat, lng))
//             .then((value) => { resolve(Number(value)); })
//             .catch((err) => {
//               reject(new CustomFunctions.Error(CustomFunctions.ErrorCode.invalidValue, String(err)));
//             });
//         });
//       });
//     }
//     const lat = latitude;
//     const lng = longitude;
//     return new Promise((resolve, reject) => {
//       satfApiRequest('get', url(minutes, lat, lng))
//         .then((value) => { resolve(Number(value)); })
//         .catch((err) => {
//           reject(new CustomFunctions.Error(CustomFunctions.ErrorCode.invalidValue, String(err)));
//         });
//     });
//   } catch (err) {
//     const error = new CustomFunctions.Error(CustomFunctions.ErrorCode.invalidValue, String(err));
//     throw error;
//   }
// }
// g.PopulationDensityBike = PopulationDensityBike;
// function PopulationDensityCar(minutes, latitude, longitude = false) {
//   const url = (buffer, lat, lng) => `${apiUrl}population_density_car?lat=${lat}&lng=${lng}&minutes=${buffer}`; // eslint-disable-line
//   try {
//     if (isValidWhatFreeWords(latitude)) {
//       return what3WordsToLatLng(latitude).then((latlng) => {
//         const coords = JSON.parse(latlng);
//         const lat = coords[0];
//         const lng = coords[1];
//         return new Promise((resolve, reject) => {
//           satfApiRequest('get', url(minutes, lat, lng))
//             .then((value) => { resolve(Number(value)); })
//             .catch((err) => {
//               reject(new CustomFunctions.Error(CustomFunctions.ErrorCode.invalidValue, String(err)));
//             });
//         });
//       });
//     }
//     if (isValidPluscode(latitude)) {
//       return plusCodeToLatLng(latitude).then((latlng) => {
//         const coords = JSON.parse(latlng);
//         const lat = coords[0];
//         const lng = coords[1];
//         return new Promise((resolve, reject) => {
//           satfApiRequest('get', url(minutes, lat, lng))
//             .then((value) => { resolve(Number(value)); })
//             .catch((err) => {
//               reject(new CustomFunctions.Error(CustomFunctions.ErrorCode.invalidValue, String(err)));
//             });
//         });
//       });
//     }
//     const lat = latitude;
//     const lng = longitude;
//     return new Promise((resolve, reject) => {
//       satfApiRequest('get', url(minutes, lat, lng))
//         .then((value) => { resolve(Number(value)); })
//         .catch((err) => {
//           reject(new CustomFunctions.Error(CustomFunctions.ErrorCode.invalidValue, String(err)));
//         });
//     });
//   } catch (err) {
//     const error = new CustomFunctions.Error(CustomFunctions.ErrorCode.invalidValue, String(err));
//     throw error;
//   }
// }
// g.PopulationDensityCar = PopulationDensityCar;
// function AdminLevel1(latitude, longitude = false) {
//   const baseurl = `${apiUrl}admin_level_1`;
//   return new Promise(((resolve, reject) => {
//     getLatLngInfo(baseurl, latitude, longitude)
//       .then((value) => {
//         resolve(value);
//       })
//       .catch((err) => {
//         reject(new CustomFunctions.Error(CustomFunctions.ErrorCode.invalidValue, String(err)));
//       });
//   }));
// }
// g.AdminLevel1 = AdminLevel1;
// function AdminLevel2(latitude, longitude = false) {
//   const baseurl = `${apiUrl}admin_level_2`;
//   return new Promise(((resolve, reject) => {
//     getLatLngInfo(baseurl, latitude, longitude)
//       .then((value) => {
//         resolve(value);
//       })
//       .catch((err) => {
//         reject(new CustomFunctions.Error(CustomFunctions.ErrorCode.invalidValue, String(err)));
//       });
//   }));
// }
// g.AdminLevel2 = AdminLevel2;
// function AdminLevel2FuzzyLev(name) {
//   return new Promise(((resolve, reject) => {
//     satfApiRequest('get', `${apiUrl}admin_level_2_fuzzy_lev?name=${name}`)
//       .then((value) => {
//         resolve(value);
//       })
//       .catch((err) => {
//         reject(new CustomFunctions.Error(CustomFunctions.ErrorCode.invalidValue, String(err)));
//       });
//   }));
// }
// g.AdminLevel2FuzzyLev = AdminLevel2FuzzyLev;
// function AdminLevel2FuzzyTri(name) {
//   return new Promise(((resolve, reject) => {
//     satfApiRequest('get', `${apiUrl}admin_level_2_fuzzy_tri?name=${name}`)
//       .then((value) => {
//         resolve(value);
//       })
//       .catch((err) => {
//         reject(new CustomFunctions.Error(CustomFunctions.ErrorCode.invalidValue, String(err)));
//       });
//   }));
// }
// g.AdminLevel2FuzzyTri = AdminLevel2FuzzyTri;
// function UrbanStatus(latitude, longitude = false) {
//   const baseurl = `${apiUrl}urban_status`;
//   return new Promise(((resolve, reject) => {
//     getLatLngInfo(baseurl, latitude, longitude)
//       .then((value) => {
//         resolve(value);
//       })
//       .catch((err) => {
//         reject(new CustomFunctions.Error(CustomFunctions.ErrorCode.invalidValue, String(err)));
//       });
//   }));
// }
// g.UrbanStatus = UrbanStatus;
// function UrbanStatusSimple(latitude, longitude = false) {
//   const baseurl = `${apiUrl}urban_status_simple`;
//   return new Promise(((resolve, reject) => {
//     getLatLngInfo(baseurl, latitude, longitude)
//       .then((value) => {
//         resolve(value);
//       })
//       .catch((err) => {
//         reject(new CustomFunctions.Error(CustomFunctions.ErrorCode.invalidValue, String(err)));
//       });
//   }));
// }
// g.UrbanStatusSimple = UrbanStatusSimple;
// function NearestPlace(latitude, longitude = false) {
//   const baseurl = `${apiUrl}nearest_placename`;
//   return new Promise(((resolve, reject) => {
//     getLatLngInfo(baseurl, latitude, longitude)
//       .then((value) => {
//         resolve(value);
//       })
//       .catch((err) => {
//         reject(new CustomFunctions.Error(CustomFunctions.ErrorCode.invalidValue, String(err)));
//       });
//   }));
// }
// g.NearestPlace = NearestPlace;
// function NearestPoi(latitude, longitude = false) {
//   const baseurl = `${apiUrl}nearest_poi`;
//   return new Promise(((resolve, reject) => {
//     getLatLngInfo(baseurl, latitude, longitude)
//       .then((value) => {
//         resolve(value);
//       })
//       .catch((err) => {
//         reject(new CustomFunctions.Error(CustomFunctions.ErrorCode.invalidValue, String(err)));
//       });
//   }));
// }
// g.NearestPoi = NearestPoi;
// function NearestBank(latitude, longitude = false) {
//   const baseurl = `${apiUrl}nearest_bank`;
//   return new Promise(((resolve, reject) => {
//     getLatLngInfo(baseurl, latitude, longitude)
//       .then((value) => {
//         resolve(value);
//       })
//       .catch((err) => {
//         reject(new CustomFunctions.Error(CustomFunctions.ErrorCode.invalidValue, String(err)));
//       });
//   }));
// }
// g.NearestBank = NearestBank;
// /**
//   * Gets the star count for a given Github repository.
//   * @customfunction
//   * @param {string} userName string name of Github user or organization.
//   * @param {string} repoName string name of the Github repository.
//   * @return {number} number of stars given to a Github repository.
//   */
// function NearestBankDist(latitude, longitude = false) {
//   const baseurl = `${apiUrl}nearest_bank_distance`;
//   return new Promise(((resolve, reject) => {
//     getLatLngInfo(baseurl, latitude, longitude)
//       .then((value) => {
//         resolve(value);
//       })
//       .catch((err) => {
//         reject(new CustomFunctions.Error(CustomFunctions.ErrorCode.invalidValue, String(err)));
//       });
//   }));
// }
// g.NearestBankDist = NearestBankDist;
console.log('Loaded: functions.js');
//# sourceMappingURL=functions.js.map