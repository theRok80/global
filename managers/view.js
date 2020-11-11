const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const templatePath = '../templates';
const ext = '.json';

let viewBody;

const setLayout = async (name) => {
  let layoutPath;
  if (name) {
    try {
      layoutPath = path.join(__dirname, `${templatePath}/layout/${name}${ext}`);
      viewBody = JSON.parse(await fs.readFileSync(layoutPath));

    } catch (err) {
      throw err;
    }
  }
};

const header = () => {
  console.log('header called');
};

const add = (position, data) => {
  if (typeof viewBody[position] != 'undefined') {
    if (typeof viewBody[position] != 'object') {
      viewBody[position] = [];
    }

    if (_.isArray(data)) {
      viewBody[position] = _.concat(viewBody[position], data);
    } else {
      viewBody[position].push(data);
    }
  }
};

const get = (position) => {
  if (position && typeof viewBody[position] != 'undefined') {
    return viewBody[position];
  } else if (!position) {
    return viewBody;
  }
};

const print = () => {
  return viewBody;
};

module.exports = {
  setLayout: setLayout,
  header   : header,
  add      : add,
  get      : get,
  print    : print
};
