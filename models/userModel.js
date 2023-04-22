const { Sequelize } = require("sequelize");
const db = require("../config/database");
const { DataTypes } = Sequelize;
// const { decrypt, encrypt } = require("../services/helper");
// const bcrypt = require("bcrypt");
const Op = require("sequelize").Op;

const userModel = db.define(
  "users",
    {
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },    
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },   
    father_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    mother_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    religion: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },   
    createdAt: {
      field: "created_at",
      type: DataTypes.DATE,
      allowNull: true,
    },
    updatedAt: {
      field: "updated_at",
      type: DataTypes.DATE,
      allowNull: true,
    },
    deletedAt: {
      field: "deleted_at",
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    paranoid: true,    
    /* hooks: {
      beforeValidate: async (candidate) => {
        if (candidate.password)
          candidate.password = await decrypt(candidate.password);
        if (candidate.email) candidate.email = await decrypt(candidate.email);
        if (candidate.mobile)
          candidate.mobile = await decrypt(candidate.mobile);
      },
      afterValidate: async (candidate) => {
        if (candidate.email) candidate.email = await encrypt(candidate.email);
        if (candidate.mobile)
          candidate.mobile = await encrypt(candidate.mobile);
      },

      beforeCreate: async (candidate) => {
        if (candidate.password) {
          const salt = await bcrypt.genSalt();
          candidate.password = bcrypt.hashSync(
            candidate.password.toString(),
            salt
          );
        }
      },
      beforeUpdate: async (candidate) => {
        if (candidate.password) {
          const salt = await bcrypt.genSalt();
          candidate.password = bcrypt.hashSync(
            candidate.password.toString(),
            salt
          );
        }
      },
    },  */
  }
);

(async () => {
    await userModel.sync().then(() => {
        // console.log('users table created successfully!');
    }).catch((error) => {
        console.error('Unable to create users table : ', error);
    });
})();

module.exports = userModel;
