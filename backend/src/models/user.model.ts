import sql from '../utils/db';
import { PendingQuery, Row, RowList } from 'postgres';
import { DataBaseError } from '../utils/errors';

export class UserModel {
  static async registerUser(user: {
    email: string;
    password: string;
    user_id: string;
    user_type: string;
    verification_code: string;
  }): Promise<void> {
    try {
      await sql.begin(async (sql) => {
        await sql`INSERT INTO users  (user_email,password,user_id,user_type) VALUES(${user.email},${user.password},${user.user_id},${user.user_type}) RETURNING *`;
        await sql`INSERT INTO auth_token  (user_id,verification_code) VALUES(${user.user_id},${user.verification_code}) RETURNING *`;
      });
    } catch (error) {
      throw new DataBaseError({
        message: 'Query error',
        stack: error,
      });
    }
  }

  static async continueWithGoogle(user: {
    email: string;
    user_id: string;
    user_type: string;
    token: string;
    is_verified: boolean;
  }): Promise<void> {
    try {
      await sql.begin(async (sql) => {
        await sql`INSERT INTO users  (user_email,user_id,user_type, is_verified) VALUES(${user.email},${user.user_id},${user.user_type},${user.is_verified}) RETURNING *`;
        await sql`INSERT INTO auth_token  (user_id,token) VALUES(${user.user_id},${user.token}) RETURNING *`;
      });
    } catch (error) {
      console.log(error);
      throw new DataBaseError({
        message: 'Query error',
        stack: error,
      });
    }
  }

  static async findUserById(
    id: string,
    columns: string[]
  ): Promise<RowList<Row[]> | any> {
    try {
      return await sql`SELECT ${sql(columns)} FROM user WHERE user_id = ${id}`;
    } catch (error) {
      throw new DataBaseError({
        message: 'Query error',
        stack: error,
      });
    }
  }

  static async findUserEmail(
    userEmail: string,
    columns: string[]
  ): Promise<RowList<Row[]>> {
    try {
      return await sql`SELECT ${sql(
        columns
      )} FROM users WHERE user_email = ${userEmail}`;
    } catch (error) {
      console.log(error);
      throw new DataBaseError({
        message: 'Query error',
        stack: error,
      });
    }
  }

  static async findUserVerificationById(
    id: string,
    columns: string[]
  ): Promise<RowList<Row[]> | any> {
    try {
      return await sql`SELECT ${sql(
        columns
      )} FROM auth_token WHERE user_id = ${id}`;
    } catch (error) {
      throw new DataBaseError({
        message: 'Query error',
        stack: error,
      });
    }
  }

  static async updateAuthToken(
    values: { [key: string]: any },
    columns: string[],
    id: string
  ): Promise<RowList<Row[]>> {
    try {
      return await sql`UPDATE auth_token set ${sql(
        values,
        columns
      )} WHERE user_id = ${id}`;
    } catch (error) {
      throw new DataBaseError({
        message: 'Query error',
        stack: error,
      });
    }
  }

  static async updateUser(
    values: { [key: string]: any },
    columns: string[],
    id: string
  ): Promise<RowList<Row[]>> {
    try {
      return await sql`UPDATE users set ${sql(
        values,
        columns
      )} WHERE user_id = ${id}`;
    } catch (error) {
      throw new DataBaseError({
        message: 'Query error',
        stack: error,
      });
    }
  }
}
