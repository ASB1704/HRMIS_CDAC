import User from "../models/user.js";

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log({ email, password });

    const user = await User.findOne({ email });
    console.log({ user });

    if (user) {
      if (password === user.password) {
        res.send({ status: 200, message: "Login Successfull", user: user });
      } else {
        res.send({ message: "Password didn't match" });
      }
    } else {
      res.send({ message: "User not registered" });
    }
  } catch (err) {
    console.log(err);
  }
};

export const updateRequest = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email });
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
    const user = await User.find({ request: true });
    res.json(user);
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const submitSelfAppraisel = async (req, res) => {
  const { email } = req.body;
  const newData = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      Object.keys(newData).forEach((key) => {
        if (user[key] !== undefined) {
          user[key] = newData[key];
        }
      });
      user.filledByEmployee = !user.filledByEmployee;
      const updatedData = await user.save();
      res.json(updatedData);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
};

export const submitAparForm = async (req, res) => {
  const { empId } = req.body;
  console.log(empId);

  // console.log(empId);
  try {
    const user_ = await User.findOneAndUpdate(
      { empId: empId },
      // req.body, // New data to updates
      { $set: { APAR_status: true, ...req.body } },
      { new: true }
    );
    // console.log({ user_ });
    if (user_) {

      // Object.keys(newData).forEach(key => {
      //     if (user[key] !== undefined) {
      //         user[key] = newData[key];
      //     }
      // });
      // const updted_user = {...user,...newData};
      // const updatedData = await user.save();
      // console.log({updatedData});
      // res.json(updatedData);
      res.send({ msg: "successfully registered" })

    }
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
};

export const checkAPAR = async (req, res) => {
  console.log(req.body, "Hello");
  res.send("send")
  // try {
  //     const user_ = await User.find(
  //     { empId: empId },
  //  );
  //   console.log({ user_ });
  //   if (user_) {
  //     res.send({ msg: "successfully registered" });
  //   } else {
  //     res.status(404).send({ msg: "User not found" });
  //   }
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).send("An error occurred");
  // }
};

