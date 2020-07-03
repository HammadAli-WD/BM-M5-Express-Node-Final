const express = require("express")
const {check, body, validationResult} = require ("express-validator")
const fs = require("fs-extra")
const multer = require("multer")
const { join } = require("path")
const { readDB, writeDB,  getAllByQuery } = require("../../lib")
const uniqid = require ("uniqid")

const mediaJsonPath = join(__dirname, "media.json")
const reviewsJsonPath = join(__dirname, "reviews.json")

const imageFolder = join(__dirname, "../../../public/img/")
const upload = multer({})
const router = express.Router()

const validateComments = () => {
    return [

        check("comment")
            .exists()
            .withMessage("comment is required")
            .not()
            .isEmpty()
            .withMessage("Can't be Empty"),
        check("rate")
            .exists()
            .withMessage("rate is required")
            .not()
            .isEmpty()
            .withMessage("Can't be Empty")
            .isInt({ min:1, max:5}),
        check("imdbID")
            .exists()
            .withMessage("imdbID is required")
            .not()
            .isEmpty()
            .withMessage("Can't be Empty")           

    ];
}  

  router.post("/:imdbID/reviews", validateComments(), async(req, res, next) => {
    console.log("ENTERING")
    try {
        const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
        
            const books = await readDB(mediaJsonPath)
            const book = books.find((b) => b.imdbID === req.params.imdbID)
            if (book) { 
              const comments = await readDB(reviewsJsonPath)
              comments.push({...req.body, createdAt: new Date(), _id: req.params.imdbID})
              await writeDB(reviewsJsonPath, comments)
              res.send("OK")
            }
            else {
              const error = new Error(`Book with imdbID ${req.params.imdbID} not found`)
              error.httpStatusCode = 404
              next(error)
            }
    } catch (error) {
        next(error)
    }    
  })

  router.get("/:imdbID/reviews", async (req, res, next)=>{
    const comments = await readDB(reviewsJsonPath)
    res.send(comments.filter(comment => comment._id === req.params.imdbID))
  })
  

router.get("/", async (req, res, next) => {
  try {
    const data = await readDB(mediaJsonPath)

    res.send({ numberOfItems: data.length, data })
  } catch (error) {
    console.log(error)
    const err = new Error("While reading medias list a problem occurred!")
    next(err)
  }
})

router.get("/:imdbID", async (req, res, next) => {
  try {
    const medias = await readDB(mediaJsonPath)
    const media = medias.find((b) => b.imdbID === req.params.imdbID)
    if (media) {
      res.send(media)
    } else {
      const error = new Error()
      error.httpStatusCode = 404
      next(error)
    }
  } catch (error) {
    console.log(error)
    next("While reading medias list a problem occurred!")
  }
})

router.post(
  "/",
  [
    //check("imdbID").exists().withMessage("You should specify the imdbID"),
    check("title").exists().withMessage("Title is required"),
    check("year").exists().withMessage("Year is required"),
    check("type").exists().withMessage("Type is required"),
    check("poster").exists().withMessage("poster is required"),
    
  ],
  async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const error = new Error()
      error.httpStatusCode = 400
      error.message = errors
      next(error)
    }
    try {
      
     // const imdbIDCheck = medias.find((x) => x.imdbID === req.body.imdbID) //get a previous element with the same imdbID
      const newMedia = {
          ...req.body,
          imdbID: uniqid()
      }
      console.log(newMedia)
      const medias = await readDB(mediaJsonPath)
      medias.push(newMedia)
      await writeDB(mediaJsonPath, medias)
      res.status(201).send("newMedia")
    } catch (error) {
      next(error)
    }
  }
)




router.put("/:imdbID", async (req, res, next) => {
  try {
    const medias = await readDB(mediaJsonPath)
    const media = medias.find((b) => b.imdbID === req.params.imdbID)
    if (media) {
      const position = medias.indexOf(media)
      const mediaUpdated = { ...media, ...req.body } // In this way we can also implement the "patch" endpoint
      medias[position] = mediaUpdated
      await writeDB(mediaJsonPath, medias)
      res.status(200).send("Updated")
    } else {
      const error = new Error(`media with imdbID ${req.params.imdbID} not found`)
      error.httpStatusCode = 404
      next(error)
    }
  } catch (error) {
    next(error)
  }
})

router.delete("/:imdbID", async (req, res, next) => {
  try {
    const medias = await readDB(mediaJsonPath)
    const media = medias.find((b) => b.imdbID === req.params.imdbID)
    if (media) {
      await writeDB(
        mediaJsonPath,
        medias.filter((x) => x.imdbID !== req.params.imdbID)
      )
      res.send("Deleted")
    } else {
      const error = new Error(`media with imdbID ${req.params.imdbID} not found`)
      error.httpStatusCode = 404
      next(error)
    }
  } catch (error) {
    next(error)
  }
})

router.post("/:imdbID/upload", upload.single("avatar"), async (req, res, next) => {
  try {
    const fileName = req.params.imdbID + path.extname(req.file.originalname)
    const fileDestination = join(imageFolder, fileName)
    
    await fs.writeFile(
      fileDestination,
      req.file.buffer
    )

    const medias = await readDB(mediaJsonPath)
    const media = medias.find((b) => b.imdbID === req.params.imdbID)
    if (media) {
      const position = medias.indexOf(media)
      const mediaUpdated = { ...media, img: "http://localhost:3001/img/medias/"  + fileName} // In this way we can also implement the "patch" endpoint
      medias[position] = mediaUpdated
      await writeDB(mediaJsonPath, medias)
      res.status(200).send("Updated")
    } else {
      const error = new Error(`media with imdbID ${req.params.imdbID} not found`)
      error.httpStatusCode = 404
      next(error)
    }

  } catch (error) {
    next(error)
  }
  res.send("OK")
})

module.exports = router
