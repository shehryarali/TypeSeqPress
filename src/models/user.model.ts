import { Model, DataTypes } from 'Sequelize';
import { sequelize } from '../helpers/db';

class User extends Model {
  // Note that the `null assertion` `!` is required in strict mode.
  public id!: number; 
  public email!: string;
  public username!: string;
  public password!: string;
  public firstName!: string;
  public lastName!: string;
  public role!: number;
  public type: number | undefined;
  public authToken: string | undefined;
  public status: number | undefined;
}

User.init({
  id: {
    type: new DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: new DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: new DataTypes.STRING,
    allowNull: false
  },
  username: {
    type: new DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  firstName: {
    type: new DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: new DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: new DataTypes.INTEGER,
    allowNull: false
  },
  type: {
    type: new DataTypes.INTEGER,
    allowNull: false
  },
  authToken: {
    type: new DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: new DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  lastLogin: {
    type: new DataTypes.DATE(),
    allowNull: true,
  }
}, { sequelize , modelName: 'user', tableName: 'user', timestamps: true });

// User.drop().then();
User.sync(); // if the table does not exists it will create the table

export default User;