import { PartialType } from '@nestjs/mapped-types';

import { AddTodoDTO } from './add-todo.dto';

export class UpdateTodoDTO extends PartialType(AddTodoDTO){}