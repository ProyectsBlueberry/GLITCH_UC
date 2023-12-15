import { DataTypes, Model } from 'sequelize';
import DB from '../src/database/config';
import Academic_offert from './academic_offer';

interface ModelAttributes {
  id: number;
  icon: string;
  content: Text;
  id_offer: number;
  createdAt: Date;
  updatedAt: Date;
}


interface ModelCreationAttributes extends Omit<ModelAttributes, 'id'> {}

class Works extends Model<ModelAttributes, ModelCreationAttributes> implements ModelAttributes {
  public id!: number;
  public icon!: string;
  public content!: Text;
  public id_offer!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Works.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    icon: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    content: {
      allowNull: true,
      type: DataTypes.TEXT,
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
    modelName: 'works',
  }
);
(async () => {
  await DB.sync(); 
 
  Works.belongsTo(Academic_offert, { foreignKey: 'id_offer' });
})();
export default Works;