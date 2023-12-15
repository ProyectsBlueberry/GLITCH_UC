
import { DataTypes, Model } from 'sequelize';
import DB from '../src/database/config';
import Category from './categories';
import General from './general';
import { CategoriesAttributes } from '../src/interfaces/CategoriesAttributes';
import Seo from './seo';
import Content from './content';
import Advantage from './advantage';
import Curriculum from './curriculum';
import Works from './works';
import Our_graduates from './our_graduates';
import Know_where from './know_where';
import Testimonial from './testimonial';
interface ModelProps {
  id: number;
  title: string;
  status: boolean;
  id_category: number;
  crm: number;
  Category?: CategoriesAttributes;
}
class Academic_offert extends Model {
  public id!: number;
  public title!: string;
  public status!: boolean;
  public id_category!: number;
  public crm!: number;
  public Category?: CategoriesAttributes
}

Academic_offert.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    id_category: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    crm: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize: DB,
    tableName: 'academic_offers',
  }
);

(async () => {
  await DB.sync();

  Academic_offert.belongsTo(Category, { foreignKey: 'id_category' });
  Academic_offert.hasMany(General, { foreignKey: 'id_offer' });
  Academic_offert.hasMany(Content, { foreignKey: 'id_offer' });
  Academic_offert.hasMany(Seo, { foreignKey: 'id_offer' });
  Academic_offert.hasMany(Know_where, { foreignKey: 'id_offer' });
  Academic_offert.hasMany(Advantage, { foreignKey: 'id_offer' });
  Academic_offert.hasMany(Curriculum, { foreignKey: 'id_offer' });
  Academic_offert.hasMany(Works, { foreignKey: 'id_offer' });
  Academic_offert.hasMany(Our_graduates, { foreignKey: 'id_offer' });
  Academic_offert.hasMany(Testimonial, { foreignKey: 'id_offer' });

})();

export default Academic_offert;
