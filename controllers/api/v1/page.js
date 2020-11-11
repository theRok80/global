/**
 * @author theRok
 * @since 2020.11.03
 */

const path = require('path');
const response = require(path.join(__dirname, '../../../tools/response'));
const output = require('../../../managers/output');
const view = require('../../../managers/view');

exports.main = (req, res) => {

  view.setLayout('test')
    .then(() => {

      view.add('header', {
        type: 'banner',
        file: 'test',
        data: {
          title: 'test'
        }
      });

      view.add('header', [
        {
          type: 'banner',
          file: 'test',
          data: {
            title: 'test'
          }
        }, {
          type: 'banner',
          file: 'test',
          data: {
            title: 'test'
          }
        }
      ]);

      console.log(view.get('header'));
      console.log(view.get());


      response.success(req, res, view.print());


    })
    .catch((err) => {
      throw err;
    });
};
