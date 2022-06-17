import score from "../models/Score.js"

class ScoreController {

    static getScore = (req, res) => {
        score.find((err, score) => {
            res.status(200).json(score)
        })

    }
    static getScoreByName = (req, res) => {
        score.findOne({ name: req.params.name },
            (err, score) => {
                if (err)
                    res.status(500).send(err)
                else
                    res.status(200).json(score)
            })
    }
    static postScore = (req, res) => {
        let novoScore = new score(req.body);
        novoScore.save((err) => {
            if (err) {
                res.status(500).send({ message: `${err.message} - falha ao cadastrar pontuação.` })
            } else {
                res.status(201).send(novoScore.toJSON())
            }
        })
    }

    static updateScore = (req, res) => {
        const id = req.params.id.split(':')[1];
        score.findByIdAndUpdate(id, { $set: req.body }, (err) => {
            if (!err) {
                res.status(200).send({ message: 'Score atualizado com sucesso' })
            } else {
                res.status(500).send({ message: err.message })
            }
        })
    }

    static deleteScore = (req, res) => {
        const id = req.params.id.split(':')[1];
        score.findByIdAndDelete(id, (err) => {
            if (!err) {
                res.status(200).send({ message: 'Score removido com sucesso' })
            } else {
                res.status(500).send({ message: err.message })
            }
        })
    }
}

export default ScoreController