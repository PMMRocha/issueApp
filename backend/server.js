import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import Issue from './models/issue.model';

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

// connect to mongoDB
mongoose.connect('mongodb://localhost:27017/issues');

const connection = mongoose.connection;
connection.once('open', () => console.log('MongoDB connected'));



/** GET all issues */
router.route('/issues')
.get(
    (req, res) => Issue
    .find(
        (error, issues) => {
            if (error) { console.error('ERROR ', error); return; }
            res.json(issues);
        }
    )
);


/** GET issue by id */
router.route('/issues/:id')
.get(
    (req, res) => Issue
    .findById(
        req.params.id,
        (error, issue) => {
            if (error) { console.error('ERROR ', error); return; }
            res.json(issue);
        }
    )
);


/** POST new issue */
router.route('/issues/add')
.post(
    (req, res) => {
        const issue = new Issue(req.body);
        issue.save()
        .then(issue => res.status(200).json({ 'issue': 'Added successfully' }))
        .catch(err => res.status(400).json({ message: 'Failed to create new record', err }));
    }
);


/** POST update existing issue */
router.route('/issues/update/:id')
.post(
    (req, res) => {
        Issue.findById(
            req.params.id,
            (error, issue) => {
                if (!issue) { return next(new Error('Could not load document')); }
                issue = req.body;
                issue.save()
                .then(issue => res.status(200).json({ 'issue': 'Update done' }))
                .catch(err => res.status(400).json({ message: 'Failed to create new record', err }));

            }
        )
    }
);


/** GET remove existing issue */
router.route('/issues/update/:id')
.get(
    (req, res) => {
        Issue.findByIdAndRemove(
            { _id: req.params.id },
            (error, issue) => {
                if (error) { return next(new Error('Could not load document ', error)); }
                res.status(200).json({ 'issue': 'Removed succesfully' });

            }
        )
    }
);



app.use('/', router);

app.listen(4000, () => console.log('Connected on port 4000'));
