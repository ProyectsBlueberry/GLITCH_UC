import { DataTypes, Model } from 'sequelize';
import DB from '../src/database/config';
import Academic_offert from './academic_offer';

interface ModelAttributes {
  id: number;
  image: string;
  alt_image: string;
  video: string;
  id_offer: number;
  createdAt: Date;
  updatedAt: Date;
}


interface ModelCreationAttributes extends Omit<ModelAttributes, 'id'> {}

class Our_graduates extends Model<ModelAttributes, ModelCreationAttributes> implements ModelAttributes {
  public id!: number;
  public image!: string;
  public alt_image!: string;
  public video!: string;
  public id_offer!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Our_graduates.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    image: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    alt_image: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    video: {
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
    modelName: 'our_graduates',
  }
);
(async () => {
  await DB.sync(); 
 
  Our_graduates.belongsTo(Academic_offert, { foreignKey: 'id_offer' });
})();
export default Our_graduates;