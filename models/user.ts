import { DataTypes, Model } from "sequelize";
import DB from "../src/database/config";
import Academic_level from "./academic_level";
import Directory from "./directory";
import Agreement from "./agreement";
import Workshop from "./workshop";
import Facilities from "./facilities";
import Index from "./index";
import { UserAttributes } from "../src/interfaces/UserAttributes";

interface UserCreationAttributes extends Omit<UserAttributes, "id"> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;

}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: DB,
  timestamps: true,
  tableName: 'users',
});

User.hasMany( Academic_level, { foreignKey: 'id_user'});
User.hasMany( Directory, { foreignKey: 'id_user'});
User.hasMany( Agreement, { foreignKey: 'id_user'});
User.hasMany( Facilities, { foreignKey: 'id_user'});
User.hasMany( Workshop, { foreignKey: 'id_user'});
User.hasMany( Index, { foreignKey: 'id_user'});

export default User;
