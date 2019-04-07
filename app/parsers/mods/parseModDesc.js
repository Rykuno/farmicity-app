const fs = require('fs');
const path = require('path');
const parseString = require('xml2js').parseString;

// Errors
const ERROR = {
  NO_MODDESC_XML: new Error('No modDesc.xml file found.'),
  ERROR_MODDESC_PARSE: new Error('Error parsing modDesc.xml')
};

/**
 * Exported function for parsing mod
 * @param mod - contents of mod object
 */
const parseModDesc = async mod => {
  return new Promise((resolve, reject) => {
    try {
      const modDescData = readModDescContent(mod);
      resolve(modDescData);
    } catch (e) {
      reject(ERROR.ERROR_MODDESC_PARSE);
    }
  });
};

/**
 * Reads content of modDesc.xml and passes handling off to zip/non-zip functions
 * @param mod - contents of mod object
 */
const readModDescContent = mod => {
  return new Promise((resolve, reject) => {
    const { modDirPath } = mod;
    const MOD_DESC_XML = 'modDesc.xml';
    const MOD_DESC_XML_PATH = path.join(modDirPath, MOD_DESC_XML);

    // If the file is a zip just reject for now
    if (isZip(mod)) {
      return reject('Is Zip');
    }

    try {
      fs.readFile(MOD_DESC_XML_PATH, 'utf8', async (err, xmlData) => {
        // If there is no xml data(modDesc.xml) just reject
        // TODO: Fix this later to include placeables and what not
        if (!xmlData) {
          return reject(ERROR.NO_MODDESC_XML);
        }

        const jsonData = await xmlToJSON(xmlData);
        const modMetaData = classifyModType(jsonData);
        return resolve({ ...mod, ...jsonData, ...modMetaData });
      });
    } catch (e) {
      reject(e);
    }
  });
};

/**
 * Checks if the folder is zipped
 * @param {modDirName} mod - contents of mod object
 */
isZip = ({ modDirName }) => path.extname(modDirName) === '.zip';

/**
 * Converts the xml data to JSON
 * @param data - stringified xml data
 */
const xmlToJSON = async data =>
  new Promise((resolve, reject) => {
    parseString(data, { explicitArray: false, trim: true }, (err, json) =>
      err ? reject(err) : resolve(json)
    );
  });

/**
 * Some mods such as maps require special treatment. This will be the
 * deterministic location for classifying such.
 * @param data - modDesc json data
 */
const classifyModType = data => {
  const { modDesc } = data;
  const metaData = {};

  // Checks properties of a map
  if (Object.prototype.hasOwnProperty.call(modDesc, 'maps')) {
    metaData.isMap = true;
  }

  return metaData;
};

module.exports = parseModDesc;
