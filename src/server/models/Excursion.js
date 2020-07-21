const { Model } = require('sequelize');

/**
 * title
 * company
 * picname
 * route
 * excursionDate
 * excursionDuration
 * price
 * excursionType
 * minVisitors
 * maxVisitors
 * categoryVisitors
 * template
 * recordVisitors
 * description
 * responsible
 * guide
 */

module.exports = (sequelize, DataTypes) => {
  class Excursion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Excursion.init(
    {
      title: {
        type: DataTypes.STRING(100),
        field: 'title',
      },
      company: {
        type: DataTypes.STRING(100),
        field: 'company',
      },
      picname: {
        type: DataTypes.STRING(200),
        field: 'picname',
      },
      route: {
        type: DataTypes.STRING(100),
        field: 'route',
      },
      excursionDate: {
        type: DataTypes.DATE,
        field: 'excursion_date',
      },
      excursionDuration: {
        type: DataTypes.INTEGER,
        field: 'excursion_duration',
      },
      price: {
        type: DataTypes.DECIMAL(100, 2),
        field: 'price',
      },
      excursionType: {
        type: DataTypes.STRING(100),
        field: 'excursion_type',
      },
      minVisitors: {
        type: DataTypes.INTEGER,
        field: 'min_visitors',
      },
      maxVisitors: {
        type: DataTypes.INTEGER,
        field: 'max_visitors',
      },
      categoryVisitors: {
        type: DataTypes.STRING(100),
        field: 'category_visitors',
      },
      template: {
        type: DataTypes.STRING(100),
        field: 'template',
      },
      recordVisitors: {
        type: DataTypes.INTEGER,
        field: 'record_visitors',
      },
      description: {
        type: DataTypes.TEXT,
        field: 'description',
      },
      responsible: {
        type: DataTypes.STRING(100),
        field: 'responsible',
      },
      guide: {
        type: DataTypes.STRING(100),
        field: 'guide',
      },
    },
    {
      sequelize,
      modelName: 'Excursion',
    },
  );
  return Excursion;
};
