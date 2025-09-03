import express from 'express';
import { Registration } from '../models/index.js';
import { Op } from 'sequelize';

const router = express.Router();

// Helper function to calculate registration fee based on type
const calculateRegistrationFee = (registrationType, country) => {
    const fees = {
        international: { amount: 400, currency: 'USD' },
        regional: { amount: 200, currency: 'USD' },
        local: { amount: 150000, currency: 'UGX' },
        student: { amount: 75000, currency: 'UGX' }
    };
    
    return fees[registrationType] || fees.local;
};

// Helper function to generate payment reference
const generatePaymentReference = () => {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    return `REG-${timestamp}-${random}`.toUpperCase();
};

// CREATE - Register for conference
router.post('/', async (req, res) => {
    try {
        const {
            title,
            firstName,
            lastName,
            email,
            phoneNumber,
            country,
            city,
            organization,
            jobTitle,
            professionalCategory,
            yearsOfExperience,
            registrationType,
            dietaryRequirements,
            accommodationNeeded,
            specialNeeds,
            newsletterSubscription,
            termsAccepted,
            photographyConsent
        } = req.body;

        // Validate required fields
        const requiredFields = [
            'title', 'firstName', 'lastName', 'email', 'phoneNumber',
            'country', 'organization', 'jobTitle', 'professionalCategory',
            'registrationType', 'termsAccepted'
        ];

        const missingFields = requiredFields.filter(field => !req.body[field]);
        if (missingFields.length > 0) {
            return res.status(400).json({
                error: 'Missing required fields',
                missingFields
            });
        }

        // Check if email already exists
        const existingRegistration = await Registration.findOne({
            where: { email }
        });

        if (existingRegistration) {
            return res.status(409).json({
                error: 'Email already registered',
                message: 'A registration with this email already exists'
            });
        }

        // Calculate registration fee
        const feeInfo = calculateRegistrationFee(registrationType, country);
        
        // Generate payment reference
        const paymentReference = generatePaymentReference();

        // Create registration
        const registration = await Registration.create({
            title,
            firstName,
            lastName,
            email,
            phoneNumber,
            country,
            city: city || null,
            organization,
            jobTitle,
            professionalCategory,
            yearsOfExperience: yearsOfExperience || null,
            registrationType,
            registrationFee: feeInfo.amount,
            currency: feeInfo.currency,
            dietaryRequirements: dietaryRequirements || '',
            accommodationNeeded: accommodationNeeded || 'no',
            specialNeeds: specialNeeds || null,
            newsletterSubscription: newsletterSubscription !== false,
            termsAccepted,
            photographyConsent: photographyConsent || false,
            paymentReference
        });

        res.status(201).json({
            message: 'Registration submitted successfully',
            registration: {
                id: registration.id,
                email: registration.email,
                firstName: registration.firstName,
                lastName: registration.lastName,
                registrationType: registration.registrationType,
                registrationFee: registration.registrationFee,
                currency: registration.currency,
                paymentReference: registration.paymentReference,
                paymentStatus: registration.paymentStatus,
                registrationStatus: registration.registrationStatus
            }
        });

    } catch (error) {
        console.error('Registration error:', error);
        
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({
                error: 'Validation error',
                details: error.errors.map(e => ({
                    field: e.path,
                    message: e.message
                }))
            });
        }
        
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({
                error: 'Duplicate entry',
                message: 'A registration with this email already exists'
            });
        }
        
        res.status(500).json({
            error: 'Internal server error',
            message: 'Failed to process registration'
        });
    }
});

// READ - Get all registrations (with pagination and filtering)
router.get('/', async (req, res) => {
    try {
        const {
            page = 1,
            limit = 10,
            registrationType,
            paymentStatus,
            registrationStatus,
            search
        } = req.query;

        const offset = (page - 1) * limit;
        const whereClause = {};

        // Add filters
        if (registrationType) {
            whereClause.registrationType = registrationType;
        }
        if (paymentStatus) {
            whereClause.paymentStatus = paymentStatus;
        }
        if (registrationStatus) {
            whereClause.registrationStatus = registrationStatus;
        }
        if (search) {
            whereClause[Op.or] = [
                { firstName: { [Op.like]: `%${search}%` } },
                { lastName: { [Op.like]: `%${search}%` } },
                { email: { [Op.like]: `%${search}%` } },
                { organization: { [Op.like]: `%${search}%` } }
            ];
        }

        const { count, rows } = await Registration.findAndCountAll({
            where: whereClause,
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['createdAt', 'DESC']],
            attributes: {
                exclude: ['updatedAt'] // Exclude updatedAt from response
            }
        });

        res.json({
            registrations: rows,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(count / limit),
                totalRegistrations: count,
                hasNextPage: offset + parseInt(limit) < count,
                hasPrevPage: page > 1
            }
        });

    } catch (error) {
        console.error('Get registrations error:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: 'Failed to fetch registrations'
        });
    }
});

