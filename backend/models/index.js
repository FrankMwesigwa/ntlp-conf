import User from './User.js';
import Activity from './Activity.js';

// Define associations
User.hasMany(Activity, { foreignKey: 'userid', as: 'activities' });
Activity.belongsTo(User, { foreignKey: 'userid', as: 'user' });

export {
    User,
    Activity
};
