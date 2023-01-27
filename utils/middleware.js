const { AuthorizationError } = require('./errorHandler');

exports.enrollmentUpdateCheck = (req, res, next) => {
  if (req.user.role !== 'professor') {
    if (req.user.id !== req.params.student_id) {
      throw new AuthorizationError('You cannot update an enrollment which is not yours');
    }
  }
  next();
};
