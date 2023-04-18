import { User } from "../../models/user.model";
import { DatabaseConnection } from "../config/database.connection";
import { UserEntity } from "../entities/user.entity";

export class UserDatabase {
  public async getByUsername(username: string) {
    const connection = DatabaseConnection.connection;
    const repository = connection.getRepository(UserEntity);

    const result = await repository.findOneBy({
      username,
    });

    if (!result) {
      return null;
    }

    return this.mapEntityToModel(result);
  }

  public async getById(id: string) {
    const connection = DatabaseConnection.connection;
    const repository = connection.getRepository(UserEntity);

    const result = await repository.findOneBy({
      id,
    });

    if (!result) {
      return null;
    }

    return this.mapEntityToModel(result);
  }

  public async userCreate(user: User) {
    const connection = DatabaseConnection.connection;
    const repository = connection.getRepository(UserEntity);

    const userEntity = repository.create({
      id: user.id,
      username: user.username,
      password: user.password,
    });

    const result = await repository.save(userEntity);

    return this.mapEntityToModel(result);
  }

  public async findUser(username: string, password: string) {
    const connection = DatabaseConnection.connection;
    const repository = connection.getRepository(UserEntity);

    const result = await repository.findOne({
      where: {
        username: username,
        password: password,
      },
    });

    if (!result) {
      return null;
    }

    return this.mapEntityToModel(result);
  }

  public async findAll() {
    const connection = DatabaseConnection.connection;
    const repository = connection.getRepository(UserEntity);

    const result = await repository.find();
    return result.map((user) => this.mapEntityToModel(user));
  }

  private mapEntityToModel(entity: UserEntity): User {
    return User.create(entity.id.trim(), entity.username, entity.password);
  }
}
