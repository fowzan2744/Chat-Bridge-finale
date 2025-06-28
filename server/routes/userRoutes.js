const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const Chat = require("../models/chat");



router.get("/:emailId", async (req, res) => {
    const { emailId } = req.params;
    const users = await User.findOne({ emailId }).populate({ path: "friends.friend", select: "name emailId" });
    res.json(users?.friends);
})

router.get("/info/:emailId", async (req, res) => {
    const { emailId } = req.params;

    const user = await User.findOne({ emailId });

    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    res.json({
        userId: user._id,
        name: user.name,
        email: user.emailId,
        tier: user.tier || 'free',
        mainLang: user.mainLang || 'en',
        paymentId: user.paymentId || null
    });
});


router.post("/signup", async (req, res) => {
  const { name, email } = req.body;

  try {
    const existingUser = await User.findOne({ emailId: email });

    if (existingUser) {
      return res.json({
        status: "success",
        message: "Login successful",
        userDetails: {
          userId: existingUser._id,
          mainLang: existingUser.mainLang || "en",
          paymentId: existingUser.paymentId || false
        }
      });
    }

    const newUser = new User({ name, emailId: email });
    await newUser.save();

    return res.json({
      status: "success",
      message: "User created successfully!",
      userDetails: {
        userId: newUser._id,
        mainLang: "en",
        paymentId: false
      }
    });
  } catch (error) {
    console.error("❌ Signup error:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
});

router.post("/language", async (req, res) => {
    const { emailId, languageCode } = req.body;
    console.log(req.body);

    await User.findOneAndUpdate({ emailId }, { mainLang: languageCode });

    res.json({ success: true, message: "Updated" });
})

router.post("/request", async (req, res) => {
    try {
        const { emailId, userId } = req.body;
        const offerUser = await User.findOne({ emailId });

        if (!offerUser) {
            return res.status(404).json({
                status: "error",
                message: "User not found"
            });
        }

        const isRequested = offerUser.requests.some(request =>
            request.toString() === userId
        );

        if (isRequested) {
            return res.json({
                status: "info",
                message: "Already requested or friends"
            });
        }

        const chat = new Chat();
        await chat.save();

        await Promise.all([

            User.findByIdAndUpdate(
                offerUser._id,
                {
                    $push: {
                        requests: userId,
                        friends: {
                            friend: userId,
                            chatId: chat._id
                        }
                    }
                }
            ),

            User.findByIdAndUpdate(
                userId,
                {
                    $push: {
                        requests: offerUser._id,
                        friends: {
                            friend: offerUser._id,
                            chatId: chat._id
                        }
                    }
                }
            )
        ]);

        res.json({
            status: "success",
            message: "Friend added successfully!",
            user: { chatId: chat._id, friend: { emailId: emailId, name: offerUser.name, _id: offerUser._id } }
        });
    } catch (error) {
        console.error('Friend request error:', error);
        res.status(500).json({
            status: "error",
            message: "Failed to process friend request"
        });
    }
});

module.exports = router;

