const TypeRole = require('../enums/role.enum');


module.exports = async ( db ) => {
    const Role = db.role;
    const User = db.user;

    Role.findOrCreate({ where : { id : 1}, defaults : { id : 1, role_dsc: 'Admin', active : true, deleted : false}});
    User.findOrCreate({ where : { id : 1}, defaults : { id : 1, name : 'Admin', email : 'admin@admin.com' , password : 'admin123', role_id : TypeRole.ADMIN, active : true}});
}