import { DataTypes, Model } from 'sequelize';
import DB from '../src/database/config';
import User from './user';
import Indices_Galery from './index_galery';

interface ModelAttributes {
  id:             number;
  id_user:        number;
  title_regular:  string;
  title_bold:     string;
  video_loop:     string;
  about_us:     Text;
  scholarships:   Text;
}

interface ModelCreationAttributes extends Omit<ModelAttributes, 'id'> {}

class Index extends Model<ModelAttributes, ModelCreationAttributes> implements ModelAttributes {
  public id!:             number;
  public id_user!:        number;
  public title_regular!:  string;
  public title_bold!:     string;
  public video_loop!:     string;
  public about_us!:     Text;
  public scholarships!:   Text;
}

Index.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title_regular: {
      type: DataTypes.STRING,
      allowNull: false
    },
    title_bold: {
      type: DataTypes.STRING,
      allowNull: false
    },
    video_loop: {
      type: DataTypes.STRING,
      allowNull: false
    },
    about_us: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    scholarships: {
      type: DataTypes.TEXT,
      allowNull: false
    },
  },
  {
    sequelize: DB,
    modelName: 'indices',
  }
);

(async () => {
  await DB.sync();
      Index.belongsTo(User, { foreignKey: 'id_user' });
      Index.hasMany(Indices_Galery, { foreignKey: 'id_index' });
})();

export default Index;