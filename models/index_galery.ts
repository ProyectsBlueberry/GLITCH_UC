import { DataTypes, Model } from 'sequelize';
import DB from '../src/database/config';
import Index from '.';
import User from './user';

interface ModelAttributes {
  id:         number;
  id_index:   number;
  alt_image:   string;
  image:      string;
  key_video:       string;
}

interface ModelCreationAttributes extends Omit<ModelAttributes, 'id'> {}

class Indices_Galery extends Model<ModelAttributes, ModelCreationAttributes> implements ModelAttributes {
  public id!:         number;
  public id_index!:   number;
  public alt_image!:   string;
  public image!:      string;
  public key_video!:       string;
}

Indices_Galery.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull:  false
    },
    id_index: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    alt_image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    key_video: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize: DB,
    modelName: 'indices_galery',
  }
);

(async () => {
  await DB.sync(); 
     Indices_Galery.belongsTo(Index, { foreignKey: 'id_index' });
})();

export default Indices_Galery;