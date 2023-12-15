// category.js
import { DataTypes, Model } from 'sequelize';
import DB from '../src/database/config';
import Academic_offert from './academic_offer';
import AcademicLevel from './academic_level';
import { CategoriesAttributes } from '../src/interfaces/CategoriesAttributes';

interface CategoriesCreationAttributes extends Omit<CategoriesAttributes, "id"> {}
  
class Category extends Model<CategoriesAttributes, CategoriesCreationAttributes> implements CategoriesAttributes {
  public id!: number;
  public title!: string;
  public id_level!: number;
  public route!: string;
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    id_level: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    route: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    sequelize: DB,
    tableName: 'categories',

  }
);



(async () => {
  await DB.sync(); 
  Category.hasMany(Academic_offert, { foreignKey: 'id_category'});
  Category.belongsTo(AcademicLevel, { foreignKey: 'id_level' });
})();



export default Category;
