import { DataTypes, Model, Sequelize } from "sequelize";
import DB from "../src/database/config";
import User from "./user";

interface ModelProps {
   id:         number;
   id_user:    number;
   prefix:     string;
   name:       string;
   job:        string;
   email:      string;
   extension:  string;
   public:     boolean;
}

interface ModelCreationAttributes extends Omit<ModelProps, "id"> {}

class Directory extends Model<ModelProps, ModelCreationAttributes> implements ModelProps {
   public id!:          number;
   public id_user!:     number;
   public prefix!:      string;
   public name!:        string;
   public job!:         string;
   public email!:       string;
   public extension!:   string;
   public public!:      boolean;
}

Directory.init(
   {
      id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true
      },
      id_user: {
         type: DataTypes.INTEGER,
         allowNull: false
      },
      prefix: {
         type: DataTypes.STRING,
         allowNull: true
      },
      name: {
         type: DataTypes.STRING,
         allowNull: false
      },
      job: {
         type: DataTypes.STRING,
         allowNull: false 
      },
      email: {
         type: DataTypes.STRING,
         allowNull: false 
      },
      extension: {
         type: DataTypes.STRING,
         allowNull: false 
      },
      public: {
         type: DataTypes.BOOLEAN,
         defaultValue: false
      }
   },
   {
      sequelize: DB,
      tableName: 'directories'
   }
);

(async () => {
   await DB.sync(); 
      Directory.belongsTo(User, { foreignKey: 'id_user' })
 })();

export default Directory;