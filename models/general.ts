import { DataTypes, Model, Sequelize } from 'sequelize';
import DB from '../src/database/config';
import Academic_offert from './academic_offer';

interface GeneralAttributes {
  id: number;
  type: string;
  duration: string | null;
  mode: string;
  start: Date;
  banner: string;
  pdf: string;
  RVOE: string;
  id_offer: number;
  createdAt: Date;
  updatedAt: Date;
}

interface GeneralCreationAttributes extends Omit<GeneralAttributes, 'id'> {}

class General extends Model<GeneralAttributes, GeneralCreationAttributes> implements GeneralAttributes {
  public id!: number;
  public type!: string;
  public duration!: string | null;
  public mode!: string;
  public start!: Date;
  public banner!: string;
  public pdf!: string;
  public RVOE!: string;
  public id_offer!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
}

General.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    type: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    duration: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    mode: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    start: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    banner: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    pdf: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    RVOE: {
      allowNull: false,
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
    modelName: 'generals',
  }
);
(async () => {
  await DB.sync(); 
 
  General.belongsTo(Academic_offert, { foreignKey: 'id_offer' });
})();

export default General;
