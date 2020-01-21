const express = require("express")
const db = require("../data/dbConfig")
const router = express.Router()

router.get("/", (req, res) => {
    db("accounts")
    .then(accounts => {
        res.json(accounts)
    })
    .catch(err => {
        res.status(500).json({errorMessage: "Unable to get accounts"})
    })
});

router.post("/:id", (req, res) => {
    db("accounts")
    .where({ id: req.params.id})
    .then(account => {
        (account.length ? res.json(account): PromiseRejectionEvent())
    })
    .catch(err => {
        res.status(404).json({errorMessage: "Can not create account"})
    })
});

router.put("/id", (req, res) => {
    db("accounts")
    .where({ id: req.params.id })
    .update({ name: req.body.name , budget: req.body.budget })
    .catch(err => {
        res.status(500).json({ errorMessage: "Can not update account"})
    })
});

router.delete("/:id", (req, res) => {
    db("accounts")
    .where({ id: req.params.id})
    .del()
    .then(account => {
        res.status(204).send()
    })
    .catch(err => {
        res.status(500).json({errorMessage: "Deleting Error"})
    })
});

module.exports = router;