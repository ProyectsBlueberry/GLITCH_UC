import { DataTypes, Model } from 'sequelize';
import DB from '../src/database/config';
import User from './user';

interface ModelAttributes {
  id:       number;
  id_user:  number;
  image:    string;
}

interface ModelCreationAttributes extends Omit<ModelAttributes, 'id'> {}

class Agreement extends Model<ModelAttributes, ModelCreationAttributes> implements ModelAttributes {
  public id!:       number;
  public id_user!:  number;
  public image!:    string;

  static associate(models: any): void {
    Agreement.belongsTo(User, { foreignKey: 'id_user' })
  }
}

Agreement.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
  },
  {
    sequelize: DB,

    tableName: 'agreements',
  }
);

(async () => {
  await DB.sync(); 
    Agreement.belongsTo(User, { foreignKey: 'id_user' });
})();


export default Agreement;