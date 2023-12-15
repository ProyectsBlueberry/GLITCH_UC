import { DataTypes, Model } from "sequelize";
import DB from "../src/database/config";
import User from "./user";
import Category from "./categories";

interface ModelProps {
  id: number;
  level: string;
  id_user: number;
  country: string;
}
interface ModelCreationAttributes extends Omit<ModelProps, "id"> {}

class AcademicLevel extends Model<ModelProps, ModelCreationAttributes> implements ModelProps {
  public id!: number;
  public level!: string;
  public id_user!: number;
  public country!: string;
}

AcademicLevel.init({
      id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true,
      },
      level: {
         type: DataTypes.STRING(255),
         allowNull: false
      },
      id_user: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      country: {
         type: DataTypes.STRING(255),
         allowNull: true
      },
   },
   {
      sequelize: DB,
      tableName: 'academic_levels',
   }
);

(async () => {
   await DB.sync(); 
   AcademicLevel.hasMany(Category, { foreignKey: 'id_level'});
   
   AcademicLevel.belongsTo(User, { foreignKey: 'id_user' });
 })();

export default AcademicLevel;