//
// Helper functions
//
// Convert Payload from Base64-URL to JSON
export const decodePayload = (payload) => {
  if (!payload) return null;

  const cleanedPayload = payload.replace(/-/g, '+').replace(/_/g, '/');
  const decodedPayload = atob(cleanedPayload);
  const uriEncodedPayload = Array.from(decodedPayload).reduce((acc, char) => {
    const uriEncodedChar = ('00' + char.charCodeAt(0).toString(16)).slice(-2);
    return `${acc}%${uriEncodedChar}`;
  }, '');
  const jsonPayload = decodeURIComponent(uriEncodedPayload);

  return JSON.parse(jsonPayload);
};

// Parse JWT Payload
export const parseJWTPayload = (token) => {
  if (!token) return null;

  const [header, payload, signature] = token.split('.');
  const jsonPayload = decodePayload(payload);

  return jsonPayload;
};

// Parse JWT Header
export const parseJWTHeader = (token) => {
  if (!token) return null;

  const [header, payload, signature] = token.split('.');
  const jsonHeader = decodePayload(header);

  return jsonHeader;
};

// Generate a Random String
export const getRandomString = () => {
  const randomItems = new Uint32Array(28);
  crypto.getRandomValues(randomItems);
  const binaryStringItems = randomItems.map((dec) => `0${dec.toString(16).substr(-2)}`);
  return binaryStringItems.reduce((acc, item) => `${acc}${item}`, '');
};

// Encrypt a String with SHA256
export const encryptStringWithSHA256 = async (str) => {
  const PROTOCOL = 'SHA-256';
  const textEncoder = new TextEncoder();
  const encodedData = textEncoder.encode(str);
  return crypto.subtle.digest(PROTOCOL, encodedData);
};

// Convert Hash to Base64-URL
export const hashToBase64url = (arrayBuffer) => {
  const items = new Uint8Array(arrayBuffer);
  const stringifiedArrayHash = items.reduce((acc, i) => `${acc}${String.fromCharCode(i)}`, '');
  const decodedHash = btoa(stringifiedArrayHash);

  const base64URL = decodedHash.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  return base64URL;
};
