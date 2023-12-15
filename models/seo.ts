import { DataTypes, Model } from 'sequelize';
import DB from '../src/database/config';
import Academic_offert from './academic_offer';

interface ModelAttributes {
  id: number;
  route: string;
  description: string | null;
  keywords: string;
  id_offer: number;
  createdAt: Date;
  updatedAt: Date;
}


interface ModelCreationAttributes extends Omit<ModelAttributes, 'id'> {}

class Seo extends Model<ModelAttributes, ModelCreationAttributes> implements ModelAttributes {
  public id!: number;
  public route!: string;
  public description!: string;
  public keywords!: string;
  public id_offer!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Seo.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    route: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    description: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    keywords: {
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
    modelName: 'Seo',
  }
);
(async () => {
  await DB.sync(); 
 
  Seo.belongsTo(Academic_offert, { foreignKey: 'id_offer' });
})();
export default Seo;