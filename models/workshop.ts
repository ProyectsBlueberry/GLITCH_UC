import { DataTypes, Model } from "sequelize";
import DB from "../src/database/config";
import User from "./user";
import Works from "./works";
import Section from "./sections";

interface ModelAttributes {
   id:                  number;
   id_user:             number;
   name:                string;
   card_background:      string;
   title:               string;
   background:          string;
}

interface ModelCreationAttributes extends Omit<ModelAttributes, "id"> { }

class Workshop extends Model<ModelAttributes, ModelCreationAttributes> implements ModelAttributes {
   public id!:                number;
   public id_user!:           number;
   public name!:              string;
   public card_background!:    string;
   public title!:             string;
   public background!:        string;

}

Workshop.init(
   {
      id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         allowNull: false,
         autoIncrement:true
      },
      id_user: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      name: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      card_background: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      title: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      background: {
         type: DataTypes.STRING,
         allowNull: false,
      },
   },
   {
      sequelize: DB,
      modelName: "workshops",
   }
);

(async () => {
   await DB.sync(); 
      Workshop.belongsTo(User, { foreignKey: 'id_user' });

      Workshop.hasMany(Section, {foreignKey: 'id_workshop'});

 })();
export default Workshop;
