import { DataTypes, Model } from 'sequelize';
import DB from '../src/database/config';
import Academic_offert from './academic_offer';

interface ModelAttributes {
  id: number;
  content: Text;
  id_offer: number;
  createdAt: Date;
  updatedAt: Date;
}


interface ModelCreationAttributes extends Omit<ModelAttributes, 'id'> {}

class Know_where extends Model<ModelAttributes, ModelCreationAttributes> implements ModelAttributes {
  public id!: number;
  public content!: Text;
  public id_offer!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Know_where.init(
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
    modelName: 'know_wheres',
  }
);
(async () => {
  await DB.sync(); 
 
  Know_where.belongsTo(Academic_offert, { foreignKey: 'id_offer' });
})();
export default Know_where;