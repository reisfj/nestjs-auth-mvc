import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AddressProvider {
    async getAddress(cep: string): Promise<any> {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        return response.data;
    }
}
