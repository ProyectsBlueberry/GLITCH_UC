import { DataTypes, Model } from 'sequelize';
import DB from '../src/database/config';
import Section from './sections';

interface ModelAttributes {
  id:           number;
  id_section:   number;
  text:         string;
  position:     string;
}

interface ModelCreationAttributes extends Omit<ModelAttributes, 'id'> {}

class List extends Model<ModelAttributes, ModelCreationAttributes> implements ModelAttributes {
  public id!:           number;
  public id_section!:   number;
  public text!:         string;
  public position!:     string;
}

List.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    id_section: {
      type: DataTypes.STRING,
      allowNull: false
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false
    },
    position: {
      type: DataTypes.STRING,
      allowNull:false
    }
  },
  {
    sequelize: DB,
    modelName: 'list',
  }
);

(async () => {
  await DB.sync(); 
    List.belongsTo(Section, { foreignKey: 'id_section' });
})();

export default List;