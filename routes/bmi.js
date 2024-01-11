var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
/* GET users listing. */

router.get('/getinsertbmi', async function (req, res, next) {
    let infoper = req.body;
    infoper.ip = req.ip
    let bmi = infoper.weight / Math.pow(infoper.height / 100, 2)
    const created = await prisma.infoperson.create({
        data: infoper,
    })
    let obj = { created: created, bmi: bmi }
    res.send(obj);
});

router.get('/getall', async function (req, res, next) {
    const cv = await prisma.infoperson.findMany({
        orderBy: {
            id: 'desc',
        }
    });
    res.send(cv);
});

router.get('/deletedb', async function (req, res, next) {
    let r = await prisma.infoperson.deleteMany();
    res.send(`delete of database seccesfully the number of ${r.count}`);
});

module.exports = router;