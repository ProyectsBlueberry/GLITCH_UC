import { DataTypes, Model } from 'sequelize';
import DB from '../src/database/config';
import Academic_offert from './academic_offer';

interface ModelAttributes {
  id: number;
  advantage: string;
  icon: string;
  id_offer: number;
  createdAt: Date;
  updatedAt: Date;
}


interface ModelCreationAttributes extends Omit<ModelAttributes, 'id'> {}

class Advantage extends Model<ModelAttributes, ModelCreationAttributes> implements ModelAttributes {
  public id!: number;
  public advantage!: string;
  public icon!: string;
  public id_offer!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Advantage.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    advantage: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    icon: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    id_offer: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "academic_offers",
        key: "id",
      },
      onDelete: 'CASCADE',
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    sequelize: DB,
    modelName: 'advantages',
  }
);
(async () => {
  await DB.sync(); 
 
  Advantage.belongsTo(Academic_offert, { foreignKey: 'id_offer' });
})();
export default Advantage;