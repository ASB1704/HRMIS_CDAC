import User from "../models/user.js";
import nodemailer from "nodemailer"
import htmlTemplate from '.././EmailTemplate.js';

export const Login = async (req, res) => {
  try {
    console.log("hello im here");
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const allusers = await User.find({});

    if (user) {
      if (password === user.password) {
        res.send({ status: 200, message: "Login Successful", user, allusers });
      } else {
        res.send({ message: "Password didn't match" });
      }
    } else {
      res.send({ message: "User not registered" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("An error occurred");
  }
};

export const updateRequest = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user) {
      user.request = !user.request;
      await user.save();
      res.json(user);
    } else {
      res.status(404).send("Employee not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
};

export const getRequests = async (req, res) => {
  try {
    const users = await User.find({ request: true });
    res.json(users);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const submitSelfAppraisel = async (req, res) => {
  const { empId } = req.body;
  try {
    const user = await User.findOneAndUpdate({ empId }, req.body, {
      new: true,
    });

    if (user) {
      res.send({ msg: "successfully registered", user });
    } else {
      res.status(404).send({ msg: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
};

export const submitAparForm = async (req, res) => {
  const { empId } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { empId },
      { $set: { APAR_status: true, ...req.body } },
      { new: true }
    );

    if (user) {
      res.send({ msg: "successfully registered" });
    } else {
      res.status(404).send({ msg: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
};

export const submitEvalutaionForm = async (req, res) => {
  const { empId } = req.body;
  console.log("data receivesd");
  try {
    const user = await User.findOneAndUpdate(
      { empId: empId },
      req.body,
      {
        new: true,
      }
    );

    if (user) {
      res.send({ msg: "successfully registered", user });
    } else {
      res.status(404).send({ msg: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
};
export const sendMail = ((req, res) => {
  const { email, userName, appraiselPeriodTo, appraiselPeriodFrom, dateofSubmission, empId, dateOfBirth, designation, presentPay, dateOfEntryInCdac, absenceOtherThanLeave, leaveAvailed } = req.body;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'akashchauhan72520@gmail.com',
      pass: 'mmdaudzbxrotscir',
    },
  });

  const formattedTemplate = htmlTemplate
    .replace('{userName}', userName)
    .replace('{userName1}', userName)
    .replace('{appraiselPeriodTo}', appraiselPeriodTo)
    .replace('{appraiselPeriodFrom}', appraiselPeriodFrom)
    .replace('{dateofSubmission}', dateofSubmission)
    .replace('{empId}', empId)
    .replace('{dateOfBirth}', dateOfBirth)
    .replace('{designation}', designation)
    .replace('{presentPay}', presentPay)
    .replace('{dateOfEntryInCdac}', dateOfEntryInCdac)
    .replace('{absenceOtherThanLeave}', absenceOtherThanLeave)
    .replace('{leaveAvailed}', leaveAvailed);

  // Define the email details
  const mailOptions = {
    from: '"PRDS Team CDAC"<akashchauhan72520@gmail.com>',
    to: email,
    subject: 'Reminder!',
    html: formattedTemplate,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent successfully:', info.response);
      res.send('Email sent successfully');
    }
  });
});
