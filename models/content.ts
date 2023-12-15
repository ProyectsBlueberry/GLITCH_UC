import { DataTypes, Model } from 'sequelize';
import DB from '../src/database/config';
import Academic_offert from './academic_offer';

interface ModelAttributes {
  id: number;
  content: Text;
  gko: string | null;
  practices: string;
  id_offer: number;
  createdAt: Date;
  updatedAt: Date;
}

interface ModelCreationAttributes extends Omit<ModelAttributes, 'id'> { }

class Content extends Model<ModelAttributes, ModelCreationAttributes> implements ModelAttributes {
  public id!: number;
  public content!: Text;
  public gko!: string;
  public practices!: string;
  public id_offer!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Content.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    content: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    gko: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    practices: {
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
    modelName: 'Content',
  }
);
(async () => {
  await DB.sync(); 
 
  Content.belongsTo(Academic_offert, { foreignKey: 'id_offer' });
})();

export default Content;