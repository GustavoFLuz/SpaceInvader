import express from "express";
import score from "./scoreRoutes.js"
import path from "path"

const routes = (app) => {
  app.route('/').get((req, res) => {
    res.status(200).sendFile(path.join(path.resolve()+'/public/index.html'))
  })

  app.use(
    express.static("public"),
    express.json(),
    score
  )
}

export default routes