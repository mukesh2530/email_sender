const User = require('./../model/userModel');
const sendEmail = require('./../utils/email');
exports.forgotPassword = async (req, res, next) => {
  try {
    // 1)get user based on the posted email

    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error("user does't exists");
    //2) create random reset token
    const resetToken = user.createPasswordResetToken();
    //3) send email
    const resetURL = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/users/${resetToken}`;

    const message = `please click on the link to reset the passoerd. ${resetURL}`;
    // console.log(req.body.email);
    await sendEmail({
      email: req.body.email,
      subject: 'Token Will  be expire in 10 minutes',
      message,
    });
    res.status(200).json({
      status: 'success',
      message: 'mail successfully sent to your email',
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};
