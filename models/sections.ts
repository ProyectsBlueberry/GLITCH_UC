import { DataTypes, Model } from 'sequelize';
import DB from '../src/database/config';
import Workshop from './workshop';
import List from './list';

interface ModelAttributes {
  id:           number;
  id_workshop:  number;
  name:         string;
  title:        string;
  image:        string;
  content:      string;
}

interface ModelCreationAttributes extends Omit<ModelAttributes, 'id'> {}

class Section extends Model<ModelAttributes, ModelCreationAttributes> implements ModelAttributes {
  public id!:           number;
  public id_workshop!:  number;
  public name!:         string;
  public title!:        string;
  public image!:        string;
  public content!:      string;
}

Section.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    id_workshop: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    name: {
      type: DataTypes.STRING,
      allowNull:false
    },
    title: {
      type: DataTypes.STRING,
      allowNull:false
    },
    image: {
        type:  DataTypes.STRING,
        allowNull: false
    },
    content:{
      type:  DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize: DB,
    modelName: 'sections',
  }
);

(async () => {
  await DB.sync(); 
     Section.belongsTo(Workshop, { foreignKey: 'id_workshop' });

     Section.hasMany(List, {foreignKey: 'id_section'});
})();
export default Section;