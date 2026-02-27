import { z } from 'zod';

export const CreatePetSchema = z.object({
  name: z.string().min(1, 'Name is required').max(20, 'Name must be 20 characters or less'),
  species: z.enum(['cat', 'dragon', 'blob', 'plant', 'rock']),
});

export type CreatePetBody = z.infer<typeof CreatePetSchema>;

export const GetPetSchema = z.object({
  species: z.enum(['cat', 'dragon', 'blob', 'plant', 'rock']).optional(),
  minHappiness: z.string().transform(Number).optional(),
});

export type GetPet = z.infer<typeof GetPetSchema>

export const GetPetIdSchema = z.object({
  petId: z.string().transform(Number)
});

export type GetPetId = z.infer<typeof GetPetIdSchema>

export const UpdatePetNameBodySchema = z.object({
  newName: z.string().min(1, 'Name is required').max(20, 'Name must be 20 characters or less'),
});

export type UdpatePetNameBody = z.infer<typeof UpdatePetNameBodySchema>

export const UpdatePetNameParamSchema = z.object({
  petId: z.string().transform(Number)
});

export type UpdatePetNameParam = z.infer<typeof UpdatePetNameParamSchema>

export const DeletePetSchema = z.object({
  petId: z.string().transform(Number)
});

export type DeletePet = z.infer<typeof DeletePetSchema>