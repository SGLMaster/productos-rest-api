import {post, requestBody, HttpErrors} from '@loopback/rest';
import {User} from '../models';
import {UserRepository, UserRoleRepository} from '../repositories';
import {repository} from '@loopback/repository';
import {Credentials, JWT_SECRET} from '../auth';
import {promisify} from 'util';
import {hash, compare} from 'bcrypt';

const {sign} = require('jsonwebtoken');
const signAsync = promisify(sign);

const BCRYPT_SALT_VALUE = 12;

export class UserController {
  constructor(
    @repository(UserRepository) private userRepository: UserRepository,
    @repository(UserRoleRepository)
    private userRoleRepository: UserRoleRepository,
  ) {}

  @post('/users')
  async createUser(@requestBody() user: User): Promise<User> {
    const pass = user.password;
    const hashedPass = await hash(pass, BCRYPT_SALT_VALUE);
    const hashedUser = {...user, password: hashedPass};

    return this.userRepository.create(hashedUser);
  }

  @post('/users/login')
  async login(@requestBody() credentials: Credentials) {
    if (!credentials.username || !credentials.password)
      throw new HttpErrors.BadRequest(
        'Falta la contraseña o el nombre de usuario',
      );
    const user = await this.userRepository.findOne({
      where: {id: credentials.username},
    });
    if (!user) throw new HttpErrors.Unauthorized('Credenciales inválidos');

    const isPasswordMatched = await compare(
      credentials.password,
      user.password,
    );
    if (!isPasswordMatched)
      throw new HttpErrors.Unauthorized('Credenciales inválidos');

    const tokenObject = {username: credentials.username};
    const token = await signAsync(tokenObject, JWT_SECRET);
    const roles = await this.userRoleRepository.find({
      where: {userId: user.id},
    });
    const {id, email} = user;

    return {
      token,
      id: id as string,
      email,
      roles: roles.map(r => r.roleId),
    };
  }
}
