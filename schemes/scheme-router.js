const express = require("express");

//CONNECTS to our helper functions
const Schemes = require("./scheme-model.js");

const router = express.Router();

// router.get('/', (req, res) => {
//   Schemes.find()
//   .then(schemes => {
//     res.json(schemes);
//   })
//   .catch(err => {
//     res.status(500).json({ message: 'Failed to get schemes' });
//   });
// });

router.get("/", async (req, res, next) => {
  try {
    res.json(await Schemes.find());
  } catch (error) {
    next(error);
  }
});

// router.get("/:id", (req, res) => {
//   const { id } = req.params;

//   Schemes.findById(id)
//     .then(scheme => {
//       if (scheme) {
//         res.json(scheme);
//       } else {
//         res
//           .status(404)
//           .json({ message: "Could not find scheme with given id." });
//       }
//     })
//     .catch(err => {
//       res.status(500).json({ message: "Failed to get schemes" });
//     });
// });

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const scheme = await Schemes.findById(id);
    if (scheme) {
      res.json(scheme);
    } else {
      res.status(404).json({ message: "Could not find scheme with given id." });
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:id/steps", async (req, res, next) => {
  try {
    const { id } = req.params;
    const steps = await Schemes.findSteps(id);
    if (steps.length) {
      res.json(steps);
    } else {
      res
        .status(404)
        .json({ message: "Could not find steps for given scheme" });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const schemeData = req.body;
    const scheme = await Schemes.add(schemeData);
    res.status(201).json(scheme);
  } catch (error) {
    next(error);
  }
});

//CHECK THIS ONE WORKS when do stretch for it

router.post("/:id/steps", async (req, res, next) => {
  try {
    const stepData = req.body;
    console.log(stepData)
    const { id } = req.params;
    // console.log(id)
    const scheme = await Schemes.findById(id);
    if (scheme) {
      // console.log(scheme)
      const step = await Schemes.addStep(stepData, id);
      res.status(201).json(step);
    } else {
      res.status(404).json({ message: "Could not find scheme with given id." });
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const changes = req.body;
    const scheme = await Schemes.findById(id);
    if (scheme) {
      const updatedScheme = await Schemes.update(changes, id);

      res.json(updatedScheme);
    } else {
      res.status(404).json({ message: "Could not find scheme with given id" });
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Schemes.remove(id);
    if (deleted) {
      res.json({ removed: deleted });
    } else {
      res.status(404).json({ message: "Could not find scheme with given id" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
