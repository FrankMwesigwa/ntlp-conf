import User from './User.js';
import Activity from './Activity.js';
import Registration from './Registration.js';

// Define associations
User.hasMany(Activity, { foreignKey: 'userid', as: 'activities' });
Activity.belongsTo(User, { foreignKey: 'userid', as: 'user' });

// Registration doesn't need associations with User/Activity for now
// but can be added later if needed

export {
    User,
    Activity,
    Registration
};