// READ ONE - Get registration by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const registration = await Registration.findByPk(id, {
            attributes: {
                exclude: ['updatedAt']
            }
        });

        if (!registration) {
            return res.status(404).json({
                error: 'Registration not found',
                message: 'No registration found with the provided ID'
            });
        }

        res.json(registration);

    } catch (error) {
        console.error('Get registration error:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: 'Failed to fetch registration'
        });
    }
});

// READ ONE - Get registration by email
router.get('/email/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const registration = await Registration.findOne({
            where: { email },
            attributes: {
                exclude: ['updatedAt']
            }
        });

        if (!registration) {
            return res.status(404).json({
                error: 'Registration not found',
                message: 'No registration found with the provided email'
            });
        }

        res.json(registration);

    } catch (error) {
        console.error('Get registration by email error:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: 'Failed to fetch registration'
        });
    }
});

// UPDATE - Update registration (admin only - for payment status, etc.)
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const {
            paymentStatus,
            registrationStatus,
            paymentDate,
            confirmationDate
        } = req.body;

        const registration = await Registration.findByPk(id);
        if (!registration) {
            return res.status(404).json({
                error: 'Registration not found',
                message: 'No registration found with the provided ID'
            });
        }

        // Only allow certain fields to be updated
        const allowedUpdates = {};
        if (paymentStatus) allowedUpdates.paymentStatus = paymentStatus;
        if (registrationStatus) allowedUpdates.registrationStatus = registrationStatus;
        if (paymentDate) allowedUpdates.paymentDate = paymentDate;
        if (confirmationDate) allowedUpdates.confirmationDate = confirmationDate;

        await registration.update(allowedUpdates);

        res.json({
            message: 'Registration updated successfully',
            registration
        });

    } catch (error) {
        console.error('Update registration error:', error);
        
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({
                error: 'Validation error',
                details: error.errors.map(e => ({
                    field: e.path,
                    message: e.message
                }))
            });
        }
        
        res.status(500).json({
            error: 'Internal server error',
            message: 'Failed to update registration'
        });
    }
});

// UPDATE - Update payment status
router.patch('/:id/payment', async (req, res) => {
    try {
        const { id } = req.params;
        const { paymentStatus, paymentDate } = req.body;

        if (!paymentStatus) {
            return res.status(400).json({
                error: 'Payment status is required'
            });
        }

        const registration = await Registration.findByPk(id);
        if (!registration) {
            return res.status(404).json({
                error: 'Registration not found'
            });
        }

        const updateData = { paymentStatus };
        if (paymentDate) updateData.paymentDate = paymentDate;
        
        // Auto-update registration status based on payment
        if (paymentStatus === 'paid') {
            updateData.registrationStatus = 'confirmed';
            updateData.confirmationDate = new Date();
        }

        await registration.update(updateData);

        res.json({
            message: 'Payment status updated successfully',
            registration: {
                id: registration.id,
                paymentStatus: registration.paymentStatus,
                registrationStatus: registration.registrationStatus,
                paymentDate: registration.paymentDate,
                confirmationDate: registration.confirmationDate
            }
        });

    } catch (error) {
        console.error('Update payment status error:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: 'Failed to update payment status'
        });
    }
});

// DELETE - Cancel registration
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const registration = await Registration.findByPk(id);

        if (!registration) {
            return res.status(404).json({
                error: 'Registration not found',
                message: 'No registration found with the provided ID'
            });
        }

        // Instead of hard delete, mark as cancelled
        await registration.update({
            registrationStatus: 'cancelled'
        });

        res.json({
            message: 'Registration cancelled successfully'
        });

    } catch (error) {
        console.error('Cancel registration error:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: 'Failed to cancel registration'
        });
    }
});

// GET - Registration statistics
router.get('/stats/overview', async (req, res) => {
    try {
        const totalRegistrations = await Registration.count();
        
        const registrationsByType = await Registration.findAll({
            attributes: [
                'registrationType',
                [Registration.sequelize.fn('COUNT', Registration.sequelize.col('id')), 'count']
            ],
            group: ['registrationType'],
            raw: true
        });

        const registrationsByStatus = await Registration.findAll({
            attributes: [
                'registrationStatus',
                [Registration.sequelize.fn('COUNT', Registration.sequelize.col('id')), 'count']
            ],
            group: ['registrationStatus'],
            raw: true
        });

        const registrationsByPayment = await Registration.findAll({
            attributes: [
                'paymentStatus',
                [Registration.sequelize.fn('COUNT', Registration.sequelize.col('id')), 'count']
            ],
            group: ['paymentStatus'],
            raw: true
        });

        res.json({
            totalRegistrations,
            byType: registrationsByType,
            byStatus: registrationsByStatus,
            byPayment: registrationsByPayment
        });

    } catch (error) {
        console.error('Get registration stats error:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: 'Failed to fetch registration statistics'
        });
    }
});

export default router;
