/**
 * 통계처리를 위한 middleware
 *
 * @returns {function(*, *, *): void}
 *
 * @author theRok
 * @since 2020.11.03
 */

function statistics() {
  return function statistics(req, res, next) {
    console.log('statistics');
    next();
  };
}

module.exports = statistics;
