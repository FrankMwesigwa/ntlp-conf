import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Registration = sequelize.define('Registration', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    // Personal Information
    title: {
        type: DataTypes.ENUM('Dr', 'Prof', 'Mr', 'Ms', 'Mrs'),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    firstName: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [2, 100]
        }
    },
    lastName: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [2, 100]
        }
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
            notEmpty: true
        }
    },
    phoneNumber: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [10, 20]
        }
    },
    country: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    city: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    
    // Professional Information
    organization: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [2, 255]
        }
    },
    jobTitle: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [2, 255]
        }
    },
    professionalCategory: {
        type: DataTypes.ENUM(
            'Medical Doctor',
            'Nurse/Midwife',
            'Public Health Professional',
            'Researcher/Academic',
            'Student',
            'Policy Maker',
            'NGO/Development Partner',
            'Other'
        ),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    yearsOfExperience: {
        type: DataTypes.ENUM('0-2', '3-5', '6-10', '11-15', '16+'),
        allowNull: true
    },
    
    // Registration Category
    registrationType: {
        type: DataTypes.ENUM('international', 'regional', 'local', 'student'),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    registrationFee: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 0
        }
    },
    currency: {
        type: DataTypes.ENUM('USD', 'UGX'),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    
    // Additional Information
    dietaryRequirements: {
        type: DataTypes.ENUM('', 'vegetarian', 'vegan', 'halal', 'gluten-free', 'other'),
        allowNull: true,
        defaultValue: ''
    },
    accommodationNeeded: {
        type: DataTypes.ENUM('no', 'yes'),
        allowNull: true,
        defaultValue: 'no'
    },
    specialNeeds: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    newsletterSubscription: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    
    // Terms & Conditions
    termsAccepted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        validate: {
            isTrue(value) {
                if (!value) {
                    throw new Error('Terms and conditions must be accepted');
                }
            }
        }
    },
    photographyConsent: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    
    // Payment and Status
    paymentStatus: {
        type: DataTypes.ENUM('pending', 'paid', 'failed', 'refunded'),
        allowNull: false,
        defaultValue: 'pending'
    },
    paymentReference: {
        type: DataTypes.STRING(100),
        allowNull: true,
        unique: true
    },
    registrationStatus: {
        type: DataTypes.ENUM('pending', 'confirmed', 'cancelled'),
        allowNull: false,
        defaultValue: 'pending'
    },
    
    // Timestamps
    paymentDate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    confirmationDate: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 'registrations',
    timestamps: true,
    underscored: true,
    indexes: [
        {
            unique: true,
            fields: ['email']
        },
        {
            fields: ['registration_type']
        },
        {
            fields: ['payment_status']
        },
        {
            fields: ['registration_status']
        }
    ]
});

export default Registration;
