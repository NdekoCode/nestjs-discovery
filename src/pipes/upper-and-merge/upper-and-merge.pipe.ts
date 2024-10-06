import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class UpperAndMergePipe implements PipeTransform {
  transform(value: string[], metadata: ArgumentMetadata):string {
    
    console.log("METADATA ",metadata);
    if(metadata.type==='body'){
      return value.map(item=>item.toUpperCase()).join('_')
    }
    return value.toString();
  }
}
