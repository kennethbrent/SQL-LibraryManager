const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    class Book extends Sequelize.Model {}
    Book.init({
        title: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Be sure to provide a value for both Title and Author"
                }
            }
        },
        author: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                     msg: "Be sure to provide a value for both Title and Author"
                }
            }

        },
        genre: {
            type: Sequelize.STRING
        },
        year: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Please provide a value for title"
                }
            }
        }

    }, {sequelize});

    return Book;
}
