const {Sequelize} = require("sequelize");
const db = require("../config/database");
const { DataTypes } = Sequelize;

const religionMasterModel = db.define("religions", {
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: {
                args: [true],
                msg: "Please enter valid name",
            },
            notNull: {
                args: [true],
                msg: "Please enter valid name",
            }
        },
    },
    createdAt: {
        field: 'created_at',
        type: DataTypes.DATE,
        allowNull: true
    },
    updatedAt: {
        field: 'updated_at',
        type: DataTypes.DATE,
        allowNull: true
    },
    deletedAt: {
        field: 'deleted_at',
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    timestamps: true,
    paranoid: true,
});

// (async () => {
//     await religionMasterModel.sync().then(() => {
//         // console.log('religionMasterModel table created successfully!');
//     }).catch((error) => {
//         console.error('Unable to create table : ', error);
//     });
// })();

module.exports = religionMasterModel;
