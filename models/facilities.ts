import { DataTypes, Model } from 'sequelize';
import DB from '../src/database/config';
import User from './user';
import Facility_Galery from './facilities_galery';

interface ModelAttributes {
   id:               number;
   id_user:          number;
   name:             string;
   card_background:   string;
   title:            string;
   background:       string;
   about_it:         string;
}

interface ModelCreationAttributes extends Omit<ModelAttributes, 'id'> { }

class Facilities extends Model<ModelAttributes, ModelCreationAttributes> implements ModelAttributes {
   public id!:               number;
   public id_user!:          number;
   public name!:             string;
   public card_background!:   string;
   public title!:            string;
   public background!:       string;
   public about_it!:         string;
}

Facilities.init(
   {
      id: {
         type: DataTypes.INTEGER,
         primaryKey:true,
         autoIncrement: true,
         allowNull: false,
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
      about_it: {
         type: DataTypes.STRING,
         allowNull: false,
      },
   },
   {
      sequelize: DB,
      tableName: 'Facilities',
   }
);

(async () => {
   await DB.sync(); 
      Facilities.belongsTo(User, { foreignKey: 'id_user' });
      
      Facilities.hasMany(Facility_Galery, { foreignKey: 'id_facility' });
 })();
export default Facilities;