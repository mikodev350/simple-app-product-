const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const Admin = require('./../Schema/authSchema');
const Question = require('../Schema/questionSchemat')
const catchAsync = require('./../apiUtile/catchAsync');
const AppError = require('./../apiUtile/appError');
// const sendEmail = require('./../utils/email');
const bcrypt = require('bcryptjs');


const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await Admin.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
   });

  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }
  // 2) Check if user exists && password is correct
  const user = await Admin.findOne({ email }).select('+password');
  const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

  // 3) If everything ok, send token to client
  createSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await Admin.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    );
  }

  // // 4) Check if user changed password after the token was issued
  // if (currentUser.changedPasswordAfter(decoded.iat)) {
  //   return next(
  //     new AppError('User recently changed password! Please log in again.', 401)
  //   );
  // }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ['admin', 'lead-guide']. role='user'
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }

    next();
  };
};

/******************************************************************** */
// Change password 
exports.ChangePasswrod= catchAsync(async (req, res, next) => {
  const {email,actualPassword,newPassword}=req.body ;
  const admin = await Admin.findOne({email:email});
  const isMatch = await bcrypt.compare(actualPassword, admin.password);
  if (!isMatch) {
    return res
      .status(400)
      .json({ errors: [{ msg: 'Invalid Credentials' }] });
  }
  admin.password=newPassword;
  admin.save();
  res.status(200).json(admin);
})


/******************************************************************** */
// Change password after Forgot 
exports.ChangePasswrodAfterForgot= catchAsync(async (req, res, next) => {
  const {email,newPassword}=req.body ;
  const admin = await Admin.findOne({email:email});
  const isMatch = await bcrypt.compare(newPassword, admin.password);
  if (isMatch) {
    return res
      .status(400)
      .json({role:'error',message:'heda houwa mots de passe ta3ke !!!'});
  }else{
  admin.password=newPassword;
  admin.save();
  res.status(200).json({role:'success',message:'Votre mot de passe a été changer'});
  }
})

/****************************************************************************88 */

exports.QuestionPassword =catchAsync(async (req, res, next) => {
const {email,questionForgot,reponseForgot}=req.body
const admin= await Admin.findOne({email:email});

const Answer = await Question.findOne({idAdmin:admin._id});
// const Data = await Question.findOne({email:email});
let Data;
if(Answer){
  Answer.question=questionForgot
  Answer.reponse=reponseForgot
  Data=Answer;
  await Answer.save()
}else{
  const DataElement =new Question({
    idAdmin:admin._id,
    question:questionForgot,
    reponse:reponseForgot
  })
  Data=DataElement;
  await DataElement.save()
}


res.status(200).json(Data);
})


exports.getQuestion =catchAsync(async (req, res, next) => {
  //req.params.id
  if(req.params.id){
    const data= await Question.findOne({idAdmin:req.params.id});
    res.status(200).json(data);
}
})

/******************************************************************************** */
//Confirmation de email
exports.ConfirmEmail=catchAsync( async(req, res, next) => {
  const {email}=req.body
  const admin = await Admin.findOne({email:email});
if(!admin){
  res.status(404).send({role:`erreur`, message : `Email Invalid`})
}else{
  const Answer = await Question.findOne({idAdmin:admin._id});
   res.status(200).json({role:`succes`,reponse:Answer});
}

})