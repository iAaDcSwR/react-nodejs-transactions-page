var express = require('express');
var router = express.Router();

const database = require('../data');


router.post('/transactions/search', function (req, res, next) {
    const filters = {
        transid: (data, value) => data.filter(transaction => transaction.transid.toLowerCase() == value),
        isapproved: (data, value) => data.filter(transaction => transaction.isapproved === value),
        payment: (data, value) => data.filter(transaction => transaction.payment.toLowerCase() == value),
        min: (data, value) => data.filter(transaction => transaction.amount >= value),
        max: (data, value) => data.filter(transaction => transaction.amount <= value),
        bin: (data, value) => data.filter(transaction => transaction.bin.toLowerCase() == value),
        email: (data, value) => data.filter(transaction => transaction.email.toLowerCase() == value)
    };

    var result = database;

    // Filter the database until there are no more filters
    for (const filter in filters) {
        if (req.body[filter] != null) {
            result = filters[filter](result, req.body[filter]);
        }
    }

    var total = result.length;

    // Handle paging
    var startIndex = req.body.pageNum ? req.body.pageNum * req.body.pageSize - 1 : 0;
    result = result.slice(startIndex, startIndex + req.body.pageSize);

    res.status(200).send({total, result});
});

router.get('/transactions/stats', function (req, res, next) {
    var result = {
        total: database.length,
        approved: database.filter(transaction => transaction.isapproved === true).length
    };

    // NOTE: Assuming that any unapproved transaction is declined
    result.declined = result.total - result.approved;

    // NOTE: Not sure what approval rate means :)
    result.approvalRate = result.approved / result.total;

    res.status(200).send(result);
});

module.exports = router;