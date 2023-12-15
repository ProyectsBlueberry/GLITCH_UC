import { DataTypes, Model } from 'sequelize';
import DB from '../src/database/config';
import Facilities from './facilities';

interface ModelAttributes {
  id:             number;
  id_facility:    number;
  image:          string;
}

interface ModelCreationAttributes extends Omit<ModelAttributes, 'id'> {}

class Facility_Galery extends Model<ModelAttributes, ModelCreationAttributes> implements ModelAttributes {
  public id!:             number;
  public id_facility!:    number;
  public image!:          string;
}

Facility_Galery.init(
  {
    id: {
      type:DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    id_facility: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize: DB,
    modelName: 'facilities_galeries',
  }
);

(async () => {
  await DB.sync(); 
    Facility_Galery.belongsTo(Facilities, { foreignKey: 'id_facility' });
})();

export default Facility_Galery;