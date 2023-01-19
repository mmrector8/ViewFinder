const { check } = require("express-validator");

const handleValidationErrors = require("./handleValidationErrors");

const validatePhotoInput = [
  check("url").exists({ checkFalsy: true }).withMessage("Url is missing"),
  // check("spotId") //will be setting the spotId within router
  //   .exists({ checkFalsy: true })
  //   .withMessage("Missing an associated spot for the photo"),
  // check("userId")
  //   .exists({ checkFalsy: true })
  //   .withMessage("Missing an associated photographer for the photo"),
  check("latitude")
    .isFloat({ min: 32.55308, max: 42.0126 })
    .withMessage("Selected Latitude is not within the range of California"),
  check("longitude")
    .isFloat({ min: -124.205482, max: -114.137746 })
    .withMessage("Selected Longitude is not within the range of California"),
  check("genre")
    .isIn(["wildlife", "street", "landscape", "portrait", "astro", "aerial"])
    .withMessage(
      "Selected genere is not within approved genre list: wildlife, street, landscape, portrait, astro, aerial "
    ),
  check("description").exists({ checkFalsy: false }),
  check("condition")
    // .isIn(['rocky', 'slippery', 'slope', 'snowy', 'windy', 'rainy', 'wildlife', 'heat', 'shade'])
    .exists({ checkFalsy: true })
    .withMessage(
      "Selected condition is not within approved condition list: rocky, slippery, slope, snow, windy, rainy, wildlife, heat, shade "
    ),
  check("transportation")
    // .isIn(['walk', 'hike', 'car', 'backpacking', 'bike', 'airplane', 'public'])
    .exists({ checkFalsy: true })
    .withMessage(
      "Selected transportation is not within approved transportation list: walk, hike, car, backpacking, bike, airplane, public "
    ),
  check("bestTimeOfDay")
    .isIn([
      "first light",
      "sunrise",
      "afternoon",
      "sunset",
      "golden hour",
      "night"
    ])
    .exists({ checkFalsy: true })
    .withMessage("Must include a best time of day"),
  check("payment")
    .isIn(["0", "$", "$$", "$$$"])
    .withMessage(
      "Selected price range is not within approved payment amount list: 0, $, $$, $$$"
    ),
  // check("likes")
  //   .exists({ checkFalsy: false })
  //   .withMessage("no likes are needed"),

  handleValidationErrors,
];

module.exports = validatePhotoInput;