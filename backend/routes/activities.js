// backend/routes/activities.js
import express from 'express';
import { Activity, User } from '../models/index.js';

const router = express.Router();

// CREATE
router.post('/', async (req, res) => {
    try {
        const { title, description, userid } = req.body;
        
        // Validate that user exists
        const user = await User.findByPk(userid);
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }
        
        const activity = await Activity.create({ title, description, userid });
        
        // Fetch the created activity with user details
        const activityWithUser = await Activity.findByPk(activity.id, {
            include: [{ model: User, as: 'user' }]
        });
        
        res.status(201).json(activityWithUser);
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ 
                error: 'Validation error', 
                details: error.errors.map(e => e.message) 
            });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
});

// READ
router.get('/', async (req, res) => {
    try {
        const activities = await Activity.findAll({
            include: [{ model: User, as: 'user' }],
            order: [['id', 'ASC']]
        });
        res.json(activities);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// READ ONE
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const activity = await Activity.findByPk(id, {
            include: [{ model: User, as: 'user' }]
        });
        
        if (!activity) {
            return res.status(404).json({ error: 'Activity not found' });
        }
        
        res.json(activity);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET ACTIVITIES BY USER
router.get('/user/:userid', async (req, res) => {
    try {
        const { userid } = req.params;
        
        // Validate that user exists
        const user = await User.findByPk(userid);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        const activities = await Activity.findAll({
            where: { userid },
            include: [{ model: User, as: 'user' }],
            order: [['id', 'ASC']]
        });
        
        res.json(activities);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// UPDATE
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, userid } = req.body;
        
        const activity = await Activity.findByPk(id);
        if (!activity) {
            return res.status(404).json({ error: 'Activity not found' });
        }
        
        // If userid is being updated, validate that the new user exists
        if (userid && userid !== activity.userid) {
            const user = await User.findByPk(userid);
            if (!user) {
                return res.status(400).json({ error: 'User not found' });
            }
        }
        
        const updateData = { title, description };
        if (userid) {
            updateData.userid = userid;
        }
        
        await activity.update(updateData);
        
        // Fetch updated activity with user details
        const updatedActivity = await Activity.findByPk(id, {
            include: [{ model: User, as: 'user' }]
        });
        
        res.json(updatedActivity);
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ 
                error: 'Validation error', 
                details: error.errors.map(e => e.message) 
            });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
});

// DELETE
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const activity = await Activity.findByPk(id);
        
        if (!activity) {
            return res.status(404).json({ error: 'Activity not found' });
        }
        
        await activity.destroy();
        res.json({ message: 'Activity deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;