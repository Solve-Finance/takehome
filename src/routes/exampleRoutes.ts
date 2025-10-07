import { Router, Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { ExampleEntity } from '../models/ExampleEntity';

const router = Router();

/**
 * Example Router - demonstrates basic CRUD operations
 *
 * This shows you how to:
 * - Set up routes
 * - Access the TypeORM repository
 * - Handle requests and responses
 * - Basic error handling
 *
 * You can use this as a reference when creating your loan application routes.
 */

// GET all examples
router.get('/', async (req: Request, res: Response) => {
  try {
    const exampleRepo = AppDataSource.getRepository(ExampleEntity);
    const examples = await exampleRepo.find();
    res.json(examples);
  } catch (error) {
    console.error('Error fetching examples:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST new example
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const exampleRepo = AppDataSource.getRepository(ExampleEntity);
    const example = exampleRepo.create({
      name,
      description,
      status: 'ACTIVE',
    });

    await exampleRepo.save(example);
    res.status(201).json(example);
  } catch (error) {
    console.error('Error creating example:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
