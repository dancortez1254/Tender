import { LogHabitParamSchema } from "../validators/logs.js";

export function logHabit(req: Request, res: Response): void{
  const paramResult = LogHabitParamSchema.safeParse()

  
  if(!result.success){
    res.status(400).json({ error: result.error });
    return;
  }
}