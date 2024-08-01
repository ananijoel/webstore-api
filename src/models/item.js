const { Sequelize, DataTypes } = require("sequelize");
const validTypes = ['console', 'PS3', 'PS4', 'PS5', 'xboxseries', 'nintendo', 'PC', 'gift cards', 'accessories','jeu'];

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Item', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: `Le nom de l'item ne doit pas être nul` },
                notEmpty: { msg: `Le nom de l'item ne doit pas être vide` }
            }
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                notNull: { msg: `Le prix de l'item ne doit pas être nul` },
                notEmpty: { msg: `Le prix de l'item ne doit pas être vide` },
                isFloat: { msg: `Le prix de l'item doit être un nombre valide` },
                min: {
                    args: [0],
                    msg: `Le prix de l'item doit être positif`
                }
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notNull: { msg: `La description de l'item ne doit pas être nulle` },
                notEmpty: { msg: `La description de l'item ne doit pas être vide` }
            }
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: { msg: `Le nombre d'items ne doit pas être nul` },
                notEmpty: { msg: `Le nombre d'items ne doit pas être vide` }
            }
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
            get() {
                return this.getDataValue('category').split(',');
            },
            set(category) {
                if (Array.isArray(category)) {
                    this.setDataValue('category', category.join());
                } else {
                    this.setDataValue('category', category);
                }
            },
            validate: {
                isTypeValid(value) {
                    if (!value) {
                        throw new Error('Un item doit au moins avoir une catégorie.');
                    }
                    value.split(',').forEach(type => {
                        if (!validTypes.includes(type)) {
                            throw new Error(`La catégorie d'un item doit appartenir à la liste suivante: ${validTypes}`);
                        }
                    });
                }
            }
        },
        matricule: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notNull: { msg: `Le matricule de l'item ne doit pas être nul` },
                notEmpty: { msg: `Le matricule de l'item ne doit pas être vide` }
            }
        },
        front_pic:{
            type: DataTypes.BLOB('long'),
            allowNull: true,
        },
        back_pic:{
            type: DataTypes.BLOB('long'),
            allowNull: true,
        },
        left_pic:{
            type: DataTypes.BLOB('long'),
            allowNull: true,
        },
        right_pic:{
            type: DataTypes.BLOB('long'),
            allowNull: true,
        },
        up_pic:{
            type: DataTypes.BLOB('long'),
            allowNull: true,
        },
        down_pic:{
            type: DataTypes.BLOB('long'),
            allowNull: true,
        }
    },{
        timestamps: true,
        createdAt: 'created',
        updatedAt: 'update'
      });
};
