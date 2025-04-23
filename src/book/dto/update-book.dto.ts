import { PartialType } from '@nestjs/mapped-types';

import AddBookDTO from './add-book.dto';

export class UpdateBookDto extends PartialType(AddBookDTO) {
}