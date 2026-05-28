const Profile =
require("../models/Profile");


// SAVE PROFILE

exports.saveProfile =
async (req, res) => {

  try {

    const {

      age,
      gender,
      bloodGroup,
      allergies,
      emergencyContact

    } = req.body;


    let profile =
      await Profile.findOne({

        userId: req.user
      });


    if (profile) {

      profile =
        await Profile.findOneAndUpdate(

          {
            userId: req.user
          },

          {

            age,
            gender,
            bloodGroup,
            allergies,
            emergencyContact
          },

          {
            new: true
          }
        );

    } else {

      profile =
        await Profile.create({

          userId: req.user,

          age,
          gender,
          bloodGroup,
          allergies,
          emergencyContact
        });
    }

    res.status(200).json({

      message:
        "Profile Saved",

      profile
    });

  } catch (error) {

    res.status(500).json({

      message: error.message
    });
  }
};


// GET PROFILE

exports.getProfile =
async (req, res) => {

  try {

    const profile =
      await Profile.findOne({

        userId: req.user
      });

    res.status(200).json(
      profile
    );

  } catch (error) {

    res.status(500).json({

      message: error.message
    });
  }
};