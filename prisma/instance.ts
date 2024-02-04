import { PrismaClient ,User,Description} from '@prisma/client';

const prismaInstance = new PrismaClient();

export default prismaInstance;