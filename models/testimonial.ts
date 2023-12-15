import { DataTypes, Model } from 'sequelize';
import DB from '../src/database/config';
import Academic_offert from './academic_offer';

export interface TestimonialProps {
  id: number;
  name: string;
  collage_career: string;
  image: string;
  content: Text;
  id_offer: number;
  createdAt: Date;
  updatedAt: Date;
}


interface ModelCreationAttributes extends Omit<TestimonialProps, 'id'> {}

class Testimonial extends Model<TestimonialProps, ModelCreationAttributes> implements TestimonialProps {
  public id!: number;
  public name!: string;
  public collage_career!: string;
  public image!: string;
  public content!: Text;
  public id_offer!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Testimonial.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    collage_career: {
      allowNull: false,
      type: DataTypes.STRING,
    },    
    image: {
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
    modelName: 'testimonials',
  }
);
(async () => {
  await DB.sync(); 
 
  Testimonial.belongsTo(Academic_offert, { foreignKey: 'id_offer' });
})();
export default Testimonial;