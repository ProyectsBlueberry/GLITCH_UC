import passport from 'passport';
import { Strategy as PassportLocal } from 'passport-local';
import bcrypt from 'bcryptjs';
import User from '../../../models/user';


class PassportConfig {
   initializePassport() {

      passport.use(new PassportLocal(async (username, password, done) => {
         try {
            const user = await User.findOne({ where: { email: username } });
      
            if (!user) {
               return done(null, false, { message: 'Usuario no encontrado. Verifica tu correo electrónico e intentalo de nuevo.' });
            }
      
            const isPasswordMatch = await bcrypt.compare(password, user.password);
      
            if (!isPasswordMatch) {
               return done(null, false, { message: 'Contraseña incorrecta. Verifica tu contraseña e intentalo de nuevo.' });
            }
      
            return done(null, user);
      
         } catch (error: any) {
            return done(null, false, { message: 'Error de autenticación' });
         }
      }));
      

      passport.serializeUser((user: any, done) => {
         if (user && user.id) {
            done(null, user.id);
         } else {
            done(new Error('Usuario inválido para la serialización'));
         }
      });

      passport.deserializeUser(async (id: string | number, done) => {
         try {
            const user = await User.findByPk(id);
            console.log('Deserialize user:', user!.id);

            if (!user) {
               return done(null, false);
            }


            return done(null, user);
            
         } catch (error: any) {
            return done(error);
         }
      });
   }
}

export default new PassportConfig();
