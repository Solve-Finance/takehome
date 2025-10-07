import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

/**
 * Example Entity - demonstrates TypeORM entity pattern
 *
 * This is a reference implementation to show you how to:
 * - Define entities with TypeORM decorators
 * - Use different column types
 * - Add timestamps
 *
 * You can use this as a reference when creating your LoanApplication entity.
 */
@Entity('examples')
export class ExampleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 50, default: 'ACTIVE' })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
