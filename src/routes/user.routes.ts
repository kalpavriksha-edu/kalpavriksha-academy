import { Router, Request, Response } from 'express';
import pool from '../config/db.connection';
import generateToken from '../config/token.generate';
import bcrypt from 'bcrypt';

const saltround = 10;

class UsersRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    private routes(): void {
        this.router.get('/', this.okResponse);
        this.router.post('/login', this.login);
        this.router.get('/details/:id', this.getUserDetails);
        this.router.post('/register', this.registerUser);
    }

    private login(req: Request, res: Response): void {
        const { email, password } = req.body;

        pool.getConnection((err: any, conn: any) => {
            if (err) {
                console.log('Entered into error');
                console.log(err);
                res.send({
                    success: false,
                    statusCode: 500,
                    message: 'Getting error during connection',
                });
                return;
            }

            console.log(req.body);
            pool.query(`SELECT password FROM User WHERE email=?`, [email], (err: any, rows: any) => {
                if (err) {
                    conn.release();
                    return res.send({
                        success: false,
                        statusCode: 400,
                        data: err,
                    });
                }
                console.log(rows[0].password);
                const hash = rows[0].password;
                bcrypt.compare(password, hash, (err: any, result: boolean) => {
                    if (err) {
                        res.send({
                            message: 'Failed',
                            statusCode: 500,
                            data: err,
                        });
                    }
                    if (result) {
                        res.send({
                            message: 'Success',
                            statusCode: 200,
                            data: { token: generateToken(email) },
                        });
                    } else {
                        res.send({
                            message: 'Failed',
                            statusCode: 500,
                            data: err,
                        });
                    }
                });
                conn.release();
            });
        });
    }

    private getUserDetails(req: Request, res: Response): void {
        pool.getConnection((err: any, conn: any) => {
            if (err) {
                console.error('Error during connection:', err);
                return res.status(500).json({
                    success: false,
                    statusCode: 500,
                    message: 'Error during connection',
                });
            }

            if (!conn) {
                console.error('Connection is null');
                return res.status(500).json({
                    success: false,
                    statusCode: 500,
                    message: 'Connection is null',
                });
            }

            conn.query('SELECT * FROM User WHERE user_id = ?', [req.params.id], (err: any, rows: any) => {
                conn.release();

                if (err) {
                    console.error('Error during query:', err);
                    return res.status(400).json({
                        success: false,
                        statusCode: 400,
                    });
                }

                return res.status(200).json({
                    message: 'success',
                    statusCode: 200,
                    data: rows,
                });
            });
        });
    }

    private registerUser(req: Request, res: Response): void {
        pool.getConnection((err: any, conn: any) => {
            if (err) {
                console.error('Error during connection:', err);
                return res.status(500).json({
                    success: false,
                    statusCode: 500,
                    message: 'Error during connection',
                });
            }

            if (!conn) {
                console.error('Connection is null');
                return res.status(500).json({
                    success: false,
                    statusCode: 500,
                    message: 'Connection is null',
                });
            }
            bcrypt.hash(req.body.password, saltround, (error: any, hash: string) => {
                if (error) {
                    res.send({
                        success: false,
                        statusCode: 500,
                        message: 'getting error during connection',
                    });
                    return;
                } else {
                    const { user_name, email } = req.body;

                    const sqlQuery = 'INSERT INTO User (user_name, email, password) VALUES (?, ?, ?)';
                    conn.query(sqlQuery, [user_name, email, hash], (err: any, rows: any) => {
                        conn.release();

                        if (err) {
                            console.error('Error during registration:', err);
                            return res.status(400).json({
                                success: false,
                                statusCode: 400,
                                message: 'Error during registration',
                            });
                        }

                        return res.status(200).json({
                            message: 'Registration successful',
                            statusCode: 200,
                            data: rows,
                        });
                    });
                }
            });
        });
    }
}

const usersRouter = new UsersRouter().router;

export default usersRouter;
