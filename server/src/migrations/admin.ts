import { MigrationInterface, QueryRunner } from "typeorm";

export class FakePost1623226947735 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            // `insert into todo (id, name, is_completed, "userId") values (1, 'Wake up', false, 1);`
            `select * from user;`
        );
    }

    public async down(_: QueryRunner): Promise<void> {}
}
